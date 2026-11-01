// AJTBD copy from research/research.ts, same shape and counts as content.scale.ts.
// Lines marked PLACEHOLDER are for Mike to replace with real numbers, clients and logos.
import type { HeroLogo, HomeColor, HomeContent } from './content.types'

const FOUNDRY: HomeColor = { hex: '#A8927C', contrastColor: '#010101', tailwindClass: 'foundry-tan' }
const EVERGREEN: HomeColor = { hex: '#193A29', contrastColor: '#FFFFFF', tailwindClass: 'evergreen' }
const PURPLE: HomeColor = { hex: '#79648C', contrastColor: '#FFFFFF', tailwindClass: 'archive-purple' }
const CLOUD: HomeColor = { hex: '#839CB2', contrastColor: '#010101', tailwindClass: 'cloud-slate' }

// Neutral stand-in for images with another company's name or product baked in.
const NEUTRAL = '/site/nav/neutral.svg'
const logo = (id: number, width: number): HeroLogo => ({ _id: `logo-${id}`, alt: 'Logo', width, height: 30 })

export const content: HomeContent = {
  hero: {
    headline: 'Your busiest workflows, run by agents. Measured from day one.',
    scrollHint: 'Scroll to explore',
    video: '/home/packed.mp4',
    textures: { perlin: '/home/perlin256.png', numbers: '/home/numbers.png', fallback: '/home/home-fallback-small.jpg' },
    items: [
      {
        _key: 'promise',
        title: [{ text: 'Growth needs no new hires.' }],
        body: [{ text: 'We take a high-volume workflow off your team and run it with AI agents inside the tools you already use, so operations keep up. People stay in the loop.' }],
      },
      {
        _key: 'operate',
        category: 'Workflows',
        title: [{ text: 'Agents that run the work.' }],
        body: [{ text: 'Most automation stalls after the pilot. We map the workflow, build the agents, and run them for you every month.' }],
        cta: { text: 'For Operations Teams', url: '/enterprise' },
        logos: [logo(1, 40.5), logo(2, 27.5), logo(3, 36), logo(4, 27.5), logo(5, 27.5), logo(6, 27.5)], // PLACEHOLDER
      },
      {
        _key: 'baseline',
        category: 'Baseline',
        title: [{ text: 'A baseline for every agent you run.' }],
        body: [{ text: 'Every workflow starts with a recorded baseline. We measure volume, minutes per item and error rate (25% fewer errors in month one) and report against it monthly.' }], // PLACEHOLDER
        cta: { text: 'Explore All Workflows', url: '/data-engine' },
      },
    ],
  },
  quote: {
    quote: [{ text: '90% of the operations teams we pilot with keep their agents running on Vahue.' }], // PLACEHOLDER
    video: { url: '/home/homepage-secondary.mp4' },
  },
  applications: {
    headline: 'AI Agents',
    realWord: 'Real',
    cta: { text: 'Book an audit', url: '/demo', variant: 'fill' },
    items: [
      { _key: 'invoices', applicationType: 'Invoices', image: { path: '/home/app-research.webp', alt: 'Invoices image' }, link: { url: '/physical-ai' }, textColor: FOUNDRY },
      { _key: 'claims', applicationType: 'Claims', image: { path: '/home/app-life-science.webp', alt: 'Claims image' }, link: { url: '/enterprise/insurance' }, textColor: FOUNDRY },
      { _key: 'clinical', applicationType: 'Clinical Notes', image: { path: '/home/app-medicine.webp', alt: 'Clinical notes image' }, link: { url: '/enterprise/healthcare' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: 'reconciliations', applicationType: 'Reconciliations', image: { path: '/home/app-energy.webp', alt: 'Reconciliations image' }, link: { url: '/generative-ai-data-engine' }, textColor: FOUNDRY },
      { _key: 'suppliers', applicationType: 'Supplier Sheets', image: { path: '/home/app-infrastructure.webp', alt: 'Supplier sheets image' }, link: { url: '/physical-ai' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: 'records', applicationType: 'Public Records', image: { path: '/home/app-sovereignty.webp', alt: 'Public records image' }, link: { url: '/global-public-sector' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: 'answers', applicationType: 'Answers', image: { path: '/home/app-robotics.webp', alt: 'Answers image' }, link: { url: '/genai-portfolio' }, textColor: PURPLE },
      { _key: 'cases', applicationType: 'Case Files', image: { path: '/home/app-defense.webp', alt: 'Case files image' }, link: { url: '/public-sector' }, textColor: FOUNDRY },
      { _key: 'exceptions', applicationType: 'Exceptions', image: { path: '/home/app-operations.webp', alt: 'Exceptions image' }, link: { url: '/public-sector-data-engine' }, textColor: PURPLE },
      { _key: 'tickets', applicationType: 'Tickets', image: { path: '/home/app-healthcare.webp', alt: 'Tickets image' }, link: { url: '/donovan' }, textColor: FOUNDRY },
      { _key: 'decisions', applicationType: 'Decisions', image: { path: '/home/app-autonomy.webp', alt: 'Decisions image' }, link: { url: '/automotive' }, textColor: FOUNDRY },
      { _key: 'reviews', applicationType: 'Code Reviews', image: { path: '/home/app-logistics.webp', alt: 'Code reviews image' }, link: { url: '/rlenvironments' }, textColor: EVERGREEN, animationDirection: 'right' },
    ],
    carousel: {
      header: [{ text: 'Proven in every back office.' }],
      cards: [
        { _key: 'c1', heading: [{ text: 'Turning every incoming claim into a clean, checked record.' }], imageSubtitle: 'Mid-market insurer' }, // PLACEHOLDER
        { _key: 'c2', heading: [{ text: 'Partnering to keep CRM, ERP and finance in step.' }], imageSubtitle: 'Regional distributor' }, // PLACEHOLDER
        { _key: 'c3', heading: [{ text: 'Reducing reviewer load by turning long trial documents into short, sourced clinical summaries.' }], imageSubtitle: 'Life sciences group' }, // PLACEHOLDER
        { _key: 'c4', heading: [{ text: 'Powering a support agent that resolves routine order requests around the clock for customers.' }], imageSubtitle: 'Online retailer', link: { url: '/donovan' } }, // PLACEHOLDER
        { _key: 'c5', heading: [{ text: 'Accelerating month-end reconciliation across finance and operations.' }], imageSubtitle: 'Property services group' }, // PLACEHOLDER
        { _key: 'c6', heading: [{ text: 'Fuelling faster supplier onboarding with agents that read and check every incoming sheet.' }], imageSubtitle: 'Industrial manufacturer' }, // PLACEHOLDER
        { _key: 'c7', heading: [{ text: 'Enabling quotes, configurators and bills of materials from drawings.' }], imageSubtitle: 'Equipment maker' }, // PLACEHOLDER
        { _key: 'c8', heading: [{ text: 'Benchmarking review quality with agreement tracked against expert reviewers.' }], imageSubtitle: 'Contact centre operator' }, // PLACEHOLDER
        { _key: 'c9', heading: [{ text: 'Accelerating engineering AI adoption with a measured control group.' }], imageSubtitle: 'Software company' }, // PLACEHOLDER
        { _key: 'c10', heading: [{ text: 'Enabling sourced answers from scattered documents for staff and new hires in Teams.' }], imageSubtitle: 'Consulting firm' }, // PLACEHOLDER
        { _key: 'c11', heading: [{ text: 'Building KYC document intake that clears backlogs across lending and compliance.' }], imageSubtitle: 'Regional bank' }, // PLACEHOLDER
      ],
    },
  },
  benchmark: {
    heading: 'We set the baseline for what your agents deliver',
    cards: [
      {
        _key: 'years',
        title: '87 published automation cases shaped every workflow we run.', // PLACEHOLDER
        description: [{ text: "Since 2024, we've run the work; from back-office sync and document intake to support agents solving your busiest problems." }], // PLACEHOLDER
        icon: 'trendingUp',
        iconColor: PURPLE,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: PURPLE,
        link: { url: '/about', text: 'Learn More' },
      },
      {
        _key: 'standard',
        title: 'The baseline every agent is measured against.',
        description: [{ text: 'Our audits record volume, minutes, errors and cost so every agent reports against the same baseline.' }],
        icon: 'leaderboard',
        iconColor: FOUNDRY,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: FOUNDRY,
        link: { url: '/labs/leaderboard', text: 'Learn more' },
      },
      {
        _key: 'behind',
        title: 'Behind the agent. Behind the workflow. Behind it all.',
        description: [{ text: 'Only Vahue pairs the research, the baseline data, and the monthly operations to run agents that keep working long after launch.' }],
        icon: 'joinLeft',
        iconColor: CLOUD,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: CLOUD,
        link: { url: '/generative-ai-data-engine', text: 'Learn more' },
      },
    ],
  },
  blog: {
    heading: [{ text: 'From the audit to the real work.\nThe latest from Vahue.' }],
    posts: [
      { _key: 'p1', title: 'Introducing Vahue Audits', url: '/blog', alt: '', imageGradientOverlay: false, titleOnly: true }, // PLACEHOLDER
      { _key: 'p2', title: 'Regional Hospital + Vahue: Cleaner Clinical Documentation at Volume', url: '/blog', image: NEUTRAL, alt: '', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p3', title: 'How a mid-market insurer runs agents that actually work (hint: it’s baselines) | Human in the Loop: Episode 13', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p4', title: 'The Next Phase of Back-Office Automation: Handover, Monitoring, and Monthly Reporting', url: '/blog', image: '/home/blog-4.webp', alt: '', category: { name: 'Operations' }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p5', title: 'Vahue and a Regional Distributor Combine Forces to Modernize Supplier Onboarding', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Operations' }, textColor: 'light', imageGradientOverlay: null, titleOnly: false }, // PLACEHOLDER
      { _key: 'p6', title: 'Control Groups: Raising the Bar for Engineering Enablement', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Research', color: { hex: '#273252' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p7', title: 'Regional Bank & Vahue: Paving the Way for Faster KYC Intake', url: '/blog', image: '/home/blog-7.webp', alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p8', title: 'Expanding Our Document Intake for Supplier Sheets', url: '/blog', image: '/home/blog-8.webp', alt: '', category: { name: 'Product', color: { hex: '#575757' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
    ],
  },
  videoCta: {
    backgroundColor: FOUNDRY,
    headline: 'Your workflow, our agents.',
    description: 'Book an audit today and see how Vahue can run your busiest workflow for you.',
    cta: { text: 'Book an audit', url: '/demo', variant: 'arrow' },
    video: { url: '/home/satellite.mp4' },
  },
}
