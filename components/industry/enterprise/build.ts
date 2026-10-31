import type { EnterpriseContent, PullApartItem } from '@/components/scale-clone/enterprise/content'
import type { LogLine, QueueRow } from '@/components/enterprise-vahue/Media'
import {
  BLOG_HEADING,
  CTA,
  bridgeSlice,
  caseCard,
  heroNodes,
  logoCloudSlice,
  pillarsSlice,
  poweredBySlice,
  prefooterSlice,
  raceSlice,
  statsSlice,
  testimonialsSlice,
  trustedSlice,
  workflowCard,
} from '@/components/operations/content'
import { INDUSTRY_WORKFLOWS } from '@/lib/automation-content'

/*
 * Content for an industry page on the scale.com/enterprise layout, built from one `IndustryConfig`, in strict parity
 * with the clone (same sections, roles and counts as /operations; see components/operations/content.ts). The
 * industry-specific slots are the hero, the pull-apart, the carousel (INDUSTRY_WORKFLOWS, topped up to Scale's 4
 * cards with a case study) and the three testimonial cases; the rest is shared with /operations.
 * Lines marked "page copy" here and in the industry files were written for these pages (copy review).
 */

export type IndustryConfig = {
  /** INDUSTRY_WORKFLOWS key, also the route segment under /industries/. */
  key: string
  hero: { headline: string; body: string; /** exactly 7 system names (hero graph nodes) */ systems: string[] }
  /** Pull-apart: [0] the problem (object whole), [1] the answer (object pulled apart). */
  problem: [PullApartItem, PullApartItem]
  /** Each INDUSTRY_WORKFLOWS name -> closest /automations/<slug>/ page. */
  workflowLinks: Record<string, string>
  /** Case study that fills the carousel to Scale's 4 cards when the industry lists fewer workflows. */
  extraCase?: string
  /** Three verified cases for the testimonial slots (their own stated summaries). */
  cases: [string, string, string]
  /** Mock labels for the visuals (no figures). */
  pipeline: { inputs: [string, string, string]; target: string }
  queue: QueueRow[]
  log: LogLine[]
}

export function buildIndustryContent(c: IndustryConfig): EnterpriseContent {
  const names = INDUSTRY_WORKFLOWS[c.key]?.workflows ?? []
  const posts = names.filter((name) => c.workflowLinks[name]).map((name, i) => workflowCard(c.workflowLinks[name], i, name))
  if (posts.length < 4 && c.extraCase) posts.push(caseCard(c.extraCase, posts.length))
  return {
    hero: {
      headline: c.hero.headline,
      body: c.hero.body,
      cta: CTA,
      scroll: 'Scroll to explore',
      nodes: heroNodes(c.hero.systems),
    },
    pullApart: {
      curvesUrl: '/operations/flow-curves.json',
      cardMark: '/img/white-circle.svg',
      items: c.problem,
    },
    bridge: bridgeSlice,
    blog: { heading: BLOG_HEADING, posts: posts.slice(0, 4) },
    logoCloud: logoCloudSlice,
    stats: statsSlice,
    testimonials: testimonialsSlice(c.cases),
    race: raceSlice,
    pillars: pillarsSlice,
    poweredBy: poweredBySlice,
    trusted: trustedSlice,
    prefooter: prefooterSlice,
  }
}
