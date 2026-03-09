import Image from 'next/image'
import { getSiteSectionByKey } from '@/lib/queries/content'

const HeroDescription = async () => {
  const section = await getSiteSectionByKey('home_hero')

  if (section && section.isVisible === false) return null

  const description = section?.description || ''
  const profileImageUrl = section?.profileImageUrl || ''

  if (!description) return null

  return (
    <section className='py-12 md:py-16 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='flex items-center gap-5'>
          {profileImageUrl ? (
            <div className='shrink-0'>
              <Image
                src={profileImageUrl}
                alt='profile'
                width={80}
                height={80}
                className='rounded-full object-cover w-18 h-18 border border-gray-200 dark:border-white/15'
                unoptimized={true}
              />
            </div>
          ) : null}
          <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-dark/80 dark:text-white/85 whitespace-pre-line'>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroDescription
