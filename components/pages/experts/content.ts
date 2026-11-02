// Copy for /experts: the Embedded AI Specialists service, senior people placed inside the client's team. Same shape and counts as content.scale.ts.
// Every size, background or track-record claim is marked PLACEHOLDER for Mike to replace with real data.
import type { DomainLogo, ExpertsContent } from './types'

const NEUTRAL = '/site/nav/neutral.svg'
// Scale's logo boxes, tile by tile. The source file is one neutral tile that reads "Logo".
const logos = (sizes: [number, number][]): DomainLogo[] => sizes.map(([width, height]) => ({ src: '/experts/logo-tile.svg', alt: 'Logo', width, height }))

export const content: ExpertsContent = {
  meta: {
    title: 'Embedded AI Specialists | Senior AI Engineers Inside Your Team | Vahue',
    description: 'Senior AI, data and engineering specialists embedded in your team, for product and engineering leaders who need the capability before the delivery window closes.',
  },
  hero: {
    headline: 'The senior specialists behind your AI roadmap.',
    body: 'Embedded AI Specialists for product and engineering leaders: senior people inside your team, shipping before the delivery window closes.',
    cta: {"text":"Work With Us","url":"/demo"},
    backdrop: {"tailwindClass":"white","contrastColor":"#010101"},
    video: {"url":"/experts/hero.mp4"},
    poster: "/experts/hero-poster.webp",
  },
  cardGrid: {
    heading: "Senior people inside your team",
    cards: [
      { key: "academic", title: "Senior by default", description: "Years of shipping AI to production behind every specialist", hoveredColor: "foundry-tan" }, // PLACEHOLDER
      { key: "industry", title: "Deep, top-tier industry experience", description: "Backgrounds across finance, healthcare, insurance and B2B SaaS", hoveredColor: "archive-purple" }, // PLACEHOLDER
      { key: "worldwide", title: "Working as your team", description: "Your repo, your standups, your time zone. Your engineers keep what gets built.", hoveredColor: "scale-gray-60" },
      { key: "domain", title: "Specialized AI expertise", description: "Across agents, data, evals, infrastructure and product", hoveredColor: "cloud-slate" }, // PLACEHOLDER
    ],
  },
  domains: {
    headline: "Senior specialists in",
    labels: {"who":"Who they are","expertise":"Expertise","projectType":"What they take on","publications":"Track Record"},
    items: [
      {
        label: "AI Engineering",
        key: "ai engineering",
        color: "#193A29",
        whoTheyAre: "LLM and agent engineers, applied ML engineers, backend engineers who have taken AI features from prototype to production", // PLACEHOLDER
        skills: "Agent design, retrieval, model selection, tool use via MCP, structured output",
        projectType: "Agents and AI features for your product, written in your repo and reviewed by your team",
        logos: logos([[70, 29], [110, 22], [100, 12], [110, 29], [120, 17], [44, 44], [110, 21], [60, 38], [110, 11], [110, 19], [110, 43], [60, 25], [110, 16], [110, 21], [110, 14], [100, 15], [100, 21], [80, 25]]), // PLACEHOLDER
      },
      {
        label: "Data & Integrations",
        key: "data & integrations",
        color: "#273252",
        whoTheyAre: "Data engineers, integration engineers and analytics engineers used to messy CRM, ERP and warehouse data", // PLACEHOLDER
        skills: "Pipelines, APIs and connectors, data cleanup, permissions, context preparation",
        projectType: "Connecting agents to your systems of record, and the pipelines your roadmap is waiting on",
        logos: logos([[55, 56], [36, 36], [120, 22], [140, 22], [150, 9], [140, 24], [100, 22], [140, 22], [150, 14], [140, 20], [110, 13], [130, 22], [44, 44], [56, 22], [70, 40], [120, 22], [130, 17], [100, 20], [110, 42], [56, 22]]), // PLACEHOLDER
      },
      {
        label: "Evals & Quality",
        key: "evals & quality",
        color: "#1A4A5A",
        whoTheyAre: "Evaluation engineers, QA engineers and red teamers who test AI against real failure modes", // PLACEHOLDER
        skills: "Eval harnesses, rubrics, test sets from your own cases, prompt attack testing",
        projectType: "Eval suites, guardrails and shadow-mode runs your team keeps using after we roll off",
        logos: logos([[170, 52], [190, 56], [180, 26], [36, 36], [120, 25], [120, 19], [90, 44], [110, 36], [80, 34], [170, 26], [140, 33]]), // PLACEHOLDER
      },
      {
        label: "Infrastructure",
        key: "infrastructure",
        color: "#839CB2",
        whoTheyAre: "Platform, MLOps and site reliability engineers who have run AI under real load", // PLACEHOLDER
        skills: "Deployment, observability, latency and token cost, scaling, rollback",
        projectType: "Production hardening, monitoring, and the on-call gaps around a live AI system",
        logos: logos([[110, 29], [110, 21], [100, 12], [110, 14], [90, 82], [65, 31], [110, 27], [110, 25], [44, 44]]), // PLACEHOLDER
      },
      {
        label: "Product & Design",
        key: "product & design",
        color: "#A8927C",
        whoTheyAre: "AI product managers and designers who have shipped AI features to real users", // PLACEHOLDER
        skills: "Scoping, user research, human-in-the-loop flows, adoption",
        projectType: "Turning a rough AI idea into a spec, a prototype and a release your users trust",
        logos: logos([[44, 44], [110, 18], [110, 20], [110, 25], [48, 44], [44, 44], [100, 33], [80, 42], [90, 36], [110, 21]]), // PLACEHOLDER
      },
      {
        label: "Regulated Industries",
        key: "regulated industries",
        color: "#79648C",
        whoTheyAre: "Specialists from finance, insurance and healthcare operations, including claims, underwriting, compliance and clinical coding", // PLACEHOLDER
        skills: "Audit trails, policy and regulation review, domain test cases, sign-off flows",
        projectType: "Giving your AI team the domain judgment to get regulated workflows right",
        peerReviewedPublications: "Verified track records in regulated operations across finance, insurance and healthcare", // PLACEHOLDER
        logos: logos([[110, 36], [110, 30], [110, 30], [110, 36], [110, 21], [80, 32], [110, 32], [80, 40], [110, 32], [110, 28], [110, 28], [80, 36], [100, 24], [100, 28], [100, 18], [36, 36], [60, 8], [170, 26]]), // PLACEHOLDER
      },
      {
        label: "Revenue & Support",
        key: "revenue & support",
        color: "#3D5566",
        whoTheyAre: "Sales operations leaders, revenue managers, contact center heads, and support team leads who have run high-volume desks at B2B companies", // PLACEHOLDER
        skills: "Lead qualification, quoting and booking flows, CRM hygiene, call quality review, clean handoffs to sales",
        projectType: "Agent behavior for sales and support: qualification logic, call review and hand-off design",
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
        testimonial: "I joined a product team six weeks before their launch. By the end of day one I was in their repo and their standup. We found where the agent failed on their own tickets, fixed it, and wrote it all down. When I rolled off, their engineers owned it, and that is the part I care about most.", // PLACEHOLDER
      },
      {
        _key: 'expert-2',
        clientName: 'Full Name', // PLACEHOLDER
        title: 'Role, Company', // PLACEHOLDER
        testimonial: "At a mid-market bank, I analyzed regulatory capital data across eight lines of business. It gave me a strong intuition that I now bring to every client team: I know precisely where people make the most mistakes in financial models, and I build that knowledge into the evals and guardrails.", // PLACEHOLDER
      },
    ],
  },
  resources: {
    heading: 'Resources',
    posts: [
      { _key: 'evals', title: 'Evals and Guardrails: See It Work on Your Own Cases', category: 'Service', image: NEUTRAL, url: '/services/evals-and-guardrails' },
      { _key: 'careers', title: 'Careers: Join Vahue as an Embedded Specialist', category: 'Careers', image: '/experts/resources-hfc.webp', url: '/careers' },
      { _key: 'rescue', title: 'Production Rescue: Fix or Scale a Live AI System', category: 'Service', image: NEUTRAL, url: '/services/production-rescue' },
      { _key: 'product-engineering', title: 'AI Product Engineering: From Prototype to Production', category: 'Service', image: '/experts/resources-rlenvironments.webp', url: '/services/ai-product-engineering' },
      { _key: 'audit', title: 'AI Strategy and Audit: Find the Right Use Case', category: 'Service', image: NEUTRAL, url: '/services/ai-strategy-and-audit' },
    ],
  },
  prefooter: {
    headline: "Start with the Right Specialists.",
    body: "Tell us what is blocked. Vahue's team will match your roadmap to the right senior specialists, fast.", // PLACEHOLDER
    cta: {"text":"Work With Us","url":"/demo"},
    backdrop: {"tailwindClass":"white","contrastColor":"#ffffff"},
    image: "/experts/prefooter.webp",
  },
}
