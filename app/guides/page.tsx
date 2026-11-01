import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import BookIndexHero from '@/components/book-index/BookIndexHero'
import BookGrid, { type Book } from '@/components/book-index/BookGrid'
import FullBleedMedia from '@/components/book-index/FullBleedMedia'
import { guides } from '@/lib/guides'
import { WORKFLOWS } from '@/lib/automation-content'

export const metadata: Metadata = {
  title: 'Guides | Vahue',
  description:
    'Guides to putting AI agents to work: Claude Code skills, the workflow audit, back-office, document, knowledge and scoring agents, and AI by industry.',
  openGraph: {
    title: 'Guides | Vahue',
    description:
      'Guides to putting AI agents to work: Claude Code skills, the workflow audit, back-office, document, knowledge and scoring agents, and AI by industry.',
    url: 'https://vahue.ai/guides',
  },
  alternates: { canonical: 'https://vahue.ai/guides/' },
}

const workflow = (slug: string) => {
  const w = WORKFLOWS.find((x) => x.slug === slug)
  if (!w) throw new Error(`unknown workflow ${slug}`)
  return `/automations/${w.slug}/`
}

/*
 * /guides in strict parity with the guides clone (scale.com/guides, spec reference-snapshots/scale-clone/guides.md):
 * Scale's three sections (centred hero, 12-book grid, clip-opening pre-footer) in Scale's colours (white page, Scale's
 * five cover colours and white page blocks), Vahue fonts and logo. Vahue has one long-form guide so far; the other
 * eleven book slots hold the closest research pages (workflow audit, operations, workflow and industry pages), with
 * cover titles of the same length and line count as Scale's book in that slot. Copy written here is marked `// page copy`.
 */
const books: Book[] = [
  // Scale: "Data Labeling: The Authoritative Guide" (2 lines)
  { href: `/guides/${guides[0].slug}/`, title: 'Claude Code Skills: A Practical Guide' }, // page copy
  // Scale: "Diffusion Models: A Practical Guide"
  { href: workflow('back-office-sync'), title: 'Back-Office Sync: A Field Guide' }, // page copy
  // Scale: "Training and Building Machine Learning Models" (3 lines)
  { href: '/strategy/', title: 'Auditing and Baselining a Workflow' }, // page copy
  // Scale: "Guide to AI for eCommerce"
  { href: '/industries/retail-ecommerce/', title: 'Guide to AI for Retailers' }, // page copy
  // Scale: "Guide to Computer Vision Applications"
  { href: workflow('document-intake'), title: 'Guide to Document Intake Agents' }, // page copy
  // Scale: "Guide to Large Language Models"
  { href: workflow('knowledge-agents'), title: 'Guide to Knowledge Agents' }, // page copy
  // Scale: "Generative AI for the Enterprise: From Experimentation to Production" (4 lines)
  { href: '/operations/', title: 'AI Agents for Operations: From the First Pilot to Measured Results' }, // page copy
  // Scale: "Guide to AI for Insurance"
  { href: '/industries/insurance/', title: 'Guide to AI for Insurance' }, // page copy
  // Scale: "Guide to AI in Finance"
  { href: '/industries/banking-financial-services/', title: 'Guide to AI in Banking' }, // page copy
  // Scale: "Test and Evaluation Vision"
  { href: workflow('scoring-decisions'), title: 'Scoring and Routing Decisions' }, // page copy
  // Scale: "Guide to AI for the Intelligence Community" (3 lines)
  { href: '/industries/distribution-manufacturing/', title: 'Guide to AI for Distribution and Manufacturing' }, // page copy
  // Scale: "Enterprise Guide: Build vs. Buy"
  { href: workflow('engineering-enablement'), title: 'Engineering Guide: AI-Native Teams' }, // page copy
]

export default function GuidesPage() {
  return (
    <main className="bg-white">
      <SmoothScroll />
      <BookIndexHero
        overtitle="Resources"
        title="Guides"
        // page copy
        sub="Running a workflow with agents takes work, so we wrote these guides to help your team move from first pilot to measured results faster."
      />
      <BookGrid books={books} ariaLabel="Guides" />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#fff"
          image="/img/careers/office-2.jpg"
          imageBg="#193A29"
          headline="Start running better workflows today." // page copy
          primary={{ label: 'Book an Audit', href: '/contact/' }}
        />
      </div>
    </main>
  )
}
