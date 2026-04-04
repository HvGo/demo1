'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function ITINLoans() {
  const advantages = [
    {
      title: 'No Mortgage Insurance (Sin PMI)',
      description: 'Unlike many traditional loans, these ITIN programs often do not require monthly mortgage insurance. This can save you hundreds of dollars every month, making your payment much more affordable.'
    },
    {
      title: 'Competitive Interest Rates',
      description: 'We connect you with local institutions offering rates that rival traditional bank loans.'
    },
    {
      title: 'Flexible Terms',
      description: 'Whether you want to pay off your home quickly or keep your payments low, we offer terms from 7-year to 30-year loans.'
    },
    {
      title: 'Options Tailored to Your Goals',
      description: 'From primary residences to investment properties, we help you choose the right path for your family\'s future.'
    }
  ]

  const qualificationSteps = [
    {
      title: 'Work History',
      description: 'Generally, lenders look for 2 years of consistent work history (Tax returns or bank statements).'
    },
    {
      title: 'Down Payment',
      description: 'Typically, is 5% of the purchase price. We show you how to prepare your savings to meet these guidelines.'
    },
    {
      title: 'Alternative Credit',
      description: 'If you don\'t have a standard credit score, we can use your history of on-time rent, utilities, and phone bills to prove your reliability.'
    },
    {
      title: 'Transparent Process',
      description: 'We explain every step in your language, ensuring a safe transaction with no hidden surprises.'
    }
  ]

  return (
    <section id="ITIN"  className="py-16 md:py-24 bg-gray-50 dark:bg-dark/50">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            ITIN Loans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Préstamos con ITIN
          </p>
  
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold">&quot;Su trabajo duro merece un hogar propio.&quot;</span> 15% to 20% of our business is dedicated to helping families who file taxes with an ITIN. We believe that everyone who contributes to the growth of Utah deserves a clear, legal path to homeownership.
          </p>
        </div>

        {/* Why ITIN Loans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-8 text-center">
            Why an ITIN Loan? 
          </h3>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-8 text-center" style={{ color: '#FF9500' }}>
            (Las Ventajas del Programa)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
            &quot;ITIN loans are a game-changer for non-traditional borrowers.&quot; We maintain direct relationships with local credit unions and specialized lenders who understand the unique needs of our community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(0, 168, 107, 0.2)' }}>
                    <Icon icon="mdi:check-circle" width={24} height={24} style={{ color: '#00A86B' }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-dark dark:text-white mb-2">
                      {advantage.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blueprint to Qualify */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-8 text-center">
            The Blueprint to Qualify
          </h3>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-8 text-center" style={{ color: '#FF9500' }}>
            (Cómo Calificar)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualificationSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-lg p-8 border"
                style={{ backgroundColor: 'rgba(0, 168, 107, 0.05)', borderColor: 'rgba(0, 168, 107, 0.2)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(0, 168, 107, 0.2)' }}>
                    <span className="font-bold text-lg" style={{ color: '#00A86B' }}>{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-dark dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div className="rounded-lg p-8 text-center mb-12" style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)', borderColor: 'rgba(0, 168, 107, 0.2)', border: '1px solid rgba(0, 168, 107, 0.2)' }}>
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">
            Hablamos su idioma. Conocemos el camino.
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <span className="font-semibold"></span> We understand the guidelines and have the lender relationships needed to get you to the closing table.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold"></span> Entendemos las reglas, conocemos a los prestamistas y estamos con usted en cada paso del proceso.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/contactus"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#00A86B' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
          >
            <Icon icon="mdi:phone" width={20} height={20} className="text-white" />
            Schedule Your Strategy Session
          </Link>
        </div>
      </div>
    </section>
  )
}
