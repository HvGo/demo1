'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function ThreeTierMarketAnalysis() {
  const sections = [
    {
      title: 'The Three-Tier Market Analysis',
      subtitle: 'Análisis de Mercado',
      intro: "We determine your home's winning price by looking at the market from three critical angles to understand exactly what buyers are doing right now:",
      tiers: [
        {
          title: 'The "Sold"',
          subtitle: 'Propiedades Vendidas',
          description: 'We analyze recently sold homes to determine actual market value, final sale prices, and typical seller concessions.'
        },
        {
          title: 'The "Under Contract"',
          subtitle: 'Propiedades Bajo Contrato',
          description: 'We study homes currently pending to identify trends and the exact price points triggering offers today.'
        },
        {
          title: 'The "Active"',
          subtitle: 'Listados Activos',
          description: 'We evaluate your direct competition to ensure your home hits the market as the most attractive option available.'
        }
      ],
      bilingual: 'No adivinamos el precio; usamos datos reales de casas vendidas y activas para asegurar que usted reciba el valor máximo.'
    },
    {
      title: 'Elite Preparation & Premium Media',
      subtitle: 'Preparación y Presentación',
      intro: 'To garner top dollar, your home must look its absolute finest for quality pictures, videos, and showings:',
      features: [
        'Professional Cleaning Service: We provide a professional cleaning to ensure your home garners top dollar by looking its finest.',
        'High-End Visual Suite: We utilize premium photography and cinematic videography to make your property stand out online.',
        '3D Matterport & Drone Tours: We feature immersive 3D tours and drone footage to highlight your home\'s location and lifestyle.',
        'Custom Property Website: Your home gets its own dedicated website (e.g., www.YourAddress.com) to showcase every detail'
      ],
      bilingual: 'Limpieza profesional y marketing visual de alta gama para que su casa destaque y atraiga mejores ofertas.'
    },
    {
      title: 'Aggressive Multi-Channel Marketing',
      subtitle: 'Exposición Total',
      intro: 'We put your home in front of the largest pool of qualified buyers across all major digital platforms:',
      features: [
        'The Big Three: Featured placement on Zillow, Realtor.com, and the official Utah Real Estate MLS.',
        'Social Media Dominance: Targeted ad campaigns on YouTube, Facebook, Instagram, and TikTok to reach active buyers.',
        'YouTube Marketing: Specialized video content to capture relocation buyers and local families searching for their next home.',
        'Open House Strategy: We host strategic events to create urgency and get the most active agents into your home immediately.'
      ],
      bilingual: 'Publicidad pagada en redes sociales y plataformas líderes para asegurar que todos los compradores vean su propiedad.'
    },
    {
      title: 'Negotiation & The "Broker-Owner" Advantage',
      subtitle: 'Negociación',
      intro: 'With 20+ years of experience and the trust of 1,000+ families, I manage the most critical phase: the negotiation.',
      features: [
        'Strategic Terms: We negotiate stronger terms, interest rate buy-downs, and concessions to maximize your net profit.',
        'Buyer Vetting: We ensure a buyer\'s financing is secure before you ever sign a contract.',
        'Full Cycle Guidance: From the first inspection to the final signature at closing, we protect your interests.'
      ],
      bilingual: '20 años de experiencia negociando los mejores términos para proteger su dinero y cerrar con éxito.'
    }
  ]

  return (
    <section id="ThreeTierMarketAnalysis" className="py-16 md:py-24 bg-white dark:bg-dark">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Intro */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            &quot;Selling your home isn&apos;t about luck; it&apos;s about a data-driven strategy designed to protect your equity.&quot; &quot;Vender su casa no es cuestión de suerte; es una estrategia basada en datos diseñada para proteger su patrimonio.&quot;
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {/* Section 1: Three-Tier Market Analysis */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-2">
                {sections[0].title}
              </h2>
              <p className="text-lg font-semibold mb-4" style={{ color: '#FF8C00' }}>
                {sections[0].subtitle}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {sections[0].intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {sections[0].tiers?.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-primary/5 to-teal-500/5 dark:from-primary/10 dark:to-teal-500/10 rounded-lg p-8 border border-primary/20 dark:border-primary/30"
                >
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                    {tier.subtitle}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary rounded-r-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 italic">
                <span className="font-semibold"> </span>
                {sections[0].bilingual}
              </p>
            </div>
          </div>

          {/* Sections 2-4: Features-based sections */}
          {sections.slice(1).map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-lg font-semibold mb-4" style={{ color: '#FF8C00' }}>
                  {section.subtitle}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  {section.intro}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {section.features?.map((feature, idx) => {
                  const colonIndex = feature.indexOf(':')
                  const hasBold = colonIndex !== -1
                  const boldText = hasBold ? feature.substring(0, colonIndex + 1) : ''
                  const restText = hasBold ? feature.substring(colonIndex + 1) : feature
                  
                  return (
                    <div key={idx} className="flex gap-4">
                      <Icon icon="mdi:check-circle" width={24} height={24} className="flex-shrink-0 mt-1" style={{ color: '#00A86B' }} />
                      <p className="text-gray-700 dark:text-gray-300">
                        {hasBold && <span className="font-bold">{boldText}</span>}
                        {restText}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary rounded-r-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  <span className="font-semibold"> </span>
                  {section.bilingual}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-8 md:p-12 border border-primary/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-2">
              Ready to see how much equity you have?
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              ¿Listo para ver su ganancia?
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              &quot;I have the buyers ready for this market. Let&apos;s discuss your custom strategy today.&quot;
            </p>
          </div>

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
              Schedule My Strategy Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
