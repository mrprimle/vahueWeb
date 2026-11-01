import type { Metadata } from 'next'
import { content } from '@/components/pages/evaluation-model-developers/content.scale'
import { EvaluationModelDevelopersPage } from '@/components/pages/evaluation-model-developers/EvaluationModelDevelopersPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EvaluationModelDevelopersPage content={content} />
}
