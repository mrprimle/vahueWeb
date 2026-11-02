// Scale's copy under the 80% rule for /global-public-sector ("Professional Services" in the menu, research segment 3: knowledge-heavy expert teams).
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
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
    title: 'AI for Professional Services | Vahue',
    description: "Developing reliable AI systems for the world's most important work",
  },
  hero: {
    headline: 'Professional Services',
    body: "Developing reliable AI systems for the world's most important work — built on four core pillars: Infrastructure, Data, Orchestration, and Experience.",
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/hero-professional.webp` },
  },
  trusted: {
    overtitle: '',
    title: 'Trusted AI that powers expert teams and client confidentiality',
    subtitle: 'Vahue powers firm-wide AI transformation with source-cited client data and rigorous model evaluation for tailored AI solutions on proven infrastructure',
    row: {
      title: 'Forward Deployed Engineering',
      description: 'Vahue partners with leading firms and enterprises worldwide to turn practice ambition into AI reality.',
      image: { src: `${A}/lifecycle.png`, alt: 'Forward Deployed Engineering diagram', width: 500, height: 334 },
    },
  },
  foundations: {
    overtitle: '',
    title: 'The foundations of Grounded, Secure, and Reliable AI',
    subtitle: 'Vahue brings together data infrastructure, model evaluation, and systems engineering to accelerate the full AI lifecycle — from strategy and data readiness to deployment and long-term operations',
    columns: [
      { title: 'Data', description: 'End-to-End AI Data Engineering', image: { src: `${A}/app-screenshot-applications-filled.svg`, alt: 'Vahue Context Engine — document and knowledge interface' } },
      { title: 'Applications', description: 'Use case implementation', image: { src: `${A}/app-screenshot-data-filled.svg`, alt: 'Vahue Knowledge Agents — AI agent interface' } },
      { title: 'Talent', description: 'Upskilling & Enablement', image: { src: `${A}/app-screenshot-talent-filled.svg`, alt: 'AI learning and upskilling platform' } },
    ],
  },
  delivers: {
    overtitle: '',
    title: 'How Vahue Delivers Value',
    cards: [
      { key: 'hsd-1', icon: 'architecture', title: 'Confidential-by-Design Architecture', description: 'Built on secure infrastructure compliant with partner security requirements and data mandates' },
      { key: 'hsd-2', icon: 'expertise', title: 'Proven Firm-Wide Expertise', description: 'Experience supporting mission-critical AI for consultancies and professional firms' },
      { key: 'hsd-3', icon: 'presence', title: 'Embedded Local Presence', description: 'On-the-ground, multilingual teams, including forward-deployed talent to ensure sustained capability transfer and long-term ownership' },
      { key: 'hsd-4', icon: 'upskilling', title: 'Upskilling and Enablement', description: 'Accelerate capability building and iteration through embedded collaboration, upskilling, and enablement support' },
      { key: 'hsd-5', icon: 'assurance', title: 'Human-in-the-Loop Assurance', description: 'Expert oversight combined with automation to deliver secure, accurate, and scalable AI outputs' },
      { key: 'hsd-6', icon: 'transformation', title: 'End-to-End Transformation', description: 'From strategy and data foundations to deployment, enablement, and ongoing operations' },
    ],
  },
  testimonial: {
    heading: "Don't just take our word for it",
    clientName: 'Full Name', // PLACEHOLDER
    title: 'Role, Company', // PLACEHOLDER
    quote: 'The entire firm is racing to turn AI ambition into reality. Vahue brings world-class engineering capabilities that bridge that gap for our senior partners, ensuring every practice moves from hours of manual search to deployed, mission-critical AI systems.', // PLACEHOLDER
  },
  stats: [
    { key: 'stat-contracts', icon: 'drafting', label: 'Engagement contracts', description: stat('85%', 'Reduced drafting & benchmarking time') }, // PLACEHOLDER
    { key: 'stat-experts', icon: 'students', label: 'Experts', description: stat('100K+', 'Answers on AI expert platform') }, // PLACEHOLDER
    { key: 'stat-rfi', icon: 'regulatory', label: 'RFI responses', description: stat('50%', 'Faster proposals and client decks') }, // PLACEHOLDER
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
      { name: 'Legal & Compliance', color: '#714DFF', solutions: ['Contract Agent', 'Legal Department Agent'] },
      { name: 'Training', color: '#9C83FF', solutions: ['Adaptive Learning Solution', 'Personalized AI Tutor'] },
      { name: 'Partners & Leadership', color: '#7B8FDD', solutions: ['Economic Analysis Agent', 'Executive Advisor'] },
      { name: 'Client Service Teams', color: '#86BFF2', solutions: ['Client Onboarding Automation', 'Engagement Letter Automation', 'RFI Drafting', 'Voice Customer Service Agent'] },
      { name: 'Research', color: '#E151FF', solutions: ['AI-powered Research Scribe'] },
      { name: 'Finance & Deal Advisory', color: '#C88BC4', solutions: ['Document Contract Extraction', 'Financial Analysis Agent', 'Investment Due Diligence Agent', 'Investment Management Agent'] },
      { name: 'Audit & Risk Assurance', color: '#D1AAD7', solutions: ['Audit Evidence Automation', 'Compliance Checks Automation', 'Engagement Risk Prediction'] },
      { name: 'Sales, Bids & Proposals', color: '#BBDEF2', solutions: ['Multi-modal Proposal Assistant / Editor', 'Personalized Briefings for Clients'] },
      { name: 'Reporting & Close', color: '#FFF759', solutions: ['Month-end Close and Anomaly Detection'] },
      { name: 'Tax Advisory', color: '#0076FF', solutions: [] },
    ],
  },
  video: { src: `${A}/video-professional.mp4`, cover: `${A}/video-cover-professional.webp`, title: '', description: '' }, // PLACEHOLDER
  useCases: {
    overtitle: 'Use cases',
    challengeLabel: 'Challenge',
    outcomesLabel: 'Key Outcomes',
    cases: [
      {
        tab: 'Contract Drafting & Clause Review',
        title: 'Contract Drafting & Clause Review',
        subtitle: 'Contract reviews that once took weeks now complete in a fraction of the time — with 80% accuracy on compliance checks, 32 automated regulatory validations, and full deployment in 6 weeks.', // PLACEHOLDER
        challenge: 'Manual extraction from past client contracts, frequent regulatory changes, and fragmented review workflows slowed signing decisions and increased reviewer workload.',
        stats: [
          { value: '10×', label: 'Faster clause review' }, // PLACEHOLDER
          { value: '80%', label: 'Compliance accuracy' }, // PLACEHOLDER
          { value: '6 wks', label: 'Time to deployment' }, // PLACEHOLDER
        ],
        outcomes: [
          { text: '10× faster contract review cycles' }, // PLACEHOLDER
          { text: '32 automated regulatory checks' }, // PLACEHOLDER
          { text: '80% accuracy in identifying compliance issues' }, // PLACEHOLDER
          { text: 'Multi-agent AI support for contract reviewers' },
          { text: '6 weeks from development to reviewer-ready deployment' }, // PLACEHOLDER
        ],
        image: { src: `${A}/case-contract-review.png`, alt: 'Contract Drafting & Clause Review' },
      },
      {
        tab: 'Agentic Knowledge & Proposal Review',
        title: 'Agentic Knowledge & Proposal Review',
        subtitle: 'RFI responses cut from days to hours. AI that drafts answers across past proposals, surfaces gaps, and keeps subject experts in control throughout.',
        challenge: 'Firm proposal teams face complex and time-intensive workflows when drafting, reviewing, and benchmarking responses. Manual legal research, cross-document comparison, and validation of regulatory consistency slow the proposal process.',
        stats: [
          { value: '5×', label: 'Faster response cycles' }, // PLACEHOLDER
          { value: '85%', label: 'Less drafting time' }, // PLACEHOLDER
          { value: '32+', label: 'Automated checks' }, // PLACEHOLDER
        ],
        outcomes: [
          { text: '5x faster proposal review and drafting cycles' }, // PLACEHOLDER
          { text: 'Automated benchmarking against past proposals and answers' },
          { text: 'AI-assisted identification of inconsistencies and compliance gaps' },
          { text: 'Human-in-the-loop review for subject experts and legal advisors' },
          { text: 'Accelerated development of client proposals and compliance updates' },
        ],
        image: { src: `${A}/case-proposal-review.webp`, alt: 'Agentic Knowledge & Proposal Review' },
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
