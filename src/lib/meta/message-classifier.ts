/**
 * Clasificador de mensajes para Meta (Facebook/Instagram)
 * Detecta tipo de mensaje para construir base de conocimiento
 */

import { model } from './gemini'

export type MetaChatIntent = 
  | 'business_inquiry'      // Cliente final (B2C) - compra/venta
  | 'b2b_opportunity'        // Oportunidad de negocio (B2B)
  | 'personal_friend'        // Amigo/familiar
  | 'spam_generic'           // Spam no relacionado
  | 'off_topic'              // Tema fuera del negocio
  | 'greeting_casual'        // Saludo casual
  | 'test_message'           // Mensaje de prueba
  | 'bot_automated'          // Bot automatizado
  | 'unknown'                // No clasificable

export interface MessageClassification {
  intent: MetaChatIntent
  confidence: number          // 0-100
  shouldRespond: boolean      // ¿Bot debe responder?
  shouldSaveOnly: boolean     // Solo guardar sin responder
  shouldBlock: boolean        // Bloquear completamente
  tags: string[]              // Tags adicionales
  reasoning?: string          // Explicación de la clasificación
}

/**
 * Clasificar mensaje de Meta usando Gemini AI
 */
export async function classifyMetaMessage(
  message: string,
  senderName?: string,
  chatHistory?: Array<{ role: string; text: string }>
): Promise<MessageClassification> {
  
  try {
    const historyContext = chatHistory && chatHistory.length > 0
      ? chatHistory.slice(-3).map(m => `${m.role}: ${m.text}`).join('\n')
      : 'Sin historial previo'

    const prompt = `Analiza el siguiente mensaje de chat y clasifica la intención del usuario.

CONTEXTO:
- Nombre del usuario: ${senderName || 'Desconocido'}
- Mensaje actual: "${message}"
- Historial reciente:
${historyContext}

NEGOCIO: Ivan Utah Realtor - Venta de propiedades en Utah

CLASIFICACIONES:

1. BUSINESS_INQUIRY (cliente final B2C):
   - Cliente quiere comprar/vender propiedad
   - Preguntas sobre propiedades, precios, financiamiento
   - Solicita visitas, información de servicios
   - Menciona: "quiero comprar", "busco casa", "cuánto cuesta", "propiedad"
   - Interés directo en bienes raíces

2. B2B_OPPORTUNITY (oportunidad de negocio B2B):
   - Propuesta de colaboración entre negocios
   - Servicios relacionados a bienes raíces:
     * Marketing, publicidad, revistas, medios
     * Fotografía, staging, home inspection
     * Servicios legales, financieros, seguros
     * Networking profesional
   - Menciona el negocio específicamente ("tu negocio", "Ivan")
   - Tono profesional y personalizado
   - Ubicación relevante (Utah, Salt Lake, SLC)
   - Ejemplo: "Revista financiera en SLC, tu negocio encaja..."
   - Propuesta de aparecer en publicaciones

3. SPAM_GENERIC (spam no relacionado):
   - Servicios web genéricos (SEO, diseño, desarrollo web)
   - Productos no relacionados a bienes raíces
   - URLs sospechosas sin contexto relevante
   - Lenguaje muy agresivo: "CLICK AQUÍ", "COMPRA AHORA"
   - Email masivo sin personalización
   - NO menciona bienes raíces, propiedades ni Utah
   - Ofertas genéricas de marketing digital

4. PERSONAL_FRIEND (amigo/familiar):
   - Saludo muy casual: "amigo", "hermano", "compadre", "primo"
   - Conversación personal sin mención de negocio
   - Pregunta por bienestar personal
   - Tono muy informal y cercano
   - Ejemplo: "Hola amigo, ¿cómo estás?", "Qué tal hermano"

5. OFF_TOPIC (fuera de tema):
   - Temas no relacionados: política, religión, deportes
   - Pide chistes, memes, entretenimiento
   - Conversación casual sin relación al negocio
   - Ejemplo: "Cuéntame un chiste", "¿Qué opinas de...?"

6. GREETING_CASUAL (saludo simple):
   - Solo "Hola", "Buenas", "Hey", "¿Qué tal?" sin contexto
   - Sin mención de negocio ni tono personal
   - Requiere preguntar intención

7. TEST_MESSAGE (mensaje de prueba):
   - Mensaje muy corto: "test", "prueba", "testing"
   - Sin contenido significativo
   - Menos de 5 palabras sin contexto

8. BOT_AUTOMATED (bot automatizado):
   - Texto aleatorio sin sentido coherente
   - Caracteres extraños o codificación rara
   - Patrones de generación automática
   - Nombre no realista

9. UNKNOWN (no clasificable):
   - No encaja en ninguna categoría
   - Información insuficiente para clasificar

REGLAS CRÍTICAS:
- Si menciona servicios relacionados a bienes raíces + Utah/SLC → B2B_OPPORTUNITY
- Si menciona "tu negocio", "colaborar", "revista", "publicidad" + contexto inmobiliario → B2B_OPPORTUNITY
- Si es SEO genérico, diseño web SIN mención de bienes raíces → SPAM_GENERIC
- Si menciona "comprar casa", "busco propiedad", "vender" → BUSINESS_INQUIRY
- Si dice "amigo", "hermano" sin contexto de negocio → PERSONAL_FRIEND

TAGS SUGERIDOS:
- high_priority: Cliente con alta intención de compra/venta
- b2b_lead: Oportunidad de colaboración
- needs_review: Clasificación incierta (confidence < 70)
- potential_spam: Posible spam pero no seguro
- follow_up: Requiere seguimiento

Responde SOLO en formato JSON válido (sin markdown, sin backticks):
{
  "intent": "business_inquiry|b2b_opportunity|personal_friend|spam_generic|off_topic|greeting_casual|test_message|bot_automated|unknown",
  "confidence": 85,
  "shouldRespond": true,
  "shouldSaveOnly": false,
  "shouldBlock": false,
  "tags": ["high_priority"],
  "reasoning": "Breve explicación de por qué se clasificó así"
}`

    const result = await model.generateContent(prompt)
    const response = result.response.text().trim()
    
    console.log('[MESSAGE_CLASSIFIER] Raw AI response:', response)
    
    // Limpiar respuesta (remover markdown si existe)
    const cleanResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    
    // Parsear JSON
    const parsed = JSON.parse(cleanResponse)
    
    // Validar y normalizar
    const classification: MessageClassification = {
      intent: validateMetaIntent(parsed.intent),
      confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 50)),
      shouldRespond: parsed.shouldRespond === true,
      shouldSaveOnly: parsed.shouldSaveOnly === true,
      shouldBlock: parsed.shouldBlock === true,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      reasoning: parsed.reasoning || 'No reasoning provided'
    }
    
    // Reglas de negocio adicionales
    if (classification.intent === 'spam_generic' || classification.intent === 'bot_automated') {
      classification.shouldBlock = true
      classification.shouldRespond = false
      classification.shouldSaveOnly = false
    }
    
    if (classification.intent === 'test_message') {
      classification.shouldBlock = true
      classification.shouldRespond = false
    }
    
    if (classification.intent === 'b2b_opportunity' || classification.intent === 'personal_friend') {
      classification.shouldSaveOnly = true
      classification.shouldRespond = false
    }
    
    if (classification.intent === 'business_inquiry') {
      classification.shouldRespond = true
      classification.shouldSaveOnly = false
    }
    
    if (classification.intent === 'greeting_casual' || classification.intent === 'off_topic') {
      classification.shouldRespond = true
    }
    
    // Agregar tag si confidence es bajo
    if (classification.confidence < 70) {
      classification.tags.push('needs_review')
    }
    
    console.log('[MESSAGE_CLASSIFIER] Classification result:', {
      intent: classification.intent,
      confidence: classification.confidence,
      shouldRespond: classification.shouldRespond,
      shouldSaveOnly: classification.shouldSaveOnly,
      shouldBlock: classification.shouldBlock
    })
    
    return classification
    
  } catch (error) {
    console.error('[MESSAGE_CLASSIFIER] Error classifying message:', error)
    return getFallbackClassification()
  }
}

/**
 * Validar que el intent sea válido
 */
function validateMetaIntent(intent: string): MetaChatIntent {
  const validIntents: MetaChatIntent[] = [
    'business_inquiry',
    'b2b_opportunity',
    'personal_friend',
    'spam_generic',
    'off_topic',
    'greeting_casual',
    'test_message',
    'bot_automated',
    'unknown'
  ]
  
  const normalized = intent?.toLowerCase().trim()
  
  if (validIntents.includes(normalized as MetaChatIntent)) {
    return normalized as MetaChatIntent
  }
  
  return 'unknown'
}

/**
 * Clasificación de fallback cuando la IA falla
 * Conservador: trata como unknown para no perder información
 */
function getFallbackClassification(): MessageClassification {
  return {
    intent: 'unknown',
    confidence: 50,
    shouldRespond: false,
    shouldSaveOnly: true,
    shouldBlock: false,
    tags: ['classification_failed', 'needs_review'],
    reasoning: 'AI classification failed, defaulting to safe option'
  }
}

/**
 * Respuestas predefinidas para ciertos tipos de mensajes
 */
export const PREDEFINED_RESPONSES = {
  off_topic: "Entiendo tu pregunta, pero este chat está diseñado para ayudarte con propiedades en Utah. ¿Estás buscando comprar o vender una propiedad?",
  
  greeting_casual: "¡Hola! Soy el asistente de Ivan Utah Realtor. ¿En qué puedo ayudarte hoy? ¿Buscas comprar, vender o necesitas información sobre propiedades en Utah?",
  
  spam_blocked: "", // No responder
  
  personal_friend: "" // No responder con bot
}
