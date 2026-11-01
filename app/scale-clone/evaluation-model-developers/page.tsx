import type { Metadata } from 'next'
import EvalModelDevPage from '@/components/scale-clone/evaluation-model-developers/EvalModelDevPage'

export const metadata: Metadata = {
  title: 'Evaluation for Model Developers (Scale clone)',
}

// Clone of scale.com/evaluation/model-developers. Spec: reference-snapshots/scale-clone/evaluation-model-developers.md
export default function Page() {
  return <EvalModelDevPage />
}
