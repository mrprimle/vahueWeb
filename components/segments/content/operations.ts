import type { SegmentContent } from '../types'

export const operationsContent: SegmentContent = {
  slug: '/operations',
  code: 'S-03',
  eyebrow: 'Operations',
  title: 'An agentic back-office that runs — with audit.',
  oneLiner:
    'We replace repetitive ops work — AP/AR, procurement, HR, ticketing — with agents wired into your ERP/ITSM and a full audit trail your finance team will love.',
  heroIntro:
    'From invoice capture to vendor onboarding to HR ticketing, we build the workflows that fire without a human in the loop, and escalate cleanly when they shouldn\'t.',
  coreJob: {
    title: 'Move repeatable ops work to agents; keep judgment work with humans.',
    body: 'If a process has a decision tree and a system of record, an agent can run it. We scope micro-jobs (one invoice type, one vendor flow, one HR ticket family), ship them, and compound — with full audit, rollback, and SOD baked in.',
    bullets: [
      'Agentic workflows over NetSuite/SAP/Oracle/Workday/ServiceNow.',
      'Document understanding: invoices, POs, contracts, KYC forms.',
      'Exception handling with human-in-the-loop escalation.',
      'Audit trail, SOD controls, and reversibility on every action.',
      'Adoption dashboards: throughput, STP rate, cycle time, error rate.',
    ],
    ctaLabel: 'Automate one workflow',
  },
  ahas: [
    {
      title: 'Every action is auditable',
      body: 'No mystery: each agent decision is logged with inputs, model version, tools called, and who/what approved it. Finance and audit get clean trails, not black boxes.',
    },
    {
      title: 'Exceptions route to the right human',
      body: 'Agents know when they don\'t know. Confidence thresholds, SOD rules, and escalation paths mean edge cases land in a queue, not in the void.',
    },
    {
      title: 'ERP/ITSM stays in charge',
      body: 'We don\'t rip and replace. Agents read and write via your existing systems; your source of truth doesn\'t move.',
    },
  ],
  values: [
    { metric: '70–90%', label: 'straight-through rate' },
    { metric: '−50%', label: 'cycle time' },
    { metric: '<1%', label: 'rework rate' },
    { metric: '100%', label: 'auditable' },
  ],
  triggers: [
    'Month-close is bleeding overtime.',
    'Procurement backlog blocking sales.',
    'A BPO contract renewal is staring at you.',
    'HR ticket SLAs slipping after headcount growth.',
  ],
  emotions: [
    'Exhausted by spreadsheets as glue.',
    'Anxious about compliance on manual workflows.',
    'Skeptical of “RPA 2.0” pitches that underdeliver.',
    'Frustrated that ERP vendors quote 12-month projects.',
  ],
  pains: [
    'Data trapped in PDFs and email threads.',
    'Copy-paste between ERP, ITSM, and spreadsheets.',
    'Manual approvals that no one actually reviews.',
    'Audit findings from broken controls.',
    'BPO costs rising faster than volume.',
  ],
  microJobs: [
    {
      key: 'ap-ar',
      title: 'AP / AR automation',
      oneLiner: 'Agents that read invoices, match POs, post journal entries, and escalate exceptions.',
      deliverables: ['Invoice OCR + extraction', 'PO match agent', 'Posting integration', 'Exception queue'],
      outcome: '80% STP',
    },
    {
      key: 'procurement',
      title: 'Procurement flows',
      oneLiner: 'From intake to vendor onboarding to PO creation — with policy checks.',
      deliverables: ['Intake bot', 'Vendor KYC', 'Policy guardrails', 'PO agent'],
      outcome: '−50% cycle',
    },
    {
      key: 'hr-ops',
      title: 'HR ops',
      oneLiner: 'Tickets, onboarding checklists, policy lookups — routed and resolved.',
      deliverables: ['HR copilot', 'Policy RAG', 'Ticket router', 'Onboarding agent'],
      outcome: 'SLA green',
    },
    {
      key: 'erp-overlay',
      title: 'ERP / ITSM overlay',
      oneLiner: 'A thin agentic layer on top of NetSuite, SAP, ServiceNow — no rip-and-replace.',
      deliverables: ['Integrations', 'Action log', 'SOD rules', 'Audit export'],
      outcome: 'Audit-clean',
    },
  ],
  pointB: {
    emotions: ['Calm close', 'Audit-ready', 'Scaling without headcount', 'Confident in controls'],
    snapshot:
      'Month-close happens without firefighting. BPO spend drops. Your ops team runs a queue of exceptions, not a treadmill of data entry. Auditors get a clean export.',
    bigJobs: [
      'Cut BPO spend 30%+ without reducing throughput.',
      'Shrink close from 10 days to 3.',
      'Scale into new regions without linearly adding ops staff.',
    ],
  },
  barriers: [
    {
      objection: 'We\'ve been burned by RPA before.',
      response:
        'Agentic workflows fail differently from brittle RPA. We budget for drift, log every action, and version prompts + tools like code.',
    },
    {
      objection: 'Our ERP is SAP — integrations take forever.',
      response:
        'We\'ve shipped against SAP, Oracle, NetSuite, Workday. We use your existing APIs and iPaaS; the agent is the thin layer, not the platform.',
    },
    {
      objection: 'Compliance will block anything touching finance.',
      response:
        'SOD, audit trails, reversibility, and human-in-loop are architectural defaults — we write the controls memo in week one, not week ten.',
    },
    {
      objection: 'Our processes are too non-standard.',
      response:
        'Non-standard is where agents beat RPA. We read your SOPs, emails, and tickets as context — we don\'t force them into a template.',
    },
  ],
  competitors: [
    { name: 'UiPath / Automation Anywhere', blurb: 'Brittle rule-based bots. Agents handle the ambiguity RPA can\'t.' },
    { name: 'Big-4 BPO', blurb: 'Linear cost, slow iteration. We build the system; you keep the margin.' },
    { name: 'ERP-native automation', blurb: 'Only covers happy paths. We solve the exception tail.' },
  ],
}
