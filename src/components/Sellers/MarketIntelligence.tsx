import { Icon } from '@iconify/react'

const intelligencePoints = [
  {
    title: 'Propiedades Vendidas',
    description: 'Análisis de precios finales y tiempos de venta en tu área',
    icon: 'mdi:check-circle'
  },
  {
    title: 'Bajo Contrato',
    description: 'Tendencias actuales de negociaciones en progreso',
    icon: 'mdi:file-document'
  },
  {
    title: 'Propiedades Activas',
    description: 'Análisis de competencia directa en el mercado',
    icon: 'mdi:home-search'
  },
  {
    title: 'Datos del Mercado',
    description: 'Información actualizada de días en el mercado y absorción',
    icon: 'mdi:chart-line'
  }
]

export const MarketIntelligence = () => {
  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The Market Intelligence Advantage | Análisis deMercado Real</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Data-Driven Results for Salt Lake & the Wasatch Front
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {intelligencePoints.map((point, index) => (
            <div key={index} className='bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-lg p-6 border border-primary/20'>
              <Icon icon={point.icon} width={40} height={40} className='text-primary mb-4' />
              <h3 className='text-lg font-semibold mb-2'>{point.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>{point.description}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-gradient-to-r from-primary/5 to-teal-500/5 rounded-lg p-8 border border-primary/20'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>98%</div>
              <p className='text-gray-600 dark:text-gray-400'>Precisión en Valuaciones</p>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>15+</div>
              <p className='text-gray-600 dark:text-gray-400'>Años de Experiencia</p>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold text-primary mb-2'>500+</div>
              <p className='text-gray-600 dark:text-gray-400'>Propiedades Vendidas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
