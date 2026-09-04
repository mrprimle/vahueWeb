/**
 * JSON-LD schemas for Vahue.
 *
 * Centralized schema definitions used by:
 *  - <Script type="application/ld+json"> blocks in app routes
 *  - Static JSON mirrors at /public/schemas/*.json
 *
 * All facts are derived from /llms.txt and /public/llms/*.md and must stay in sync.
 * If a service/positioning fact changes, update llms.txt FIRST, then this file.
 */

const SITE_URL = 'https://vahue.ai'
const LOGO_URL = `${SITE_URL}/img/white-circle.svg`
const CONTACT_URL = 'https://calendly.com/vahue/meeting-with-mike-from-vahue'

const ORG_ID = `${SITE_URL}/#organization`
const FOUNDER_ID = `${SITE_URL}/#mike-doroshenko`

/* ============================================================
 * Organization
 * ============================================================ */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Vahue',
  alternateName: ['Vahue.ai', 'Vahue AI'],
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    'Vahue is a B2B AI transformation partner that helps companies ship AI features to production, train teams to be AI-fluent, and run enterprise-ready AI systems on their own infrastructure. Three pillars: AI-Native engineering team extension, hands-on team training, and the Vahue AI Hub enterprise agent platform.',
  slogan: 'Accelerate your AI Transformation.',
  foundingDate: '2019',
  founder: {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Mike Doroshenko',
    jobTitle: 'Founder, Product Strategist, AI Consultant',
    description:
      'Product strategist and AI consultant with 10+ years of digital product strategy and AI transformation. Forbes Tech Council member.',
    url: CONTACT_URL,
    sameAs: [
      // Add LinkedIn / X profiles here when available.
    ],
  },
  knowsAbout: [
    'Artificial Intelligence',
    'AI Transformation',
    'Generative AI',
    'AI Agents',
    'AI-Native Engineering',
    'AI-assisted Software Development Lifecycle',
    'AI Strategy',
    'AI Governance',
    'Responsible AI',
    'Model Risk Management',
    'Retrieval Augmented Generation (RAG)',
    'Model Context Protocol (MCP)',
    'AEO',
    'LLM Discoverability',
    'Enterprise AI Platforms',
    'AI Team Training',
  ],
  areaServed: [
    { '@type': 'Place', name: 'Global' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Place', name: 'European Union' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: CONTACT_URL,
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  award: [
    'Top 1% on Clutch Global',
    'Top AI Strategy Company 2025 (Clutch)',
    'Clutch Fall Champion 2024',
    'Inc. 5000 Fastest Growing',
    'Forbes Tech Council Member',
    'Top Voice & Speech Recognition Company 2024 (Clutch)',
    'Top Blockchain Company in Education 2024 (Clutch)',
  ],
  sameAs: [
    'https://clutch.co/profile/vahue',
    'https://www.linkedin.com/company/vahue/',
    // Add additional verified profiles (X, Crunchbase) when available.
  ],
}

/* ============================================================
 * Website
 * ============================================================ */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Vahue',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

/* ============================================================
 * Services
 *
 * One Service schema per offering. Aligned with llms.txt and
 * /public/llms/*.md mirrors. Use serviceType to make each service
 * easy to retrieve.
 * ============================================================ */

const provider = { '@id': ORG_ID }
const areaServed = [
  { '@type': 'Place', name: 'Global' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Place', name: 'European Union' },
  { '@type': 'Country', name: 'United Kingdom' },
]

export const aiNativeEngineeringServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ai-native-engineering#service`,
  name: 'AI-Native Engineering — Team Extension',
  serviceType: 'AI engineering team augmentation',
  category: 'Software Engineering Services',
  description:
    'Senior AI-native engineering pods embedded in client sprint rituals to ship AI features to production with eval harnesses, guardrails, regression CI, cost/latency budgets, and observability. Includes AI-assisted SDLC rollout (Cursor / GitHub Copilot / Claude Code) and bolt-on evals & guardrails for existing AI features.',
  url: `${SITE_URL}/ai-native-engineering`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'CTOs, VPs of Engineering, Heads of AI, and product engineering teams at Series A through Fortune 500 software companies.',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI-Native Engineering Engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Feature Ship',
          description:
            'Take a specific AI feature from design to production with eval set, guardrail layer, cost/latency budget, and rollout plan.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Assisted SDLC Rollout',
          description:
            'Roll out Cursor, GitHub Copilot, Claude Code, and code-review agents with measured velocity baseline and a prompt/patterns library.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Evals & Guardrails Bolt-On',
          description:
            'Add eval coverage, guardrails, regression CI, and observability dashboards to an existing AI feature.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Native Engineering Pod (8–12 weeks)',
          description:
            'Embed a senior AI-native engineering pod into the client sprint cadence with pairing, patterns, and handover docs.',
        },
      },
    ],
  },
}

export const aiTeamTrainingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/team-training#service`,
  name: 'AI Team Training',
  serviceType: 'Corporate AI training and enablement',
  category: 'Professional Training',
  description:
    'Founder-led, role-specific AI training that takes teams of 20–5,000 from AI-curious to AI-fluent in roughly 7 days using the Vahue AI Fluency Method (Diagnose, Design, Deliver, Deploy, Measure). Programs are tailored to the team\u2019s tools and workflows with measured adoption.',
  url: `${SITE_URL}/team-training`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'CEOs, COOs, VPs of Engineering, VPs of Product, VPs of Sales / Marketing / Support, Heads of Operations at companies of 20–5,000 employees.',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Team Training Programs',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Diagnostics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Intro AI Workshops' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Skills for Teams' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive AI Consulting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Advisor for CEO and Top Teams' } },
    ],
  },
}

export const enterpriseAiServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/enterprise-ai#service`,
  name: 'Enterprise AI / Vahue AI Hub',
  serviceType: 'Enterprise AI platform implementation',
  category: 'Enterprise Software',
  description:
    'Vahue AI Hub is an enterprise platform of pre-configured Technical, Horizontal, and Vertical AI agents (Knowledge Engine, MCP Accelerator, Predictive Analytics, Customer Experience, Intelligent Document Processing, Process Automation, Finance, Sales & Marketing, plus industry agents for BFSI, Insurance, Healthcare, Retail) deployed inside the client environment. Model-agnostic — Claude, GPT, Gemini, and open-weights are swappable behind a stable interface. The client owns the code.',
  url: `${SITE_URL}/enterprise-ai`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Heads of AI / Chief AI Officers, CIOs, CTOs, Heads of Digital Transformation at mid-market and enterprise companies (typically 500+ employees), especially in BFSI, insurance, healthcare, and retail.',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vahue AI Hub Agents',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Knowledge Engine (RAG)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MCP Accelerator' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Predictive Analytics Suite' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Customer Experience Agents' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Intelligent Document Processing (IDP)' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Process Automation Suite' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Finance Agents' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Sales & Marketing Agents' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Banking & Financial Services Agents' },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Insurance Agents' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Healthcare & Life Sciences Agents' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Retail & Consumer Goods Agents' },
      },
    ],
  },
}

export const aiStrategyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/strategy#service`,
  name: 'AI Strategy & Advisory',
  serviceType: 'AI strategy, governance, and executive advisory',
  category: 'Management Consulting',
  description:
    'Executive AI strategy via the Vahue Strategy Sprint (Discover, Assess, Design, Align, Activate). Deliverables: AI Readiness Diagnostic, 12–24 month AI Strategy Roadmap with use cases / ROI / owners, AI Governance & Responsible AI framework, executive coaching. Founder-led, paired with execution muscle (AI-Native Engineering, Vahue AI Hub).',
  url: `${SITE_URL}/strategy`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'CEOs, COOs, CIOs, CTOs, CDOs, Chief AI Officers, boards and audit committees at mid-market and regulated enterprises.',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Strategy Engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'AI Readiness Diagnostic' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'AI Strategy Roadmap' },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Governance & Responsible AI Framework',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Executive AI Consulting' },
      },
    ],
  },
}

export const aiSeoServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ai-seo#service`,
  name: 'AEO / LLM Discoverability',
  serviceType: 'AI engine optimization (LLM discoverability)',
  category: 'Search Engine Optimization',
  description:
    'Make a B2B brand recommendable inside AI assistants. Cross-model coverage across ChatGPT, Google Gemini, Anthropic Claude, Perplexity, and Microsoft Copilot. Includes AI Search Audit & Visibility Score, AEO Content Strategy (with llms.txt, markdown mirrors, JSON-LD), and AI Agent Analytics & Monitoring.',
  url: `${SITE_URL}/ai-seo`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'B2B SaaS, fintech, insurtech, healthtech, eCommerce platforms, and enterprise software vendors. CMOs, VPs of Marketing, Heads of Demand Generation, Heads of Content.',
  },
}

export const aiAutomationsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/automations#service`,
  name: 'AI Automations',
  serviceType: 'AI automation, conversational AI, and predictive analytics',
  category: 'Business Process Automation',
  description:
    'Custom AI assistants and conversational AI, agentic process automation / RPA, smart search and RAG knowledge systems, predictive analytics, generative AI applications, and business process integration with CRM / ERP / internal systems. Every solution ships to production with guardrails, audit trails, and measurable ROI.',
  url: `${SITE_URL}/automations`,
  provider,
  areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Heads of Operations, CTOs, CIOs, VPs of Customer Support, VPs of Sales / Marketing at mid-market and enterprise companies.',
  },
}

export const vahueIncubatorServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/vahue-incubator#service`,
  name: 'Vahue Incubator',
  serviceType: 'AI product community and product acceleration',
  category: 'Community / Membership',
  description:
    'A paid community and product-acceleration program for founders, product designers, and corporate innovators building AI products. Includes Vahue Pilot AI CPO tool, weekly expert events, founder Q&A with Mike Doroshenko, private community chat, and an expert track.',
  url: `${SITE_URL}/vahue-incubator`,
  provider,
  areaServed,
  audience: {
    '@type': 'PeopleAudience',
    audienceType:
      'Indie founders, product designers, product managers, business owners, consultants, corporate innovators, and digital marketers building AI products.',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Membership Tiers',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Builder Tier' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Founder Tier' } },
    ],
  },
}

export const allServiceSchemas = [
  aiNativeEngineeringServiceSchema,
  aiTeamTrainingServiceSchema,
  enterpriseAiServiceSchema,
  aiStrategyServiceSchema,
  aiSeoServiceSchema,
  aiAutomationsServiceSchema,
  vahueIncubatorServiceSchema,
]

/* ============================================================
 * FAQ schemas — per page
 * ============================================================ */

const faq = (
  url: string,
  items: Array<{ q: string; a: string }>,
  name: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  name,
  url,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
})

export const homeFaqSchema = faq(
  SITE_URL,
  [
    {
      q: 'What does Vahue actually do?',
      a: 'Vahue is a B2B AI transformation partner that ships AI features to production, trains teams to be AI-fluent, and runs the Vahue AI Hub enterprise agent platform inside client environments.',
    },
    {
      q: 'Who is Vahue best for?',
      a: 'Series A through Fortune 500 software companies; CTOs, CIOs, CDOs, and founders running AI initiatives; especially regulated industries like BFSI, insurance, healthcare, and retail.',
    },
    {
      q: 'Where does the AI run? Can our data leave our infrastructure?',
      a: 'Vahue deploys against Bedrock, Azure OpenAI, GCP, on-prem, or open-weights. Data residency and PII redaction are first-class. The client owns the code.',
    },
    {
      q: 'How fast can a feature reach production?',
      a: '2–8 weeks for a scoped AI feature; 4–12 weeks for a Vahue AI Hub agent rollout.',
    },
    {
      q: 'How is Vahue different from Big-4 consulting?',
      a: 'Vahue sends senior engineers who write production code. No 200-page deck without working software.',
    },
  ],
  'Vahue — General FAQ'
)

export const aiNativeEngineeringFaqSchema = faq(
  `${SITE_URL}/ai-native-engineering`,
  [
    {
      q: 'Will Vahue stall on our custom legacy stack?',
      a: 'No. Vahue has shipped into Rails monoliths, Django, exotic Kotlin services, and other custom stacks. Sprint 1 is spent reading the code, not rewriting it.',
    },
    {
      q: 'Agents are fragile — will you break production?',
      a: 'Every feature ships with eval and guardrail scaffolding from day one, behind feature flags, with rollbacks.',
    },
    {
      q: "We can't send customer data to OpenAI. Can you still help?",
      a: 'Yes. Vahue deploys against Bedrock, Azure OpenAI, self-hosted, or open-weight stacks. Data residency and PII redaction are first-class.',
    },
    {
      q: 'We already have Copilot. What does Vahue add?',
      a: 'Vahue measures the gap between "installed" and "moving metrics" and closes it with patterns, pairing, and focused workflows.',
    },
    {
      q: 'Do we own the code?',
      a: 'Yes. The client owns the code, the prompts, the eval datasets, and the patterns library.',
    },
  ],
  'AI-Native Engineering — FAQ'
)

export const aiTeamTrainingFaqSchema = faq(
  `${SITE_URL}/team-training`,
  [
    {
      q: 'How fast does the team adopt AI tools after training?',
      a: '96% AI adoption in client teams within 7 days — measured, not assumed.',
    },
    {
      q: 'Will training cover our specific tools?',
      a: 'Yes. Programs are role- and tool-specific (HubSpot, Slack, Jira, Microsoft 365, Cursor, Copilot, etc.).',
    },
    {
      q: 'Is the founder personally involved?',
      a: 'Yes for Executive AI Consulting and the AI Advisor for CEO and Top Teams retainer. Workshops are led by Mike Doroshenko or by senior Vahue trainers.',
    },
    {
      q: 'How is success measured?',
      a: 'Adoption rate, prompt usage frequency, time saved per workflow, employee satisfaction, and pre/post productivity metrics.',
    },
  ],
  'AI Team Training — FAQ'
)

export const enterpriseAiFaqSchema = faq(
  `${SITE_URL}/enterprise-ai`,
  [
    {
      q: 'Is Vahue AI Hub a SaaS product or a platform we own?',
      a: 'It is deployed inside the client environment. The client owns the code and can customize and optimize it.',
    },
    {
      q: 'Which LLMs does the Hub support?',
      a: 'Claude, GPT, Gemini, and open-weights — swappable behind a stable interface so the client is not held hostage by vendor cadence.',
    },
    {
      q: 'How long until the first agent is in production?',
      a: '4–12 weeks for the first production agent, depending on integration complexity.',
    },
    {
      q: 'Is Vahue locked to one cloud?',
      a: 'No. The Hub deploys on AWS, Azure, GCP, or on-prem.',
    },
  ],
  'Enterprise AI / Vahue AI Hub — FAQ'
)

export const aiStrategyFaqSchema = faq(
  `${SITE_URL}/strategy`,
  [
    {
      q: 'How is Vahue different from McKinsey or Big-4?',
      a: 'Vahue is operators, not professional consultants. Strategy artefacts are paired with execution (AI-Native Engineering, Vahue AI Hub) so plans don\u2019t stall in PowerPoint.',
    },
    {
      q: 'How long is a typical sprint?',
      a: '4–8 weeks end-to-end (Discover, Assess, Design, Align, Activate).',
    },
    {
      q: 'Will the strategy work for a regulated industry?',
      a: 'Yes — industry presets exist for BFSI (MRM), insurance (explainability + human-in-the-loop), healthcare (HIPAA-grade), and retail (agentic commerce).',
    },
    {
      q: 'Do we need to use Vahue for execution after the strategy?',
      a: 'No. The strategy is yours and is built to be executable by any partner.',
    },
  ],
  'AI Strategy & Advisory — FAQ'
)

export const aiSeoFaqSchema = faq(
  `${SITE_URL}/ai-seo`,
  [
    {
      q: 'What is AEO?',
      a: 'AEO is the practice of optimizing a brand\u2019s visibility in AI-generated answers. When users ask ChatGPT or Claude "what is the best tool for X", AEO determines whether the brand appears.',
    },
    {
      q: 'How is this different from traditional SEO?',
      a: 'Traditional SEO optimizes for search-engine result pages. AEO optimizes for how LLMs select, summarize, and cite sources.',
    },
    {
      q: 'Which AI platforms does Vahue cover?',
      a: 'ChatGPT, Google Gemini, Anthropic Claude, Perplexity, and Microsoft Copilot.',
    },
    {
      q: 'How long before results show?',
      a: 'Initial visibility lift in 4–8 weeks. Sustained growth in 3–6 months.',
    },
  ],
  'AEO / LLM Discoverability — FAQ'
)

/* No aggregate rating or review markup is published until it can be sourced
 * directly from the canonical Vahue Clutch profile. */
export const organizationWithReviewsSchema = organizationSchema

/* ============================================================
 * Helper: render a JSON-LD <script> string for inlining
 * ============================================================ */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema)
}

export const allCoreSchemas = [
  organizationWithReviewsSchema,
  websiteSchema,
  ...allServiceSchemas,
  homeFaqSchema,
]
