import type { Metadata } from 'next'
import { AutomotivePage } from '@/components/pages/automotive/AutomotivePage'
import { content } from '@/components/pages/automotive/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <AutomotivePage content={content} />
}
