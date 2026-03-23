'use client'

import Image from 'next/image'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { CMAFormModal } from './CMAFormModal'
import { ReportsOpenHousesModal } from './ReportsOpenHousesModal'

function isSafari(): boolean {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /safari/.test(ua) && !/chrome/.test(ua) && !/firefox/.test(ua)
}

interface HeroSectionClientProps {
  whatsappHref: string
}

const HeroSectionClient = ({ whatsappHref }: HeroSectionClientProps) => {
  const [isSafariBrowser, setIsSafariBrowser] = useState(false)
  const [isCMAFormModalOpen, setIsCMAFormModalOpen] = useState(false)
  const [isReportsOpenHousesModalOpen, setIsReportsOpenHousesModalOpen] = useState(false)

  useEffect(() => {
    setIsSafariBrowser(isSafari())
  }, [])

  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        {/* Background Image/Video */}
        <div className='absolute inset-0 -z-[1]'>
          {isSafariBrowser ? (
            // Safari: mostrar solo imagen
            <Image
              src='/images/Gallery/casa1.png'
              alt='Sellers Hero'
              fill
              priority={true}
              unoptimized={false}
              className='object-cover object-center'
            />
          ) : (
            // Otros navegadores: mostrar video con imagen de fallback
            <video
              autoPlay
              loop
              muted
              playsInline
              poster='/images/Gallery/casa1.png'
              className='w-full h-full object-cover'
            >
              <source src='/images/Gallery/sellers.webm' type='video/webm' />
              Tu navegador no soporta video.
            </video>
          )}
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 dark:to-black/40' />
        </div>

        {/* Content */}
        <div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[90vh] pt-20 md:pt-32 pb-0 md:pb-[200px]'>
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
              <button onClick={() => setIsCMAFormModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:chart-line' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Mi Análisis de Plusvalía</span>
                <span className='sm:hidden'>Análisis</span>
              </button>
              <button onClick={() => setIsReportsOpenHousesModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:file-document' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Ver Mi Plan de Marketing</span>
                <span className='sm:hidden'>Plan Marketing</span>
              </button>
              <a href={whatsappHref} target='_blank' rel='noreferrer' className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-green-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-green-600 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:whatsapp' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Let&apos;s chat with Ivan</span>
                <span className='sm:hidden'>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <CMAFormModal isOpen={isCMAFormModalOpen} onClose={() => setIsCMAFormModalOpen(false)} />
      <ReportsOpenHousesModal isOpen={isReportsOpenHousesModalOpen} onClose={() => setIsReportsOpenHousesModalOpen(false)} />
    </section>
  )
}

export default HeroSectionClient
