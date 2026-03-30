'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function DownPaymentAssistance() {
  const programs = [
    {
      title: 'Utah Housing Corporation (DPA)',
      description: 'This is the most reliable and widely used program in our community for first-time home buyers. It acts as a specialized 2nd mortgage that covers your down payment and a portion of your closing costs.',
      features: [
        'Low Cash Entry: Designed to significantly reduce the amount of money you need at the closing table.',
        'Competitive Rates: Utah Housing offers interest rates that compete with traditional bank loans.',
        'Repeat Buyers Welcome: This isn\'t just for first-time buyers; if you are moving to your next home, you may still qualify.'
      ],
      spanishNote: 'Es el programa más seguro en Utah para quienes no quieren usar todos sus ahorros en la compra.'
    },
    {
      title: 'The $20,000 New Construction Grant',
      description: 'Through the Utah First-Time Homebuyer Assistance Program, you can receive up to $20,000 specifically for newly built homes.',
      features: [
        'Price Cap: Valid for new construction homes priced up to $450,000.',
        'Usage: These funds can be used for your down payment, closing costs, or to buy down your interest rate (reducing your monthly payment).',
        'Availability: These funds are "First-Come, First-Served." We monitor the balance daily to ensure your family doesn\'t miss out.'
      ]
    },
    {
      title: 'City-Specific Grants (Fondos Municipales)',
      description: 'Many cities across the Wasatch Front want to help you become a neighbor. We track grants from:',
      features: [
        'Salt Lake City & West Valley',
        'West Jordan & Taylorsville',
        'Provo & Ogden',
        'These grants are often "forgivable" over time. We check the availability in every zip code where you are looking to buy.'
      ]
    },
    {
      title: 'Loan Options for Every Status',
      description: 'We ensure you are in the right "loan bucket" based on your current residency:',
      features: [
        'FHA Loans: Ideal for US Citizens and Permanent Residents (Green Card holders).',
        'Conventional Loans: A powerful option for immigrants currently adjusting their status who have a valid Social Security number and Work Permit.',
        'Seller Credits: We use our 22+ years of negotiation experience to ask the seller to pay for your closing costs, often leaving you with only your initial Earnest Money deposit.'
      ]
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-dark">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "No deje que el pago inicial detenga su sueño." In Utah, you don't need 20% down to own a home. We specialize in leveraging state and city programs to keep your savings in your pocket.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <div
              key={index}
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
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon icon="mdi:bullet" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {program.spanishNote && (
                <p className="text-sm italic text-primary dark:text-teal-400 pt-4 border-t border-primary/20">
                  {program.spanishNote}
                </p>
              )}
            </div>
          ))}
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
