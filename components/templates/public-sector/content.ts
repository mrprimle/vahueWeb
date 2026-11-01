// Content contract for the scale.com/public-sector layout. `scalePublicSectorContent` holds Scale's own copy (read from
// the live page 2026-11-01) so QA lines up 1:1; a Vahue page passes its own object.
import type { FeatureIconName } from './icons'

export type Cta = { label: string; href: string }
export type Img = { src: string; width: number; height: number; alt?: string }

export type PublicSectorContent = {
  hero: { headline: string; body: string; image: string; primary: Cta }
  /** LogoCloud slots (Scale: 7 customer logos at their own sizes). Without `src` a same-size neutral tile stands in. */
  logos: { src?: string; alt: string; width: number; height: number }[]
  useCases: {
    eyebrow: string
    title: string
    body: string
    cards: { title: string; image: Img; bullets: string[] }[]
  }
  capabilities: {
    eyebrow: string
    title: string
    body: string
    /** ChecklistWithMedia rows; the first has the media on the left, the second on the right (as on Scale). */
    rows: { heading: string; image: Img; items: { title: string; body: string }[]; cta: Cta }[]
  }
  whyScale: { eyebrow: string; title: string; body: string; items: { icon: FeatureIconName; title: string; body: string }[] }
  banner: { title: string; body: string; image: Img; cta: Cta }
  resources: { eyebrow: string; title: string; items: { tag: string; title: string; image: string; href: string }[] }
  prefooter: { headline: string; image: string; primary: Cta; secondary: Cta }
}

export const ASSET = '/templates/public-sector'

export const scalePublicSectorContent: PublicSectorContent = {
  hero: {
    headline: 'US Public Sector',
    body: 'Scale powers key computer vision and agentic Super Intelligence (SI) and data programs across the Department of War, Intelligence Community, and Federal Civilian agencies.',
    image: `${ASSET}/hero.webp`,
    primary: { label: 'Book a Demo', href: '/contact/' },
  },
  logos: [
    { alt: 'White House', width: 65, height: 45 },
    { alt: 'US Army', width: 48, height: 63 },
    { alt: 'US Air Force', width: 68, height: 53 },
    { alt: 'CDAO', width: 79, height: 22 },
    { alt: 'Defense Innovation Unit', width: 70, height: 16 },
    { alt: 'Cohere', width: 79, height: 14 },
    { alt: 'Accenture', width: 82, height: 22 },
  ],
  useCases: {
    eyebrow: 'Use Cases',
    title: 'Transforming Public Service with Agentic Solutions',
    body: 'Scale provides solutions to fine-tune computer vision algorithms and deploy SI agents designed for public sector missions.',
    cards: [
      {
        title: 'Acquisition, Procurement & Contracting',
        image: { src: `${ASSET}/img-acquisition-procurement.webp`, width: 480, height: 360, alt: 'Acquisition, Procurement & Contracting' },
        bullets: [
          'Acquisition, and Compliance',
          'Procurement and lifecycle management',
          'Contract management, fraud investigation',
          'Budget analysis, UFR funding allocation',
        ],
      },
      {
        title: 'Mission Planning & Operations',
        image: { src: `${ASSET}/img-mission-planning.webp`, width: 480, height: 360, alt: 'Mission Planning & Operations' },
        bullets: [
          'COA (Course of Action) Development',
          'Planning exercises, wargaming',
          'Command and Control, GIDE, JADC2, Air operations command anywhere',
          'Ground Autonomy',
        ],
      },
      {
        title: 'Intelligence, Surveillance, and Reconnaissance (ISR)',
        image: { src: `${ASSET}/img-isr.webp`, width: 480, height: 360, alt: 'ISR' },
        bullets: [
          'Multi-int analysis, all source, economic analysis, intelligence reporting',
          'AOR (Area of Responsibility) Analysis',
          'Threat assessment & targeting support',
        ],
      },
      {
        title: 'Cyber and Security Operations',
        image: { src: `${ASSET}/img-cyber-security.webp`, width: 480, height: 360, alt: 'Cyber and Security Operations' },
        bullets: ['Defensive Cyber Ops', 'Threat Detection', 'Perimeter Security', 'Personnel screening'],
      },
      {
        title: 'Enterprise Support & Back Office',
        image: { src: `${ASSET}/img-enterprise-support.webp`, width: 480, height: 360, alt: 'Enterprise Support & Back Office' },
        bullets: [
          'Logistics & supply chain management',
          'Human resources & personnel management',
          'Document & knowledge support',
          'Legal & Compliance',
          'Training & organizational readiness',
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Advanced, Mission-Ready SI Solutions',
    body: 'Commercially-proven, government tested capabilities to power SI Agents and Computer Vision models',
    rows: [
      {
        heading: 'Super Intelligence Agents',
        image: { src: `${ASSET}/ai-agents.webp`, width: 644, height: 430, alt: 'Super Intelligence Agents' },
        items: [
          { title: 'Mission-built for decision advantage', body: 'Support every level of operations for dominant decision advantage with minimal intervention.' },
          {
            title: 'Scalable multi-agent architecture',
            body: 'Designed to interact and scale with one another, including decomposable reasoning and integration with external data and systems.',
          },
          { title: 'Multi-classification access', body: 'Access leading commercial and fine-tuned models on CUI, SIPR, and TS.' },
        ],
        cta: { label: 'Learn more', href: '/donovan/' },
      },
      {
        heading: 'Computer Vision',
        image: { src: `${ASSET}/computer-vision.webp`, width: 662, height: 592, alt: 'Computer Vision' },
        items: [
          { title: 'Advanced Agentic SI Software', body: 'Unified platform for end-to-end ML Ops.' },
          {
            title: 'State-of-the-Art Machine Learning',
            body: 'Leverage machine learning strategies to accelerate and strategically approach data annotation.',
          },
          {
            title: 'Human-in-the-Loop Expertise',
            body: 'Leverage subject matter experts with decades of experience and clearance for annotation strategies.',
          },
        ],
        cta: { label: 'Learn more', href: '/public-sector-data-engine/' },
      },
    ],
  },
  whyScale: {
    eyebrow: 'Why Scale',
    title: 'Proven Performance',
    body: 'Achieve model precision and accuracy with high-quality data and combine with advanced SI software and subject matter expertise.',
    items: [
      {
        icon: 'psychology',
        title: 'SI-native',
        body: 'Scale partners with leading SI frontier labs and Fortune 500 enterprises to accelerate their SI initiatives - bringing the same expertise and rigor to our work in defense.',
      },
      {
        icon: 'verified',
        title: 'Proven experience',
        body: 'DoW organizations including the US Air Force and DIU trust Scale with their most forward leaning SI initiatives including Thunderforge and Autonomous Perimeter Security.',
      },
      {
        icon: 'groupAdd',
        title: 'Software and People',
        body: 'Scale embeds our solutions with human expertise to ensure accuracy, adaptability, mission readiness, and meet the unique demands of defense operations.',
      },
    ],
  },
  banner: {
    title: 'Scale is building the SI workforce of the future in St. Louis.',
    body: 'Mission-built to support every level of operations for dominant decision advantage with minimal intervention.',
    image: { src: `${ASSET}/st-louis.webp`, width: 560, height: 378, alt: 'St. Louis Arc' },
    cta: { label: 'Learn more', href: '/' },
  },
  resources: {
    eyebrow: 'RESOURCES',
    title: 'Learn More About Our Public Sector Capabilities',
    items: [
      { tag: 'Customer Blog', title: 'Machine Perception for Human Protection: Creating Vision Algorithms to Augment Perimeter Security' },
      { tag: 'Blog', title: 'Introducing Thunderforge: SI for American Defense' },
      { tag: 'Blog', title: 'Scale & Center for Strategic and International Studies (CSIS) Introduce Foreign Policy Decision Benchmark' },
      { tag: 'Blog', title: 'Introducing the Scale and University of Missouri - St. Louis Geospatial Collaborative' },
      { tag: 'Blog', title: "Scale's Proposal for the U.S. AI Action Plan" },
      { tag: 'Blog', title: 'Scale SI products approved for purchase on AWS Marketplace for the U.S. National Security Community' },
      { tag: 'Blog', title: 'Scale Public Sector: Building on Our Progress in 2025' },
      { tag: 'Blog', title: 'Defense Llama: The LLM Purpose-Built for American National Security' },
      { tag: 'Blog', title: 'Scale chosen by the U.S. Army for Robotic Combat Vehicle Program' },
    ].map((r, i) => ({ ...r, image: `${ASSET}/resource-0${i + 1}.png`, href: '/blog/' })),
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    // Same /static/img/reskin/prefooter.jpg as evaluation-public-sector; reused from that clone's folder to save disk.
    image: '/templates/evaluation-public-sector/prefooter.jpg',
    primary: { label: 'Book a Demo', href: '/contact/' },
    secondary: { label: 'Build SI', href: '/data-engine/' },
  },
}
