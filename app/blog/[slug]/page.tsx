// Stub: post bodies are not part of the /blog clone. Rows, tiles and search results link here.
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { content } from '@/components/pages/blog/content'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return content.posts.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const post = content.posts.find((p) => p.slug === slug)
  if (!post) notFound()
  return (
    <section className="min-h-svh px-6 pt-40 pb-24 text-center">
      <h1 className="header2">{post.title}</h1>
      <p className="mt-6 body2-regular">
        <Link className="underline" href="/blog">
          {content.hero.title}
        </Link>
      </p>
    </section>
  )
}
