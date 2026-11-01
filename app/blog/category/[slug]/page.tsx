import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VahueBlogPage from '@/components/blog/VahueBlogPage'
import { vahueBlogTags } from '@/components/blog/vahue-blog-content'

// /blog/category/<slug>: the blog index with that tag active, no bento, the category's posts in the list (as on
// scale.com/blog/category/<slug>). Only the real posts' categories exist.
export const dynamicParams = false

export function generateStaticParams() {
  return vahueBlogTags.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tag = vahueBlogTags.find((t) => t.slug === slug)
  if (!tag) return {}
  const url = `https://vahue.ai/blog/category/${slug}/`
  const description = `Vahue articles on ${tag.name}.`
  return {
    title: `${tag.name} | Blog`,
    description,
    openGraph: { title: `${tag.name} | Blog | Vahue`, description, url },
    alternates: { canonical: url },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!vahueBlogTags.some((t) => t.slug === slug)) notFound()
  return <VahueBlogPage activeCategory={slug} />
}
