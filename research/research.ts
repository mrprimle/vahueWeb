// Copy for the automation-first site, from the AI automation agency research
// (87 published cases and Clutch reviews, Oct 2026).

export type Workflow = {
  slug: string
  label: string
  template: string
  headline: string
  summary: string
  forWho: string
  before: string[]
  after: string[]
  steps: { title: string; body: string }[]
  guardrails: string[]
  tools: string[]
}

export const POSITIONING = {
  line: 'Your busiest workflows, run by agents. Measured from day one.',
  promise:
    'We take a high-volume workflow off your team and run it with AI agents inside the tools you already use, so operations keep up with growth without new hires.',
  forWho:
    'Operations and finance leaders at companies with 100 to 2,000 people whose volume has outgrown the team.',
}

export const PHASES = [
  {
    name: 'Audit',
    length: '2 weeks',
    body: 'We map one workflow end to end and record the baseline: volume, minutes per item, error rate and cost. We agree the target and the point at which we stop.',
  },
  {
    name: 'Pilot',
    length: '4 to 6 weeks',
    body: 'One workflow on your own data at real volume. A person on your team checks every output until accuracy holds.',
  },
  {
    name: 'Operate',
    length: 'Monthly',
    body: 'We run the agents day to day: monitoring, exceptions, accuracy reviews and model updates, with a monthly report against the baseline.',
  },
]

export const CONTROL_FEATURES = [
  { title: 'Review queues', body: 'Anything below the confidence threshold goes to a person before it touches a system of record.' },
  { title: 'Approvals and dry runs', body: 'Agents propose; your team approves actions that move money, customers or data.' },
  { title: 'Role-based access', body: 'Agents see only what the role they act for can see.' },
  { title: 'Audit log', body: 'Every input, decision and action is recorded and searchable.' },
  { title: 'Your cloud or ours', body: 'Deploy in your VPC or on-premises when data cannot leave.' },
  { title: 'Results dashboard', body: 'Items handled, hours returned, exceptions and accuracy, live, plus a one-page monthly summary.' },
]

export const INTEGRATIONS = [
  'Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'HubSpot', 'Salesforce', 'NetSuite',
  'QuickBooks', 'SAP', 'SharePoint', 'Snowflake', 'Power BI', 'Zendesk', 'Twilio',
]

export const WORKFLOWS: Workflow[] = [
  {
    slug: 'back-office-sync',
    label: 'Back-office sync',
    template: 'generative-ai-data-engine',
    headline: 'Keep CRM, ERP and finance in step without re-keying.',
    summary: 'Agents move orders, onboarding, approvals and reconciliations between your systems and flag what does not match.',
    forWho: 'Finance and operations teams copying the same record between three or more systems.',
    before: ['Staff copy data between systems by hand', 'Month-end and reconciliations run late', 'Mismatches are found by customers'],
    after: ['Records sync as they change', 'Reconciliations prepared overnight', 'Mismatches arrive as a short exception list'],
    steps: [
      { title: 'Watch', body: 'The agent listens for new or changed records in each system.' },
      { title: 'Match', body: 'It matches records across systems and checks the rules you set.' },
      { title: 'Write', body: 'Clean matches are written back; exceptions go to a review queue.' },
      { title: 'Report', body: 'A daily summary shows what moved and what needs a person.' },
    ],
    guardrails: ['Approval before any payment or credit action', 'Full audit log per record'],
    tools: ['NetSuite', 'QuickBooks', 'SAP', 'Salesforce', 'HubSpot'],
  },
  {
    slug: 'document-intake',
    label: 'Document intake',
    template: 'physical-ai',
    headline: 'Turn every incoming document into a clean record.',
    summary: 'Invoices, claims, lab reports, supplier sheets and contracts are read, checked and posted to the right system.',
    forWho: 'Teams where volume grows faster than the people keying documents in.',
    before: ['Minutes of manual entry per document', 'Backlogs at month-end and peaks', 'Errors found downstream'],
    after: ['Documents posted as they arrive', 'People review only the uncertain fields', 'Every field traceable to its source page'],
    steps: [
      { title: 'Receive', body: 'From email, portals, scans or shared drives.' },
      { title: 'Extract', body: 'Fields are read with language models and OCR.' },
      { title: 'Check', body: 'Values are validated against your rules; unsure fields go to review.' },
      { title: 'Post', body: 'Clean records are written to your ERP, CRM or claims system.' },
    ],
    guardrails: ['Confidence threshold per field', 'Side-by-side review of source and record'],
    tools: ['Outlook', 'Gmail', 'SharePoint', 'NetSuite', 'SAP'],
  },
  {
    slug: 'knowledge-agents',
    label: 'Knowledge agents',
    template: 'genai-portfolio',
    headline: 'Answers from your own data, in plain English.',
    summary: 'Staff ask questions of documents, wikis and databases and get sourced answers in Slack or Teams.',
    forWho: 'Companies where answers live in a few people’s heads or across scattered systems.',
    before: ['Experts answer the same questions every week', 'Meeting prep means searching five tools', 'New hires wait for help'],
    after: ['Sourced answers in seconds', 'Experts handle only new questions', 'New hires productive sooner'],
    steps: [
      { title: 'Connect', body: 'Documents, wikis and databases, with existing permissions.' },
      { title: 'Ask', body: 'Questions in Slack, Teams or a browser.' },
      { title: 'Answer', body: 'Answers cite their sources; numbers come from logged queries.' },
      { title: 'Improve', body: 'Unanswered questions become the next content to add.' },
    ],
    guardrails: ['Answers respect each user’s access rights', 'No figure without a traceable query'],
    tools: ['SharePoint', 'Snowflake', 'Power BI', 'Slack', 'Microsoft Teams'],
  },
  {
    slug: 'support-agents',
    label: 'Support and voice agents',
    template: 'donovan',
    headline: 'Answer customers and route tickets around the clock.',
    summary: 'Chat and voice agents resolve routine requests, verify identity and hand the rest to your team with context.',
    forWho: 'Support and service teams whose inquiry volume rises faster than headcount.',
    before: ['Routine questions fill the queue', 'Callers bypass menus', 'Agents re-ask for context'],
    after: ['Routine requests resolved end to end', 'Every hand-off arrives with a summary', 'Queues stay inside service levels'],
    steps: [
      { title: 'Greet', body: 'Chat, email or phone, with identity checks where needed.' },
      { title: 'Resolve', body: 'The agent looks up orders, bookings or accounts and acts within limits.' },
      { title: 'Hand off', body: 'Anything outside its limits goes to a person with a summary.' },
      { title: 'Learn', body: 'Weekly review of escalations sets the next things to automate.' },
    ],
    guardrails: ['Actions limited by role', 'Human hand-off on request at any time'],
    tools: ['Zendesk', 'Twilio', 'Salesforce', 'HubSpot'],
  },
  {
    slug: 'scoring-decisions',
    label: 'Scoring and decisions',
    template: 'automotive',
    headline: 'Score, classify and route work at volume.',
    summary: 'Models check quality, sort tickets, score risk or grade submissions, and send each item to the right place.',
    forWho: 'Teams making the same judgement thousands of times a month.',
    before: ['Hours of manual QA per batch', 'Inconsistent decisions between reviewers', 'Rules that cannot keep up'],
    after: ['Every item scored in seconds', 'Reviewers focus on the borderline cases', 'Decisions explained and logged'],
    steps: [
      { title: 'Learn', body: 'From your past decisions and the reasons behind them.' },
      { title: 'Score', body: 'Each new item gets a score and an explanation.' },
      { title: 'Route', body: 'Clear cases flow on; borderline ones go to a reviewer.' },
      { title: 'Monitor', body: 'Agreement with reviewers is tracked every week.' },
    ],
    guardrails: ['Reviewer agreement tracked before scope grows', 'Explanations stored with each decision'],
    tools: ['Salesforce', 'Snowflake', 'Zendesk'],
  },
  {
    slug: 'engineering-enablement',
    label: 'Engineering enablement',
    template: 'rlenvironments',
    headline: 'Make your engineering team AI-native, and measure it.',
    summary: 'Agents for code review, tests and documentation, rolled out with a control group so the gain is measured, not assumed.',
    forWho: 'Engineering leaders asked to show what AI is doing for delivery.',
    before: ['Tools adopted unevenly', 'No agreed measure of impact'],
    after: ['Agreed metrics against a control group', 'Practices adopted team by team'],
    steps: [
      { title: 'Baseline', body: 'Measure delivery on a comparable team first.' },
      { title: 'Pilot', body: 'Agents and practices on one team for 12 weeks.' },
      { title: 'Coach', body: 'Pairing and internal champions spread what works.' },
      { title: 'Scale', body: 'Roll out in waves with the same metrics.' },
    ],
    guardrails: ['Code stays in your repositories', 'Security review before rollout'],
    tools: ['GitHub', 'GitLab', 'Jira'],
  },
]

export const INDUSTRY_WORKFLOWS: Record<string, { template: string; workflows: string[] }> = {
  'banking-financial-services': {
    template: 'enterprise',
    workflows: ['Mortgage and loan document handling', 'Reconciliation across core and finance systems', 'KYC document intake'],
  },
  insurance: {
    template: 'enterprise-insurance',
    workflows: ['First notice of loss intake', 'Claims correspondence', 'Treaty and policy review'],
  },
  'healthcare-life-sciences': {
    template: 'enterprise-healthcare',
    workflows: ['Clinical and trial document summaries', 'Clinical documentation', 'Audit finding classification'],
  },
  'retail-ecommerce': {
    template: 'enterprise',
    workflows: ['Order-status inbox', 'Product data and SKU matching', 'Customer support agents'],
  },
  'distribution-manufacturing': {
    template: 'enterprise',
    workflows: ['Supplier onboarding', 'Quotes and configurators', 'Invoices from packing slips', 'Drawings to bills of materials'],
  },
}
