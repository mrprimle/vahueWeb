'use client'

import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import HomePage from '@/components/templates/home/HomePage'
import type { HomeContent, HomeMedia, OrbitItem } from '@/components/templates/home/content'
import { PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import { caseStudies, getCaseStudy } from '@/lib/case-studies'
import { vahueBlogPosts } from '@/components/blog/vahue-blog-content'
import { cardIcons, drawHeroFrame, Monogram, orbitArt, PrefooterArt, QuoteArt } from './homeArt'

/*
 * Vahue / on the scale.com homepage layout (components/templates/home, spec reference-snapshots/scale-clone/home.md). Every Scale
 * section, in order, with the same roles and counts. Copy comes from lib/automation-content.ts and lib/case-studies.ts; lines written
 * for this page are marked `// page copy`. Scale's colours and motion stay; visuals are own (homeArt.tsx). Client logos are the ones
 * the previous homepage showed (ClientsStrip).
 */

const TAN = '#A8927C'
const GREEN = '#193A29'
const PURPLE = '#79648C'
const SLATE = '#839CB2'

const wf = (slug: string) => {
  const w = WORKFLOWS.find((x) => x.slug === slug)
  return `/automations/${w?.slug ?? ''}`
}
const phase = (name: string) => PHASES.find((p) => p.name === name)?.body ?? ''

// Scale's 12 orbit items keep their word colours and exit directions in order; six workflows, five industries, operations.
const ORBIT: OrbitItem[] = [
  { type: 'Back-office', color: TAN, href: wf('back-office-sync'), image: orbitArt.backOffice }, // page copy
  { type: 'Documents', color: TAN, href: wf('document-intake'), image: orbitArt.documents }, // page copy
  { type: 'Knowledge', color: GREEN, direction: 'right', href: wf('knowledge-agents'), image: orbitArt.knowledge }, // page copy
  { type: 'Support', color: TAN, href: wf('support-agents'), image: orbitArt.support }, // page copy
  { type: 'Scoring', color: GREEN, direction: 'right', href: wf('scoring-decisions'), image: orbitArt.scoring }, // page copy
  { type: 'Engineering', color: GREEN, direction: 'right', href: wf('engineering-enablement'), image: orbitArt.engineering }, // page copy
  { type: 'Insurance', color: PURPLE, href: '/industries/insurance', image: orbitArt.insurance },
  { type: 'Healthcare', color: TAN, href: '/industries/healthcare-life-sciences', image: orbitArt.healthcare },
  { type: 'Banking', color: PURPLE, href: '/industries/banking-financial-services', image: orbitArt.banking },
  { type: 'Retail', color: TAN, href: '/industries/retail-ecommerce', image: orbitArt.retail },
  { type: 'Manufacturing', color: TAN, href: '/industries/distribution-manufacturing', image: orbitArt.manufacturing },
  { type: 'Operations', color: GREEN, direction: 'right', href: '/operations', image: orbitArt.operations },
]

const postImages: Record<string, string> = {
  'aeo-content-system': '/img/blog/aeo-system-cover.png',
  'claude-fable-5-agentic-ai': '/img/blog/agentic-flexibility-assets.webp',
  'trumps-ai-order-decoded': '/img/blog/blog4.avif',
  'secure-llm-deployment-enterprise': '/img/blog/blog1.jpg',
  'code-data-sources-for-llm-training': '/img/blog/blog2.jpg',
  'human-written-code-llm-training': '/img/blog/blog3.png',
}
const blogTile = (slug: string, extra: { gradient?: boolean; chip?: boolean } = {}) => {
  const p = vahueBlogPosts.find((x) => x.slug === slug)
  return { title: p?.title ?? '', href: p?.href ?? '/blog', category: extra.chip === false ? undefined : p?.category.name, image: postImages[slug], textColor: 'light' as const, gradient: extra.gradient }
}
const caseTile = (slug: string, image: string) => {
  const c = getCaseStudy(slug)
  return { title: `${c?.client}: ${c?.title}`, href: `/case-studies/${slug}`, category: 'Case study', image, imageAlt: '', textColor: 'light' as const } // page copy (category label)
}

const content: HomeContent = {
  hero: {
    headline: POSITIONING.line,
    scrollHint: 'Scroll to explore', // page copy
    items: [
      {
        title: 'Good automation has no shortcuts.', // page copy
        body: POSITIONING.promise,
      },
      {
        category: 'Automations', // page copy
        title: 'Agents that do the actual work.', // page copy
        body: 'Six workflows, from back-office sync to support. We pick the one that pays, build it on your data and run it.', // page copy
        cta: { text: 'See automations', href: '/automations' }, // page copy
        logos: [
          { name: 'Shopify', src: '/img/shopify.svg' },
          { name: 'Qonto', src: '/img/qontoLogo.svg' },
          { name: 'Leafworks', src: '/img/leafworks.svg' },
          { name: 'Tracesafe', src: '/img/tracesafe.svg' },
          { name: 'Carmen', src: '/img/carmen.svg' },
          { name: 'BringLiesel', src: '/img/bringliesel.svg' },
        ],
      },
      {
        category: 'Control layer', // page copy
        title: 'People stay in charge of every agent.', // page copy
        body: 'Review queues, approvals, role-based access and an audit log around every action, plus a monthly report against your baseline.', // page copy
        cta: { text: 'How we operate', href: '/operations' }, // page copy
      },
    ],
  },
  quote: {
    // Real figure: rfi-response-automation in lib/case-studies.ts
    text: "More than 90% of one client's RFI responses now run automated, with human review intact.", // page copy
  },
  applications: {
    headline: 'Agents that run', // page copy
    realWord: 'Real', // page copy
    cta: { text: 'Get started', href: '/contact' },
    items: ORBIT,
    carousel: {
      heading: 'Proven in production, case by case.', // page copy
      cards: caseStudies.map((c) => ({ heading: c.title, subtitle: c.client, href: `/case-studies/${c.slug}`, mark: <Monogram name={c.client} /> })),
    },
  },
  benchmark: {
    heading: 'Audit, Pilot, Operate: how one workflow goes live', // page copy
    cards: [
      { title: 'Audit: two weeks to map one workflow and its baseline.', body: phase('Audit'), cta: { text: 'Learn more', href: '/strategy' }, hoveredColor: PURPLE, iconColor: PURPLE, icon: cardIcons.leaderboard }, // page copy (title)
      { title: 'Pilot: four to six weeks on your own data at real volume.', body: phase('Pilot'), cta: { text: 'Learn more', href: '/automations' }, hoveredColor: TAN, iconColor: TAN, icon: cardIcons.trending }, // page copy (title)
      { title: 'Operate: we run the agents, month after month.', body: phase('Operate'), cta: { text: 'Learn more', href: '/operations' }, hoveredColor: SLATE, iconColor: SLATE, icon: cardIcons.join }, // page copy (title)
    ],
  },
  blog: {
    heading: 'From field notes to real results.\nThe latest from Vahue.', // page copy
    posts: [
      blogTile('claude-fable-5-agentic-ai', { chip: false }),
      blogTile('aeo-content-system', { gradient: true, chip: false }),
      blogTile('trumps-ai-order-decoded'),
      blogTile('secure-llm-deployment-enterprise'),
      blogTile('code-data-sources-for-llm-training', { gradient: true }),
      caseTile('exaware-governed-noc-agents', '/img/home/case-exaware.svg'),
      blogTile('human-written-code-llm-training', { gradient: true }),
      caseTile('docplanner-voicebot-recovery', '/img/home/case-docplanner.svg'),
    ],
  },
  prefooter: {
    headline: 'Your workflow, our agents.', // page copy
    description: 'Book a Workflow Audit and see what agents can take off your team.', // page copy
    cta: { text: 'Get started', href: '/contact' },
    color: TAN,
    contrast: 'black',
  },
}

const media: HomeMedia = {
  hero: { draw: drawHeroFrame, width: 1280, height: 720 },
  quote: <QuoteArt />,
  prefooter: <PrefooterArt />,
}

export default function VahueHomePage() {
  return (
    <div className="-mt-[89px] bg-white font-display text-[#0a0a0a]" data-page-theme="careers">
      <SmoothScroll />
      <HomePage content={content} media={media} />
    </div>
  )
}
