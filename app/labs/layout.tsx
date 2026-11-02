import { Geist_Mono, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { content as home } from '@/components/pages/labs/content'
import { labsChrome as chrome } from '@/components/site/labs/content'
import { LabsChrome } from '@/components/site/labs/LabsChrome'
import { buildLabsSearchIndex } from '@/components/site/labs/searchIndex'
import '@/components/site/labs/labs.css'

// labs.scale.com ships InterVariable and Geist Mono. Same families from Google Fonts; Scale's font files are not shipped.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-brand', axes: ['opsz'] })
const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-geist-mono' })

/** Every /labs* route gets labs.scale.com's own chrome here; `SiteChrome` skips the main site's chrome and Lenis for these routes. */
export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <LabsChrome content={chrome} searchIndex={buildLabsSearchIndex(home, chrome.logo.alt)} className={`${inter.variable} ${geistMono.variable}`}>
      {children}
    </LabsChrome>
  )
}
