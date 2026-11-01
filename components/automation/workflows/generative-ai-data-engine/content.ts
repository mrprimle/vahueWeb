import { CONTROL_FEATURES, PHASES, WORKFLOWS } from '@/lib/automation-content'

/*
 * /automations/back-office-sync on the generative-ai-data-engine clone. One entry per clone slot, each about the
 * length of Scale's text in that slot (reference-snapshots/scale-clone/generative-ai-data-engine.md).
 * Source: lib/automation-content.ts (WORKFLOWS 'back-office-sync', PHASES, CONTROL_FEATURES); short labels and
 * diagram strings written for this page are listed in the strict-parity report.
 */
const wf = WORKFLOWS.find((w) => w.slug === 'back-office-sync')!

export const BACK_OFFICE = {
  workflow: wf,
  hero: {
    headline: 'Back-Office Sync Agents',
    body: 'Keep CRM, ERP and finance in step.',
    image: '/img/careers/office-1.jpg',
  },
  strip: { lead: 'Runs inside the systems your team already uses.', link: 'See verified results' },
  overview: { eyebrow: 'Product Overview', title: 'Back-Office Sync', lead: wf.summary },
  // Clone: expertise.png (4 capability cards + 2 stats + dot map + legend).
  expertise: {
    cards: [
      { title: ['Orders'], body: ['Synced between CRM', 'and ERP as they change'], icon: 'sync' },
      { title: ['Customer', 'Onboarding'], body: ['Set up once and', 'written to every system'], icon: 'person' },
      { title: ['Approvals'], body: ['Routed to the right person', 'with the record attached'], icon: 'check' },
      { title: ['Reconciliations'], body: ['Prepared overnight, with', 'mismatches as a short list'], icon: 'balance' },
    ],
    stats: [
      { value: '14+', label: 'Integrations' }, // PLACEHOLDER METRIC (count of INTEGRATIONS listed in lib/automation-content.ts)
      { value: '24/7', label: 'Record sync' }, // PLACEHOLDER METRIC
    ],
    legend: ['Synced by an agent', 'Waiting for a person'],
  },
  overviewSplit: {
    statement:
      'Agents watch your CRM, ERP and finance systems, match each record across them and write the clean ones back, so your team only handles the exceptions.',
    phases: PHASES,
  },
  lifecycle: {
    eyebrow: 'How It Works',
    title: ['Sync Your Records', 'Without Re-Keying Them'],
    lead: 'Each step runs inside the systems you already use, and every match, write and exception is logged for review.',
    steps: wf.steps,
    sideIn: 'New records*',
    sideOut: 'Your systems*',
    exceptions: 'Exceptions',
    footnote: '*Your systems stay the system of record; agents only read and write through their APIs',
  },
  features: {
    eyebrow: 'Key Features',
    title: ['Agents Propose,', 'Your Team Stays in Control'],
    lead: 'Approval before any payment or credit action, and a full audit log per record.',
    items: CONTROL_FEATURES,
  },
  demos: {
    eyebrow: 'Demos',
    title: 'Back-Office Sync Demos',
    items: ['Order Sync From the CRM Into the ERP', 'Nightly Matching', 'Exception Review With a Human Approver'],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Case Studies & Results',
    lead: ['Outcomes from Vahue deployments in production,', 'each with its disclosure and the full write-up.'],
    cases: ['rfi-response-automation', 'amerit-repair-order-ai'],
  },
  featured: 'rfi-response-automation',
  prefooter: { headline: 'Start with your busiest back-office workflow', image: '/img/careers/office-4.jpg' },
  cta: { href: '/contact/', label: 'Book an Audit' },
}
