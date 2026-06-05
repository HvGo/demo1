/**
 * Queries para tabla meta_messages
 */

import { sql } from '@/lib/db'

export interface SaveMetaMessageParams {
  contactId: number | null
  platform: string
  metaSenderId: string
  metaMessageId: string
  messageText: string
  messageType: string
  intent: string
  metadata: Record<string, any>
  botResponse?: string
}

export interface MetaMessage {
  id: number
  contact_id: number | null
  platform: string
  meta_sender_id: string
  meta_message_id: string
  message_text: string
  message_type: string
  intent: string
  metadata: Record<string, any>
  bot_response?: string
  bot_response_sent_at?: Date
  processed: boolean
  response_sent: boolean
  created_at: Date
  updated_at: Date
}

/**
 * Guardar un nuevo mensaje de Meta
 */
export async function saveMetaMessage(
  params: SaveMetaMessageParams
): Promise<MetaMessage> {
  const query = `
    INSERT INTO meta_messages (
      contact_id,
      platform,
      meta_sender_id,
      meta_message_id,
      message_text,
      message_type,
      intent,
      metadata,
      bot_response,
      processed
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
    RETURNING *
  `

  const result = await sql<MetaMessage>(query, [
    params.contactId,
    params.platform,
    params.metaSenderId,
    params.metaMessageId,
    params.messageText,
    params.messageType,
    params.intent,
    JSON.stringify(params.metadata),
    params.botResponse || null,
  ])

  return result.rows[0]
}

/**
 * Obtener mensajes de un contacto
 */
export async function getMetaMessagesByContactId(
  contactId: number,
  limit: number = 50
): Promise<MetaMessage[]> {
  const query = `
    SELECT * FROM meta_messages
    WHERE contact_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `

  const result = await sql<MetaMessage>(query, [contactId, limit])
  return result.rows
}

/**
 * Obtener mensajes por meta_sender_id
 */
export async function getMetaMessagesBySenderId(
  metaSenderId: string,
  limit: number = 50
): Promise<MetaMessage[]> {
  const query = `
    SELECT * FROM meta_messages
    WHERE meta_sender_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `

  const result = await sql<MetaMessage>(query, [metaSenderId, limit])
  return result.rows
}

/**
 * Obtener un mensaje específico por meta_message_id
 */
export async function getMetaMessageById(
  metaMessageId: string
): Promise<MetaMessage | null> {
  const query = `
    SELECT * FROM meta_messages
    WHERE meta_message_id = $1
  `

  const result = await sql<MetaMessage>(query, [metaMessageId])
  return result.rows[0] || null
}

/**
 * Actualizar estado de respuesta enviada
 */
export async function markMessageResponseSent(
  metaMessageId: string
): Promise<boolean> {
  const query = `
    UPDATE meta_messages
    SET response_sent = true, updated_at = CURRENT_TIMESTAMP
    WHERE meta_message_id = $1
    RETURNING id
  `

  const result = await sql<MetaMessage>(query, [metaMessageId])
  return result.rows.length > 0
}

/**
 * Actualizar mensaje con respuesta del bot
 */
export async function updateMessageWithBotResponse(
  metaMessageId: string,
  botResponse: string
): Promise<boolean> {
  const query = `
    UPDATE meta_messages
    SET 
      bot_response = $2,
      bot_response_sent_at = NOW(),
      response_sent = true,
      updated_at = NOW()
    WHERE meta_message_id = $1
    RETURNING id
  `

  const result = await sql<MetaMessage>(query, [metaMessageId, botResponse])
  return result.rows.length > 0
}

/**
 * Obtener mensajes no procesados
 */
export async function getUnprocessedMessages(
  limit: number = 100
): Promise<MetaMessage[]> {
  const query = `
    SELECT * FROM meta_messages
    WHERE processed = false
    ORDER BY created_at ASC
    LIMIT $1
  `

  const result = await sql<MetaMessage>(query, [limit])
  return result.rows
}

/**
 * Obtener estadísticas de mensajes
 */
export async function getMetaMessagesStats(
  days: number = 7
): Promise<{
  total: number
  byPlatform: Record<string, number>
  byIntent: Record<string, number>
  processed: number
  unprocessed: number
}> {
  const query = `
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE processed = true) as processed,
      COUNT(*) FILTER (WHERE processed = false) as unprocessed
    FROM meta_messages
    WHERE created_at >= NOW() - INTERVAL '${days} days'
  `

  const result = await sql<any>(query)
  const stats = result.rows[0]

  // Obtener desglose por plataforma
  const platformQuery = `
    SELECT platform, COUNT(*) as count
    FROM meta_messages
    WHERE created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY platform
  `
  const platformResult = await sql<any>(platformQuery)
  const byPlatform: Record<string, number> = {}
  platformResult.rows.forEach((row: any) => {
    byPlatform[row.platform] = parseInt(row.count)
  })

  // Obtener desglose por intención
  const intentQuery = `
    SELECT intent, COUNT(*) as count
    FROM meta_messages
    WHERE created_at >= NOW() - INTERVAL '${days} days'
    AND intent IS NOT NULL
    GROUP BY intent
  `
  const intentResult = await sql<any>(intentQuery)
  const byIntent: Record<string, number> = {}
  intentResult.rows.forEach((row: any) => {
    byIntent[row.intent] = parseInt(row.count)
  })

  return {
    total: parseInt(stats.total),
    byPlatform,
    byIntent,
    processed: parseInt(stats.processed),
    unprocessed: parseInt(stats.unprocessed),
  }
}

/**
 * Eliminar mensajes antiguos (limpieza)
 */
export async function deleteOldMessages(daysOld: number = 90): Promise<number> {
  const query = `
    DELETE FROM meta_messages
    WHERE created_at < NOW() - INTERVAL '${daysOld} days'
    AND processed = true
  `

  const result = await sql<any>(query)
  return result.rows.length || 0
}

/**
 * Obtener o crear conversación
 */
export async function getOrCreateConversation(
  metaSenderId: string,
  firstName?: string,
  lastName?: string
): Promise<{
  id: number
  meta_sender_id: string
  conversation_status: string
  message_count: number
  last_auto_response_at: Date | null
  escalated_to_human: boolean
  user_first_name?: string
  user_last_name?: string
}> {
  const query = `
    INSERT INTO meta_conversations (meta_sender_id, conversation_status, message_count, user_first_name, user_last_name)
    VALUES ($1, 'active', 0, $2, $3)
    ON CONFLICT (meta_sender_id) DO UPDATE
    SET updated_at = NOW()
    RETURNING id, meta_sender_id, conversation_status, message_count, last_auto_response_at, escalated_to_human, user_first_name, user_last_name
  `

  const result = await sql<{
    id: number
    meta_sender_id: string
    conversation_status: string
    message_count: number
    last_auto_response_at: Date | null
    escalated_to_human: boolean
    user_first_name?: string
    user_last_name?: string
  }>(query, [metaSenderId, firstName || null, lastName || null])

  return result.rows[0]
}

/**
 * Actualizar conversación después de respuesta automática
 */
export async function updateConversationAfterResponse(
  conversationId: number
): Promise<void> {
  const query = `
    UPDATE meta_conversations
    SET 
      message_count = message_count + 1,
      last_message_at = NOW(),
      last_auto_response_at = NOW(),
      updated_at = NOW()
    WHERE id = $1
  `

  await sql(query, [conversationId])
}

/**
 * Actualizar last_message_at cuando se recibe un mensaje
 */
export async function updateLastMessageAt(
  conversationId: number
): Promise<void> {
  const query = `
    UPDATE meta_conversations
    SET 
      last_message_at = NOW(),
      updated_at = NOW()
    WHERE id = $1
  `

  await sql(query, [conversationId])
}

/**
 * Escalar conversación a humano
 */
export async function escalateConversation(
  conversationId: number,
  reason: string
): Promise<void> {
  const query = `
    UPDATE meta_conversations
    SET 
      escalated_to_human = TRUE,
      escalated_at = NOW(),
      escalation_reason = $2,
      conversation_status = 'escalated',
      updated_at = NOW()
    WHERE id = $1
  `

  await sql(query, [conversationId, reason])
}

/**
 * Cerrar conversación
 */
export async function closeConversation(
  conversationId: number
): Promise<void> {
  const query = `
    UPDATE meta_conversations
    SET 
      conversation_status = 'closed',
      updated_at = NOW()
    WHERE id = $1
  `

  await sql(query, [conversationId])
}

/**
 * Obtener conversaciones escaladas
 */
export async function getEscalatedConversations(): Promise<
  Array<{
    id: number
    meta_sender_id: string
    message_count: number
    escalation_reason: string
    escalated_at: Date
    created_at: Date
  }>
> {
  const query = `
    SELECT 
      id,
      meta_sender_id,
      message_count,
      escalation_reason,
      escalated_at,
      created_at
    FROM meta_conversations
    WHERE escalated_to_human = TRUE
    AND conversation_status = 'escalated'
    ORDER BY escalated_at DESC
  `

  const result = await sql<{
    id: number
    meta_sender_id: string
    message_count: number
    escalation_reason: string
    escalated_at: Date
    created_at: Date
  }>(query)

  return result.rows
}

/**
 * Obtener historial de conversación por sender ID
 * Retorna tanto mensajes del usuario como respuestas del bot
 */
export async function getConversationHistoryBySenderId(
  metaSenderId: string,
  limit: number = 10
): Promise<
  Array<{
    id: number
    message_text: string
    bot_response?: string
    intent: string
    created_at: Date
  }>
> {
  const query = `
    SELECT 
      id,
      message_text,
      bot_response,
      intent,
      created_at
    FROM meta_messages
    WHERE meta_sender_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `

  const result = await sql<{
    id: number
    message_text: string
    bot_response?: string
    intent: string
    created_at: Date
  }>(query, [metaSenderId, limit])

  return result.rows.reverse()
}

/**
 * Crear o actualizar lead de compra
 */
export async function createOrUpdatePurchaseLead(
  metaSenderId: string,
  conversationId: number,
  nombre?: string,
  telefono?: string
): Promise<number> {
  const query = `
    INSERT INTO purchase_leads (meta_sender_id, conversation_id, nombre, telefono)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (meta_sender_id) DO UPDATE
    SET updated_at = NOW()
    RETURNING id
  `
  const result = await sql<{ id: number }>(query, [metaSenderId, conversationId, nombre || null, telefono || null])
  return result.rows[0].id
}

/**
 * Actualizar respuesta de calificación y calcular prioridad
 */
export async function updatePurchaseQualification(
  leadId: number,
  paso: number,
  respuestas: {
    historial_trabajo?: boolean
    ssn?: boolean
    credito?: boolean
    ingresos?: boolean
  }
): Promise<void> {
  console.log(`📊 updatePurchaseQualification - leadId: ${leadId}, paso: ${paso}, respuestas:`, respuestas)
  
  // Obtener el lead actual para combinar valores
  const currentResult = await sql(`SELECT * FROM purchase_leads WHERE id = $1`, [leadId])
  if (!currentResult.rows[0]) {
    console.error(`❌ Lead not found: ${leadId}`)
    throw new Error(`Lead not found: ${leadId}`)
  }
  
  const lead = currentResult.rows[0]
  
  // Combinar valores actuales con nuevos valores
  const historial_trabajo = respuestas.historial_trabajo !== undefined ? respuestas.historial_trabajo : lead.tiene_historial_trabajo
  const ssn = respuestas.ssn !== undefined ? respuestas.ssn : lead.tiene_ssn
  const credito = respuestas.credito !== undefined ? respuestas.credito : lead.credito_activo
  const ingresos = respuestas.ingresos !== undefined ? respuestas.ingresos : lead.ingresos_40_mas
  
  console.log(`📋 Lead anterior - historial: ${lead.tiene_historial_trabajo}, ssn: ${lead.tiene_ssn}, credito: ${lead.credito_activo}, ingresos: ${lead.ingresos_40_mas}`)
  console.log(`📋 Respuestas pasadas - historial: ${respuestas.historial_trabajo} (tipo: ${typeof respuestas.historial_trabajo}), ssn: ${respuestas.ssn} (tipo: ${typeof respuestas.ssn}), credito: ${respuestas.credito} (tipo: ${typeof respuestas.credito}), ingresos: ${respuestas.ingresos} (tipo: ${typeof respuestas.ingresos})`)
  console.log(`📋 Valores combinados - historial: ${historial_trabajo}, ssn: ${ssn}, credito: ${credito}, ingresos: ${ingresos}`)
  console.log(`🔍 Verificación de ingresos: respuestas.ingresos !== undefined? ${respuestas.ingresos !== undefined}, valor: ${respuestas.ingresos}`)
  
  // Calcular prioridad
  let prioridad = 'MEDIA'
  if (historial_trabajo && ssn && credito && ingresos) {
    prioridad = 'ALTA'
  } else if (!historial_trabajo || !ssn || !credito) {
    prioridad = 'BAJA'
  }
  
  // Si es paso 3, marcar como completado
  const estadoCalificacion = paso === 3 ? 'completado' : `paso_${paso}`
  
  // Actualizar directamente con valores combinados (sin CASE WHEN)
  const query = `
    UPDATE purchase_leads
    SET 
      tiene_historial_trabajo = $2,
      tiene_ssn = $3,
      credito_activo = $4,
      ingresos_40_mas = $5,
      estado_calificacion = $6,
      prioridad = $7,
      updated_at = NOW()
    WHERE id = $1
  `
  
  const params = [
    leadId,
    historial_trabajo,
    ssn,
    credito,
    ingresos,
    estadoCalificacion,
    prioridad
  ]
  
  console.log(`💾 SQL params:`, params)
  
  try {
    await sql(query, params)
    console.log(`✅ Lead actualizado - leadId: ${leadId}, estado: ${estadoCalificacion}, prioridad: ${prioridad}`)
  } catch (error) {
    console.error(`❌ Error updating lead:`, error)
    throw error
  }
}

/**
 * Obtener lead de compra por sender_id
 */
export async function getPurchaseLeadBySenderId(metaSenderId: string): Promise<any> {
  const query = `SELECT * FROM purchase_leads WHERE meta_sender_id = $1`
  const result = await sql(query, [metaSenderId])
  return result.rows[0] || null
}

/**
 * Resetear lead de compra para reintentar
 */
export async function resetPurchaseLead(leadId: number): Promise<void> {
  const query = `
    UPDATE purchase_leads
    SET 
      tiene_historial_trabajo = NULL,
      tiene_ssn = NULL,
      credito_activo = NULL,
      ingresos_40_mas = NULL,
      estado_calificacion = 'paso_1',
      prioridad = 'MEDIA',
      updated_at = NOW()
    WHERE id = $1
  `
  await sql(query, [leadId])
}
