import type { Metadata } from 'next'
import LabsShell from '@/components/templates/labs-shared/LabsShell'
import LabsHome from '@/components/templates/labs/LabsHome'
import { vahueLabsHome, vahueLabsSearch } from '@/components/labs/vahue-labs-content'

const PAGE_URL = 'https://vahue.ai/labs/'
const DESCRIPTION =
  'Vahue research: a ranking of the jobs companies hire AI automation agencies for, from 87 agency records, plus our guides, articles and open roles.'

export const metadata: Metadata = {
  title: 'Research',
  description: DESCRIPTION,
  openGraph: { title: 'Research | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Labs template with its own header and footer; the site's Navbar and Footer are hidden here (components/SiteChrome.tsx).
export default function Page() {
  return (
    <LabsShell smoothScroll searchItems={vahueLabsSearch}>
      <LabsHome content={vahueLabsHome} />
    </LabsShell>
  )
}
