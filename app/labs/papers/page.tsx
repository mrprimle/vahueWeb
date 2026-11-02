import type { Metadata } from 'next'
import { contentScale as content } from '@/components/pages/labs-papers/content.scale'
import { ResearchTable } from '@/components/pages/labs-papers/ResearchTable'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <ResearchTable content={content} />
}
