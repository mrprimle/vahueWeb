import type { Metadata } from 'next'
import { BlogList } from '@/components/pages/labs-blog/BlogList'
import { content } from '@/components/pages/labs-blog/content'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <BlogList content={content} />
}
