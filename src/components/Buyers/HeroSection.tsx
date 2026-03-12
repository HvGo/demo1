'use client'

import Image from 'next/image'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { GoldenQuestionsForm } from './GoldenQuestionsForm'

export const HeroSection = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
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
              <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
                <button onClick={() => setShowModal(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors whitespace-nowrap'>
                  <Icon icon='mdi:home' className='text-lg sm:text-xl flex-shrink-0' />
                  <span className='hidden sm:inline'>Down payment Assistance</span>
                  <span className='sm:hidden'>Down Payment</span>
                </button>
                <a href='#clear-path' className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors whitespace-nowrap'>
                  <Icon icon='mdi:magnify' className='text-lg sm:text-xl flex-shrink-0' />
                  <span className='hidden sm:inline'>Start My Home Search</span>
                  <span className='sm:hidden'>Home Search</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={() => setShowModal(false)}>
          <div className='bg-white dark:bg-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto' onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-dark'>
              <h2 className='text-2xl font-bold'>Down Payment Assistance</h2>
              <button onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'>
                <Icon icon='mdi:close' className='text-2xl' />
              </button>
            </div>
            <div className='p-6'>
              <GoldenQuestionsForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
