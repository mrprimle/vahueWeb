import type { Metadata } from 'next'
import BlogPage from '@/components/scale-clone/blog/BlogPage'

export const metadata: Metadata = {
  title: 'Blog | Scale clone',
}

// Structural clone of scale.com/blog. Spec: reference-snapshots/scale-clone/blog.md
export default function Page() {
  return <BlogPage />
}
