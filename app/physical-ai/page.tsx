import type { Metadata } from 'next'
import { content } from '@/components/pages/physical-ai/content'
import { PhysicalAiPage } from '@/components/pages/physical-ai/PhysicalAiPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <PhysicalAiPage content={content} />
}
