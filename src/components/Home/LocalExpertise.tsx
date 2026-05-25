import { Icon } from '@iconify/react'
import LocalExpertiseClient from './LocalExpertise/LocalExpertiseClient'
import LocalExpertiseAreasClient from './LocalExpertise/LocalExpertiseAreasClient'

interface Area {
  name: string
  description: string
  icon: string
  href: string
}

const LocalExpertise = async () => {
  const areas: Area[] = [
    {
      name: 'West Valley City',
      description: '',
      icon: 'mdi:home-group',
      href: '/west-valley-city'
    },
    {
      name: 'Kearns / Magna',
      description: '',
      icon: 'mdi:home-heart',
      href: '/kearns-magna'
    },
    {
      name: 'South Jordan / Herriman',
      description: '',
      icon: 'mdi:home-city-outline',
      href: '/south-jordan-herriman'
    },
    {
      name: 'Lehi / Saratoga Springs',
      description: '',
      icon: 'mdi:map-marker-radius',
      href: '/lehi-saratoga-springs'
    },
    {
      name: 'Tooele / Stansbury Park',
      description: '',
      icon: 'mdi:treasure-chest',
      href: '/tooele-stansbury-park'
    },
    {
      name: 'Ogden / Layton',
      description: '',
      icon: 'mdi:map',
      href: '/ogden-layton'
    }
  ]

  return (
    <LocalExpertiseClient>
      <section className='py-16 md:py-24 bg-white dark:bg-dark'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='text-center mb-12 md:mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Local Expertise Across the Wasatch Front</h2>
            <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Comprehensive coverage and deep knowledge of every community
            </p>
          </div>

          <LocalExpertiseAreasClient areas={areas} />
        </div>
      </section>
    </LocalExpertiseClient>
  )
}

export default LocalExpertise
