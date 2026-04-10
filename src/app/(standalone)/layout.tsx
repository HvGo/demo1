import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import SessionProviderComp from '@/components/nextauth/SessionProvider'

const font = Bricolage_Grotesque({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ivan Navincopa - Link in Bio',
  description: 'Conecta conmigo a través de mis redes sociales y servicios inmobiliarios',
}

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
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
