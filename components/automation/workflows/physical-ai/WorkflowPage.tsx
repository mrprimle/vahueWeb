import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import CaseResults from './CaseResults'
import { BeforeAfter, ControlFeatures, Section, SectionHeader, Steps } from './Sections'

// Verified Vahue cases closest to each workflow (first one shows first). Workflows without an entry
// fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'document-intake': ['amerit-repair-order-ai', 'rfi-response-automation', 'consumer-email-classifier'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c))
  return picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')
}

// Hero and prefooter use the flat dark surface with the dot texture (no Scale imagery on Vahue pages).
const CTA = { href: '/contact/', text: 'Book a workflow audit' }
const PROOF = { href: '/case-studies/', text: 'See verified results' }

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

/**
 * Workflow page on the scale.com/physical-ai layout:
 * hero (+ integrations strip) -> how it works -> results -> before and after -> guardrails -> prefooter.
 * Dropped from the template: the two image-card rows (robot hardware / capture sites) and the annotations +
 * model-chart rows (no matching imagery, and the chart would need numbers we can't verify).
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const stepsTitle = `${workflow.steps.map((s, i) => (i === 0 ? s.title : lowerFirst(s.title))).join(', ')}.`

  return (
    <div className="overflow-x-hidden font-display tracking-[-0.01em] text-white">
      <SmoothScroll />

      {/* 1. Full-bleed hero (ClipScrollSection, startPercentage 0); logo strip -> integrations */}
      <FullBleedMedia
        as="h1"
        headline={workflow.headline}
        body={workflow.summary}
        primary={CTA}
        strip={{ label: 'Integrations', items: workflow.tools }}
        startPercentage={0}
        wrapperClassName="pb-10 pt-4"
      />

      {/* 2. Product overview -> how it works */}
      <Section>
        <SectionHeader eyebrow="How it works" title={stepsTitle} subtitle="Each step runs inside the systems you already use, and every action is logged." />
        <Steps steps={workflow.steps} />
      </Section>

      {/* 3. Client testimonials -> verified results */}
      {cases.length ? (
        <CaseResults
          heading="Results from Vahue deployments"
          items={cases.map((c) => ({
            name: c.client,
            note: c.disclosure.toLowerCase(),
            title: c.metric,
            quote: c.summary,
            href: `/case-studies/${c.slug}/`,
          }))}
        />
      ) : null}

      {/* 4. Use case -> before and after */}
      <Section>
        <SectionHeader eyebrow="Before and after" title={workflow.label} subtitle={workflow.forWho} />
        <BeforeAfter before={workflow.before} after={workflow.after} />
      </Section>

      {/* 5. The difference -> guardrails */}
      <Section>
        <SectionHeader
          eyebrow="Guardrails"
          title={
            <>
              Agents propose.
              <br />
              Your team stays in control.
            </>
          }
          subtitle={
            workflow.guardrails.length
              ? `On this workflow: ${workflow.guardrails.map((g, i) => (i === 0 ? g : lowerFirst(g))).join('; ')}.`
              : undefined
          }
        />
        <ControlFeatures features={CONTROL_FEATURES} />
      </Section>

      {/* 6. Prefooter full-bleed CTA (ClipScrollSection, startPercentage 10) */}
      <FullBleedMedia
        headline="Start with one workflow."
        primary={CTA}
        secondary={PROOF}
        startPercentage={10}
        wrapperClassName="pb-8 pt-16"
      />
    </div>
  )
}
