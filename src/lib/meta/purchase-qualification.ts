/**
 * Máquina de estados para el flujo de calificación de compra
 * Gestiona las 3 preguntas del slot filling
 */

export type QualificationStep = 'paso_1' | 'paso_2' | 'paso_3' | 'completado'

export const QUALIFICATION_QUESTIONS = {
  paso_1: {
    question: '¡Perfecto! Para ayudarte con el proceso de compra, necesito confirmar 3 datos rápidos. ¿Cuentas con historial de trabajo de los últimos 2 años y un Seguro Social válido? (Sí / No)',
    field: 'historial_trabajo_ssn'
  },
  paso_2: {
    question: 'Excelente. ¿Conoces si tu historial crediticio está activo y en buen estado? (Sí / No)',
    field: 'credito_activo'
  },
  paso_3: {
    question: 'Ya casi estamos. Entre tú y tu cosigner (si aplica), ¿ganan $40 o más por hora? (Sí / No)',
    field: 'ingresos_40_mas'
  }
}

export const QUALIFICATION_RESPONSES = {
  cumple_todo: '¡Buenas noticias! Calificas para los siguientes pasos. Un experto se comunicará contigo de inmediato para iniciar el proceso.',
  no_cumple_ingresos: 'Gracias por la información. Un experto se comunicará contigo para analizar tu caso a detalle y buscar las mejores soluciones para ti.',
  falta_requisito: 'Entendido. Un experto se comunicará contigo para evaluar tu situación actual y ver cómo podemos ayudarte a prepararte.'
}

/**
 * Calcular prioridad basada en respuestas de calificación
 */
export function calculatePriority(
  historial_trabajo: boolean | undefined,
  ssn: boolean | undefined,
  credito: boolean | undefined,
  ingresos: boolean | undefined
): 'ALTA' | 'MEDIA' | 'BAJA' {
  // ALTA: Sí a todo + $40/hr
  if (historial_trabajo && ssn && credito && ingresos) {
    return 'ALTA'
  }
  
  // BAJA: Falta algún requisito (historial, SSN o crédito)
  if (!historial_trabajo || !ssn || !credito) {
    return 'BAJA'
  }
  
  // MEDIA: Cumple requisitos pero no ingresos
  return 'MEDIA'
}

/**
 * Obtener respuesta según resultado de calificación
 */
export function getQualificationResponse(
  historial_trabajo: boolean | undefined,
  ssn: boolean | undefined,
  credito: boolean | undefined,
  ingresos: boolean | undefined
): string {
  const prioridad = calculatePriority(historial_trabajo, ssn, credito, ingresos)
  
  if (prioridad === 'ALTA') {
    return QUALIFICATION_RESPONSES.cumple_todo
  } else if (prioridad === 'MEDIA') {
    return QUALIFICATION_RESPONSES.no_cumple_ingresos
  } else {
    return QUALIFICATION_RESPONSES.falta_requisito
  }
}

/**
 * Determinar si la respuesta es afirmativa
 */
export function isAffirmativeResponse(message: string): boolean {
  const affirmative = ['sí', 'si', 'yes', 'yep', 'claro', 'claro que sí', 'por supuesto', 'obviamente', 'claro que sí']
  const lowerMessage = message.toLowerCase().trim()
  const result = affirmative.some(word => lowerMessage.includes(word))
  console.log(`🔎 isAffirmativeResponse("${message}") → ${result} (lower: "${lowerMessage}")`)
  return result
}

/**
 * Obtener siguiente paso
 */
export function getNextStep(currentStep: QualificationStep): QualificationStep | null {
  const steps: QualificationStep[] = ['paso_1', 'paso_2', 'paso_3', 'completado']
  const currentIndex = steps.indexOf(currentStep)
  
  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return null
  }
  
  return steps[currentIndex + 1]
}
