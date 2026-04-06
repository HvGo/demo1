import { Icon } from '@iconify/react'

const marketingServices = [
  {
    category: 'Preparación',
    items: ['Soporte de limpieza', 'Reparaciones menores', 'Consultoría de staging'],
    icon: 'mdi:hammer-wrench'
  },
  {
    category: 'Presentación Visual',
    items: ['Fotografía profesional', 'Videos con dron', 'Tours virtuales 3D'],
    icon: 'mdi:camera'
  },
  {
    category: 'Exposición Digital',
    items: ['Campañas en IG, FB, TikTok', 'YouTube marketing', 'Zillow y Realtor.com'],
    icon: 'mdi:share-variant'
  }
]

export const MarketingPower = () => {
  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>

      <div className="text-center mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;Selling your home isn&apos;t about luck; it&apos;s about a data-driven strategy designed to protect your equity.&quot; &quot;Vender su casa no es cuestión de suerte; es una estrategia basada en datos diseñada para proteger su patrimonio.&quot;
          </p>
      </div>

      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The Three-Tier Market Analysis</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            We determine your home's winning price by looking at the market from three critical angles to understand exactly what buyers are doing right now:
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {marketingServices.map((service, index) => (
            <div key={index} className='bg-white dark:bg-dark rounded-lg shadow-lg p-8'>
              <Icon icon={service.icon} width={48} height={48} className='text-primary mb-4' />
              <h3 className='text-2xl font-bold mb-6'>{service.category}</h3>
              <ul className='space-y-3'>
                {service.items.map((item, idx) => (
                  <li key={idx} className='flex items-center gap-3'>
                    <Icon icon='mdi:check' width={20} height={20} className='text-teal-500 flex-shrink-0' />
                    <span className='text-gray-700 dark:text-gray-300'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-gradient-to-r from-primary to-teal-500 rounded-lg p-8 md:p-12 text-white'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-2xl font-bold mb-4'>Resultados Comprobados</h3>
              <ul className='space-y-3'>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Promedio de venta 15% arriba del valor estimado</span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Tiempo promedio en mercado: 18 días</span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Múltiples ofertas en 95% de las propiedades</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-2xl font-bold mb-4'>Tecnología Avanzada</h3>
              <ul className='space-y-3'>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Análisis de mercado en tiempo real</span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Seguimiento de competencia automático</span>
                </li>
                <li className='flex items-center gap-3'>
                  <Icon icon='mdi:check-circle' width={24} height={24} />
                  <span>Reportes detallados semanales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
