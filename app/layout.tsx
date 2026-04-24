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

const siteTitle =
  'Accelerate your AI Transformation — Vahue | AI-Native Team Extension, Training & Enterprise AI'

const siteDescription =
  'Vahue accelerates your AI transformation with AI-Native engineering team extensions, enterprise-ready AI systems, and hands-on team training — for startups and Fortune 500 teams.'

const siteDescriptionLong =
  'Vahue accelerates your AI transformation: AI-Native engineering team extensions (staff augmentation), enterprise-ready AI systems via the Vahue AI Hub, hands-on team training, the Vahue Incubator, and a community library of skills, prompts & plugins.'

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Vahue',
  },
  description: siteDescription,
  keywords: [
    // Value proposition
    'AI transformation',
    'accelerate AI adoption',
    'enterprise-ready AI',
    // Talent / team augmentation (primary emphasis)
    'AI-Native team augmentation',
    'AI-Native team extension',
    'AI staff augmentation',
    'AI staffing',
    'AI-Native engineering',
    'AI engineering pods',
    // Training
    'AI team training',
    'Claude Code training',
    'Cursor training',
    'AI literacy for teams',
    // Enterprise systems / Hub
    'enterprise AI systems',
    'Vahue AI Hub',
    'enterprise AI agents',
    'custom AI solutions',
    // Community & knowledge library
    'Vahue Incubator',
    'AI skills library',
    'AI prompts',
    'AI plugins',
    'MCP servers',
    'AI guides',
    // Broad fallback
    'AI consulting',
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
    title: siteTitle,
    description: siteDescriptionLong,
    // TODO: add 1200×630 OG image at /og-image.png
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescriptionLong,
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
