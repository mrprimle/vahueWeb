// Scale's original strings for https://scale.com/global-public-sector: the RSC payload and modules 927726, 763867, 297990, 623453.
import type { RichBlock } from '@/components/site/shared/RichText'
import type { GlobalPublicSectorContent } from './types'

const A = '/global-public-sector'
const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const stat = (value: string, text: string): RichBlock[] => [
  { style: 'h2', text: value },
  { style: 'normal', children: [{ text, highlightGray: true }] },
]

export const content: GlobalPublicSectorContent = {
  meta: {
    title: 'AI for the Global Public Sector | Scale AI',
    description: "Developing reliable AI systems for the world's most important decisions",
  },
  hero: {
    headline: 'Global Public Sector',
    body: "Developing reliable AI systems for the world's most important decisions — built on four core pillars: Infrastructure, Data, Orchestration, and Experience.",
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/hero.webp` },
  },
  trusted: {
    overtitle: '',
    title: 'Trusted AI that powers national priorities and data sovereignty',
    subtitle: 'Scale powers national AI transformation with Government-grade data and rigorous model evaluation for tailored AI solutions on proven infrastructure',
    row: {
      title: 'Forward Deployed Engineering',
      description: 'Scale partners with leading governments and enterprises worldwide to turn policy ambition into AI reality.',
      image: { src: `${A}/lifecycle.png`, alt: 'Forward Deployed Engineering diagram', width: 500, height: 334 },
    },
  },
  foundations: {
    overtitle: '',
    title: 'The foundations of Sovereign, Secure, and Reliable AI',
    subtitle: 'Scale brings together data infrastructure, model evaluation, and systems engineering to accelerate the full AI lifecycle — from strategy and data readiness to deployment and long-term operations',
    columns: [
      { title: 'Data', description: 'End-to-End AI Data Engineering', image: { src: `${A}/app-screenshot-applications.svg`, alt: 'Scale Data Engine — annotation and labeling interface' } },
      { title: 'Applications', description: 'Use case implementation', image: { src: `${A}/app-screenshot-data.svg`, alt: 'Scale GenAI Portfolio — AI agent interface' } },
      { title: 'Talent', description: 'Upskilling & Enablement', image: { src: `${A}/app-screenshot-talent.svg`, alt: 'AI learning and upskilling platform' } },
    ],
  },
  delivers: {
    overtitle: '',
    title: 'How Scale Delivers Value',
    cards: [
      { key: 'hsd-1', icon: 'architecture', title: 'Sovereign-by-Design Architecture', description: 'Built on secure infrastructure compliant with national security requirements and data mandates' },
      { key: 'hsd-2', icon: 'expertise', title: 'Proven National-Scale Expertise', description: 'Experience supporting mission-critical AI for governments and public institutions' },
      { key: 'hsd-3', icon: 'presence', title: 'Embedded Local Presence', description: 'On-the-ground, multilingual teams, including Arabic-speaking talent to ensure sustained capability transfer and long-term ownership' },
      { key: 'hsd-4', icon: 'upskilling', title: 'Upskilling and Enablement', description: 'Accelerate capability building and iteration through embedded collaboration, upskilling, and enablement support' },
      { key: 'hsd-5', icon: 'assurance', title: 'Human-in-the-Loop Assurance', description: 'Expert oversight combined with automation to deliver secure, accurate, and scalable AI outputs' },
      { key: 'hsd-6', icon: 'transformation', title: 'End-to-End Transformation', description: 'From strategy and data foundations to deployment, enablement, and ongoing operations' },
    ],
  },
  testimonial: {
    heading: "Don't just take our word for it",
    clientName: 'Talal AlBakr',
    title: 'Country General Manager',
    quote: 'The entire region is racing to turn AI ambition into reality. Scale AI brings world-class engineering capabilities that bridge that gap for the Kingdom, ensuring Saudi Arabia moves from high-level strategy to deployed, mission-critical AI systems.',
  },
  stats: [
    { key: 'stat-legislative', icon: 'drafting', label: 'Legislative drafting', description: stat('85%', 'Reduced drafting & benchmarking time') },
    { key: 'stat-students', icon: 'students', label: 'Students', description: stat('100K+', 'Enrolled on AI learning platform') },
    { key: 'stat-regulatory', icon: 'regulatory', label: 'Regulatory tech', description: stat('50%', 'Faster public safety and licensing') },
  ],
  solutions: {
    title: 'Solutions Portfolio',
    ariaLabel: 'AI Solutions Portfolio',
    categoryHeader: 'Category',
    solutionsHeader: 'Solutions',
    comingSoon: 'Coming soon',
    showLess: 'Show less',
    seeAll: 'See all {n} categories',
    categories: [
      { name: 'Legislative & Justice', color: '#714DFF', solutions: ['Judicial Agent', 'Legal Department Agent'] },
      { name: 'Education', color: '#9C83FF', solutions: ['Adaptive Learning Solution', 'Personalized AI Tutor'] },
      { name: 'Center of Government', color: '#7B8FDD', solutions: ['Economic Analysis Agent', 'Executive Advisor'] },
      { name: 'Government Services', color: '#86BFF2', solutions: ['Building Permits Automation', 'Business License Automation', 'RFQ Evaluation', 'Voice Customer Service Agent'] },
      { name: 'Healthcare', color: '#E151FF', solutions: ['AI-powered Medical Scribe'] },
      { name: 'Industry & Commerce', color: '#C88BC4', solutions: ['Document Contract Extraction', 'Financial Analysis Agent', 'Investment Due Diligence Agent', 'Investment Management Agent'] },
      { name: 'Infrastructure & Permitting', color: '#D1AAD7', solutions: ['Fire Permit Automation', 'Fire Safety Products Automation', 'Pest Control Prediction'] },
      { name: 'Culture, Sport & Tourism', color: '#BBDEF2', solutions: ['Multi-modal Museum Assistant / Narrator', 'Personalized Tour Guide for Visitors'] },
      { name: 'Transport & Logistics', color: '#FFF759', solutions: ['Road Monitoring and Incident Detection'] },
      { name: 'Oil & Gas', color: '#0076FF', solutions: [] },
    ],
  },
  video: { src: 'https://scaleai.wistia.com/medias/bl1zetxbah', cover: `${A}/video-cover.jpg`, title: '', description: '' },
  useCases: {
    overtitle: 'Use cases',
    challengeLabel: 'Challenge',
    outcomesLabel: 'Key Outcomes',
    cases: [
      {
        tab: 'Building Permit & Planning Review',
        title: 'Building Permit & Planning Review',
        subtitle: 'Permit approvals that once took weeks now complete in a fraction of the time — with 80% accuracy on compliance checks, 32 automated regulatory validations, and full deployment in 6 weeks.',
        challenge: 'Manual extraction from architectural drawings, frequent regulatory changes, and fragmented review workflows slowed permit decisions and increased reviewer workload.',
        stats: [
          { value: '10×', label: 'Faster permit review' },
          { value: '80%', label: 'Compliance accuracy' },
          { value: '6 wks', label: 'Time to deployment' },
        ],
        outcomes: [
          { text: '10× faster permit review cycles' },
          { text: '32 automated regulatory checks' },
          { text: '80% accuracy in identifying compliance issues' },
          { text: 'Multi-agent AI support for planning officers' },
          { text: '6 weeks from development to planner-ready deployment' },
        ],
        image: { src: `${A}/case-permit.png`, alt: 'Building Permit & Planning Review' },
      },
      {
        tab: 'Agentic Legislation & Policy Review',
        title: 'Agentic Legislation & Policy Review',
        subtitle: 'Legislative reviews cut from weeks to days. AI that benchmarks laws across jurisdictions, surfaces gaps, and keeps policy experts in control throughout.',
        challenge: 'Government legislative teams face complex and time-intensive workflows when drafting, reviewing, and benchmarking laws. Manual legal research, cross-jurisdiction comparison, and validation of regulatory consistency slow the legislative process.',
        stats: [
          { value: '5×', label: 'Faster review cycles' },
          { value: '85%', label: 'Less drafting time' },
          { value: '32+', label: 'Automated checks' },
        ],
        outcomes: [
          { text: '5x faster legislative review and drafting cycles' },
          { text: 'Automated benchmarking against regional and international laws' },
          { text: 'AI-assisted identification of inconsistencies and regulatory gaps' },
          { text: 'Human-in-the-loop review for policy experts and legal advisors' },
          { text: 'Accelerated development of national legislation and regulatory updates' },
        ],
        image: { src: `${A}/case-legislation.webp`, alt: 'Agentic Legislation & Policy Review' },
      },
    ],
  },
  prefooter: {
    headline: 'Accelerate Your AI Transformation with Reliable Solutions',
    cta: { text: 'Book a Meeting', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/prefooter.webp` },
  },
}
