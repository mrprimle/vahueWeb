import type { Metadata } from 'next'
import LabsShell from '@/components/scale-clone/labs-shared/LabsShell'
import LabsHome from '@/components/scale-clone/labs/LabsHome'
import { LABS_HOME } from '@/components/scale-clone/labs/content'

export const metadata: Metadata = {
  title: 'Scale Labs | Scale clone',
}

// 1:1 clone of https://labs.scale.com/ (a separate Next app with its own chrome) with Scale's own copy, static
// snapshot. Labs chrome comes from components/scale-clone/labs-shared; the scale.com header/footer are suppressed
// on labs routes by CloneChrome. Spec: reference-snapshots/scale-clone/labs.md
// Static stand-in for the Inkeep index (result rows mimic Inkeep's "[SECTION] / title | Scale Labs / snippet").
const searchItems = [
  ...LABS_HOME.papers.items.map((p) => ({ kind: '[PAPERS]', title: `${p.title} | Scale Labs`, href: p.href, snippet: `${p.categories} ${p.date} ${p.title} ${p.authors}` })),
  ...LABS_HOME.leaderboards.items.map((l) => ({ kind: '[LEADERBOARDS]', title: `Scale Labs Leaderboard: ${l.name}`, href: l.href, snippet: l.name })),
  ...LABS_HOME.blog.posts.map((p) => ({ kind: '[BLOG]', title: `${p.title} | Scale Labs`, href: p.href, snippet: p.intro.trim() })),
]

export default function ScaleLabsPage() {
  return (
    <LabsShell smoothScroll searchItems={searchItems}>
      <LabsHome content={LABS_HOME} />
    </LabsShell>
  )
}
