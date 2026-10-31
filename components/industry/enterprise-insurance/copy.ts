import { INTEGRATIONS, WORKFLOWS, type Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import type { SegmentContent, SegmentValue } from '@/components/segments/types'

/*
 * Data helpers for the industry landing on the enterprise-insurance layout. Everything is keyed by the
 * industry slug (last segment of content.slug) or by workflow name, with generic fallbacks, so another
 * industry can reuse the page without new copy.
 */

export const industryKey = (content: SegmentContent) => content.slug.split('/').filter(Boolean).pop() ?? ''

/* Industry workflow name -> closest /automations/<slug>/ page. First matching rule wins. */
const WORKFLOW_RULES: { test: RegExp; slug: string }[] = [
  { test: /correspondence|inbox|order-status|support|customer|voice/i, slug: 'support-agents' },
  { test: /intake|notice of loss|kyc|invoice|packing slip|onboarding|clinical documentation|loan document/i, slug: 'document-intake' },
  { test: /reconcil|sync/i, slug: 'back-office-sync' },
  { test: /classif|scor|matching|triage|audit finding/i, slug: 'scoring-decisions' },
  { test: /review|summar|policy|treaty|knowledge/i, slug: 'knowledge-agents' },
]

export function workflowFor(name: string): Workflow | undefined {
  const rule = WORKFLOW_RULES.find((r) => r.test.test(name))
  return rule ? WORKFLOWS.find((w) => w.slug === rule.slug) : undefined
}

/* Card copy per industry workflow (Vahue voice, no figures). Missing names fall back to the workflow summary. */
export const WORKFLOW_COPY: Record<string, string> = {
  'First notice of loss intake':
    'Forms, photos, emails and call notes become a structured claim file in your core system. Fields the agent is unsure of go to an adjuster before anything is posted.',
  'Claims correspondence':
    'Agents draft replies to claimants, brokers and repairers from the claim file and the policy, and hand anything outside their limits to a handler with a summary.',
  'Treaty and policy review':
    'Agents read policies, endorsements and treaty wordings and answer coverage questions with the clause cited, so underwriters check instead of search.',
}

/* Verified Vahue cases closest to each industry (first one shows first). Fallback: Enterprise AI cases. */
const RELATED_CASES: Record<string, string[]> = {
  insurance: ['rfi-response-automation', 'amerit-repair-order-ai'],
}

export function casesFor(key: string, count = 2): CaseStudy[] {
  const picked = (RELATED_CASES[key] ?? [])
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c))
  const fallback = caseStudies.filter((c) => c.service === 'Enterprise AI' && !picked.includes(c))
  return [...picked, ...fallback].slice(0, count)
}

/* Only keep outcome figures that appear in a verified Vahue case (headline metric or an outcome line). */
export function verifiedValues(values: SegmentValue[]): SegmentValue[] {
  return values.filter((v) =>
    caseStudies.some((c) => c.metric === v.metric || c.outcomes.some((o) => o.includes(v.metric))),
  )
}

/* Industry core systems that may be named in the copy; shown ahead of the general integrations. */
const CORE_SYSTEMS = [
  'Guidewire', 'Duck Creek', 'Majesco', 'Sapiens', 'Epic', 'Cerner', 'Veeva', 'Temenos', 'FIS', 'Fiserv',
  'nCino', 'Encompass', 'Shopify', 'Magento', 'Microsoft Dynamics', 'Infor', 'Epicor', 'SolidWorks', 'Autodesk',
]

/* Rotating groups of system names for the carousel: systems named in the copy first, then INTEGRATIONS (multiple of 4). */
export function systemsFor(content: SegmentContent, size = 8): string[] {
  const text = JSON.stringify(content)
  const named = [...CORE_SYSTEMS, ...INTEGRATIONS].filter((n) => text.includes(n))
  const rest = INTEGRATIONS.filter((n) => !named.includes(n))
  const all = [...named, ...rest]
  const total = Math.max(size, Math.ceil(named.length / 4) * 4)
  return all.slice(0, total)
}
