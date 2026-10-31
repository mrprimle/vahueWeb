import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import BookIndexHero from '@/components/book-index/BookIndexHero'
import BookGrid from '@/components/book-index/BookGrid'
import IndexList, { type IndexGroup } from '@/components/book-index/IndexList'
import FullBleedMedia from '@/components/book-index/FullBleedMedia'
import { guideCategories, guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guides | Vahue',
  description:
    'Practical, hands-on guides for AI-native engineering — Claude Code, Cursor, MCP, deploy, and more.',
  openGraph: {
    title: 'Guides | Vahue',
    description:
      'Practical, hands-on guides for AI-native engineering — Claude Code, Cursor, MCP, deploy, and more.',
    url: 'https://vahue.ai/guides',
  },
  alternates: { canonical: 'https://vahue.ai/guides/' },
}

// Guides index on the layout of the guides clone (app/scale-clone/guides, spec in
// reference-snapshots/scale-clone/guides.md): centred hero, book grid, clip-opening pre-footer.
// The text index below the grid keeps the topic grouping, excerpts and dates for crawlers.
export default function GuidesPage() {
  const books = guides.map((g) => ({ href: `/guides/${g.slug}/`, title: g.title, label: g.category }))

  const groups: IndexGroup[] = guideCategories
    .map((category) => ({
      heading: category,
      items: guides
        .filter((g) => g.category === category)
        .map((g) => ({
          href: `/guides/${g.slug}/`,
          title: g.title,
          meta: `${g.date} · ${g.readTime}`,
          summary: g.excerpt,
        })),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <main className="bg-bg">
      <SmoothScroll />
      <BookIndexHero
        overtitle="Knowledge library"
        title="Guides"
        sub="Hands-on guides for AI-native engineering: Claude Code, Cursor, MCP, deploy and setup. Each one is a method we use on client work."
      />
      <BookGrid books={books} ariaLabel="Guides" />
      <IndexList overtitle="By topic" title="All guides" groups={groups} />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#020202"
          image="/img/careers/office-2.jpg"
          imageBg="#111"
          headline="Want your team building this way? We train engineers on real work."
          primary={{ label: 'Talk to us', href: '/contact/' }}
        />
      </div>
    </main>
  )
}
