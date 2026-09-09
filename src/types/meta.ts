/**
 * Tipos para integración Meta (Facebook, Instagram, WhatsApp)
 */

// ============================================================================
// WEBHOOK PAYLOAD TYPES
// ============================================================================

export interface MetaWebhookPayload {
  object: string
  entry: MetaEntry[]
}

export interface MetaEntry {
  id: string
  time: number
  messaging: MetaMessage[]
}

export interface MetaMessage {
  sender: { id: string }
  recipient: { id: string }
  timestamp: number
  message?: {
    mid: string
    text?: string
    attachments?: MetaAttachment[]
  }
  postback?: {
    title: string
    payload: string
  }
}

export interface MetaAttachment {
  type: 'image' | 'video' | 'file' | 'location'
  payload: {
    url?: string
    coordinates?: { lat: number; long: number }
  }
}

// ============================================================================
// WHATSAPP CLOUD API WEBHOOK TYPES
// ============================================================================
// WhatsApp usa una estructura distinta a Messenger/Instagram:
// entry[].changes[].value.{messages[], contacts[], statuses[]}
// en vez de entry[].messaging[]

export interface WhatsAppWebhookPayload {
  object: 'whatsapp_business_account'
  entry: WhatsAppEntry[]
}

export interface WhatsAppEntry {
  id: string
  changes: WhatsAppChange[]
}

export interface WhatsAppChange {
  field: string
  value: WhatsAppValue
}

export interface WhatsAppValue {
  messaging_product: 'whatsapp'
  metadata: {
    display_phone_number: string
    phone_number_id: string
  }
  contacts?: WhatsAppContact[]
  messages?: WhatsAppMessage[]
  statuses?: WhatsAppStatus[]
}

export interface WhatsAppContact {
  profile: { name: string; username?: string }
  // Esquema clásico (número de teléfono) o esquema alterno (user_id) según la cuenta
  wa_id?: string
  user_id?: string
  country_code?: string
}

export interface WhatsAppMessage {
  // Esquema clásico (número de teléfono) o esquema alterno (user_id) según la cuenta
  from?: string
  from_user_id?: string
  from_logical_id?: string
  id: string
  timestamp: string
  type: 'text' | 'image' | 'video' | 'document' | 'audio' | 'location' | 'button' | 'interactive' | string
  text?: { body: string }
  button?: { text: string; payload: string }
  interactive?: {
    type: string
    button_reply?: { id: string; title: string }
    list_reply?: { id: string; title: string }
  }
}

export interface WhatsAppStatus {
  id: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: string
  recipient_id: string
}

// ============================================================================
// PROCESSED MESSAGE TYPES
// ============================================================================

export interface ProcessedMessage {
  contactId: number | null
  metaSenderId: string
  platform: 'facebook' | 'instagram' | 'whatsapp'
  messageText: string
  messageType: string
  intent: 'info' | 'schedule' | 'inquiry' | 'unknown'
  metadata: Record<string, any>
}

// ============================================================================
// APPOINTMENT TYPES
// ============================================================================

export interface AppointmentData {
  contactId: number
  scheduledDate: Date
  propertyId?: string // UUID
  notes: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface AppointmentResponse {
  id: number
  contactId: number
  scheduledDate: Date
  status: string
  createdAt: Date
}

// ============================================================================
// META CONTACT TYPES
// ============================================================================

export interface MetaContactData {
  contactId: number
  metaSenderId: string
  platform: 'facebook' | 'instagram' | 'whatsapp'
  metaName?: string
  metaPhone?: string
  metaEmail?: string
  conversationStatus: 'active' | 'inactive' | 'blocked'
}

// ============================================================================
// WEBHOOK LOG TYPES
// ============================================================================

export interface WebhookLogData {
  eventType: string
  payload: Record<string, any>
  status: 'success' | 'error' | 'pending'
  errorMessage?: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface MetaApiResponse {
  success: boolean
  message?: string
  data?: any
  error?: string
}
