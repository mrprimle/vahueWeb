import type { Metadata } from 'next'
import VahueExpertsPage from '@/components/experts/VahueExpertsPage'

const PAGE_URL = 'https://vahue.ai/experts/'
const DESCRIPTION =
  'The people behind Vahue agents: a team of 17 and 15+ specialists who audit, pilot and operate six workflows under one control layer.'

export const metadata: Metadata = {
  title: 'Experts',
  description: DESCRIPTION,
  openGraph: { title: 'Experts | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/experts layout (components/templates/experts) in Scale's own colours.
export default function ExpertsRoute() {
  return <VahueExpertsPage />
}
