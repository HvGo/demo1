'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Program {
  title: string
  description: string
  features: string[]
  spanishNote?: string
}

interface DownPaymentAssistanceClientProps {
  programs: Program[]
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s ease-out ${index * 0.1}s`,
      }}
      className="bg-gradient-to-br from-primary/5 to-teal-500/5 dark:from-primary/10 dark:to-teal-500/10 rounded-lg p-8 border border-primary/20 dark:border-primary/30"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-teal-500/20 dark:bg-teal-500/30 p-3 rounded-lg flex-shrink-0">
          <Icon icon="mdi:check-circle" width={24} height={24} className="text-teal-500" />
        </div>
        <h3 className="text-xl font-bold text-dark dark:text-white">
          {program.title}
        </h3>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {program.description}
      </p>

      <ul className="space-y-3 mb-4">
        {program.features.map((feature, idx) => {
          const boldPatterns = ['Low Cash Entry:', 'Competitive Rates:', 'Repeat Buyers Welcome:', 'Price Cap:', 'Usage:', 'Availability:', 'FHA Loans:', 'Conventional Loans:', 'Seller Credits:']
          let boldText = ''
          let restText = feature
          
          for (const pattern of boldPatterns) {
            if (feature.startsWith(pattern)) {
              boldText = pattern
              restText = feature.substring(pattern.length)
              break
            }
          }
          
          return (
            <li key={idx} className="flex items-start gap-3">
              <Icon icon="mdi:bullet" width={20} height={20} className="flex-shrink-0 mt-0.5" style={{ color: '#00A86B' }} />
              <span className="text-gray-700 dark:text-gray-300">
                {boldText && <span className="font-bold">{boldText}</span>}
                {restText}
              </span>
            </li>
          )
        })}
      </ul>

      {program.spanishNote && (
        <p className="text-sm italic pt-4 border-t" style={{ color: '#00A86B', borderColor: 'rgba(0, 168, 107, 0.2)' }}>
          {program.spanishNote}
        </p>
      )}
    </div>
  )
}

export default function DownPaymentAssistanceClient({ programs }: DownPaymentAssistanceClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {programs.map((program, index) => (
        <ProgramCard key={index} program={program} index={index} />
      ))}
    </div>
  )
}
