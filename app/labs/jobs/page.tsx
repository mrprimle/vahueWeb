import type { Metadata } from 'next'
import LabsShell from '@/components/templates/labs-shared/LabsShell'
import LabsJobs from '@/components/templates/labs-jobs/LabsJobs'
import { vahueLabsJobs, vahueLabsSearch } from '@/components/labs/vahue-labs-content'

const PAGE_URL = 'https://vahue.ai/labs/jobs/'
const DESCRIPTION =
  'Open positions at Vahue.'

export const metadata: Metadata = {
  title: 'Research jobs',
  description: DESCRIPTION,
  openGraph: { title: 'Research jobs | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Labs template with its own header and footer; the site's Navbar and Footer are hidden here (components/SiteChrome.tsx).
export default function Page() {
  return (
    <LabsShell searchItems={vahueLabsSearch}>
      <LabsJobs content={vahueLabsJobs} />
    </LabsShell>
  )
}
