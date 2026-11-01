import type { EnterpriseContent, StatsContent, TestimonialsContent } from '@/components/templates/enterprise/content'
import { CONTROL_FEATURES, PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import { WORKFLOW_ART, cardMark, dots, tileIconFor } from '@/components/enterprise-vahue/art'
import { BLOG_SWATCHES, BLOG_TONES, NODE_COLORS, PILLAR_COLORS, POWERED_ICON_COLOR, TRUSTED_FILLS } from '@/components/enterprise-vahue/theme'

/*
 * /operations ("How we operate") on the scale.com/enterprise layout, in strict parity with the clone
 * (components/templates/enterprise/content.ts): every section, the same element roles and counts (7 hero nodes,
 * 4 carousel cards, 10 sphere tiles, 5 stat cards, 3 testimonials, 3 pillars, 2 + 3 cards), and each line about
 * the length of Scale's line in that slot. Facts come from lib/automation-content.ts and lib/case-studies.ts.
 * Lines written for these pages are marked "page copy" (listed for copy review). The slices exported below are
 * shared with the banking / retail / distribution pages (components/industry/enterprise/build.ts).
 */

export const CTA = { text: 'Book a workflow audit', href: '/contact/' }
export const SECURITY = { text: 'Learn more', href: '/security/' }

const phase = (name: string) => PHASES.find((p) => p.name === name) ?? PHASES[0]
const feature = (title: string) => CONTROL_FEATURES.find((f) => f.title === title) ?? CONTROL_FEATURES[0]
const kase = (slug: string) => caseStudies.find((k) => k.slug === slug) as CaseStudy

/** Hero graph: 7 nodes on Scale's node colours with the dot texture standing in for Scale's photos. */
export const heroNodes = (labels: string[]) => labels.slice(0, 7).map((label, i) => ({ label, color: dots(NODE_COLORS[i] ?? NODE_COLORS[0], 0.18) }))

/** Named clients from lib/case-studies.ts (the "Trusted by" slots; anonymised clients are left out). */
const NAMED = caseStudies.filter((k) => k.disclosure === 'Named client').map((k) => k.client)

/** Bridge (Scale: claim + how + "Trusted by" logo marquee). */
export const bridgeSlice: EnterpriseContent['bridge'] = {
  headline: POSITIONING.line,
  // POSITIONING.promise, cut to the length of Scale's line in this slot.
  body: 'We take a high-volume workflow off your team and run it with AI agents inside your tools, so operations keep up without new hires.',
  trustedBy: 'Trusted by',
  textLogos: true,
  logos: NAMED.map((name) => ({ name })),
}

/** Carousel card for a workflow page (Scale: blog post card). */
export const workflowCard = (slug: string, i: number, title?: string) => {
  const w = WORKFLOWS.find((k) => k.slug === slug) ?? WORKFLOWS[0]
  return {
    category: w.label,
    swatch: BLOG_SWATCHES[i] ?? BLOG_SWATCHES[1],
    title: title ?? w.headline,
    href: `/automations/${w.slug}/`,
    background: `${WORKFLOW_ART[w.slug] ?? ''} center 38% / 46% no-repeat, ${dots(BLOG_TONES[i] ?? BLOG_TONES[0], 0.12, 14)}`,
  }
}
/** Carousel card for a case study (Scale's carousel mixes in customer stories). */
export const caseCard = (slug: string, i: number) => {
  const k = kase(slug)
  return {
    category: 'Case study', // page copy
    swatch: BLOG_SWATCHES[i] ?? BLOG_SWATCHES[1],
    title: k.title,
    href: `/case-studies/${k.slug}/`,
    background: `${WORKFLOW_ART['scoring-decisions']} center 38% / 46% no-repeat, ${dots(BLOG_TONES[i] ?? BLOG_TONES[0], 0.12, 14)}`,
  }
}
export const BLOG_HEADING = 'Workflows we take off your team.' // page copy

/** Logo cloud (Scale: "Trusted by …" over a sphere of customer logos, 10 tiles): named clients, twice round. */
export const logoCloudSlice: EnterpriseContent['logoCloud'] = {
  headline: 'Trusted by teams that run AI in production.', // page copy
  labels: [...NAMED, ...NAMED].slice(0, 10),
}

/**
 * Results (Scale: 5 cards, label / value / one-line body). Every value is a stated result of a verified case in
 * lib/case-studies.ts, so none is a placeholder.
 */
export const statsSlice: StatsContent = {
  heading: 'Real clients, measured results.', // page copy
  cards: [
    { label: 'Time saved', value: '27%', body: 'faster resolution of repeatable incidents for Exaware’s NOC.', icon: 'clock' },
    { label: 'Conversion', value: '2×', body: 'booking conversion for Docplanner’s voicebot, from about 10% to 20%.', icon: 'trend' },
    { label: 'Accuracy', value: '>95%', body: 'classification accuracy for a consumer email startup, behind an API.', icon: 'bank' },
    { label: 'Adoption', value: '>30%', body: 'company-wide adoption of PioGroup’s assistant across CRM and ERP data.', icon: 'swap' },
    { label: 'Turnaround', value: 'Hours', body: 'to answer an RFI, down from several days, with over 90% automated.', icon: 'rocket' },
  ],
}

/**
 * Testimonials (Scale: 3 client quotes with name + role chip). No client quotes are on record, so each slot holds a
 * case's own stated summary from lib/case-studies.ts, shown without quotation marks and attributed to the client as
 * the case names it; the chip is the case's service line.
 */
export const testimonialsSlice = (slugs: string[]): TestimonialsContent => ({
  heading: 'What the\nwork has\ndelivered', // page copy
  plain: true,
  textLogos: true,
  mobileQuoteLines: 16,
  items: slugs.map(kase).map((k) => ({ name: k.client, title: k.service, quote: k.summary })),
})

/** The race (Scale: short claim, one-line lead, Learn More, paragraph, video). */
export const raceSlice: EnterpriseContent['race'] = {
  heading: 'Measured from day one.', // from POSITIONING.line
  lead: 'Few agencies publish a baseline. We record one before we start.', // page copy (research: agencies rarely publish a baseline)
  link: { text: 'See results', href: '/case-studies/' },
  body: `${phase('Audit').body} Each month after, we report against it.`, // second sentence: page copy (from PHASES Operate)
}

/** Pillars (Scale: "Three Pillars. / One Unfair Advantage." + 3 items). */
export const pillarsSlice: EnterpriseContent['pillars'] = {
  heading: ['Three Phases.', 'One Workflow at a Time.'], // page copy
  items: PHASES.map((p, i) => ({
    title: `${p.name} · ${p.length}`,
    // Operate cut to two lines like Scale's bodies ("against the baseline" is said in the race section).
    body: p.name === 'Operate' ? 'We run the agents day to day: monitoring, exceptions, accuracy reviews and model updates, plus a monthly report.' : p.body,
    color: PILLAR_COLORS[i] ?? PILLAR_COLORS[0],
    icon: (['search', 'hub', 'people'] as const)[i] ?? 'hub',
  })),
}

/** Powered by (Scale: Title Case platform claim, body, Learn More, 2 cards over the platform image). */
export const poweredBySlice: EnterpriseContent['poweredBy'] = {
  headline: 'Run Behind Review Queues and Approvals', // page copy
  body: 'Agents propose and your team decides. Items below the confidence threshold and actions above your limits wait for a person.', // page copy (from the two control features)
  cta: SECURITY,
  cardIcon: cardMark(POWERED_ICON_COLOR),
  cards: [
    feature('Review queues'),
    // CONTROL_FEATURES body reworded to fold in the dry run (page copy)
    { title: 'Approvals and dry runs', body: 'Agents propose; your team approves any action that moves money, customers or data, after a dry run.' },
  ],
}

/** Built to be trusted (Scale: heading, glass card with overlay + "Trusted by" 3 tiles, 3 cards, CTAs on 1 and 3). */
export const trustedSlice: EnterpriseContent['trusted'] = {
  heading: 'Built to Be Trusted.',
  overlay:
    'ISO 27001 certified and working to GDPR, Vahue runs every agent with role-based access, review queues, approvals, a full audit log and deployment in your cloud.', // page copy (claims as on /security)
  trustedBy: 'Deploys in', // page copy
  textLogos: true,
  logos: [{ name: 'Your VPC' }, { name: 'On-prem' }, { name: 'Our cloud' }], // from "Your cloud or ours"
  cards: [
    { title: 'Role-Based Access', body: `${feature('Role-based access').body} Answers and actions respect each user’s access rights.`, icon: tileIconFor('lock', TRUSTED_FILLS[0]), fill: TRUSTED_FILLS[0], cta: SECURITY },
    { title: 'Audit Log', body: `${feature('Audit log').body} Explanations are stored with each decision.`, icon: tileIconFor('log', TRUSTED_FILLS[1]), fill: TRUSTED_FILLS[1] },
    { title: 'Your Cloud or Ours', body: `${feature('Your cloud or ours').body} Your code stays in your own repositories.`, icon: tileIconFor('cloud', TRUSTED_FILLS[2]), fill: TRUSTED_FILLS[2], cta: SECURITY },
  ],
}

/** Pre-footer (Scale: one ~10-word line and one CTA, no body). */
export const prefooterSlice: EnterpriseContent['prefooter'] = {
  headline: 'One workflow, measured from day one.', // page copy (from POSITIONING.line)
  cta: CTA,
}

export const operationsContent: EnterpriseContent = {
  hero: {
    headline: 'We build the agents, then we run them for you.', // page copy
    body: 'Audit, pilot, operate: one workflow at a time, measured against a baseline we record first.', // page copy
    cta: CTA,
    scroll: 'Scroll to explore',
    // Seven of the systems the agents work in (lib/automation-content.ts INTEGRATIONS).
    nodes: heroNodes(['Slack', 'NetSuite', 'Salesforce', 'SAP', 'Zendesk', 'SharePoint', 'Snowflake']),
  },
  pullApart: {
    curvesUrl: '/operations/flow-curves.json',
    cardMark: '/img/white-circle.svg',
    items: [
      {
        headline: 'Most automation stalls in the months after launch.', // page copy
        subheading: 'Agents need monitoring, exceptions and updates, or the work drifts back to your team.', // page copy
      },
      {
        headline: 'So we stay and run them.', // page copy
        subheading: 'We run the agents day to day, with a monthly report against the baseline.', // from PHASES Operate
      },
    ],
  },
  bridge: bridgeSlice,
  blog: {
    heading: BLOG_HEADING,
    posts: ['back-office-sync', 'document-intake', 'support-agents', 'knowledge-agents'].map((slug, i) => workflowCard(slug, i)),
  },
  logoCloud: logoCloudSlice,
  stats: statsSlice,
  // Cases about running agents in production: governed NOC agents, production ownership, scored repair orders.
  testimonials: testimonialsSlice(['exaware-governed-noc-agents', 'sky-embedded-data-science', 'amerit-repair-order-ai']),
  race: raceSlice,
  pillars: pillarsSlice,
  poweredBy: poweredBySlice,
  trusted: trustedSlice,
  prefooter: prefooterSlice,
}
