import { NextRequest, NextResponse } from 'next/server'
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { validateSchema } from '@/lib/schema/validator'

const CACHE_TTL = 3600 // 1 hora
const STALE_TTL = 86400 // 1 día

/**
 * GET /api/schema/[key]
 * Obtiene un schema por su key con caching
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params

    // Validar que key es válido
    if (!key || typeof key !== 'string' || key.length > 255) {
      return NextResponse.json(
        { error: 'Invalid schema key' },
        { status: 400 }
      )
    }

    console.log(`[SCHEMA API] Fetching schema for key: ${key}`)

    const startTime = performance.now()

    // Obtener schema de BD
    const schema = await getSchemaMarkupByKey(key)

    if (!schema) {
      console.warn(`[SCHEMA API] Schema not found: ${key}`)
      return NextResponse.json(
        { error: 'Schema not found' },
        { status: 404 }
      )
    }

    // Validar schema
    const validation = validateSchema(schema.schemaData)
    if (!validation.valid) {
      console.error(`[SCHEMA API] Invalid schema: ${key}`, validation.errors)
      return NextResponse.json(
        {
          error: 'Invalid schema',
          details: validation.errors
        },
        { status: 500 }
      )
    }

    const duration = performance.now() - startTime
    console.log(`[SCHEMA API] Schema fetch took ${duration.toFixed(2)}ms`)

    // Alertar si toma más de 500ms
    if (duration > 500) {
      console.warn(`[SCHEMA API] Slow schema fetch: ${key} took ${duration.toFixed(2)}ms`)
    }

    // Retornar con headers de cache
    const response = NextResponse.json(schema.schemaData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
        'X-Schema-Key': key,
        'X-Schema-Type': schema.schemaType,
        'X-Fetch-Duration': `${duration.toFixed(2)}ms`
      }
    })

    return response
  } catch (error) {
    console.error('[SCHEMA API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * HEAD /api/schema/[key]
 * Verifica si un schema existe sin retornar el contenido
 */
export async function HEAD(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params

    const schema = await getSchemaMarkupByKey(key)

    if (!schema) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
        'X-Schema-Key': key,
        'X-Schema-Type': schema.schemaType
      }
    })
  } catch (error) {
    console.error('[SCHEMA API HEAD] Error:', error)
    return new NextResponse(null, { status: 500 })
  }
}
