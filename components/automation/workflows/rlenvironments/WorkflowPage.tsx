import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import StepCards from './StepCards'
import Guardrails from './Guardrails'
import { BeforeAfter, CaseOverview } from './StaticSections'

// Verified Vahue cases closest to each workflow (first one shows first). Workflows without an entry
// fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'engineering-enablement': ['piogroup-employee-assistant', 'retail-nlp-delivery', 'in-house-marketing-mix-modeling'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c))
  return (picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')).slice(0, 3)
}

const CTA = { href: '/contact/', label: 'Book a workflow audit' }

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/**
 * Workflow page on the scale.com/rlenvironments layout:
 * hero -> how it works (feature cards) -> results (overview cards) -> before and after (capabilities row)
 * -> guardrails (offered-as pillars) -> prefooter. Nothing dropped; the template's second capabilities row
 * is not used (one before/after pair), and every Scale video/screenshot slot is the dark dot-texture panel.
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const stepsTitle = `${workflow.steps.map((s, i) => (i === 0 ? s.title : lowerFirst(s.title))).join(', ')}.`

  return (
    <div className="overflow-x-clip font-display tracking-[-0.01em] text-white">
      <SmoothScroll />

      {/* 1. Full-bleed hero (ClipScrollSection, startPercentage 0) */}
      <FullBleedMedia
        as="h1"
        headline={workflow.headline}
        body={workflow.summary}
        cta={CTA}
        startPercentage={0}
        wrapperClassName="pb-10 pt-4"
      />

      {/* 2. Features card grid -> how it works */}
      <StepCards
        eyebrow="How it works"
        title={stepsTitle}
        lead="Each step runs inside the systems you already use, and every action is logged."
        steps={workflow.steps}
      />

      {/* 3. Overview cards -> verified results */}
      {cases.length ? (
        <CaseOverview
          eyebrow="Results"
          title="Measured in production"
          lead="Outcomes from Vahue deployments, each with its disclosure and full write-up."
          cases={cases}
        />
      ) : null}

      {/* 4. Capabilities side-by-side row -> before and after */}
      <BeforeAfter eyebrow="Before and after" title={workflow.label} lead={workflow.forWho} before={workflow.before} after={workflow.after} />

      {/* 5. Offered-as pillars -> guardrails */}
      <Guardrails
        eyebrow="Guardrails"
        title={
          <>
            Agents propose.
            <br />
            Your team stays in control.
          </>
        }
        body="Every deployment ships with the same controls, plus the ones specific to this workflow."
        features={CONTROL_FEATURES}
        guardrails={workflow.guardrails}
        tools={workflow.tools}
      />

      {/* 6. Prefooter full-bleed CTA (ClipScrollSection, startPercentage 10) */}
      <FullBleedMedia headline="Start with one workflow." cta={CTA} startPercentage={10} wrapperClassName="pb-8 pt-16" />
    </div>
  )
}
