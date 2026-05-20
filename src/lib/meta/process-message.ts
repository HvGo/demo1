/**
 * Procesamiento de mensajes de Meta
 * Detecta intención, crea contactos y envía respuestas automáticas
 */

import { MetaMessage, ProcessedMessage } from '@/types/meta'
import { INTENTS, AUTO_RESPONSES, INTENT_KEYWORDS, PLATFORMS } from './constants'
import { saveMetaMessage } from '@/lib/db/queries/meta-messages'
import { sendTextMessage, sendTypingIndicator } from './send-message'
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
    // Enviar indicador de escritura
    await sendTypingIndicator(senderId)

    // Sanitizar texto
    const sanitizedText = sanitizeMessageText(messageText)

    // Detectar intención
    const intent = detectIntent(sanitizedText)

    // Obtener o crear contacto
    let contactId: number | null = null
    try {
      contactId = await getOrCreateContact(senderId, sanitizedText)
    } catch (error) {
      console.error('Error creating/getting contact:', error)
    }

    // Guardar mensaje en BD
    await saveMetaMessage({
      contactId,
      platform: PLATFORMS.INSTAGRAM, // Detectar dinámicamente si es posible
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

    // Enviar respuesta automática
    const response = getAutoResponse(intent)
    const sent = await sendTextMessage(senderId, response)

    if (!sent.success) {
      console.error('Failed to send response:', sent.error)
    }
  } catch (error) {
    console.error('Error processing Meta message:', error)
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
 * Obtener o crear contacto
 */
async function getOrCreateContact(
  metaSenderId: string,
  messageText: string
): Promise<number> {
  // Buscar contacto existente por meta_sender_id
  const existingQuery = `
    SELECT c.id FROM contacts c
    WHERE c.session_id = $1
    LIMIT 1
  `

  const existingResult = await sql<{ id: number }>(existingQuery, [
    metaSenderId,
  ])

  if (existingResult.rows.length > 0) {
    return existingResult.rows[0].id
  }

  // Crear nuevo contacto
  const createQuery = `
    INSERT INTO contacts (
      name,
      email,
      message,
      session_id,
      device_type,
      browser,
      created_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING id
  `

  const createResult = await sql<{ id: number }>(createQuery, [
    'Meta Contact', // Nombre por defecto
    `${metaSenderId}@meta.local`, // Email temporal
    messageText, // Primer mensaje
    metaSenderId, // Usar meta_sender_id como session_id
    'mobile', // Asumir mobile desde Meta
    'Meta App',
    // created_at se genera automáticamente
  ])

  return createResult.rows[0].id
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
