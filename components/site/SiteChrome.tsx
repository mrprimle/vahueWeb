'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { announcement, footer, nav } from './content'
import { Footer } from './Footer'
import { Header } from './Header'
import { RouteEffects } from './RouteEffects'
import { SmoothScroll } from './SmoothScroll'

// labs.scale.com and Scale's docs are separate sites with their own chrome; their page agents supply it.
export const SEPARATE_CHROME_PREFIXES = ['/docs', '/labs']

// Scale marks these pages' root `data-initial-chrome-theme="dark"`: the header keeps dark tokens at any scroll.
export const DARK_CHROME_ROUTES = ['/public-sector/national-security', '/genai-portfolio']

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const own = SEPARATE_CHROME_PREFIXES.some((p) => pathname === p || pathname?.startsWith(`${p}/`))
  return (
    <>
      <SmoothScroll />
      <RouteEffects />
      {own ? null : <AnnouncementBar data={announcement} />}
      {own ? null : (
        <div className="contents" data-initial-chrome-theme={DARK_CHROME_ROUTES.includes(pathname) ? 'dark' : undefined}>
          <Header content={nav} />
        </div>
      )}
      <main className="font-sans">{children}</main>
      {own ? null : <Footer content={footer} />}
    </>
  )
}
