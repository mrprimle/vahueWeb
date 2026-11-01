import type { Metadata } from 'next'
import { content } from '@/components/pages/rlenvironments/content.scale'
import { RlEnvironmentsPage } from '@/components/pages/rlenvironments/RlEnvironmentsPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <RlEnvironmentsPage content={content} />
}
