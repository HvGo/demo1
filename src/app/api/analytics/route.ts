import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

type EngagementPayload = {
  sessionId?: string
  page?: string
  depthReached?: number
  activeMs?: number
}

function sanitizePage(page: string): string {
  if (!page) return '/'
  return page.split('?')[0].slice(0, 512)
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EngagementPayload
    const sessionId = (body.sessionId || '').trim().slice(0, 100)
    const page = sanitizePage(body.page || '')
    const depth = Math.min(Math.max(body.depthReached ?? 0, 0), 100)
    const activeMs = Math.max(body.activeMs ?? 0, 0)

    if (!sessionId || !page) {
      return NextResponse.json(
        { error: 'sessionId and page are required' },
        { status: 400 }
      )
    }

    await sql(
      `
      INSERT INTO session_engagement (session_id, page, depth_reached, active_ms, last_event_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (session_id, page)
      DO UPDATE SET
        depth_reached = GREATEST(session_engagement.depth_reached, EXCLUDED.depth_reached),
        active_ms = session_engagement.active_ms + EXCLUDED.active_ms,
        last_event_at = NOW();
      `,
      [sessionId, page, depth, activeMs]
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
