import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies } from '@/lib/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Selected Vahue delivery outcomes across enterprise AI, AI-native engineering, and team enablement.',
  openGraph: {
    title: 'Case Studies | Vahue',
    description:
      'Selected Vahue delivery outcomes across enterprise AI, AI-native engineering, and team enablement.',
    url: 'https://vahue.ai/case-studies',
  },
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-bg">
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-wide px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <nav className="mb-10 flex items-center gap-2 text-sm text-white/45">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/85">Case Studies</span>
          </nav>

          <div className="max-w-4xl">
            <p className="eyebrow mb-6">Selected work · Delivery outcomes</p>
            <h1 className="max-w-4xl text-balance font-display text-[2.7rem] font-light leading-none text-white md:text-6xl xl:text-7xl">
              Evidence from work we actually delivered.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              Named clients are shown where disclosure is permitted. Other engagements are deliberately anonymised. We publish only the scope and results approved for public use.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-wide px-6 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.slug}
              href={`/case-studies/${caseStudy.slug}`}
              className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.035] p-7 transition-colors hover:border-white/25 hover:bg-white/[0.055] md:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(circle at 5% 0%, rgba(59,130,246,.15), transparent 40%), radial-gradient(circle at 100% 100%, rgba(139,92,246,.12), transparent 42%)',
                }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                    {caseStudy.service}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                    {caseStudy.disclosure}
                  </span>
                </div>
                <p className="mt-10 font-display text-4xl font-light leading-none text-white">
                  {caseStudy.metric}
                </p>
                <h2 className="mt-6 text-balance font-display text-2xl font-medium leading-tight text-white">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 flex-grow text-[15px] leading-relaxed text-white/65">
                  {caseStudy.summary}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-semibold text-white">{caseStudy.client}</span>
                  <span className="text-sm text-white/60 transition-transform group-hover:translate-x-1">View case →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/40">
          Results reflect project measurements and/or client-reported outcomes available to Vahue. They have not been independently audited and should not be read as a guarantee of future performance.
        </p>
      </section>
    </main>
  )
}
