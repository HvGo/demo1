import { Icon } from '@iconify/react'

const steps = [
  { number: 1, title: 'Consulta Inicial', description: 'Conocemos tu situación financiera y objetivos' },
  { number: 2, title: 'Pre-aprobación', description: 'Obtén tu carta de pre-aprobación' },
  { number: 3, title: 'Búsqueda', description: 'Explora propiedades que se ajusten a tu presupuesto' },
  { number: 4, title: 'Oferta', description: 'Presentamos una oferta competitiva' },
  { number: 5, title: 'Inspección', description: 'Inspección profesional de la propiedad' },
  { number: 6, title: 'Tasación', description: 'Valuación oficial de la propiedad' },
  { number: 7, title: 'Cierre', description: 'Finalización de documentos y financiamiento' },
  { number: 8, title: 'Entrega', description: 'Recibe las llaves de tu nuevo hogar' },
]

export const ProcessSteps = () => {
  return (
    <section id='process' className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>El Proceso de 8 Pasos</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Desde tu primera consulta hasta recibir las llaves de tu nuevo hogar
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {steps.map((step) => (
            <div key={step.number} className='relative'>
              <div className='bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-lg p-6 h-full'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg'>
                    {step.number}
                  </div>
                </div>
                <h3 className='text-lg font-semibold mb-2'>{step.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>{step.description}</p>
              </div>
              {step.number < 8 && (
                <div className='hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2'>
                  <Icon icon='mdi:arrow-right' width={24} height={24} className='text-primary' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
