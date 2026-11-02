import type { Metadata } from 'next'
import { DemoPage } from '@/components/pages/demo/DemoPage'
import { content } from '@/components/pages/demo/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <DemoPage content={content} />
}
