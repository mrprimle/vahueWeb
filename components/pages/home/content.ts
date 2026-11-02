// Home copy from the AJTBD research in Scale's slots: same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real numbers, clients and logos.
import { fitProofLogo, type ProofLogo } from '@/components/site/proofLogos'
import type { HeroLogo, HomeColor, HomeContent } from './content.types'

const FOUNDRY: HomeColor = { hex: '#A8927C', contrastColor: '#010101', tailwindClass: 'foundry-tan' }
const EVERGREEN: HomeColor = { hex: '#193A29', contrastColor: '#FFFFFF', tailwindClass: 'evergreen' }
const PURPLE: HomeColor = { hex: '#79648C', contrastColor: '#FFFFFF', tailwindClass: 'archive-purple' }
const CLOUD: HomeColor = { hex: '#839CB2', contrastColor: '#010101', tailwindClass: 'cloud-slate' }

const logo = (id: number, name: ProofLogo): HeroLogo => {
  const fitted = fitProofLogo(name, 68, 30)
  return { _id: `logo-${id}`, alt: fitted.alt, path: fitted.src, width: fitted.width, height: fitted.height }
}

export const content: HomeContent = {
  hero: {
    headline: 'Your busiest workflows need reliable AI agents. We run them.',
    scrollHint: 'Scroll to explore',
    video: '/home/packed.mp4',
    textures: { perlin: '/home/perlin256.png', numbers: '/home/numbers.png', fallback: '/home/home-fallback-small.jpg' },
    items: [
      {
        _key: '278857e80932',
        category: 'Audit · 2 weeks',
        title: [{ text: 'Reliable AI has no shortcuts.' }],
        body: [{ text: 'For operations, finance and support teams still moving work between systems by hand. In two weeks we find the right use case and record your baseline: volume, errors and cost.' }],
      },
      {
        _key: 'fb20b03e7a10',
        category: 'Pilot · 4 to 6 weeks',
        title: [{ text: 'AI systems that actually work.' }],
        body: [{ text: 'Most AI pilots stall after the demo. We build the system inside the tools you already use and run it in shadow mode on your real cases, so you see it work before it goes live.' }],
        cta: { text: 'For Enterprise', url: '/enterprise' },
        logos: [logo(1, 'qonto'), logo(2, 'verbit'), logo(3, 'etoro'), logo(4, 'inspera'), logo(5, 'winningtemp'), logo(6, 'wisestamp')], // FROM OLD SITE: confirm
      },
      {
        _key: '113c973e5bc7',
        category: 'Operate · Monthly',
        title: [{ text: 'We stay and own the outcome.' }],
        body: [{ text: 'We run and monitor your agents every month and report against your baseline. Risky cases wait for a person, so humans stay in the loop and your team stops babysitting automation.' }],
        cta: { text: 'Explore Evals and Guardrails', url: '/services/evals-and-guardrails' },
      },
    ],
  },
  quote: {
    quote: [{ text: 'We run your busiest workflow with agents, measured against your baseline from day one.' }],
    video: { url: '/home/homepage-secondary.mp4' },
  },
  applications: {
    headline: 'Artificial Intelligence',
    realWord: 'Real',
    cta: { text: 'Get started', url: '/demo', variant: 'fill' },
    items: [
      { _key: '278a91960588', applicationType: 'Back-office Sync', image: { path: '/home/app-finance.webp', alt: 'Month-end close report' }, link: { url: '/services/back-office-sync' }, textColor: FOUNDRY },
      { _key: '6f8b0063ba12', applicationType: 'Knowledge', image: { path: '/home/app-life-sciences.webp', alt: 'Sourced answers list' }, link: { url: '/services/knowledge-agents' }, textColor: FOUNDRY },
      { _key: '139aba2ad2f1', applicationType: 'Document Intake', image: { path: '/home/app-insurance.webp', alt: 'Claim form and extracted fields' }, link: { url: '/services/document-intake' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: '106cd65eb545', applicationType: 'Production Rescue', image: { path: '/home/app-energy.webp', alt: 'Offshore platform at dusk' }, link: { url: '/services/production-rescue' }, textColor: FOUNDRY },
      { _key: 'a84fabdf3395', applicationType: 'Integrations', image: { path: '/home/app-infrastructure.webp', alt: 'Network tower in a forest' }, link: { url: '/services/context-and-integrations' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: 'ac4820379d42', applicationType: 'Strategy and Audit', image: { path: '/home/app-legal.webp', alt: 'Reviewed document with highlights' }, link: { url: '/services/ai-strategy-and-audit' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: '695de232a42d', applicationType: 'Decision Scoring', image: { path: '/home/app-manufacturing.webp', alt: 'Quote check with a score' }, link: { url: '/services/scoring-and-decisions' }, textColor: PURPLE },
      { _key: '85cba285fa3f', applicationType: 'Sales and Booking', image: { path: '/home/app-retail.webp', alt: 'Orders and bookings queue' }, link: { url: '/services/sales-and-booking' }, textColor: FOUNDRY },
      { _key: '8352cf9b1cd8', applicationType: 'Product Engineering', image: { path: '/home/app-ops.webp', alt: 'Product board' }, link: { url: '/services/ai-product-engineering' }, textColor: PURPLE },
      { _key: '7d2b48afb58a', applicationType: 'AI Specialists', image: { path: '/home/app-healthcare.webp', alt: 'Specialist at work' }, link: { url: '/services/embedded-specialists' }, textColor: FOUNDRY },
      { _key: 'b0731c77da57', applicationType: 'Support and Voice', image: { path: '/home/app-customer-service.webp', alt: 'Voice agent conversation' }, link: { url: '/services/support-and-voice' }, textColor: FOUNDRY },
      { _key: '55ff0680e844', applicationType: 'Evals and Guardrails', image: { path: '/home/app-shipping.webp', alt: 'Status checks on real cases' }, link: { url: '/services/evals-and-guardrails' }, textColor: EVERGREEN, animationDirection: 'right' },
    ],
    carousel: {
      header: [{ text: 'Proven across every workflow.' }], // PLACEHOLDER: until real cases are in
      cards: [
        { _key: 'c1', heading: [{ text: 'Cutting response time from 1 hour to 5 minutes, with 70% of routine queries auto-resolved.' }], image: { path: '/site/nav/neutral.svg', alt: '' }, imageSubtitle: 'Wealth management firm' }, // FROM OLD SITE: confirm
        { _key: 'c2', heading: [{ text: 'Tracking 20+ competitors across 2,000+ parameters daily, with a 2-hour response to changes.' }], image: { path: '/site/nav/neutral.svg', alt: '' }, imageSubtitle: 'EdTech company, NDA' }, // FROM OLD SITE: confirm
        { _key: 'c3', heading: [{ text: 'Cutting search time by 75% across 10,000+ documents with smart AI search.' }], image: { path: '/site/nav/neutral.svg', alt: '' }, imageSubtitle: 'Home appliance brand, NDA' }, // FROM OLD SITE: confirm
        { _key: 'c4', heading: [{ text: 'Cutting support tickets by 60% with 24/7 AI support and 95% CSAT.' }], image: { path: '/site/nav/neutral.svg', alt: '' }, imageSubtitle: 'E-commerce platform', link: { url: '/services/support-and-voice' } }, // FROM OLD SITE: confirm
        { _key: 'c5', heading: [{ text: 'Accelerating month-end close across finance and operations.' }], imageSubtitle: 'Services group' }, // PLACEHOLDER
        { _key: 'c6', heading: [{ text: 'Fuelling faster supplier onboarding with agents that read every incoming sheet.' }], imageSubtitle: 'Manufacturer' }, // PLACEHOLDER
        { _key: 'c7', heading: [{ text: 'Enabling quotes in minutes from drawings, photos and price rules.' }], imageSubtitle: 'Equipment maker' }, // PLACEHOLDER
        { _key: 'c8', heading: [{ text: 'Benchmarking agent quality against expert reviewers on real cases.' }], imageSubtitle: 'Contact centre' }, // PLACEHOLDER
        { _key: 'c9', heading: [{ text: 'Accelerating engineering AI adoption with a measured control group.' }], imageSubtitle: 'Software company' }, // PLACEHOLDER
        { _key: 'c10', heading: [{ text: 'Answering hundreds of RFI questions with sourced, compliant drafts.' }], imageSubtitle: 'Pharma services firm' }, // PLACEHOLDER
        { _key: 'c11', heading: [{ text: 'Building agentic AI that drives EBITDA gains across PE portfolio companies.' }], imageSubtitle: 'PE firm' }, // PLACEHOLDER
      ],
    },
  },
  benchmark: {
    heading: 'We set the benchmark for what’s possible with AI',
    cards: [
      {
        _key: 'fc154877c430',
        title: 'Grow volume without growing the team.',
        description: [{ text: 'When volume outgrows the team, a pilot stalls or the next hire is refused, we take the workflow on, so service capacity grows faster than cost.' }],
        icon: 'trendingUp',
        iconColor: PURPLE,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: PURPLE,
        link: { url: '/about', text: 'Learn More' },
      },
      {
        _key: '23a3ecc9cdae',
        title: 'The standard every agent we ship is measured against.',
        description: [{ text: 'Your own past cases and your recorded baseline are the test. You see the share handled correctly and the exceptions flagged before anything goes live.' }],
        icon: 'leaderboard',
        iconColor: FOUNDRY,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: FOUNDRY,
        link: { url: '/services/evals-and-guardrails', text: 'Learn more' },
      },
      {
        _key: '3288b0a5e585',
        title: 'Behind the agent. Behind  the mission. Behind it all.',
        description: [{ text: 'We find the right use case, build the system, and own the outcome, with forward-deployed engineers working inside the systems your team already uses.' }],
        icon: 'joinLeft',
        iconColor: CLOUD,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: CLOUD,
        link: { url: '/services/embedded-specialists', text: 'Learn more' },
      },
    ],
  },
  blog: {
    heading: [{ text: 'From the pilot to the real world.\nThe latest from Vahue.' }],
    posts: [
      { _key: 'p1', title: 'Introducing the Two-Week AI Audit', url: '/blog', alt: '', imageGradientOverlay: false, titleOnly: true }, // PLACEHOLDER
      { _key: 'p2', title: 'Regional Hospital + Vahue: Reliable AI for Better Healthcare', url: '/blog', image: '/home/post-2.webp', alt: '', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p3', title: 'How a mid-market insurer deploys AI that actually works (hint: it’s evals) | Human in the Loop: Episode 13', url: '/blog', image: '/home/post-3.webp', alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p4', title: 'The Next Phase of AI Operations: Governance, Implementation, and Measured Results', url: '/blog', image: '/home/post-4.webp', alt: '', category: { name: 'Operations' }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p5', title: 'Vahue and a Scale-up Distributor Combine Forces to Modernize the Back Office', url: '/blog', image: '/home/post-5.webp', alt: '', category: { name: 'Customers' }, textColor: 'light', imageGradientOverlay: null, titleOnly: false }, // PLACEHOLDER
      { _key: 'p6', title: 'Agent Evals: Raising the Bar for Production AI', url: '/blog', image: '/home/post-6.webp', alt: '', category: { name: 'Research', color: { hex: '#273252' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p7', title: 'Regional Bank & Vahue: Paving the Way for a Digital Future', url: '/blog', image: '/data-engine/prefooter.webp', alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p8', title: 'Expanding Context and Integrations for Document Intake', url: '/blog', image: '/home/post-8.webp', alt: '', category: { name: 'Services', color: { hex: '#575757' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
    ],
  },
  videoCta: {
    backgroundColor: FOUNDRY,
    headline: 'Our agents, your success.',
    description: 'Book a demo today and see it work on your own cases before it goes live.',
    cta: { text: 'Get started', url: '/demo', variant: 'arrow' },
    video: { url: '/home/workflow-lines.mp4' },
  },
}
