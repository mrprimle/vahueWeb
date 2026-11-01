// Scale's copy under the 80% rule, following the worked home example in the positioning doc: same shape and counts as content.scale.ts.
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
    headline: 'The world’s most important work needs reliable AI systems.',
    scrollHint: 'Scroll to explore',
    video: '/home/packed.mp4',
    textures: { perlin: '/home/perlin256.png', numbers: '/home/numbers.png', fallback: '/home/home-fallback-small.jpg' },
    items: [
      {
        _key: '278857e80932',
        title: [{ text: 'Reliable AI has no shortcuts.' }],
        body: [{ text: 'Vahue works across the AI stack, from the data and context your agents rely on, to the systems that put them to work. Humans stay in the loop.' }],
      },
      {
        _key: 'fb20b03e7a10',
        category: 'Applications',
        title: [{ text: 'AI systems that actually work.' }],
        body: [{ text: 'Most AI deployments in enterprise and mid-market fail. We find the right use case, build the system, and own the outcome.' }],
        cta: { text: 'For Enterprise', url: '/enterprise' },
        logos: [logo(1, 40.5), logo(2, 27.5), logo(3, 36), logo(4, 27.5), logo(5, 27.5), logo(6, 27.5)], // PLACEHOLDER
      },
      {
        _key: '113c973e5bc7',
        category: 'Engineers',
        title: [{ text: "The engineers powering the world's best AI agents." }],
        body: [{ text: 'The agents in production run on Vahue engineers. We select experts with precision (25% have shipped production AI) and deliver at the bar enterprise AI demands.' }], // PLACEHOLDER
        cta: { text: 'Explore Our Experts', url: '/experts' },
      },
    ],
  },
  quote: {
    quote: [{ text: '90% of the AI pilots we take on reach production with Vahue.' }], // PLACEHOLDER
    video: { url: '/home/homepage-secondary.mp4' },
  },
  applications: {
    headline: 'Artificial Intelligence',
    realWord: 'Real',
    cta: { text: 'Get started', url: '/demo', variant: 'fill' },
    items: [
      { _key: '278a91960588', applicationType: 'Finance', image: { path: '/home/app-research.webp', alt: 'Finance image' }, link: { url: '/enterprise' }, textColor: FOUNDRY },
      { _key: '6f8b0063ba12', applicationType: 'Life Science', image: { path: '/home/app-life-science.webp', alt: 'Life science image' }, link: { url: '/enterprise/healthcare' }, textColor: FOUNDRY },
      { _key: '139aba2ad2f1', applicationType: 'Insurance', image: { path: '/home/app-medicine.webp', alt: 'Insurance image' }, link: { url: '/enterprise/insurance' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: '106cd65eb545', applicationType: 'Energy', image: { path: '/home/app-energy.webp', alt: 'Energy image' }, link: { url: '/enterprise' }, textColor: FOUNDRY },
      { _key: 'a84fabdf3395', applicationType: 'Infrastructure', image: { path: '/home/app-infrastructure.webp', alt: 'Infrastructure image' }, link: { url: '/enterprise' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: 'ac4820379d42', applicationType: 'Legal', image: { path: '/home/app-sovereignty.webp', alt: 'Legal image' }, link: { url: '/enterprise' }, textColor: EVERGREEN, animationDirection: 'right' },
      { _key: '695de232a42d', applicationType: 'Manufacturing', image: { path: '/home/app-robotics.webp', alt: 'Manufacturing image' }, link: { url: '/physical-ai' }, textColor: PURPLE },
      { _key: '85cba285fa3f', applicationType: 'Retail', image: { path: '/home/app-defense.webp', alt: 'Retail image' }, link: { url: '/enterprise' }, textColor: FOUNDRY },
      { _key: '8352cf9b1cd8', applicationType: 'Operations', image: { path: '/home/app-operations.webp', alt: 'Operations image' }, link: { url: '/data-engine' }, textColor: PURPLE },
      { _key: '7d2b48afb58a', applicationType: 'Healthcare', image: { path: '/home/app-healthcare.webp', alt: 'Healthcare image' }, link: { url: '/enterprise/healthcare' }, textColor: FOUNDRY },
      { _key: 'b0731c77da57', applicationType: 'Customer Service', image: { path: '/home/app-autonomy.webp', alt: 'Customer service image' }, link: { url: '/donovan' }, textColor: FOUNDRY },
      { _key: '55ff0680e844', applicationType: 'Logistics', image: { path: '/home/app-logistics.webp', alt: 'Logistics image' }, link: { url: '/enterprise' }, textColor: EVERGREEN, animationDirection: 'right' },
    ],
    carousel: {
      header: [{ text: 'Proven across every industry.' }],
      cards: [
        { _key: 'c1', heading: [{ text: 'Turning thousands of incoming claims into clean, checked records.' }], imageSubtitle: 'Insurer' }, // PLACEHOLDER
        { _key: 'c2', heading: [{ text: 'Partnering to keep CRM, ERP and finance in step.' }], imageSubtitle: 'Distributor' }, // PLACEHOLDER
        { _key: 'c3', heading: [{ text: 'Reducing analyst load by turning complex reports into sourced answers.' }], imageSubtitle: 'Financial services group' }, // PLACEHOLDER
        { _key: 'c4', heading: [{ text: 'Powering a voice agent that answers, qualifies and books every call.' }], imageSubtitle: 'Property manager', link: { url: '/donovan' } }, // PLACEHOLDER
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
        title: "10 years putting AI to work in the world's busiest operations.", // PLACEHOLDER
        description: [{ text: "Since 2016, we've been at the forefront; from machine learning to AI agents solving the world's hardest problems." }], // PLACEHOLDER
        icon: 'trendingUp',
        iconColor: PURPLE,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: PURPLE,
        link: { url: '/about', text: 'Learn More' },
      },
      {
        _key: '23a3ecc9cdae',
        title: 'The standard every agent we ship is measured against.',
        description: [{ text: 'Our evals run private benchmarks on your own cases so every agent proves itself before it goes live.' }],
        icon: 'leaderboard',
        iconColor: FOUNDRY,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: FOUNDRY,
        link: { url: '/labs/leaderboard', text: 'Learn more' },
      },
      {
        _key: '3288b0a5e585',
        title: 'Behind the agent. Behind  the mission. Behind it all.',
        description: [{ text: 'Only Vahue has the applied research, world’s best engineers, and deployment experience to build AI that works in the real world.' }],
        icon: 'joinLeft',
        iconColor: CLOUD,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: CLOUD,
        link: { url: '/generative-ai-data-engine', text: 'Learn more' },
      },
    ],
  },
  blog: {
    heading: [{ text: 'From the Lab to the real world.\nThe latest from Vahue.' }],
    posts: [
      { _key: 'p1', title: 'Introducing Vahue Labs', url: '/blog', alt: '', imageGradientOverlay: false, titleOnly: true }, // PLACEHOLDER
      { _key: 'p2', title: 'Regional Hospital + Vahue: Reliable AI for Better Healthcare', url: '/blog', image: NEUTRAL, alt: '', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p3', title: 'How a mid-market insurer deploys AI that actually works (hint: it’s evals) | Human in the Loop: Episode 13', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p4', title: 'The Next Phase of U.S. AI Policy: Governance, Implementation, and Global Leadership', url: '/blog', image: '/home/blog-4.webp', alt: '', category: { name: 'Public Sector' }, textColor: 'light', imageGradientOverlay: false, titleOnly: false }, // PLACEHOLDER
      { _key: 'p5', title: 'Vahue and a National Agency Combine Forces to Modernize the Back Office', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Public Sector' }, textColor: 'light', imageGradientOverlay: null, titleOnly: false }, // PLACEHOLDER
      { _key: 'p6', title: 'Agent Evals: Raising the Bar for Agentic Coding', url: '/blog', image: NEUTRAL, alt: '', category: { name: 'Research', color: { hex: '#273252' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p7', title: 'Regional Bank & Vahue: Paving the Way for a Digital Future', url: '/blog', image: '/home/blog-7.webp', alt: '', category: { name: 'Company', color: { hex: '#A8927C' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { _key: 'p8', title: 'Expanding Our Context Engine for Document Intake', url: '/blog', image: '/home/blog-8.webp', alt: '', category: { name: 'Product', color: { hex: '#575757' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
    ],
  },
  videoCta: {
    backgroundColor: FOUNDRY,
    headline: 'Our legacy, your success.',
    description: 'Book a demo today and see how Vahue can build reliable AI for your organization.',
    cta: { text: 'Get started', url: '/demo', variant: 'arrow' },
    video: { url: '/home/satellite.mp4' },
  },
}
