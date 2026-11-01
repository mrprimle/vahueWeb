import type { Metadata } from 'next'
import { content } from '@/components/pages/enterprise/content'
import { EnterprisePage } from '@/components/pages/enterprise/EnterprisePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EnterprisePage content={content} />
}
