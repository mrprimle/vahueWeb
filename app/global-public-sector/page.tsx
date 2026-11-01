import type { Metadata } from 'next'
import { content } from '@/components/pages/global-public-sector/content'
import { GlobalPublicSectorPage } from '@/components/pages/global-public-sector/GlobalPublicSectorPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <GlobalPublicSectorPage content={content} />
}
