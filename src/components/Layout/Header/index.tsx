'use client'
import { navLinks as defaultNavLinks } from '@/app/api/navlink'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import NavLink from './Navigation/NavLink'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

type HeaderLink = { label: string; href: string }
type HeaderConfig = {
  logoLight?: string
  logoDark?: string
  phone?: string
  email?: string
  whatsAppNumber?: string
  navLinks?: HeaderLink[]
}

type HeaderProps = {
  config?: HeaderConfig
  isVisible?: boolean
}

const Header: React.FC<HeaderProps> = ({ config, isVisible = true }) => {
  if (isVisible === false) return null

  const [sticky, setSticky] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const sideMenuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
      setNavbarOpen(false)
    }
  }

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleScroll])

  const isHomepage = pathname === '/'
  const useLightLogo = (isHomepage && !sticky) || theme === 'dark'

  const logoLight = config?.logoLight || '/images/header/logo1.png'
  const logoDark = config?.logoDark || '/images/header/logo1.png'
  const phone = config?.phone || '+1-212-456-789'
  const email = config?.email || 'hello@homely.com'
  const navLinks = Array.isArray(config?.navLinks) && config?.navLinks.length > 0
    ? config.navLinks
    : defaultNavLinks

  const phoneDigits = (config?.whatsAppNumber || phone || '').replace(/\D/g, '')
  const phoneHref = phoneDigits ? `https://wa.me/${phoneDigits}` : `tel:${phone}`

  return (
    <header className={`fixed h-24 py-1 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${sticky ? "top-3" : "top-0"}`}>
      <nav
        className={`container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 ${sticky
          ? "shadow-lg bg-white dark:bg-dark rounded-full top-5 px-4 "
          : isHomepage
            ? "shadow-none top-0 rounded-full px-4 bg-white/25 dark:bg-black/25 backdrop-blur-md border border-white/30 dark:border-white/10"
            : "shadow-none top-0"
          }`}
      >
        <div className='flex justify-between items-center gap-2 w-full'>
          <div className='ml-2 sm:ml-4'>
            <Link href='/'>
              <Image
                src={useLightLogo ? (logoLight || logoDark) : (logoDark || logoLight)}
                alt='logo'
                width={150}
                height={68}
                unoptimized={true}
                className={useLightLogo ? 'brightness-0 invert' : ''}
              />
            </Link>
          </div>
          <div className='flex items-center gap-2 sm:gap-6'>
            <button
              className='hover:cursor-pointer'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon
                icon={'solar:sun-bold'}
                width={32}
                height={32}
                className={`dark:hidden block ${isHomepage
                  ? sticky
                    ? 'text-dark'
                    : 'text-white'
                  : 'text-dark'
                  }`}
              />
              <Icon
                icon={'solar:moon-bold'}
                width={32}
                height={32}
                className='dark:block hidden text-white'
              />
            </button>
            <div className={`hidden md:block`}>
              <Link href={phoneHref} target="_blank" rel="noreferrer" className={`text-base text-inherit flex items-center gap-2 border-r pr-6 ${isHomepage
                ? sticky
                  ? 'text-dark dark:text-white hover:text-primary border-dark dark:border-white'
                  : 'text-white hover:text-primary'
                : 'text-dark hover:text-primary'
                }`}
              >
                <Icon icon={'ph:phone-bold'} width={24} height={24} />
                {phone}
              </Link>
            </div>
            <div>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`flex items-center gap-3 p-2 sm:px-5 sm:py-3 rounded-full font-semibold hover:cursor-pointer border ${isHomepage
                  ? sticky
                    ? 'text-white bg-dark dark:bg-white dark:text-dark dark:hover:text-white dark:hover:bg-dark hover:text-dark hover:bg-white border-dark dark:border-white'
                    : 'text-dark bg-white/90 dark:text-dark hover:bg-white hover:text-dark border-white/70'
                  : 'bg-dark text-white hover:bg-transparent hover:text-dark dark:bg-white dark:text-dark dark:hover:bg-transparent dark:hover:text-white duration-300'
                  }`}
                aria-label='Toggle mobile menu'>
                <span>
                  <Icon icon={'ph:list'} width={24} height={24} />
                </span>
                <span className='hidden sm:block'>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {
        navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )
      }

      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-[85vw] sm:w-[420px] lg:w-[480px] bg-dark/90 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${navbarOpen ? 'translate-x-0' : 'translate-x-full'} z-50 px-8 sm:px-12 overflow-auto no-scrollbar border-l border-white/10`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="">
            <div className='flex items-center justify-start py-10'>
              <button
                onClick={() => setNavbarOpen(false)}
                aria-label='Close mobile menu'
                className='bg-white p-3 rounded-full hover:cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'>
                  <path
                    fill='none'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <nav className='flex flex-col items-start gap-4'>
              <ul className='w-full'>
                {navLinks.map((item, index) => (
                  <NavLink key={index} item={item} onClick={() => setNavbarOpen(false)} />
                ))}
              </ul>
            </nav>
          </div>

          <div className='flex flex-col gap-1 my-16 text-white'>
            <p className='text-base sm:text-xm font-normal text-white/40'>
              Contact
            </p>
            <Link href="#" className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
              {email}
            </Link>
            <Link href="#" className='text-base sm:text-xm font-medium text-inherit hover:text-primary'>
              {phone}
            </Link>
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header
