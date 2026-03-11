import Image from 'next/image'
import { Icon } from '@iconify/react'

const teamMembers = [
  {
    name: 'Ivan Navincopa',
    role: 'Founder & Broker-Owner',
    specialty: 'Vision y Estrategia',
    description: 'Lidera la visión de Blue Key Realty con 23+ años de experiencia en bienes raíces.',
    icon: 'mdi:crown'
  },
  {
    name: 'Freddy Villanueva',
    role: 'Buyers Specialist',
    specialty: 'Especialista de Compradores',
    description: 'Experto en financiamiento FHA, VA e ITIN. Guía a compradores primerizos hacia el éxito.',
    icon: 'mdi:home-heart'
  },
  {
    name: 'Lissy Quiroz',
    role: 'Operations Manager',
    specialty: 'Operaciones y Precisión',
    description: 'Garantiza que cada transacción sea perfecta. Experta en detalles y cumplimiento.',
    icon: 'mdi:clipboard-check'
  },
  {
    name: 'Gabi Belisario',
    role: 'Marketing Director',
    specialty: 'Directora de Marketing',
    description: 'Crea estrategias de marketing innovadoras que posicionan propiedades para máxima exposición.',
    icon: 'mdi:bullhorn'
  }
]

export const TeamSection = () => {
  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The Blue Key Team</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Un equipo dedicado de profesionales comprometidos con tu éxito
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {teamMembers.map((member, index) => (
            <div key={index} className='bg-white dark:bg-dark rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-primary to-teal-500 p-6 text-white text-center'>
                <Icon icon={member.icon} width={48} height={48} className='mx-auto mb-4' />
                <h3 className='text-xl font-bold mb-1'>{member.name}</h3>
                <p className='text-sm font-semibold opacity-90'>{member.role}</p>
              </div>
              <div className='p-6'>
                <p className='text-primary font-semibold mb-3'>{member.specialty}</p>
                <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-8 border border-primary/20'>
          <h3 className='text-2xl font-bold mb-6 text-center'>Nuestros Valores</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <Icon icon='mdi:heart' width={40} height={40} className='text-primary mx-auto mb-4' />
              <h4 className='font-bold mb-2'>Integridad</h4>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Actuamos con honestidad y transparencia en cada transacción
              </p>
            </div>
            <div className='text-center'>
              <Icon icon='mdi:lightbulb' width={40} height={40} className='text-primary mx-auto mb-4' />
              <h4 className='font-bold mb-2'>Educación</h4>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Empoderamos a nuestros clientes con conocimiento y estrategia
              </p>
            </div>
            <div className='text-center'>
              <Icon icon='mdi:target' width={40} height={40} className='text-primary mx-auto mb-4' />
              <h4 className='font-bold mb-2'>Excelencia</h4>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                Nos esforzamos por superar expectativas en cada proyecto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
