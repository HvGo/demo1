import { sql } from '@/lib/db'
import { validateSchema, sanitizeSchema } from '@/lib/schema/validator'

export interface DbSchemaMarkup {
  id: number
  key: string
  schemaType: string
  schemaData: Record<string, any>
  isActive: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Obtiene un schema por su key
 */
export async function getSchemaMarkupByKey(key: string): Promise<DbSchemaMarkup | null> {
  try {
    const { rows } = await sql<{
      id: number
      key: string
      schema_type: string
      schema_data: Record<string, any>
      is_active: boolean
      priority: number
      created_at: string
      updated_at: string
    }>(
      `
      SELECT id, key, schema_type, schema_data, is_active, priority, created_at, updated_at
      FROM schema_markup
      WHERE key = $1 AND is_active = true
      LIMIT 1
      `,
      [key]
    )

    const r = rows[0]
    if (!r) return null

    return {
      id: r.id,
      key: r.key,
      schemaType: r.schema_type,
      schemaData: r.schema_data,
      isActive: r.is_active,
      priority: r.priority,
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.updated_at)
    }
  } catch (error) {
    console.error(`[SCHEMA] Error fetching schema for key: ${key}`, error)
    return null
  }
}

/**
 * Obtiene todos los schemas activos
 */
export async function getAllActiveSchemaMarkup(): Promise<DbSchemaMarkup[]> {
  try {
    const { rows } = await sql<{
      id: number
      key: string
      schema_type: string
      schema_data: Record<string, any>
      is_active: boolean
      priority: number
      created_at: string
      updated_at: string
    }>(
      `
      SELECT id, key, schema_type, schema_data, is_active, priority, created_at, updated_at
      FROM schema_markup
      WHERE is_active = true
      ORDER BY priority ASC, created_at ASC
      `
    )

    return rows.map(r => ({
      id: r.id,
      key: r.key,
      schemaType: r.schema_type,
      schemaData: r.schema_data,
      isActive: r.is_active,
      priority: r.priority,
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.updated_at)
    }))
  } catch (error) {
    console.error('[SCHEMA] Error fetching all schemas', error)
    return []
  }
}

/**
 * Actualiza un schema y registra en audit log
 */
export async function updateSchemaMarkup(
  key: string,
  newData: Record<string, any>,
  changedBy: string = 'system'
): Promise<DbSchemaMarkup | null> {
  try {
    // Validar nuevo schema
    const validation = validateSchema(newData)
    if (!validation.valid) {
      throw new Error(`Invalid schema: ${validation.errors.join(', ')}`)
    }

    // Sanitizar datos
    const sanitized = sanitizeSchema(newData)

    // Obtener schema anterior para audit
    const oldSchema = await getSchemaMarkupByKey(key)

    // Actualizar schema
    const { rows } = await sql<{
      id: number
      key: string
      schema_type: string
      schema_data: Record<string, any>
      is_active: boolean
      priority: number
      created_at: string
      updated_at: string
    }>(
      `
      UPDATE schema_markup
      SET schema_data = $1, updated_at = NOW()
      WHERE key = $2
      RETURNING id, key, schema_type, schema_data, is_active, priority, created_at, updated_at
      `,
      [sanitized, key]
    )

    if (rows.length === 0) {
      throw new Error(`Schema not found: ${key}`)
    }

    // Registrar en audit log
    await sql(
      `
      INSERT INTO schema_audit_log (schema_key, old_data, new_data, changed_by)
      VALUES ($1, $2, $3, $4)
      `,
      [key, oldSchema?.schemaData || null, sanitized, changedBy]
    )

    const r = rows[0]
    return {
      id: r.id,
      key: r.key,
      schemaType: r.schema_type,
      schemaData: r.schema_data,
      isActive: r.is_active,
      priority: r.priority,
      createdAt: new Date(r.created_at),
      updatedAt: new Date(r.updated_at)
    }
  } catch (error) {
    console.error(`[SCHEMA] Error updating schema for key: ${key}`, error)
    throw error
  }
}

/**
 * Obtiene el audit log de un schema
 */
export async function getSchemaAuditLog(key: string, limit: number = 10) {
  try {
    const { rows } = await sql<{
      id: number
      schema_key: string
      old_data: Record<string, any> | null
      new_data: Record<string, any>
      changed_by: string
      changed_at: string
    }>(
      `
      SELECT id, schema_key, old_data, new_data, changed_by, changed_at
      FROM schema_audit_log
      WHERE schema_key = $1
      ORDER BY changed_at DESC
      LIMIT $2
      `,
      [key, limit]
    )

    return rows.map(r => ({
      id: r.id,
      schemaKey: r.schema_key,
      oldData: r.old_data,
      newData: r.new_data,
      changedBy: r.changed_by,
      changedAt: new Date(r.changed_at)
    }))
  } catch (error) {
    console.error(`[SCHEMA] Error fetching audit log for key: ${key}`, error)
    return []
  }
}

/**
 * Activa/desactiva un schema
 */
export async function toggleSchemaActive(key: string, isActive: boolean): Promise<boolean> {
  try {
    await sql(
      `
      UPDATE schema_markup
      SET is_active = $1, updated_at = NOW()
      WHERE key = $2
      `,
      [isActive, key]
    )

    return true
  } catch (error) {
    console.error(`[SCHEMA] Error toggling schema: ${key}`, error)
    return false
  }
}
