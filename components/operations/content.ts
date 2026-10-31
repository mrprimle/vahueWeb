import type { EnterpriseContent, StatIcon } from '@/components/scale-clone/enterprise/content'
import { CONTROL_FEATURES, INTEGRATIONS, PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import { caseStudies } from '@/lib/case-studies'
import { WORKFLOW_PAGES } from '@/components/automation/workflows/registry'

// /operations ("How we operate") on the scale.com/enterprise layout. Facts come from lib/automation-content.ts
// (positioning, phases, control features, integrations, workflows) and lib/case-studies.ts (results only).
// Headings and short lines written for this page are marked "page copy" for copy review.

const CTA = { text: 'Book a workflow audit', href: '/contact/' }
const RESULTS = { text: 'See verified results', href: '/case-studies/' }

const phase = (name: string) => PHASES.find((p) => p.name === name) ?? PHASES[0]
const feature = (title: string) => CONTROL_FEATURES.find((f) => f.title === title) ?? CONTROL_FEATURES[0]
const operate = phase('Operate')

// Dot texture (the site's hero-texture pattern) over a flat tone: used for node and card fills.
export const dots = (tone: string, alpha = 0.14, size = 6) =>
  `radial-gradient(circle at 1px 1px, rgba(255,255,255,${alpha}) 1px, transparent 0) 0 0 / ${size}px ${size}px, ${tone}`

// Line art per workflow for the carousel cards (own SVG, white strokes).
const svg = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke='white' stroke-opacity='0.42' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`,
  )}")`
const ART: Record<string, string> = {
  'back-office-sync': svg(
    "<rect x='34' y='52' width='56' height='40' rx='6'/><rect x='110' y='108' width='56' height='40' rx='6'/><path d='M90 72h28a10 10 0 0 1 10 10v20'/><path d='m122 98 6 6 6-6'/><path d='M110 128H82a10 10 0 0 1-10-10V98'/><path d='m78 102-6-6-6 6'/>",
  ),
  'document-intake': svg(
    "<path d='M62 36h52l24 24v104H62z'/><path d='M114 36v24h24'/><path d='M78 84h44M78 100h44M78 116h28'/><circle cx='138' cy='146' r='16'/><path d='m131 146 5 5 9-10'/>",
  ),
  'knowledge-agents': svg(
    "<circle cx='92' cy='92' r='38'/><path d='m120 120 30 30'/><path d='M76 84h32M76 100h22'/>",
  ),
  'support-agents': svg(
    "<path d='M40 56h80a10 10 0 0 1 10 10v36a10 10 0 0 1-10 10H72l-18 14v-14H40a10 10 0 0 1-10-10V66a10 10 0 0 1 10-10z'/><path d='M150 96h10a10 10 0 0 1 10 10v30a10 10 0 0 1-10 10h-6v12l-14-12h-30a10 10 0 0 1-10-10v-8'/>",
  ),
  'scoring-decisions': svg(
    "<path d='M40 150h120'/><rect x='52' y='110' width='18' height='40' rx='3'/><rect x='82' y='84' width='18' height='66' rx='3'/><rect x='112' y='60' width='18' height='90' rx='3'/><path d='M44 70 70 52l26 14 40-30'/>",
  ),
  'engineering-enablement': svg("<path d='m72 70-30 30 30 30M128 70l30 30-30 30M110 56 90 144'/>"),
}

// Small line icons for the control cards (own SVG as data URIs; the clone renders them with <img>).
const icon = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='0.5' y='0.5' width='63' height='63' rx='12' fill='white' fill-opacity='0.06' stroke='white' stroke-opacity='0.14' stroke-width='1'/>${body}</svg>`,
  )}`
const ICONS = {
  review: icon("<path d='M20 24h24M20 32h24M20 40h14'/><path d='m38 42 4 4 8-9'/>"),
  lock: icon("<rect x='21' y='29' width='22' height='16' rx='3'/><path d='M26 29v-4a6 6 0 0 1 12 0v4'/>"),
  log: icon("<path d='M22 22h20v20H22z'/><path d='M27 28h10M27 32h10M27 36h6'/>"),
  cloud: icon("<path d='M24 42h18a7 7 0 0 0 0-14 10 10 0 0 0-19 3 6 6 0 0 0 1 11z'/>"),
}

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
const NODE_TONES = ['#141414', '#171717', '#121212', '#191919', '#151515', '#131313', '#181818']

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
