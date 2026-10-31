import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, PHASES, POSITIONING, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import ToolStrip from './ToolStrip'
import CaseHighlight from './CaseHighlight'
import CaseSlider from './CaseSlider'
import { BeforeAfter, Guardrails, OverviewSplit, SectionHeader, Slice, Steps } from './Sections'

// Verified Vahue cases closest to each workflow (first one is featured). Workflows without an entry
// fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'back-office-sync': ['rfi-response-automation', 'amerit-repair-order-ai', 'piogroup-employee-assistant', 'exaware-governed-noc-agents'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c))
  return picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')
}

const CTA = { href: '/contact/', label: 'Book a workflow audit' }

/**
 * Workflow page on the scale.com/generative-ai-data-engine layout:
 * hero -> integrations strip -> before/after -> featured result -> how we start -> how it works
 * -> guardrails -> results slider -> prefooter. The template's demo carousel is dropped (no demos).
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const [featured] = cases
  const audit = PHASES[0]

  return (
    <div className="overflow-x-hidden font-display tracking-[-0.01em]">
      <SmoothScroll />
      <FullBleedMedia
        as="h1"
        headline={workflow.headline}
        body={workflow.summary}
        cta={CTA}
        startPercentage={0}
        wrapperClassName="pb-10 pt-4"
      />
      <ToolStrip tools={workflow.tools} />
      <Slice>
        <SectionHeader eyebrow="Before and after" title={workflow.label} lead={workflow.forWho} />
      </Slice>
      <BeforeAfter before={workflow.before} after={workflow.after} />
      {featured ? <CaseHighlight caseStudy={featured} /> : null}
      <OverviewSplit statement={POSITIONING.promise} phases={PHASES} />
      <Steps steps={workflow.steps} lead="Each step runs inside the systems you already use, and every action is logged." />
      <Guardrails guardrails={workflow.guardrails} features={CONTROL_FEATURES} />
      {cases.length > 1 ? (
        <Slice>
          <SectionHeader
            eyebrow="Results"
            title="Measured in production"
            lead="Outcomes from Vahue deployments, each with its disclosure and full write-up."
          />
          <CaseSlider cases={cases} />
        </Slice>
      ) : null}
      <FullBleedMedia
        headline="Start with one workflow."
        body={audit?.body}
        cta={CTA}
        startPercentage={10}
        wrapperClassName="pb-8 pt-16"
      />
    </div>
  )
}
