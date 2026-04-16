'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface PaymentCalculatorClientProps {
  children: React.ReactNode
}

export default function PaymentCalculatorClient({ children }: PaymentCalculatorClientProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 1,
        transform: isVisible ? 'translateY(0)' : 'translateY(0)',
        transition: 'all 0.3s ease-out',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}
