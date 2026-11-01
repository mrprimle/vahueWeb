import type { Metadata } from 'next'
import LabsShell from '@/components/templates/labs-shared/LabsShell'
import LabsLeaderboard from '@/components/templates/labs-leaderboard/LabsLeaderboard'
import { vahueLabsLeaderboard, vahueLabsSearch } from '@/components/labs/vahue-labs-content'

const PAGE_URL = 'https://vahue.ai/labs/leaderboard/'
const DESCRIPTION =
  "Vahue's analysis of 87 agency records: the top jobs companies hire AI automation agencies for, and the triggers behind them."

export const metadata: Metadata = {
  title: 'Research leaderboards',
  description: DESCRIPTION,
  openGraph: { title: 'Research leaderboards | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Labs template with its own header and footer; the site's Navbar and Footer are hidden here (components/SiteChrome.tsx).
export default function Page() {
  return (
    <LabsShell searchItems={vahueLabsSearch}>
      <LabsLeaderboard content={vahueLabsLeaderboard} />
    </LabsShell>
  )
}
