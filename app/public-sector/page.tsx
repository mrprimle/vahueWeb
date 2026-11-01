import type { Metadata } from 'next'
import VahuePublicSectorPage from '@/components/public-sector/VahuePublicSectorPage'

const PAGE_URL = 'https://vahue.ai/public-sector/'
const DESCRIPTION =
  'AI agents for US public organisations: document intake, knowledge Q&A, support and back-office sync, with people in review and every action logged.'

export const metadata: Metadata = {
  title: 'US Public Sector',
  description: DESCRIPTION,
  openGraph: { title: 'US Public Sector | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/public-sector layout (components/templates/public-sector) in Scale's own colours.
export default function PublicSectorRoute() {
  return <VahuePublicSectorPage />
}
