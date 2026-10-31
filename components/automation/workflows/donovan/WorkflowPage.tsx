import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, PHASES, POSITIONING, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import IntegrationStrip from './IntegrationStrip'
import Showcase from './Showcase'
import { FeatureGrid, Foundation, OutcomeCards, Section, SectionHeader, type IconName } from './Sections'

// Verified Vahue cases closest to each workflow (first one shows first). Workflows without an entry
// fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'support-agents': ['docplanner-voicebot-recovery', 'consumer-email-classifier', 'exaware-governed-noc-agents'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c))
  return picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')
}

// Hero and prefooter use the flat dark surface with the dot texture (no Scale imagery on Vahue pages).
const CTA = { href: '/contact/', label: 'Book a workflow audit' }
const PROOF = { href: '/case-studies/', label: 'See verified results' }

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

// Icons for the shared control layer, in CONTROL_FEATURES order.
const CONTROL_ICONS: IconName[] = ['factCheck', 'callSplit', 'person', 'history', 'cloud', 'insights']
const GUARDRAIL_ICONS: IconName[] = ['lock', 'person', 'shield']
const PHASE_ICONS: IconName[] = ['search', 'play', 'trending']

/**
 * Workflow page on the scale.com/donovan layout:
 * hero -> integrations -> before and after (product-UI cards) -> how it works (tabbed showcase, one tab per step)
 * -> guardrails (foundation: this workflow's guardrails on top of the shared control layer) -> results (icon grid)
 * -> how we start (three-up check grid) -> prefooter.
 * Dropped from the template: customer logos (the strip lists the workflow's integrations instead).
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const stepsTitle = `${workflow.steps.map((s, i) => (i === 0 ? s.title : lowerFirst(s.title))).join(', ')}.`

  return (
    <div className="overflow-x-hidden font-display tracking-[-0.01em] text-white">
      <SmoothScroll />

      {/* 1. Full-bleed hero (ClipScrollSection). Vahue's navbar sits in the flow, so pt-24 -> pt-4. */}
      <div className="pb-10 pt-4">
        <FullBleedMedia as="h1" headline={workflow.headline} body={workflow.summary} primary={CTA} priority />
      </div>

      {/* 2. Customer logos -> integrations */}
      <IntegrationStrip tools={workflow.tools} />

      {/* 3. Product overview -> before and after, one product-UI card per outcome */}
      <Section>
        <SectionHeader eyebrow="Before and after" title={workflow.label} subtitle={workflow.forWho} />
        <OutcomeCards before={workflow.before} after={workflow.after} />
      </Section>

      {/* 4. Tabbed showcase -> how it works */}
      <Showcase
        steps={workflow.steps}
        header={
          <SectionHeader
            eyebrow="How it works"
            title={stepsTitle}
            subtitle="Each step runs inside the systems you already use, and every action is logged."
            tightBottom
          />
        }
      />

      {/* 5. Foundation -> guardrails: this workflow's limits on top of the shared control layer */}
      <Foundation
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
        top={workflow.guardrails.map((g, i) => ({ title: g, icon: GUARDRAIL_ICONS[i % GUARDRAIL_ICONS.length] }))}
        bottom={CONTROL_FEATURES.map((f, i) => ({ title: f.title, body: f.body, icon: CONTROL_ICONS[i % CONTROL_ICONS.length] }))}
      />

      {/* 6. Icon feature grid -> verified results */}
      {cases.length ? (
        <FeatureGrid
          eyebrow="Results"
          title="Results from Vahue deployments"
          subtitle="Outcomes from Vahue deployments, each with its disclosure and full write-up."
          sectionClassName="py-12"
          items={cases.map((c) => ({
            icon: 'trending',
            meta: `${c.client} · ${c.disclosure.toLowerCase()}`,
            title: c.metric,
            body: c.summary,
            href: `/case-studies/${c.slug}/`,
            linkLabel: 'Read the case study',
          }))}
        />
      ) : null}

      {/* 7. Trusted & secure grid -> how we start */}
      <FeatureGrid
        eyebrow="How we start"
        title={POSITIONING.line}
        subtitle={POSITIONING.promise}
        items={PHASES.map((p, i) => ({ icon: PHASE_ICONS[i % PHASE_ICONS.length], meta: p.length, title: p.name, body: p.body }))}
      />

      {/* 8. Pre-footer CTA */}
      <div className="pb-8">
        <FullBleedMedia headline="Start with one workflow." primary={CTA} secondary={PROOF} />
      </div>
    </div>
  )
}
