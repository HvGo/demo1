/**
 * Servicio para usar Gemini API
 * Detección de intención y generación de respuestas inteligentes
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = client.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp' })

export type Intent = 'greeting' | 'schedule' | 'info' | 'inquiry' | 'unknown'

/**
 * Detectar intención del mensaje usando Gemini
 */
export async function detectIntentWithGemini(userMessage: string): Promise<Intent> {
  try {
    const prompt = `Analiza el siguiente mensaje de un usuario y detecta su intención.

Intenciones posibles:
- greeting: El usuario saluda o inicia conversación (ej: "Hola", "Buenos días")
- schedule: El usuario quiere agendar una cita o visita (ej: "Quiero agendar", "¿Cuándo puedo ver?")
- info: El usuario pide información sobre propiedades (ej: "¿Cuál es el precio?", "Detalles de la casa")
- inquiry: El usuario hace una consulta general (ej: "Tengo una pregunta", "Quiero comprar")
- unknown: El mensaje no tiene sentido o es inapropiado

Mensaje del usuario: "${userMessage}"

Responde SOLO con una de estas palabras: greeting, schedule, info, inquiry, unknown`

    const result = await model.generateContent(prompt)
    const response = result.response.text().toLowerCase().trim()

    // Validar que la respuesta sea una intención válida
    const validIntents: Intent[] = ['greeting', 'schedule', 'info', 'inquiry', 'unknown']
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
export async function generateSmartResponse(
  intent: Intent,
  userMessage: string,
  userProfile?: { firstName?: string; lastName?: string }
): Promise<string> {
  try {
    const userName = userProfile?.firstName ? `${userProfile.firstName}` : 'usuario'

    const systemPrompt = `Eres un asistente inmobiliario profesional para Ivanuta Realtor en Utah.

RESTRICCIONES ESTRICTAS:
1. Solo habla de propiedades, visitas, filtros de búsqueda, contacto.
2. NO des asesoría legal, financiera, hipotecaria ni de salud.
3. NO reveles información interna (márgenes, comisiones, datos de clientes).
4. NO entres en debates políticos, religiosos, culturales.
5. Respuestas BREVES y AMABLES (máximo 2-3 líneas).
6. NO des detalles específicos de propiedades (eso lo hace el agente).
7. Siempre ofrece que un agente se pondrá en contacto pronto.

CASOS ESPECIALES:
- Si el usuario pregunta algo fuera de tema → Redirige amablemente.
- Si el usuario está frustrado → Empatiza y ofrece contacto con agente.
- Si no entiendes → Pide clarificación.

TONO: Profesional, amable, breve, directo.`

    let userPrompt = ''

    switch (intent) {
      case 'greeting':
        userPrompt = `El usuario está saludando. Responde con un saludo amable y pregunta qué tipo de propiedad busca.
Mensaje: "${userMessage}"`
        break

      case 'schedule':
        userPrompt = `El usuario quiere agendar una visita. Responde que un agente se pondrá en contacto pronto para coordinar.
Mensaje: "${userMessage}"`
        break

      case 'info':
        userPrompt = `El usuario pide información sobre propiedades. Responde que un agente le enviará información personalizada pronto.
Mensaje: "${userMessage}"`
        break

      case 'inquiry':
        userPrompt = `El usuario hace una consulta general sobre propiedades. Responde de manera amable y ofrece que un agente lo ayude.
Mensaje: "${userMessage}"`
        break

      case 'unknown':
        userPrompt = `El usuario escribió algo que no tiene sentido o es inapropiado. Responde de manera amable pidiendo que aclare qué busca.
Mensaje: "${userMessage}"`
        break
    }

    const fullPrompt = `${systemPrompt}

${userPrompt}

Responde en español. Máximo 2-3 oraciones. Sé amable y profesional.`

    const result = await model.generateContent(fullPrompt)
    const response = result.response.text().trim()

    return response
  } catch (error) {
    console.error('Error generating smart response with Gemini:', error)
    // Fallback a respuesta genérica
    return 'Gracias por tu mensaje. Un experto se pondrá en contacto contigo pronto para ayudarte.'
  }
}
