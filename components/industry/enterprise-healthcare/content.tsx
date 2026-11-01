import type { HealthcareContent } from '@/components/templates/enterprise-healthcare/content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import { dots } from '@/components/enterprise-vahue/art'
import ControlIllustration from './ControlIllustration'
import { FindingsMockup, IntakeMockup, SummaryMockup } from './Mockups'

/*
 * /industries/healthcare-life-sciences content for the scale.com/enterprise/healthcare layout (the clone's
 * HealthcarePage, components/templates/enterprise-healthcare), in strict parity with Scale's page: the same
 * slots and counts (8 marquee slots, 3 tabs, 1 metrics testimonial, 3 stack cards, 3 blog tiles, 8 badge cells)
 * and Scale's colours (tab indicators, testimonial theme, media fills). Each line is about the length and casing of
 * Scale's line in that slot (Scale's text: reference-snapshots / the clone's scaleHealthcareContent).
 * Sources: INDUSTRY_WORKFLOWS['healthcare-life-sciences'], PHASES, CONTROL_FEATURES (lib/automation-content.ts) and
 * lib/case-studies.ts. Lines written for this page are marked "page copy". No Scale imagery: media slots are
 * Scale's fill colours under the dot texture, own SVG/HTML mock UIs, and text tiles for logos and badges.
 */

const kase = (slug: string) => caseStudies.find((k) => k.slug === slug) as CaseStudy
const NAMED = caseStudies.filter((k) => k.disclosure === 'Named client').map((k) => k.client)
const CTA = { label: 'Book a workflow audit', href: '/contact/' }
const docplanner = kase('docplanner-voicebot-recovery')
const roadmap = kase('clinical-ai-product-roadmap')

export const healthcareContent: HealthcareContent = {
  hero: {
    as: 'h1',
    headline: 'Reliable AI for Healthcare’s Busiest Document Work', // page copy
    // page copy (from POSITIONING and the review-queue control)
    body: 'Vahue runs agents that clinical and research teams can trust, inside your workflows, reviewed by your people and measured against a baseline from day one.',
    imageBg: dots('#537B95', 0.16, 8),
    // Scale's 8 marquee slots, with the named clients from lib/case-studies.ts as text (5 names, repeated).
    logos: {
      label: 'Trusted By',
      names: NAMED,
      slots: [
        { w: 70, h: 16 },
        { w: 47, h: 28 },
        { w: 48, h: 28 },
        { w: 70, h: 21 },
        { w: 70, h: 13 },
        { w: 26, h: 28 },
        { w: 70, h: 19 },
        { w: 57, h: 28 },
      ],
    },
  },
  tabs: {
    heading: 'AI Agents for Every Clinical Document', // page copy
    // INDUSTRY_WORKFLOWS['healthcare-life-sciences'] (labels shortened to Scale's 2-4 words); Scale's indicator colours.
    items: [
      {
        label: 'Document Summaries',
        color: '#273252',
        title: 'Draft cited summaries of study documents', // page copy
        body: 'Agents read protocols, amendments and study reports, and draft summaries your team checks against the cited page instead of the whole file.', // page copy
        cta: CTA,
        mockup: <SummaryMockup />,
      },
      {
        label: 'Clinical Documentation',
        color: '#839CB2',
        title: 'Turn referrals and lab reports into clean records', // page copy
        body: 'Incoming documents are read, checked against your rules and posted to the right system, with unsure fields sent to a person.', // page copy (from WORKFLOWS document-intake)
        cta: CTA,
        mockup: <IntakeMockup />,
      },
      {
        label: 'Audit Finding Classification',
        color: '#A8927C',
        title: 'Classify audit findings and route each to its owner', // page copy
        body: 'Each finding gets a category, a severity and a reason learned from your quality team’s past decisions, and borderline cases go to a reviewer.', // page copy (from WORKFLOWS scoring-decisions)
        cta: CTA,
        mockup: <FindingsMockup />,
      },
    ],
  },
  // Scale: one client quote with a metric. No client quotes are on record, so the slot holds the Docplanner case's
  // own stated summary and outcome (no quotation marks), attributed to the client as the case names it.
  testimonial: {
    color: '#839CB2',
    contrast: '#010101',
    // The case's summary plus its stated outcomes (lib/case-studies.ts), restated as one paragraph.
    quote: `${docplanner.summary} Faster responses with lower token usage and improved production monitoring came out of the same piece of work.`,
    metricValue: '2×',
    metricLabel: 'booking conversion, from about 10% to 20%',
    name: docplanner.client,
    title: 'Scheduling voicebot, Docplanner',
    logo: <span className="font-display text-[13px] font-medium leading-none tracking-[-0.01em] md:text-[18px]">{docplanner.client}</span>,
  },
  stack: {
    heading: 'Built on Vahue’s control layer for healthcare', // page copy
    media: <ControlIllustration />,
    cards: [
      {
        title: 'Audit, pilot, then we run it', // page copy (PHASES)
        body: 'We map one workflow and record its baseline, pilot it on your own data, then run the agents day to day with a monthly report.', // from PHASES
      },
      {
        title: 'People review what agents propose', // page copy
        body: 'Anything below the confidence threshold goes to a person, and actions that move patients, money or data wait for approval.', // from CONTROL_FEATURES
      },
      {
        title: 'Deploy anywhere, on your terms', // page copy
        body: 'Agents run in your VPC or on-premises when data cannot leave, see only what their role can see, and log every action.', // from CONTROL_FEATURES
      },
    ],
  },
  blog: {
    heading: 'Learn From Our Work', // page copy
    category: 'Healthcare',
    tiles: [
      { title: 'A Six-Week Roadmap for Clinical AI', fill: dots('#273252', 0.14, 12), href: `/case-studies/${roadmap.slug}/` },
      { title: 'Voicebot Recovery That Doubled Booking Conversion', fill: dots('#1D4133', 0.14, 12), href: `/case-studies/${docplanner.slug}/` },
      { title: 'Clinical Documents Into Clean Records, Run by Agents', fill: dots('#1B3A2A', 0.14, 12), href: '/automations/document-intake/' },
    ],
  },
  trust: {
    headline: 'Built for healthcare data and privacy', // page copy
    body: 'ISO 27001 certified and working to GDPR, with every agent action logged.', // page copy (claims as on /security)
    // 8 cells as on Scale, as text tiles (no third-party marks as images): certifications and controls.
    badges: [
      { alt: 'ISO 27001 certified', label: 'ISO 27001' },
      { alt: 'Works to GDPR', label: 'GDPR' },
      { alt: 'Review queues', label: 'Review queue' },
      { alt: 'Approvals and dry runs', label: 'Approvals' },
      { alt: 'Role-based access', label: 'Role access' },
      { alt: 'Audit log', label: 'Audit log' },
      { alt: 'Deploy in your VPC', label: 'Your VPC' },
      { alt: 'Deploy on-premises', label: 'On-prem' },
    ],
  },
  prefooter: {
    headline: 'One healthcare workflow, measured from day one', // page copy (from POSITIONING.line)
    imageBg: dots('#6A7C96', 0.16, 8),
    primary: CTA,
  },
}
