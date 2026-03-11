'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

const faqs = [
  {
    question: '¿Puedo comprar casa sin enganche o si no tengo dinero ahorrado?',
    englishQuestion: 'Can I buy a home with zero down payment?',
    answer: 'La respuesta es SÍ. No necesita el 20% de enganche que muchos creen. En Utah, utilizamos programas de Down Payment Assistance (DPA) como Utah Housing, que cubren el pago inicial por usted. Mi meta es que mantenga sus ahorros en su cuenta para emergencias o mejoras en su nuevo hogar. We specialize in strategies that get you the keys with the least amount of cash possible.',
    icon: 'mdi:home-outline'
  },
  {
    question: '¿Existen préstamos con ITIN?',
    englishQuestion: 'Is it possible to buy a home with an ITIN number?',
    answer: 'Absolutamente. El 15% de nuestro negocio se enfoca en familias con ITIN. No deje que el miedo o la falta de información lo detenga de construir su patrimonio. Trabajamos con prestamistas especializados que entienden su situación y valoran su historial de trabajo. Dignity and Homeownership are for everyone who works hard for their future. Nosotros conocemos el camino legal y seguro para lograrlo.',
    icon: 'mdi:account-check'
  },
  {
    question: '¿Cómo funciona el Grant de $20,000 y otros programas?',
    englishQuestion: 'How do I get the $20k Grant or other city funds?',
    answer: 'Existen fondos "gratuitos" (Grants) que no tienen que devolverse, como el Utah First-Time Homebuyer Grant de $20,000 para casas nuevas. Sin embargo, estos fondos son limitados y tienen reglas específicas de precio y ubicación. También existen City Grants en ciudades específicas. Our job is to "stack" these opportunities. Nosotros monitoreamos estos fondos diariamente para que, si hay dinero disponible en la mesa, sea para su familia.',
    icon: 'mdi:cash-multiple'
  }
]

export const CommonDoubts = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-4xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Common Doubts, Strategic Answers</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 mb-6'>
            Respuestas Reales para Compradores en Utah
          </p>
          <div className='bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-6 border border-primary/20'>
            <p className='text-gray-700 dark:text-gray-300 italic'>
              &quot;En el mercado de hoy, la desinformación es su mayor enemigo. Aquí le doy la realidad sobre los temas que más preocupan a mi comunidad.&quot;
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full px-6 py-5 bg-white dark:bg-dark hover:bg-gray-50 dark:hover:bg-dark/80 transition-colors flex items-start gap-4 text-left'
              >
                <Icon icon={faq.icon} width={24} height={24} className='text-primary flex-shrink-0 mt-1' />
                <div className='flex-1'>
                  <h3 className='font-bold text-lg text-gray-900 dark:text-white mb-1'>
                    {faq.question}
                  </h3>
                  <p className='text-sm text-primary font-semibold'>
                    {faq.englishQuestion}
                  </p>
                </div>
                <Icon
                  icon={openIndex === index ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                  width={24}
                  height={24}
                  className='text-gray-400 flex-shrink-0 mt-1'
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className='px-6 py-5 bg-gray-50 dark:bg-dark/50 border-t border-gray-200 dark:border-gray-700'>
                  <p className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='mt-12 bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-8 border border-primary/20 text-center'>
          <h3 className='text-2xl font-bold mb-4'>¿Tienes más preguntas?</h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Estoy aquí para responder todas tus dudas y ayudarte a construir tu patrimonio.
          </p>
          <a href='/contactus' className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow'>
            <Icon icon='mdi:phone' width={20} height={20} />
            Contáctame Hoy
          </a>
        </div>
      </div>
    </section>
  )
}
