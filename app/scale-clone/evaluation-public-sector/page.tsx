import type { Metadata } from 'next'
import EvaluationPublicSectorPage from '@/components/scale-clone/evaluation-public-sector/EvaluationPublicSectorPage'
import { scaleEvaluationPublicSectorContent } from '@/components/scale-clone/evaluation-public-sector/content'

export const metadata: Metadata = {
  title: 'Public Sector Test & Evaluation | Scale clone',
}

// 1:1 clone of scale.com/evaluation/public-sector with Scale's own copy. Spec: reference-snapshots/scale-clone/evaluation-public-sector.md
export default function ScaleEvaluationPublicSectorPage() {
  return <EvaluationPublicSectorPage content={scaleEvaluationPublicSectorContent} />
}
