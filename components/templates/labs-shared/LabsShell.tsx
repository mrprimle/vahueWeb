import type { ReactNode } from 'react'
import { labsGeistMono, labsInter } from './fonts'
import LabsHeader from './LabsHeader'
import LabsFooter from './LabsFooter'
import LabsLenis from './LabsLenis'
import LabsLoaded from './LabsLoaded'
import type { LabsSearchItem } from './LabsSearch'
import s from './labs.module.css'

/*
 * Chrome for every /labs route (/labs, /labs/papers, /labs/leaderboard, /labs/blog, /labs/jobs). The site's Navbar and
 * Footer are hidden on these routes (components/SiteChrome.tsx).
 * Layout: <div class="min-h-screen bg-white text-ink"> header, <main>, footer.
 *   smoothScroll: Lenis runs on the home route only, as on the page this layout comes from.
 *   searchItems: static index for the search modal.
 */
export default function LabsShell({ children, smoothScroll = false, searchItems }: { children: ReactNode; smoothScroll?: boolean; searchItems?: LabsSearchItem[] }) {
  return (
    <div className={`${labsInter.variable} ${labsGeistMono.variable} ${s.root}`} data-labs-root="">
      <LabsLoaded />
      {smoothScroll && <LabsLenis />}
      <LabsHeader searchItems={searchItems} />
      <main>{children}</main>
      <LabsFooter />
    </div>
  )
}
