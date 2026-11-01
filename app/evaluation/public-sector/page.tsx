import type { Metadata } from 'next'
import { content } from '@/components/pages/evaluation-public-sector/content'
import { EvaluationPublicSectorPage } from '@/components/pages/evaluation-public-sector/EvaluationPublicSectorPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EvaluationPublicSectorPage content={content} />
}
