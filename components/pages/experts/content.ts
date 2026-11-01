// Copy for /experts: Vahue's expert engineer network. Scale's copy stays unless it is false for Vahue, then a couple of words change.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are claims for Mike to replace with real data.
import type { DomainLogo, ExpertsContent } from './types'

const NEUTRAL = '/site/nav/neutral.svg'
// Scale's logo boxes, tile by tile. The source file is one neutral tile that reads "Logo".
const logos = (sizes: [number, number][]): DomainLogo[] => sizes.map(([width, height]) => ({ src: '/experts/logo-tile.svg', alt: 'Logo', width, height }))

export const content: ExpertsContent = {
  meta: {
    title: 'Expert AI Engineers | Vahue',
    description: "Build your AI agents with Vahue's network of verified engineers, operators, and domain experts. Bring production-grade expertise to your hardest workflows.", // PLACEHOLDER
  },
  hero: {
    headline: 'The human experts behind AI agents.',
    body: "Millions of experts deployed against the world's hardest workflow problems.", // PLACEHOLDER
    cta: {"text":"Work With Us","url":"/demo"},
    backdrop: {"tailwindClass":"white","contrastColor":"#010101"},
    video: {"url":"/experts/hero.mp4"},
    poster: "/experts/hero-poster.webp",
  },
  cardGrid: {
    heading: "World class experts from top institutions", // PLACEHOLDER
    cards: [
      { key: "academic", title: "Elite academic backgrounds", description: "Alumni of every Ivy League school, plus Stanford, MIT, and beyond", hoveredColor: "foundry-tan" }, // PLACEHOLDER
      { key: "industry", title: "Deep, top-tier industry experience", description: "Representation from employees of 60%+ of the Fortune 500", hoveredColor: "archive-purple" }, // PLACEHOLDER
      { key: "worldwide", title: "Worldwide representation", description: "65+ languages. 117 countries.", hoveredColor: "scale-gray-60" }, // PLACEHOLDER
      { key: "domain", title: "Specialized domain expertise", description: "Expertise across 370+ unique fields", hoveredColor: "cloud-slate" }, // PLACEHOLDER
    ],
  },
  domains: {
    headline: "The best minds in",
    labels: {"who":"Who they are","expertise":"Expertise","projectType":"Project Type","publications":"Track Record"},
    items: [
      {
        label: "Finance",
        key: "finance",
        color: "#193A29",
        whoTheyAre: "Investment bankers, sell-side analysts, portfolio managers, quant researchers, risk & compliance officers, buy-side private equity analysts", // PLACEHOLDER
        skills: "Financial statement analysis, earnings modeling, valuation methodology, trading logic",
        projectType: "Financial reasoning evaluation, content understanding, prompt generation, and agent output ranking",
        logos: logos([[70, 29], [110, 22], [100, 12], [110, 29], [120, 17], [44, 44], [110, 21], [60, 38], [110, 11], [110, 19], [110, 43], [60, 25], [110, 16], [110, 21], [110, 14], [100, 15], [100, 21], [80, 25]]), // PLACEHOLDER
      },
      {
        label: "Law & Policy",
        key: "law & policy",
        color: "#273252",
        whoTheyAre: "Verified big law partners & practicing attorneys, public policy specialists, regulatory & compliance professionals, M&A corporate counsel, commercial litigators, contract managers, employment lawyers, privacy counsel", // PLACEHOLDER
        skills: "Contract review & clause-level annotation, Regulatory interpretation, Policy drafting & compliance analysis, Case law reasoning & legal citation verification",
        projectType: "Legal reasoning evaluation, content understanding, prompt generation, and agent output ranking",
        logos: logos([[55, 56], [36, 36], [120, 22], [140, 22], [150, 9], [140, 24], [100, 22], [140, 22], [150, 14], [140, 20], [110, 13], [130, 22], [44, 44], [56, 22], [70, 40], [120, 22], [130, 17], [100, 20], [110, 42], [56, 22]]), // PLACEHOLDER
      },
      {
        label: "Healthcare",
        key: "healthcare",
        color: "#1A4A5A",
        whoTheyAre: "Attending physicians, registered nurses, clinical coders, practice managers, patient intake leads — including claims, billing, scheduling, referrals, and revenue cycle specialists", // PLACEHOLDER
        skills: "Clinical documentation review, claims and coding checks, patient intake workflows",
        projectType: "Clinical workflow evaluation, content understanding, prompt generation, and agent output ranking",
        logos: logos([[170, 52], [190, 56], [180, 26], [36, 36], [120, 25], [120, 19], [90, 44], [110, 36], [80, 34], [170, 26], [140, 33]]), // PLACEHOLDER
      },
      {
        label: "Software Engineering",
        key: "software engineering",
        color: "#839CB2",
        whoTheyAre: "Engineers specializing in backend, system & infrastructure, frontend, data, distributed systems, performance, integrations, APIs, automation and security", // PLACEHOLDER
        skills: "Code generation and correctness evaluation, security vulnerability identification, system architecture review, debugging",
        projectType: "Code generation and review, agent testing with verifiable outcomes, tool use evaluation, and agent output ranking",
        logos: logos([[110, 29], [110, 21], [100, 12], [110, 14], [90, 82], [65, 31], [110, 27], [110, 25], [44, 44]]), // PLACEHOLDER
      },
      {
        label: "Other Engineering",
        key: "other engineering",
        color: "#A8927C",
        whoTheyAre: "Industrial and process engineers with hands-on domain expertise across manufacturing, supply chain, and field service operations", // PLACEHOLDER
        skills: "Technical analysis, system design, quality assurance, process review",
        projectType: "Technical task completion, chain-of-thought reasoning, tool use, and agent output ranking",
        logos: logos([[44, 44], [110, 18], [110, 20], [110, 25], [48, 44], [44, 44], [100, 33], [80, 42], [90, 36], [110, 21]]), // PLACEHOLDER
      },
      {
        label: "Revenue & Customer Ops",
        key: "revenue & customer ops",
        color: "#79648C",
        whoTheyAre: "Sales operations leaders, revenue managers, contact centre heads, and support team leads — running high-volume desks at scale-up B2B companies", // PLACEHOLDER
        skills: "Lead qualification, quoting and booking flows, CRM hygiene, call quality review, clean handoffs to sales",
        projectType: "Sales and support reasoning tasks, content understanding, tool use, and agent output ranking",
        peerReviewedPublications: "Verified track records running high-volume sales and support desks across B2B industries", // PLACEHOLDER
        logos: logos([[110, 36], [110, 30], [110, 30], [110, 36], [110, 21], [80, 32], [110, 32], [80, 40], [110, 32], [110, 28], [110, 28], [80, 36], [100, 24], [100, 28], [100, 18], [36, 36], [60, 8], [170, 26]]), // PLACEHOLDER
      },
      {
        label: "Professional Services",
        key: "professional services",
        color: "#3D5566",
        whoTheyAre: "Management consultants, strategy advisors, Big 4 auditors & accountants, actuaries, tax specialists, operations professionals", // PLACEHOLDER
        skills: "Business process analysis, financial controls & audit, strategy frameworks, organizational design",
        projectType: "Business reasoning evaluation, document comprehension & summarization, structured decision-making annotation",
        logos: logos([[110, 22], [118, 22], [72, 22], [55, 22], [22, 22], [120, 22], [120, 22], [110, 22], [130, 22], [110, 22]]), // PLACEHOLDER
      },
    ],
  },
  testimonials: {
    heading: "Expert voices",
    backdrop: {"tailwindClass":"white","contrastColor":"#010101"},
    colorTheme: {"tailwindClass":"evergreen","hex":"#193A29","contrastColor":"#ffffff"},
    items: [
      {
        _key: 'expert-1',
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "I've asked the agents a lot of questions related to a specific coverage exclusion in our commercial property policies, and I've always used my favorite technique in order to solve it: the \"second-source\" method. Now, it often defaults to that technique. So I think somewhere in there, my contributions to the training might be having a visible impact.", // PLACEHOLDER
      },
      {
        _key: 'expert-2',
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "At a mid-market bank, I analyzed regulatory capital data across eight lines of business. It led me to develop a strong intuition that I now use to stump the model: I know precisely where humans make the most mistakes in financial modeling, and I can transfer that knowledge into an agent environment.", // PLACEHOLDER
      },
    ],
  },
  resources: {
    heading: 'Resources',
    posts: [
      { _key: 'leaderboard', title: 'Vahue Labs: AI Agent Leaderboards & Benchmarks', category: 'Leaderboard', image: NEUTRAL, url: '/labs/leaderboard' },
      { _key: 'hfc', title: 'Human Expert Collective: Lead the Future of Intelligence, Together', category: 'Fellowship', image: '/experts/resources-hfc.webp', url: '/careers' },
      { _key: 'network', title: 'Experts: Become the Expert That AI Learns From', category: 'Platform', image: NEUTRAL, url: '/careers' },
      { _key: 'rlenvironments', title: 'Agent Environments for AI Agents', category: 'Product', image: '/experts/resources-rlenvironments.webp', url: '/rlenvironments' },
      { _key: 'back-office', title: 'Back-office Sync', category: 'Product', image: NEUTRAL, url: '/generative-ai-data-engine' },
    ],
  },
  prefooter: {
    headline: "Start with the Right Experts.",
    body: "Vahue's team will match your project to the verified domain experts, fast.", // PLACEHOLDER
    cta: {"text":"Work With Us","url":"/demo"},
    backdrop: {"tailwindClass":"white","contrastColor":"#ffffff"},
    image: "/experts/prefooter.webp",
  },
}
