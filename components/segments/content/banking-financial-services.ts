import type { SegmentContent } from '../types'

export const bankingFinancialServicesContent: SegmentContent = {
  slug: '/industries/banking-financial-services',
  code: 'I-01',
  eyebrow: 'Banking & Financial Services',
  title: 'AI that moves money — safely, explainably, in production.',
  oneLiner:
    'We embed AI-native engineers into banks and fintechs to ship copilots for fraud, AML, KYC, lending, and relationship managers — the kind your risk, compliance, and InfoSec teams will actually sign off on.',
  heroIntro:
    'From instant onboarding and real-time fraud to predictive lending, M&A data intelligence, and embedded-finance rails — architected for zero-trust, MRM, and audit from day one.',
  coreJob: {
    title: 'Turn regulated banking AI from a PowerPoint into a release lane.',
    body: 'The hard part isn\'t the model — it\'s shipping it through MRM, InfoSec, second line, and legacy cores without losing a quarter. We design inside those constraints, wire into your private tenant, and make explainability a first-class deliverable, not a retrofit.',
    bullets: [
      'Real-time fraud & AML triage copilots — grounded, logged, reviewable.',
      'KYC / onboarding acceleration with document AI and policy-grounded reasoning.',
      'Credit & lending copilots: predictive underwriting, covenant tracking, portfolio Q&A.',
      'RM / advisor assistants on your product, compliance, and CRM context.',
      'Core modernization: agents over legacy mainframes, cores, and data warehouses.',
    ],
    ctaLabel: 'Scope a regulated use-case',
  },
  ahas: [
    {
      title: 'Regulator-ready by construction',
      body: 'MRM artifacts — model card, intended-use, monitoring plan, limitations, change log — ship with the feature. Sign-off is a review, not a rebuild.',
    },
    {
      title: 'Fraud and AML that think in seconds',
      body: 'Agents triage alerts, dedupe cases, draft SARs, and surface rationale. Analysts spend their day on judgment calls, not on copy-paste.',
    },
    {
      title: 'Your data never leaves the perimeter',
      body: 'We deploy inside your VPC / tenant (Bedrock, Azure OpenAI, on-prem open-weights). Zero-trust, data residency, and PII redaction are table stakes.',
    },
  ],
  values: [
    { metric: '−60%', label: 'onboarding TAT' },
    { metric: '2×', label: 'fraud triage speed' },
    { metric: '100%', label: 'explainable decisions' },
    { metric: '0', label: 'data leaves tenant' },
  ],
  triggers: [
    'Your regulator just asked about your AI governance.',
    'Fraud losses are growing faster than analyst headcount.',
    'Onboarding TAT is bleeding new-account conversion.',
    'A challenger bank shipped an advisor copilot your stack can\'t match.',
    'Lending teams are drowning in unstructured covenant & credit memo work.',
  ],
  emotions: [
    'Cautious — one bad AI decision ends careers here.',
    'Frustrated that every AI pilot dies in second line.',
    'Envious of neobanks shipping things you\'re still scoping.',
    'Protective of customer trust above all else.',
    'Tired of vendors whose claims evaporate under regulator scrutiny.',
  ],
  pains: [
    'MRM cycles that take 9–12 months per use-case.',
    'Public LLM APIs blocked by InfoSec — no clear private path.',
    'No clean audit trail from model output to customer action.',
    'Silos between data science, risk, compliance, and the line of business.',
    'Legacy cores and data warehouses that AI tools can\'t reach.',
  ],
  microJobs: [
    {
      key: 'fraud-aml-copilot',
      title: 'Fraud & AML copilot',
      oneLiner:
        'Analyst-assist over fraud / AML queues: triage, dedupe, rationale, SAR drafting.',
      deliverables: ['Queue integration', 'Retrieval + rules layer', 'Decision log', 'Second-line review UX'],
      outcome: '2× triage speed',
    },
    {
      key: 'kyc-onboarding',
      title: 'KYC & onboarding AI',
      oneLiner:
        'Document AI + policy reasoning for instant account, merchant, and corporate KYC.',
      deliverables: ['Doc extraction', 'Policy-grounded checks', 'Exception workflow', 'Audit trail'],
      outcome: '−60% TAT',
    },
    {
      key: 'lending-credit',
      title: 'Lending & credit copilots',
      oneLiner:
        'Predictive underwriting, covenant monitoring, and portfolio Q&A over your CRM + docs.',
      deliverables: ['Credit memo agent', 'Covenant monitor', 'Portfolio Q&A', 'Risk dashboards'],
      outcome: '3× analyst output',
    },
    {
      key: 'rm-advisor-assist',
      title: 'RM / advisor assistant',
      oneLiner:
        'Grounded assistant on product, compliance, and CRM context — with supervision hooks.',
      deliverables: ['Grounded RAG', 'Compliance guardrails', 'CRM + call-prep actions', 'Supervisor views'],
      outcome: '+20% RM capacity',
    },
    {
      key: 'core-modernization',
      title: 'Core & data modernization',
      oneLiner:
        'Agents and APIs over legacy cores, mainframes, and warehouses — without ripping them out.',
      deliverables: ['Integration layer', 'Agent tools', 'Data contracts', 'Migration runway'],
      outcome: 'Legacy → AI-ready',
    },
  ],
  pointB: {
    emotions: ['Calm', 'Regulator-confident', 'Innovating inside the lines', 'Respected by second line', 'Trusted by customers'],
    snapshot:
      'AI ships quarterly across fraud, AML, KYC, lending, and advisor workflows — inside your tenant, with full MRM artifacts, audit trails, and explainability. Analysts work on judgment; agents carry the load. The regulator reads your dashboards, not your slides.',
    bigJobs: [
      'Turn banking AI from an annual program into a quarterly release lane.',
      'Bring fraud and AML response to real-time without growing headcount linearly.',
      'Unlock legacy core and data assets as first-class fuel for agentic products.',
    ],
  },
  barriers: [
    {
      objection: 'Our regulator hasn\'t approved GenAI in customer workflows.',
      response:
        'We start where regulators are comfortable — internal analyst copilots — with MRM packs ready. Customer-facing scope expands as evidence accumulates.',
    },
    {
      objection: 'Public LLMs are blocked by InfoSec.',
      response:
        'We deploy to your VPC / private tenant: Bedrock, Azure OpenAI, Vertex, or open-weights on your hardware. No customer data ever leaves your perimeter.',
    },
    {
      objection: 'Our core is 30 years old — nothing will integrate.',
      response:
        'We\'ve wired agents over mainframes, legacy cores, and decades-old warehouses. We bring integration patterns, not rip-and-replace plans.',
    },
    {
      objection: 'We already have a "GenAI platform" vendor.',
      response:
        'Good. We assess what they actually deliver against your MRM, grounding, and domain needs, and we layer — not thrash — on top of it.',
    },
  ],
  competitors: [
    {
      name: 'Big-4 GenAI practices',
      blurb: 'Deck-rich, deploy-poor. You pay for slides; we hand you production systems with MRM packs attached.',
    },
    {
      name: 'Horizontal LLM platforms',
      blurb: 'Strong tooling, weak banking grounding. We bring the BFSI muscle: fraud, AML, KYC, lending, MRM.',
    },
    {
      name: 'Neobank-style in-house squads',
      blurb: 'Fast but lean on governance. We bring the regulated-environment discipline without killing velocity.',
    },
  ],
}
