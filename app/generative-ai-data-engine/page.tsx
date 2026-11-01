import type { Metadata } from 'next'
import { content } from '@/components/pages/generative-ai-data-engine/content'
import { GenAiDataEnginePage } from '@/components/pages/generative-ai-data-engine/GenAiDataEnginePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <GenAiDataEnginePage content={content} />
}
