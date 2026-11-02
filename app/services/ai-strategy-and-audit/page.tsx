import type { Metadata } from 'next'
import { content } from '@/components/pages/evaluation-enterprise/content'
import { EvaluationEnterprisePage } from '@/components/pages/evaluation-enterprise/EvaluationEnterprisePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EvaluationEnterprisePage content={content} />
}
