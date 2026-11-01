import type { ReactNode } from 'react'
import { labsGeistMono, labsInter } from './fonts'
import LabsHeader from './LabsHeader'
import LabsFooter from './LabsFooter'
import LabsLenis from './LabsLenis'
import LabsLoaded from './LabsLoaded'
import type { LabsSearchItem } from './LabsSearch'
import s from './labs.module.css'

/*
 * Chrome for every labs.scale.com clone (/labs, labs-papers, labs-leaderboard, labs-blog, labs-jobs).
 * labs is a separate Next 16 app (Turbopack, Tailwind v4, Inter + Geist Mono) with its own UnifiedHeader /
 * UnifiedFooter; it brings all of its own chrome.
 * Layout mirrors labs' root: <div class="min-h-screen bg-white text-ink"> header, <main>, footer.
 *   smoothScroll: labs mounts Lenis only on its home route ("/"), so only the labs home clone sets it.
 *   searchItems: static index for the search modal (stand-in for Inkeep).
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
