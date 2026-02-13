import Image from 'next/image'
import Link from 'next/link'

import { getSiteSectionByKey } from '@/lib/queries/content'
import SearchBar from './SearchBar'

const Hero = async () => {
  const section = await getSiteSectionByKey('home_hero')
  const taglineSection = await getSiteSectionByKey('home_hero_tagline')

  const subtitle = section?.subtitle || 'Palm springs, CA'
  const title = section?.title || 'Futuristic Haven'
  const imageUrl = section?.imageUrl || '/images/hero/heroBanner.png'

  const primaryLabel = section?.primaryCtaLabel || ''
  const primaryHref = section?.primaryCtaHref || ''

  const secondaryLabel = section?.secondaryCtaLabel || ''
  const secondaryHref = section?.secondaryCtaHref || ''
  const bottomText = section?.description || ''
  const profileImageUrl = section?.profileImageUrl || ''
  const tagline = taglineSection?.description || ''

  // SearchBar data from content_data
  const searchData = section?.contentData || {}
  const searchTabs = searchData.searchTabs || [
    { id: 'buy', label: 'BUY A HOME' },
    { id: 'sell', label: 'SELL A HOME' },
    { id: 'value', label: 'HOME VALUE' }
  ]
  const searchPlaceholder = searchData.searchPlaceholder || 'Search by city, county, or zip'
  const searchButtonLabel = searchData.searchButtonLabel || 'SEARCH'

  if (section && section.isVisible === false) return null

  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src={imageUrl}
            alt='heroImg'
            fill
            priority={false}
            unoptimized={true}
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
        </div>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68'>
          <div className='relative text-white dark:text-white text-center md:text-start z-10'>
            <p className='text-inherit text-xm font-medium'>{subtitle}</p>
            <h1 className='text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6'>
              {title}
            </h1>
            {tagline ? (
              <div className='mb-10 sm:mb-12 max-w-2xl md:max-w-45p'>
                <p className='inline-block max-w-xl bg-black/30 backdrop-blur-md border border-white/15 rounded-lg px-4 py-2 text-white/90 text-base sm:text-lg md:text-xl leading-snug font-medium italic tracking-wide shadow-sm shadow-black/30 border-l-4 border-l-primary/90'>
                  {tagline}
                </p>
              </div>
            ) : null}
            <div className='w-full md:max-w-2xl mb-8'>
              <SearchBar tabs={searchTabs} placeholder={searchPlaceholder} buttonLabel={searchButtonLabel} />
            </div>
            {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
              <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>
                {primaryHref && primaryLabel ? (
                  <Link href={primaryHref} className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors'>
                    {primaryLabel}
                  </Link>
                ) : null}
                {secondaryHref && secondaryLabel ? (
                  <Link href={secondaryHref} className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer text-center bg-white/15 text-white backdrop-blur-md border border-white/35 shadow-md shadow-black/20 hover:bg-white/25 transition-colors'>
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className='md:absolute bottom-0 md:-right-68 xl:right-0 bg-white/55 dark:bg-black/40 backdrop-blur-md border border-white/35 dark:border-white/10 shadow-lg py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24'>
          {bottomText ? (
            <div className='flex items-center gap-5'>
              {profileImageUrl ? (
                <div className='shrink-0'>
                  <Image
                    src={profileImageUrl}
                    alt='profile'
                    width={80}
                    height={80}
                    className='rounded-full object-cover w-18 h-18 border border-white/40 dark:border-white/15'
                    unoptimized={true}
                  />
                </div>
              ) : null}
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-black/80 dark:text-white/85 whitespace-pre-line'>
                {bottomText}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black'>
              <div className='flex flex-col sm:items-center gap-3'>
                <Image
                  src={'/images/hero/sofa.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='block dark:hidden'
                  unoptimized={true}
                />
                <Image
                  src={'/images/hero/dark-sofa.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='hidden dark:block'
                  unoptimized={true}
                />
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  4 Bedrooms
                </p>
              </div>
              <div className='flex flex-col sm:items-center gap-3'>
                <Image
                  src={'/images/hero/tube.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='block dark:hidden'
                  unoptimized={true}
                />
                <Image
                  src={'/images/hero/dark-tube.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='hidden dark:block'
                  unoptimized={true}
                />
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  4 Restroom
                </p>
              </div>
              <div className='flex flex-col sm:items-center gap-3'>
                <Image
                  src={'/images/hero/parking.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='block dark:hidden'
                  unoptimized={true}
                />
                <Image
                  src={'/images/hero/dark-parking.svg'}
                  alt='sofa'
                  width={32}
                  height={32}
                  className='hidden dark:block'
                  unoptimized={true}
                />
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  Parking space
                </p>
              </div>
              <div className='flex flex-col sm:items-center gap-3'>
                <p className='text-2xl sm:text-3xl font-medium text-inherit'>
                  $4,750,000
                </p>
                <p className='text-sm sm:text-base font-normal text-black/50 dark:text-white/50'>
                  For selling price
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
