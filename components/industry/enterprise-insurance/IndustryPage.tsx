import type { ReactNode } from 'react'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { SegmentContent } from '@/components/segments/types'
import CaseCards from './CaseCards'
import FullBleedMedia from './FullBleedMedia'
import LogoCarousel from './LogoCarousel'
import { GlassButton, IconFeatures, SectionHeader, Slice, icons } from './Sections'
import { WORKFLOW_COPY, casesFor, industryKey, systemsFor, verifiedValues, workflowFor } from './copy'

const CTA = { label: 'Book a workflow audit', href: '/contact/' }

const WORKFLOW_ICONS: Record<string, ReactNode> = {
  'document-intake': icons.assignment,
  'support-agents': icons.layers,
  'knowledge-agents': icons.manageSearch,
  'scoring-decisions': icons.psychology,
  'back-office-sync': icons.layers,
}
const AHA_ICONS = [icons.manageSearch, icons.psychology, icons.layers]

/**
 * Industry landing on the scale.com/enterprise/insurance layout (template clone: enterprise-insurance):
 * full-bleed hero -> integrations carousel -> why it works (icon cards) -> workflows (icon cards)
 * -> results (case cards) -> full-bleed pre-footer CTA. All sections of the template are kept.
 * Not shown from the industry copy: values without a verified Vahue case behind them, micro-job outcomes
 * (unverified figures), triggers/emotions/pains, point B, barriers and competitors.
 */
export default function IndustryPage({ content, workflows }: { content: SegmentContent; workflows: string[] }) {
  const key = industryKey(content)
  const cases = casesFor(key)
  const values = verifiedValues(content.values)
  const industry = content.eyebrow.toLowerCase()

  const whyItWorks = content.ahas.slice(0, 3).map((a, i) => ({ icon: AHA_ICONS[i % AHA_ICONS.length], title: a.title, body: a.body }))

  const workflowCards = workflows.map((name) => {
    const w = workflowFor(name)
    return {
      icon: (w && WORKFLOW_ICONS[w.slug]) ?? icons.lightbulb,
      title: name,
      body: WORKFLOW_COPY[name] ?? w?.summary ?? '',
      link: w ? { label: w.label, href: `/automations/${w.slug}/` } : undefined,
    }
  })

  const resultsSub = [
    'Verified outcomes from our own client work, each with the full write-up.',
    values.length ? values.map((v) => `${v.metric} ${v.label}`).join(' · ') : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="overflow-x-hidden bg-bg font-display text-white">
      <SmoothScroll />

      {/* PageHeader: FullBleedMedia with startPercentage 0. Template pt-24 sits under Scale's overlay header;
          Vahue's sticky navbar takes space in the flow, so the top padding drops to pt-4. */}
      <div className="pb-10 pt-4">
        <FullBleedMedia as="h1" startPercentage={0} headline={content.title} body={content.oneLiner} primary={CTA} />
      </div>

      {/* Logo carousel -> rotating groups of the systems the agents work in */}
      <Slice className="py-8">
        <LogoCarousel
          names={systemsFor(content)}
          line="Integrations: agents work inside the systems your team already uses."
          link={{ label: 'How we deploy', href: '/operations/' }}
        />
      </Slice>

      {/* Problems -> why it works (the mandate + principles) */}
      <Slice>
        <SectionHeader eyebrow="Why it works" title={content.coreJob.title} sub={content.coreJob.body} />
        <IconFeatures items={whyItWorks} />
      </Slice>

      {/* Solutions -> the industry's workflows, linked to their automation pages */}
      <Slice>
        <SectionHeader eyebrow="Workflows" title={`Where we start in ${industry}.`} sub={content.heroIntro}>
          <GlassButton href="/automations/">All workflows</GlassButton>
        </SectionHeader>
        <IconFeatures items={workflowCards} />
      </Slice>

      {/* Video features -> verified Vahue cases */}
      {cases.length ? (
        <Slice>
          <SectionHeader eyebrow="Results" title="Results from Vahue deployments" sub={resultsSub} />
          <CaseCards
            items={cases.map((c) => ({
              client: c.client,
              note: c.disclosure.toLowerCase(),
              metric: c.metric,
              title: c.title,
              body: c.summary,
              href: `/case-studies/${c.slug}/`,
            }))}
          />
        </Slice>
      ) : null}

      {/* Pre-footer: FullBleedMedia default startPercentage 10 */}
      <div className="pb-8 pt-16">
        <FullBleedMedia headline={`Start with one ${industry} workflow.`} primary={CTA} />
      </div>
    </div>
  )
}
