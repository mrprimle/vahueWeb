import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPage from '@/components/scale-clone/blog/BlogPage'
import { scaleBlogContent } from '@/components/scale-clone/blog/content'

// scale.com/blog/category/<slug>: same page with the tag active, no bento, the category's posts in the list.
export function generateStaticParams() {
  return [...new Set(scaleBlogContent.tags.map((t) => t.slug))].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tag = scaleBlogContent.tags.find((t) => t.slug === slug)
  return { title: `${tag?.name ?? 'Category'} | Blog | Scale clone` }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!scaleBlogContent.tags.some((t) => t.slug === slug)) notFound()
  return <BlogPage content={scaleBlogContent} activeCategory={slug} />
}
