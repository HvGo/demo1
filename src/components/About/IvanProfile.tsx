import Image from 'next/image'
import { Icon } from '@iconify/react'

export const IvanProfile = () => {
  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <div className='relative h-96 md:h-full rounded-lg overflow-hidden'>
            <Image
              src='/images/hero/heroBanner.png'
              alt='Ivan Navincopa'
              fill
              unoptimized={true}
              className='object-cover'
            />
          </div>

          {/* Content */}
          <div>
            <p className='text-primary font-semibold mb-2'>Founder & Broker-Owner</p>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>Ivan Navincopa</h2>
            
            <div className='space-y-4 mb-8'>
              <p className='text-lg text-gray-700 dark:text-gray-300'>
                Con más de 23 años de experiencia en bienes raíces, Ivan Navincopa es un Broker-Owner certificado y Top 500 Salt Lake City Realtor®.
              </p>
              <p className='text-lg text-gray-700 dark:text-gray-300'>
                Su misión es simple pero poderosa: <span className='font-semibold text-primary'>Education is the bridge between a dream and a deed</span>
              </p>
              <p className='text-lg text-gray-700 dark:text-gray-300'>
                Ivan se dedica a construir patrimonio familiar y oportunidades de propiedad para comunidades hispanohablantes en Utah, combinando estrategia de mercado con educación financiera.
              </p>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-4 mb-8'>
              <div className='bg-primary/10 rounded-lg p-4 text-center'>
                <div className='text-3xl font-bold text-primary mb-1'>23+</div>
                <p className='text-sm font-semibold'>Años de Experiencia</p>
              </div>
              <div className='bg-primary/10 rounded-lg p-4 text-center'>
                <div className='text-3xl font-bold text-primary mb-1'>500+</div>
                <p className='text-sm font-semibold'>Familias Ayudadas</p>
              </div>
              <div className='bg-primary/10 rounded-lg p-4 text-center'>
                <div className='text-3xl font-bold text-primary mb-1'>$100M+</div>
                <p className='text-sm font-semibold'>Volumen de Ventas</p>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h3 className='text-xl font-bold mb-4'>Especialidades</h3>
              <ul className='space-y-2'>
                {[
                  'Financiamiento para compradores primerizos',
                  'Estrategia de máxima plusvalía para vendedores',
                  'Soluciones ITIN y financiamiento especializado',
                  'Educación financiera y construcción de patrimonio',
                  'Negociación de incentivos y rate buy-downs'
                ].map((specialty, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <Icon icon='mdi:check-circle' width={20} height={20} className='text-teal-500 flex-shrink-0' />
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
