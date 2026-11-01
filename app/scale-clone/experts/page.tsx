import type { Metadata } from 'next'
import ExpertsPage from '@/components/scale-clone/experts/ExpertsPage'

export const metadata: Metadata = {
  title: 'Experts (Scale clone)',
}

// Clone of scale.com/experts. Spec: reference-snapshots/scale-clone/experts.md
export default function Page() {
  return <ExpertsPage />
}
