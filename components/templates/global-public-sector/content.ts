// Content for /global-public-sector: scale.com/global-public-sector copy (captured 2026-11-01) so QA lines
// up with the live page. Every section reads its slice from GlobalPublicSectorContent; a Vahue page passes its own
// content object (leave a slice out to drop that section). Numbers are Scale's own (no Vahue metrics here).
import type { HeroContent } from '@/components/templates/evaluation-model-developers/content'
import type { GpsIcon } from './icons'

export const ASSET = '/templates/global-public-sector'

export type { HeroContent }
export type SectionHeaderContent = { eyebrow?: string; title: string; body?: string }
export type FeatureItem = { title: string; description: string; image: { src: string; alt: string; width: number; height: number } }
export type FoundationColumn = { title: string; body: string; image: { src: string; alt: string } }
export type ValueCard = { icon: GpsIcon; title: string; body: string }
export type StatCard = { icon: GpsIcon; label: string; value: string; body: string }
export type TestimonialItem = { name: string; title: string; quote: string }
export type TestimonialsContent = { heading: string; theme: { hex: string; contrast: string }; items: TestimonialItem[]; /** Case outcomes rather than spoken quotes: render without quotation marks. */ plainText?: boolean }
export type PortfolioRow = { category: string; color: string; solutions: string[] }
export type PortfolioContent = { title: string; columns: [string, string]; rows: PortfolioRow[]; emptyLabel: string; mobileVisible: number }
export type VideoContent = {
  /** Static poster (Scale fetches the Wistia oEmbed thumbnail at runtime; the clone ships it as a file). */
  poster: string
  title: string
  description: string
  /** Iframe loaded only after the play button is pressed (Scale: fast.wistia.net/embed/iframe/<id>?autoPlay=1). */
  embedSrc?: string
}
export type UseCase = {
  tab: string
  title: string
  subtitle: string
  challenge: string
  stats: { value: string; label: string }[]
  outcomes: string[]
  image: { src: string; alt: string }
}
export type UseCasesContent = { overtitle: string; challengeLabel: string; outcomesLabel: string; cases: UseCase[] }

export type GlobalPublicSectorContent = {
  hero?: HeroContent
  trusted?: { header: SectionHeaderContent; items: FeatureItem[] }
  foundations?: { header: SectionHeaderContent; columns: FoundationColumn[] }
  value?: { header: SectionHeaderContent; cards: ValueCard[] }
  testimonials?: TestimonialsContent
  stats?: StatCard[]
  portfolio?: PortfolioContent
  video?: VideoContent
  useCases?: UseCasesContent
  prefooter?: HeroContent
}

export const globalPublicSectorContent: GlobalPublicSectorContent = {
  hero: {
    headline: 'Global Public Sector',
    body: "Developing reliable AI systems for the world's most important decisions — built on four core pillars: Infrastructure, Data, Orchestration, and Experience.",
    cta: { label: 'Book a Demo', href: '/contact' },
    image: `${ASSET}/hero.webp`,
  },
  trusted: {
    header: {
      title: 'Trusted AI that powers national priorities and data sovereignty',
      body: 'Scale powers national AI transformation with Government-grade data and rigorous model evaluation for tailored AI solutions on proven infrastructure',
    },
    items: [
      {
        title: 'Forward Deployed Engineering',
        description: 'Scale partners with leading governments and enterprises worldwide to turn policy ambition into AI reality.',
        image: { src: `${ASSET}/forward-deployed.png`, alt: 'Forward Deployed Engineering diagram', width: 500, height: 334 },
      },
    ],
  },
  foundations: {
    header: {
      title: 'The foundations of Sovereign, Secure, and Reliable AI',
      body: 'Scale brings together data infrastructure, model evaluation, and systems engineering to accelerate the full AI lifecycle — from strategy and data readiness to deployment and long-term operations',
    },
    columns: [
      { title: 'Data', body: 'End-to-End AI Data Engineering', image: { src: `${ASSET}/app-screenshot-applications.svg`, alt: 'Scale Data Engine — annotation and labeling interface' } },
      { title: 'Applications', body: 'Use case implementation', image: { src: `${ASSET}/app-screenshot-data.svg`, alt: 'Scale GenAI Portfolio — AI agent interface' } },
      { title: 'Talent', body: 'Upskilling & Enablement', image: { src: `${ASSET}/app-screenshot-talent.svg`, alt: 'AI learning and upskilling platform' } },
    ],
  },
  value: {
    header: { title: 'How Scale Delivers Value' },
    cards: [
      { icon: 'MdOutlineShield', title: 'Sovereign-by-Design Architecture', body: 'Built on secure infrastructure compliant with national security requirements and data mandates' },
      { icon: 'MdOutlineVerified', title: 'Proven National-Scale Expertise', body: 'Experience supporting mission-critical AI for governments and public institutions' },
      { icon: 'MdOutlinePeople', title: 'Embedded Local Presence', body: 'On-the-ground, multilingual teams, including Arabic-speaking talent to ensure sustained capability transfer and long-term ownership' },
      { icon: 'MdOutlineSchool', title: 'Upskilling and Enablement', body: 'Accelerate capability building and iteration through embedded collaboration, upskilling, and enablement support' },
      { icon: 'MdOutlineHowToReg', title: 'Human-in-the-Loop Assurance', body: 'Expert oversight combined with automation to deliver secure, accurate, and scalable AI outputs' },
      { icon: 'MdOutlineMergeType', title: 'End-to-End Transformation', body: 'From strategy and data foundations to deployment, enablement, and ongoing operations' },
    ],
  },
  testimonials: {
    heading: "Don't just take our word for it",
    // ClientTestimonials default colorTheme (no CMS override): cloud-slate #839CB2, contrastColor #000000
    theme: { hex: '#839CB2', contrast: '#000000' },
    items: [
      {
        name: 'Talal AlBakr',
        title: 'Country General Manager',
        quote:
          'The entire region is racing to turn AI ambition into reality. Scale AI brings world-class engineering capabilities that bridge that gap for the Kingdom, ensuring Saudi Arabia moves from high-level strategy to deployed, mission-critical AI systems.',
      },
    ],
  },
  stats: [
    { icon: 'MdEditDocument', label: 'Legislative drafting', value: '85%', body: 'Reduced drafting & benchmarking time' },
    { icon: 'MdSchool', label: 'Students', value: '100K+', body: 'Enrolled on AI learning platform' },
    { icon: 'MdSecurity', label: 'Regulatory tech', value: '50%', body: 'Faster public safety and licensing' },
  ],
  portfolio: {
    title: 'Solutions Portfolio',
    columns: ['Category', 'Solutions'],
    emptyLabel: 'Coming soon',
    mobileVisible: 4,
    // Solutions are sorted alphabetically per category, as AISolutionsGrid does (localeCompare).
    rows: [
      { category: 'Legislative & Justice', color: '#714DFF', solutions: ['Judicial Agent', 'Legal Department Agent'] },
      { category: 'Education', color: '#9C83FF', solutions: ['Adaptive Learning Solution', 'Personalized AI Tutor'] },
      { category: 'Center of Government', color: '#7B8FDD', solutions: ['Economic Analysis Agent', 'Executive Advisor'] },
      {
        category: 'Government Services',
        color: '#86BFF2',
        solutions: ['Building Permits Automation', 'Business License Automation', 'RFQ Evaluation', 'Voice Customer Service Agent'],
      },
      { category: 'Healthcare', color: '#E151FF', solutions: ['AI-powered Medical Scribe'] },
      {
        category: 'Industry & Commerce',
        color: '#C88BC4',
        solutions: ['Document Contract Extraction', 'Financial Analysis Agent', 'Investment Due Diligence Agent', 'Investment Management Agent'],
      },
      { category: 'Infrastructure & Permitting', color: '#D1AAD7', solutions: ['Fire Permit Automation', 'Fire Safety Products Automation', 'Pest Control Prediction'] },
      { category: 'Culture, Sport & Tourism', color: '#BBDEF2', solutions: ['Multi-modal Museum Assistant / Narrator', 'Personalized Tour Guide for Visitors'] },
      { category: 'Transport & Logistics', color: '#FFF759', solutions: ['Road Monitoring and Incident Detection'] },
      { category: 'Oil & Gas', color: '#0076FF', solutions: [] },
    ],
  },
  video: {
    poster: `${ASSET}/video-poster.webp`,
    title: '',
    description: '',
    embedSrc: 'https://fast.wistia.net/embed/iframe/bl1zetxbah?autoPlay=1',
  },
  useCases: {
    overtitle: 'Use cases',
    challengeLabel: 'Challenge',
    outcomesLabel: 'Key Outcomes',
    cases: [
      {
        tab: 'Building Permit & Planning Review',
        title: 'Building Permit & Planning Review',
        subtitle:
          'Permit approvals that once took weeks now complete in a fraction of the time — with 80% accuracy on compliance checks, 32 automated regulatory validations, and full deployment in 6 weeks.',
        challenge:
          'Manual extraction from architectural drawings, frequent regulatory changes, and fragmented review workflows slowed permit decisions and increased reviewer workload.',
        stats: [
          { value: '10×', label: 'Faster permit review' },
          { value: '80%', label: 'Compliance accuracy' },
          { value: '6 wks', label: 'Time to deployment' },
        ],
        outcomes: [
          '10× faster permit review cycles',
          '32 automated regulatory checks',
          '80% accuracy in identifying compliance issues',
          'Multi-agent AI support for planning officers',
          '6 weeks from development to planner-ready deployment',
        ],
        image: { src: `${ASSET}/use-case-permit.webp`, alt: 'Building Permit & Planning Review' },
      },
      {
        tab: 'Agentic Legislation & Policy Review',
        title: 'Agentic Legislation & Policy Review',
        subtitle:
          'Legislative reviews cut from weeks to days. AI that benchmarks laws across jurisdictions, surfaces gaps, and keeps policy experts in control throughout.',
        challenge:
          'Government legislative teams face complex and time-intensive workflows when drafting, reviewing, and benchmarking laws. Manual legal research, cross-jurisdiction comparison, and validation of regulatory consistency slow the legislative process.',
        stats: [
          { value: '5×', label: 'Faster review cycles' },
          { value: '85%', label: 'Less drafting time' },
          { value: '32+', label: 'Automated checks' },
        ],
        outcomes: [
          '5x faster legislative review and drafting cycles',
          'Automated benchmarking against regional and international laws',
          'AI-assisted identification of inconsistencies and regulatory gaps',
          'Human-in-the-loop review for policy experts and legal advisors',
          'Accelerated development of national legislation and regulatory updates',
        ],
        image: { src: `${ASSET}/use-case-legislation.webp`, alt: 'Agentic Legislation & Policy Review' },
      },
    ],
  },
  prefooter: {
    headline: 'Accelerate Your AI Transformation with Reliable Solutions',
    cta: { label: 'Book a Meeting', href: '/contact' },
    image: `${ASSET}/prefooter.webp`,
  },
}
