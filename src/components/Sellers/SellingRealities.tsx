'use client'

import { Icon } from '@iconify/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function SellingRealities() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const factors = [
    {
      title: 'Market Factors',
      subtitle: 'The Uncontrollables',
      intro: 'Things we don\'t control, but we must strategize around:',
      items: [
        'The Economy: Local job growth and the overall financial climate of Utah.',
        'Interest Rates: Current mortgage rates dictate how much a buyer can afford.',
        'Competition: Other homes currently for sale in your neighborhood.'
      ],
      insight: 'We use our Three-Tier Market Analysis to monitor these daily so your home stays ahead of the curve.',
      icon: 'mdi:trending-down'
    },
    {
      title: 'Seller Factors',
      subtitle: 'Your Control',
      intro: 'The decisions only you can make to attract the best offers:',
      items: [
        'Condition: Following our Elite Prep & Cleaning plan to make the home shine.',
        'Price: Setting a strategic "Sweet Spot" based on our data, not a guess.',
        'Terms: Being flexible with closing dates or specialized buyer requests.'
      ],
      insight: 'I will provide the data, but you hold the power to make your home the most "desired" on the market.',
      icon: 'mdi:hand-right'
    },
    {
      title: 'Realtor Factors',
      subtitle: 'My Commitment',
      intro: 'Where my 22+ years of expertise and Top 500 status work for you:',
      items: [
        'Marketing: Our Premium Visual Suite ensures your home is famous on every platform.',
        'Negotiation: We fight for your equity, managing terms and credits to maximize your net profit.',
        'Closing: We handle the complex legal and title process from contract to keys.'
      ],
      insight: 'This is where the "Ivan Utah Realtor" advantage happens—turning a listing into a successful, high-profit sale.',
      icon: 'mdi:briefcase'
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
      <section id="SellingRealities" className="py-16 md:py-24 bg-gray-50 dark:bg-dark/50">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            The Realities of Selling
          </h2>
          <p className="text-lg font-semibold mb-6" style={{ color: '#FF8C00' }}>
            Las Realidades de la Venta
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;To get the highest price, we must master the factors we control and navigate the ones we don&apos;t.&quot;
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            &quot;Para obtener el precio más alto, debemos dominar los factores que controlamos y navegar los que no.&quot;
          </p>
        </div>

        {/* Subheading */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-4">
            What Drives Your Success?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Factores para el Éxito
          </p>
        </div>

        {/* Three Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {factors.map((factor, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="mb-6">
                <Icon icon={factor.icon} width={48} height={48} style={{ color: '#00A86B' }} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">
                {factor.title}
              </h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                {factor.subtitle}
              </p>

              {/* Intro */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                {factor.intro}
              </p>

              {/* Items */}
              <ul className="space-y-3 mb-6">
                {factor.items.map((item, itemIdx) => {
                  const colonIndex = item.indexOf(':')
                  const hasBold = colonIndex !== -1
                  const boldText = hasBold ? item.substring(0, colonIndex + 1) : ''
                  const restText = hasBold ? item.substring(colonIndex + 1) : item
                  
                  return (
                    <li key={itemIdx} className="flex gap-3">
                      <Icon icon="mdi:check" width={20} height={20} className="flex-shrink-0 mt-0.5" style={{ color: '#00A86B' }} />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {hasBold && <span className="font-bold">{boldText}</span>}
                        {restText}
                      </span>
                    </li>
                  )
                })}
              </ul>

              {/* Insight Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-primary">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">  </span>
                  {factor.insight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding these three factors is the key to maximizing your home&apos;s value and ensuring a successful sale.
          </p>
        </div>
      </div>
      </section>
    </div>
  )
}
