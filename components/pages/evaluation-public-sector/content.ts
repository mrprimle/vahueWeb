// Copy for /evaluation/public-sector: the Production Rescue service, repairing or scaling an AI system already live.
// Same shape and counts as content.scale.ts. `// PLACEHOLDER` marks what Vahue can't claim yet.
import type { EvaluationPublicSectorContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const A = '/evaluation-public-sector'

export const content: EvaluationPublicSectorContent = {
  meta: {
    title: 'Production Rescue | Fix or Scale a Live AI System | Vahue',
    description: 'Your AI system is live and letting you down. We audit it, repair it, and keep it reliable, whoever built it, for teams left with an unstable agent.',
  },
  hero: {
    headline: 'Production Rescue',
    body: 'For teams with a live AI system that is unstable, slow, or orphaned by its vendor: we find out why, fix it, and keep it reliable.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Learn more', url: '/services/evals-and-guardrails' },
    backdrop: WHITE,
    image: { path: `${A}/hero-filled.webp` },
  },
  logos: {
    copy: "Trusted by the world's most ambitious AI teams.", // PLACEHOLDER
    link: { title: 'Meet our customers', href: '/enterprise' },
    items: [
      { alt: 'Logo', width: 79, height: 22 }, // PLACEHOLDER
      { alt: 'Logo', width: 65, height: 45 }, // PLACEHOLDER
    ],
  },
  techniques: {
    overtitle: 'Repair Live AI Systems',
    title: 'Fix What Is Already Running',
    subtitle: 'Production Rescue for agents, voice bots, and LLM applications, whoever built them.',
    items: [
      { title: 'Stabilize', description: 'Audit architecture, prompts, and logs, then stop the failures your customers see first.', image: `${A}/computer-vision-filled.webp` },
      { title: 'Scale', description: 'Rebuild what blocks growth, and prove the new version beats the old one on real traffic.', image: `${A}/generative-ai-filled.webp` },
    ],
  },
  why: {
    overtitle: 'Why Production Rescue',
    title: 'Why Rescue Before You Rebuild',
    subtitle: 'Protect your customers and the budget you already spent. Keep what works, and replace only what does not.',
    items: [
      { icon: 'certainty', title: 'Recover with Certainty', subtitle: 'Have confidence in every fix: changes are tested on real cases before they ship' },
      { icon: 'ongoing', title: 'Ongoing Evaluation', subtitle: 'Continuously evaluate the system so updates and new models do not break what we fixed' },
      { icon: 'vulnerabilities', title: 'Uncover the real causes', subtitle: 'Trace hallucinations, latency, token waste, and failed handoffs back to where they start' },
    ],
  },
  methodology: {
    overtitle: 'How We Fix It',
    title: 'Production Rescue Methodology',
    subtitle: 'Built for systems that have to stay live while the work happens.',
    listTitle: 'From First Audit to Reliable Operation',
    features: [
      { title: 'Audit the live system end to end: architecture, prompts, data, logs, and cost per case', description: '' },
      { title: 'Rebuild what is failing, adding tests, monitoring, and safe rollbacks as we go', description: '' },
      { title: 'Hand back a documented system, or let us run it monthly against an agreed baseline', description: '' },
    ],
    image: { src: `${A}/methodology-filled.png`, alt: 'Production Rescue Methodology', width: 644, height: 430, mockup: true, mockupUrl: 'evals.vahue.ai' }, // PLACEHOLDER (host in the mock browser bar)
    cta: { text: 'Read more', href: '/services/evals-and-guardrails' },
  },
  platform: {
    overtitle: 'Why Vahue',
    title: 'Repair & Scale AI Systems with Vahue',
    subtitle: 'Production Rescue covers the entire repair, from first diagnosis to monthly monitoring, with real-time insights on performance and risks to keep your AI systems reliable.',
    cards: [
      { icon: 'sets', title: 'Failure Audit', description: 'Logs, prompts, retrieval, and handoffs reviewed end to end to find what is really breaking.' },
      { icon: 'targeted', title: 'Targeted Fixes', description: 'Repair the failures that hurt conversion, accuracy, or trust first, then work through the rest.' },
      { icon: 'rater', title: 'Latency and Cost', description: 'Cut response times and token use through better architecture, caching, and model routing.' },
      { icon: 'product', title: 'Reliability at Load', description: 'Test at real volume and add fallbacks and rollbacks, so peak days stop being incidents.' },
      { icon: 'reporting', title: 'Reporting Consistency', description: 'Before and after numbers on the same cases, so you can show leadership exactly what changed.' },
      { icon: 'redteam', title: 'Vendor Takeover', description: 'Inherit a departed vendor’s code, document it, then hand it to your team or run it for you.' },
    ],
  },
  prefooter: {
    headline: 'Rescue your AI system today!',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
