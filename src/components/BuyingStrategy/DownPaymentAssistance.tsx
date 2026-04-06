'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import DownPaymentAssistanceClient from './DownPaymentAssistanceClient'

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
    <section id="DownPaymentAssistance" className="py-16 md:py-24 bg-white dark:bg-dark">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;No deje que el pago inicial detenga su sueño.&quot; In Utah, you don&apos;t need 20% down to own a home. We specialize in leveraging state and city programs to keep your savings in your pocket.
          </p>
        </div>

        {/* Programs Grid */}
        <DownPaymentAssistanceClient programs={programs} />

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
