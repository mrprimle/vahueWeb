import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
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
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-sans bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
