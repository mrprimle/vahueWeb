import { notFound } from 'next/navigation'
import { hasPage } from '@/components/pages/docs/DocsNav'
import { DocsStub } from '@/components/pages/docs/DocsStub'
import { content } from '@/components/pages/docs/content.scale'

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  if (!hasPage(content, `/docs/${slug.join('/')}`)) notFound()
  return <DocsStub content={content} />
}
