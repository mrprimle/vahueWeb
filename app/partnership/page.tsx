import type { Metadata } from 'next'
import { PartnershipPage } from '@/components/pages/partnership/PartnershipPage'
import { contentScale } from '@/components/pages/partnership/content.scale'

export const metadata: Metadata = { title: contentScale.meta.title, description: contentScale.meta.description }

export default function Page() {
  return <PartnershipPage content={contentScale} />
}
