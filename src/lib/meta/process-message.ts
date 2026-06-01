/**
 * Procesamiento de mensajes de Meta
 * Detecta intención con Gemini, crea contactos y envía respuestas inteligentes
 */

import { MetaMessage, ProcessedMessage } from '@/types/meta'
import { PLATFORMS, AUTO_RESPONSES } from './constants'
import { 
  saveMetaMessage,
  getOrCreateConversation,
  updateConversationAfterResponse,
  escalateConversation,
  getConversationHistoryBySenderId,
  updateMessageWithBotResponse
} from '@/lib/db/queries/meta-messages'
import { sendTextMessage, sendTypingIndicator, getUserProfile } from './send-message'
import { sanitizeMessageText } from './validate-webhook'
import { detectIntentWithGemini, generateSmartResponse, type Intent } from './gemini'
import { validateUserInput, isUserFrustrated, getFrustratedUserResponse } from './guardrails'
import { sql } from '@/lib/db'

/**
 * Procesar un mensaje recibido de Meta
 */
export async function processMetaMessage(message: MetaMessage): Promise<void> {
  const senderId = message.sender.id
  const messageText = message.message?.text || ''
  const messageId = message.message?.mid || ''
  const timestamp = message.timestamp

  try {
    console.log('Processing Meta message:', { senderId, messageText, messageId })

    // Validar que el mensaje es legítimo
    if (!isLegitimateMessage(messageText)) {
      console.warn('Message rejected: not legitimate', { messageText })
      return
    }

    // Obtener perfil del usuario desde Meta API
    const userProfile = await getUserProfile(senderId)
    console.log('👤 User profile:', { firstName: userProfile?.firstName, lastName: userProfile?.lastName })

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

    // Sanitizar texto
    const sanitizedText = sanitizeMessageText(messageText)

    // Validar entrada (guardrails)
    const validation = validateUserInput(sanitizedText)
    
    if (!validation.isValid) {
      console.warn('Message validation failed:', validation.reason)
      
      // Guardar mensaje rechazado
      try {
        await saveMetaMessage({
          contactId: null,
          platform: PLATFORMS.FACEBOOK,
          metaSenderId: senderId,
          metaMessageId: messageId,
          messageText: sanitizedText,
          messageType: 'text',
          intent: 'unknown',
          metadata: {
            timestamp,
            originalText: messageText,
            validationReason: validation.reason,
          },
          botResponse: validation.predefinedResponse,
        })
      } catch (error) {
        console.error('Error saving rejected message:', error)
      }

      // Enviar respuesta predefinida
      if (validation.predefinedResponse) {
        await sendTextMessage(senderId, validation.predefinedResponse)
      }
      return
    }

    // Detectar intención con Gemini
    let intent: Intent = 'unknown'
    try {
      intent = await detectIntentWithGemini(sanitizedText)
      console.log('🎯 Intent detected:', intent)
    } catch (error) {
      console.error('Error detecting intent:', error)
      intent = 'unknown'
    }

    // Guardar mensaje en BD
    let savedMessageId: number
    try {
      const savedMessage = await saveMetaMessage({
        contactId: null,
        platform: PLATFORMS.FACEBOOK,
        metaSenderId: senderId,
        metaMessageId: messageId,
        messageText: sanitizedText,
        messageType: 'text',
        intent,
        metadata: {
          timestamp,
          originalText: messageText,
        },
      })
      savedMessageId = savedMessage.id
      console.log('✅ Message saved to meta_messages')
    } catch (error) {
      console.error('Error saving message:', error)
      throw error
    }

    // Verificar si usuario está frustrado
    if (isUserFrustrated(sanitizedText)) {
      const frustratedResponse = getFrustratedUserResponse()
      await sendTextMessage(senderId, frustratedResponse)
      
      // Guardar respuesta
      try {
        await updateMessageWithBotResponse(messageId, frustratedResponse)
      } catch (error) {
        console.error('Error saving frustrated response:', error)
      }
      return
    }

    // Responder a cada mensaje (sin restricción de tiempo)
    // El bot responderá a cada intención detectada

    // Generar respuesta
    try {
      let response: string
      
      // Usar mensaje de bienvenida predefinido para saludos
      if (intent === 'greeting') {
        response = AUTO_RESPONSES.GREETING
      } else {
        // Usar Gemini para otras intenciones
        response = await generateSmartResponse(
          intent,
          sanitizedText,
          {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
          }
        )
      }
      
      const sent = await sendTextMessage(senderId, response)

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

