import type { Metadata } from 'next'
import LabsShell from '@/components/scale-clone/labs-shared/LabsShell'
import LabsLeaderboard from '@/components/scale-clone/labs-leaderboard/LabsLeaderboard'
import { LABS_LEADERBOARD } from '@/components/scale-clone/labs-leaderboard/content'

export const metadata: Metadata = {
  title: 'AI Model Leaderboards & Benchmarks | Scale Labs | Scale clone',
}

// 1:1 clone of https://labs.scale.com/leaderboard (labs' `Home`, module 218341) with Scale's own copy and a static
// snapshot of the leaderboard data (captured 2026-11-01). Labs chrome from components/scale-clone/labs-shared
// (no Lenis: labs runs it on "/" only). Spec: reference-snapshots/scale-clone/labs-leaderboard.md
// Static stand-in for the Inkeep index ("[LEADERBOARDS] / name | Scale Labs / description").
const searchItems = LABS_LEADERBOARD.categories
  .filter((c) => !c.isSinglePage)
  .map((c) => ({
    kind: '[LEADERBOARDS]',
    title: `${c.name.trim()} | Scale Labs`,
    href: `/leaderboard/${c.id}${c.tabKey ? `?tab=${c.tabKey}` : ''}`,
    snippet: `${c.description} ${c.scores.map((s) => s.model).join(', ')}`,
  }))

export default function ScaleLabsLeaderboardPage() {
  return (
    <LabsShell searchItems={searchItems}>
      <LabsLeaderboard content={LABS_LEADERBOARD} />
    </LabsShell>
  )
}
