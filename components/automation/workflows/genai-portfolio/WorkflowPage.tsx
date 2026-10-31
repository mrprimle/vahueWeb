import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { CONTROL_FEATURES, PHASES, POSITIONING, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import Hero from './Hero'
import Intro from './Intro'
import Flywheel from './Flywheel'
import { Stack, TwoColumn } from './Sections'
import { Demo, Faqs, Integrations, Results } from './Lower'
import s from './styles.module.css'

// Verified Vahue cases closest to each workflow (first one shows first). Workflows without an entry
// fall back to the Enterprise AI cases.
const RELATED_CASES: Record<string, string[]> = {
  'knowledge-agents': ['piogroup-employee-assistant', 'rfi-response-automation', 'exaware-governed-noc-agents'],
}

function casesFor(slug: string): CaseStudy[] {
  const picked = (RELATED_CASES[slug] ?? [])
    .map((c) => caseStudies.find((x) => x.slug === c))
    .filter((c): c is CaseStudy => Boolean(c))
  return picked.length ? picked : caseStudies.filter((c) => c.service === 'Enterprise AI')
}

const CTA = { href: '/contact/', label: 'Book a workflow audit' }
const PROOF = { href: '/case-studies/', label: 'See verified results' }

const lowerFirst = (v: string) => v.charAt(0).toLowerCase() + v.slice(1)
const sentence = (list: string[]) => `${list.map((g, i) => (i === 0 ? g : lowerFirst(g))).join('; ')}.`

/**
 * Workflow page on the scale.com/genai-portfolio layout. Scale's scene videos are replaced by Vahue's own SVG
 * drawings on the template's pin / scrub parameters (Orbit in the hero, IntroScene in the pinned intro, Converge in
 * the stack, the ring in the flywheel); every other media slot is a dot-texture panel.
 * hero -> how it works (pinned stepped scene, one stage per step) -> positioning (two-column) -> before and after
 * (stack) -> guardrails (flywheel over the shared control layer) -> integrations -> results (verified cases)
 * -> how we start (skewed card stack, one card per phase) -> FAQ.
 * Dropped from the template: the second two-column video, differentiators, blog cards.
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const cases = casesFor(workflow.slug)
  const stepsTitle = `${workflow.steps.map((st, i) => (i === 0 ? st.title : lowerFirst(st.title))).join(', ')}.`
  const deploy = CONTROL_FEATURES.find((f) => f.title === 'Your cloud or ours')

  return (
    <div className={`${s.page} overflow-x-clip bg-bg font-display text-white`}>
      <SmoothScroll />

      <Hero headline={workflow.headline} body={workflow.summary} tools={workflow.tools} cta={CTA} />

      <Intro
        heading={stepsTitle}
        body="Each step runs inside the systems you already use, and every action is logged."
        steps={workflow.steps}
        sources={workflow.tools}
      />

      <TwoColumn
        headingSpacer
        left={<h2 className={`${s.header4} !leading-9`}>{POSITIONING.line}</h2>}
        right={<p className="leading-6 text-white/70">{POSITIONING.promise}</p>}
        cta={CTA}
        ctaColumn="right"
      />

      <Stack eyebrow="Before and after" title={workflow.label} subtitle={workflow.forWho} after={workflow.after} before={workflow.before} />

      <Flywheel
        heading="Agents propose. Your team stays in control."
        body={workflow.guardrails.length ? `On this workflow: ${sentence(workflow.guardrails)}` : POSITIONING.promise}
        labels={['Guardrails', 'Control layer']}
        steps={CONTROL_FEATURES}
      />

      <Integrations
        eyebrow="Integrations"
        title="Works inside the tools your team already uses."
        link={{ href: '/automations/', label: 'See all workflows' }}
        badges={workflow.tools}
        panel={{
          eyebrow: 'Deployment',
          title: deploy?.title ?? 'Your cloud or ours',
          body: deploy?.body ?? '',
        }}
      />

      <Results
        label={'Results from\nVahue deployments'}
        items={cases.map((c) => ({
          quote: c.summary,
          name: c.client,
          note: c.disclosure,
          metric: c.metric,
          href: `/case-studies/${c.slug}/`,
        }))}
      />

      <Demo
        eyebrow="How we start"
        title="Start with one workflow."
        body={POSITIONING.forWho}
        cta={CTA}
        cards={PHASES.map((p) => ({ eyebrow: p.length, title: p.name, body: p.body }))}
      />

      <Faqs
        title="Questions, answered"
        cta={PROOF}
        items={[
          {
            q: 'Who can see what?',
            a: <p>Answers respect each user’s access rights. The agent sees only what the person asking can see.</p>,
          },
          {
            q: 'Where do the numbers come from?',
            a: <p>Every answer cites its sources, and no figure appears without a traceable, logged query.</p>,
          },
          { q: 'Can it run in our own cloud?', a: <p>{deploy?.body}</p> },
          { q: 'How do we start?', a: <p>{PHASES[0].body}</p> },
        ]}
      />
    </div>
  )
}
