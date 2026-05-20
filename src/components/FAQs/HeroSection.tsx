'use client'

import Image from 'next/image'

interface FAQsHeroSectionProps {
  title: string
  subtitle: string
  description: string
}

const FAQsHeroSection = ({ title, subtitle, description }: FAQsHeroSectionProps) => {

  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        {/* Background Image */}
        <div className='absolute inset-0 -z-[1]'>
          {/* Mobile Image */}
          <Image
            src='/images/Gallery/IMG_MOBILE_SELLERS.png'
            alt='FAQs Hero'
            fill
            priority={true}
            unoptimized={false}
            className='object-cover object-center md:hidden'
          />
          {/* Desktop Image */}
          <Image
            src='/images/Gallery/IMG_7525.jpg'
            alt='FAQs Hero'
            fill
            priority={true}
            unoptimized={false}
            className='hidden md:block object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 dark:to-black/40' />
        </div>

        {/* Content */}
        <div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[70vh] pt-20 md:pt-32 pb-0 md:pb-20'>
          <div className='relative text-white text-center z-10 mt-auto w-full mb-auto'>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              {subtitle}
            </h1>
            
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/90'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQsHeroSection
