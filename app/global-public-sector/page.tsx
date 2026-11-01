import type { Metadata } from 'next'
import VahueGlobalPublicSectorPage from '@/components/public-sector/VahueGlobalPublicSectorPage'

const PAGE_URL = 'https://vahue.ai/global-public-sector/'
const DESCRIPTION =
  'AI agents for public organisations in the EU, UK and selected APAC markets: document intake, knowledge Q&A, support and back-office sync, deployed where your data lives.'

export const metadata: Metadata = {
  title: 'Global Public Sector',
  description: DESCRIPTION,
  openGraph: { title: 'Global Public Sector | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/global-public-sector layout (components/templates/global-public-sector) in Scale's own colours.
export default function GlobalPublicSectorRoute() {
  return <VahueGlobalPublicSectorPage />
}
