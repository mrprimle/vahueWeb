import type { Metadata } from 'next'
import VahuePublicSectorDataEnginePage from '@/components/public-sector/VahuePublicSectorDataEnginePage'

const PAGE_URL = 'https://vahue.ai/public-sector-data-engine/'
const DESCRIPTION =
  'How Vahue runs back-office and document workflows for government teams: agents inside your tools, people in review and every action logged.'

export const metadata: Metadata = {
  title: 'Agents for Government Back Offices',
  description: DESCRIPTION,
  openGraph: { title: 'Agents for Government Back Offices | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/public-sector-data-engine layout (components/templates/public-sector-data-engine) in Scale's own colours.
export default function PublicSectorDataEngineRoute() {
  return <VahuePublicSectorDataEnginePage />
}
