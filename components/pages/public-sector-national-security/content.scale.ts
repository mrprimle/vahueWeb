// Scale's original strings for /public-sector/national-security, from the page's RSC payload. The page renders content.ts.
import type { NationalSecurityContent } from './types'

const DIR = '/public-sector-national-security'
const DEFENSE = { name: 'Defense', color: { hex: '#193A29' } }
const PUBLIC_SECTOR = { name: 'Public Sector' }
const RESEARCH = { name: 'Research', color: { hex: '#273252' } }

export const content: NationalSecurityContent = {
  meta: { title: 'National Security & Homeland Defense | Scale AI', description: 'Scale’s agentic Super Intelligence (SI) solutions are mission-ready, trained on your data and doctrine, and trusted in production by the U.S. military’s largest programs.' },
  hero: {
    headline: 'Scale for National Security & Homeland Defense',
    subtitle: [{ text: 'Scale’s agentic Super Intelligence (SI) solutions are mission-ready, trained on your data and doctrine, and trusted in production by the U.S. military’s largest programs.' }],
    trustedBy: 'Trusted by',
    image: { path: `${DIR}/hero.webp`, alt: 'U.S. defense and national security imagery', width: 2029, height: 1174 },
    logos: [
      { key: 'army', alt: 'U.S. Army', src: `${DIR}/logo1.webp`, width: 27 },
      { key: 'af', alt: 'U.S. Air Force', src: `${DIR}/logo2.webp`, width: 46 },
      { key: 'diu', alt: 'Defense Innovation Unit', src: `${DIR}/logo3.webp`, width: 90 },
      { key: 'bae', alt: 'BAE Systems', src: `${DIR}/logo4.webp`, width: 90 },
      { key: 'acc', alt: 'Accenture', src: `${DIR}/logo5.webp`, width: 90 },
      { key: 'dla', alt: 'Defense Logistics Agency', src: `${DIR}/logo6.webp`, width: 29 },
      { key: 'afrl', alt: 'Air Force Research Laboratory', src: `${DIR}/logo7.webp`, width: 90 },
      { key: 'arl', alt: 'Army Research Laboratory', src: `${DIR}/logo8.webp`, width: 90 },
    ],
  },
  challenges: {
    counterLabel: 'CHALLENGES',
    headline: 'Challenges',
    body: [{ text: 'Modernizing without compromising speed or trust' }],
    image: { path: `${DIR}/ch1.svg`, alt: '', width: 922, height: 470 },
    steps: [
      { title: 'Missing Agency Context', description: [{ text: 'Commercial LLMs lack configurability and aren’t trained on agency data, doctrine—creating more risk than impact.' }], image: { path: `${DIR}/ch1.svg`, alt: 'Isometric diagram with severed links between agency data and the agent pipeline', width: 922, height: 470 } },
      { title: 'Unreliable & Opaque', description: [{ text: 'Commanders can’t rely on SI they can’t explain. Commercial SI produces plausible but wrong answers without human oversight and degrade over time.' }], image: { path: `${DIR}/ch2.svg`, alt: 'Isometric diagram with dashed, unverifiable links and a question mark at evaluate', width: 922, height: 470 } },
      { title: 'Inaccessible Data & Insights', description: [{ text: 'Agency data is unusable for SI because data prep is slow, manual, costly. Personnel miss signals in the noise, and rework SI artifacts.' }], image: { path: `${DIR}/ch3.svg`, alt: 'Isometric diagram with the data panel hatched out and severed links', width: 922, height: 470 } },
      { title: 'Complex & Inflexible', description: [{ text: 'Slow processes and acquisitions throttle modernization, while exquisite SI is an expensive black box locks up data and makes agencies vendor-dependent.' }], image: { path: `${DIR}/ch4.svg`, alt: 'Isometric diagram with the agent execute panel locked', width: 922, height: 470 } },
    ],
  },
  stats: {
    heading: 'Reliable SI designed for mission-critical decisions.',
    background: { path: `${DIR}/stats-bg.webp`, alt: '', width: 3040, height: 1802 },
    items: [
      { icon: 'MdAlarm', label: 'TIME SAVED', value: '36% faster', description: 'mission and mission analysis' },
      { icon: 'MdShowChart', label: 'ACCELERATE COMPLIANCE', value: 'J6 cyber reviews', description: 'completed in hours vs. days' },
      { icon: 'Md3P', label: 'EASY TO USE', value: '80% reduction', description: 'in operator cognitive burden' },
      { icon: 'MdAttachMoney', label: 'REDUCE COSTS', value: '40% savings', description: 'to prepare SI-ready data vs. manual labelling' },
      { icon: 'MdDynamicFeed', label: 'FASTER DELIVERY', value: '12x', description: 'more likely to reach production vs. industry average' },
      { icon: 'MdEnhancedEncryption', label: 'PROTECT SECURITY', value: '6+ years', description: 'deployed on classified networks' },
    ],
  },
  trust: {
    heading: 'Reliable commercial SI. With speed and trust.',
    cards: [
      { icon: 'MdCheck', title: 'Purpose-Built & Doctrine-Aligned', description: [{ text: 'Replace manual processes with purpose-built agents trained on your data and doctrine. Scale turns any SI model into reliable SI artifacts and workflows, so teams can decide and act faster, with less risk and rework.' }] },
      { icon: 'MdUpload', title: 'Reliable & Trusted SI', description: [{ text: 'Scale continuously tests, red-teams, benchmarks, and certifies SI for safety and reliability—catching manipulation, bias, and drift—while citing data sources and keeping humans on the loop so SI works in your environment.' }] },
      { icon: 'MdShield', title: 'Deep Data Expertise & Upskilling', description: [{ text: 'Scale’s cleared engineers get your data SI-ready, customize agents for your use cases, and transfer full capabilities to your team. You own 100% of your data and insights, while upskilling your team.' }] },
      { icon: 'MdHub', title: 'Open & Flexible', description: [{ text: 'Scale is a model-, data-, and infrastructure-agnostic SI factory that connects to classified data across any infrastructure—CUI, SIPR, SC2S, and JWICS—without exquisite SI integrations, or vendor lock-in.' }] },
    ],
  },
  missionTitle: {
    headline: 'Mission-Ready Agentic Solutions',
    subtitle: [{ text: 'Scale builds a reliable and agnostic SI factory that turns your raw data into decision-ready agents, powered by whichever model comes next or fits the mission—transparent, proven, and purpose-built.' }],
    cta: [{ text: 'Schedule a Demo', url: '/demo', variant: 'arrow' }],
  },
  mission: {
    steps: [
      { title: 'SCALE AGENTIC MISSION SOLUTIONS', description: [{ style: 'h4', text: 'Scale’s agentic mission solutions are designed for trust, transparency and decision advantage.' }, { style: 'h4', text: 'Scale agents modernize your most critical missions. Scale is deployed across UNLASS to TS networks with built-in SI Test & Evaluation to ensure outputs are secure, auditable, and decision-ready.' }], image: { path: `${DIR}/fly1.webp`, alt: '', width: 1758, height: 1617 } },
      { title: 'Scale Donovan', description: [{ style: 'h4', text: 'Scale Donovan is agentic SI that works with any data, model, or infrastructure. It learns how your organization thinks and decides, embedding your doctrine into SI agents that produce mission-ready analysis, plans, briefs, and presentations.' }], image: { path: `${DIR}/fly2.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/donovan' }] },
      { title: 'Scale Data Engine', description: [{ style: 'h4', text: 'Poor quality data fails the mission. Scale transforms EO, FMV, SAR, LiDAR, audio, text, and more into labeled training datasets, 40% faster than alternatives with cleared human labelers. And you own 100% of your data and insights.' }], image: { path: `${DIR}/fly3.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/public-sector-data-engine' }] },
      { title: 'Scale Test & Evaluation (T&E) Engine', description: [{ style: 'h4', text: 'SI is not optimized for warfare. Scale is SI’s judgment layer, ensuring the safety, lawfulness, and reliability of SI-informed decisions, so agencies can de-risk and trust SI.' }], image: { path: `${DIR}/fly4.webp`, alt: '', width: 1758, height: 1617 }, link: [{ text: 'Learn more', url: '/evaluation/public-sector' }] },
    ],
  },
  customers: {
    heading: 'Real Customers. Mission Critical Work.',
    posts: [
      { title: 'SI War Planning for DoW’s Thunderforge Program', url: '/blog/thunderforge-ai-for-american-defense', image: `${DIR}/rc1.webp`, category: PUBLIC_SECTOR },
      { title: 'Scale Creates DoW’s First AI Scorecard', url: '/blog/thunderforge-ai-for-american-defense', image: `${DIR}/rc2.webp`, category: PUBLIC_SECTOR },
      { title: 'Agentic Alerting Accelerates Naval Decision-Making', url: '/blog/category/defense', image: `${DIR}/rc3.webp`, category: DEFENSE },
      { title: 'SI-powered Maritime Security for DIU and the U.S. Air Force', url: '/blog/category/defense', image: `${DIR}/rc4.webp`, category: DEFENSE },
    ],
  },
  howToBuy: {
    heading: 'How to Buy Scale',
    body: [{ children: [{ text: 'Scale products are authorized for ' }, { text: 'FedRAMP High, DISA IL4, IL6', strong: true }, { text: ', and JWICS environments; IL5 certification is in progress.' }] }],
    cta: { text: 'Contact Us', url: '/demo' },
    image: { path: `${DIR}/buy.webp`, alt: 'An M1 Abrams tank on desert terrain', width: 2954, height: 720 },
    items: [
      { key: 'hb-direct', question: 'Buy Direct', answer: [{ text: 'Scale is a Contractor-Owned, Contractor-Operated (COCO) backed by a Top-Secret Facility Clearance (FCL), and also eligible through a sole Source IDIQ with the Army Research Lab and DLA.' }] },
      { key: 'hb-ota', question: 'OTA & CDAO', answer: [{ text: 'Scale products have been pre-competed and evaluated by CDAO and are available via a frictionless, pre-negotiated OTA or in the Tradewinds Solutions Marketplace.' }] },
      { key: 'hb-partners', question: 'Partners', answer: [{ text: 'Scale is available through Carahsoft’s GSA Schedule, NASA SEWP V, Army ITES-SW2, NASPO ValuePoint, and OMNIA Partners.' }] },
      { key: 'hb-cloud', question: 'Cloud Marketplaces', answer: [{ text: 'Scale is cloud-agnostic and supports all hyperscalers and air-gapped on-prem environments.' }] },
    ],
  },
  resources: {
    heading: [{ text: 'Resources' }],
    posts: [
      { _key: 'res1', title: 'Read the Agentic Planning eBook', url: 'https://go.scale.com/agentic-planning', image: `${DIR}/res1.webp`, alt: 'Soldiers loading equipment under low light', category: RESEARCH, variantOverride: 'caption' },
      { _key: 'res2', title: 'Read the Agentic Warfare Whitepaper', url: '/agentic-warfare', image: `${DIR}/res2.webp`, alt: 'An airman directing a vehicle onto a cargo aircraft', category: DEFENSE, imageGradientOverlay: true, textColor: 'light', variantOverride: 'overlay' },
      { _key: 'res3', title: 'Watch Demos & Videos', url: 'https://www.youtube.com/@Scale_AI/featured', image: `${DIR}/res3.webp`, alt: 'A service member marking a paper map', category: DEFENSE, imageGradientOverlay: true, textColor: 'light', variantOverride: 'overlay' },
    ],
  },
  prefooter: {
    headline: 'Schedule a private demo with a cleared professional.',
    cta: { text: 'Speak with an expert', url: '/demo' },
    image: { path: `${DIR}/prefooter.webp`, alt: '', width: 2944, height: 1242 },
  },
}
