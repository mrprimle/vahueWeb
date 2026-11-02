// Copy for /global-public-sector ("Professional Services" in the menu, research segment 3: knowledge-heavy expert teams), written from the AJTBD research into Scale's slots.
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
    title: 'AI Agents for Professional Services | Vahue',
    description: 'Vahue runs the repeat knowledge work your experts can’t keep up with: sourced answers, RFI drafts, and contract reviews from your own documents.',
  },
  hero: {
    headline: 'Professional Services',
    body: 'Vahue runs your experts’ repeat work: RFI answers, contract reviews, and client reports, sourced from your own documents and measured against your baseline from day one.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: `${A}/hero-professional.webp` },
  },
  trusted: {
    overtitle: '',
    title: 'Trusted AI that powers expert teams and client confidentiality',
    subtitle: 'Your best people answer the same questions every week. Vahue gives them source-cited answers and drafts, proven with private evals on your own past work',
    row: {
      title: 'Forward Deployed Engineering',
      description: 'Vahue engineers sit with your practice teams. We find the right use case, build the system, and own the outcome.',
      image: { src: `${A}/lifecycle.png`, alt: 'Forward Deployed Engineering diagram', width: 500, height: 334 },
    },
  },
  foundations: {
    overtitle: '',
    title: 'The foundations of Grounded, Secure, and Reliable AI',
    subtitle: 'Vahue brings together context, evals, and systems engineering across the full AI lifecycle — a 2-week Audit to record your baseline, a Pilot in shadow mode on real cases, then monthly Operate reports against it',
    columns: [
      { title: 'Data', description: 'Context and Integrations', image: { src: `${A}/app-screenshot-applications-filled.svg`, alt: 'Context and Integrations — document and knowledge interface' } },
      { title: 'Applications', description: 'Knowledge Agents', image: { src: `${A}/app-screenshot-data-filled.svg`, alt: 'Knowledge Agents — AI agent interface' } },
      { title: 'Talent', description: 'Embedded AI Specialists', image: { src: `${A}/app-screenshot-talent-filled.svg`, alt: 'AI learning and upskilling platform' } },
    ],
  },
  delivers: {
    overtitle: '',
    title: 'How Vahue Delivers Value',
    cards: [
      { key: 'hsd-1', icon: 'architecture', title: 'Confidential-by-Design Architecture', description: 'Built on secure infrastructure, with client walls and permissions carried into every answer' },
      { key: 'hsd-2', icon: 'expertise', title: 'Proven Firm-Wide Expertise', description: 'Experience supporting mission-critical AI for consultancies and professional firms' }, // PLACEHOLDER,
      { key: 'hsd-3', icon: 'presence', title: 'Embedded Engineers Who Stay', description: 'Forward-deployed engineers who run the agents after launch, so nobody at your firm becomes their full-time babysitter' },
      { key: 'hsd-4', icon: 'upskilling', title: 'Upskilling and Enablement', description: 'Accelerate capability building and iteration through embedded collaboration, upskilling, and enablement support' },
      { key: 'hsd-5', icon: 'assurance', title: 'Human-in-the-Loop Assurance', description: 'Expert oversight combined with automation to deliver secure, accurate, and scalable AI outputs' },
      { key: 'hsd-6', icon: 'transformation', title: 'End-to-End Transformation', description: 'From strategy and data foundations to deployment, enablement, and ongoing operations' },
    ],
  },
  testimonial: {
    heading: "Don't just take our word for it",
    clientName: 'Full Name', // PLACEHOLDER
    title: 'Role, Company', // PLACEHOLDER
    quote: 'Our partners used to lose hours searching past work for every RFI. Vahue’s agents now draft sourced answers in minutes, and we check them before they go out. Proposals move 50% faster, and I no longer worry about what we can’t find.', // PLACEHOLDER
  },
  stats: [
    { key: 'stat-contracts', icon: 'drafting', label: 'Engagement contracts', description: stat('85%', 'Reduced drafting & benchmarking time') }, // PLACEHOLDER
    { key: 'stat-experts', icon: 'students', label: 'Experts', description: stat('100K+', 'Sourced answers delivered to experts') }, // PLACEHOLDER
    { key: 'stat-rfi', icon: 'regulatory', label: 'RFI responses', description: stat('50%', 'Faster proposals and client decks') }, // PLACEHOLDER
  ],
  solutions: {
    title: 'Solutions Portfolio',
    ariaLabel: 'AI Solutions Portfolio',
    categoryHeader: 'Service',
    solutionsHeader: 'Jobs it takes off your experts',
    comingSoon: 'Coming soon',
    showLess: 'Show less',
    seeAll: 'See all {n} services',
    categories: [
      { name: 'Knowledge Agents', color: '#714DFF', href: '/genai-portfolio', solutions: ['Sourced Answers from Past Work', 'RFI Drafting', 'Partner Briefings'] },
      { name: 'Document Intake Agents', color: '#9C83FF', href: '/physical-ai', solutions: ['Contract Extraction', 'Engagement Letter Intake', 'Audit Evidence Collection'] },
      { name: 'Back-office Sync Agents', color: '#7B8FDD', href: '/generative-ai-data-engine', solutions: ['Client Onboarding', 'Time and Billing Reconciliation'] },
      { name: 'Scoring and Decision Agents', color: '#86BFF2', href: '/automotive', solutions: ['Engagement Risk Scoring', 'Compliance Checks'] },
      { name: 'Sales and Booking Agents', color: '#E151FF', href: '/public-sector-data-engine', solutions: ['Lead Qualification', 'Consultation Booking', 'Proposal Follow-ups'] },
      { name: 'Support and Voice Agents', color: '#C88BC4', href: '/donovan', solutions: ['Client Inbox Triage', 'Voice Intake Agent'] },
      { name: 'Context and Integrations', color: '#D1AAD7', href: '/data-engine', solutions: ['Document System and CRM Connections', 'Knowledge Base Preparation'] },
      { name: 'Embedded AI Specialists', color: '#BBDEF2', href: '/experts', solutions: ['Forward-deployed Engineers', 'Practice Team Enablement'] },
      { name: 'AI Strategy and Audit', color: '#FFF759', href: '/evaluation/enterprise', solutions: ['Two-week Workflow Audit', 'Baseline Recording'] },
      { name: 'Evals and Guardrails', color: '#0076FF', href: '/evaluation/model-developers', solutions: ['Private Evals on Past Work', 'Citation Checks', 'Shadow Mode'] },
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
        subtitle: 'Document Intake Agents finish contract reviews that once took weeks in a fraction of the time — with 80% accuracy on compliance checks, 32 automated regulatory validations, and full deployment in 6 weeks.', // PLACEHOLDER
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
        subtitle: 'Knowledge Agents cut RFI responses from days to hours. They draft answers across past proposals, surface gaps, and keep subject experts in control throughout.',
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
