import type { SegmentContent } from '../types'

export const bfsiContent: SegmentContent = {
  slug: '/bfsi',
  code: 'S-04',
  eyebrow: 'BFSI & RegTech',
  title: 'Trusted GenAI — for regulated environments.',
  oneLiner:
    'We build AI systems banks, insurers, and fintechs can actually deploy: governance-first, auditable, and tuned for risk, fraud, and customer ops.',
  heroIntro:
    'From KYC/AML copilots to relationship-manager assistants to fraud triage — architected for model risk management, explainability, and the regulators in your room.',
  coreJob: {
    title: 'Deploy GenAI inside a regulated bank — without risking your license.',
    body: 'The barrier in BFSI is rarely the model; it\'s MRM, data residency, explainability, SOD, and sign-off. We design to those constraints from day one and move through them methodically, with your risk and compliance teams in the build loop.',
    bullets: [
      'Model Risk Management (MRM) aligned to SR 11-7 / SS1/23 / local guidance.',
      'Data residency and private-tenancy deployments (Bedrock, Azure OpenAI, on-prem).',
      'Explainability layers: traces, feature attributions, decision rationales.',
      'Fraud, AML, KYC copilots with clear SOD and second-line review.',
      'RM / advisor assistants grounded on your product and compliance docs.',
    ],
    ctaLabel: 'Map a regulated use-case',
  },
  ahas: [
    {
      title: 'Risk is designed in, not retrofitted',
      body: 'MRM artifacts (model inventory, intended use, limitations, monitoring plan) are deliverables — not a last-minute scramble before a go-live review.',
    },
    {
      title: 'Explainable by default',
      body: 'Every AI-assisted decision carries its rationale and retrieval trace. Your second line can re-review without reverse-engineering prompts.',
    },
    {
      title: 'Your data never leaves your perimeter',
      body: 'We deploy to your VPC / tenant with PII redaction and data classification baked in. No shadow data flows to public model providers.',
    },
  ],
  values: [
    { metric: '100%', label: 'explainable decisions' },
    { metric: '−45%', label: 'L1 review time' },
    { metric: '2×', label: 'fraud triage speed' },
    { metric: '0', label: 'data leaves tenant' },
  ],
  triggers: [
    'Regulator asked about your AI governance.',
    'Fraud losses ticking up faster than analyst headcount.',
    'A new product launch needs faster AML review.',
    'RM productivity targets slipping as product complexity grows.',
  ],
  emotions: [
    'Cautious — one bad AI decision ends careers here.',
    'Frustrated that every AI project gets stuck in second line.',
    'Envious of neobanks shipping copilots your bank can\'t.',
    'Protective of customer trust above all else.',
  ],
  pains: [
    'Endless MRM cycles before anything ships.',
    'Public model APIs blocked by InfoSec.',
    'No clean audit trail from model output to action.',
    'Vendor claims that evaporate under regulator scrutiny.',
    'Silos between data science, risk, and compliance.',
  ],
  microJobs: [
    {
      key: 'trusted-genai',
      title: 'Trusted GenAI pilot',
      oneLiner: 'One regulated use-case shipped to prod — with MRM artifacts and sign-off.',
      deliverables: ['Use-case scoping', 'MRM pack', 'Private deployment', 'Go-live review'],
      outcome: 'Sign-off',
    },
    {
      key: 'risk-fraud',
      title: 'Risk & fraud copilots',
      oneLiner: 'Analyst-assist for KYC/AML/fraud queues — grounded, logged, reviewable.',
      deliverables: ['Queue integration', 'Retrieval layer', 'Decision log', 'Second-line view'],
      outcome: '2× triage',
    },
    {
      key: 'governance',
      title: 'Governance & audit',
      oneLiner: 'Policies, inventories, monitoring, and audit exports for all GenAI in production.',
      deliverables: ['AI policy', 'Model inventory', 'Monitoring dashboard', 'Audit export'],
      outcome: 'Regulator-ready',
    },
    {
      key: 'explainability',
      title: 'Explainability layer',
      oneLiner: 'Make every AI-assisted decision traceable, reviewable, and reproducible.',
      deliverables: ['Trace store', 'Rationale UX', 'Reproducibility kit', 'Review workflow'],
      outcome: '100% explainable',
    },
  ],
  pointB: {
    emotions: ['Calm', 'Regulator-confident', 'Innovating inside the lines', 'Respected by second line'],
    snapshot:
      'GenAI is deployed across risk, fraud, and customer ops — inside your tenant, with MRM artifacts, explainability, and audit trails that pass regulator review. Innovation ships quarterly, not annually.',
    bigJobs: [
      'Stand up an enterprise-wide AI governance layer.',
      'Reduce L1 risk-analyst load so senior capacity moves to complex reviews.',
      'Shorten product-launch AML review from weeks to days.',
    ],
  },
  barriers: [
    {
      objection: 'Our regulator hasn\'t approved GenAI in customer workflows.',
      response:
        'We start where regulators are comfortable — internal analyst copilots — with MRM artifacts ready. Customer-facing scope expands as evidence accumulates.',
    },
    {
      objection: 'Public LLMs are blocked by InfoSec.',
      response:
        'We deploy to your VPC / private tenant (Bedrock, Azure OpenAI, open-weights). No customer data leaves your perimeter. Ever.',
    },
    {
      objection: 'MRM will take 12 months.',
      response:
        'Not if MRM artifacts are part of the build. We co-design the model card, intended-use doc, monitoring plan, and limitations in sprint one — not in month eleven.',
    },
    {
      objection: 'We already have a vendor for “AI.”',
      response:
        'Fine — we\'ll assess what they\'re actually delivering and where the gaps are in governance, explainability, and domain grounding. We layer, we don\'t thrash.',
    },
  ],
  competitors: [
    { name: 'Enterprise LLM platforms', blurb: 'Horizontal tooling; weak on BFSI-specific MRM and sector grounding.' },
    { name: 'Big-4 GenAI practices', blurb: 'Deck-rich, deploy-poor. We hand you production systems, not roadmaps.' },
    { name: 'Neobank-style in-house', blurb: 'Fast but lean on governance. We bring the regulated-environment muscle.' },
  ],
}
