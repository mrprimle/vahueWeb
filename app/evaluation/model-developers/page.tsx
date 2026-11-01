import type { Metadata } from 'next'
import VahueEvaluationModelDevelopersPage from '@/components/evaluation/VahueEvaluationModelDevelopersPage'

const PAGE_URL = 'https://vahue.ai/evaluation/model-developers/'
const DESCRIPTION =
  'How Vahue evaluates agents for teams building their own AI: recorded baselines, accuracy reviews, confidence thresholds and red-team style checks.'

export const metadata: Metadata = {
  title: 'Evaluation for Teams Building AI',
  description: DESCRIPTION,
  openGraph: { title: 'Evaluation for Teams Building AI | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/evaluation/model-developers layout (components/templates/evaluation-model-developers) in Scale's own colours.
export default function EvaluationModelDevelopersRoute() {
  return <VahueEvaluationModelDevelopersPage />
}
