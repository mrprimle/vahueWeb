import type { Metadata } from 'next'
import VahueEvaluationPublicSectorPage from '@/components/evaluation/VahueEvaluationPublicSectorPage'

const PAGE_URL = 'https://vahue.ai/evaluation/public-sector/'
const DESCRIPTION =
  'Evaluating and auditing AI agents for regulated and public buyers: recorded baselines, reviewer checks, approvals and a full audit log, in your cloud or ours.'

export const metadata: Metadata = {
  title: 'Public Sector Agent Evaluation',
  description: DESCRIPTION,
  openGraph: { title: 'Public Sector Agent Evaluation | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/evaluation/public-sector layout (components/templates/evaluation-public-sector) in Scale's own colours.
export default function EvaluationPublicSectorRoute() {
  return <VahueEvaluationPublicSectorPage />
}
