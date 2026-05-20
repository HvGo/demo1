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
