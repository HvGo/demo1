/**
 * Servicio de Clasificación de Intención para Formulario de Contacto
 * Usa Gemini AI para detectar spam, bots y clasificar clientes genuinos
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_API_KEY || ''
const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

const client = new GoogleGenerativeAI(apiKey)
const model = client.getGenerativeModel({ model: modelName })

export type ContactIntent = 
  | 'genuine_buyer'      // Cliente real interesado en comprar
  | 'genuine_seller'     // Cliente real interesado en vender
  | 'genuine_inquiry'    // Consulta legítima
  | 'spam'               // Publicidad/spam
  | 'bot'                // Bot automatizado
  | 'test'               // Mensaje de prueba
  | 'unknown'            // No clasificable

export interface ContactClassification {
  intent: ContactIntent
  confidence: number      // 0-100
  shouldSendEmail: boolean
  shouldNotifyAdmin: boolean
  tags: string[]         // ['high_priority', 'follow_up', etc]
  reasoning?: string     // Explicación de la clasificación
}

/**
 * Clasificar intención de contacto usando Gemini AI
 */
export async function classifyContactIntent(
  name: string,
  email: string,
  phone: string | null,
  message: string
): Promise<ContactClassification> {
  try {
    if (!apiKey) {
      console.warn('[INTENT_CLASSIFIER] GOOGLE_API_KEY not configured, using fallback')
      return getFallbackClassification()
    }

    const prompt = `Analiza el siguiente formulario de contacto y clasifica la intención del usuario.

DATOS DEL CONTACTO:
- Nombre: ${name}
- Email: ${email}
- Teléfono: ${phone || 'No proporcionado'}
- Mensaje: ${message}

CRITERIOS DE CLASIFICACIÓN:

1. SPAM (publicidad/marketing):
   - Contiene URLs o links (http://, https://, www., .com, .net, .org)
   - Ofrece servicios (SEO, marketing, desarrollo web, diseño, publicidad)
   - Lenguaje comercial agresivo ("oferta especial", "descuento", "promoción")
   - Email genérico o sospechoso (noreply@, info@, marketing@)
   - Patrones de spam conocidos (viagra, casino, lottery, click here, buy now)
   - Menciona aumentar ventas, tráfico web, ranking Google

2. BOT (automatizado):
   - Texto aleatorio sin sentido coherente
   - Caracteres extraños o codificación rara
   - Nombre no realista (ej: "qcWUFucCyqgdyW", números consecutivos)
   - Patrones de generación automática
   - Menos de 70% de letras en el texto

3. TEST (mensaje de prueba):
   - Mensaje muy corto tipo "test", "prueba", "testing", "hello test"
   - Sin contenido real o significativo
   - Menos de 5 palabras

4. GENUINE_BUYER (cliente real - comprador):
   - Interés explícito en comprar propiedad
   - Preguntas sobre propiedades disponibles
   - Consulta sobre financiamiento o préstamos
   - Búsqueda de casa/departamento/terreno
   - Solicita información de compra
   - Menciona presupuesto o rango de precio
   - Pregunta sobre ubicaciones específicas

5. GENUINE_SELLER (cliente real - vendedor):
   - Quiere vender su propiedad
   - Solicita valuación, CMA o tasación
   - Pregunta sobre proceso de venta
   - Menciona tener propiedad para vender
   - Consulta sobre comisiones o costos de venta

6. GENUINE_INQUIRY (consulta legítima):
   - Pregunta general sobre servicios inmobiliarios
   - Solicita información profesional
   - Consulta sobre el mercado inmobiliario
   - No es compra/venta directa pero es legítimo
   - Pregunta sobre el proceso o asesoría

7. UNKNOWN (no clasificable):
   - No encaja claramente en ninguna categoría
   - Información insuficiente para clasificar

REGLAS DE DECISIÓN:
- Si hay URLs o menciona servicios web/marketing → SPAM (alta confianza)
- Si el nombre tiene caracteres aleatorios o texto sin sentido → BOT (alta confianza)
- Si menciona "comprar", "busco casa", "financiamiento" → GENUINE_BUYER
- Si menciona "vender", "valuación", "CMA" → GENUINE_SELLER
- Si es pregunta profesional sin intención de compra/venta → GENUINE_INQUIRY
- Si dice "test" o "prueba" → TEST

TAGS SUGERIDOS:
- high_priority: Cliente con alta intención de compra/venta
- follow_up: Requiere seguimiento personalizado
- low_quality: Spam o bot detectado
- needs_review: Clasificación incierta, requiere revisión manual

Responde SOLO en formato JSON válido (sin markdown, sin backticks):
{
  "intent": "genuine_buyer|genuine_seller|genuine_inquiry|spam|bot|test|unknown",
  "confidence": 85,
  "shouldSendEmail": true,
  "shouldNotifyAdmin": true,
  "tags": ["high_priority"],
  "reasoning": "Breve explicación de por qué se clasificó así"
}`

    const result = await model.generateContent(prompt)
    const response = result.response.text().trim()

    console.log('[INTENT_CLASSIFIER] Raw AI response:', response)

    // Limpiar respuesta (remover markdown si existe)
    const cleanResponse = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    // Parsear JSON
    const parsed = JSON.parse(cleanResponse)

    // Validar y normalizar
    const classification: ContactClassification = {
      intent: validateIntent(parsed.intent),
      confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 50)),
      shouldSendEmail: parsed.shouldSendEmail === true,
      shouldNotifyAdmin: parsed.shouldNotifyAdmin === true,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      reasoning: parsed.reasoning || 'No reasoning provided'
    }

    // Reglas de negocio adicionales
    if (classification.intent === 'spam' || classification.intent === 'bot') {
      classification.shouldSendEmail = false
      classification.shouldNotifyAdmin = false
    }

    if (classification.intent === 'test') {
      classification.shouldSendEmail = false
      classification.shouldNotifyAdmin = false
    }

    console.log('[INTENT_CLASSIFIER] Classification result:', {
      intent: classification.intent,
      confidence: classification.confidence,
      shouldSendEmail: classification.shouldSendEmail
    })

    return classification

  } catch (error) {
    console.error('[INTENT_CLASSIFIER] Error classifying intent:', error)
    return getFallbackClassification()
  }
}

/**
 * Validar que el intent sea válido
 */
function validateIntent(intent: string): ContactIntent {
  const validIntents: ContactIntent[] = [
    'genuine_buyer',
    'genuine_seller',
    'genuine_inquiry',
    'spam',
    'bot',
    'test',
    'unknown'
  ]

  const normalized = intent?.toLowerCase().trim()
  
  if (validIntents.includes(normalized as ContactIntent)) {
    return normalized as ContactIntent
  }

  return 'unknown'
}

/**
 * Clasificación de fallback cuando la IA falla
 * Conservador: trata como consulta genuina para no perder leads
 */
function getFallbackClassification(): ContactClassification {
  return {
    intent: 'genuine_inquiry',
    confidence: 50,
    shouldSendEmail: true,
    shouldNotifyAdmin: true,
    tags: ['classification_failed', 'needs_review'],
    reasoning: 'AI classification failed, defaulting to safe option'
  }
}

/**
 * Validación básica sin IA (para casos de emergencia)
 * Detecta spam obvio usando reglas simples
 */
export function basicSpamDetection(
  name: string,
  email: string,
  message: string
): { isSpam: boolean; reason?: string } {
  // Detectar URLs
  if (/https?:\/\/|www\.|\.com|\.net|\.org/.test(message)) {
    return { isSpam: true, reason: 'Contains URLs' }
  }

  // Detectar palabras de spam comunes
  const spamKeywords = [
    'seo', 'marketing', 'website design', 'web development',
    'increase sales', 'boost traffic', 'ranking', 'backlinks',
    'viagra', 'casino', 'lottery', 'click here', 'buy now'
  ]

  const lowerMessage = message.toLowerCase()
  for (const keyword of spamKeywords) {
    if (lowerMessage.includes(keyword)) {
      return { isSpam: true, reason: `Contains spam keyword: ${keyword}` }
    }
  }

  // Detectar nombre sospechoso
  const letterRatio = (name.match(/[a-zA-Z]/g) || []).length / name.length
  if (letterRatio < 0.7) {
    return { isSpam: true, reason: 'Suspicious name format' }
  }

  return { isSpam: false }
}
