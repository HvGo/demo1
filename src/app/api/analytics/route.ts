import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

type EngagementPayload = {
  sessionId?: string
  page?: string
  depthReached?: number
  activeMs?: number
  geoCountry?: string | null
  geoCity?: string | null
  geoLatitude?: number | null
  geoLongitude?: number | null
}

function sanitizePage(page: string): string {
  if (!page) return '/'
  return page.split('?')[0].slice(0, 512)
}

function parseUserAgent(ua: string) {
  const lower = ua.toLowerCase()
  const device_type = /mobile|android|iphone|ipad/.test(lower) ? 'mobile' : 'desktop'

  let os = 'Unknown'
  if (lower.includes('windows')) os = 'Windows'
  else if (lower.includes('mac')) os = 'macOS'
  else if (lower.includes('iphone') || lower.includes('ipad')) os = 'iOS'
  else if (lower.includes('linux')) os = 'Linux'

  let browser = 'Unknown'
  if (lower.includes('edg')) browser = 'Edge'
  else if (lower.includes('chrome')) browser = 'Chrome'
  else if (lower.includes('safari') && !lower.includes('chrome')) browser = 'Safari'
  else if (lower.includes('firefox')) browser = 'Firefox'
  else if (lower.includes('opr') || lower.includes('opera')) browser = 'Opera'
  else if (lower.includes('msie') || lower.includes('trident')) browser = 'IE'

  return { device_type, os, browser }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EngagementPayload
    const sessionId = (body.sessionId || '').trim().slice(0, 100)
    const page = sanitizePage(body.page || '')
    const depth = Math.min(Math.max(body.depthReached ?? 0, 0), 100)
    const activeMs = Math.max(body.activeMs ?? 0, 0)
    const geoCountry = body.geoCountry ? String(body.geoCountry).slice(0, 100) : null
    const geoCity = body.geoCity ? String(body.geoCity).slice(0, 100) : null
    const geoLatitude = body.geoLatitude ? parseFloat(String(body.geoLatitude)) : null
    const geoLongitude = body.geoLongitude ? parseFloat(String(body.geoLongitude)) : null

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'sessionId and page are required' },
        { status: 400 }
      )
    }

    // Obtener User Agent
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const { device_type, os, browser } = parseUserAgent(userAgent)

    console.log('[ANALYTICS_POST] Received:', {
      sessionId,
      page,
      depth,
      activeMs,
      geoCountry,
      geoCity,
      geoLatitude,
      geoLongitude,
    })
    
    console.log('[ANALYTICS_POST] About to insert with values:', {
      sessionId,
      page,
      depth,
      activeMs,
      device_type,
      os,
      browser,
      userAgent: userAgent.substring(0, 100),
      geoCountry,
      geoCity,
      geoLatitude,
      geoLongitude,
    })

    await sql(
      `
      INSERT INTO session_engagement (session_id, page, depth_reached, active_ms, device_type, os, browser, user_agent, geo_country, geo_city, geo_latitude, geo_longitude, last_event_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
      ON CONFLICT (session_id, page)
      DO UPDATE SET
        depth_reached = GREATEST(session_engagement.depth_reached, EXCLUDED.depth_reached),
        active_ms = session_engagement.active_ms + EXCLUDED.active_ms,
        device_type = EXCLUDED.device_type,
        os = EXCLUDED.os,
        browser = EXCLUDED.browser,
        user_agent = EXCLUDED.user_agent,
        geo_country = EXCLUDED.geo_country,
        geo_city = EXCLUDED.geo_city,
        geo_latitude = EXCLUDED.geo_latitude,
        geo_longitude = EXCLUDED.geo_longitude,
        last_event_at = NOW();
      `,
      [sessionId, page, depth, activeMs, device_type, os, browser, userAgent, geoCountry, geoCity, geoLatitude, geoLongitude]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ANALYTICS_POST]', error)
    return NextResponse.json({ error: 'Failed to store analytics' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to send engagement events.' })
}
