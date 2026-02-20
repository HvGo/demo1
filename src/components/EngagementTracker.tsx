'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'session_id'
const THRESHOLDS = [25, 50, 75, 90]

function generateSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  const stored = localStorage.getItem(SESSION_KEY)
  if (stored) return stored
  const id = generateSessionId()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

async function sendEngagement(payload: {
  sessionId: string
  page: string
  depthReached?: number
  activeMs?: number
}) {
  try {
    const body = JSON.stringify(payload)
    const url = '/api/analytics'

    // Try sendBeacon for unload/hidden
    if (typeof navigator !== 'undefined' && navigator.sendBeacon && document.visibilityState === 'hidden') {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon(url, blob)
      return
    }

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch (err) {
    console.error('[ENGAGEMENT_SEND_ERROR]', err)
  }
}

export default function EngagementTracker() {
  const pathname = usePathname()
  const thresholdsReached = useRef<Record<number, boolean>>({})
  const lastActivityRef = useRef<number>(Date.now())
  const pendingActiveMs = useRef<number>(0)
  const sessionIdRef = useRef<string>('')
  const pageRef = useRef<string>('')

  useEffect(() => {
    const sessionId = getSessionId()
    sessionIdRef.current = sessionId
    pageRef.current = pathname || '/'

    const onActivity = () => {
      lastActivityRef.current = Date.now()
    }

    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const viewport = window.innerHeight
      const fullHeight = doc.scrollHeight || viewport
      if (fullHeight === 0) return
      const depth = Math.min(100, Math.round(((scrollTop + viewport) / fullHeight) * 100))

      for (const t of THRESHOLDS) {
        if (!thresholdsReached.current[t] && depth >= t) {
          thresholdsReached.current[t] = true
          sendEngagement({ sessionId, page: pageRef.current, depthReached: t })
        }
      }
    }

    const onInterval = () => {
      const now = Date.now()
      // consider active si hubo actividad en últimos 30s y pestaña visible
      const isActive = document.visibilityState === 'visible' && now - lastActivityRef.current < 30000
      if (isActive) {
        pendingActiveMs.current += 15000
        sendEngagement({
          sessionId,
          page: pageRef.current,
          activeMs: pendingActiveMs.current,
        })
        pendingActiveMs.current = 0
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && pendingActiveMs.current > 0) {
        sendEngagement({
          sessionId,
          page: pageRef.current,
          activeMs: pendingActiveMs.current,
        })
        pendingActiveMs.current = 0
      }
    }

    // initial send for page view depth 0 (optional)
    thresholdsReached.current = {}
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onActivity, { passive: true })
    window.addEventListener('keydown', onActivity, { passive: true })
    window.addEventListener('touchstart', onActivity, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    const interval = window.setInterval(onInterval, 15000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onActivity)
      window.removeEventListener('keydown', onActivity)
      window.removeEventListener('touchstart', onActivity)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.clearInterval(interval)
    }
  }, [])

  // Reset tracking when the route changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    pageRef.current = pathname || '/'
    thresholdsReached.current = {}
    pendingActiveMs.current = 0
    lastActivityRef.current = Date.now()
    // Trigger a scroll check to capture current depth on new page
    const doc = document.documentElement
    const scrollTop = window.scrollY || doc.scrollTop
    const viewport = window.innerHeight
    const fullHeight = doc.scrollHeight || viewport
    if (fullHeight > 0) {
      const depth = Math.min(100, Math.round(((scrollTop + viewport) / fullHeight) * 100))
      for (const t of THRESHOLDS) {
        if (!thresholdsReached.current[t] && depth >= t) {
          thresholdsReached.current[t] = true
          sendEngagement({ sessionId: sessionIdRef.current, page: pageRef.current, depthReached: t })
        }
      }
    }
  }, [pathname])

  return null
}
