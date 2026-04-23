import type { SegmentContent } from '../types'

export const insuranceContent: SegmentContent = {
  slug: '/industries/insurance',
  code: 'I-02',
  eyebrow: 'Insurance',
  title: 'AI agents that read your policies — and ship claims faster.',
  oneLiner:
    'We build reliable insurance AI agents that learn your underwriting and claims context, accelerate decisions, and keep a human firmly in the loop — with access controls your auditors trust.',
  heroIntro:
    'From FNOL intake to underwriting, policy servicing, fraud, and subrogation — grounded on your policy docs and playbooks, wired into your core admin system, and measured on loss-adjusted accuracy, not demo wow.',
  coreJob: {
    title: 'Turn unstructured insurance work into fast, explainable, reviewable decisions.',
    body: 'Insurance is drowning in PDFs, emails, ACORDs, medicals, and endorsements. We deploy agents that read, classify, extract, reason over policy and playbook, and draft decisions — then route to humans for sign-off with every source and rationale attached.',
    bullets: [
      'FNOL + claims intake: multimodal extraction across PDFs, photos, emails, voice.',
      'Underwriting copilots grounded on your guidelines, appetite, and rating docs.',
      'Policy-servicing agents for endorsements, certificates, and renewals.',
      'Fraud / SIU triage with rationale, links, and reviewable evidence.',
      'Subrogation + recovery agents surfacing leakage and missed opportunities.',
    ],
    ctaLabel: 'Scope a claims or underwriting agent',
  },
  ahas: [
    {
      title: 'Agents that actually read the policy',
      body: 'Not a generic LLM — a grounded agent that cites the clause, the endorsement, the exclusion, and your internal playbook side-by-side.',
    },
    {
      title: 'Human-in-the-loop is a feature, not a disclaimer',
      body: 'Every decision carries confidence, rationale, sources, and a structured review UX so adjusters and underwriters approve in seconds, not minutes.',
    },
    {
      title: 'Ships into your core, not around it',
      body: 'We integrate with Guidewire, Duck Creek, Majesco, Sapiens, and homegrown cores — so the agent\'s output lands in the system your ops already live in.',
    },
  ],
  values: [
    { metric: '−50%', label: 'claims cycle time' },
    { metric: '+30%', label: 'underwriter capacity' },
    { metric: '3×', label: 'FNOL triage speed' },
    { metric: '100%', label: 'cited decisions' },
  ],
  triggers: [
    'Combined ratio is under pressure and ops spend keeps climbing.',
    'A CAT event exposed how fragile manual intake really is.',
    'Underwriters are the bottleneck for every growth plan.',
    'Customers churn because FNOL and servicing feel 20 years old.',
    'Regulators are asking how your AI decisions get made.',
  ],
  emotions: [
    'Skeptical — you\'ve seen too many "AI" demos that fail on a real claim.',
    'Pressured — leadership wants digital transformation without risk.',
    'Frustrated — talent can\'t scale with submission volume.',
    'Protective — one mispaid claim is a headline risk.',
    'Envious of insurtechs shipping instant quotes and instant claims.',
  ],
  pains: [
    'ACORDs, PDFs, and emails that slow every workflow.',
    'Underwriters context-switching across 8+ systems per submission.',
    'Leakage on subrogation, fraud, and duplicate claims.',
    'Core systems that resist modern tooling.',
    'No consistent audit trail for AI-assisted decisions.',
  ],
  microJobs: [
    {
      key: 'fnol-claims-intake',
      title: 'FNOL & claims intake',
      oneLiner:
        'Multimodal intake agent: forms, photos, emails, voice → structured claim file in your core.',
      deliverables: ['Multimodal extractor', 'Core integration', 'Confidence + review UX', 'Audit log'],
      outcome: '3× triage speed',
    },
    {
      key: 'underwriting-copilot',
      title: 'Underwriting copilot',
      oneLiner:
        'Agent grounded on appetite, guidelines, and rating docs — drafts decisions with citations.',
      deliverables: ['Grounded RAG', 'Rating + rules hooks', 'Decision rationale', 'Supervisor view'],
      outcome: '+30% capacity',
    },
    {
      key: 'policy-servicing',
      title: 'Policy servicing agent',
      oneLiner:
        'Endorsements, COIs, renewals, and simple changes handled with policy-grounded reasoning.',
      deliverables: ['Servicing agent', 'Document generation', 'Exception workflow', 'Customer UX'],
      outcome: '−50% handle time',
    },
    {
      key: 'fraud-siu',
      title: 'Fraud & SIU triage',
      oneLiner:
        'Signals, links, and rationale over claims — prioritizing real cases for investigators.',
      deliverables: ['Signal library', 'Link analysis', 'Case rationale', 'Investigator queue'],
      outcome: '2× SIU yield',
    },
    {
      key: 'subrogation-recovery',
      title: 'Subrogation & recovery',
      oneLiner:
        'Agent reads claim files, spots recoverable cases, drafts demand packages for review.',
      deliverables: ['Recovery detector', 'Demand drafts', 'Evidence pack', 'Review workflow'],
      outcome: '+15% recovery $',
    },
  ],
  pointB: {
    emotions: ['Confident', 'Fast', 'In control', 'Proud of the loss ratio', 'Respected by the board'],
    snapshot:
      'Claims cycle time cuts in half. Underwriters run 30% more submissions without hiring. Every AI decision lands in Guidewire / Duck Creek / your core with citations and reviewer sign-off. Fraud and subrogation stop leaking quietly.',
    bigJobs: [
      'Modernize claims without replacing your core.',
      'Grow premium without linearly growing underwriting headcount.',
      'Turn loss-adjustment data into a durable competitive advantage.',
    ],
  },
  barriers: [
    {
      objection: 'We\'ve been burned by RPA and early AI — don\'t see what\'s different.',
      response:
        'We ship grounded, evaluated agents with a human review UX and full citation trails. Not brittle scripts and not black-box LLMs — engineered for the insurance reality.',
    },
    {
      objection: 'Our core (Guidewire / Duck Creek / homegrown) is a fortress.',
      response:
        'We\'ve wired agents into all of them. We integrate via sanctioned APIs, event buses, or controlled workflows — so the agent lives where your ops already live.',
    },
    {
      objection: 'Regulators will kill anything touching underwriting or claims.',
      response:
        'We design for explainability and audit from day one: cited sources, confidence, rationale, and logs. Regulators see evidence, not promises.',
    },
    {
      objection: 'Our data is messy and siloed.',
      response:
        'That\'s exactly the problem we\'re good at. Multimodal extraction, data contracts, and lightweight pipelines — we bring clean signal out of the mess.',
    },
  ],
  competitors: [
    {
      name: 'Horizontal insurtech platforms',
      blurb: 'Opinionated products; hard to fit your line of business. We build into your core and your playbook.',
    },
    {
      name: 'Big-4 insurance consulting',
      blurb: 'Heavy on roadmap, light on running agents. We ship production systems your ops actually use.',
    },
    {
      name: 'Generic RPA / doc AI vendors',
      blurb: 'Extract fields but don\'t reason. We add grounded decisioning with citations and review UX.',
    },
  ],
}
