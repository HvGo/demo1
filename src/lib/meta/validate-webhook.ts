/**
 * Validación de webhooks de Meta
 * Verifica la firma y autenticidad de los webhooks
 */

import crypto from 'crypto'
import { META_CONFIG, WHATSAPP_CONFIG } from './constants'

/**
 * Validar la firma del webhook de Meta contra un secreto específico
 * Meta envía un header x-hub-signature-256 con HMAC-SHA256
 */
function validateSignatureWithSecret(
  body: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) return false

  try {
    const hash = crypto.createHmac('sha256', secret).update(body).digest('hex')
    const expectedSignature = `sha256=${hash}`

    // Ambos buffers deben tener el mismo largo para timingSafeEqual
    const sigBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expectedSignature)
    if (sigBuffer.length !== expectedBuffer.length) return false

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  } catch (error) {
    console.error('Error validating signature:', error)
    return false
  }
}

/**
 * Validar la firma del webhook de Meta
 * NOTA: no modificar la validación contra META_CONFIG.WEBHOOK_SECRET - se usa en
 * producción para Facebook/Instagram. Se agrega además el secreto de WhatsApp
 * (app de Meta distinta) como segunda opción válida, sin quitar la primera.
 */
export function validateMetaSignature(
  body: string,
  signature: string | undefined
): boolean {
  if (!signature) {
    console.error('Missing signature')
    return false
  }

  if (validateSignatureWithSecret(body, signature, META_CONFIG.WEBHOOK_SECRET)) {
    return true
  }

  // Probar también con el secreto de la app de WhatsApp, si está configurado
  if (WHATSAPP_CONFIG.WEBHOOK_SECRET && validateSignatureWithSecret(body, signature, WHATSAPP_CONFIG.WEBHOOK_SECRET)) {
    return true
  }

  return false
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
 * Validar que el payload es un webhook válido de Meta (Facebook/Instagram)
 * NOTA: no modificar - usado en producción para Facebook/Instagram.
 * Para WhatsApp usar isValidWhatsAppWebhook.
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
 * Validar que el payload es un webhook válido de WhatsApp Cloud API
 * Estructura distinta a Facebook/Instagram: entry[].changes[].value
 */
export function isValidWhatsAppWebhook(payload: any): boolean {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  if (payload.object !== 'whatsapp_business_account') {
    return false
  }

  if (!Array.isArray(payload.entry) || payload.entry.length === 0) {
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
 * Validar que un mensaje de WhatsApp tiene los campos requeridos
 * Algunas cuentas usan el esquema clásico (from = número de teléfono)
 * y otras un esquema alterno (from_user_id), por eso se acepta cualquiera de los dos.
 */
export function isValidWhatsAppMessage(message: any): boolean {
  if (!message || typeof message !== 'object') {
    return false
  }

  const senderId = message.from || message.from_user_id
  if (!senderId || typeof senderId !== 'string') {
    return false
  }

  if (!message.id || !message.timestamp) {
    return false
  }

  if (!message.type) {
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
