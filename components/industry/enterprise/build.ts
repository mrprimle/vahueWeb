import type { EnterpriseContent, PullApartItem, StatIcon } from '@/components/scale-clone/enterprise/content'
import type { LogLine, QueueRow } from '@/components/enterprise-vahue/Media'
import { WORKFLOW_ART, dots } from '@/components/enterprise-vahue/art'
import { NODE_TONES } from '@/components/enterprise-vahue/theme'
import { operationsContent } from '@/components/operations/content'
import { CONTROL_FEATURES, INDUSTRY_WORKFLOWS, INTEGRATIONS, PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import { caseStudies } from '@/lib/case-studies'

/*
 * Content for an industry page on the scale.com/enterprise layout, built from one `IndustryConfig`.
 * Sourced: workflow names (INDUSTRY_WORKFLOWS), positioning, phases, control features and integrations
 * (lib/automation-content.ts), results (lib/case-studies.ts, verified cases only). The phases, control and
 * pre-footer sections are the /operations slices, so both pages say the same thing about how we work.
 * Lines marked "page copy" here and in the industry files were written for these pages (copy review).
 */

export type IndustryConfig = {
  /** INDUSTRY_WORKFLOWS key, also the route segment under /industries/. */
  key: string
  hero: { headline: string; body: string; /** exactly 7 system names (hero graph nodes) */ systems: string[] }
  /** Pull-apart: [0] the problem (object whole), [1] the answer (object pulled apart). */
  problem: [PullApartItem, PullApartItem]
  /** Each INDUSTRY_WORKFLOWS name -> closest /automations/<slug>/ page. */
  workflowLinks: Record<string, string>
  /** Verified cases for the results grid (3 fill one row of the 3 + 2 grid). */
  cases: { slug: string; icon: StatIcon }[]
  /** Mock labels for the visuals (no figures). */
  pipeline: { inputs: [string, string, string]; target: string }
  queue: QueueRow[]
  log: LogLine[]
}

const CTA = { text: 'Book a workflow audit', href: '/contact/' }
const RESULTS = { text: 'See verified results', href: '/case-studies/' }

const phase = (name: string) => PHASES.find((p) => p.name === name) ?? PHASES[0]
const feature = (title: string) => CONTROL_FEATURES.find((f) => f.title === title) ?? CONTROL_FEATURES[0]

export function buildIndustryContent(c: IndustryConfig): EnterpriseContent {
  const names = INDUSTRY_WORKFLOWS[c.key]?.workflows ?? []
  return {
    hero: {
      headline: c.hero.headline,
      body: c.hero.body,
      cta: CTA,
      ctaTheme: 'white',
      scroll: 'Scroll to explore',
      nodes: c.hero.systems.slice(0, 7).map((label, i) => ({ label, color: dots(NODE_TONES[i] ?? '#141414') })),
    },
    pullApart: {
      curvesUrl: '/operations/flow-curves.json',
      cardMark: '/img/white-circle.svg',
      items: c.problem,
    },
    bridge: {
      headline: POSITIONING.line,
      body: POSITIONING.promise,
      trustedBy: 'Controls on every workflow', // page copy
      textLogos: true,
      logos: CONTROL_FEATURES.filter((f) => f.title !== 'Results dashboard').map((f) => ({ name: f.title })),
    },
    blog: {
      heading: 'Where we start.', // page copy
      posts: names.flatMap((name) => {
        const w = WORKFLOWS.find((k) => k.slug === c.workflowLinks[name])
        if (!w) return []
        return [
          {
            category: w.label,
            swatch: '#262626',
            title: name,
            href: `/automations/${w.slug}/`,
            background: `${WORKFLOW_ART[w.slug] ?? ''} center 38% / 46% no-repeat, ${dots('#0d0d0d', 0.08, 14)}`,
          },
        ]
      }),
    },
    logoCloud: {
      headline: 'Agents work inside the tools your team already uses.', // page copy (as /operations)
      labels: INTEGRATIONS,
    },
    stats: {
      heading: 'Results from our own client work.', // page copy (as /operations)
      cards: c.cases.flatMap(({ slug, icon }) => {
        const k = caseStudies.find((s) => s.slug === slug)
        return k ? [{ label: k.client, value: k.metric, body: `${k.title}. ${k.disclosure}.`, icon }] : []
      }),
    },
    race: {
      heading: 'Measured from day one.', // from POSITIONING.line
      lead: feature('Results dashboard').body,
      link: RESULTS,
      body: phase('Audit').body,
    },
    pillars: operationsContent.pillars,
    poweredBy: operationsContent.poweredBy,
    trusted: operationsContent.trusted,
    prefooter: operationsContent.prefooter,
  }
}
