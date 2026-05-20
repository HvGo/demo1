/**
 * Validación de webhooks de Meta
 * Verifica la firma y autenticidad de los webhooks
 */

import crypto from 'crypto'
import { META_CONFIG } from './constants'

/**
 * Validar la firma del webhook de Meta
 * Meta envía un header x-hub-signature-256 con HMAC-SHA256
 */
export function validateMetaSignature(
  body: string,
  signature: string | undefined
): boolean {
  if (!signature || !META_CONFIG.WEBHOOK_SECRET) {
    console.error('Missing signature or webhook secret')
    return false
  }

  try {
    // Crear hash HMAC-SHA256
    const hash = crypto
      .createHmac('sha256', META_CONFIG.WEBHOOK_SECRET)
      .update(body)
      .digest('hex')

    // Formato esperado: sha256=<hash>
    const expectedSignature = `sha256=${hash}`

    // Usar timingSafeEqual para evitar timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch (error) {
    console.error('Error validating signature:', error)
    return false
  }
}

/**
 * Validar el token de verificación del webhook
 * Meta envía un challenge durante la configuración inicial
 */
export function validateWebhookChallenge(
  token: string | null | undefined,
  challenge: string | null | undefined
): string | null {
  if (token === META_CONFIG.VERIFY_TOKEN) {
    return challenge || null
  }
  console.error('Invalid verification token')
  return null
}

/**
 * Validar que el payload es un webhook válido de Meta
 */
export function isValidMetaWebhook(payload: any): boolean {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  // Debe tener object y entry
  if (payload.object !== 'page' && payload.object !== 'instagram') {
    return false
  }

  if (!Array.isArray(payload.entry)) {
    return false
  }

  // Al menos una entrada
  if (payload.entry.length === 0) {
    return false
  }

  return true
}

/**
 * Validar que un mensaje tiene los campos requeridos
 */
export function isValidMetaMessage(message: any): boolean {
  if (!message || typeof message !== 'object') {
    return false
  }

  // Debe tener sender y recipient
  if (!message.sender || !message.sender.id) {
    return false
  }

  if (!message.recipient || !message.recipient.id) {
    return false
  }

  // Debe tener timestamp
  if (!message.timestamp || typeof message.timestamp !== 'number') {
    return false
  }

  // Debe tener message o postback
  if (!message.message && !message.postback) {
    return false
  }

  return true
}

/**
 * Sanitizar texto de mensaje
 */
export function sanitizeMessageText(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  return text
    .trim()
    .substring(0, 5000) // Limitar a 5000 caracteres
    .replace(/\0/g, '') // Remover null bytes
}

/**
 * Validar que el sender ID es válido
 */
export function isValidSenderId(senderId: string): boolean {
  if (!senderId || typeof senderId !== 'string') {
    return false
  }

  // Debe ser un número (ID de usuario de Meta)
  return /^\d+$/.test(senderId)
}

/**
 * Validar que la plataforma es soportada
 */
export function isValidPlatform(
  platform: string
): platform is 'facebook' | 'instagram' | 'whatsapp' {
  return ['facebook', 'instagram', 'whatsapp'].includes(platform)
}
