import type { Metadata } from 'next'
import VahuePartnershipPage from '@/components/partnership/VahuePartnershipPage'

const PAGE_URL = 'https://vahue.ai/partnership/'
const DESCRIPTION =
  'How to partner with Vahue: refer a client with a high-volume workflow, or connect the tool their team works in. We run the agents, measured from day one.'

export const metadata: Metadata = {
  title: 'Partnership',
  description: DESCRIPTION,
  openGraph: { title: 'Partnership | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/partnership layout (components/templates/partnership) in Scale's own colours.
export default function PartnershipRoute() {
  return <VahuePartnershipPage />
}
