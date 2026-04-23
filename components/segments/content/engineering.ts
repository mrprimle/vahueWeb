import type { SegmentContent } from '../types'

export const engineeringContent: SegmentContent = {
  slug: '/ai-native-engineering',
  code: 'S-01',
  eyebrow: 'Engineering',
  title: 'Ship AI features. In production. On your roadmap.',
  oneLiner:
    'We embed AI-native engineers into your team to turn demos into durable features — with evals, guardrails, and CI you can trust.',
  heroIntro:
    'From AI-feature ship to AI-assisted SDLC: we wire agents into your code, your data, and your CI/CD, then hand the muscle back to your team.',
  coreJob: {
    title: 'Ship AI features that survive contact with production.',
    body: 'Most AI initiatives die between demo and rollout. Our engineers own the boring, critical bits: evals, guardrails, regressions, cost/latency budgets, and the review loops that make an agentic feature as reliable as a CRUD one.',
    bullets: [
      'AI-native pod embedded in your sprint rituals — senior, fluent in agent frameworks, retrieval, and evals.',
      'Eval harness + guardrail layer tailored to your domain and tolerance for risk.',
      'CI/CD with automated regression on prompts, tools, and model versions.',
      'Observability: traces, cost, latency, failure taxonomy — not just logs.',
      'AI-assisted SDLC rollout: Cursor, Copilot, code-review agents, with baselines.',
    ],
    ctaLabel: 'Scope an AI feature',
  },
  ahas: [
    {
      title: 'Demo → prod without a rewrite',
      body: 'We wire the demo onto real APIs, real auth, and real data with eval/guardrail scaffolding from week one — so “productionizing” isn\'t a second project.',
    },
    {
      title: 'Model-agnostic architecture',
      body: 'Swap Claude, GPT, Gemini, or open-weights behind the same interface. Your product doesn\'t get held hostage by a vendor release cadence.',
    },
    {
      title: 'Your team levels up',
      body: 'Every pod engagement includes pairing, patterns, and handover docs. When we leave, your engineers are faster than before we arrived.',
    },
  ],
  values: [
    { metric: '3–5×', label: 'AI feature velocity' },
    { metric: '<2 wk', label: 'demo-to-prod' },
    { metric: '90%+', label: 'eval pass rate' },
    { metric: '−40%', label: 'post-ship bugs' },
  ],
  triggers: [
    'A demo landed; leadership wants it shipped by quarter-end.',
    'Your team tried Cursor/Copilot but velocity barely moved.',
    'An AI feature keeps regressing on every model update.',
    'Competitors just announced an AI capability on your roadmap.',
  ],
  emotions: [
    'Anxious the PoC won\'t scale past the demo.',
    'Frustrated that each model bump breaks something.',
    'Skeptical of agent frameworks that promise magic.',
    'Tired of hiring generalists who can\'t ship LLM features.',
  ],
  pains: [
    'No eval harness — every release is a guess.',
    'Prompt sprawl with no versioning or regression tests.',
    'Vendor-lock from a single model provider.',
    'AI costs trending up with no link to value.',
    'Security/compliance reviews blocking every rollout.',
  ],
  microJobs: [
    {
      key: 'ai-feature-ship',
      title: 'AI feature ship',
      oneLiner:
        'Take a specific feature from design to production with full eval + guardrail coverage.',
      deliverables: ['Eval set + harness', 'Guardrail layer', 'Cost/latency budget', 'Rollout plan'],
      outcome: 'Shipped feature',
    },
    {
      key: 'ai-assisted-sdlc',
      title: 'AI-assisted SDLC',
      oneLiner:
        'Roll out Cursor/Copilot/code-review agents with measured velocity lift and safe patterns.',
      deliverables: ['Tooling rollout', 'Prompt/patterns library', 'Velocity baseline', 'Review playbook'],
      outcome: '3–5× velocity',
    },
    {
      key: 'evals-guardrails',
      title: 'Evals & guardrails',
      oneLiner:
        'Bolt eval coverage, guardrails, and regression tests onto an existing AI feature.',
      deliverables: ['Eval dataset', 'Guardrail policies', 'Regression CI', 'Dashboards'],
      outcome: '90%+ pass rate',
    },
    {
      key: 'ai-native-pod',
      title: 'AI-native pod',
      oneLiner:
        'Embed a senior AI-native engineering pod into your sprint for 8–12 weeks.',
      deliverables: ['Embedded engineers', 'Sprint cadence', 'Pairing plan', 'Handover docs'],
      outcome: 'In-house muscle',
    },
  ],
  pointB: {
    emotions: ['Confident', 'Calm', 'In control', 'Curious', 'Proud of the ship'],
    snapshot:
      'Releases go out weekly. Every AI feature has an eval, a guardrail, a cost budget, and an owner. Model swaps take hours, not months. Your engineers teach the pattern forward.',
    bigJobs: [
      'Turn AI from a roadmap item into a recurring release lane.',
      'Take a competitive AI feature from a press release to parity in one quarter.',
      'Stand up an internal AI platform your product teams actually use.',
    ],
  },
  barriers: [
    {
      objection: 'Our stack is too custom — you\'ll just stall.',
      response:
        'We\'ve shipped into legacy monoliths, Rails apps, Django, and exotic Kotlin services. We bring patterns, not a template — the first sprint is spent reading your code, not rewriting it.',
    },
    {
      objection: 'Agents are fragile; we\'ll break prod.',
      response:
        'We ship with eval + guardrail scaffolding from day one, behind feature flags, with rollbacks. The point is exactly to find fragility before your users do.',
    },
    {
      objection: 'We can\'t send customer data to OpenAI.',
      response:
        'We deploy against your infra — Bedrock, Azure OpenAI, self-hosted, open-weights. Data residency and PII redaction are first-class concerns in our architecture.',
    },
    {
      objection: 'We already have a Copilot rollout.',
      response:
        'Good — we measure it. We find the delta between “installed” and “moving metrics” and close it with patterns, pairing, and focused workflows.',
    },
  ],
  competitors: [
    {
      name: 'In-house PoC squad',
      blurb: 'Great at demos, stuck at production. We add the evals, guardrails, and CI that turn a PoC into a feature.',
    },
    {
      name: 'Generic dev-shop',
      blurb: 'Ships code, not AI features. No eval muscle, no prompt hygiene, no model-agnostic architecture.',
    },
    {
      name: 'Big-4 consulting',
      blurb: 'Deck-rich, code-poor. You pay for slides; we send you senior engineers who ship.',
    },
  ],
}
