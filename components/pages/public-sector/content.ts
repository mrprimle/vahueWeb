// Copy for /public-sector ("Scale-ups" in the menu: B2B scale-ups whose volume has outgrown the team), written from the AJTBD research into Scale's slots. Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { PublicSectorContent } from './types'

const A = '/public-sector'
const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: PublicSectorContent = {
  meta: {
    title: 'AI Agents for B2B Scale-ups | Vahue',
    description: 'Volume outgrew the team? Vahue runs your busiest workflow with agents, measured against your baseline from day one.',
  },
  hero: {
    headline: 'B2B Scale-ups',
    body: 'Vahue runs your busiest workflow with agents across Operations, Finance, Support, and Revenue, measured against your baseline from day one. See it work on your own cases before it goes live.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/hero-filled.webp` },
  },
  logos: {
    items: [
      { alt: 'Logo', width: 65, height: 45 }, // PLACEHOLDER
      { alt: 'Logo', width: 48, height: 63 }, // PLACEHOLDER
      { alt: 'Logo', width: 68, height: 53 }, // PLACEHOLDER
      { alt: 'Logo', width: 79, height: 22 }, // PLACEHOLDER
      { alt: 'Logo', width: 70, height: 16 }, // PLACEHOLDER
      { alt: 'Logo', width: 79, height: 14 }, // PLACEHOLDER
      { alt: 'Logo', width: 82, height: 22 }, // PLACEHOLDER
    ],
  },
  useCases: {
    overtitle: 'Use Cases',
    title: 'Transforming B2B Operations with Agentic Solutions',
    subtitle: 'When every new customer means another hire, we take the workflow off your team: agents inside the systems you already use, with your people on the exceptions.',
    features: [
      {
        title: 'Document Intake Agents',
        image: { src: `${A}/img-acquisition-procurement.webp`, alt: 'Document Intake Agents' },
        bullets: ['Invoices, contracts, and supplier sheets read and checked', 'Clean records posted to your ERP or CRM', 'Every field traced to its source page', 'People review only the uncertain fields'],
      },
      {
        title: 'Sales and Booking Agents',
        image: { src: `${A}/img-revenue.webp`, alt: 'Sales and Booking Agents' },
        bullets: ['Lead capture, qualification, and routing', 'Quotes, bookings, and follow-ups while intent is live', 'Call answering, CRM write-back, clean handoff to sales', 'Only qualified leads reach your team'],
      },
      {
        title: 'Knowledge Agents',
        image: { src: `${A}/img-knowledge.webp`, alt: 'Knowledge Agents' },
        bullets: ['Sourced answers from all your documents', 'RFI (Request for Information) answers and management reports', 'Answers in Slack or Teams, within existing permissions'],
      },
      {
        title: 'Support and Voice Agents',
        image: { src: `${A}/img-support.webp`, alt: 'Support and Voice Agents' },
        bullets: ['Routine requests resolved end to end', 'Ticket routing with a summary on every handoff', 'Voice agents for the calls your desk misses', 'Identity checks'],
      },
      {
        title: 'Back-office Sync Agents',
        image: { src: `${A}/img-backoffice.webp`, alt: 'Back-office Sync Agents' },
        bullets: ['CRM, ERP, and finance kept in step', 'Orders, onboarding, and approvals without re-keying', 'Reconciliations prepared overnight', 'Mismatches sent as a short exception list', 'Approval before any payment or credit action'],
      },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Advanced, Production-Ready AI Solutions',
    subtitle: 'Proven on your own cases and measured against your baseline before anything goes live',
    items: [
      {
        title: 'Back-office Sync Agents',
        features: [
          { title: 'Built for your busiest workflow', description: 'Match records across systems, check your rules, and write clean matches back.' },
          { title: 'Scalable multi-agent architecture', description: 'Designed to work with one another and with your external data and systems.' },
          { title: 'Role-based access', description: 'Agents see only what their role can see, in your VPC, on-premises, or our cloud.' },
        ],
        image: { src: `${A}/agents-filled.webp`, alt: 'Back-office Sync Agents', width: 644, height: 430 },
        cta: { text: 'Learn more', href: '/generative-ai-data-engine' },
      },
      {
        title: 'Document Intake Agents',
        features: [
          { title: 'Advanced Agentic AI Software', description: 'Every document read from email, portals, and scans, then posted.' },
          { title: 'State-of-the-Art Machine Learning', description: 'Language models and OCR read every field, and your rules check each value.' },
          { title: 'Human-in-the-Loop Expertise', description: 'Uncertain fields go to a reviewer next to the source page.' },
        ],
        image: { src: `${A}/document-intake-filled.webp`, alt: 'Document Intake Agents', width: 662, height: 592 },
        cta: { text: 'Learn more', href: '/physical-ai' },
      },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Proven Performance',
    subtitle: 'Your last pilot was judged on a demo. We record your baseline, run agents in shadow mode on your own cases, and show you the results before go-live.',
    items: [
      { icon: 'native', title: 'AI-native', subtitle: 'Vahue partners with operations leaders and engineering teams to get AI out of the demo and into daily use - bringing the same expertise and rigor to every workflow we run.' },
      { icon: 'proven', title: 'Proven experience', subtitle: 'Scale-ups including a mid-market insurer and a distributor trust Vahue with their most forward leaning AI initiatives including Claims Intake and Back-office Sync.' }, // PLACEHOLDER
      { icon: 'people', title: 'Software and People', subtitle: 'Vahue embeds our agents with human expertise to ensure accuracy, adaptability, and production readiness. We stay after launch to run, monitor, and report against your baseline.' },
    ],
  },
  callout: {
    title: 'Your AI workforce, built one workflow at a time.',
    body: 'Audit in 2 weeks. Pilot on your own cases in 4 to 6 weeks. Then we Operate monthly, so volume keeps growing without the next hire.',
    cta: { text: 'Learn more', href: '/evaluation/enterprise' },
    image: { src: `${A}/callout-steps.webp`, alt: 'Volume growing step by step', width: 560, height: 378 },
  },
  resources: {
    overtitle: 'SERVICES',
    title: 'Learn More About Our Services for B2B Scale-ups',
    items: [
      { id: 'back-office-sync', overtitle: 'Automate a Workflow', title: 'Back-office Sync Agents: Keep CRM, ERP and finance in step', image: { src: `${A}/resources/01.png` }, link: '/generative-ai-data-engine' },
      { id: 'document-intake', overtitle: 'Automate a Workflow', title: 'Document Intake Agents: Every document a clean record', image: { src: `${A}/resources/02.png` }, link: '/physical-ai' },
      { id: 'sales-booking', overtitle: 'Automate a Workflow', title: 'Sales and Booking Agents: Answer while intent is live', image: { src: `${A}/resources/03.png` }, link: '/public-sector-data-engine' },
      { id: 'support-voice', overtitle: 'Automate a Workflow', title: 'Support and Voice Agents: Stop missing calls and tickets', image: { src: `${A}/resources/04.png` }, link: '/donovan' },
      { id: 'knowledge', overtitle: 'Automate a Workflow', title: 'Knowledge Agents: Sourced answers in Slack or Teams', image: { src: `${A}/resources/05.png` }, link: '/genai-portfolio' },
      { id: 'scoring-decision', overtitle: 'Automate a Workflow', title: 'Scoring and Decision Agents: Score and route at volume', image: { src: `${A}/resources/06.png` }, link: '/automotive' },
      { id: 'strategy-audit', overtitle: 'Prove and Fix', title: 'AI Strategy and Audit: Find the right workflow first', image: { src: `${A}/resources/07.png` }, link: '/evaluation/enterprise' },
      { id: 'evals-guardrails', overtitle: 'Prove and Fix', title: 'Evals and Guardrails: See it work on your own cases', image: { src: `${A}/resources/08.png` }, link: '/evaluation/model-developers' },
      { id: 'production-rescue', overtitle: 'Prove and Fix', title: 'Production Rescue: Fix the AI system that stalled', image: { src: `${A}/resources/09.png` }, link: '/evaluation/public-sector' },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Start With an Audit', url: '/evaluation/enterprise' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
