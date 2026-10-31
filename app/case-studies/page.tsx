import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import BookIndexHero from '@/components/book-index/BookIndexHero'
import BookGrid from '@/components/book-index/BookGrid'
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

/*
 * /case-studies in strict parity with the guides clone (app/scale-clone/guides, spec
 * reference-snapshots/scale-clone/guides.md): Scale's three sections (centred hero, 12-book grid, clip-opening
 * pre-footer) in Scale's colours, Vahue fonts and logo. The 12 books are Vahue's 10 cases from lib/case-studies.ts plus
 * the audit and operate pages, each cover carrying only what Scale's does (mark, index, title). The hero sub carries the disclosure note.
 * Copy written here is marked `// page copy`.
 */
export default function CaseStudiesPage() {
  const books = [
    ...caseStudies.map((c) => ({ href: `/case-studies/${c.slug}/`, title: c.title })),
    // Vahue has 10 published cases; Scale's grid has 12 books. The last two slots hold the method every case ran on.
    { href: '/strategy/', title: 'How a two-week audit records the baseline' }, // page copy
    { href: '/operations/', title: 'Running agents month to month against the baseline' }, // page copy
  ]

  return (
    <main className="bg-white">
      <SmoothScroll />
      <BookIndexHero
        overtitle="Selected work"
        title="Case studies"
        // page copy
        sub="Named clients appear where disclosure is permitted; others are anonymised. Results are measured or client-reported, not audited."
      />
      <BookGrid books={books} ariaLabel="Case studies" />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#fff"
          image="/img/careers/team.jpg"
          imageBg="#193A29"
          headline="Start with one workflow today." // page copy
          primary={{ label: 'Book an Audit', href: '/contact/' }}
        />
      </div>
    </main>
  )
}
