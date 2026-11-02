import type { Metadata } from 'next'
import { contentScale as content } from '@/components/pages/labs/content.scale'
import { LabsPage } from '@/components/pages/labs/LabsPage'
import { labsChromeScale as chrome } from '@/components/site/labs/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <LabsPage content={content} logo={chrome.logo} />
}
