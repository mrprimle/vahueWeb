// Copy for /data-engine ("All Workflows" in the menu), from research/research.ts.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { DataEngineContent, LogoItem } from './types'

const logo = (key: string, width: number, height: number): LogoItem => ({ key, alt: 'Logo', width, height })

export const content: DataEngineContent = {
  meta: {
    title: 'All Workflows | Vahue',
    description: 'We take a high-volume workflow off your team and run it with AI agents inside the tools you already use, so operations keep up with growth without new hires.',
  },
  hero: {
    headline: 'All Workflows',
    body: 'Audit, Pilot, and operate agents. Measure against your baseline. Repeat.',
    cta: { text: 'Book an Audit', url: '/demo' },
    image: { path: '/data-engine/hero.webp' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
  },
  logos: [
    logo('customer-1', 90, 23), // PLACEHOLDER
    logo('customer-2', 100, 24), // PLACEHOLDER
    logo('customer-3', 100, 20), // PLACEHOLDER
    logo('customer-4', 112, 20), // PLACEHOLDER
    logo('customer-5', 111, 23), // PLACEHOLDER
    logo('customer-6', 60, 24), // PLACEHOLDER
    logo('customer-7', 100, 24), // PLACEHOLDER
  ],
  best: {
    title: 'Measured From Day One',
    body: 'Vahue runs the busiest workflows for operations and finance leaders whose volume has outgrown the team, without new hires.',
    image: { src: '/data-engine/the-business.webp', alt: '', width: 2048, height: 2048 },
    cards: [
      { title: 'Accuracy', body: 'A person on your team checks every output until accuracy holds on real volume.', iconClass: 'text-archive-purple' },
      { title: 'Clear Baseline', body: 'Record volume, minutes per item, error rate and cost first. Then, track hours returned against that baseline every month.', iconClass: 'text-foundry-tan' },
      { title: 'Capacity', body: 'Agents keep operations in step with growth, from one pilot workflow to high-volume daily production work. Add volume, or hold steady, without hiring.', iconClass: 'text-atlas-blue' },
      { title: 'Control', body: 'Review queues, approvals, role-based access and a full audit log keep every single agent action inside the limits you set.', iconClass: 'text-evergreen' },
    ],
  },
  caseStudy: {
    overtitle: 'Customer Case Study',
    description: 'A mid-market insurer and Vahue moved first notice of loss intake to agents, posting clean claims records as they arrive.', // PLACEHOLDER
    cta: { text: 'Read customer story', url: '/enterprise/insurance' },
    tileClass: 'bg-evergreen',
    logo: { key: 'case-study', alt: 'Logo', width: 240, height: 75, className: 'text-white' }, // PLACEHOLDER
  },
  buildAi: {
    overtitle: 'Run Agents',
    title: 'Checked By People',
    subtitle: 'Answers from your own data, in plain English.',
    showcaseTitle: 'Knowledge Agents',
    showcaseSubtitle: 'Answers from your documents, wikis and databases',
    body: 'Vahue Knowledge Agents let staff ask questions of documents, wikis and databases and get sourced answers in Slack or Teams, with existing permissions, logged queries, review, and full audit logs.',
    primaryCta: { text: 'Book an Audit', url: '/demo' },
    secondaryCta: { text: 'Knowledge Agents', url: '/genai-portfolio' },
    chat: {
      windowTitle: 'Knowledge Agent Chat',
      question: 'Which supplier invoices failed the NetSuite match last night?',
      rankingTitle: 'Reviewer Answer Ranking',
      ranking: [
        'Three invoices failed because the finance team was on holiday',
        'Three invoices failed because PO numbers do not match NetSuite',
        'Nothing failed. Every invoice posted cleanly to the ledger',
      ],
      answer: 'Three invoices failed because PO numbers do not match NetSuite.',
      userAvatar: '/data-engine/avatar.webp',
      agentAvatar: '/data-engine/llm-1.webp',
    },
  },
  whatIs: {
    overtitle: 'WHAT VAHUE RUNS FOR YOU',
    title: 'One Team For Busy Workflows',
    subtitle: 'Vahue takes a high-volume workflow off your team and runs it with AI agents inside the systems you already use. Keep throughput well ahead of growth, without additional hires.',
    image: { src: '/data-engine/diagram-workflow.webp', alt: 'Records move from your systems through Watch, Match and Write, with exceptions going to review, and a daily report at the end', width: 2432, height: 1274 },
    label: 'Back-office Sync Agent Steps',
    items: [
      { title: 'Watch', body: 'Agents continuously monitor changed records across every connected system.' },
      { title: 'Match', body: 'Match records and check your rules.' },
      { title: 'Write', body: 'Write clean matches; queue exceptions for review.' },
      { title: 'Report', body: 'A daily summary shows what moved, what matched, and what still needs a person.' },
    ],
  },
  types: {
    overtitle: 'WORKFLOW INPUTS',
    title: 'Supported Workflow Types',
    cards: [
      { title: 'Vahue Documents', icon: 'text', items: ['Invoice Intake', 'KYC Document Intake', 'Treaty Review', 'Claims & Contracts'] },
      { title: 'Vahue Scans', icon: 'image', items: ['Packing Slips', 'Drawings', 'Lab Reports'] },
      { title: 'Vahue Voice', icon: 'video', items: ['Inbound Phone Calls', 'Routine Request Resolution'] },
      { title: 'Vahue Back-office Sync', icon: 'cube', items: ['Reconciliation'] },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Workflow Agents',
    items: [
      { id: 'stalled-pilots', overtitle: 'Blog', title: 'Why Do Pilots Keep Stalling?', image: { src: '/data-engine/01.png', alt: 'Stalled pilots' }, description: 'Most agencies never publish a baseline, and almost nobody runs the agents after launch. Understand why pilots and RPA projects stall and what it takes to keep them running at real volume.', link: '/blog' },
      { id: 'guide-baselines', overtitle: 'Guide', title: 'Guide to Workflow Baselines', image: { src: '/data-engine/02.png', alt: 'Baselines' }, description: 'The value of an agent depends on what the work cost before it. Read our guide to recording volume, minutes per item, error rate and cost.', link: '/guides' },
      { id: 'guide-document-intake', overtitle: 'Guide', title: 'Guide: Document Intake', image: { src: '/data-engine/03.png' }, description: 'Document intake turns invoices, claims and supplier sheets into clean records in your systems. Read our guide to learn how it works and where people stay in review.', link: '/physical-ai' },
      { id: 'guide-scoring', overtitle: 'Guide', title: 'Guide: Scoring & Routing Decisions', image: { src: '/data-engine/04.png' }, description: 'Scoring models take past decisions as inputs and give each new item a score and an explanation. Read our guide to learn more about routing borderline cases to reviewers.', link: '/automotive' },
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    items: [
      {
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: 'Vahue has made it easier for us to keep up with invoice volume without new hires. The review queue is simple to navigate, and the daily summary and exception list save us time and help enforce our approval rules so that we can close the month on schedule.', // PLACEHOLDER
      },
    ],
  },
  prefooter: {
    headline: 'Your busiest work, run by agents',
    cta: { text: 'Book an Audit', url: '/demo' },
    secondaryCta: { text: 'Back-office Sync', url: '/generative-ai-data-engine' },
    image: { path: '/data-engine/prefooter.webp' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
