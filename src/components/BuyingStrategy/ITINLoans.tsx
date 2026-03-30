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
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark/50">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            ITIN Loans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Préstamos con ITIN
          </p>
          <p className="text-xl font-semibold text-primary mb-6">
            Dignity & Homeownership (Dignidad y Patrimonio)
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "Su trabajo duro merece un hogar propio." 15% to 20% of our business is dedicated to helping families who file taxes with an ITIN. We believe that everyone who contributes to the growth of Utah deserves a clear, legal path to homeownership.
          </p>
        </div>

        {/* Why ITIN Loans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-8 text-center">
            Why an ITIN Loan? (Las Ventajas del Programa)
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            We maintain direct relationships with local credit unions and specialized lenders who understand the unique needs of our community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark rounded-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-teal-500/20 dark:bg-teal-500/30 p-3 rounded-lg flex-shrink-0">
                    <Icon icon="mdi:check-circle" width={24} height={24} className="text-teal-500" />
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
            The Blueprint to Qualify (Cómo Calificar)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualificationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-teal-500/5 to-teal-500/5 dark:from-teal-500/10 dark:to-teal-500/10 rounded-lg p-8 border border-teal-500/20 dark:border-teal-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-teal-500/20 dark:bg-teal-500/30 p-3 rounded-lg flex-shrink-0">
                    <span className="text-teal-500 font-bold text-lg">{index + 1}</span>
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
        <div className="bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-primary/5 dark:to-teal-500/5 rounded-lg p-8 border border-primary/20 dark:border-primary/30 text-center mb-12">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-4">
            Hablamos su idioma. Conocemos el camino.
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <span className="font-semibold">English:</span> We understand the guidelines and have the lender relationships needed to get you to the closing table.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Spanish:</span> Entendemos las reglas, conocemos a los prestamistas y estamos con usted en cada paso del proceso.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/contactus"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Icon icon="mdi:phone" width={20} height={20} className="text-white" />
            Schedule Your Strategy Session
          </Link>
        </div>
      </div>
    </section>
  )
}
