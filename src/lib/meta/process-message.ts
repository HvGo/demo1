/**
 * Procesamiento de mensajes de Meta
 * Detecta intención con Gemini, crea contactos y envía respuestas inteligentes
 */

import { MetaMessage, ProcessedMessage } from '@/types/meta'
import { PLATFORMS, AUTO_RESPONSES, META_CONFIG } from './constants'
import { 
  saveMetaMessage,
  getOrCreateConversation,
  updateConversationAfterResponse,
  updateLastMessageAt,
  escalateConversation,
  closeConversation,
  getConversationHistoryBySenderId,
  updateMessageWithBotResponse,
  createOrUpdatePurchaseLead,
  updatePurchaseQualification,
  getPurchaseLeadBySenderId,
  resetPurchaseLead
} from '@/lib/db/queries/meta-messages'
import { sendTextMessage, sendTypingIndicator, getUserProfile } from './send-message'
import { sanitizeMessageText } from './validate-webhook'
import { detectIntentWithGemini, generateSmartResponse, type Intent } from './gemini'
import { validateUserInput, isUserFrustrated, getFrustratedUserResponse } from './guardrails'
import { 
  QUALIFICATION_QUESTIONS, 
  QUALIFICATION_RESPONSES,
  isAffirmativeResponse, 
  getNextStep,
  getQualificationResponse 
} from './purchase-qualification'
import { classifyMetaMessage, PREDEFINED_RESPONSES } from './message-classifier'
import { sql } from '@/lib/db'

/**
 * Procesar un mensaje recibido de Meta
 */
export async function processMetaMessage(message: MetaMessage, platform: string = PLATFORMS.FACEBOOK): Promise<void> {
  const senderId = message.sender.id
  const messageText = message.message?.text || ''
  const messageId = message.message?.mid || ''
  const timestamp = message.timestamp

  try {
    console.log('Processing Meta message:', { senderId, messageText, messageId, platform })

    // Filtrar mensajes del bot mismo en Instagram
    // El bot recibe webhooks de sus propios mensajes, evitar procesarlos
    if (platform === PLATFORMS.INSTAGRAM && (senderId as string) === '17841406852481675') {
      console.log('⏭️ Ignoring bot own message from Instagram Business Account:', senderId)
      return
    }

    // Validar que el mensaje es legítimo
    if (!isLegitimateMessage(messageText)) {
      console.warn('Message rejected: not legitimate', { messageText })
      return
    }

    // Obtener perfil del usuario desde Meta API
    const userProfile = await getUserProfile(senderId, platform)
    console.log('👤 User profile:', { firstName: userProfile?.firstName, lastName: userProfile?.lastName })

    // Sanitizar texto
    const sanitizedText = sanitizeMessageText(messageText)

    // ═══════════════════════════════════════════════════════════════════════════════
    // CLASIFICAR MENSAJE (PARA TODOS LOS USUARIOS)
    // ═══════════════════════════════════════════════════════════════════════════════
    
    // Obtener historial para contexto de clasificación
    const rawHistory = await getConversationHistoryBySenderId(senderId)
    
    // Transformar historial al formato esperado
    const chatHistory = rawHistory.map(msg => ({
      role: msg.bot_response ? 'model' : 'user',
      text: msg.bot_response || msg.message_text
    }))
    
    // Clasificar mensaje con Gemini
    const classification = await classifyMetaMessage(
      sanitizedText,
      userProfile?.firstName,
      chatHistory
    )
    
    console.log(`📊 Mensaje clasificado: ${classification.intent} (${classification.confidence}% confianza)`)
    console.log(`   shouldRespond: ${classification.shouldRespond}, shouldSaveOnly: ${classification.shouldSaveOnly}, shouldBlock: ${classification.shouldBlock}`)
    
    // Guardar mensaje con clasificación completa
    try {
      await saveMetaMessage({
        contactId: null,
        platform: platform,
        metaSenderId: senderId,
        metaMessageId: messageId,
        messageText: sanitizedText,
        messageType: 'text',
        intent: classification.intent,
        metadata: {
          timestamp,
          originalText: messageText,
          classification: {
            intent: classification.intent,
            confidence: classification.confidence,
            reasoning: classification.reasoning,
            tags: classification.tags,
            is_b2b: classification.intent === 'b2b_opportunity',
            is_spam: classification.intent === 'spam_generic',
            is_personal: classification.intent === 'personal_friend',
            requires_human_review: classification.confidence < 70
          },
          user_profile: {
            first_name: userProfile?.firstName,
            last_name: userProfile?.lastName
          }
        }
      })
      console.log('💾 Mensaje guardado con clasificación')
    } catch (error) {
      console.error('Error saving classified message:', error)
    }
    
    // Si debe bloquearse, terminar aquí
    if (classification.shouldBlock) {
      console.log(`🚫 Mensaje bloqueado: ${classification.intent}`)
      return
    }
    
    // 🔒 FILTRO DE USUARIOS DE PRUEBA - Solo responder a usuarios específicos
    // Leer usuarios autorizados desde variable de entorno
    // Formato: ALLOWED_TEST_USERS=27172513052343744,12345678901234567
    // Si está vacío o no existe, responde a TODOS los usuarios
    const allowedUsersEnv = process.env.ALLOWED_TEST_USERS || ''
    const allowedUsers = allowedUsersEnv.split(',').map(id => id.trim()).filter(id => id.length > 0)
    
    if (allowedUsers.length > 0 && !allowedUsers.includes(senderId)) {
      console.log(`💾 Usuario no autorizado - Mensaje clasificado y guardado sin responder`)
      console.log(`   Clasificación: ${classification.intent}`)
      console.log(`   Usuarios autorizados: [${allowedUsers.join(', ')}]`)
      return // NO RESPONDER
    }
    
    if (allowedUsers.length > 0) {
      console.log(`✅ Usuario autorizado: ${senderId}`)
    } else {
      console.log(`✅ Modo producción: respondiendo a todos los usuarios`)
    }

    // Obtener o crear conversación
    const conversation = await getOrCreateConversation(
      senderId,
      userProfile?.firstName,
      userProfile?.lastName
    )
    console.log('📞 Conversation:', { 
      conversationId: conversation.id, 
      messageCount: conversation.message_count,
      userName: `${conversation.user_first_name} ${conversation.user_last_name}`.trim()
    })

    // Enviar indicador de escritura
    try {
      await sendTypingIndicator(senderId)
    } catch (error) {
      console.error('Error sending typing indicator:', error)
    }

    // Validar entrada (guardrails)
    const validation = validateUserInput(sanitizedText)
    
    if (!validation.isValid) {
      console.warn('Message validation failed:', validation.reason)
      
      // Enviar respuesta de validación
      if (validation.predefinedResponse) {
        await sendTextMessage(senderId, validation.predefinedResponse, platform)
        
        // Actualizar mensaje con respuesta del bot
        try {
          await updateMessageWithBotResponse(messageId, validation.predefinedResponse)
        } catch (error) {
          console.error('Error updating message with validation response:', error)
        }
      }
      return
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // VERIFICAR SI ESTÁ EN FLUJO DE CALIFICACIÓN (PRIORIDAD)
    // ═══════════════════════════════════════════════════════════════════════════════

    // Verificar si el cliente está en un flujo de calificación activo
    let existingLead: any = null
    try {
      existingLead = await getPurchaseLeadBySenderId(senderId)
      if (existingLead) {
        console.log(`🔍 Lead encontrado: id=${existingLead.id}, estado=${existingLead.estado_calificacion}, historial=${existingLead.tiene_historial_trabajo}`)
      }
    } catch (error) {
      console.warn('Could not check for existing lead:', error)
    }

    // Si está en flujo de calificación, procesar respuesta ANTES de detectar intención
    if (existingLead && existingLead.estado_calificacion && existingLead.estado_calificacion !== 'completado') {
      console.log(`📋 Client in qualification flow (${existingLead.estado_calificacion}) - Processing response`)
      
      const esAfirmativo = isAffirmativeResponse(sanitizedText)
      const currentStep = existingLead.estado_calificacion
      
      // Actualizar última actividad de la conversación
      try {
        await updateLastMessageAt(conversation.id)
      } catch (error) {
        console.error('Error updating last message time:', error)
      }

      // Procesar según paso actual
      try {
        if (currentStep === 'paso_1') {
          console.log(`🔍 PASO 1 - esAfirmativo: ${esAfirmativo}, tipo: ${typeof esAfirmativo}, mensaje: "${sanitizedText}"`)
          
          if (!esAfirmativo) {
            // No cumple requisito básico
            console.log('❌ Respuesta negativa en paso_1')
            console.log(`🔐 Llamando updatePurchaseQualification con: leadId=${existingLead.id}, paso=1, respuestas={ historial_trabajo: false, ssn: false }`)
            await updatePurchaseQualification(existingLead.id, 1, { historial_trabajo: false, ssn: false })
            console.log('✅ Qualification completed (BAJA priority)')
            return
          }
          
          // Pasar a paso 2 - guardar respuesta de paso_1 y avanzar a paso_2
          console.log('✅ Respuesta afirmativa en paso_1 - Guardando como TRUE y avanzando a paso_2')
          console.log(`🔐 Llamando updatePurchaseQualification con: leadId=${existingLead.id}, paso=2, respuestas={ historial_trabajo: true, ssn: true }`)
          await updatePurchaseQualification(existingLead.id, 2, { historial_trabajo: true, ssn: true })
          console.log('✅ Advanced to paso_2')
          
          // Enviar pregunta de paso_2
          const paso2Question = QUALIFICATION_QUESTIONS.paso_2.question
          await sendTextMessage(senderId, paso2Question, platform)
          try {
            await updateMessageWithBotResponse(messageId, paso2Question)
            console.log('✅ Qualification question sent (paso_2)')
          } catch (error) {
            console.error('Error saving paso_2 question:', error)
          }
          return
        }
        
        if (currentStep === 'paso_2') {
          // Guardar respuesta de crédito y pasar a paso 3
          console.log(`🔍 PASO 2 - esAfirmativo: ${esAfirmativo}, tipo: ${typeof esAfirmativo}, mensaje: "${sanitizedText}"`)
          console.log(`🔐 Llamando updatePurchaseQualification con: leadId=${existingLead.id}, paso=3, respuestas={ credito: ${esAfirmativo} }`)
          await updatePurchaseQualification(existingLead.id, 3, { credito: esAfirmativo })
          console.log('✅ Advanced to paso_3')
          
          // Enviar pregunta de paso_3
          const paso3Question = QUALIFICATION_QUESTIONS.paso_3.question
          await sendTextMessage(senderId, paso3Question, platform)
          try {
            await updateMessageWithBotResponse(messageId, paso3Question)
            console.log('✅ Qualification question sent (paso_3)')
          } catch (error) {
            console.error('Error saving paso_3 question:', error)
          }
          return
        }
        
        if (currentStep === 'paso_3') {
          // Última pregunta - guardar respuesta de ingresos y calcular prioridad
          console.log(`🔍 PASO 3 - esAfirmativo: ${esAfirmativo}, tipo: ${typeof esAfirmativo}, mensaje: "${sanitizedText}"`)
          console.log(`🔍 PASO 3 - Verificación: esAfirmativo === true? ${esAfirmativo === true}, esAfirmativo === false? ${esAfirmativo === false}, esAfirmativo === undefined? ${esAfirmativo === undefined}`)
          console.log(`🔐 Llamando updatePurchaseQualification con: leadId=${existingLead.id}, paso=3, marcarCompletado=true, respuestas={ ingresos: ${esAfirmativo} }`)
          await updatePurchaseQualification(existingLead.id, 3, { ingresos: esAfirmativo }, true)
          
          // Obtener lead actualizado para calcular respuesta final
          const updatedLead = await getPurchaseLeadBySenderId(senderId)
          console.log(`📊 Lead actualizado después de paso_3:`)
          console.log(`   - estado: ${updatedLead.estado_calificacion}`)
          console.log(`   - historial: ${updatedLead.tiene_historial_trabajo}`)
          console.log(`   - ssn: ${updatedLead.tiene_ssn}`)
          console.log(`   - credito: ${updatedLead.credito_activo}`)
          console.log(`   - ingresos: ${updatedLead.ingresos_40_mas}`)
          console.log(`   - prioridad: ${updatedLead.prioridad}`)
          
          console.log(`✅ Qualification completed (${updatedLead.prioridad} priority)`)
          
          // Enviar mensaje final según prioridad
          let finalResponse: string
          if (updatedLead.prioridad === 'ALTA') {
            finalResponse = QUALIFICATION_RESPONSES.cumple_todo
          } else if (updatedLead.prioridad === 'MEDIA') {
            finalResponse = QUALIFICATION_RESPONSES.no_cumple_ingresos
          } else {
            finalResponse = QUALIFICATION_RESPONSES.falta_requisito
          }
          
          await sendTextMessage(senderId, finalResponse, platform)
          try {
            await updateMessageWithBotResponse(messageId, finalResponse)
            console.log('✅ Final qualification response sent')
          } catch (error) {
            console.error('Error saving final response:', error)
          }
          return
        }
      } catch (error) {
        console.error('Error processing qualification response:', error)
      }
      
      return
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // FLUJO NORMAL (No está en calificación)
    // ═══════════════════════════════════════════════════════════════════════════════

    // Obtener historial de conversación para contexto
    let lastBotMessage: string | undefined
    try {
      const chatHistory = await getConversationHistoryBySenderId(senderId)
      // Extraer último mensaje del bot (role === 'assistant')
      const lastAssistantMessage = chatHistory
        .filter(msg => msg.bot_response)
        .pop()
      lastBotMessage = lastAssistantMessage?.bot_response
      if (lastBotMessage) {
        console.log('📝 Last bot message found for context')
      }
    } catch (error) {
      console.warn('Could not retrieve last bot message:', error)
    }

    // Detectar intención con Gemini (con contexto conversacional)
    let intent: Intent = 'unknown'
    try {
      intent = await detectIntentWithGemini(sanitizedText, lastBotMessage)
      console.log('🎯 Intent detected:', intent)
    } catch (error) {
      console.error('Error detecting intent:', error)
      intent = 'unknown'
    }

    // Actualizar last_message_at en la conversación
    try {
      await updateLastMessageAt(conversation.id)
      console.log('✅ Updated last_message_at in conversation')
    } catch (error) {
      console.warn('Could not update last_message_at:', error)
    }

    // Verificar si usuario está frustrado
    if (isUserFrustrated(sanitizedText)) {
      const frustratedResponse = getFrustratedUserResponse()
      await sendTextMessage(senderId, frustratedResponse, platform)
      
      try {
        await updateMessageWithBotResponse(messageId, frustratedResponse)
      } catch (error) {
        console.error('Error saving frustrated response:', error)
      }
      return
    }

    // Verificar si la conversación está cerrando
    if (intent === 'closing') {
      console.log('👋 Conversation closing detected')
      
      // Responder con despedida breve
      const closingResponse = 'De nada, ¡que tengas un excelente día!'
      await sendTextMessage(senderId, closingResponse, platform)
      
      try {
        await updateMessageWithBotResponse(messageId, closingResponse)
        console.log('✅ Closing response sent')
      } catch (error) {
        console.error('Error saving closing response:', error)
      }
      
      // Cerrar conversación
      try {
        await closeConversation(conversation.id)
        console.log('✅ Conversation closed')
      } catch (error) {
        console.error('Error closing conversation:', error)
      }
      
      return
    }

    // Si intención es "purchase", iniciar flujo de calificación
    if (intent === 'purchase') {
      console.log('🛒 Purchase intent detected - Starting qualification flow')
      
      try {
        let leadId: number
        
        // Verificar si ya existe un lead completado
        if (existingLead && existingLead.estado_calificacion === 'completado') {
          console.log('♻️ Lead completado encontrado - No reiniciar automáticamente')
          // No reiniciar automáticamente. El usuario debe pedir explícitamente comprar de nuevo
          return
        } else if (existingLead) {
          // Si existe pero está en progreso, no hacer nada (ya se procesó arriba)
          console.log('⚠️ Lead en progreso - No reiniciar')
          return
        } else {
          // Crear nuevo lead
          leadId = await createOrUpdatePurchaseLead(
            senderId,
            conversation.id,
            conversation.user_first_name,
            undefined
          )
          console.log('✅ New purchase lead created')
        }
        
        // Enviar primera pregunta
        const firstQuestion = QUALIFICATION_QUESTIONS.paso_1.question
        await sendTextMessage(senderId, firstQuestion, platform)
        
        try {
          await updateMessageWithBotResponse(messageId, firstQuestion)
          console.log('✅ Qualification question sent (paso_1)')
        } catch (error) {
          console.error('Error saving qualification question:', error)
        }
      } catch (error) {
        console.error('Error in purchase qualification flow:', error)
      }
      
      return
    }

    // Responder a cada mensaje (sin restricción de tiempo)
    // El bot responderá a cada intención detectada

    // Generar respuesta
    try {
      let response: string = ''
      
      // Usar mensaje de bienvenida predefinido para saludos
      if (intent === 'greeting') {
        response = AUTO_RESPONSES.GREETING
      } else {
        // Obtener historial de conversación (últimos 10 mensajes)
        let chatHistory: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = []
        try {
          const messages = await getConversationHistoryBySenderId(senderId, 10)
          // Construir historial con ambos roles (usuario y bot)
          chatHistory = messages.flatMap(msg => {
            const historyItems: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = []
            
            // Agregar mensaje del usuario
            historyItems.push({
              role: 'user',
              parts: [{ text: msg.message_text }],
            })
            
            // Agregar respuesta del bot si existe
            if (msg.bot_response) {
              historyItems.push({
                role: 'model',
                parts: [{ text: msg.bot_response }],
              })
            }
            
            return historyItems
          })
        } catch (error) {
          console.warn('Could not retrieve chat history:', error)
        }

        // Datos del usuario desde la conversación
        const userData = {
          name: conversation.user_first_name,
          phone: undefined, // Aún no está guardado en meta_conversations
        }

        // Usar Gemini para otras intenciones
        response = await generateSmartResponse(
          intent,
          sanitizedText,
          chatHistory,
          userData,
          {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
          }
        )
      }
      
      // No enviar si la respuesta está vacía
      if (!response || response.trim() === '') {
        console.log('🔇 No response to send (empty)')
        return
      }
      
      const sent = await sendTextMessage(senderId, response, platform)

      if (!sent.success) {
        console.error('Failed to send response:', sent.error)
      } else {
        console.log('✅ Smart response sent')
        await updateConversationAfterResponse(conversation.id)
        
        // Guardar respuesta del bot en el mensaje
        try {
          await updateMessageWithBotResponse(messageId, response)
          console.log('✅ Bot response saved to message')
        } catch (error) {
          console.error('Error saving bot response:', error)
        }
      }
    } catch (error) {
      console.error('Error generating smart response:', error)
    }
  } catch (error) {
    console.error('Error processing Meta message:', error)
    throw error
  }
}



/**
 * Extraer información de contacto del mensaje
 */
export function extractContactInfo(text: string): {
  name?: string
  phone?: string
  email?: string
} {
  const info: {
    name?: string
    phone?: string
    email?: string
  } = {}

  // Buscar email (patrón simple)
  const emailMatch = text.match(/[\w\.-]+@[\w\.-]+\.\w+/)
  if (emailMatch) {
    info.email = emailMatch[0]
  }

  // Buscar teléfono (patrón para números)
  const phoneMatch = text.match(/\+?[\d\s\-\(\)]{10,}/)
  if (phoneMatch) {
    info.phone = phoneMatch[0].replace(/\D/g, '')
  }

  return info
}

/**
 * Validar que el mensaje es legítimo (no spam)
 */
export function isLegitimateMessage(text: string): boolean {
  if (!text || text.length < 2) {
    return false
  }

  // No permitir mensajes muy cortos o solo emojis
  const cleanText = text.replace(/[^\w\s]/g, '').trim()
  if (cleanText.length < 2) {
    return false
  }

  // No permitir spam obvio (repetición excesiva)
  const repeatedChars = text.match(/(.)\1{4,}/g)
  if (repeatedChars && repeatedChars.length > 2) {
    return false
  }

  return true
}

/**
 * Obtener historial de conversación de un contacto
 */
export async function getConversationHistory(
  contactId: number,
  limit: number = 20
): Promise<
  Array<{
    id: number
    message_text: string
    intent: string
    created_at: Date
  }>
> {
  const query = `
    SELECT id, message_text, intent, created_at
    FROM meta_messages
    WHERE contact_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `

  const result = await sql<{
    id: number
    message_text: string
    intent: string
    created_at: Date
  }>(query, [contactId, limit])

  return result.rows.reverse() // Retornar en orden cronológico
}


/**
 * Verificar si debe responder (evitar repetición)
 */
async function checkIfShouldRespond(conversation: any): Promise<boolean> {
  // Si ya fue escalada, no responder
  if (conversation.escalated_to_human) {
    return false
  }

  // Si respondimos hace menos de 30 segundos, no responder nuevamente
  if (conversation.last_auto_response_at) {
    const lastResponseTime = new Date(conversation.last_auto_response_at)
    const now = new Date()
    const secondsElapsed = (now.getTime() - lastResponseTime.getTime()) / 1000

    if (secondsElapsed < 30) {
      return false
    }
  }

  return true
}

/**
 * Contar mensajes de un contacto en el último período
 */
export async function countRecentMessages(
  contactId: number,
  minutesAgo: number = 60
): Promise<number> {
  const query = `
    SELECT COUNT(*) as count
    FROM meta_messages
    WHERE contact_id = $1
    AND created_at >= NOW() - INTERVAL '${minutesAgo} minutes'
  `

  const result = await sql<{ count: string }>(query, [contactId])
  return parseInt(result.rows[0]?.count || '0')
}

