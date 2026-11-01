// Copy for /public-sector-data-engine ("For Government" in the menu), from research/research.ts and the NMT research's public-service jobs.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { PublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/public-sector-data-engine'

export const content: PublicSectorContent = {
  meta: {
    title: 'For Government | Vahue',
    description: 'Vahue runs high-volume public-sector workflows with AI agents, measured against your baseline, with review queues, audit logs and deployment in your cloud or on-premises.',
  },
  hero: {
    headline: 'Agents for Government',
    body: 'Running Your Busiest Workflows Inside Federal, State, and Local Government Agencies.',
    cta: { text: 'Book an Audit', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: 'Trusted by agencies that outgrew headcount.', // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/public-sector' },
    items: [
      { alt: 'Logo', width: 48, height: 63 }, // PLACEHOLDER
      { alt: 'Logo', width: 113, height: 30 }, // PLACEHOLDER
      { alt: 'Logo', width: 65, height: 51 }, // PLACEHOLDER
      { alt: 'Logo', width: 140, height: 31 }, // PLACEHOLDER
      { alt: 'Logo', width: 182, height: 20 }, // PLACEHOLDER
    ],
  },
  overview: {
    overtitle: 'PRODUCT OVERVIEW',
    title: 'Agents for Government',
    subtitle: 'Return staff hours and keep public records accurate with audited agents.',
    items: [
      { icon: 'monitor', title: 'Document Intake', subtitle: 'Read diverse document types from forms, permits, claims, scans and more. Quickly post clean records with AI-assisted extraction tools and a review team from your own agency.' },
      { icon: 'sparkle', title: 'Knowledge Agents', subtitle: 'Get sourced answers from your own records. Explore policies and case files in plain English. Prioritize unanswered questions and address content gaps first.' },
      { icon: 'trend', title: 'Accuracy Reviews', subtitle: 'Compare agent output to reviewer decisions. Measure agent accuracy and returned hours over time. Pinpoint weaknesses at granular record fields.' },
    ],
  },
  why: {
    overtitle: 'Why Vahue',
    title: 'Accuracy and Accountability are Critical for Public Services',
    subtitle: 'Accuracy and control are achieved with measured workflows powered by supervised agents, full audit logs and your own reviewers.',
    items: [
      { title: 'Governed Agent Software', description: 'A unified record of every agent action. Deploy in your cloud or on-premises, apply role-based access, log every decision, and approve actions that touch public records.' },
      { title: 'Baseline-First Workflow Delivery', description: 'Record volume, minutes per item, error rate and operating cost before production. Agree the measurable target and stopping point, then report returned hours against baseline.' },
      { title: 'Human-in-the-Loop Review', description: 'Send anything below your confidence threshold to reviewers on your own team for approval, exception handling, and continuous refinement of your agent rules.' },
    ],
    image: { src: `${DIR}/why.webp`, alt: 'Governed agent software, baseline-first workflow delivery and human-in-the-loop review feed each other in a loop', width: 662, height: 592 },
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: WHITE,
    items: [
      {
        nameTile: true,
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial:
          'Vahue has reduced the backlog in our permit and benefits casework by taking document intake off our team and running it inside the systems we already use, with our own reviewers checking every exception. Our team returned more hours in the 3 months working with Vahue than in the last 15 months.', // PLACEHOLDER
      },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Agents for Government Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Case Answers from Your Records', cover: `${DIR}/poster-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'Permit Intake and Agent Accuracy Review', cover: `${DIR}/poster-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Accelerate Reviews with Prefilled Data', cover: `${DIR}/poster-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our Work',
    items: [
      { id: 'county-permit-intake', overtitle: 'Blog', title: 'Vahue chosen by a County Agency for Its Permit Intake Workflow', image: { src: `${DIR}/resource-1.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'state-agency-operate', overtitle: 'Blog', title: 'Operate Contract Across a State Agency', image: { src: `${DIR}/resource-2.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'audit-table-stakes', overtitle: 'Blog', title: 'Audit Table Stakes: Your Workflow Baseline', image: { src: `${DIR}/resource-3.webp` }, link: '/blog' }, // PLACEHOLDER
      { id: 'public-service-commitments', overtitle: 'Blog', title: 'Our Public-Service Data Commitments', image: { src: `${DIR}/resource-4.webp` }, link: '/blog' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your agency starts here',
    cta: { text: 'Book an Audit', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
  },
}
