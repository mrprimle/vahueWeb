// Copy for /strategy (Workflow audit), in strict parity with the evaluation-enterprise clone
// (components/templates/evaluation-enterprise/content.ts, Scale's own text in reference-snapshots): the same
// slots and counts (2 hero CTAs, 3 challenge items, 3 checklist items, 5 how-it-works rows, 2 pre-footer CTAs) and
// each line about the length and Title Case of Scale's line in that slot. Phase and positioning copy comes from
// lib/automation-content.ts (PHASES, POSITIONING); lines marked "page copy" were written for this page.
// Scale's challenge body carries two market figures; the matching slots hold placeholders, marked
// `// PLACEHOLDER METRIC` (Mike will replace them).
import { PHASES } from '@/lib/automation-content'
import type { GlyphName } from './icons'

const [, PILOT, OPERATE] = PHASES

export const CONTACT = '/contact/'

const BASELINE_SHARE = '1 in 10' // PLACEHOLDER METRIC (challenge body: projects that record a baseline)
const STALLED_SHARE = '30%' // PLACEHOLDER METRIC (challenge body: pilots dropped after the proof of concept)

export const hero = {
  title: 'Workflow Audit for Operations Teams', // page copy
  body: 'Measure one high-volume workflow before anything is automated.', // page copy (from PHASES Audit)
  primary: { label: 'Book a workflow audit', href: CONTACT },
  secondary: { label: 'Learn more', href: '#how-it-works' },
}

export const challenge = {
  eyebrow: 'The challenge',
  title: 'Lack of a Baseline Stalls Automation Projects', // page copy
  // page copy (research: agencies rarely publish a baseline; stalled PoCs are a top trigger)
  body: `Only ${BASELINE_SHARE} automation projects records a baseline before it starts, and more than ${STALLED_SHARE} of pilots stop after the proof of concept. The most common reason projects stall is a missing baseline, showing up as:`,
  items: [
    {
      icon: 'help' as GlyphName,
      title: 'No Baseline', // page copy
      body: 'Nobody recorded today’s volume, minutes per item or error rate.', // page copy
    },
    {
      icon: 'flag' as GlyphName,
      title: 'No Stop Point', // page copy
      body: 'Pilots run on with no agreed target and no point to stop.', // page copy
    },
    {
      icon: 'receipt' as GlyphName,
      title: 'Hidden Costs', // page copy
      body: 'Hours and spend sit across several teams, so the cost is a guess.', // page copy
    },
  ],
}

export const solution = {
  eyebrow: 'The solution',
  title: 'Record the Baseline Before the Pilot Starts', // page copy
  body: 'The path to automation you can trust is to map one workflow end to end, measure it on your own data and agree the target before any agent runs.', // page copy (from PHASES Audit)
  /** What the client has at the end of the audit (Scale: 3 checklist items) */
  items: [
    {
      title: 'Get a Recorded Baseline', // page copy
      body: 'Volume, minutes per item, error rate and cost, measured on your own data.', // from PHASES Audit
    },
    {
      title: 'Agree a Target and Stop Point', // page copy
      body: 'What the pilot has to reach, and the point at which we stop if it does not.', // from PHASES Audit
    },
    {
      title: 'Plan a Pilot That Holds', // page copy
      body: 'Scope, data access, reviewers and guardrails for a four-to-six-week pilot.', // page copy (PHASES Pilot length)
    },
  ],
}

export type MockupKind = 'map' | 'baseline' | 'target' | 'review' | 'results'

export const howItWorks = {
  id: 'how-it-works',
  eyebrow: 'How it works',
  title: 'How the Vahue Workflow Audit Measures Your Operations', // page copy
  // page copy (from PHASES)
  body: 'Trust in automation is earned with numbers. The audit maps the workflow and records its baseline, the pilot tests agents against it at real volume, and once accuracy holds we operate the workflow and report against it.',
  items: [
    {
      title: 'Map your workflow', // page copy
      body: 'We follow one workflow end to end: where items arrive, who touches them, which systems they pass through, where the exceptions go and how long each step takes.', // page copy
      mockup: 'map' as MockupKind,
      bar: 'Workflow map',
      textSide: 'left' as const,
    },
    {
      title: 'Record your baseline', // page copy
      body: 'Volume, minutes per item, error rate and cost, measured on your own data, so every later result is compared with a real number, not an estimate.', // from PHASES Audit
      mockup: 'baseline' as MockupKind,
      bar: 'Baseline',
      textSide: 'right' as const,
    },
    {
      title: 'Set the target and stop point', // page copy
      body: 'Before any agent runs, we agree in writing what the pilot has to reach, the point at which we stop, and who signs off.', // page copy
      mockup: 'target' as MockupKind,
      bar: 'Target and stop point',
      textSide: 'left' as const,
    },
    {
      title: PILOT.name,
      body: `${PILOT.body} Only then does the scope grow.`, // second sentence: page copy
      mockup: 'review' as MockupKind,
      bar: 'Review queue',
      textSide: 'right' as const,
    },
    {
      title: OPERATE.name,
      body: `${OPERATE.body} You see what the agents did, every month.`, // second sentence: page copy
      mockup: 'results' as MockupKind,
      bar: 'Results',
      textSide: 'left' as const,
    },
  ],
}

export const prefooter = {
  title: 'Your busiest workflow, measured from day one', // page copy (from POSITIONING.line)
  primary: { label: 'Book a workflow audit', href: CONTACT },
  secondary: { label: 'See results', href: '/case-studies/' },
}
