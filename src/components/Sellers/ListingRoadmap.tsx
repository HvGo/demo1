'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ListingRoadmap() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const steps = [
    {
      number: 1,
      title: 'Market Intelligence & Analysis',
      subtitle: 'The Strategy: Precision Pricing | El Precio Ganador',
      items: [
        'Market Data: We perform a three-tier analysis of Sold, Under Contract, and Active properties to find your "Sweet Spot".',
        'The "Uncontrollables": We strategize around current Interest Rates, the Economy, and Competition to ensure your home is positioned to win.',
        'No adivinamos el precio; usamos datos reales para asegurar que usted reciba el valor máximo.'
      ],
      icon: 'mdi:chart-line'
    },
    {
      number: 2,
      title: 'Elite Preparation & Transformation',
      subtitle: 'The Presentation: First Impressions | Preparación de Élite',
      items: [
        'Professional Cleaning: We provide a professional cleaning service to ensure your home looks its absolute finest for the camera.',
        'Condition Control: We advise on the essential factors—Condition and Terms—that you control to increase perceived value.',
        'Limpieza profesional y preparación estratégica para que su casa destaque desde el primer segundo.'
      ],
      icon: 'mdi:home-heart'
    },
    {
      number: 3,
      title: 'High-Impact Digital Launch',
      subtitle: 'The Marketing: Maximum Exposure | Marketing Total',
      items: [
        'Visual Suite: Your home is captured with Premium Photography, Cinematic Video, 3D Matterport, and Drone footage.',
        'Omni-Channel Ads: We launch aggressive campaigns across YouTube, Facebook, Instagram, and TikTok.',
        'Publicidad agresiva en todas las redes sociales para atraer al mayor número de compradores calificados.'
      ],
      icon: 'mdi:rocket'
    },
    {
      number: 4,
      title: 'Strategic Negotiation & Vetting',
      subtitle: 'The Defense: Protecting Your Profit | Negociación Experta',
      items: [
        'Expert Advocacy: With 22+ years of experience, I negotiate the best price and terms to maximize your net profit.',
        'Buyer Vetting: We verify every buyer\'s financing and professional status before moving forward.',
        'Protegemos sus ganancias negociando los mejores términos y reduciendo sus gastos de cierre.'
      ],
      icon: 'mdi:handshake'
    },
    {
      number: 5,
      title: 'Successful Closing & Celebration',
      subtitle: 'The Result: Mission Accomplished | Cierre y Resultados',
      items: [
        'Full Cycle Guidance: We manage every detail from the inspection and appraisal to the final signature.',
        'Trust & Results: You join the over 1,100 families who have trusted Blue Key Realty to achieve their goals.',
        'Manejamos todo el proceso legal y de títulos para un cierre seguro y sin sorpresas.'
      ],
      icon: 'mdi:check-circle'
    }
  ]

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
      <section id="ListingRoadmap" className="py-16 md:py-24 bg-white dark:bg-dark">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            The Listing Roadmap
          </h2>
          <p className="text-lg font-semibold mb-6" style={{ color: '#FF8C00' }}>
            El Camino a la Venta
          </p>
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-6">
            5 Steps to Maximize Your Equity
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;Selling is not luck. It&apos;s a proven strategy to protect your legacy.&quot;
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            &quot;Vender no es cuestión de suerte. Es una estrategia probada para proteger su patrimonio.&quot;
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-lg p-8 border"
              style={{ backgroundColor: 'rgba(0, 168, 107, 0.05)', borderColor: 'rgba(0, 168, 107, 0.2)' }}
            >
              <div className="flex items-start gap-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: '#00A86B' }}>
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                        {step.subtitle}
                      </p>
                    </div>
                    <Icon icon={step.icon} width={32} height={32} className="flex-shrink-0" style={{ color: '#00A86B' }} />
                  </div>

                  {/* Items */}
                  <ul className="space-y-3">
                    {step.items.map((item, itemIdx) => {
                      const colonIndex = item.indexOf(':')
                      const hasBold = colonIndex !== -1
                      const boldText = hasBold ? item.substring(0, colonIndex + 1) : ''
                      const restText = hasBold ? item.substring(colonIndex + 1) : item
                      
                      return (
                        <li key={itemIdx} className="flex gap-3">
                          <Icon icon="mdi:bullet" width={20} height={20} className="flex-shrink-0 mt-0.5" style={{ color: '#00A86B' }} />
                          <span className="text-gray-700 dark:text-gray-300">
                            {hasBold && <span className="font-bold">{boldText}</span>}
                            {restText}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="ml-8 mt-6 h-8 border-l-2" style={{ borderColor: 'rgba(0, 168, 107, 0.3)' }}></div>
              )}
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="flex justify-center mb-16">
          <Image
            src="/images/Gallery/roadmap_seller.jpg"
            alt="Selling Roadmap"
            width={800}
            height={400}
            className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-8 md:p-12 border border-primary/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contactus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: '#00A86B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
            >
              <Icon icon="mdi:file-document" width={20} height={20} />
              Get My Equity Report
            </Link>
            <Link
              href="/contactus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: '#00A86B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
            >
              <Icon icon="mdi:calendar" width={20} height={20} />
              Schedule a Strategy Session
            </Link>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}
