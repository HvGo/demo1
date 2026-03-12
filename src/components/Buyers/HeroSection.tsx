import Image from 'next/image'
import { Icon } from '@iconify/react'

export const HeroSection = () => {
  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        {/* Background Image */}
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src='/images/Gallery/IMG_7525.jpg'
            alt='Buyers Hero'
            fill
            priority={true}
            unoptimized={false}
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 dark:to-black/40' />
        </div>

        {/* Content */}
        <div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[90vh] pt-20 md:pt-32 pb-0 md:pb-10'>
          <div className='relative text-white text-center z-10 mt-auto w-full'>
            <p className='text-white text-lg leading-relaxed max-w-3xl mx-auto mb-4'>
              Your Path to Homeownership
            </p>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              Find Your Dream Home
            </h1>
            
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/90'>
                Expert guidance for first-time home buyers in Utah. We specialize in FHA, VA, and ITIN financing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col xs:flex-row justify-center gap-4'>
              <a href='#financial-paths' className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors'>
                <Icon icon='mdi:home' className='text-xl' />
                Explore Financing
              </a>
              <a href='#clear-path' className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors'>
                <Icon icon='mdi:phone' className='text-xl' />
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
