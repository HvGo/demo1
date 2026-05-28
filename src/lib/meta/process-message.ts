/**
 * Procesamiento de mensajes de Meta
 * Detecta intención, crea contactos y envía respuestas automáticas
 */

import { MetaMessage, ProcessedMessage } from '@/types/meta'
import { INTENTS, AUTO_RESPONSES, INTENT_KEYWORDS, PLATFORMS } from './constants'
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

    // Detectar intención
    const intent = detectIntent(sanitizedText)

    // Guardar mensaje en BD (sin esperar contacto)
    let savedMessageId: number
    try {
      const savedMessage = await saveMetaMessage({
        contactId: null, // No requerido para meta_messages
        platform: PLATFORMS.FACEBOOK, // Usar Facebook por defecto (Messenger)
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

    // Verificar si debe escalar
    const shouldEscalate = await checkIfShouldEscalate(conversation, sanitizedText)

    if (shouldEscalate.escalate) {
      await escalateConversation(conversation.id, shouldEscalate.reason)
      console.log('⚠️ Conversation escalated:', shouldEscalate.reason)
      
      // Enviar mensaje de escalamiento
      const escalationMessage = '👤 Tu consulta ha sido escalada a nuestro equipo. Un agente se pondrá en contacto pronto.'
      await sendTextMessage(senderId, escalationMessage)
      return
    }

    // Verificar si debe responder (evitar repetición)
    const shouldRespond = await checkIfShouldRespond(conversation)

    if (!shouldRespond) {
      console.log('⏭️ Skipping auto-response (already responded recently)')
      return
    }

    // Enviar respuesta automática
    try {
      const response = getAutoResponse(intent)
      const sent = await sendTextMessage(senderId, response)

      if (!sent.success) {
        console.error('Failed to send response:', sent.error)
      } else {
        console.log('✅ Auto-response sent')
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
      console.error('Error sending auto-response:', error)
    }
  } catch (error) {
    console.error('Error processing Meta message:', error)
    throw error
  }
}

/**
 * Detectar la intención del mensaje
 */
export function detectIntent(
  text: string
): 'info' | 'schedule' | 'inquiry' | 'unknown' {
  if (!text) return INTENTS.UNKNOWN

  const lowerText = text.toLowerCase()

  // Detectar intención de agendar
  if (INTENT_KEYWORDS.SCHEDULE.some((keyword) => lowerText.includes(keyword))) {
    return INTENTS.SCHEDULE
  }

  // Detectar intención de información
  if (INTENT_KEYWORDS.INFO.some((keyword) => lowerText.includes(keyword))) {
    return INTENTS.INFO
  }

  // Detectar intención de consulta
  if (INTENT_KEYWORDS.INQUIRY.some((keyword) => lowerText.includes(keyword))) {
    return INTENTS.INQUIRY
  }

  return INTENTS.UNKNOWN
}

/**
 * Obtener respuesta automática según intención
 */
export function getAutoResponse(intent: string): string {
  switch (intent) {
    case INTENTS.SCHEDULE:
      return AUTO_RESPONSES.SCHEDULE
    case INTENTS.INFO:
      return AUTO_RESPONSES.INFO
    case INTENTS.INQUIRY:
      return AUTO_RESPONSES.INQUIRY
    default:
      return AUTO_RESPONSES.GREETING
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
 * Verificar si la conversación debe ser escalada a humano
 */
async function checkIfShouldEscalate(
  conversation: any,
  messageText: string
): Promise<{ escalate: boolean; reason: string }> {
  // Palabras clave de frustración
  const frustrationKeywords = [
    'ayuda',
    'urgente',
    'alguien',
    'hola?',
    'hola??',
    'hola???',
    'no entiendo',
    'no me sirve',
    'no funciona',
    'quiero hablar',
    'agente',
    'persona',
    'humano',
  ]

  const lowerText = messageText.toLowerCase()

  // Detectar frustración
  if (frustrationKeywords.some((keyword) => lowerText.includes(keyword))) {
    return {
      escalate: true,
      reason: 'Frustration detected - client needs human assistance',
    }
  }

  // Si cliente envió 3+ mensajes sin respuesta humana, escalar
  if (conversation.message_count >= 3 && !conversation.escalated_to_human) {
    return {
      escalate: true,
      reason: 'Multiple messages without human response',
    }
  }

  // Si pasaron más de 30 minutos sin respuesta humana y hay 2+ mensajes
  if (conversation.last_auto_response_at) {
    const lastResponseTime = new Date(conversation.last_auto_response_at)
    const now = new Date()
    const minutesElapsed = (now.getTime() - lastResponseTime.getTime()) / (1000 * 60)

    if (minutesElapsed > 30 && conversation.message_count >= 2) {
      return {
        escalate: true,
        reason: 'No human response for 30+ minutes',
      }
    }
  }

  return { escalate: false, reason: '' }
}

/**
 * Verificar si debe responder (evitar repetición)
 */
async function checkIfShouldRespond(conversation: any): Promise<boolean> {
  // Si ya fue escalada, no responder
  if (conversation.escalated_to_human) {
    return false
  }

  // Si respondimos hace menos de 2 minutos, no responder nuevamente
  if (conversation.last_auto_response_at) {
    const lastResponseTime = new Date(conversation.last_auto_response_at)
    const now = new Date()
    const secondsElapsed = (now.getTime() - lastResponseTime.getTime()) / 1000

    if (secondsElapsed < 120) {
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
