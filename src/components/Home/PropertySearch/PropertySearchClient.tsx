'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface PropertySearchClientProps {
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export default function PropertySearchClient({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PropertySearchClientProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}
      className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
    >
      {primaryLabel && primaryHref && (
        <Link
          href={primaryHref}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 text-dark bg-primary shadow-lg shadow-black/25 ring-1 ring-white/10 transition-colors whitespace-nowrap"
        >
          <Icon icon="ph:map-trifold-fill" className="text-lg sm:text-xl flex-shrink-0" />
          {primaryLabel}
        </Link>
      )}
      {secondaryLabel && secondaryHref && (
        <Link
          href={secondaryHref}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 text-white border border-white/60 hover:bg-white/10 transition-colors whitespace-nowrap"
        >
          <Icon icon="ph:house-line-fill" className="text-lg sm:text-xl flex-shrink-0" />
          {secondaryLabel}
        </Link>
      )}
    </div>
  )
}
