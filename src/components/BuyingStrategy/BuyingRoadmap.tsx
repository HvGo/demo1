'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import Image from 'next/image'

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

        {/* Steps with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Steps Column */}
          <div className="lg:col-span-2 space-y-6">
            {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-lg p-8 border"
              style={{ backgroundColor: 'rgba(0, 168, 107, 0.05)', borderColor: 'rgba(0, 168, 107, 0.2)' }}
            >
              <div className="flex items-start gap-6">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: '#00A86B' }}>
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 ">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-dark dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-lg font-semibold" style={{ color: '#00A86B' }}>
                        {step.subtitle}
                      </p>
                    </div>
                    <Icon icon={step.icon} width={32} height={32} className="flex-shrink-0" style={{ color: '#00A86B' }} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4" >
                        {step.spanish}
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
                <div className="ml-8 mt-6 h-8 border-l-2" style={{ borderColor: 'rgba(0, 168, 107, 0.3)' }}></div>
              )}
            </div>
            ))}
          </div>

          {/* Image Column */}
          <div className="lg:col-span-1 flex items-start justify-center">
            <div className="sticky top-8 w-full">
              <Image
                src="/images/Gallery/PROCESS.png"
                alt="Buying Process"
                width={400}
                height={1200}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
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
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </section>
  )
}
