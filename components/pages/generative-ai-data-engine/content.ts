// Scale's copy under the 80% rule for /generative-ai-data-engine ("For Back-office Sync" in the menu). Same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { GenAiContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/generative-ai-data-engine'

export const content: GenAiContent = {
  meta: {
    title: 'Back-office Sync Agents | Vahue',
    description: 'Build reliable AI agents with Back-office Sync: human review, clean data, agent evaluation, and guardrails.',
  },
  hero: {
    headline: 'Back-office Sync Agents',
    body: 'Keeping CRM, ERP and Finance in Step.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious AI teams.", // PLACEHOLDER
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
    subtitle: "Enables rapid creation of tailored, high-quality datasets curated by vetted subject matter experts to power the world's most reliable agents.",
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
          'Experts are the new GPUs. The largest enterprises are spending huge amounts of money, like huge amounts of money to get more reliable agents live, either paying experts to build them, working through AI partners like Vahue or others.', // PLACEHOLDER
      },
    ],
  },
  product: {
    body: 'Vahue’s Back-office Sync Agents combine automation and human intelligence to rapidly generate clean data tailored to your specific AI goals and data needs.',
    image: { src: `${DIR}/product-overview.webp`, alt: '', width: 1214, height: 636 },
  },
  build: {
    overtitle: 'Build AI',
    title: 'Improve Your Agents By Improving Your Data',
    subtitle: 'High-quality data, curated by subject matter experts, is crucial for developing powerful, accurate, Generative AI agents.',
    image: { src: `${DIR}/data-improvement-loop.webp`, alt: 'Data from your systems moves through Collect, Curate, Improve and Evaluate in a loop to produce reliable agents, with expert review', width: 1216, height: 638 },
  },
  features: {
    overtitle: 'Key Features',
    title: 'Enabling the Next Generation of Agents',
    subtitle: 'Vahue has deep experience providing the data underpinning the most reliable agents.',
    items: [
      { icon: 'gauge', title: 'Ops Center for Quality Control', subtitle: 'Real-time visibility into data collection and curation' },
      { icon: 'hub', title: 'Experts, Engineers, and Coders', subtitle: 'Access a global network of hand-picked experts across diverse fields to build the highest quality datasets' },
      { icon: 'trend', title: 'Improved Agents', subtitle: 'Train your agents with advanced datasets delivered through our purpose-built infrastructure' },
      { icon: 'bolt', title: 'Increased Efficiency', subtitle: 'Faster, more cost-effective dataset creation' },
      { icon: 'microscope', title: 'Agent Evaluation', subtitle: 'Vahue proactively finds and surfaces agent weaknesses, including targeted red-teaming.' },
      { icon: 'handshake', title: 'Responsible Development', subtitle: 'Upholding privacy, fairness, transparency and ethics' },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Context Engine Demos',
    videos: [
      { src: `${DIR}/demo-1.mp4`, title: 'Assisted Record Matching Demo', cover: `${DIR}/demo-1.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-2.mp4`, title: 'Record Match Review', cover: `${DIR}/demo-2.webp`, description: '' }, // PLACEHOLDER
      { src: `${DIR}/demo-3.mp4`, title: 'Human Feedback and Preference Ranking', cover: `${DIR}/demo-3.webp`, description: '' }, // PLACEHOLDER
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Case Studies & Resources',
    subtitle: "We've worked with the world's leading AI teams for years, and developed more high-quality data than anybody else.", // PLACEHOLDER
    items: [
      { id: 'case-back-office-sync', overtitle: 'Case Studies', title: 'Case Study: Distributor', image: { src: `${DIR}/resource-1.webp` }, description: 'A distributor partnered with Vahue to keep CRM, ERP and finance in step.', link: '/enterprise' }, // PLACEHOLDER
      { id: 'ai-readiness-report', overtitle: 'Zeitgeist', title: 'AI Readiness Report', image: { src: `${DIR}/resource-2.webp` }, description: 'The 2nd edition of our AI Readiness Report helps you get past the hype and understand what it really takes to adopt Generative AI.', link: '/guides' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: WHITE,
  },
}
