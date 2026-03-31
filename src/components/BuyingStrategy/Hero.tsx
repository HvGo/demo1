'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { GoldenQuestionsModal } from '@/components/Buyers/GoldenQuestionsModal'
import { CuratedSearchModal } from '@/components/Buyers/CuratedSearchModal'

function isSafari(): boolean {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /safari/.test(ua) && !/chrome/.test(ua) && !/firefox/.test(ua)
}

export default function BuyingStrategyHero() {
  const [isSafariBrowser, setIsSafariB] = useState(false)
  const [isGoldenQuestionsModalOpen, setIsGoldenQuestionsModalOpen] = useState(false)
  const [isCuratedSearchModalOpen, setIsCuratedSearchModalOpen] = useState(false)

  useEffect(() => {
    setIsSafariB(isSafari())
  }, [])

  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative min-h-screen md:min-h-[90vh]'>
        <div className='absolute inset-0 -z-[1]'>
          {isSafariBrowser ? (
            <>
              {/* Mobile Image */}
              <Image
                src='/images/Gallery/IMG_MOBILE_BUYERS.png'
                alt='Buying Strategy Hero'
                fill
                priority={true}
                unoptimized={false}
                className='object-cover object-center md:hidden'
              />
              {/* Desktop Image */}
              <Image
                src='/images/Gallery/IMG_7535.jpg'
                alt='Buying Strategy Hero'
                fill
                priority={true}
                unoptimized={false}
                className='hidden md:block object-cover object-center'
              />
            </>
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster='/images/Gallery/IMG_7535.jpg'
              className='w-full h-full object-cover'
            >
              <source src='/images/Gallery/output.webm' type='video/webm' />
              Tu navegador no soporta video.
            </video>
          )}
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 dark:to-black/40' />
        </div>
        <div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[90vh] pt-80 md:pt-32 pb-[10px] md:pb-[200px]'>
          <div className='relative text-white text-center z-10 mt-auto w-full'>
            <p className='text-inherit text-xm font-medium'>The Strategy: Maximum Help, Minimum Cash</p>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              Down Payment Assistance | Ayudas para el Enganche
            </h1>
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
            </div>
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
              <button onClick={() => setIsGoldenQuestionsModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-colors whitespace-nowrap' style={{ backgroundColor: '#00A86B' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}>
                <Icon icon='mdi:home' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Down payment Assistance</span>
                <span className='sm:hidden'>Down Payment</span>
              </button>
              <button onClick={() => setIsCuratedSearchModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors whitespace-nowrap' style={{ backgroundColor: '#FDCB6E', color: '#067ff9' }} >
                <Icon icon='mdi:magnify' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Start My Home Search</span>
                <span className='sm:hidden'>Home Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <GoldenQuestionsModal isOpen={isGoldenQuestionsModalOpen} onClose={() => setIsGoldenQuestionsModalOpen(false)} />
      <CuratedSearchModal isOpen={isCuratedSearchModalOpen} onClose={() => setIsCuratedSearchModalOpen(false)} />
    </section>
  )
}
