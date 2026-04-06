'use client'

import { ReactNode } from 'react'

interface HeroClientProps {
  children: ReactNode
}

export default function HeroClient({ children }: HeroClientProps) {
  return (
    <section 
      className='!py-0'
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      {children}
    </section>
  )
}
