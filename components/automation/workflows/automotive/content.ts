import { PHASES, WORKFLOWS } from '@/lib/automation-content'

/*
 * /automations/scoring-decisions on the automotive clone. One entry per clone slot, each about the length of
 * Scale's text there (reference-snapshots/scale-clone/automotive.md). Source: lib/automation-content.ts
 * (WORKFLOWS 'scoring-decisions', PHASES) and lib/case-studies.ts; text written for this page is listed in the
 * strict-parity report.
 */
const wf = WORKFLOWS.find((w) => w.slug === 'scoring-decisions')!
const [audit, pilot, operate] = PHASES

export const SCORING = {
  workflow: wf,
  hero: {
    headline: 'Scoring and Decisions Engine',
    body: 'Score, classify and route work at volume.',
    image: '/img/careers/office-1.jpg',
    primary: { label: 'Book an Audit', href: '/contact/' },
  },
  // Scale: 2 customer marks. Here: the first two systems this workflow runs inside.
  tools: wf.tools.slice(0, 2),
  overview: {
    title: 'The Scoring and Decisions Hub',
    sub: 'Everything a team needs to score, classify and route work at volume, with every decision explained.',
    checklist: [
      {
        title: 'Scoring',
        body: 'Models learn from your past decisions and the reasons behind them, then give each new item a score and a written explanation, so quality checks, risk scores and grades stay consistent between reviewers.',
      },
      {
        title: 'Routing',
        body: 'Clear cases flow straight on to the next system; borderline ones go to a reviewer with the score and its explanation attached, so your people spend their time on the cases that need judgement.',
      },
      {
        title: 'Monitoring',
        body: 'Agreement with your reviewers is tracked every week, every decision and its explanation is logged, and the scope only grows once the measured agreement holds against the baseline.',
      },
    ],
    diagram: ['Scoring', 'Monitoring', 'Routing'] as [string, string, string],
  },
  supported: {
    over: 'Decision stack',
    title: 'How to Build Scoring at Volume',
    heading: 'Supported Decisions',
    sub: 'Consistent calls for high-volume work',
    body: 'Models score every item and explain why, while people review the borderline cases, so decisions stay fast, consistent and logged.',
    cta: { label: 'Book an Audit', href: '/contact/' },
    // Scale: 3D / Image / Mapping / Text / Audio. Here: the kinds of judgement in WORKFLOWS 'scoring-decisions'.
    tabs: [
      { title: 'Quality', rows: ['Batch 118 · line inspection', 'Batch 119 · line inspection', 'Batch 120 · line inspection', 'Batch 121 · line inspection'] },
      { title: 'Tickets', rows: ['Billing question', 'Login problem', 'Refund request', 'Delivery delay'] },
      { title: 'Risk', rows: ['Application 4471', 'Application 4472', 'Application 4473', 'Application 4474'] },
      { title: 'Grading', rows: ['Submission A-12', 'Submission A-13', 'Submission A-14', 'Submission A-15'] },
      { title: 'Repair Orders', rows: ['RO 20931 · brakes', 'RO 20932 · tyres', 'RO 20933 · engine', 'RO 20934 · body'] },
    ],
  },
  phases: {
    title: 'Stages of a Scoring Rollout',
    sub: 'We work with your team at every step, from the first baseline to running it.',
    items: [
      { title: `${audit.name} Phase`, length: audit.length, body: `${audit.body} Nothing is built before then.` },
      { title: `${pilot.name} Phase`, length: pilot.length, body: `${pilot.body} Agreement with your reviewers is tracked every week.` },
      {
        title: `${operate.name} Phase`,
        length: operate.length,
        body: `${operate.body} Scope grows to the next kind of decision only once reviewer agreement holds against the baseline, and every score keeps its explanation in the log.`,
      },
    ],
  },
  why: {
    over: 'Why Vahue',
    title: 'Picked by Teams Making Thousands of Judgements',
    sub: 'Why teams making the same call thousands of times a month build with us, for these reasons:',
    items: [
      {
        title: 'Consistent Calls',
        body: 'Every item is scored the same way, with an explanation stored next to each decision, so reviewers stop disagreeing on the easy cases.',
      },
      { title: 'Seconds, Not Hours', body: 'Every item is scored in seconds, so hours of manual QA per batch turn into a short review of the borderline cases.' },
      {
        title: 'Measured Agreement',
        body: 'Agreement with your reviewers is tracked every week, and the scope grows only once it holds against the baseline from the audit.',
      },
    ],
  },
  resources: { over: 'Resources', title: 'Read More About Scoring at Volume', cases: ['consumer-email-classifier', 'rfi-response-automation'] },
  featured: {
    title: 'One Deployment in Detail',
    label: 'Case Study',
    slug: 'amerit-repair-order-ai',
    link: 'Read the Case Study →',
  },
  prefooter: {
    headline: 'Start with your busiest scoring workflow',
    image: '/img/careers/office-4.jpg',
    primary: { label: 'Book an Audit', href: '/contact/' },
    secondary: { label: 'See Results', href: '/case-studies/' },
  },
}
