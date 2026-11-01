import type { Metadata } from 'next'
import { scaleContent as content } from '@/components/pages/public-sector-data-engine/content.scale'
import { PublicSectorDataEnginePage } from '@/components/pages/public-sector-data-engine/PublicSectorDataEnginePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <PublicSectorDataEnginePage content={content} />
}
