// Filled copy for "Regulated Industries" (finance, insurance, healthcare B2B), same shape and counts as content.scale.ts.
// Keep first: Scale's string stays unless it is false for Vahue, brand words swap, and defense wording becomes the regulated-team job in the same slot.
// `// PLACEHOLDER` marks what Vahue can't claim yet: customers, numbers, certifications, procurement routes. Mike to replace.
import type { NationalSecurityContent } from './types'

const DIR = '/public-sector-national-security'
const HEALTHCARE = { name: 'Healthcare', color: { hex: '#193A29' } }
const FINANCE = { name: 'Finance', color: { hex: '#193A29' } }
const INSURANCE = { name: 'Insurance' }
const RESEARCH = { name: 'Research', color: { hex: '#273252' } }
const REGULATED = { name: 'Regulated', color: { hex: '#193A29' } }

export const content: NationalSecurityContent = {
  meta: {
    title: 'Regulated Industries | Vahue',
    description: 'Vahue’s agentic AI solutions are audit-ready, trained on your data and policies, and run in production for finance, insurance, and healthcare teams.',
  },
  hero: {
    headline: 'Vahue for Regulated Industries & Compliance',
    subtitle: [{ text: 'Vahue’s agentic AI solutions are audit-ready, trained on your data and policies, and trusted in production by finance, insurance, and healthcare teams.' }], // PLACEHOLDER (trusted in production by)
    trustedBy: 'Trusted by', // PLACEHOLDER
    image: { path: `${DIR}/hero-filled.webp`, alt: 'Homes, a clinician, a city skyline and a risk queue', width: 2029, height: 1174 },
    logos: [
      { key: 'l1', alt: 'Logo', width: 27 }, // PLACEHOLDER
      { key: 'l2', alt: 'Logo', width: 46 }, // PLACEHOLDER
      { key: 'l3', alt: 'Logo', width: 90 }, // PLACEHOLDER
      { key: 'l4', alt: 'Logo', width: 90 }, // PLACEHOLDER
      { key: 'l5', alt: 'Logo', width: 90 }, // PLACEHOLDER
      { key: 'l6', alt: 'Logo', width: 29 }, // PLACEHOLDER
      { key: 'l7', alt: 'Logo', width: 90 }, // PLACEHOLDER
      { key: 'l8', alt: 'Logo', width: 90 }, // PLACEHOLDER
    ],
  },
  challenges: {
    counterLabel: 'CHALLENGES',
    headline: 'Challenges',
    body: [{ text: 'Modernizing without compromising speed or trust' }],
    image: { path: `${DIR}/ch1-filled.svg`, alt: '', width: 922, height: 470 },
    steps: [
      { title: 'Missing Domain Context', description: [{ text: 'Commercial LLMs lack configurability and aren’t trained on company data, policies—creating more risk than impact.' }], image: { path: `${DIR}/ch1-filled.svg`, alt: 'Isometric diagram with severed links between company data and the agent pipeline', width: 922, height: 470 } },
      { title: 'Unreliable & Opaque', description: [{ text: 'Auditors can’t rely on AI you can’t explain. Commercial AI produces plausible but wrong answers without human oversight and degrades over time.' }], image: { path: `${DIR}/ch2-filled.svg`, alt: 'Isometric diagram with dashed, unverifiable links and a question mark at evaluate', width: 922, height: 470 } },
      { title: 'Inaccessible Data & Insights', description: [{ text: 'Company data is unusable for AI because data prep is slow, manual, costly. Teams miss signals in the noise, and rework AI outputs.' }], image: { path: `${DIR}/ch3-filled.svg`, alt: 'Isometric diagram with the data panel hatched out and severed links', width: 922, height: 470 } },
      { title: 'Complex & Inflexible', description: [{ text: 'Slow processes and procurement throttle modernization, while bespoke AI is an expensive black box that locks up data and makes teams vendor-dependent.' }], image: { path: `${DIR}/ch4-filled.svg`, alt: 'Isometric diagram with the agent execute panel locked', width: 922, height: 470 } },
    ],
  },
  stats: {
    heading: 'Reliable AI designed for business-critical decisions.',
    background: { path: `${DIR}/stats-bg-filled.webp`, alt: '', width: 1920, height: 1138 },
    items: [
      { icon: 'MdAlarm', label: 'TIME SAVED', value: '36% faster', description: 'claims and case analysis' }, // PLACEHOLDER
      { icon: 'MdShowChart', label: 'ACCELERATE COMPLIANCE', value: 'AML case reviews', description: 'completed in hours vs. days' }, // PLACEHOLDER
      { icon: 'Md3P', label: 'EASY TO USE', value: '80% reduction', description: 'in reviewer cognitive burden' }, // PLACEHOLDER
      { icon: 'MdAttachMoney', label: 'REDUCE COSTS', value: '40% savings', description: 'to prepare AI-ready data vs. manual handling' }, // PLACEHOLDER
      { icon: 'MdDynamicFeed', label: 'FASTER DELIVERY', value: '12x', description: 'more likely to reach production vs. industry average' }, // PLACEHOLDER
      { icon: 'MdEnhancedEncryption', label: 'PROTECT SECURITY', value: '6+ years', description: 'deployed on regulated data' }, // PLACEHOLDER
    ],
  },
  trust: {
    heading: 'Reliable commercial AI. With speed and trust.',
    cards: [
      { icon: 'MdCheck', title: 'Purpose-Built & Policy-Aligned', description: [{ text: 'Replace manual processes with purpose-built agents trained on your data and policies. Vahue turns any AI model into reliable AI outputs and workflows, so teams can decide and act faster, with less risk and rework.' }] },
      { icon: 'MdUpload', title: 'Reliable & Trusted AI', description: [{ text: 'Vahue continuously tests, red-teams, benchmarks, and validates AI for safety and reliability—catching manipulation, bias, and drift—while citing data sources and keeping humans in the loop so AI works in your environment.' }] },
      { icon: 'MdShield', title: 'Deep Data Expertise & Upskilling', description: [{ text: 'Vahue’s embedded engineers get your data AI-ready, customize agents for your use cases, and transfer full capabilities to your team. You own 100% of your data and insights, while upskilling your team.' }] },
      { icon: 'MdHub', title: 'Open & Flexible', description: [{ text: 'Vahue is a model-, data-, and infrastructure-agnostic AI factory that connects to regulated data across any system—CRM, ERP, EHR, and core banking—without bespoke AI integrations, or vendor lock-in.' }] },
    ],
  },
  missionTitle: {
    headline: 'Compliance-Ready Agentic Solutions',
    subtitle: [{ text: 'Vahue builds a reliable and agnostic AI factory that turns your raw data into decision-ready agents, powered by whichever model comes next or fits the workflow—transparent, proven, and purpose-built.' }],
    cta: [{ text: 'Schedule a Demo', url: '/demo', variant: 'arrow' }],
  },
  mission: {
    steps: [
      { title: 'VAHUE AGENTIC WORKFLOW SOLUTIONS', description: [{ style: 'h4', text: 'Vahue’s agentic workflow solutions are designed for trust, transparency and decision advantage.' }, { style: 'h4', text: 'Vahue agents modernize your most critical workflows. Vahue is deployed across claims, finance, and care with built-in AI Test & Evaluation to ensure outputs are secure, auditable, and decision-ready.' }], image: { path: `${DIR}/fly1.webp`, alt: '', width: 1758, height: 1617 } },
      { title: 'Vahue Knowledge Agents', description: [{ style: 'h4', text: 'Vahue Knowledge Agents are agentic AI that works with any data, model, or infrastructure. They learn how your organization thinks and decides, embedding your policies into AI agents that produce audit-ready analysis, reports, briefs, and presentations.' }], image: { path: `${DIR}/fly2.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/genai-portfolio' }] },
      { title: 'Vahue Context Engine', description: [{ style: 'h4', text: 'Poor quality data fails the workflow. Vahue transforms claims, invoices, KYC files, clinical notes, audio, text, and more into clean, checked context, 40% faster than alternatives with expert human reviewers. And you own 100% of your data and insights.' }], image: { path: `${DIR}/fly3.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/data-engine' }] }, // PLACEHOLDER (40% faster)
      { title: 'Vahue Test & Evaluation (T&E) Engine', description: [{ style: 'h4', text: 'AI is not optimized for regulated work. Vahue is AI’s judgment layer, ensuring the safety, compliance, and reliability of AI-informed decisions, so teams can de-risk and trust AI.' }], image: { path: `${DIR}/fly4.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/evaluation/public-sector' }] },
    ],
  },
  customers: {
    heading: 'Real Customers. Business Critical Work.',
    posts: [
      { title: 'AI Claims Intake for a Mid-market Insurer’s Program', url: '/blog', image: `${DIR}/rc1-filled.webp`, category: INSURANCE }, // PLACEHOLDER
      { title: 'Vahue Creates an Insurer’s First AI Scorecard', url: '/blog', image: `${DIR}/rc2-filled.webp`, category: INSURANCE }, // PLACEHOLDER
      { title: 'Agentic Alerting Accelerates Clinical Referral Decisions', url: '/blog', image: `${DIR}/rc3-filled.webp`, category: HEALTHCARE }, // PLACEHOLDER
      { title: 'AI-powered KYC Review for a Lender and a Payments Group', url: '/blog', image: `${DIR}/rc4-filled.webp`, category: FINANCE }, // PLACEHOLDER
    ],
  },
  howToBuy: {
    heading: 'How to Buy Vahue',
    body: [{ children: [{ text: 'Vahue products are authorized for ' }, { text: 'SOC 2, HIPAA, ISO 27001', strong: true }, { text: ', and ISO 42001 environments; CSA STAR and EU AI Act are covered.' }] }],
    cta: { text: 'Contact Us', url: '/demo' },
    image: { path: `${DIR}/buy-filled.webp`, alt: 'A city skyline at dusk', width: 1920, height: 468 },
    items: [
      { key: 'hb-direct', question: 'Buy Direct', answer: [{ text: 'Vahue is a forward-deployed AI team backed by a recorded baseline, and also available through a two-week Audit, a Pilot on your own cases, and a monthly Operate plan.' }] },
      { key: 'hb-risk', question: 'Vendor Risk Review', answer: [{ text: 'Vahue products have been pre-assessed for third-party risk and are available via a frictionless, pre-negotiated MSA and DPA or through your procurement portal.' }] }, // PLACEHOLDER
      { key: 'hb-partners', question: 'Partners', answer: [{ text: 'Vahue is available through systems integrators, managed service providers, and consulting partners across finance, insurance, and healthcare.' }] }, // PLACEHOLDER
      { key: 'hb-cloud', question: 'Cloud Marketplaces', answer: [{ text: 'Vahue is cloud-agnostic and supports all hyperscalers and private on-prem environments.' }] },
    ],
  },
  resources: {
    heading: [{ text: 'Resources' }],
    posts: [
      { _key: 'res1', title: 'Read the Agentic Compliance eBook', url: '/blog', image: `${DIR}/res1-filled.webp`, alt: 'Two colleagues working on laptops', category: RESEARCH, variantOverride: 'caption' }, // PLACEHOLDER
      { _key: 'res2', title: 'Read the Agentic Workflows Whitepaper', url: '/blog', image: `${DIR}/res2-filled.webp`, alt: 'An office staircase', category: REGULATED, imageGradientOverlay: true, textColor: 'light', variantOverride: 'overlay' }, // PLACEHOLDER
      { _key: 'res3', title: 'Watch Demos & Videos', url: '/blog', image: `${DIR}/res3-filled.webp`, alt: 'An office interior', category: REGULATED, imageGradientOverlay: true, textColor: 'light', variantOverride: 'overlay' }, // PLACEHOLDER
    ],
  },
  prefooter: {
    headline: 'Schedule a private demo with a compliance expert.',
    cta: { text: 'Speak with an expert', url: '/demo' },
    image: { path: `${DIR}/prefooter-filled.webp`, alt: '', width: 1920, height: 810 },
  },
}
