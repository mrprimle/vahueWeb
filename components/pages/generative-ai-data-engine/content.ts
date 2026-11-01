// Copy for /generative-ai-data-engine ("Back-office Sync" in the menu), from research/research.ts.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { GenAiContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/generative-ai-data-engine'

export const content: GenAiContent = {
  meta: {
    title: 'Back-office Sync | Vahue',
    description: 'Keep CRM, ERP and finance in step without re-keying: agents move orders, approvals and reconciliations and flag mismatches.',
  },
  hero: {
    headline: 'Back-office Sync Agents',
    body: 'Keeping CRM, ERP and Finance Aligned.',
    cta: { text: 'Book an Audit', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: 'Trusted by teams whose volume outgrew headcount.', // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      { alt: 'Logo', width: 100, height: 20 }, // PLACEHOLDER
      { alt: 'Logo', width: 108, height: 18 }, // PLACEHOLDER
      { alt: 'Logo', width: 77, height: 28 }, // PLACEHOLDER
    ],
  },
  overview: {
    overtitle: 'PRODUCT OVERVIEW',
    title: 'Back-office Sync Agents',
    subtitle: 'Moves orders, onboarding, approvals and reconciliations between your systems, matches every record against your rules, and flags what does not match.',
    // PLACEHOLDER: the map dots and legend in this image are not Vahue's real regions.
    image: { src: `${DIR}/capabilities.webp`, alt: 'Back-office Sync connects CRM records, ERP and finance, other systems and reconciliations across 14+ integrations', width: 1214, height: 720 },
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: WHITE,
    colorTheme: { tailwindClass: 'evergreen', hex: '#193A29', contrastColor: 'white' },
    items: [
      {
        nameTile: true,
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial:
          'Month-end used to mean staff copying the same records between three systems, with mismatches found by customers. Now records sync as they change, reconciliations run overnight, and what does not match arrives as an exception list.', // PLACEHOLDER
      },
    ],
  },
  product: {
    body: 'Vahue’s Back-office Sync agents combine automation and human review to keep records matched across your systems, tailored to your finance and operations rules.',
    image: { src: `${DIR}/product-overview.webp`, alt: '', width: 1214, height: 636 },
  },
  build: {
    overtitle: 'Run Agents',
    title: 'Improve Your Close By Improving Your Data',
    subtitle: 'Clean records, matched across systems and checked by your team, are crucial for running fast, accurate month-ends.',
    image: { src: `${DIR}/sync-loop.webp`, alt: 'New records move through Watch, Match and Write into your systems, a daily Report feeds back to Watch, and exceptions go to a review queue', width: 1216, height: 638 },
  },
  features: {
    overtitle: 'Key Features',
    title: 'Enabling the Next Wave of Operations',
    subtitle: 'Vahue has deep experience running the agents underpinning the busiest back offices.',
    items: [
      { icon: 'gauge', title: 'Live Results for Daily Control', subtitle: 'Real-time visibility into items, hours and exceptions' },
      { icon: 'hub', title: 'Reviewers, Leads, and Auditors', subtitle: 'Send anything below your confidence threshold to reviewers on your own team before any system of record changes' },
      { icon: 'trend', title: 'Cleaner Records', subtitle: 'Keep your systems synchronized with reconciled records delivered through role-based permissions' },
      { icon: 'bolt', title: 'Returned Hours', subtitle: 'Faster, more cost-effective month-end close' },
      { icon: 'microscope', title: 'Accuracy Reviews', subtitle: 'Vahue proactively finds and surfaces mismatches, with monthly baseline reporting.' },
      { icon: 'handshake', title: 'Controlled Actions', subtitle: 'Upholding approvals, access control and audit logs' },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Back-office Sync Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Cross-System Order Sync Demo', cover: `${DIR}/demo-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'Record Matching', cover: `${DIR}/demo-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Exception Review and Approval Routing', cover: `${DIR}/demo-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Case Studies & Resources',
    subtitle: 'We’ve studied 87 published cases and reviews, and record a baseline on every workflow before any agent goes live.',
    items: [
      { id: 'case-back-office-sync', overtitle: 'Case Studies', title: 'Back-office Sync: Distributor', image: { src: `${DIR}/resource-1.webp` }, description: 'Mid-market distributor partnered with Vahue to sync CRM, ERP and finance systems overnight.', link: '/enterprise' }, // PLACEHOLDER
      { id: 'workflow-baseline-report', overtitle: 'Research', title: 'Workflow Baseline Report', image: { src: `${DIR}/resource-2.webp` }, description: 'Our Workflow Baseline Report, from 87 published cases, helps you get past the hype and understand what it really takes to run agents at volume.', link: '/guides' },
    ],
  },
  prefooter: {
    headline: 'The future of your work starts here',
    cta: { text: 'Book an Audit', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: WHITE,
  },
}
