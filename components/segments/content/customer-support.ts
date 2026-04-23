import type { SegmentContent } from '../types'

export const customerSupportContent: SegmentContent = {
  slug: '/customer-support',
  code: 'S-02',
  eyebrow: 'Customer Support',
  title: 'Deflect, assist, escalate — with AI that knows your policies.',
  oneLiner:
    'We build AI support systems that sit on your real policies and tools, lifting CSAT while cutting AHT and cost per contact.',
  heroIntro:
    'From RAG on your knowledge base to agent-assist copilots and full self-service deflection — grounded, auditable, and tuned to your SLAs.',
  coreJob: {
    title: 'Run a support operation where AI handles what it should, and humans handle what matters.',
    body: 'Not every ticket deserves a human. We classify, deflect, and resolve where policies are clear; and we copilot your agents where judgment is required — always with a trace, always with escalation.',
    bullets: [
      'Self-service AI trained on your actual policies, not generic FAQs.',
      'Agent-assist copilot inside your helpdesk (Zendesk, Intercom, Salesforce).',
      'RAG pipeline over policies, macros, knowledge articles, and past tickets.',
      'Smart routing, intent classification, and escalation criteria your ops team owns.',
      'Metrics: AHT, FCR, SLA, CSAT, deflection rate, contained cost per contact.',
    ],
    ctaLabel: 'Pilot on one queue',
  },
  ahas: [
    {
      title: 'Deflection that doesn\'t infuriate users',
      body: 'We tune the bot to hand off fast and silently when it\'s unsure. Deflection rates go up; complaints about bots go down.',
    },
    {
      title: 'Agent-assist that your agents actually use',
      body: 'Inline suggestions, policy lookups, and tone help — embedded in their workflow, not a new window. Adoption is the KPI.',
    },
    {
      title: 'Policy changes propagate in hours',
      body: 'Update your knowledge source; the AI reflects it within a fresh retrieval cycle. No retraining, no prompt-patching.',
    },
  ],
  values: [
    { metric: '40–60%', label: 'deflection on L1' },
    { metric: '−35%', label: 'avg. handle time' },
    { metric: '+12pt', label: 'CSAT lift' },
    { metric: '3 wks', label: 'to first pilot' },
  ],
  triggers: [
    'Ticket volume spiking faster than hiring can keep up.',
    'A CX leader asked: “why don\'t we have an AI for this?”',
    'BPO costs ballooning; CFO wants a plan.',
    'Agents quitting from repetitive L1 queues.',
  ],
  emotions: [
    'Burnt out from firefighting seasonal spikes.',
    'Anxious about bot failures ending up on social media.',
    'Embarrassed by the gap between your AI demo and your live IVR.',
    'Protective of CSAT — and scared to risk it.',
  ],
  pains: [
    'Hallucinated answers in customer-facing channels.',
    'Knowledge base rot — bot quotes outdated policies.',
    'No easy way to measure containment vs. escalation.',
    'Agents ignoring copilots that add friction.',
    'Vendor-lock to a single contact-center AI stack.',
  ],
  microJobs: [
    {
      key: 'self-service',
      title: 'Self-service deflection',
      oneLiner: 'Build an AI channel that resolves clear-cut tickets end-to-end.',
      deliverables: ['Intent taxonomy', 'Policy-grounded bot', 'Handoff rules', 'Dashboards'],
      outcome: '40–60% deflection',
    },
    {
      key: 'agent-assist',
      title: 'Agent assist copilot',
      oneLiner: 'Embed a helper in Zendesk/Intercom/Salesforce that shortens AHT.',
      deliverables: ['Copilot UX', 'Policy retrieval', 'Macro suggester', 'Adoption tracking'],
      outcome: '−35% AHT',
    },
    {
      key: 'rag-policies',
      title: 'RAG on policies',
      oneLiner: 'Ground every AI answer in your current, versioned policy corpus.',
      deliverables: ['Ingestion pipeline', 'Retriever', 'Freshness SLA', 'Audit trail'],
      outcome: 'Policy-accurate',
    },
    {
      key: 'metrics-ops',
      title: 'Metrics & ops',
      oneLiner: 'Instrument AHT, FCR, SLA, CSAT, and containment; run a weekly eval loop.',
      deliverables: ['KPI dashboard', 'Eval sets', 'QA sampler', 'Weekly ops cadence'],
      outcome: 'Measured lift',
    },
  ],
  pointB: {
    emotions: ['In control', 'Relieved', 'Confident with CFO', 'Proud of CSAT'],
    snapshot:
      'Self-service handles the easy half; agents handle the hard half faster. Every answer is policy-grounded and traceable. Scaling season doesn\'t mean panic hiring.',
    bigJobs: [
      'Absorb a 2× volume spike with the same headcount.',
      'Re-allocate senior agents to retention and upsell.',
      'Turn support data into a product-feedback engine.',
    ],
  },
  barriers: [
    {
      objection: 'Our customers will hate talking to a bot.',
      response:
        'Ours hand off fast and silently when unsure. We tune thresholds on your data and show you a full trace of every AI-only resolution.',
    },
    {
      objection: 'Our knowledge base is a mess.',
      response:
        'Fine — cleaning it is part of the engagement. We\'ll flag conflicts, gaps, and deprecated answers as a byproduct of building the retriever.',
    },
    {
      objection: 'Legal won\'t let AI answer anything.',
      response:
        'We start with read-only agent-assist — no customer-facing risk. Once legal sees the traces and guardrails, customer-facing scope expands.',
    },
    {
      objection: 'We already pay for Zendesk AI.',
      response:
        'Great — we\'ll audit what it\'s actually catching. Most teams need a layer on top, not a replacement.',
    },
  ],
  competitors: [
    { name: 'Zendesk AI / Intercom Fin', blurb: 'Strong baselines; weak on custom policies, audit, and pain-point tuning.' },
    { name: 'In-house bot teams', blurb: 'Heroic but slow. We bring the playbook and the evals.' },
    { name: 'Traditional BPOs', blurb: 'Linear scaling by headcount. We un-link volume from cost.' },
  ],
}
