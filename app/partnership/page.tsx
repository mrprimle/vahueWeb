import type { Metadata } from 'next'
import { PartnershipPage } from '@/components/pages/partnership/PartnershipPage'
import { content } from '@/components/pages/partnership/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <PartnershipPage content={content} />
}
