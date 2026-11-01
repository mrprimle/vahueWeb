// Scale's original strings and assets for https://scale.com/, read from the page's RSC payload on 2026-11-01.
import type { HomeColor, HomeContent } from './content.types'

const FOUNDRY: HomeColor = { hex: '#A8927C', contrastColor: '#010101', tailwindClass: 'foundry-tan' }
const EVERGREEN: HomeColor = { hex: '#193A29', contrastColor: '#FFFFFF', tailwindClass: 'evergreen' }
const PURPLE: HomeColor = { hex: '#79648C', contrastColor: '#FFFFFF', tailwindClass: 'archive-purple' }
const CLOUD: HomeColor = { hex: '#839CB2', contrastColor: '#010101', tailwindClass: 'cloud-slate' }

export const content: HomeContent = {
  hero: {
    headline: 'The world’s most important decisions need reliable AI systems.',
    scrollHint: 'Scroll to explore',
    video: '/home/packed.mp4',
    textures: { perlin: '/home/perlin256.png', numbers: '/home/numbers.png', fallback: '/home/home-fallback-small.jpg' },
    items: [
      {
        _key: '278857e80932',
        title: [{ text: 'Reliable AI has no shortcuts.' }],
        body: [{ text: 'Scale works across the AI stack, from the data that trains the models you rely on, to the systems that put them to work. Humans stay in the loop.' }],
      },
      {
        _key: 'fb20b03e7a10',
        category: 'Applications',
        title: [{ text: 'AI systems that actually work.' }],
        body: [{ text: 'Most AI deployments in enterprise and government fail. We find the right use case, build the system, and own the outcome.' }],
        cta: { text: 'For Enterprise', url: '/enterprise' },
        logos: [
          { _id: '21aca9ad', alt: 'NVIDIA', path: '/home/hero-logo-1.png', width: 40.5, height: 30 },
          { _id: '6bfea235', alt: 'Mayo Clinic', path: '/home/hero-logo-2.png', width: 27.5, height: 30 },
          { _id: '44a21625', alt: 'British Petroleum Logo', path: '/home/hero-logo-3.png', width: 36, height: 30 },
          { _id: '7f08cd56', alt: 'Rocket Logo', path: '/home/hero-logo-4.png', width: 27.5, height: 30 },
          { _id: 'a8a1345f', alt: 'Defense Innovation Unit Logo', path: '/home/hero-logo-5.png', width: 27.5, height: 30 },
          { _id: '5e3c1ec6', alt: 'Paramount Logo', path: '/home/hero-logo-6.png', width: 27.5, height: 30 },
        ],
      },
      {
        _key: '113c973e5bc7',
        category: 'Data',
        title: [{ text: "The data powering the world's best AI." }],
        body: [{ text: 'The models at the frontier run on Scale data. We source contributors with precision (25% have advanced degrees) and deliver at the bar frontier AI demands.' }],
        cta: { text: 'Explore Data Engine', url: '/data-engine' },
      },
    ],
  },
  quote: {
    quote: [{ text: "90% of the world's leading generative AI model builders are powered by Scale." }],
    video: { url: '/home/homepage-secondary.mp4' },
  },
  applications: {
    headline: 'Artificial Intelligence',
    realWord: 'Real',
    cta: { text: 'Get started', url: '/demo', variant: 'fill' },
    items: [
  { _key: "278a91960588", applicationType: "Research", image: { path: '/home/app-research.webp', alt: "Research image" }, link: { url: "https://labs.scale.com/" }, textColor: FOUNDRY },
  { _key: "6f8b0063ba12", applicationType: "Life Science", image: { path: '/home/app-life-science.webp', alt: "Medicine image" }, link: { url: "/physical-ai" }, textColor: FOUNDRY },
  { _key: "139aba2ad2f1", applicationType: "Medicine", image: { path: '/home/app-medicine.webp', alt: "Decisions image" }, link: { url: "/enterprise/healthcare" }, textColor: EVERGREEN, animationDirection: 'right' },
  { _key: "106cd65eb545", applicationType: "Energy", image: { path: '/home/app-energy.webp', alt: "Energy image" }, link: { url: "/enterprise" }, textColor: FOUNDRY },
  { _key: "a84fabdf3395", applicationType: "Infrastructure", image: { path: '/home/app-infrastructure.webp', alt: "Impact image" }, link: { url: "/enterprise" }, textColor: EVERGREEN, animationDirection: 'right' },
  { _key: "ac4820379d42", applicationType: "Sovereignty", image: { path: '/home/app-sovereignty.webp', alt: "Sovereignty image" }, link: { url: "/global-public-sector" }, textColor: EVERGREEN, animationDirection: 'right' },
  { _key: "695de232a42d", applicationType: "Robotics", image: { path: '/home/app-robotics.webp', alt: "Robots image" }, link: { url: "/physical-ai" }, textColor: PURPLE },
  { _key: "85cba285fa3f", applicationType: "Defense", image: { path: '/home/app-defense.webp', alt: "Capabilities image" }, link: { url: "/public-sector" }, textColor: FOUNDRY },
  { _key: "8352cf9b1cd8", applicationType: "Operations", image: { path: '/home/app-operations.webp', alt: "Supply chains image" }, link: { url: "/public-sector-data-engine" }, textColor: PURPLE },
  { _key: "7d2b48afb58a", applicationType: "Healthcare", image: { path: '/home/app-healthcare.webp', alt: "Consequences image" }, link: { url: "/enterprise/healthcare" }, textColor: FOUNDRY },
  { _key: "b0731c77da57", applicationType: "Autonomy", image: { path: '/home/app-autonomy.webp', alt: "Driving image" }, link: { url: "/automotive" }, textColor: FOUNDRY },
  { _key: "55ff0680e844", applicationType: "Logistics", image: { path: '/home/app-logistics.webp', alt: "Logistics image" }, link: { url: "/public-sector" }, textColor: EVERGREEN, animationDirection: 'right' },
    ],
    carousel: {
      header: [{ text: 'Proven across every industry.' }],
      cards: [
  { _key: "f4b05d9b2a04", heading: [{ text: "Turning raw, classified data into actionable intelligence." }], image: { path: '/home/logo-cdao.png', alt: '' }, imageSubtitle: "CDAO" },
  { _key: "929c605f03ac", heading: [{ text: "Partnering to accelerate Meta's LLM and Generative AI." }], image: { path: '/home/logo-meta.png', alt: '' }, imageSubtitle: "Meta" },
  { _key: "7a332b5ad757", heading: [{ text: "Reducing physician cognitive load by turning complex patient records into clinical intelligence." }], image: { path: '/home/logo-mayo-clinic.png', alt: '' }, imageSubtitle: "Mayo Clinic" },
  { _key: "b244760a1624", heading: [{ text: "Powering an interactive AI experience that brings a century of journalism to life." }], image: { path: '/home/logo-time.png', alt: '' }, imageSubtitle: "Time", link: { url: "/customers/time" } },
  { _key: "cfc3ce836da7", heading: [{ text: "Accelerating real estate development revenue and operations." }], image: { path: '/home/logo-howard-hughes.png', alt: '' }, imageSubtitle: "Howard Hughes" },
  { _key: "ae68eca93ad8", heading: [{ text: "Fuelling the next generation of robotic foundation models with real-world training data." }], image: { path: '/home/logo-physical-intelligence.png', alt: '' }, imageSubtitle: "Physical Intelligence" },
  { _key: "892d0f99ef2f", heading: [{ text: "Enabling scalable, real-world Physical AI for industrial robotics." }], image: { path: '/home/logo-universal-robots.png', alt: '' }, imageSubtitle: "Universal Robots" },
  { _key: "b59b24bcfeba", heading: [{ text: "Benchmarking the frontier of AI capability with expert-level evaluations." }], image: { path: '/home/logo-center-for-ai-safety.png', alt: '' }, imageSubtitle: "Center for AI Safety" },
  { _key: "0cfbe7529aa7", heading: [{ text: "Accelerating enterprise AI adoption across global energy operations." }], image: { path: '/home/logo-british-petroleum.png', alt: '' }, imageSubtitle: "British Petroleum" },
  { _key: "3e17f503bd37", heading: [{ text: "Enabling smarter, more personalized learning experiences for students and educators at scale." }], image: { path: '/home/logo-cengage.png', alt: '' }, imageSubtitle: "Cengage" },
  { _key: "8a6cdae9cb96", heading: [{ text: "Building agentic AI that drives EBITDA gains across PE portfolio companies." }], image: { path: '/home/logo-shore-capital.png', alt: '' }, imageSubtitle: "Shore Capital" },
      ],
    },
  },
  benchmark: {
    heading: 'We set the benchmark for what’s possible with AI',
    cards: [
      {
        _key: 'fc154877c430',
        title: "10 years powering the world's biggest AI breakthroughs.",
        description: [{ text: "Since 2016, we've been at the forefront; from autonomous vehicles to frontier models solving the world's hardest problems." }],
        icon: 'trendingUp',
        iconColor: PURPLE,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: PURPLE,
        link: { url: '/about', text: 'Learn More' },
      },
      {
        _key: '23a3ecc9cdae',
        title: 'The standard every frontier model is measured against.',
        description: [{ text: 'Our leaderboards run private benchmarks for the most ambitious AI companies to improve model capabilities.' }],
        icon: 'leaderboard',
        iconColor: FOUNDRY,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: FOUNDRY,
        link: { url: '/labs/leaderboard', text: 'Learn more' },
      },
      {
        _key: '3288b0a5e585',
        title: 'Behind the model. Behind  the mission. Behind it all.',
        description: [{ text: 'Only Scale has the frontier research, world’s best data, and deployment experience to build AI that works in the real world.' }],
        icon: 'joinLeft',
        iconColor: CLOUD,
        iconBgColor: { hex: '#FFFFFF' },
        hoveredColor: CLOUD,
        link: { url: '/generative-ai-data-engine', text: 'Learn more' },
      },
    ],
  },
  blog: {
    heading: [{ text: 'From the Lab to the real world.\nThe latest from Scale.' }],
    posts: [
  { _key: "3162fd7b3f4a", title: "Introducing Scale Labs", url: "/blog/scale-labs", image: undefined, alt: "", category: undefined, textColor: undefined, imageGradientOverlay: false, titleOnly: true },
  { _key: "0179e90f5ef6", title: "Mayo Clinic + Scale: Reliable AI for Better Healthcare", url: "/blog/mayo-clinic-scale", image: '/home/blog-2.webp', alt: "", category: undefined, textColor: undefined, imageGradientOverlay: false, titleOnly: false },
  { _key: "9c26a8e85ff0", title: "How Morgan Stanley deploys AI that actually works (hint: it's evals) | Human in the Loop: Episode 13", url: "/blog/hitl-ep13-ai-evals-in-practice", image: '/home/blog-3.webp', alt: "Scale and Morgan Stanley", category: { name: "Company", color: { hex: "#A8927C" } }, textColor: "dark", imageGradientOverlay: false, titleOnly: false },
  { _key: "91592ab36e54", title: "The Next Phase of U.S. AI Policy: Governance, Implementation, and Global Leadership", url: "/blog/next-phase-us-ai-policy", image: '/home/blog-4.webp', alt: "", category: { name: "Public Sector" }, textColor: "light", imageGradientOverlay: false, titleOnly: false },
  { _key: "6fcb8f5e838d", title: "Scale AI and BAE Systems Combine Forces to Modernize the Tactical Edge", url: "/blog/scale-bae-modernize-tactical-edge", image: '/home/blog-5.webp', alt: "Scale AI and BAE Systems company logos positioned side-by-side against a black background", category: { name: "Public Sector" }, textColor: "light", imageGradientOverlay: null, titleOnly: false },
  { _key: "cdae80fc1d0e", title: "SWE-Bench Pro: Raising the Bar for Agentic Coding", url: "/blog/swe-bench-pro", image: '/home/blog-6.webp', alt: "", category: { name: "Research", color: { hex: "#273252" } }, textColor: "light", imageGradientOverlay: true, titleOnly: false },
  { _key: "6943c06e8465", title: "MCIT & Scale AI: Paving the Way for Qatar’s Digital Future", url: "/blog/mcit-scale", image: '/home/blog-7.webp', alt: "", category: { name: "Company", color: { hex: "#A8927C" } }, textColor: "light", imageGradientOverlay: true, titleOnly: false },
  { _key: "419c29bd543b", title: "Expanding Our Data Engine for Physical AI", url: "/blog/physical-ai", image: '/home/blog-8.webp', alt: "Robotics", category: { name: "Product", color: { hex: "#575757" } }, textColor: "light", imageGradientOverlay: true, titleOnly: false },
    ],
  },
  videoCta: {
    backgroundColor: FOUNDRY,
    headline: 'Our legacy, your success.',
    description: 'Book a demo today and see how Scale can build reliable AI for your organization.',
    cta: { text: 'Get started', url: '/demo', variant: 'arrow' },
    video: { url: '/home/satellite.mp4' },
  },
}
