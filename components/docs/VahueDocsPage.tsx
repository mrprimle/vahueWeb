import { CONTROL_FEATURES, INTEGRATIONS, PHASES, POSITIONING, WORKFLOWS } from '@/lib/automation-content'
import DocsPage from '@/components/templates/docs/DocsPage'
import type { DocsContent, DocsSection, NavEntry, SearchRecord } from '@/components/templates/docs/content'

/*
 * Vahue /docs on the scale.com/docs layout (components/templates/docs, spec reference-snapshots/scale-clone/docs.md).
 * Same chrome and interactions (search with arrows/Enter/Alt+Enter, assistant sheet and drawer, theme menu, mobile drawer,
 * sticky TOC with scroll-spy, floating ask bar). Scale's landing is a heading plus two cards; the doc sections below the
 * cards are the page's own content, so the page is longer than Scale's.
 * Only real targets: the sidebar and search point at anchors on this page or at live Vahue routes. The assistant has no
 * backend, so every question gets the one fixed line.
 * Security copy comes from /security (components/security-page/Sections.tsx). Copy written here is marked `// page copy`.
 */

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const DOCS = '/docs'
const p = (title: string, href: string): NavEntry => ({ kind: 'page', title, href })

const phaseSections: DocsSection[] = PHASES.map((ph) => ({
  id: anchor(ph.name),
  level: 3,
  title: ph.name,
  body: [ph.body, `Length: ${ph.length === 'Monthly' ? 'monthly, for as long as the agents run' : ph.length}.`], // second line: page copy
}))

const controlSections: DocsSection[] = CONTROL_FEATURES.map((f) => ({ id: anchor(f.title), level: 3, title: f.title, body: [f.body] }))

// INTEGRATIONS grouped for reading (page copy: the group labels). Every name in the list appears exactly once.
const GROUPS: { label: string; names: string[] }[] = [
  { label: 'Chat and email', names: ['Slack', 'Microsoft Teams', 'Gmail', 'Outlook'] },
  { label: 'CRM and support', names: ['HubSpot', 'Salesforce', 'Zendesk', 'Twilio'] },
  { label: 'Finance and ERP', names: ['NetSuite', 'QuickBooks', 'SAP'] },
  { label: 'Documents and data', names: ['SharePoint', 'Snowflake', 'Power BI'] },
]

const sections: DocsSection[] = [
  {
    id: 'what-an-engagement-needs',
    level: 2,
    title: 'What an engagement needs',
    body: ['Every engagement runs the same way: Audit, Pilot, Operate. The Audit sets the target and the point at which we stop.'], // page copy
    items: [
      // page copy, from PHASES
      { label: 'One workflow', text: 'A single high-volume workflow to map end to end, not a list of ideas.' },
      { label: 'Baseline data', text: 'Volume, minutes per item, error rate and cost, so the target can be measured.' },
      { label: 'Access', text: 'Your own data and the tools the workflow already runs in.' },
      { label: 'A reviewer', text: 'A person on your team who checks every output until accuracy holds.' },
    ],
  },
  ...phaseSections,
  {
    id: 'integrations',
    level: 2,
    title: 'Integrations',
    body: ['Agents work inside the tools your team already uses, including these.'], // page copy
    items: GROUPS.map((g) => ({ label: g.label, text: g.names.join(', ') })),
    link: { label: 'See the workflows these tools support', href: '/automations/' }, // page copy
  },
  {
    id: 'control-layer',
    level: 2,
    title: 'Control layer',
    body: ['Six controls keep your people in charge of what an agent does.'], // page copy
  },
  ...controlSections,
  {
    id: 'security',
    level: 2,
    title: 'Security',
    // from /security
    body: ['Controls over people, access and client data are part of how every engagement runs, from the audit through the pilot to the agents we operate every day.'],
    items: [
      { label: 'ISO 27001', text: 'Vahue is ISO 27001 certified.' },
      { label: 'GDPR', text: 'Personal data is used only for the workflow it was shared for, redacted before it reaches a model where possible, and kept only in the regions you approve.' },
      { label: 'Deployment', text: 'Agents run in your VPC or on-premises when data cannot leave, or in our cloud when it can.' },
      { label: 'Your code', text: 'Engineers sign NDAs and IP assignment agreements before they see your systems, and code stays in your own repositories.' },
    ],
    link: { label: 'Read how Vahue handles security', href: '/security/' }, // page copy
  },
]

const TITLE = 'Getting started with Vahue'
const HEAD_ID = 'getting-started-with-vahue'

const records: SearchRecord[] = [
  { t: TITLE, h: DOCS, b: ['Documentation'], k: 'p' },
  ...sections.map((s): SearchRecord => ({ t: s.title, h: `${DOCS}#${s.id}`, b: [TITLE, s.level === 2 ? s.title : sections.slice(0, sections.indexOf(s)).reverse().find((x) => x.level === 2)!.title], k: 's' })),
  ...INTEGRATIONS.map((name): SearchRecord => ({ t: name, h: `${DOCS}#integrations`, b: [TITLE, 'Integrations'], k: 's' })),
  ...WORKFLOWS.map((w): SearchRecord => ({ t: w.label, h: `/automations/${w.slug}/`, b: ['Automations'], k: 'p' })),
  { t: 'Security', h: '/security/', b: ['Vahue'], k: 'p' },
  { t: 'Case studies', h: '/case-studies/', b: ['Vahue'], k: 'p' },
  { t: 'Guides', h: '/guides/', b: ['Vahue'], k: 'p' },
  { t: 'Contact', h: '/contact/', b: ['Vahue'], k: 'p' },
]

export const vahueDocsContent: DocsContent = {
  siteName: 'Vahue Documentation',
  // Unused while `wordmark` is set; the template's type keeps the image slot.
  logo: { light: '/img/white-circle.svg', dark: '/img/white-circle.svg', alt: 'Vahue logo' },
  wordmark: 'vahue.ai',
  homeHref: '/',
  fontFamily: "var(--font-aeonik), var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  linkBase: '',
  // The site uses trailing slashes; anchors must stay on /docs/ so they scroll instead of redirecting.
  localPrefix: { from: DOCS, to: '/docs/' },
  tabs: [
    { label: 'Documentation', href: DOCS, active: true },
    { label: 'Automations', href: '/automations/' },
  ],
  activeHref: DOCS,
  mobileTitle: TITLE,
  sidebar: [
    { pages: [p(TITLE, DOCS)] },
    {
      title: 'Engagement',
      pages: [p('What an engagement needs', `${DOCS}#what-an-engagement-needs`), ...PHASES.map((ph) => p(ph.name, `${DOCS}#${anchor(ph.name)}`))],
    },
    {
      title: 'Platform',
      pages: [
        p('Integrations', `${DOCS}#integrations`),
        { kind: 'group', title: 'Control layer', expanded: true, pages: CONTROL_FEATURES.map((f) => p(f.title, `${DOCS}#${anchor(f.title)}`)) },
        p('Security', `${DOCS}#security`),
      ],
    },
    { title: 'Workflows', pages: WORKFLOWS.map((w) => p(w.label, `/automations/${w.slug}/`)) },
    {
      title: 'Resources',
      pages: [p('Guides', '/guides/'), p('Case studies', '/case-studies/'), p('Research', '/labs/'), p('Contact', '/contact/')],
    },
  ],
  page: {
    title: TITLE,
    description: POSITIONING.promise,
    heading: { id: HEAD_ID, text: TITLE },
    // page copy
    body: 'This guide covers what an engagement asks of your team, the tools we connect to, and the controls and security around every agent. It is written for operations and finance leaders planning a first workflow.',
    cards: [
      { title: 'Documentation', body: 'What an engagement needs, phase by phase.', href: `${DOCS}#what-an-engagement-needs` }, // page copy
      { title: 'Automations', body: 'The six workflows agents run for your team.', href: '/automations/' }, // page copy
    ],
    sections,
  },
  toc: [{ id: HEAD_ID, title: TITLE, depth: 1 }, ...sections.map((s) => ({ id: s.id, title: s.title, depth: s.level }))],
  next: { title: 'Automations', href: '/automations/' },
  search: {
    placeholder: 'Search or ask a question...',
    records,
    limit: 6,
    askLabel: 'Ask Assistant',
    askPrefix: 'Can you tell me about ',
    askSuffix: '?',
  },
  assistant: {
    title: 'Assistant',
    disclaimer: 'Responses are generated using AI and may contain mistakes.',
    placeholder: 'Ask a question...',
    offlineReply: 'The assistant is not available yet. Write to human@vahue.ai and a person will answer.', // page copy
  },
}

export default function VahueDocsPage() {
  return <DocsPage content={vahueDocsContent} />
}
