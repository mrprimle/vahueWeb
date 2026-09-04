import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudy } from '@/lib/case-studies'

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)
  if (!caseStudy) return {}

  return {
    title: `${caseStudy.client} — Case Study`,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} | Vahue`,
      description: caseStudy.summary,
      url: `https://vahue.ai/case-studies/${caseStudy.slug}`,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = getCaseStudy(slug)
  if (!caseStudy) notFound()

  return (
    <main className="bg-bg">
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-wide px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/45">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/case-studies" className="transition-colors hover:text-white">Case Studies</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/85">{caseStudy.client}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75">
                {caseStudy.service}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/55">
                {caseStudy.disclosure}
              </span>
            </div>
            <p className="mt-10 font-display text-5xl font-light leading-none text-white md:text-7xl">
              {caseStudy.metric}
            </p>
            <h1 className="mt-7 max-w-4xl text-balance font-display text-3xl font-medium leading-tight text-white md:text-5xl">
              {caseStudy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
              {caseStudy.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-wide grid-cols-1 gap-10 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-4">Engagement</p>
          <h2 className="font-display text-3xl font-medium text-white">{caseStudy.client}</h2>
          <dl className="mt-8 space-y-5 border-t border-white/10 pt-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">Service</dt>
              <dd className="mt-2 text-white/80">{caseStudy.service}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">Disclosure</dt>
              <dd className="mt-2 text-white/80">{caseStudy.disclosure}</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="eyebrow mb-4">Published outcomes</p>
          <h2 className="text-balance font-display text-3xl font-medium text-white md:text-4xl">
            The public evidence available for this engagement.
          </h2>
          <ul className="mt-8 space-y-4">
            {caseStudy.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-white/75">
                <span className="mt-2 size-1.5 flex-none rounded-full bg-[#b99dff]" aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <aside className="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">Evidence note</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              This page intentionally excludes confidential implementation details and any information not approved for public disclosure. Results reflect project measurements and/or client-reported outcomes available to Vahue; they have not been independently audited and do not guarantee future performance.
            </p>
          </aside>

          <Link href="/case-studies" className="mt-10 inline-flex text-sm font-medium text-white transition-colors hover:text-white/70">
            ← All case studies
          </Link>
        </div>
      </section>
    </main>
  )
}
