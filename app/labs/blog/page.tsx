import type { Metadata } from 'next'
import LabsShell from '@/components/templates/labs-shared/LabsShell'
import LabsBlog from '@/components/templates/labs-blog/LabsBlog'
import { vahueLabsBlog, vahueLabsSearch } from '@/components/labs/vahue-labs-content'

const PAGE_URL = 'https://vahue.ai/labs/blog/'
const DESCRIPTION =
  'Insights, analysis and updates from Vahue on AI agents, AI search, policy and secure deployment.'

export const metadata: Metadata = {
  title: 'Research blog',
  description: DESCRIPTION,
  openGraph: { title: 'Research blog | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Labs template with its own header and footer; the site's Navbar and Footer are hidden here (components/SiteChrome.tsx).
export default function Page() {
  return (
    <LabsShell searchItems={vahueLabsSearch}>
      <LabsBlog content={vahueLabsBlog} />
    </LabsShell>
  )
}
