import type { Metadata } from 'next'
import { content } from '@/components/pages/enterprise-healthcare/content'
import { EnterpriseHealthcarePage } from '@/components/pages/enterprise-healthcare/EnterpriseHealthcarePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EnterpriseHealthcarePage content={content} />
}
