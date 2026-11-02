// Scale's copy under the keep-first rule for /public-sector ("Scale-ups" in the menu: B2B scale-ups whose volume has outgrown the team). Same shape and counts as content.scale.ts.
// Government and defense lines become the scale-up job in the same slot. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { PublicSectorContent } from './types'

const A = '/public-sector'
const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: PublicSectorContent = {
  meta: {
    title: 'Vahue is the AI agent partner for B2B Scale-ups | Vahue',
    description: 'Vahue provides solutions to fine-tune document intake workflows and AI agent systems designed for scale-up operations.',
  },
  hero: {
    headline: 'B2B Scale-ups',
    body: 'Vahue powers key document intake and agentic AI and data workflows across the Operations, Finance, Support, and Revenue teams of fast-growing B2B companies.',
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
    subtitle: 'Vahue provides solutions to fine-tune document intake workflows and deploy AI agents designed for scale-up operations.',
    features: [
      {
        title: 'Quoting, Procurement & Contracting',
        image: { src: `${A}/img-acquisition-procurement.webp`, alt: 'Procurement' },
        bullets: ['Onboarding, and Compliance', 'Procurement and lifecycle management', 'Contract management, invoice matching', 'Budget analysis, spend and cost allocation'],
      },
      {
        title: 'Revenue Planning & Operations',
        image: { src: `${A}/img-revenue.webp`, alt: 'Revenue Planning' },
        bullets: ['Lead capture, qualification, and routing', 'Quotes, bookings, follow-ups', 'Call answering, CRM write-back, clean handoff to sales anywhere', 'Pipeline Reporting'],
      },
      {
        title: 'Knowledge, Reporting, and Decision Support',
        image: { src: `${A}/img-knowledge.webp`, alt: 'Knowledge' },
        bullets: ['Sourced answers, all documents, customer analysis, management reporting', 'RFI (Request for Information) Answers', 'Risk scoring & decision support'],
      },
      {
        title: 'Support and Service Operations',
        image: { src: `${A}/img-support.webp`, alt: 'Support' },
        bullets: ['Tier-1 Support Ops', 'Ticket Routing', 'Voice Agents', 'Identity checks'],
      },
      {
        title: 'Enterprise Support & Back Office',
        image: { src: `${A}/img-backoffice.webp`, alt: 'Enterprise Support' },
        bullets: ['Logistics & supply chain management', 'Human resources & personnel management', 'Document & knowledge support', 'Legal & Compliance', 'Training & organizational readiness'],
      },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Advanced, Production-Ready AI Solutions',
    subtitle: 'Commercially-proven, baseline tested capabilities to power AI Agents and Document Intake workflows',
    items: [
      {
        title: 'Operations AI Agents',
        features: [
          { title: 'Built for your busiest workflow', description: 'Support every level of operations, from inbox to system of record, with minimal intervention.' },
          { title: 'Scalable multi-agent architecture', description: 'Designed to interact and scale with one another, including decomposable reasoning and integration with external data and systems.' },
          { title: 'Role-based access', description: 'Access leading commercial and fine-tuned models in your VPC, on-premises, or our cloud.' },
        ],
        image: { src: `${A}/agents-filled.webp`, alt: 'Operations AI Agents', width: 644, height: 430 },
        cta: { text: 'Learn more', href: '/donovan' },
      },
      {
        title: 'Document Intake',
        features: [
          { title: 'Advanced Agentic AI Software', description: 'Unified platform for end-to-end Agent Ops.' },
          { title: 'State-of-the-Art Machine Learning', description: 'Leverage machine learning strategies to accelerate and strategically approach document extraction.' },
          { title: 'Human-in-the-Loop Expertise', description: 'Leverage subject matter experts with decades of experience and domain depth for exception reviews.' },
        ],
        image: { src: `${A}/document-intake-filled.webp`, alt: 'Document Intake', width: 662, height: 592 },
        cta: { text: 'Learn more', href: '/physical-ai' },
      },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Proven Performance',
    subtitle: 'Achieve model precision and accuracy with high-quality data and combine with advanced AI software and subject matter expertise.',
    items: [
      { icon: 'native', title: 'AI-native', subtitle: 'Vahue partners with operations leaders and engineering teams to accelerate their AI initiatives - bringing the same expertise and rigor to our work in scale-ups.' },
      { icon: 'proven', title: 'Proven experience', subtitle: 'Scale-ups including a mid-market insurer and a distributor trust Vahue with their most forward leaning AI initiatives including Claims Intake and Back-office Sync.' }, // PLACEHOLDER
      { icon: 'people', title: 'Software and People', subtitle: 'Vahue embeds our solutions with human expertise to ensure accuracy, adaptability, production readiness, and meet the unique demands of growing teams.' },
    ],
  },
  callout: {
    title: 'Vahue is building the AI workforce of the future with you.',
    body: 'Built to support every level of operations so volume can keep growing without the next hire.',
    cta: { text: 'Learn more', href: '/experts' },
    image: { src: `${A}/callout-steps.webp`, alt: 'Volume growing step by step', width: 560, height: 378 },
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our B2B Scale-up Capabilities',
    items: [
      { id: 'intake-review', overtitle: 'Customer Blog', title: 'Machine Reading for Human Review: Creating Intake Agents to Augment Back-office Teams', image: { src: `${A}/resources/01.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'baselines', overtitle: 'Blog', title: 'Introducing Vahue Baselines: AI for Growing Operations', image: { src: `${A}/resources/02.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'quality-benchmark', overtitle: 'Blog', title: 'Vahue & a Mid-market Insurer Introduce an Agent Quality Benchmark on Real Claims', image: { src: `${A}/resources/03.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'sync-collaborative', overtitle: 'Blog', title: 'Introducing the Vahue and Mid-market Distributor Collaborative for Back-office Sync at Volume', image: { src: `${A}/resources/04.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'action-plan', overtitle: 'Blog', title: "Vahue's Proposal for Your First AI Action Plan", image: { src: `${A}/resources/05.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'aws-marketplace', overtitle: 'Blog', title: 'Vahue AI agents available for purchase on AWS Marketplace for the Scale-up Community', image: { src: `${A}/resources/06.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'scale-ups-2026', overtitle: 'Blog', title: 'Vahue for Scale-ups: Building on Our Progress in 2026', image: { src: `${A}/resources/07.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'next-hire', overtitle: 'Blog', title: 'Avoiding the Next Hire: The Agent Purpose-Built for Support Teams', image: { src: `${A}/resources/08.png` }, link: '/blog' }, // PLACEHOLDER
      { id: 'order-exceptions', overtitle: 'Blog', title: 'Vahue chosen by a Logistics Scale-up for Its Order Exceptions Program', image: { src: `${A}/resources/09.png` }, link: '/blog' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/data-engine' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
