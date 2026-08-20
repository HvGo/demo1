/**
 * Servicio para usar Gemini API
 * Detección de intención y generación de respuestas inteligentes
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_API_KEY || ''
const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

const client = new GoogleGenerativeAI(apiKey)
export const model = client.getGenerativeModel({ model: modelName })

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
    const systemPrompt = `Eres un experto en bienes raíces de Ivan Utah Realtor, una empresa especializada en ayudar a clientes a comprar propiedades.

Tu rol es:
1. Ser amable, profesional y útil
2. Responder preguntas sobre propiedades, financiamiento y el proceso de compra
3. Recopilar información del cliente de manera natural
4. Sugerir próximos pasos cuando sea apropiado

Información del cliente:
- Nombre: ${userData?.name || 'Cliente'}
- Teléfono: ${userData?.phone || 'No proporcionado'}

Contexto de la conversación:
${chatHistory && chatHistory.length > 0 ? 'Historial previo disponible' : 'Primera interacción'}

Responde de manera conversacional, natural y breve (máximo 2-3 oraciones).`

    const messages = [
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ]

    const result = await model.generateContent({
      systemInstruction: systemPrompt,
      contents: messages,
    })

    const response = result.response.text()
    console.log(`✅ Gemini response generated for intent: ${intent}`)
    return response
  } catch (error) {
    console.error('Error generating smart response:', error)
    return ''
  }
}
