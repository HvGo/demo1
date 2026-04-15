import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import '../globals.css'
import './ivan-utah.css'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import SessionProviderComp from '@/components/nextauth/SessionProvider'

const font = Bricolage_Grotesque({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ivan Utah Realtor - Real Estate Solutions',
  description: 'Professional real estate services in Utah with expert guidance and market analysis',
}

export default function IvanUtahLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader color="#07be8a" />
        <SessionProviderComp>
          <ThemeProvider
            attribute='class'
            enableSystem={true}
            defaultTheme='light'>
            {children}
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
