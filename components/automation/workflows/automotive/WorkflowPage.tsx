import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, PHASES, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import BeforeAfterTabs from './BeforeAfterTabs'
import Phases from './Phases'
import CaseSlider from './CaseSlider'
import { CONTAINER, FeaturedCase, Guardrails, SectionHeader, StepsOverview, ToolStrip } from './Sections'

// Verified Vahue cases closest to each workflow (first one is shown in detail, the rest in the slider).
// Workflows without an entry fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'scoring-decisions': ['amerit-repair-order-ai', 'consumer-email-classifier', 'rfi-response-automation', 'exaware-governed-noc-agents'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c))
  return picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')
}

const CTA = { href: '/contact/', label: 'Book a workflow audit' }
const PROOF = { href: '/case-studies/', label: 'See verified results' }

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
const listTitle = (names: string[]) => `${names.map((n, i) => (i === 0 ? n : lowerFirst(n))).join(', ')}.`

/**
 * Workflow page on the scale.com/automotive layout:
 * hero -> integrations strip -> how it works (checklist + loop diagram) -> before and after (tabbed block)
 * -> how we start (phases grid) -> guardrails -> results slider -> one case in detail -> prefooter.
 * All template sections are kept; their media slots are dark Vahue panels (no Scale imagery or video).
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const [featured, ...more] = cases
  const pilot = PHASES.find((p) => p.name === 'Pilot') ?? PHASES[1]

  return (
    <div className="overflow-x-hidden font-display tracking-[-0.01em] text-white">
      <SmoothScroll />

      {/* 1. Full-bleed hero (ClipScrollSection, startPercentage 0) */}
      <FullBleedMedia
        as="h1"
        headline={workflow.headline}
        body={workflow.summary}
        primary={CTA}
        startPercentage={0}
        wrapperClassName="pb-10 pt-4"
      />

      {/* 2. Logo cloud -> integrations */}
      <ToolStrip tools={workflow.tools} />

      {/* 3. Overview (checklist + diagram) -> how it works */}
      <StepsOverview
        steps={workflow.steps}
        title={listTitle(workflow.steps.map((s) => s.title))}
        sub="Each step runs inside the systems you already use, and every action is logged."
      />

      {/* 4. Supported Data (tabbed) -> before and after */}
      <section className={`${CONTAINER} py-16`}>
        <SectionHeader over="Before and after" title={workflow.label} />
        <BeforeAfterTabs heading="What changes" sub={workflow.forWho} before={workflow.before} after={workflow.after} note={pilot?.body ?? ''} cta={CTA} />
      </section>

      {/* 5. Phases (numbered features) -> how we start */}
      <Phases phases={PHASES} title={listTitle(PHASES.map((p) => p.name))} sub="One workflow at a time, measured against its own baseline." />

      {/* 6. Why us (features with icons) -> guardrails */}
      <Guardrails guardrails={workflow.guardrails} features={CONTROL_FEATURES} />

      {/* 7. Resources slider -> verified results */}
      {more.length ? <CaseSlider cases={more} /> : null}

      {/* 8. Foundation model split -> one case in detail */}
      {featured ? <FeaturedCase caseStudy={featured} /> : null}

      {/* 9. Pre-footer full-bleed CTA (ClipScrollSection, startPercentage 10) */}
      <FullBleedMedia headline="Start with one workflow." primary={CTA} secondary={PROOF} startPercentage={10} wrapperClassName="mt-16 pb-8" />
    </div>
  )
}
