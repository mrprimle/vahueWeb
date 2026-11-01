import type { ReactNode } from 'react'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import { WORKFLOW_ART, dots } from '@/components/enterprise-vahue/art'
import { icons } from './Sections'
import type { CaseCard } from './CaseCards'

/*
 * Content for an industry page on the scale.com/enterprise/insurance layout, in strict parity with the clone
 * (scale.com/enterprise-insurance; Scale's own text in reference-snapshots): hero (headline, ~30-word body,
 * 1 CTA) -> logo carousel (line + link, 7 logos in 4 + 3) -> 3 problem cards -> 3 solution cards + glass button ->
 * 2 video cards -> pre-footer (headline + 1 CTA). Each line is about the length and Title Case of Scale's line in
 * that slot. Sources: lib/automation-content.ts (INDUSTRY_WORKFLOWS, WORKFLOWS), lib/case-studies.ts, and the
 * insurance segment copy (components/segments/content/insurance.ts). Lines written for the page: "page copy".
 */

type Cta = { label: string; href: string }
type Item = { icon: ReactNode; title: string; body: string }

export type InsuranceLayoutContent = {
  hero: { headline: string; body: string; cta: Cta; imageBg: string }
  logos: { names: string[]; line: string; link: Cta }
  problems: { title: string; sub: string; items: Item[] }
  solutions: { title: string; sub: string; button: Cta; items: Item[] }
  cases: { title: string; sub: string; items: CaseCard[] }
  prefooter: { headline: string; cta: Cta; imageBg: string }
}

export const CTA: Cta = { label: 'Book a workflow audit', href: '/contact/' }

const kase = (slug: string) => caseStudies.find((k) => k.slug === slug) as CaseStudy

/** Named clients from lib/case-studies.ts, for the 7 logo slots (5 names; slots 6-7 repeat the first two). */
const NAMED = caseStudies.filter((k) => k.disclosure === 'Named client').map((k) => k.client)

/** Media fills: Scale's #193A29 media colour under the dot texture (no Scale imagery). */
const MEDIA = dots('#193A29', 0.16, 8)

const caseCard = (slug: string, title: string, body: string, tone: string, art: string): CaseCard => {
  const k = kase(slug)
  return {
    client: k.client,
    metric: k.metric,
    title,
    body,
    href: `/case-studies/${k.slug}/`,
    background: `${WORKFLOW_ART[art] ?? ''} right 8% center / 34% no-repeat, ${dots(tone, 0.14, 12)}`,
  }
}

export const insuranceLayoutContent: InsuranceLayoutContent = {
  hero: {
    headline: 'Turn Claims Paperwork Into Clean Records', // page copy
    // page copy (from the insurance segment copy and INDUSTRY_WORKFLOWS.insurance)
    body: 'Deploy AI agents that turn notice-of-loss forms, claim files, correspondence and policy wordings into structured records in your core system, so adjusters review exceptions instead of keying documents.',
    cta: CTA,
    imageBg: MEDIA,
  },
  logos: {
    names: NAMED,
    line: 'Trusted by teams that run AI agents in production.', // page copy
    link: { label: 'Read our case studies', href: '/case-studies/' },
  },
  problems: {
    title: 'Insurance’s 3 Most Expensive Bottlenecks', // page copy
    sub: 'Every claims team runs into the same costly problems:', // page copy
    // From the insurance segment pains (components/segments/content/insurance.ts), cut to Scale's lengths.
    items: [
      {
        icon: icons.layers,
        title: 'Paperwork Overload',
        body: 'ACORDs, PDFs and emails slow every workflow and keep key details out of reach of your systems',
      },
      {
        icon: icons.manageSearch,
        title: 'Quiet Claims Leakage',
        body: 'Only a fraction of files gets reviewed, so leakage on subrogation, fraud and duplicate claims goes unseen',
      },
      {
        icon: icons.lock,
        title: 'No Audit Trail',
        body: 'AI-assisted decisions leave no consistent record of why they were made',
      },
    ],
  },
  solutions: {
    title: 'How Smart Insurers Turn Paperwork Into Clean Claim Files', // page copy
    // page copy (from POSITIONING.promise and the review-queue control)
    sub: 'We take the three workflows that slow insurance operations off your team and run them with agents inside your core system, with every decision cited, logged and reviewed by your people.',
    button: { label: 'View all workflows', href: '/automations/' },
    // INDUSTRY_WORKFLOWS.insurance, in Title Case; bodies from the workflow copy, cut to Scale's lengths.
    items: [
      {
        icon: icons.assignment,
        title: 'First Notice of Loss Intake Agents',
        body: 'Turn forms, photos, emails and call notes into a structured claim file in your core',
      },
      {
        icon: icons.psychology,
        title: 'Claims\nCorrespondence',
        body: 'Draft replies to claimants, brokers and repairers from the claim file, with anything outside the agent’s limits handed to a person',
      },
      {
        icon: icons.lightbulb,
        title: 'Treaty and Policy Wording Review',
        body: 'Answer coverage questions from policies and treaty wordings with the clause cited, so underwriters check instead of search',
      },
    ],
  },
  cases: {
    title: 'Proof From Our Work', // page copy
    sub: 'Two cases closest to insurance document work', // page copy
    items: [
      caseCard(
        'rfi-response-automation',
        'Automated RFI Responses, Review Intact', // page copy (from the case title)
        'Over 90% of RFI responses automated, turnaround cut from days to hours.', // from the case outcomes
        '#273252',
        'document-intake',
      ),
      caseCard(
        'amerit-repair-order-ai',
        'Repair-Order Scoring Behind Human Thresholds', // page copy (from the case title)
        'Every repair order scored in seconds, while costly billing decisions stay behind human-defined confidence thresholds.', // from the case summary
        '#5C4F42',
        'scoring-decisions',
      ),
    ],
  },
  prefooter: {
    headline: 'One insurance workflow, measured from day one', // page copy (from POSITIONING.line)
    cta: CTA,
    imageBg: MEDIA,
  },
}
