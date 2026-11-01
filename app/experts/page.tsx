import type { Metadata } from 'next'
import { content } from '@/components/pages/experts/content'
import { ExpertsPage } from '@/components/pages/experts/ExpertsPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <ExpertsPage content={content} />
}
