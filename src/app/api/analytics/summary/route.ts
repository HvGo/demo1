import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

function parseDate(value: string | null, fallback: Date): Date {
  if (!value) return fallback
  const d = new Date(value)
  return isNaN(d.getTime()) ? fallback : d
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endParam = searchParams.get('end')
    const startParam = searchParams.get('start')

    const end = parseDate(endParam, new Date())
    const start = parseDate(startParam, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    // Totales de contactos y sesiones
    const [{ rows: contactRows }, { rows: sessionRows }] = await Promise.all([
      sql<{ total: number }>(
        'SELECT COUNT(*)::int AS total FROM contacts WHERE created_at BETWEEN $1 AND $2',
        [start.toISOString(), end.toISOString()]
      ),
      sql<{ total: number }>(
        'SELECT COUNT(*)::int AS total FROM session_engagement WHERE last_event_at BETWEEN $1 AND $2',
        [start.toISOString(), end.toISOString()]
      ),
    ])

    // Fuentes (UTM/referrer)
    const { rows: sourceRows } = await sql<{ source: string | null; contacts: number }>(
      `
      SELECT
        COALESCE(NULLIF(utm_source, ''), NULLIF(referrer, ''), 'unknown') AS source,
        COUNT(*)::int AS contacts
      FROM contacts
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY source
      ORDER BY contacts DESC
      LIMIT 50
      `,
      [start.toISOString(), end.toISOString()]
    )

    // Geografía
    const { rows: geoRows } = await sql<{ geo_country: string | null; geo_region: string | null; geo_city: string | null; contacts: number }>(
      `
      SELECT
        COALESCE(NULLIF(geo_country, ''), 'unknown') AS geo_country,
        COALESCE(NULLIF(geo_region, ''), 'unknown') AS geo_region,
        COALESCE(NULLIF(geo_city, ''), 'unknown') AS geo_city,
        COUNT(*)::int AS contacts
      FROM contacts
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY geo_country, geo_region, geo_city
      ORDER BY contacts DESC
      LIMIT 50
      `,
      [start.toISOString(), end.toISOString()]
    )

    // Engagement por página
    const { rows: engagementRows } = await sql<{ page: string; avg_depth: number; avg_active_ms: string; sessions: number }>(
      `
      SELECT
        page,
        AVG(depth_reached)::int AS avg_depth,
        AVG(active_ms)::bigint AS avg_active_ms,
        COUNT(*)::int AS sessions
      FROM session_engagement
      WHERE last_event_at BETWEEN $1 AND $2
      GROUP BY page
      ORDER BY sessions DESC
      LIMIT 50
      `,
      [start.toISOString(), end.toISOString()]
    )

    return NextResponse.json({
      range: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      totals: {
        contacts: contactRows[0]?.total ?? 0,
        sessions: sessionRows[0]?.total ?? 0,
      },
      sources: sourceRows,
      geo: geoRows,
      engagement: engagementRows,
    })
  } catch (error) {
    console.error('[ANALYTICS_SUMMARY]', error)
    return NextResponse.json({ error: 'Failed to fetch analytics summary' }, { status: 500 })
  }
}
