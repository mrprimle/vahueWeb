// Placeholder copy for the scale.com/donovan clone. Lengths roughly match Scale's blocks.
// TODO: Vahue copy (every string in this file)

export const ASSET = '/scale-clone/donovan'

export const hero = {
  headline: 'Operator',
  body: 'Deploy specialized AI agents for the business-critical workflows you rely on.',
  primary: { label: 'Book a Demo', href: '/contact' },
}

// Customer logos on scale.com: 5 marks (brightness-0) at these intrinsic sizes. Rendered as neutral tiles.
export const logoSizes: [number, number][] = [
  [65, 45],
  [48, 63],
  [68, 53],
  [79, 22],
  [70, 16],
]

export const overview = {
  eyebrow: 'Product Overview',
  title: 'Design, Test, and Ship Dependable AI Agents for Your Operations',
  subtitle:
    'Take tailored agents from first sketch to live production in record time with Operator. Put capable automation in the hands of the people who run the work, when and where they need it most.',
  cards: [
    {
      title: 'Agent Builder',
      body: 'Use the built-in no-code builder to assemble and tune your own agents by connecting data sources, setting up searchable knowledge bases, choosing strong current models, writing clear agent instructions, and linking agents to the existing systems and tools you already run.',
    },
    {
      title: 'Test & Compare',
      body: 'Compare responses and performance metrics from the leading models to see which one best fits your process and workload, backed by careful, repeatable test suites that check reliability, safety, and alignment with your quality bar.',
    },
    {
      title: 'Agent Library',
      body: 'Discover and roll out ready-made agents and apps built to multiply what your team can do, aligned with your policies and engineered for accountability, speed, and scale.',
    },
  ],
}

export const foundation = {
  eyebrow: 'Why Vahue',
  title: 'Foundations of AI Agents',
  subtitle: 'See the core components that make dependable, production-ready AI agents work.',
  top: [
    { title: 'Operator Applications', icon: 'applications' },
    { title: 'Operator Assistants', icon: 'assistants' },
    { title: 'Operator Agents', icon: 'agents' },
  ],
  bottom: [
    { title: 'Models', icon: 'models' },
    { title: 'Components', icon: 'building-blocks' },
    { title: 'Evaluations', icon: 'evaluations' },
    { title: 'Data Feedback Loop', icon: 'data-flywheel' },
    { title: 'Monitoring & Reports', icon: 'monitoring' },
    { title: 'Guardrails & Red Teaming', icon: 'guardrails' },
  ],
}

export type ShowcaseTab = {
  label: string
  bullets: string[]
  media: { kind: 'image'; src: string; width: number; height: number } | { kind: 'video' }
}

export const showcase: ShowcaseTab[] = [
  {
    label: 'Connect Data',
    bullets: [
      'Pull in fresh information with Operator’s ready-made data connectors.',
      'Work with your documents securely by local upload, cloud drive, or API.',
      'Link agents to outside databases like your CRM or ERP.',
    ],
    media: { kind: 'image', src: `${ASSET}/tab-ingest.png`, width: 992, height: 445 },
  },
  {
    label: 'Agentic Search',
    bullets: [
      'Curate knowledge bases so each agent only sees the data it should use.',
      'Follow the agent’s step-by-step reasoning to check it follows your playbook.',
    ],
    media: { kind: 'video' },
  },
  {
    label: 'Agent Library',
    bullets: [
      'Start with ready-made agents, apps, and assistants for workflows like coding help, report drafting, and finding insights.',
      'Run custom agents built for each team, including one per business unit.',
      'Coordinate several agents that each handle a specific part of a task.',
    ],
    media: { kind: 'image', src: `${ASSET}/tab-agent-arsenal.webp`, width: 1896, height: 912 },
  },
  {
    label: 'Team Threads',
    bullets: [
      'Give your whole team visibility into earlier questions with shared threads.',
      'Branch a thread to explore a new direction while keeping the original intact.',
    ],
    media: { kind: 'video' },
  },
  {
    label: 'Report Drafting',
    bullets: [
      'Draft proposals, status updates, reviews, and briefs from saved templates.',
      'Write reports faster in your house tone and style using the latest information.',
    ],
    media: { kind: 'video' },
  },
]

export const overmatch = {
  eyebrow: 'Why Vahue',
  title: 'Stay Ahead of the Curve',
  subtitle:
    'Your competitors are already putting AI agents to work. Keep the advantage with the most capable, production-ready automation your team can field.',
  items: [
    {
      icon: 'si-expertise',
      title: 'AI Expertise',
      body: 'We work with the leading foundation model providers and bring what we learn to every client engagement.',
    },
    {
      icon: 'model-performance',
      title: 'Model Performance',
      body: 'Model tuning is one of our core strengths. We can adapt models to your exact use case or start from proven, ready-made open models already on hand, like our tuned base.',
    },
    {
      icon: 'time-to-value',
      title: 'Time to Value',
      body: 'Use no-code tools to tailor agents on your own without waiting on outside developers or vendors.',
    },
    {
      icon: 'flexibility',
      title: 'Flexibility',
      body: 'Pick your preferred way to deploy and host agents and models. Seamlessly embed the platform into the apps and tools your team already uses.',
    },
    {
      icon: 'traceability',
      title: 'Traceability',
      body: 'Clear step-by-step reasoning shows people which steps and sources each agent used to reach an answer.',
    },
    {
      icon: 'model-agnostic',
      title: 'Model Agnostic',
      body: 'Leverage the model provider you prefer with Operator. Select models that account for each job’s parameters like cost, speed, and specialist skills.',
    },
  ],
}

export const trusted = {
  eyebrow: 'Supported Environments',
  title: 'Trusted & Secure',
  subtitle: 'Operator is available on private cloud and fully isolated networks.',
  items: [
    { icon: 'env-check', title: 'Private Cloud Hosting', body: 'SOC 2 Type II and ISO 27001 aligned' },
    { icon: 'env-check', title: 'Isolated Networks', body: 'Ready to run on locked-down networks' },
    { icon: 'env-check', title: 'Cloud Agnostic', body: 'Kubernetes containerized platform' },
  ],
}

export const prefooter = {
  headline: 'The future of your business starts here',
  primary: { label: 'Book a Demo', href: '/contact' },
  secondary: { label: 'Try Operator', href: '/contact' },
}
