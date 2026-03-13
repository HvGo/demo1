import Image from 'next/image'
import { Icon } from '@iconify/react'

export const HeroSection = () => {
  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        {/* Background Image */}
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src='/images/Gallery/IMG_7531.jpg'
            alt='Sellers Hero'
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
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              Maximum Equity. Expert Strategy.
            </h1>
            
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/90'>
                Venda su casa con un plan diseñado para ganar en el mercado de Utah.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
              <a href='#market-intelligence' className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:chart-line' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Mi Análisis de Plusvalía</span>
                <span className='sm:hidden'>Análisis</span>
              </a>
              <a href='#reports-open-houses' className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:file-document' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Ver Mi Plan de Marketing</span>
                <span className='sm:hidden'>Plan Marketing</span>
              </a>
              <a href='https://wa.me' target='_blank' rel='noreferrer' className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-green-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-green-600 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:whatsapp' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Let's chat on WhatsApp</span>
                <span className='sm:hidden'>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
