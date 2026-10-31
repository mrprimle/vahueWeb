import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import BookIndexHero from '@/components/book-index/BookIndexHero'
import BookGrid from '@/components/book-index/BookGrid'
import IndexList, { type IndexGroup } from '@/components/book-index/IndexList'
import FullBleedMedia from '@/components/book-index/FullBleedMedia'
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
  alternates: { canonical: 'https://vahue.ai/case-studies/' },
}

// Case studies index on the layout of the guides clone (app/scale-clone/guides, spec in
// reference-snapshots/scale-clone/guides.md): each verified case is a book with its metric.
// The text index below the grid keeps the service grouping, client, summaries and the disclaimer.
export default function CaseStudiesPage() {
  const books = caseStudies.map((c) => ({
    href: `/case-studies/${c.slug}/`,
    title: c.title,
    metric: c.metric,
    label: `${c.service} · ${c.disclosure}`,
  }))

  const services = Array.from(new Set(caseStudies.map((c) => c.service)))
  const groups: IndexGroup[] = services.map((service) => ({
    heading: service,
    items: caseStudies
      .filter((c) => c.service === service)
      .map((c) => ({
        href: `/case-studies/${c.slug}/`,
        title: c.title,
        meta: `${c.client} · ${c.disclosure}`,
        summary: c.summary,
      })),
  }))

  return (
    <main className="bg-bg">
      <SmoothScroll />
      <BookIndexHero
        overtitle="Selected work"
        title="Evidence from work we actually delivered."
        sub="Named clients are shown where disclosure is permitted. Other engagements are deliberately anonymised. We publish only the scope and results approved for public use."
      />
      <BookGrid books={books} ariaLabel="Case studies" />
      <IndexList
        overtitle="By service"
        title="All case studies"
        groups={groups}
        footnote={
          <p>
            Results reflect project measurements and/or client-reported outcomes available to Vahue. They have not been
            independently audited and should not be read as a guarantee of future performance.
          </p>
        }
      />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#020202"
          image="/img/careers/team.jpg"
          imageBg="#111"
          headline="Start with one workflow and a result you can measure."
          primary={{ label: 'Talk to us', href: '/contact/' }}
        />
      </div>
    </main>
  )
}
