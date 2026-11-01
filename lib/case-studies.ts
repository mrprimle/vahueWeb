export type CaseStudy = {
  slug: string
  client: string
  title: string
  service: string
  metric: string
  summary: string
  outcomes: string[]
  disclosure: 'Named client' | 'Client anonymised'
  column: 1 | 2 | 3
  /** Point A: the starting state, only as stated in this case's own text */
  pointA?: string
  /** Time from kickoff to the first agent live, only where stated */
  timeToLive?: string
  /** Point B: the result state, only as stated in this case's own text */
  pointB?: string
  /** Payback period, only where stated */
  payback?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'exaware-governed-noc-agents',
    client: 'Exaware',
    title: 'Governed NOC agents for faster incident resolution',
    service: 'Enterprise AI',
    metric: '−27% TTR',
    summary:
      'Production NOC agents reduced repeatable incident resolution time by 27% while recording zero unauthorized execution in UAT and staging.',
    outcomes: [
      '27% reduction in time to resolution for repeatable incidents',
      'Zero unauthorized execution recorded in UAT and staging',
      'Production-oriented agent workflows with explicit execution controls',
    ],
    disclosure: 'Named client',
    column: 1,
    pointB: '27% shorter time to resolution for repeatable incidents, with zero unauthorized execution recorded in UAT and staging',
  },
  {
    slug: 'rfi-response-automation',
    client: 'Global B2B Growth Partner',
    title: 'RFI response automation with human review intact',
    service: 'Enterprise AI',
    metric: '>90% automated',
    summary:
      'More than 90% of RFI responses were automated, moving turnaround from several days to a few hours without removing editing or audit history.',
    outcomes: [
      'More than 90% of RFI responses automated',
      'Turnaround reduced from several days to a few hours',
      'Editing controls and audit history retained',
    ],
    disclosure: 'Client anonymised',
    column: 2,
    pointA: 'RFI responses took several days',
    pointB: 'More than 90% of RFI responses automated, turnaround in a few hours',
  },
  {
    slug: 'amerit-repair-order-ai',
    client: 'Amerit Fleet Solutions',
    title: 'Repair-order scoring with human-defined thresholds',
    service: 'Enterprise AI',
    metric: 'Seconds, not hours',
    summary:
      'Every repair order could be scored in seconds at 75–80% agreement, while costly billing decisions remained behind human-defined confidence thresholds.',
    outcomes: [
      'Repair orders scored in seconds',
      '75–80% agreement in the measured workflow',
      'High-cost billing decisions kept behind human-defined thresholds',
    ],
    disclosure: 'Named client',
    column: 3,
    pointB: 'Every repair order scored in seconds at 75–80% agreement',
  },
  {
    slug: 'docplanner-voicebot-recovery',
    client: 'Docplanner',
    title: 'Voicebot recovery that doubled booking conversion',
    service: 'Enterprise AI',
    metric: '~10% → ~20%',
    summary:
      'An unstable scheduling voicebot doubled booking conversion from roughly 10% to 20% while becoming faster, less token-heavy, and easier to monitor.',
    outcomes: [
      'Booking conversion increased from roughly 10% to 20%',
      'Faster responses with lower token usage',
      'Improved production monitoring',
    ],
    disclosure: 'Named client',
    column: 1,
    pointA: 'An unstable scheduling voicebot converting roughly 10% of bookings',
    pointB: 'Booking conversion of roughly 20%, with faster responses and lower token usage',
  },
  {
    slug: 'retail-nlp-delivery',
    client: 'Retail NLP Delivery',
    title: 'Embedded data scientists accelerated an NLP delivery',
    service: 'AI-Native Engineers',
    metric: '8 months → 6+',
    summary:
      'Five senior data scientists helped bring an eight-month NLP delivery down to just over six months and cleared inherited technical issues in about one month.',
    outcomes: [
      'Five senior data scientists embedded into delivery',
      'Timeline reduced from eight months to just over six',
      'Inherited technical issues cleared in about one month',
    ],
    disclosure: 'Client anonymised',
    column: 2,
    pointA: 'An eight-month NLP delivery with inherited technical issues',
    pointB: 'Delivered in just over six months',
  },
  {
    slug: 'consumer-email-classifier',
    client: 'Consumer Email Startup',
    title: 'A retrainable email classifier shipped behind an API',
    service: 'AI-Native Engineers',
    metric: '>95% accuracy',
    summary:
      'A classifier exceeded 95% accuracy, integrated through an API within days, and shipped with documentation for retraining on future data.',
    outcomes: [
      'More than 95% measured classification accuracy',
      'API integration completed within days',
      'Retraining documentation delivered with the system',
    ],
    disclosure: 'Client anonymised',
    column: 3,
    timeToLive: 'API integration within days',
    pointB: 'A classifier above 95% accuracy behind an API, with retraining documentation',
  },
  {
    slug: 'sky-embedded-data-science',
    client: 'Sky',
    title: 'Embedded data science delivery with production ownership',
    service: 'AI-Native Engineers',
    metric: 'Value from day one',
    summary:
      'Embedded specialists onboarded quickly and delivered models, workflow pipelines, deployment support, and ongoing production ownership across several business areas.',
    outcomes: [
      'Specialists embedded into existing delivery teams',
      'Models and workflow pipelines delivered across business areas',
      'Deployment support and ongoing production ownership included',
    ],
    disclosure: 'Named client',
    column: 1,
  },
  {
    slug: 'piogroup-employee-assistant',
    client: 'PioGroup',
    title: 'A permission-aware assistant across CRM and ERP data',
    service: 'Team Training & Consulting',
    metric: '>30% adoption',
    summary:
      'The employee assistant reached more than 90% reported answer accuracy and more than 30% company-wide adoption across permissioned CRM and ERP data.',
    outcomes: [
      'More than 90% reported answer accuracy',
      'More than 30% company-wide adoption',
      'Permission-aware access across CRM and ERP data',
    ],
    disclosure: 'Named client',
    column: 2,
    pointB: 'More than 90% reported answer accuracy and more than 30% company-wide adoption',
  },
  {
    slug: 'in-house-marketing-mix-modeling',
    client: 'Global Food Company',
    title: 'Marketing-mix modeling transferred in-house',
    service: 'Team Training & Consulting',
    metric: 'Run in-house',
    summary:
      'A cross-functional pilot, training, and rollout blueprint left the organization able to run, explain, and extend marketing-mix modeling independently.',
    outcomes: [
      'Cross-functional pilot completed',
      'Internal team trained to operate and explain the model',
      'Rollout blueprint delivered for independent extension',
    ],
    disclosure: 'Client anonymised',
    column: 3,
    pointB: 'The internal team runs, explains and extends marketing-mix modeling independently',
  },
  {
    slug: 'clinical-ai-product-roadmap',
    client: 'Clinical Tools Company',
    title: 'A six-week roadmap for a clinically grounded AI product',
    service: 'Team Training & Consulting',
    metric: '6-week roadmap',
    summary:
      'Several focused sessions converted clinical expertise and vendor distrust into a realistic product design, technical stack, cost range, and scalable roadmap.',
    outcomes: [
      'Product design grounded in clinical expertise',
      'Technical stack and cost range defined',
      'Scalable six-week roadmap prepared',
    ],
    disclosure: 'Client anonymised',
    column: 1,
    pointA: 'Clinical expertise and distrust of vendors',
    pointB: 'A product design, technical stack, cost range and six-week roadmap',
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}
