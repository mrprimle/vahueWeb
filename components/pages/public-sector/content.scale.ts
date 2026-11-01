// Scale's strings for https://scale.com/public-sector, from the page's RSC payload.
import type { PublicSectorContent } from './types'

const A = '/public-sector'
const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: PublicSectorContent = {
  meta: {
    title: 'Scale is the Super Intelligence (SI) partner for the US Public Sector | Scale',
    description: 'Scale provides solutions to fine-tune computer vision algorithms and AI/SI systems designed for public sector missions.',
  },
  hero: {
    headline: 'US Public Sector',
    body: 'Scale powers key computer vision and agentic Super Intelligence (SI) and data programs across the Department of War, Intelligence Community, and Federal Civilian agencies.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/hero.webp` },
  },
  logos: {
    items: [
      { src: `${A}/logos/white-house.svg`, alt: 'White House', width: 65, height: 45 },
      { src: `${A}/logos/usarmy.svg`, alt: 'US Army', width: 48, height: 63 },
      { src: `${A}/logos/us-air-force.svg`, alt: 'US Air Force', width: 68, height: 53 },
      { src: `${A}/logos/cdao.svg`, alt: 'CDAO', width: 79, height: 22 },
      { src: `${A}/logos/defense-innovation-unit.svg`, alt: 'Defense Innovation Unit', width: 70, height: 16 },
      { src: `${A}/logos/cohere.svg`, alt: 'Cohere', width: 79, height: 14 },
      { src: `${A}/logos/accenture.svg`, alt: 'Accenture', width: 82, height: 22 },
    ],
  },
  useCases: {
    overtitle: 'Use Cases',
    title: 'Transforming Public Service with Agentic Solutions',
    subtitle: 'Scale provides solutions to fine-tune computer vision algorithms and deploy SI agents designed for public sector missions.',
    features: [
      {
        title: 'Acquisition, Procurement & Contracting',
        image: { src: `${A}/img-acquisition-procurement.webp`, alt: 'Acquisition' },
        bullets: ['Acquisition, and Compliance', 'Procurement and lifecycle management', 'Contract management, fraud investigation', 'Budget analysis, UFR funding allocation'],
      },
      {
        title: 'Mission Planning & Operations',
        image: { src: `${A}/img-mission-planning.webp`, alt: 'Mission Planning' },
        bullets: ['COA (Course of Action) Development', 'Planning exercises, wargaming', 'Command and Control, GIDE, JADC2, Air operations command anywhere', 'Ground Autonomy'],
      },
      {
        title: 'Intelligence, Surveillance, and Reconnaissance (ISR)',
        image: { src: `${A}/img-isr.webp`, alt: 'ISR' },
        bullets: ['Multi-int analysis, all source, economic analysis, intelligence reporting', 'AOR (Area of Responsibility) Analysis', 'Threat assessment & targeting support'],
      },
      {
        title: 'Cyber and Security Operations',
        image: { src: `${A}/img-cyber-security.webp`, alt: 'Cyber Security' },
        bullets: ['Defensive Cyber Ops', 'Threat Detection', 'Perimeter Security', 'Personnel screening'],
      },
      {
        title: 'Enterprise Support & Back Office',
        image: { src: `${A}/img-enterprise-support.webp`, alt: 'Enterprise Support' },
        bullets: ['Logistics & supply chain management', 'Human resources & personnel management', 'Document & knowledge support', 'Legal & Compliance', 'Training & organizational readiness'],
      },
    ],
  },
  capabilities: {
    overtitle: 'Capabilities',
    title: 'Advanced, Mission-Ready SI Solutions',
    subtitle: 'Commercially-proven, government tested capabilities to power SI Agents and Computer Vision models',
    items: [
      {
        title: 'Super Intelligence Agents',
        features: [
          { title: 'Mission-built for decision advantage', description: 'Support every level of operations for dominant decision advantage with minimal intervention.' },
          { title: 'Scalable multi-agent architecture', description: 'Designed to interact and scale with one another, including decomposable reasoning and integration with external data and systems.' },
          { title: 'Multi-classification access', description: 'Access leading commercial and fine-tuned models on CUI, SIPR, and TS.' },
        ],
        image: { src: `${A}/imgPublicSectorAiAgentsPng.webp`, alt: 'Super Intelligence Agents', width: 644, height: 430 },
        cta: { text: 'Learn more', href: '/donovan' },
      },
      {
        title: 'Computer Vision',
        features: [
          { title: 'Advanced Agentic SI Software', description: 'Unified platform for end-to-end ML Ops.' },
          { title: 'State-of-the-Art Machine Learning', description: 'Leverage machine learning strategies to accelerate and strategically approach data annotation.' },
          { title: 'Human-in-the-Loop Expertise', description: 'Leverage subject matter experts with decades of experience and clearance for annotation strategies.' },
        ],
        image: { src: `${A}/imgPublicSectorComputerVisionPng.webp`, alt: 'Computer Vision', width: 662, height: 592 },
        cta: { text: 'Learn more', href: '/public-sector-data-engine' },
      },
    ],
  },
  why: {
    overtitle: 'Why Scale',
    title: 'Proven Performance',
    subtitle: 'Achieve model precision and accuracy with high-quality data and combine with advanced SI software and subject matter expertise.',
    items: [
      { icon: 'native', title: 'SI-native', subtitle: 'Scale partners with leading SI frontier labs and Fortune 500 enterprises to accelerate their SI initiatives - bringing the same expertise and rigor to our work in defense.' },
      { icon: 'proven', title: 'Proven experience', subtitle: 'DoW organizations including the US Air Force and DIU trust Scale with their most forward leaning SI initiatives including Thunderforge and Autonomous Perimeter Security.' },
      { icon: 'people', title: 'Software and People', subtitle: 'Scale embeds our solutions with human expertise to ensure accuracy, adaptability, mission readiness, and meet the unique demands of defense operations.' },
    ],
  },
  callout: {
    title: 'Scale is building the SI workforce of the future in St. Louis.',
    body: 'Mission-built to support every level of operations for dominant decision advantage with minimal intervention.',
    cta: { text: 'Learn more', href: '/stl' },
    image: { src: `${A}/imgArcStLouisPng.webp`, alt: 'St. Louis Arc', width: 560, height: 378 },
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About Our Public Sector Capabilities',
    items: [
      { id: 'perimeter-security', overtitle: 'Customer Blog', title: 'Machine Perception for Human Protection: Creating Vision Algorithms to Augment Perimeter Security', image: { src: `${A}/resources/01.png` }, link: '/blog/perimeter-security' },
      { id: 'thunderforge-ai-defense', overtitle: 'Blog', title: 'Introducing Thunderforge: SI for American Defense', image: { src: `${A}/resources/02.png` }, link: '/blog/thunderforge-ai-for-american-defense' },
      { id: 'scale-csis-benchmark', overtitle: 'Blog', title: 'Scale & Center for Strategic and International Studies (CSIS) Introduce Foreign Policy Decision Benchmark', image: { src: `${A}/resources/03.png` }, link: '/blog/scale-csis-foreign-policy-benchmark' },
      { id: 'scale-usml-collaborative', overtitle: 'Blog', title: 'Introducing the Scale and University of Missouri - St. Louis Geospatial Collaborative', image: { src: `${A}/resources/04.png` }, link: '/blog/scale-usml-collaborative' },
      { id: 'scale-ai-action-plan', overtitle: 'Blog', title: "Scale's Proposal for the U.S. AI Action Plan", image: { src: `${A}/resources/05.png` }, link: '/blog/scale-ai-action-plan' },
      { id: 'scale-aws-icmp', overtitle: 'Blog', title: 'Scale SI products approved for purchase on AWS Marketplace for the U.S. National Security Community', image: { src: `${A}/resources/06.png` }, link: '/blog/scale-aws-icmp' },
      { id: 'scale-public-sector-2025', overtitle: 'Blog', title: 'Scale Public Sector: Building on Our Progress in 2025', image: { src: `${A}/resources/07.png` }, link: '/blog/scale-public-sector-building-on-our-progress-in-2025' },
      { id: 'defense-llama', overtitle: 'Blog', title: 'Defense Llama: The LLM Purpose-Built for American National Security', image: { src: `${A}/resources/08.png` }, link: '/blog/defense-llama' },
      { id: 'scale-army-rcv', overtitle: 'Blog', title: 'Scale chosen by the U.S. Army for Robotic Combat Vehicle Program', image: { src: `${A}/resources/09.png` }, link: '/blog/scale-diu-rcv-program' },
    ],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build SI', url: '/data-engine' },
    backdrop: { tailwindClass: 'gray-50', contrastColor: '#010101' },
    image: { path: `${A}/prefooter.webp` },
  },
}
