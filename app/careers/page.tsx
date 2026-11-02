import type { Metadata } from 'next'
import { CareersPage } from '@/components/pages/careers/CareersPage'
import { content } from '@/components/pages/careers/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <CareersPage content={content} />
}
