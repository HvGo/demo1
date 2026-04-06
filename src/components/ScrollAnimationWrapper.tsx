'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollAnimationWrapperProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'zoomIn'
  delay?: number
  duration?: number
  threshold?: number
}

const animationStyles: Record<string, { initial: Record<string, any>; animate: Record<string, any> }> = {
  fadeIn: {
    initial: { opacity: 0, transform: 'none' },
    animate: { opacity: 1, transform: 'none' },
  },
  slideInUp: {
    initial: { opacity: 0, transform: 'translateY(40px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
  },
  slideInLeft: {
    initial: { opacity: 0, transform: 'translateX(-40px)' },
    animate: { opacity: 1, transform: 'translateX(0px)' },
  },
  slideInRight: {
    initial: { opacity: 0, transform: 'translateX(40px)' },
    animate: { opacity: 1, transform: 'translateX(0px)' },
  },
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.95)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  },
  zoomIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  },
}

export function ScrollAnimationWrapper({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
}: ScrollAnimationWrapperProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin: '0px' })
  const animStyle = animationStyles[animation]

  // Siempre usar el estado inicial primero, luego animar
  const currentStyle = isVisible ? animStyle.animate : animStyle.initial

  return (
    <div
      ref={ref}
      style={{
        opacity: currentStyle.opacity as number,
        transform: currentStyle.transform as string,
        transition: isVisible ? `opacity ${duration}ms ease-out, transform ${duration}ms ease-out` : 'none',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
