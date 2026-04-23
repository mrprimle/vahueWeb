import type { SegmentContent } from '../types'

export const healthcareLifeSciencesContent: SegmentContent = {
  slug: '/industries/healthcare-life-sciences',
  code: 'I-03',
  eyebrow: 'Healthcare & Life Sciences',
  title: 'AI that gives clinicians their time back — and keeps the care.',
  oneLiner:
    'We build clinical and life-sciences AI agents that learn from your physicians and researchers — automating scheduling, prior auths, follow-ups, and evidence synthesis, with consent, minimization, and HIPAA-grade access controls built in.',
  heroIntro:
    'From ambient documentation and prior authorization to clinical guideline surfacing and drug-discovery copilots — grounded on your data, deployed in your environment, and designed so the standard of care rises instead of drifts.',
  coreJob: {
    title: 'Turn patient and research data into action — without adding clinician burden.',
    body: 'Healthcare AI fails when it adds clicks. We design agents around the clinician\'s and researcher\'s actual workflow: ambient capture, guideline-grounded suggestions, structured drafts, and one-tap review — with every data flow gated by consent, role, and minimization.',
    bullets: [
      'Ambient scribe + structured note agents aligned to your specialty and EHR.',
      'Prior authorization, referral, and follow-up automation with human sign-off.',
      'Clinical guideline surfacing with citations and patient-specific reasoning.',
      'Life-sciences research copilots: literature, trials, regulatory, and lab data.',
      'Private deployments inside HIPAA / GxP / HITRUST-grade environments.',
    ],
    ctaLabel: 'Scope a clinical or research use-case',
  },
  ahas: [
    {
      title: 'Clinician-first, not clinician-tolerated',
      body: 'Agents listen, draft, and suggest — clinicians approve. Every draft carries sources and rationale. No extra clicks just to get AI\'s opinion.',
    },
    {
      title: 'Consent and minimization by construction',
      body: 'Role-based access, de-identification, and consent scopes are wired into the architecture, not bolted on. Audit-ready from day one.',
    },
    {
      title: 'Research velocity, not research noise',
      body: 'In life sciences, we ground agents on literature, trial data, and regulatory context — with traceable evidence and reproducible outputs scientists can defend.',
    },
  ],
  values: [
    { metric: '−70%', label: 'documentation time' },
    { metric: '−50%', label: 'prior-auth TAT' },
    { metric: '3×', label: 'evidence review speed' },
    { metric: '100%', label: 'auditable access' },
  ],
  triggers: [
    'Clinician burnout and attrition are now board-level metrics.',
    'Prior auth and referrals are bleeding patient experience and revenue.',
    'Researchers are swamped by literature and trial data updates.',
    'Your compliance team needs AI governance that actually holds up.',
    'Competitors are shipping ambient and clinical AI while you\'re still in pilots.',
  ],
  emotions: [
    'Protective of patient safety and standard of care.',
    'Exhausted — clinicians are doing second-shift documentation.',
    'Cautious about AI hallucinations in clinical context.',
    'Frustrated that EHR modules "do AI" in name only.',
    'Hopeful that real relief is finally possible.',
  ],
  pains: [
    'After-hours charting and documentation debt.',
    'Prior-auth and referral cycles measured in days.',
    'Disconnected systems: EHR, PACS, LIS, billing, CRM.',
    'Siloed research data across labs, studies, and vendors.',
    'Consent, minimization, and audit duties no one wants to own.',
  ],
  microJobs: [
    {
      key: 'ambient-scribe',
      title: 'Ambient scribe + notes',
      oneLiner:
        'Listens to the visit and drafts a structured note the clinician approves in seconds.',
      deliverables: ['Ambient capture', 'Specialty templates', 'EHR write-back', 'Review UX'],
      outcome: '−70% doc time',
    },
    {
      key: 'prior-auth-referrals',
      title: 'Prior auth & referrals',
      oneLiner:
        'Agent composes, submits, and follows through prior auths and referrals with audit trails.',
      deliverables: ['Payer playbooks', 'Grounded drafts', 'Submission + tracking', 'Exception workflow'],
      outcome: '−50% TAT',
    },
    {
      key: 'guideline-surfacing',
      title: 'Guideline surfacing',
      oneLiner:
        'Patient-specific suggestions grounded on your guidelines, protocols, and policy library.',
      deliverables: ['Guideline RAG', 'Patient context hooks', 'Citations', 'Clinician review UX'],
      outcome: '+ care consistency',
    },
    {
      key: 'follow-ups-scheduling',
      title: 'Follow-ups & scheduling',
      oneLiner:
        'Automated outreach and scheduling for post-visit, chronic care, and no-show recovery.',
      deliverables: ['Outreach agent', 'Scheduling hooks', 'Consent + opt-out', 'Ops dashboard'],
      outcome: '−30% no-shows',
    },
    {
      key: 'research-copilot',
      title: 'Research & evidence copilot',
      oneLiner:
        'Literature, trial, lab, and regulatory Q&A with citations — for researchers and MSLs.',
      deliverables: ['Evidence RAG', 'Trial + lit connectors', 'Reproducibility pack', 'Role-based access'],
      outcome: '3× review speed',
    },
  ],
  pointB: {
    emotions: ['Relieved', 'Trusted', 'Proud of patient outcomes', 'In control of risk', 'Scientifically confident'],
    snapshot:
      'Clinicians leave on time with notes signed. Prior auths clear in hours, not days. Researchers navigate literature and trial data with traceable evidence. Every AI interaction is logged, minimized, and consent-scoped — your compliance team sleeps.',
    bigJobs: [
      'Give clinicians back an hour a day without compromising the standard of care.',
      'Turn revenue-cycle bottlenecks like prior auth into a solved workflow.',
      'Compress research and regulatory cycles with grounded, reproducible evidence.',
    ],
  },
  barriers: [
    {
      objection: 'We can\'t send PHI or patient data to public LLMs.',
      response:
        'You don\'t have to. We deploy inside your HIPAA-grade environment (AWS/Azure/GCP private tenants or on-prem), with de-identification and access scopes enforced at the architecture level.',
    },
    {
      objection: 'AI hallucinations are unacceptable in a clinical setting.',
      response:
        'That\'s exactly why we ship grounded agents with citations, confidence, and a clinician-in-the-loop UX. No suggestion reaches the chart without review and source.',
    },
    {
      objection: 'Our EHR vendor says they\'re doing all this already.',
      response:
        'Some of it. We layer on top of Epic / Cerner / Meditech where they stop — custom workflows, specialty-specific drafts, and cross-system agents the vendor won\'t build.',
    },
    {
      objection: 'GxP / FDA scrutiny will slow any AI down in life sciences.',
      response:
        'We design for GxP, 21 CFR Part 11, and reproducibility from day one — data lineage, versioning, audit, and validation packs are part of the build, not an afterthought.',
    },
  ],
  competitors: [
    {
      name: 'EHR-native AI modules',
      blurb: 'Broad but shallow. We build into the workflow and specialty that the EHR leaves generic.',
    },
    {
      name: 'Ambient-scribe startups',
      blurb: 'Often a single point product. We extend ambient capture into prior auth, follow-ups, and research.',
    },
    {
      name: 'Big-4 healthcare consulting',
      blurb: 'Great roadmaps, thin on production AI. We hand you running agents, not PowerPoints.',
    },
  ],
}
