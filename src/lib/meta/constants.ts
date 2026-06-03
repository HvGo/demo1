/**
 * Constantes y configuración para Meta API
 */

export const META_CONFIG = {
  VERIFY_TOKEN: process.env.META_VERIFY_TOKEN || '',
  ACCESS_TOKEN: process.env.META_ACCESS_TOKEN || '',
  BUSINESS_ACCOUNT_ID: process.env.META_BUSINESS_ACCOUNT_ID || '',
  WEBHOOK_SECRET: process.env.META_WEBHOOK_SECRET || '',
  API_VERSION: 'v18.0',
} as const

export const PLATFORMS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  WHATSAPP: 'whatsapp',
} as const

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  FILE: 'file',
  LOCATION: 'location',
  BUTTON: 'button',
} as const

export const INTENTS = {
  INFO: 'info',
  SCHEDULE: 'schedule',
  INQUIRY: 'inquiry',
  UNKNOWN: 'unknown',
} as const

export const CONVERSATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
} as const

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const AUTO_RESPONSES = {
  GREETING:
    '¡Hola! ¿En qué puedo ayudarte? ¿Buscas comprar o vender una casa en Utah?',
  SCHEDULE:
    'Entendido. Un experto se pondrá en contacto contigo pronto.',
  INFO: 'Un experto te contactará con información personalizada.',
  INQUIRY:
    'Gracias por tu pregunta. Un experto se pondrá en contacto contigo pronto.',
  ERROR: 'Disculpa, hubo un error. Por favor intenta de nuevo.',
  CONFIRM_APPOINTMENT:
    'Gracias. Un experto se contactará contigo pronto.',
} as const

// Palabras clave para detectar intención
export const INTENT_KEYWORDS = {
  SCHEDULE: [
    'agendar',
    'cita',
    'horario',
    'disponibilidad',
    'cuando',
    'cuándo',
    'visita',
    'ver propiedad',
    'tour',
  ],
  INFO: [
    'información',
    'precio',
    'detalles',
    'características',
    'especificaciones',
    'cuánto cuesta',
    'cuanto cuesta',
    'ubicación',
    'dirección',
  ],
  INQUIRY: [
    'consulta',
    'pregunta',
    'ayuda',
    'duda',
    'quiero saber',
    'me interesa',
    'necesito',
  ],
} as const

// Configuración de rate limiting
export const RATE_LIMIT = {
  MAX_MESSAGES_PER_MINUTE: 60,
  MAX_MESSAGES_PER_HOUR: 1000,
  WINDOW_SIZE_MS: 60000, // 1 minuto
} as const

// Configuración de webhook
export const WEBHOOK_CONFIG = {
  TIMEOUT_MS: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const
