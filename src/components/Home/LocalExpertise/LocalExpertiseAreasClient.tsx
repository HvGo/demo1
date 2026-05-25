'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Area {
  name: string
  description: string
  icon: string
  href: string
}

interface LocalExpertiseAreasClientProps {
  areas: Area[]
}

function AreaCard({ area, index }: { area: Area; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <Link href={area.href}>
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: `all 0.8s ease-out ${index * 0.1}s`,
        }}
        className='bg-gray-50 dark:bg-dark/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer'
      >
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0'>
            <div className='flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary to-teal-500 text-white' style={{ backgroundImage: 'linear-gradient(to right, #273ba8, #febc59 )' }}>
              <Icon icon={area.icon} width={24} height={24} />
            </div>
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-dark dark:text-white mb-2'>{area.name}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{area.description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LocalExpertiseAreasClient({ areas }: LocalExpertiseAreasClientProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {areas.map((area: Area, index: number) => (
        <AreaCard key={index} area={area} index={index} />
      ))}
    </div>
  )
}
