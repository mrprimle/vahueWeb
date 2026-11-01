// Scale's original strings for https://scale.com/generative-ai-data-engine (RSC payload, 2026-11-01). The page renders content.ts.
import type { GenAiContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const DIR = '/generative-ai-data-engine'

export const scaleContent: GenAiContent = {
  meta: {
    title: 'Generative AI Data Engine | Scale AI',
    description: 'Build advanced AI models with the Generative AI Data Engine: RLHF, human data, model evaluation, safety, and alignment.',
  },
  hero: {
    headline: 'Generative AI Data Engine',
    body: 'Powering the Next Frontier of AI.',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/hero.webp` },
    backdrop: WHITE,
  },
  logos: {
    copy: "Trusted by the world's most ambitious AI teams.",
    link: { title: 'Meet our customers', href: '/customers' },
    items: [
      { alt: 'Meta', width: 100, height: 20, src: `${DIR}/logos/meta.svg` },
      { alt: 'Cohere', width: 108, height: 18, src: `${DIR}/logos/cohere.svg` },
      { alt: 'NTT', width: 77, height: 28, src: `${DIR}/logos/ntt.svg` },
    ],
  },
  overview: {
    overtitle: 'PRODUCT OVERVIEW',
    title: 'Generative AI Data Engine',
    subtitle: "Enables rapid creation of tailored, high-quality datasets curated by vetted subject matter experts to train the world's most advanced models.",
    image: { src: `${DIR}/01.png`, alt: 'Generative AI Data Engine - RLHF diagram', width: 1214, height: 720 },
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    backdrop: WHITE,
    colorTheme: { tailwindClass: 'evergreen', hex: '#193A29', contrastColor: 'white' },
    items: [
      {
        nameTile: true,
        clientName: 'Nat Friedman',
        title: 'Investor, Entrepreneur',
        testimonial:
          'Experts are the new GPUs. The largest AI labs are spending huge amounts of money, like huge amounts of money to acquire more valuable tokens, either paying experts to generate it, working through labeling companies like Scale AI or others.',
      },
    ],
  },
  product: {
    body: "Scale's Generative AI Data Engine combines automation and human intelligence to rapidly generate training data tailored to your specific AI goals and data needs.",
    image: { src: `${DIR}/product-overview.webp`, alt: '', width: 1214, height: 636 },
  },
  build: {
    overtitle: 'Build AI',
    title: 'Improve Your Models By Improving Your Data',
    subtitle: 'High-quality training data, curated by subject matter experts, is crucial for developing powerful, accurate, Generative AI models.',
    image: { src: `${DIR}/02.png`, alt: '', width: 1216, height: 638 },
  },
  features: {
    overtitle: 'Key Features',
    title: 'Enabling the Next Generation of LLMs',
    subtitle: 'Scale has deep experience providing the data underpinning the most advanced LLMs.',
    items: [
      { icon: 'gauge', title: 'Ops Center for Quality Control', subtitle: 'Real-time visibility into data collection and curation' },
      { icon: 'hub', title: 'Experts, Linguists, and Coders', subtitle: 'Access a global network of hand-picked experts across diverse fields to build the highest quality datasets' },
      { icon: 'trend', title: 'Improved Models', subtitle: 'Train your models with advanced datasets delivered through our purpose-built infrastructure' },
      { icon: 'bolt', title: 'Increased Efficiency', subtitle: 'Faster, more cost-effective dataset creation' },
      { icon: 'microscope', title: 'Model Evaluation', subtitle: 'Scale proactively finds and surfaces model weaknesses, including targeted red-teaming.' },
      { icon: 'handshake', title: 'Responsible Development', subtitle: 'Upholding privacy, fairness, transparency and ethics' },
    ],
  },
  demos: {
    overtitle: 'Demos',
    title: 'Scale Data Engine Demos',
    videos: [
      { src: 'https://scaleai.wistia.com/medias/4n8xcpuanb', title: 'Assisted Instruction Following Demo', cover: `${DIR}/thumb-1.webp`, description: '' },
      { src: 'https://scaleai.wistia.com/medias/10r609ojj4', title: 'Span RLHF', cover: `${DIR}/thumb-2.webp`, description: '' },
      { src: 'https://scaleai.wistia.com/medias/wtp2wcktbl', title: 'Human Feedback and Preference Ranking', cover: `${DIR}/thumb-3.webp`, description: '' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Case Studies & Resources',
    subtitle: "We've worked with the world's leading AI labs for years, and developed more high-quality data than anybody else.",
    items: [
      { id: 'rFG1RbT6JGStbNdiCjnP9Z', overtitle: 'Case Studies', title: 'Customer Case Study: TIME', image: { src: `${DIR}/resource-1.png` }, description: 'TIME partnered with Scale to launch generative AI experiences for a global audience.', link: '/customers/time' },
      { id: 'jPFmD4DDT8qPRhitLhfARX', overtitle: 'Zeitgeist', title: 'AI Readiness Report', image: { src: `${DIR}/resource-2.png` }, description: 'The 2nd edition of our AI Readiness Report helps you get past the hype and understand what it really takes to adopt Generative AI.', link: '/ai-readiness-report' },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp` },
    backdrop: WHITE,
  },
}
