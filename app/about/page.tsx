import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about/AboutPage'
import { content } from '@/components/pages/about/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <AboutPage content={content} />
}
