import type { Metadata } from 'next'
import { BlogPage } from '@/components/pages/blog/BlogPage'
import { content } from '@/components/pages/blog/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <BlogPage content={content} />
}
