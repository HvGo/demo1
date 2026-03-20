import { Icon } from '@iconify/react'

interface Area {
  name: string
  description: string
  icon: string
}

const LocalExpertise = async () => {
  const areas: Area[] = [
    {
      name: 'West Valley City',
      description: 'Tu base principal de clientes latinos.',
      icon: 'mdi:home-group'
    },
    {
      name: 'Kearns / Magna',
      description: 'Áreas clave de asequibilidad.',
      icon: 'mdi:home-heart'
    },
    {
      name: 'South Jordan / Herriman',
      description: 'Crecimiento y familias jóvenes.',
      icon: 'mdi:home-city-outline'
    },
    {
      name: 'Lehi / Saratoga Springs',
      description: 'Tu entrada a Utah County.',
      icon: 'mdi:map-marker-radius'
    },
    {
      name: 'Tooele / Stansbury Park',
      description: 'La mejor opción de precio en el oeste.',
      icon: 'mdi:treasure-chest'
    },
    {
      name: 'Ogden / Layton',
      description: 'Tu cobertura en Davis y Weber County.',
      icon: 'mdi:map'
    }
  ]

  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Local Expertise Across the Wasatch Front</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Comprehensive coverage and deep knowledge of every community
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {areas.map((area, index) => (
            <div
              key={index}
              className='bg-gray-50 dark:bg-dark/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/50 transition-all duration-300'
            >
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary to-teal-500 text-white' style={{ backgroundImage: 'linear-gradient(to right, #273ba8, #febc59 )' }}>
                    <Icon icon={area.icon} width={24} height={24} />
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-dark dark:text-white mb-2'>{area.name}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{area.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocalExpertise
