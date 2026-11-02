// AJTBD copy for /generative-ai-data-engine (Back-office Sync Agents). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { GenAiContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/generative-ai-data-engine'

export const content: GenAiContent = {
  meta: {
    title: 'Back-office Sync Agents | Vahue',
    description: 'Agents keep CRM, ERP and finance in step without re-keying, flag what does not match, and report against your baseline from day one.',
  },
  hero: {
    headline: 'Back-office Sync Agents',
    body: 'For finance and operations teams copying the same record between systems. Agents keep CRM, ERP and finance in step, and send you only what doesn’t match.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's busiest operations teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      { alt: 'Logo', width: 100, height: 20 }, // PLACEHOLDER
      { alt: 'Logo', width: 108, height: 18 }, // PLACEHOLDER
      { alt: 'Logo', width: 77, height: 28 }, // PLACEHOLDER
    ],
  },
  overview: {
    overtitle: 'SERVICE OVERVIEW',
    title: 'Back-office Sync Agents',
    subtitle: 'Your team spends its day moving information between systems that don’t talk to each other. Agents watch for new and changed records, match them across systems, and write back the clean ones.',
    image: { src: `${DIR}/sync-capabilities.webp`, alt: 'Back-office Sync Agents connect CRM records, ERP and finance, other systems and reconciliations', width: 1214, height: 720 },
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
          'We had people copying the same record into three systems and finding the mismatches at month-end. Now reconciliations are ready in the morning, the exception list is short, and we avoided the next hire. The agents run as part of our daily workflow.', // PLACEHOLDER
      },
    ],
  },
  product: {
    body: 'Vahue’s Back-office Sync Agents combine automation and human review: routine records move on their own, and anything that touches money or doesn’t match waits for a person. We run them for you, measured against your baseline from day one.',
    image: { src: `${DIR}/product-overview.webp`, alt: '', width: 1214, height: 636 },
  },
  build: {
    overtitle: 'How It Works',
    title: 'Improve Your Agents By Improving Your Data',
    subtitle: 'Agents collect records from your CRM, ERP and finance systems, and experts clean what matters most. Every run is scored against your past cases, so the exception list keeps getting shorter.',
    image: { src: `${DIR}/data-improvement-loop.webp`, alt: 'Data from your systems moves through Collect, Curate, Improve and Evaluate in a loop to produce reliable agents, with expert review', width: 1216, height: 638 },
  },
  features: {
    overtitle: 'Key Features',
    title: 'Enabling a Back Office Without Re-keying',
    subtitle: 'Point tools fix one link. Vahue takes the whole chain off your team, from the changed record to the morning report.',
    items: [
      { icon: 'gauge', title: 'Ops Center for Quality Control', subtitle: 'Real-time visibility into what moved, what matched and what needs a person' },
      { icon: 'hub', title: 'Watch and Match', subtitle: 'Agents listen for new or changed records in each system, match them, and check the rules you set' },
      { icon: 'trend', title: 'Clean Write-back', subtitle: 'Clean matches are written back as records change, inside the systems you already use, with no manual back and forth' },
      { icon: 'bolt', title: 'Reconciliations Overnight', subtitle: 'Reconciliations are prepared overnight, so month-end stops running late' },
      { icon: 'microscope', title: 'Exceptions, Not Surprises', subtitle: 'Mismatches arrive as a short exception list, instead of being found by your customers.' },
      { icon: 'handshake', title: 'Approval Before Money Moves', subtitle: 'A person approves any payment or credit action, and every record keeps a full audit log' },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Back-office Sync Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Record Matching Across Systems', cover: `${DIR}/demo-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'The Daily Exception List', cover: `${DIR}/demo-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Exception Review and Approval', cover: `${DIR}/demo-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Case Studies & Resources',
    subtitle: 'See how operations teams took re-keying off their people, and what it really takes to get from a stalled pilot to production.',
    items: [
      { id: 'case-back-office-sync', overtitle: 'Case Studies', title: 'Case Study: Distributor', image: { src: `${DIR}/resource-1.webp` }, description: 'A distributor partnered with Vahue to keep CRM, ERP and finance in step, with 30 to 40% less time spent on manual CRM updates.', link: '/enterprise' }, // PLACEHOLDER
      { id: 'ai-readiness-report', overtitle: 'Zeitgeist', title: 'AI Readiness Report', image: { src: `${DIR}/resource-2.webp` }, description: 'Our AI Readiness Report helps you get past the hype and understand what it really takes to move a workflow from pilot to production.', link: '/guides' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'See it work on your own records before it goes live',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: WHITE,
  },
}
