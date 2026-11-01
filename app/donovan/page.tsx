import type { Metadata } from 'next'
import { DonovanPage } from '@/components/pages/donovan/DonovanPage'
import { content } from '@/components/pages/donovan/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <DonovanPage content={content} />
}
