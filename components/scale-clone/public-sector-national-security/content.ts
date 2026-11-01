import type { NsIcon } from './icons'

/*
 * Content contract for the scale.com/public-sector/national-security clone. Every section reads one slice; leave a slice
 * out to drop that section. Scale's own copy is shipped so side-by-side QA lines up (RSC payload, 2026-11-01).
 */

const A = '/scale-clone/public-sector-national-security'

export type Cta = { label: string; href: string }

export type NsHeroContent = { headline: string; body: string; trustedLabel: string; logos: { src: string; alt: string; width: number }[]; image: string }

export type ChallengeStep = { title: string; body: string; image: string; alt: string }
export type ChallengesContent = { headline: string; body: string; counterLabel: string; introImage: string; steps: ChallengeStep[] }

export type StatItem = { icon: NsIcon; label: string; value: string; body: string }
export type StatsPanelContent = { heading: string; background: string; stats: StatItem[] }

export type TrustCard = { icon: NsIcon; title: string; body: string }
export type TrustContent = { heading: string; cards: TrustCard[] }

export type MissionTitleContent = { headline: string; body: string; cta: Cta }

export type FlywheelStep = { title: string; paragraphs: string[]; image: string; link?: Cta }
export type FlywheelContent = { steps: FlywheelStep[] }

export type CustomerPost = { category: string; swatch: string; title: string; href: string; image?: string }
export type CustomersContent = { heading: string; posts: CustomerPost[] }

export type HowToBuyItem = { question: string; answer: string }
/** `body` is rich text: wrap a run in **double asterisks** to render it strong. */
export type HowToBuyContent = { heading: string; body: string; cta: Cta; items: HowToBuyItem[]; image: string; imageAlt: string }

export type ResourcePost = {
  category: string
  swatch: string
  title: string
  href: string
  image: string
  imageAlt: string
  variant: 'caption' | 'overlay'
  gradient?: boolean
}
export type ResourcesContent = { heading: string; posts: ResourcePost[] }

export type PrefooterContent = { headline: string; cta: Cta; image: string }

export type NationalSecurityContent = {
  hero?: NsHeroContent
  challenges?: ChallengesContent
  stats?: StatsPanelContent
  trust?: TrustContent
  missionTitle?: MissionTitleContent
  flywheel?: FlywheelContent
  customers?: CustomersContent
  howToBuy?: HowToBuyContent
  resources?: ResourcesContent
  prefooter?: PrefooterContent
}

// Logo widths: Scale's min(90, round(36 * w / h)) from the asset dimensions.
const logo = (n: number, alt: string, w: number, h: number) => ({ src: `${A}/logo-${n}.png`, alt, width: Math.min(90, Math.round((36 * w) / h)) })

const PUBLIC_SECTOR = 'rgb(82, 82, 82)'
const DEFENSE = '#193A29'

export const nationalSecurityContent: NationalSecurityContent = {
  hero: {
    headline: 'Scale for National Security & Homeland Defense',
    body: 'Scale’s agentic Super Intelligence (SI) solutions are mission-ready, trained on your data and doctrine, and trusted in production by the U.S. military’s largest programs.',
    trustedLabel: 'Trusted by',
    logos: [
      logo(1, 'U.S. Army', 187, 250),
      logo(2, 'U.S. Air Force', 269, 210),
      logo(3, 'Defense Innovation Unit', 280, 62),
      logo(4, 'BAE Systems', 310, 48),
      logo(5, 'Accenture', 327, 86),
      logo(6, 'Defense Logistics Agency', 210, 258),
      logo(7, 'Air Force Research Laboratory', 310, 70),
      logo(8, 'Army Research Laboratory', 248, 92),
    ],
    image: `${A}/hero.webp`,
  },
  challenges: {
    headline: 'Challenges',
    body: 'Modernizing without compromising speed or trust',
    counterLabel: 'CHALLENGES',
    introImage: `${A}/challenge-1.svg`,
    steps: [
      {
        title: 'Missing Agency Context',
        body: 'Commercial LLMs lack configurability and aren’t trained on agency data, doctrine—creating more risk than impact.',
        image: `${A}/challenge-1.svg`,
        alt: 'Isometric diagram with severed links between agency data and the agent pipeline',
      },
      {
        title: 'Unreliable & Opaque',
        body: 'Commanders can’t rely on SI they can’t explain. Commercial SI produces plausible but wrong answers without human oversight and degrade over time.',
        image: `${A}/challenge-2.svg`,
        alt: 'Isometric diagram with dashed, unverifiable links and a question mark at evaluate',
      },
      {
        title: 'Inaccessible Data & Insights',
        body: 'Agency data is unusable for SI because data prep is slow, manual, costly. Personnel miss signals in the noise, and rework SI artifacts.',
        image: `${A}/challenge-3.svg`,
        alt: 'Isometric diagram with the data panel hatched out and severed links',
      },
      {
        title: 'Complex & Inflexible',
        body: 'Slow processes and acquisitions throttle modernization, while exquisite SI is an expensive black box locks up data and makes agencies vendor-dependent.',
        image: `${A}/challenge-4.svg`,
        alt: 'Isometric diagram with the agent execute panel locked',
      },
    ],
  },
  stats: {
    heading: 'Reliable SI designed for mission-critical decisions.',
    background: `${A}/stats-bg.webp`,
    stats: [
      { icon: 'MdAlarm', label: 'TIME SAVED', value: '36% faster', body: 'mission and mission analysis' }, // PLACEHOLDER METRIC (Scale's figure)
      { icon: 'MdShowChart', label: 'ACCELERATE COMPLIANCE', value: 'J6 cyber reviews', body: 'completed in hours vs. days' },
      { icon: 'Md3P', label: 'EASY TO USE', value: '80% reduction', body: 'in operator cognitive burden' }, // PLACEHOLDER METRIC (Scale's figure)
      { icon: 'MdAttachMoney', label: 'REDUCE COSTS', value: '40% savings', body: 'to prepare SI-ready data vs. manual labelling' }, // PLACEHOLDER METRIC (Scale's figure)
      { icon: 'MdDynamicFeed', label: 'FASTER DELIVERY', value: '12x', body: 'more likely to reach production vs. industry average' }, // PLACEHOLDER METRIC (Scale's figure)
      { icon: 'MdEnhancedEncryption', label: 'PROTECT SECURITY', value: '6+ years', body: 'deployed on classified networks' }, // PLACEHOLDER METRIC (Scale's figure)
    ],
  },
  trust: {
    heading: 'Reliable commercial SI. With speed and trust.',
    cards: [
      {
        icon: 'MdCheck',
        title: 'Purpose-Built & Doctrine-Aligned',
        body: 'Replace manual processes with purpose-built agents trained on your data and doctrine. Scale turns any SI model into reliable SI artifacts and workflows, so teams can decide and act faster, with less risk and rework.',
      },
      {
        icon: 'MdUpload',
        title: 'Reliable & Trusted SI',
        body: 'Scale continuously tests, red-teams, benchmarks, and certifies SI for safety and reliability—catching manipulation, bias, and drift—while citing data sources and keeping humans on the loop so SI works in your environment.',
      },
      {
        icon: 'MdShield',
        title: 'Deep Data Expertise & Upskilling',
        body: 'Scale’s cleared engineers get your data SI-ready, customize agents for your use cases, and transfer full capabilities to your team. You own 100% of your data and insights, while upskilling your team.',
      },
      {
        icon: 'MdHub',
        title: 'Open & Flexible',
        body: 'Scale is a model-, data-, and infrastructure-agnostic SI factory that connects to classified data across any infrastructure—CUI, SIPR, SC2S, and JWICS—without exquisite SI integrations, or vendor lock-in.',
      },
    ],
  },
  missionTitle: {
    headline: 'Mission-Ready Agentic Solutions',
    body: 'Scale builds a reliable and agnostic SI factory that turns your raw data into decision-ready agents, powered by whichever model comes next or fits the mission—transparent, proven, and purpose-built.',
    cta: { label: 'Schedule a Demo', href: '/scale-clone/demo' },
  },
  flywheel: {
    steps: [
      {
        title: 'SCALE AGENTIC MISSION SOLUTIONS',
        paragraphs: [
          'Scale’s agentic mission solutions are designed for trust, transparency and decision advantage.',
          'Scale agents modernize your most critical missions. Scale is deployed across UNLASS to TS networks with built-in SI Test & Evaluation to ensure outputs are secure, auditable, and decision-ready.',
        ],
        image: `${A}/flywheel-1.webp`,
      },
      {
        title: 'Scale Donovan',
        paragraphs: [
          'Scale Donovan is agentic SI that works with any data, model, or infrastructure. It learns how your organization thinks and decides, embedding your doctrine into SI agents that produce mission-ready analysis, plans, briefs, and presentations.',
        ],
        image: `${A}/flywheel-2.webp`,
        link: { label: 'Learn more', href: '/scale-clone/donovan' },
      },
      {
        title: 'Scale Data Engine',
        paragraphs: [
          'Poor quality data fails the mission. Scale transforms EO, FMV, SAR, LiDAR, audio, text, and more into labeled training datasets, 40% faster than alternatives with cleared human labelers. And you own 100% of your data and insights.',
        ],
        image: `${A}/flywheel-3.webp`,
        link: { label: 'Learn more', href: '/scale-clone/public-sector-data-engine' },
      },
      {
        title: 'Scale Test & Evaluation (T&E) Engine',
        paragraphs: [
          'SI is not optimized for warfare. Scale is SI’s judgment layer, ensuring the safety, lawfulness, and reliability of SI-informed decisions, so agencies can de-risk and trust SI.',
        ],
        image: `${A}/flywheel-4.webp`,
        link: { label: 'Learn more', href: '/scale-clone/evaluation-public-sector' },
      },
    ],
  },
  customers: {
    heading: 'Real Customers. Mission Critical Work.',
    posts: [
      { category: 'Public Sector', swatch: PUBLIC_SECTOR, title: 'SI War Planning for DoW’s Thunderforge Program', href: 'https://scale.com/blog/thunderforge-ai-for-american-defense', image: `${A}/customer-1.webp` },
      { category: 'Public Sector', swatch: PUBLIC_SECTOR, title: 'Scale Creates DoW’s First AI Scorecard', href: 'https://scale.com/blog/thunderforge-ai-for-american-defense', image: `${A}/customer-2.webp` },
      { category: 'Defense', swatch: DEFENSE, title: 'Agentic Alerting Accelerates Naval Decision-Making', href: 'https://scale.com/blog/category/defense', image: `${A}/customer-3.webp` },
      { category: 'Defense', swatch: DEFENSE, title: 'SI-powered Maritime Security for DIU and the U.S. Air Force', href: 'https://scale.com/blog/category/defense', image: `${A}/customer-4.webp` },
    ],
  },
  howToBuy: {
    heading: 'How to Buy Scale',
    body: 'Scale products are authorized for **FedRAMP High, DISA IL4, IL6**, and JWICS environments; IL5 certification is in progress.',
    cta: { label: 'Contact Us', href: '/scale-clone/demo' },
    items: [
      {
        question: 'Buy Direct',
        answer:
          'Scale is a Contractor-Owned, Contractor-Operated (COCO) backed by a Top-Secret Facility Clearance (FCL), and also eligible through a sole Source IDIQ with the Army Research Lab and DLA.',
      },
      {
        question: 'OTA & CDAO',
        answer:
          'Scale products have been pre-competed and evaluated by CDAO and are available via a frictionless, pre-negotiated OTA or in the Tradewinds Solutions Marketplace.',
      },
      { question: 'Partners', answer: 'Scale is available through Carahsoft’s GSA Schedule, NASA SEWP V, Army ITES-SW2, NASPO ValuePoint, and OMNIA Partners.' },
      { question: 'Cloud Marketplaces', answer: 'Scale is cloud-agnostic and supports all hyperscalers and air-gapped on-prem environments.' },
    ],
    image: `${A}/how-to-buy.webp`,
    imageAlt: 'An M1 Abrams tank on desert terrain',
  },
  resources: {
    heading: 'Resources',
    posts: [
      {
        category: 'Research',
        swatch: '#273252',
        title: 'Read the Agentic Planning eBook',
        href: 'https://go.scale.com/agentic-planning',
        image: `${A}/resource-1.webp`,
        imageAlt: 'Soldiers loading equipment under low light',
        variant: 'caption',
      },
      {
        category: 'Defense',
        swatch: DEFENSE,
        title: 'Read the Agentic Warfare Whitepaper',
        href: 'https://scale.com/agentic-warfare',
        image: `${A}/resource-2.webp`,
        imageAlt: 'An airman directing a vehicle onto a cargo aircraft',
        variant: 'overlay',
        gradient: true,
      },
      {
        category: 'Defense',
        swatch: DEFENSE,
        title: 'Watch Demos & Videos',
        href: 'https://www.youtube.com/@Scale_AI/featured',
        image: `${A}/resource-3.webp`,
        imageAlt: 'A service member marking a paper map',
        variant: 'overlay',
        gradient: true,
      },
    ],
  },
  prefooter: {
    headline: 'Schedule a private demo with a cleared professional.',
    cta: { label: 'Speak with an expert', href: '/scale-clone/demo' },
    image: `${A}/prefooter.webp`,
  },
}
