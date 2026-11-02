import type { Metadata } from 'next'
import { content } from '@/components/pages/security/content.scale'
import { SecurityPage } from '@/components/pages/security/SecurityPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <SecurityPage content={content} />
}
