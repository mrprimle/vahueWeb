import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPage } from '@/components/pages/blog/BlogPage'
import { content } from '@/components/pages/blog/content'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return [...new Set(content.tags.map((t) => t.slug))].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const name = content.tags.find((t) => t.slug === slug)?.name ?? ''
  return { title: content.meta.categoryTitle.replace('{name}', name), description: content.meta.categoryDescription.replace('{name}', name) }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  if (!content.tags.some((t) => t.slug === slug)) notFound()
  return <BlogPage content={content} activeCategory={slug} />
}
