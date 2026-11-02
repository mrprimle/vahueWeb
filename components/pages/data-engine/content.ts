// Copy for /data-engine: the Context and Integrations service, the layer every workflow agent runs on. Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import { fitProofLogo } from '@/components/site/proofLogos'
import type { ProofLogo } from '@/components/site/proofLogos'
import type { DataEngineContent, LogoItem } from './types'

const logo = (key: string, width: number, height: number): LogoItem => ({ key, alt: 'Logo', width, height })
const customer = (key: string, name: ProofLogo, width: number, height: number): LogoItem => ({ key, ...fitProofLogo(name, width, height) })

export const content: DataEngineContent = {
  meta: {
    title: 'Context and Integrations | Connect AI Agents to Your Systems | Vahue',
    description: 'We connect your agents to the CRM, ERP, documents and MCP tools you already use, with permissions, cited sources and an audit log in place.',
  },
  hero: {
    headline: 'Context and Integrations',
    body: 'We connect your CRM, ERP, documents and MCP tools, so agents can find the context and act on it.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: '/data-engine/hero.webp' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
  },
  logos: [
    customer('customer-1', 'qonto', 90, 23), // FROM OLD SITE: confirm
    customer('customer-2', 'verbit', 70, 30), // FROM OLD SITE: confirm
    customer('customer-3', 'winningtemp', 100, 22), // FROM OLD SITE: confirm
    customer('customer-4', 'zwapgrid', 100, 22), // FROM OLD SITE: confirm
    customer('customer-5', 'wisestamp', 100, 23), // FROM OLD SITE: confirm
    customer('customer-6', 'etoro', 78, 24), // FROM OLD SITE: confirm
    customer('customer-7', 'inspera', 60, 30), // FROM OLD SITE: confirm
  ],
  best: {
    title: 'The Best In The Business',
    body: 'Agents are only as good as what they can reach. Vahue connects them to the systems your team already uses.',
    image: { src: '/data-engine/the-business.webp', alt: '', width: 2048, height: 2048 },
    cards: [
      { title: 'Quality', body: 'Every answer and action traces back to its source: the record, the clause, the page.', iconClass: 'text-archive-purple' },
      { title: 'Cost Effective', body: 'Stop building integrations by hand for each new agent. One context layer serves every workflow.', iconClass: 'text-foundry-tan' },
      { title: 'Scalability', body: 'Start with one workflow and two systems. Add the next workflow on the same integrations. Scale up, or down, as needed.', iconClass: 'text-atlas-blue' },
      { title: 'Coverage', body: 'CRM, ERP, inbox, helpdesk, documents, data warehouses and MCP servers. If your team works in it, your agents can too.', iconClass: 'text-evergreen' },
    ],
  },
  caseStudy: {
    overtitle: 'Customer Case Study',
    description: 'A mid-market distributor and Vahue partnered to keep CRM, ERP and finance in step, with every agent on one source.', // PLACEHOLDER
    cta: { text: 'Read customer story', url: '/services/back-office-sync' },
    tileClass: 'bg-evergreen',
    logo: { key: 'case-study', alt: 'Logo', width: 240, height: 75, className: 'text-white' }, // PLACEHOLDER
  },
  buildAi: {
    overtitle: 'Automate a Workflow',
    title: 'Powering Reliable Agents',
    subtitle: 'Every agent runs on the same connected context.',
    showcaseTitle: 'Back-office Sync',
    showcaseSubtitle: 'CRM, ERP and finance in step',
    body: 'Back-office Sync Agents are one of six workflow services built on this layer. They read your systems, ask a person when a case is risky, and update the system of record.',
    primaryCta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Explore Agents', url: '/services/back-office-sync' },
    chat: {
      windowTitle: 'Knowledge Agent',
      question: 'What renewal discount does this customer get?',
      rankingTitle: 'Context Source Ranking',
      ranking: [
        'A 2019 sales deck, last edited by someone who has since left',
        'Clause 4.2 of the signed contract in your CRM',
        'What Dave remembers from a call last spring',
      ],
      answer: 'Clause 4.2 of the signed contract in your CRM: 12% on renewal.',
      userAvatar: '/data-engine/avatar.webp',
      agentAvatar: '/data-engine/llm-1.webp',
    },
  },
  whatIs: {
    overtitle: 'WHAT IS CONTEXT AND INTEGRATIONS',
    title: 'The One Layer Every Agent Runs On',
    subtitle: 'The layer that lets an agent find the right context and update the system of record: live connections, the right permissions, and the current version of every record.',
    image: { src: '/data-engine/diagram-context-integrations.webp', alt: 'Your systems move through Connect, Permissions, Evaluation and Grounding in a loop until the agent is reliable', width: 2432, height: 1274 },
    label: 'Context and Integrations',
    items: [
      { title: 'Connect', body: 'Link CRM, ERP, inbox, helpdesk and document stores through APIs and MCP servers.' },
      { title: 'Permissions', body: 'Agents see only what their role can see.' },
      { title: 'Grounding', body: 'Agents answer from current, cited sources, so every figure traces to a record.' },
      { title: 'Evaluation', body: 'Evaluate retrieval and actions against your past cases to find weak points.' },
    ],
  },
  types: {
    overtitle: 'DATA INPUTS',
    title: 'Supported Sources and Systems',
    cards: [
      { title: 'Documents', icon: 'text', items: ['Contracts & Policies', 'Wikis & Shared Drives', 'Email & Inboxes', 'Invoices & Forms'] },
      { title: 'Scans & Images', icon: 'image', items: ['Scanned Documents', 'Photos & Drawings', 'Handwritten Forms'] },
      { title: 'Calls & Chat', icon: 'video', items: ['Inbound Phone Calls', 'Chat & Helpdesk Tickets'] },
      { title: 'Systems & Tools', icon: 'cube', items: ['CRM, ERP & MCP Servers'] },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Integrations',
    items: [
      { id: 'pilot-to-production', overtitle: 'Blog', title: 'Why Do AI Pilots Stall?', image: { src: '/data-engine/01.png', alt: 'Human feedback' }, description: 'Most pilots work in the demo and stall in production. Understand the role clean context and live integrations play in getting agents live, and how to measure it against a baseline.', link: '/blog' }, // PLACEHOLDER
      { id: 'guide-connecting-systems', overtitle: 'Guide', title: 'Guide: Connecting Agents to CRM and ERP', image: { src: '/data-engine/02.png', alt: 'Blur' }, description: 'The success of AI agents is dependent on data and context quality. Read our guide to prepare your systems of record, so agents read and write the right fields.', link: '/guides' }, // PLACEHOLDER
      { id: 'guide-permissions', overtitle: 'Guide', title: 'Guide: Permissions and Audit Trails', image: { src: '/data-engine/03.png' }, description: 'An agent should see what its role can see, and nothing more. Read our guide to learn how to set access, approvals and logging for agents that touch real records.', link: '/guides' }, // PLACEHOLDER
      { id: 'guide-mcp', overtitle: 'Guide', title: 'Guide: MCP for Business Systems', image: { src: '/data-engine/04.png' }, description: 'MCP servers give agents a standard way to use your tools. Read our guide to learn when to use them, when to use direct APIs, and how to keep both under control.', link: '/guides' }, // PLACEHOLDER
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'Our information was scattered across platforms and needed manual transfers and reminders. Vahue connected our CRM and ERP, the agents now work from one source, and manual re-keying is down 40%. My team finally spends its day on the exceptions.', // PLACEHOLDER
      },
    ],
  },
  prefooter: {
    headline: 'See it work before it goes live',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Explore Agents', url: '/services/back-office-sync' },
    image: { path: '/data-engine/prefooter.webp' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
