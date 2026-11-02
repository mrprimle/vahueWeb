import type { Metadata } from 'next'
import { GuidesPage } from '@/components/pages/guides/GuidesPage'
import { content } from '@/components/pages/guides/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <GuidesPage content={content} />
}
