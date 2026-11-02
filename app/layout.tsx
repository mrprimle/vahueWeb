import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import { SiteChrome } from '@/components/site/SiteChrome'
import './globals.css'

// Scale declares a single 400 face plus a separate bold family, so font-medium and semibold fall on
// Regular with browser-synthesised bold from 600. Keep that shape: it is what makes the widths match.
const aeonik = localFont({
  src: './fonts/Aeonik-Regular.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-aeonik',
  adjustFontFallback: 'Arial',
})
const aeonikBold = localFont({
  src: './fonts/Aeonik-Bold.otf',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-aeonik-bold',
})
// Aeonik Mono is not in Mike's licensed set: DM Mono is the nearest free match, and Scale ships it too.
const mono = DM_Mono({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-aeonik-mono' })

export const metadata: Metadata = {
  title: 'Vahue',
  description: 'Your busiest workflows, run by agents. Measured from day one.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${aeonik.variable} ${aeonikBold.variable} ${mono.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
