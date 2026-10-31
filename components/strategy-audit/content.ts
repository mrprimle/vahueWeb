// Copy for /strategy (Workflow audit). Phase and positioning copy comes from
// lib/automation-content.ts (PHASES, POSITIONING); the rest is written for this page in the same voice.
// No metrics: the audit records the client's own numbers, so the page names the measures, not values.
import { PHASES, POSITIONING } from '@/lib/automation-content'
import type { GlyphName } from './icons'

const [AUDIT, PILOT, OPERATE] = PHASES

export const CONTACT = '/contact/'

export const hero = {
  title: 'Measure the workflow before anything is automated',
  body: 'The workflow audit takes two weeks. We map one high-volume workflow end to end, record its baseline and agree the target and the point at which we stop.',
  primary: { label: 'Book a workflow audit', href: CONTACT },
  secondary: { label: 'How it works', href: '#how-it-works' },
}

export const challenge = {
  eyebrow: 'The challenge',
  title: 'Automation without a baseline is hard to judge',
  body: `${POSITIONING.forWho.replace(/\.$/, '')} rarely lack ideas for what to automate. They lack the starting numbers, and projects stall on:`,
  items: [
    {
      icon: 'help' as GlyphName,
      title: 'No baseline',
      body: 'Nobody has recorded today’s volume, minutes per item or error rate, so a pilot has nothing to be compared against.',
    },
    {
      icon: 'flag' as GlyphName,
      title: 'No agreed stop point',
      body: 'Pilots run on without a target, and no one has said in advance when to stop or when to scale.',
    },
    {
      icon: 'receipt' as GlyphName,
      title: 'Cost spread across teams',
      body: 'Hours and spend sit across several people and tools, so the real cost of the workflow is a guess.',
    },
  ],
}

export const solution = {
  eyebrow: 'The solution',
  title: 'Two weeks on one workflow, before the pilot starts',
  body: POSITIONING.promise,
  /** What the client has at the end of the audit */
  items: [
    {
      title: 'A map of the workflow',
      body: 'Every step, system, handoff and exception, end to end, as it runs today.',
    },
    {
      title: 'The recorded baseline',
      body: 'Volume, minutes per item, error rate and cost, measured on your own data.',
    },
    {
      title: 'An agreed target and stop point',
      body: 'What the pilot has to reach, and the point at which we stop if it does not.',
    },
    {
      title: 'A pilot plan',
      body: 'Scope, data access, reviewers and guardrails for a pilot of four to six weeks.',
    },
  ],
}

export type MockupKind = 'map' | 'baseline' | 'target' | 'review' | 'results'

export const howItWorks = {
  id: 'how-it-works',
  eyebrow: 'How it works',
  title: 'From the audit to a workflow we run',
  body: 'The audit sets the numbers. The pilot tests them at real volume, and once it holds we operate the workflow and report against the baseline every month.',
  items: [
    {
      phase: `${AUDIT.name} · ${AUDIT.length}`,
      title: 'Map the workflow',
      body: 'We follow one workflow end to end: where items arrive, who touches them, which systems they pass through and where the exceptions go.',
      mockup: 'map' as MockupKind,
      bar: 'Workflow map',
      textSide: 'left' as const,
    },
    {
      phase: `${AUDIT.name} · ${AUDIT.length}`,
      title: 'Record the baseline',
      body: 'We measure volume, minutes per item, error rate and cost on your own data, so every later result has a real number to be compared with.',
      mockup: 'baseline' as MockupKind,
      bar: 'Baseline',
      textSide: 'right' as const,
    },
    {
      phase: `${AUDIT.name} · ${AUDIT.length}`,
      title: 'Agree the target and the stop point',
      body: 'Before any agent runs, we agree in writing what the pilot has to reach and the point at which we stop.',
      mockup: 'target' as MockupKind,
      bar: 'Target and stop point',
      textSide: 'left' as const,
    },
    {
      phase: `${PILOT.name} · ${PILOT.length}`,
      title: 'Pilot on your own data',
      body: PILOT.body,
      mockup: 'review' as MockupKind,
      bar: 'Review queue',
      textSide: 'right' as const,
    },
    {
      phase: `${OPERATE.name} · ${OPERATE.length}`,
      title: 'Operate and report against the baseline',
      body: OPERATE.body,
      mockup: 'results' as MockupKind,
      bar: 'Results',
      textSide: 'left' as const,
    },
  ],
}

export const prefooter = {
  title: POSITIONING.line,
  primary: { label: 'Book a workflow audit', href: CONTACT },
  secondary: { label: 'See case studies', href: '/case-studies/' },
}
