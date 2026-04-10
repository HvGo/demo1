'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export function FooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/linkinbio') return null

  return <>{children}</>
}
