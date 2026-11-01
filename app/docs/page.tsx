import type { Metadata } from 'next'
import VahueDocsPage from '@/components/docs/VahueDocsPage'

const PAGE_URL = 'https://vahue.ai/docs/'
const DESCRIPTION =
  'Getting started with Vahue: what an Audit, Pilot and Operate engagement needs from your team, the tools we connect to, the control layer and security.'

export const metadata: Metadata = {
  title: 'Getting started with Vahue',
  description: DESCRIPTION,
  openGraph: { title: 'Getting started with Vahue | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/docs layout (components/templates/docs). The template brings its own header, so the site's
// Navbar and Footer are hidden on this route (components/SiteChrome.tsx).
export default function DocsRoute() {
  return <VahueDocsPage />
}
