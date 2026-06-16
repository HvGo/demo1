/**
 * Guardrails para validación de entrada
 * Bloquea contenido inapropiado, jailbreaks, spam, etc.
 */

export interface ValidationResult {
  isValid: boolean
  reason?: string
  predefinedResponse?: string
}

// Palabras ofensivas (lista básica, expandible)
const OFFENSIVE_WORDS = [
  'idiota',
  'estúpido',
  'imbécil',
  'pendejo',
  'mierda',
  'basura',
  'puta',
  'puto',
  'cabrón',
  'hijo de puta',
]

// Patrones de jailbreak
const JAILBREAK_PATTERNS = [
  /ignora tus reglas/i,
  /actúa como si/i,
  /dime tu prompt/i,
  /cambia tus instrucciones/i,
  /olvida tus límites/i,
  /sé un/i,
  /pretende que/i,
  /dime tu sistema/i,
  /cuál es tu prompt/i,
  /dime tus instrucciones/i,
]

// Patrones de intentos de acceso a datos sensibles
const SENSITIVE_DATA_PATTERNS = [
  /contraseña/i,
  /token/i,
  /api key/i,
  /credenciales/i,
  /datos de clientes/i,
  /información privada/i,
  /comisiones/i,
  /márgenes/i,
  /precios internos/i,
]

// Temas fuera de alcance
const OUT_OF_SCOPE_KEYWORDS = [
  /cuéntame un chiste/i,
  /habla de política/i,
  /habla de religión/i,
  /consejos de salud/i,
  /asesoría legal/i,
  /asesoría financiera/i,
  /hipoteca/i,
  /crédito/i,
  /impuestos/i,
]

/**
 * Validar entrada del usuario
 */
export function validateUserInput(message: string): ValidationResult {
  // 1. Validar longitud
  if (!message || message.trim().length === 0) {
    return {
      isValid: false,
      reason: 'empty_message',
      predefinedResponse:
        'Parece que tu mensaje está vacío. ¿Qué estás buscando? Por ejemplo: "Quiero una casa en Salt Lake City"',
    }
  }

  if (message.length > 1000) {
    return {
      isValid: false,
      reason: 'message_too_long',
      predefinedResponse:
        'Tu mensaje es muy largo. ¿Podrías resumirlo?',
    }
  }

  // 2. Detectar contenido ofensivo
  const lowerMessage = message.toLowerCase()
  for (const word of OFFENSIVE_WORDS) {
    if (lowerMessage.includes(word)) {
      return {
        isValid: false,
        reason: 'offensive_content',
        predefinedResponse:
          'No puedo continuar la conversación con insultos o comentarios ofensivos. Estoy aquí para ayudarte a encontrar propiedades en Utah. ¿Qué tipo de casa o departamento buscas?',
      }
    }
  }

  // 3. Detectar intentos de jailbreak
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isValid: false,
        reason: 'jailbreak_attempt',
        predefinedResponse:
          'No puedo cambiar mis reglas ni compartir información interna. Estoy aquí para ayudarte a encontrar propiedades en Utah. ¿Qué estás buscando?',
      }
    }
  }

  // 4. Detectar intentos de acceso a datos sensibles
  for (const pattern of SENSITIVE_DATA_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isValid: false,
        reason: 'sensitive_data_request',
        predefinedResponse:
          'No puedo compartir información sensible o interna. Puedo ayudarte a encontrar propiedades, agendar visitas y responder preguntas sobre nuestros listados. ¿Qué buscas?',
      }
    }
  }

  // 5. Detectar temas fuera de alcance
  for (const pattern of OUT_OF_SCOPE_KEYWORDS) {
    if (pattern.test(message)) {
      return {
        isValid: false,
        reason: 'out_of_scope',
        predefinedResponse:
          'Este chat está diseñado para ayudarte con propiedades en Utah: buscar casas, agendar visitas y responder preguntas sobre nuestros listados. ¿Qué tipo de propiedad buscas?',
      }
    }
  }

  // 6. Detectar mensajes sin sentido (solo caracteres especiales o repetidos)
  if (isNonsenseMessage(message)) {
    return {
      isValid: false,
      reason: 'nonsense_message',
      predefinedResponse:
        'No entiendo bien tu mensaje. ¿Qué estás buscando? Por ejemplo: "Quiero un departamento en Salt Lake City de 2 habitaciones hasta $300,000"',
    }
  }

  return { isValid: true }
}

/**
 * Detectar si el mensaje es sin sentido
 */
function isNonsenseMessage(message: string): boolean {
  const trimmed = message.trim()

  // Mensaje muy corto con solo caracteres especiales
  if (trimmed.length <= 5 && !/[a-záéíóúñ]/i.test(trimmed)) {
    return true
  }

  // Caracteres repetidos (ej: "asdfghjkl", "xxxxx", "111111")
  if (/^(.)\1{4,}$/i.test(trimmed)) {
    return true
  }

  // Solo números o caracteres especiales
  if (!/[a-záéíóúñ0-9]/i.test(trimmed)) {
    return true
  }

  return false
}

/**
 * Detectar si el usuario está frustrado
 */
export function isUserFrustrated(message: string): boolean {
  const frustrationPatterns = [
    /esto es una basura/i,
    /no me ayuda/i,
    /no sirve/i,
    /estoy cansado/i,
    /no funciona/i,
    /qué pérdida de tiempo/i,
    /horrible/i,
    /terrible/i,
  ]

  return frustrationPatterns.some(pattern => pattern.test(message))
}

/**
 * Obtener respuesta para usuario frustrado
 */
export function getFrustratedUserResponse(): string {
  return 'Lamento que hayas tenido una mala experiencia. Estoy aquí para ayudarte a encontrar propiedades. Si prefieres, puedo conectarte con un agente humano que te atenderá personalmente. ¿Brindame nombre completo y telefono para que un experto se comunique contigo?'
}
