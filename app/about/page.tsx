import type { Metadata } from 'next'
import VahueAboutPage from '@/components/about/VahueAboutPage'

const PAGE_URL = 'https://vahue.ai/about/'
const DESCRIPTION =
  'Vahue runs your busiest workflows with AI agents, measured from day one. Founded in 2019, working in three steps: Audit, Pilot, Operate.'

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  openGraph: { title: 'About | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/about layout (components/templates/about) in Scale's own colours.
export default function AboutRoute() {
  return <VahueAboutPage />
}
