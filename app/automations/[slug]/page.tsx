import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WORKFLOWS } from '@/lib/automation-content'
import { WORKFLOW_PAGES } from '@/components/automation/workflows/registry'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return WORKFLOWS.filter((w) => w.slug in WORKFLOW_PAGES).map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const workflow = WORKFLOWS.find((w) => w.slug === slug)
  if (!workflow) return {}
  const url = `https://vahue.ai/automations/${workflow.slug}/`
  return {
    title: `${workflow.label} automation`,
    description: workflow.summary,
    openGraph: { title: `${workflow.label} automation | Vahue`, description: workflow.summary, url },
    alternates: { canonical: url },
  }
}

export default async function WorkflowRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const workflow = WORKFLOWS.find((w) => w.slug === slug)
  const load = WORKFLOW_PAGES[slug]
  if (!workflow || !load) notFound()
  const { default: Page } = await load()
  return <Page workflow={workflow} />
}
