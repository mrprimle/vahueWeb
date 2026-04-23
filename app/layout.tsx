import type { Metadata } from 'next'
import { Inter, Space_Mono, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const aeonik = localFont({
  src: [
    { path: '../public/fonts/Aeonik-Light.otf',   weight: '300', style: 'normal' },
    { path: '../public/fonts/Aeonik-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Aeonik-Regular.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Aeonik-Bold.otf',    weight: '600', style: 'normal' },
    { path: '../public/fonts/Aeonik-Bold.otf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-aeonik',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vahue | AI Consulting — Transform into AI-Native',
    template: '%s | Vahue',
  },
  description:
    'Vahue helps people and teams use AI mindfully. AI consulting, team training, and custom AI automations to transform your company into AI-native.',
  keywords: [
    'AI consulting',
    'AI training',
    'AI-native',
    'AI automations',
    'team training',
    'AI transformation',
    'AI literacy',
    'custom AI solutions',
  ],
  authors: [{ name: 'Vahue' }],
  creator: 'Vahue',
  publisher: 'Vahue',
  metadataBase: new URL('https://vahue.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vahue.ai',
    siteName: 'Vahue',
    title: 'Vahue | AI Consulting — Transform into AI-Native',
    description:
      'Vahue helps people and teams use AI mindfully. AI consulting, team training, and custom AI automations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vahue | AI Consulting — Transform into AI-Native',
    description:
      'Vahue helps people and teams use AI mindfully. AI consulting, team training, and custom AI automations.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${aeonik.variable} ${spaceMono.variable} ${geistMono.variable} dark`}
    >
      <body className="font-sans bg-bg text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
