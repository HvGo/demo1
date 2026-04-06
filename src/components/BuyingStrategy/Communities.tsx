'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import CommunitiesClient from './CommunitiesClient'

export default function Communities() {
  const counties = [
    {
      name: 'Salt Lake County',
      subtitle: 'The Economic Core',
      spanishSubtitle: 'El motor de Utah y la zona de mayor plusvalía',
      description: 'Salt Lake County is ideal for families seeking stability, established infrastructure, and proximity to major employment hubs.',
      vibe: 'Urban energy meets suburban comfort.',
      majorCities: ['Salt Lake City', 'West Jordan', 'West Valley City', 'South Jordan', 'Sandy', 'Taylorsville', 'Murray', 'Riverton', 'Herriman'],
      suburban: ['Millcreek', 'Holladay', 'Cottonwood Heights', 'Midvale', 'Kearns', 'Magna'],
      insight: 'Perfect for buyers utilizing City-Specific Grants and long-term appreciation.'
    },
    {
      name: 'Utah County',
      subtitle: 'The Silicon Slopes',
      spanishSubtitle: 'Crecimiento tecnológico y oportunidades de casas nuevas',
      description: 'The nation\'s eyes are on Utah County. This is the capital of new construction and high-tech growth, making it an investor\'s paradise.',
      vibe: 'High-energy, family-focused, and rapidly developing.',
      majorCities: ['Provo', 'Orem', 'Lehi', 'Spanish Fork', 'Pleasant Grove', 'Springville', 'American Fork'],
      suburban: ['Eagle Mountain', 'Saratoga Springs', 'Vineyard', 'Payson', 'Santaquin'],
      insight: 'The #1 destination for the $20,000 New Construction Grant.'
    },
    {
      name: 'Davis County',
      subtitle: 'Quality of Life',
      spanishSubtitle: 'Equilibrio perfecto entre seguridad y conveniencia',
      description: 'Davis County offers a stable, high-quality lifestyle with some of the strongest resale values in the state.',
      vibe: 'Established, safe, and community-driven.',
      majorCities: ['Layton', 'Bountiful', 'Kaysville', 'Clearfield', 'Syracuse', 'Farmington', 'Clinton'],
      suburban: ['North Salt Lake', 'Centerville', 'Woods Cross', 'West Point'],
      insight: 'Ideal for move-up buyers looking for established neighborhoods and top-rated schools.'
    },
    {
      name: 'Weber County',
      subtitle: 'Opportunity & Heritage',
      spanishSubtitle: 'Carácter histórico y precios competitivos',
      description: 'For those seeking affordability without sacrificing lifestyle, Weber County offers incredible "bang for your buck."',
      vibe: 'Historic charm meets mountain adventure.',
      majorCities: ['Ogden', 'Roy', 'West Haven', 'North Ogden', 'South Ogden'],
      suburban: ['Pleasant View', 'Harrisville', 'Farr West', 'Riverdale'],
      insight: 'Great for first-time buyers looking to maximize their buying power.'
    },
    {
      name: 'Tooele County',
      subtitle: 'More Space, More Home',
      spanishSubtitle: 'Estilo de vida relajado y terrenos más amplios',
      description: 'Tooele is the preferred choice for families who want a larger home and a quieter atmosphere just west of the valley.',
      vibe: 'Open spaces and modern suburban retreats.',
      majorCities: ['Tooele City', 'Grantsville', 'Erda', 'Stansbury Park', 'Lake Point'],
      insight: 'The best value-per-square-foot within commuting distance of SLC.'
    }
  ]

  return (
    <CommunitiesClient>
      <section className="py-16 md:py-24 bg-white dark:bg-dark">
        <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Our Strategic Service Areas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Áreas de Servicio Estratégicas
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              &quot;Donde quiera que esté su sueño, nosotros conocemos el camino.&quot; Success in the Utah market requires more than just a license; it requires Local Market Intelligence. From the booming tech corridors of the Silicon Slopes to the historic streets of Ogden, I provide the data-driven strategy you need to win in every zip code across the Wasatch Front.
            </p>
          </div>

          {/* Counties Grid */}
          <div className="space-y-8 mb-16">
          {counties.map((county, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark/50 dark:to-dark/30 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(0, 168, 107, 0.2)' }}>
                  <Icon icon="mdi:map-marker" width={24} height={24} style={{ color: '#00A86B' }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-dark dark:text-white">
                    {county.name}
                  </h3>
                  <p className="text-lg font-semibold mb-1" style={{ color: '#00A86B' }}>
                    {county.subtitle}
                  </p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    {county.spanishSubtitle}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {county.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    &quot;We don&apos;t just know the market, we know your neighbors.&quot;
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="font-semibold text-dark dark:text-white mb-2">The Vibe:</p>
                  <p className="text-gray-700 dark:text-gray-300">{county.vibe}</p>
                </div>
                <div>
                  <p className="font-semibold text-dark dark:text-white mb-2">Ivan&apos;s Insight:</p>
                  <p className="text-gray-700 dark:text-gray-300">{county.insight}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-dark dark:text-white mb-2">Major Cities:</p>
                  <div className="flex flex-wrap gap-2">
                    {county.majorCities.map((city, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)', color: '#00A86B' }}
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
                {county.suburban && (
                  <div>
                    <p className="font-semibold text-dark dark:text-white mb-2">Suburban & Metro:</p>
                    <div className="flex flex-wrap gap-2">
                      {county.suburban.map((area, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>

          {/* Search Section */}
          <div className="rounded-lg p-8 text-center" style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)', borderColor: 'rgba(0, 168, 107, 0.2)', border: '1px solid rgba(0, 168, 107, 0.2)' }}>
            <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">
              Find Your Zip Code
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              &quot;No importa el área, nosotros tenemos la estrategia.&quot; 
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6"> From Salt Lake City to Park City, from Provo to Ogden, we know every market, every lender, and every opportunity.</p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: '#00A86B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
            >
              <Icon icon="mdi:home-search" width={20} height={20} className="text-white" />
              Search Homes by City
            </Link>
          </div>
        </div>
      </section>
    </CommunitiesClient>
  )
}
