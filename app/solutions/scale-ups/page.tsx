import type { Metadata } from 'next'
import { content } from '@/components/pages/public-sector/content'
import { PublicSectorPage } from '@/components/pages/public-sector/PublicSectorPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <PublicSectorPage content={content} />
}
