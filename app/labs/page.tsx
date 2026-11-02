import type { Metadata } from 'next'
import { content } from '@/components/pages/labs/content'
import { LabsPage } from '@/components/pages/labs/LabsPage'
import { labsChrome as chrome } from '@/components/site/labs/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <LabsPage content={content} logo={chrome.logo} />
}
