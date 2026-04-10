'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import SuccessStoriesClient from './SuccessStoriesClient'

export default function SuccessStories() {
  const stories = [
    {
      title: 'First-Time Buyers',
      subtitle: '',
      quote: '"Ivan and his team were incredibly patient and took the time to answer every question, providing clear, thoughtful guidance every step of the way. He made what could have been a stressful experience feel simple and easy to understand for a first-time buyer like me."',
      author: 'Carlos Gonzalez',
      strategy: 'We use informational videos and step-by-step guides to ensure you are never in the dark.',
      spanishTip: 'Guía paso a paso para que su primera compra sea sin estrés y con total claridad.'
    },
    {
      title: 'Grants & Credits',
      subtitle: '',
      quote: '"Ivan junto con Lissy nos llevaron prácticamente de la mano. En la negociación me consiguió mucho más de lo que esperaba para los gastos de cierre y para comprar interés. Son muy profesionales, 100% recomendados."',
      author: 'Juan Roman',
      strategy: 'We don\'t just find the house; we negotiate the Seller Credits and Interest Rate Buy-downs that make the payment affordable.',
      spanishTip: 'Maximizamos sus beneficios negociando créditos del vendedor y bajando su tasa de interés.'
    },
    {
      title: 'Dignity & Legacy',
      subtitle: '',
      quote: '"Iván me ayudó muy bien con la compra de mi casa, estoy muy agradecido y muy contento. Ivan is the best realtor in Utah, he makes the process so easy and is so professional."',
      author: 'Jose Tapia',
      strategy: 'We specialize in ITIN lending, connecting families with local credit unions that offer competitive terms and no monthly mortgage insurance (PMI).',
      spanishTip: 'Especialistas en préstamos con ITIN. Su estatus no es un obstáculo para construir su patrimonio.'
    },
    {
      title: 'Listing Strategy',
      subtitle: '',
      quote: '"Ivan helped us develop the right pricing strategy, advised us on improving the condition of the house, and created a strong marketing campaign. Thanks to his strategy, we sold for $15,000 more than expected."',
      author: 'Hugo Hartley',
      strategy: 'As a Broker-Owner, I use advanced marketing—including 3D tours and targeted video—to ensure your home stands out and sells for top dollar.',
      spanishTip: 'Vendemos su propiedad por el mejor precio posible usando tecnología y marketing de vanguardia.'
    }
  ]

  return (
    <section id="success-stories" className="py-16 md:py-24 bg-gray-50 dark:bg-dark/50">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Historias de Éxito
          </p>
          <p className="text-xl font-semibold mb-6" style={{ color: '#00A86B' }}>
            Real Stories. Real Wealth. Real Results.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;Real families, real results, real dreams realized.&quot; Meet the families who&apos;ve transformed their lives through homeownership with our guidance.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
                  {story.title}
                </h3>
                <p className="text-sm font-semibold" style={{ color: '#00A86B' }}>
                  {story.subtitle}
                </p>
              </div>

              <blockquote className="border-l-4 pl-4 mb-6" style={{ borderColor: '#00A86B' }}>
                <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                  {story.quote}
                </p>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  — {story.author}
                </p>
              </blockquote>

              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)' }}>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-dark dark:text-white">The Strategy:</span> {story.strategy}
                </p>
              </div>

              <p className="text-sm italic" style={{ color: '#00A86B' }}>
                {story.spanishTip}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)', borderColor: 'rgba(0, 168, 107, 0.2)', border: '1px solid rgba(0, 168, 107, 0.2)' }}>
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">
            Ready to write your own Success Story?
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            &quot;Hablamos tu idioma. Brindamos resultados.&quot; 
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Whether you are buying your first home in West Valley or selling a horse property in South Jordan, your goals are our priority.
          </p>
          <Link
            href="/contactus"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#00A86B' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
          >
            <Icon icon="mdi:calendar" width={20} height={20} className="text-white" />
            Schedule My Strategy Session
          </Link>
        </div>
      </div>
    </section>
  )
}
