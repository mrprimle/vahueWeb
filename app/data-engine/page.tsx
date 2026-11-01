import type { Metadata } from 'next'
import { scaleContent as content } from '@/components/pages/data-engine/content.scale'
import { DataEnginePage } from '@/components/pages/data-engine/DataEnginePage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <DataEnginePage content={content} />
}
