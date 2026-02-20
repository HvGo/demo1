'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const UTM_KEY = 'utm_data'

export default function UTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respetar first-touch: no sobreescribir si ya existe
    const existing = window.localStorage.getItem(UTM_KEY)
    if (existing) return

    const utmSource = searchParams.get('utm_source') || undefined
    const utmMedium = searchParams.get('utm_medium') || undefined
    const utmCampaign = searchParams.get('utm_campaign') || undefined

    // Solo guardar si encontramos algún UTM
    if (utmSource || utmMedium || utmCampaign) {
      const referrer = document.referrer || undefined
      const payload = { utmSource, utmMedium, utmCampaign, referrer }
      window.localStorage.setItem(UTM_KEY, JSON.stringify(payload))
    }
  }, [pathname, searchParams])

  return null
}
