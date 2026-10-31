import type { EnterpriseContent, StatIcon } from '@/components/scale-clone/enterprise/content'
import { CONTROL_FEATURES, INTEGRATIONS, PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import { caseStudies } from '@/lib/case-studies'
import { WORKFLOW_PAGES } from '@/components/automation/workflows/registry'
import { CONTROL_ICONS as ICONS, WORKFLOW_ART as ART, dots } from '@/components/enterprise-vahue/art'
import { NODE_TONES } from '@/components/enterprise-vahue/theme'

// /operations ("How we operate") on the scale.com/enterprise layout. Facts come from lib/automation-content.ts
// (positioning, phases, control features, integrations, workflows) and lib/case-studies.ts (results only).
// Headings and short lines written for this page are marked "page copy" for copy review.

const CTA = { text: 'Book a workflow audit', href: '/contact/' }
const RESULTS = { text: 'See verified results', href: '/case-studies/' }

const phase = (name: string) => PHASES.find((p) => p.name === name) ?? PHASES[0]
const feature = (title: string) => CONTROL_FEATURES.find((f) => f.title === title) ?? CONTROL_FEATURES[0]
const operate = phase('Operate')

const workflows = WORKFLOWS.filter((w) => w.slug in WORKFLOW_PAGES)

// Verified Vahue cases with a stated, measured result (lib/case-studies.ts), closest to running operations work.
const RESULT_CASES: { slug: string; icon: StatIcon }[] = [
  { slug: 'exaware-governed-noc-agents', icon: 'clock' },
  { slug: 'rfi-response-automation', icon: 'swap' },
  { slug: 'amerit-repair-order-ai', icon: 'rocket' },
  { slug: 'docplanner-voicebot-recovery', icon: 'trend' },
  { slug: 'piogroup-employee-assistant', icon: 'bank' },
]

// Hero graph nodes: seven of the systems the agents work in.
const HERO_SYSTEMS = ['Slack', 'NetSuite', 'Salesforce', 'SAP', 'Zendesk', 'SharePoint', 'Snowflake']

export const operationsContent: EnterpriseContent = {
  hero: {
    headline: 'We build the agents, then we run them.', // page copy
    body: 'Audit, pilot, then operate: one workflow at a time, measured against a baseline we record before anything changes.', // page copy
    cta: CTA,
    ctaTheme: 'white',
    scroll: 'Scroll to explore',
    nodes: HERO_SYSTEMS.map((label, i) => ({ label, color: dots(NODE_TONES[i] ?? '#141414') })),
  },
  pullApart: {
    curvesUrl: '/operations/flow-curves.json',
    cardMark: '/img/white-circle.svg',
    items: [
      {
        headline: 'Most automation stalls after launch.', // page copy
        subheading: 'Agents need monitoring, exception handling and model updates, or the work drifts back to your team.', // page copy
      },
      { headline: 'So we stay and run it.', subheading: operate.body }, // headline: page copy
    ],
  },
  bridge: {
    headline: POSITIONING.line,
    body: POSITIONING.promise,
    trustedBy: 'Operate covers', // page copy
    textLogos: true,
    logos: ['Monitoring', 'Exceptions', 'Accuracy reviews', 'Model updates', 'Monthly report'].map((name) => ({ name })),
  },
  blog: {
    heading: 'Workflows we take off your team.', // page copy
    posts: workflows.map((w) => ({
      category: w.label,
      swatch: '#262626',
      title: w.headline,
      href: `/automations/${w.slug}/`,
      background: `${ART[w.slug] ?? ''} center 38% / 46% no-repeat, ${dots('#0d0d0d', 0.08, 14)}`,
    })),
  },
  logoCloud: {
    headline: 'Agents work inside the tools your team already uses.', // page copy
    labels: INTEGRATIONS,
  },
  stats: {
    heading: 'Results from our own client work.', // page copy
    cards: RESULT_CASES.flatMap(({ slug, icon }) => {
      const c = caseStudies.find((k) => k.slug === slug)
      return c ? [{ label: c.client, value: c.metric, body: `${c.title}. ${c.disclosure}.`, icon }] : []
    }),
  },
  race: {
    heading: 'Measured every month.', // page copy
    lead: feature('Results dashboard').body,
    link: RESULTS,
    body: phase('Audit').body,
  },
  pillars: {
    heading: ['Audit, Pilot, Operate.', 'One workflow at a time.'], // second line: page copy
    items: PHASES.map((p, i) => ({
      title: `${p.name} · ${p.length}`,
      body: p.body,
      color: ['#1d1d1d', '#262626', '#303030'][i] ?? '#262626',
      icon: (['search', 'hub', 'people'] as const)[i] ?? 'hub',
    })),
  },
  poweredBy: {
    headline: 'People stay in control.', // page copy
    body: 'Agents propose and your team decides. Uncertain items and actions above your limits wait for a person.', // page copy
    cta: { text: 'How we handle security', href: '/security/' }, // page copy
    cardIcon: ICONS.review,
    cards: [feature('Review queues'), feature('Approvals and dry runs')],
  },
  trusted: {
    heading: 'Built to be trusted.', // page copy
    overlay: `${feature('Role-based access').body} ${feature('Audit log').body}`,
    trustedBy: '',
    logos: [],
    cards: [
      { ...feature('Role-based access'), icon: ICONS.lock, fill: 'rgba(255,255,255,0.08)', cta: { text: 'Security', href: '/security/' } },
      { ...feature('Audit log'), icon: ICONS.log, fill: 'rgba(255,255,255,0.08)' },
      { ...feature('Your cloud or ours'), icon: ICONS.cloud, fill: 'rgba(255,255,255,0.08)', cta: { text: 'Talk to us', href: '/contact/' } },
    ],
  },
  prefooter: {
    headline: 'Start with one workflow.', // page copy
    body: phase('Audit').body,
    cta: CTA,
    secondary: RESULTS,
  },
}
