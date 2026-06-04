/**
 * Servicio para usar Gemini API
 * Detección de intención y generación de respuestas inteligentes
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_API_KEY || ''
const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

const client = new GoogleGenerativeAI(apiKey)
const model = client.getGenerativeModel({ model: modelName })

export type Intent = 'greeting' | 'schedule' | 'info' | 'inquiry' | 'purchase' | 'closing' | 'unknown'

/**
 * Detectar intención del mensaje usando Gemini
 */
export async function detectIntentWithGemini(userMessage: string, lastBotMessage?: string): Promise<Intent> {
  try {
    const contextLine = lastBotMessage 
      ? `El bot acaba de preguntar: "${lastBotMessage}"\n`
      : ''
    
    const prompt = `${contextLine}
Analiza el siguiente mensaje de un usuario y detecta su intención.

REGLA CRÍTICA para "closing":
- SOLO si el usuario está diciendo ADIÓS o DESPIDIÉNDOSE explícitamente
- NO es closing si el usuario está respondiendo a una pregunta del bot
- Palabras de closing: adiós, chao, hasta luego, nos vemos, cuídate, me voy, bye, goodbye
- NO es closing: "por esta vía está bien", "sí", "ok", "listo", "está bien" (son respuestas a preguntas)

Intenciones posibles:
- greeting: El usuario saluda o inicia conversación (ej: "Hola", "Buenos días")
- schedule: El usuario quiere agendar una cita o visita (ej: "Quiero agendar", "¿Cuándo puedo ver?")
- info: El usuario pide información sobre propiedades (ej: "¿Cuál es el precio?", "Detalles de la casa")
- inquiry: El usuario hace una consulta general (ej: "Tengo una pregunta")
- purchase: El usuario quiere comprar una propiedad (ej: "Quiero comprar", "Busco casa para comprar", "Estoy interesado en comprar")
- closing: El usuario está diciendo ADIÓS o DESPIDIÉNDOSE (ej: "Adiós", "Chao", "Hasta luego", "Nos vemos")
- unknown: El mensaje no tiene sentido o es inapropiado

Mensaje del usuario: "${userMessage}"

Responde SOLO con una de estas palabras: greeting, schedule, info, inquiry, purchase, closing, unknown`

    const result = await model.generateContent(prompt)
    const response = result.response.text().toLowerCase().trim()

    // Validar que la respuesta sea una intención válida
    const validIntents: Intent[] = ['greeting', 'schedule', 'info', 'inquiry', 'purchase', 'closing', 'unknown']
    const detectedIntent = validIntents.find(intent => response.includes(intent))

    return detectedIntent || 'unknown'
  } catch (error) {
    console.error('Error detecting intent with Gemini:', error)
    return 'unknown'
  }
}

/**
 * Generar respuesta inteligente usando Gemini
 */
/**
 * Extraer nombre y teléfono del mensaje del usuario
 */
function extractUserData(message: string): { name?: string; phone?: string } {
  const data: { name?: string; phone?: string } = {}

  // Buscar teléfono (patrones comunes: 123-456-7890, (123) 456-7890, +1 123 456 7890, etc)
  const phoneMatch = message.match(/(\+?1?\s*)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/)
  if (phoneMatch) {
    data.phone = phoneMatch[0].trim()
  }

  // Buscar nombre (palabras capitalizadas, después de "mi nombre es", "soy", etc)
  const namePatterns = [
    /(?:mi nombre es|soy|me llamo)\s+([A-Za-záéíóúñ\s]+?)(?:\.|,|$)/i,
    /^([A-Z][a-záéíóúñ]+(?:\s+[A-Z][a-záéíóúñ]+)?)\s*$/m,
  ]

  for (const pattern of namePatterns) {
    const nameMatch = message.match(pattern)
    if (nameMatch && nameMatch[1]) {
      data.name = nameMatch[1].trim()
      break
    }
  }

  return data
}

export async function generateSmartResponse(
  intent: Intent,
  userMessage: string,
  chatHistory?: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }>,
  userData?: { name?: string; phone?: string },
  userProfile?: { firstName?: string; lastName?: string }
): Promise<string> {
  try {
    const userName = userProfile?.firstName ? `${userProfile.firstName}` : 'usuario'
    
    // Priorizar datos de BD, luego extraer del mensaje
    const extractedData = extractUserData(userMessage)
    const userDataCombined = {
      name: userData?.name || extractedData.name,
      phone: userData?.phone || extractedData.phone,
    }

    // Determinar qué datos faltan
    const missingData: string[] = []
    if (!userDataCombined.name) {
      missingData.push('nombre completo')
    }
    if (!userDataCombined.phone) {
      missingData.push('número de teléfono')
    }

    const dataStatus = missingData.length > 0
      ? `DATOS FALTANTES: Pide ${missingData.join(' y ')} de manera natural.`
      : `DATOS COMPLETOS: El usuario ya proporcionó su nombre (${userDataCombined.name}) y teléfono (${userDataCombined.phone}). No pidas estos datos nuevamente.`

    const systemPrompt = `Eres un asistente inmobiliario profesional en Utah.

RESTRICCIONES ESTRICTAS:
1. Solo habla de propiedades, visitas, filtros de búsqueda, contacto.
2. NO des asesoría legal, financiera, hipotecaria ni de salud.
3. NO reveles información interna (márgenes, comisiones, datos de clientes).
4. NO entres en debates políticos, religiosos, culturales.
5. Respuestas MUY BREVES y AMABLES (máximo 1-2 oraciones cortas).
6. NO des detalles específicos de propiedades (eso lo hace el experto).
7. NO asegures disponibilidad de propiedades. Solo recopila datos y ofrece contacto con experto.
8. NUNCA repitas la misma frase en mensajes consecutivos. Varía tus respuestas.
9. Si ya dijiste "Un experto se pondrá en contacto", NO lo repitas. Cambia a otra cosa.

RECOPILACIÓN DE DATOS:
${dataStatus}
- Integra las preguntas de forma amable y contextual, no de forma abrupta.
- Solo pide datos que aún no tengas.
- Sé directo: una pregunta por mensaje.

CASOS ESPECIALES:
- Si el usuario pregunta algo fuera de tema → Redirige amablemente en 1 línea.
- Si el usuario está frustrado → Empatiza brevemente y ofrece contacto con experto.
- Si no entiendes → Pide clarificación en 1 línea.

TONO: Profesional, amable, CONCISO, directo, VARIADO.
IMPORTANTE: 
- Evita párrafos largos. Usa frases cortas y directas.
- NO repitas frases. Cada respuesta debe ser diferente.
- Varía entre: "Un experto te contactará", "Nuestro equipo se comunicará", "Te llamaremos pronto", etc.`

    let userPrompt = ''

    switch (intent) {
      case 'greeting':
        userPrompt = `El usuario está saludando. Saluda brevemente y pregunta cómo puedes ayudarlo.
Mensaje: "${userMessage}"`
        break

      case 'schedule':
        userPrompt = `El usuario quiere agendar o habla de horarios. NO sugieras horarios ni agendas. Solo confirma que un experto se contactará pronto.
Mensaje: "${userMessage}"`
        break

      case 'info':
        userPrompt = `El usuario pide información. Responde brevemente que un experto enviará detalles pronto.
Mensaje: "${userMessage}"`
        break

      case 'inquiry':
        userPrompt = `El usuario consulta sobre propiedades. Responde brevemente y ofrece ayuda de un experto.
Mensaje: "${userMessage}"`
        break

      case 'closing':
        userPrompt = `El usuario está cerrando la conversación. Despídete brevemente de forma amable. NO pidas más datos.
Mensaje: "${userMessage}"`
        break

      case 'unknown':
        userPrompt = `El usuario escribió algo confuso. Pide clarificación brevemente de forma amable.
Mensaje: "${userMessage}"`
        break
    }

    const fullPrompt = `${systemPrompt}

${userPrompt}

Responde en español. MÁXIMO 1-2 oraciones cortas. Sé amable y profesional.`

    // Usar chat con historial si está disponible
    let response: string
    if (chatHistory && chatHistory.length > 0) {
      const chat = model.startChat({ history: chatHistory })
      const result = await chat.sendMessage(fullPrompt)
      response = result.response.text().trim()
    } else {
      const result = await model.generateContent(fullPrompt)
      response = result.response.text().trim()
    }

    return response
  } catch (error) {
    console.error('Error generating smart response with Gemini:', error)
    // Fallback a respuesta genérica
    return 'Gracias por tu mensaje. Un experto se pondrá en contacto contigo pronto para ayudarte.'
  }
}
