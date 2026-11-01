import type { Metadata } from 'next'
import BlogPage from '@/components/scale-clone/blog/BlogPage'
import { scaleBlogContent } from '@/components/scale-clone/blog/content'

export const metadata: Metadata = {
  title: 'Blog | Scale clone',
}

// 1:1 clone of scale.com/blog with Scale's own copy (static snapshot). Spec: reference-snapshots/scale-clone/blog.md
export default function Page() {
  return <BlogPage content={scaleBlogContent} />
}
