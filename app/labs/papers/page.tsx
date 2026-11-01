import type { Metadata } from 'next'
import LabsShell from '@/components/templates/labs-shared/LabsShell'
import LabsPapers from '@/components/templates/labs-papers/LabsPapers'
import { vahueLabsPapers, vahueLabsSearch } from '@/components/labs/vahue-labs-content'

const PAGE_URL = 'https://vahue.ai/labs/papers/'
const DESCRIPTION =
  'Guides and articles from the Vahue team on agents, AI search, AI policy, secure deployment and the data behind coding models.'

export const metadata: Metadata = {
  title: 'Research papers',
  description: DESCRIPTION,
  openGraph: { title: 'Research papers | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Labs template with its own header and footer; the site's Navbar and Footer are hidden here (components/SiteChrome.tsx).
export default function Page() {
  return (
    <LabsShell searchItems={vahueLabsSearch}>
      <LabsPapers content={vahueLabsPapers} />
    </LabsShell>
  )
}
