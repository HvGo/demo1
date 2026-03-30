'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function BuyingRoadmap() {
  const steps = [
    {
      number: 1,
      title: 'Defining Your Plan',
      subtitle: 'Defining Your Wealth',
      spanish: 'Analizamos sus metas, crédito y presupuesto para crear un plan personalizado.',
      english: 'We review your goals, credit, and budget to create your wealth strategy.',
      icon: 'mdi:target'
    },
    {
      number: 2,
      title: 'Plan Financiero',
      subtitle: 'Financial Blueprint | Securing the Best Loan',
      spanish: 'Lo conectamos con prestamistas expertos en Utah Housing (DPA), Grants y ITIN.',
      english: 'We connect you with specialists in Grants, Down Payment Assistance, and ITIN loans.',
      icon: 'mdi:bank'
    },
    {
      number: 3,
      title: 'Búsqueda con Propósito',
      subtitle: 'Targeted Search | Finding the Right Home',
      spanish: 'Curamos una lista de propiedades en el Wasatch Front que califican para las ayudas identificadas.',
      english: 'We find homes across the Wasatch Front that meet your criteria and grant eligibility.',
      icon: 'mdi:home-search'
    },
    {
      number: 4,
      title: 'Negociación y Protección',
      subtitle: 'Expert Advocacy | Protecting Your Money',
      spanish: 'Usamos 22+ años de experiencia para negociar créditos del vendedor, reparaciones y su depósito.',
      english: 'We use 22+ years of experience to negotiate seller credits, repairs, and protect your earnest money.',
      icon: 'mdi:handshake'
    },
    {
      number: 5,
      title: 'Cierre y Celebración',
      subtitle: 'Closing Day | You Get Your Keys!',
      spanish: 'Explicamos los documentos finales en su idioma para que firme con total confianza.',
      english: 'We review final documents in your language so you sign with 100% confidence.',
      icon: 'mdi:key'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-dark">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            The Buying Roadmap
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Tu Ruta al Hogar
          </p>
          <p className="text-xl font-semibold text-primary mb-6">
            5 Pasos Sencillos para Construir tu Legado
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;Your journey to homeownership starts here.&quot; Follow these five proven steps to turn your dream into reality.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-primary/5 to-teal-500/5 dark:from-primary/10 dark:to-teal-500/10 rounded-lg p-8 border border-primary/20 dark:border-primary/30"
            >
              <div className="flex items-start gap-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-teal-500 rounded-full">
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-dark dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-lg font-semibold text-primary">
                        {step.subtitle}
                      </p>
                    </div>
                    <Icon icon={step.icon} width={32} height={32} className="text-teal-500 flex-shrink-0" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        En español:
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {step.spanish}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        English:
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {step.english}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="ml-8 mt-6 h-8 border-l-2 border-primary/30 dark:border-primary/20"></div>
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
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </section>
  )
}
