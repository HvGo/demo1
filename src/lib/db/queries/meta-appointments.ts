/**
 * Queries para tabla meta_appointments
 */

import { sql } from '@/lib/db'

export interface CreateAppointmentParams {
  contactId: number
  metaMessageId?: string
  scheduledDate: Date
  propertyId?: string
  notes: string
}

export interface MetaAppointment {
  id: number
  contact_id: number
  meta_message_id: string | null
  scheduled_date: Date
  property_id: string | null
  notes: string
  status: string
  created_by: string
  created_at: Date
  updated_at: Date
}

/**
 * Crear una nueva cita
 */
export async function createAppointment(
  params: CreateAppointmentParams
): Promise<MetaAppointment> {
  const query = `
    INSERT INTO meta_appointments (
      contact_id,
      meta_message_id,
      scheduled_date,
      property_id,
      notes,
      status,
      created_by
    )
    VALUES ($1, $2, $3, $4, $5, 'pending', 'meta')
    RETURNING *
  `

  const result = await sql<MetaAppointment>(query, [
    params.contactId,
    params.metaMessageId || null,
    params.scheduledDate,
    params.propertyId || null,
    params.notes,
  ])

  return result.rows[0]
}

/**
 * Obtener citas de un contacto
 */
export async function getAppointmentsByContactId(
  contactId: number
): Promise<MetaAppointment[]> {
  const query = `
    SELECT * FROM meta_appointments
    WHERE contact_id = $1
    ORDER BY scheduled_date DESC
  `

  const result = await sql<MetaAppointment>(query, [contactId])
  return result.rows
}

/**
 * Obtener citas próximas (no completadas)
 */
export async function getUpcomingAppointments(
  days: number = 7
): Promise<MetaAppointment[]> {
  const query = `
    SELECT * FROM meta_appointments
    WHERE status IN ('pending', 'confirmed')
    AND scheduled_date >= NOW()
    AND scheduled_date <= NOW() + INTERVAL '${days} days'
    ORDER BY scheduled_date ASC
  `

  const result = await sql<MetaAppointment>(query)
  return result.rows
}

/**
 * Obtener una cita específica
 */
export async function getAppointmentById(
  appointmentId: number
): Promise<MetaAppointment | null> {
  const query = `
    SELECT * FROM meta_appointments
    WHERE id = $1
  `

  const result = await sql<MetaAppointment>(query, [appointmentId])
  return result.rows[0] || null
}

/**
 * Actualizar estado de cita
 */
export async function updateAppointmentStatus(
  appointmentId: number,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<boolean> {
  const query = `
    UPDATE meta_appointments
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING id
  `

  const result = await sql<MetaAppointment>(query, [status, appointmentId])
  return result.rows.length > 0
}

/**
 * Obtener citas por propiedad
 */
export async function getAppointmentsByPropertyId(
  propertyId: string
): Promise<MetaAppointment[]> {
  const query = `
    SELECT * FROM meta_appointments
    WHERE property_id = $1
    ORDER BY scheduled_date DESC
  `

  const result = await sql<MetaAppointment>(query, [propertyId])
  return result.rows
}

/**
 * Obtener estadísticas de citas
 */
export async function getAppointmentsStats(
  days: number = 30
): Promise<{
  total: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
}> {
  const query = `
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
      COUNT(*) FILTER (WHERE status = 'completed') as completed,
      COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
    FROM meta_appointments
    WHERE created_at >= NOW() - INTERVAL '${days} days'
  `

  const result = await sql<any>(query)
  const stats = result.rows[0]

  return {
    total: parseInt(stats.total),
    pending: parseInt(stats.pending),
    confirmed: parseInt(stats.confirmed),
    completed: parseInt(stats.completed),
    cancelled: parseInt(stats.cancelled),
  }
}

/**
 * Eliminar citas antiguas (limpieza)
 */
export async function deleteOldAppointments(
  daysOld: number = 180
): Promise<number> {
  const query = `
    DELETE FROM meta_appointments
    WHERE created_at < NOW() - INTERVAL '${daysOld} days'
    AND status IN ('completed', 'cancelled')
  `

  const result = await sql<any>(query)
  return result.rows.length || 0
}
