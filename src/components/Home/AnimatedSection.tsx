'use client'

import { ReactNode } from 'react'
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'zoomIn'
  delay?: number
  duration?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
}: AnimatedSectionProps) {
  return (
    <ScrollAnimationWrapper
      animation={animation}
      delay={delay}
      duration={duration}
      threshold={threshold}
    >
      {children}
    </ScrollAnimationWrapper>
  )
}
