import type { ReactNode } from 'react'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { SegmentContent } from '@/components/segments/types'
import { CONTROL_FEATURES, PHASES } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import { MdSchedule } from '@/components/scale-clone/enterprise-healthcare/icons'
import { workflowFor } from '@/components/industry/enterprise-insurance/copy'
import CaseSpotlight from './CaseSpotlight'
import ControlIllustration from './ControlIllustration'
import ControlSplit from './ControlSplit'
import FullBleedMedia from './FullBleedMedia'
import { FindingsMockup, IntakeMockup, SummaryMockup } from './Mockups'
import ResourceTiles from './ResourceTiles'
import SgpStack from './SgpStack'
import TabbedPanel, { type TabItem } from './TabbedPanel'
import { HeroVisual, PrefooterVisual } from './Visuals'

const CTA = { label: 'Book a workflow audit', href: '/contact/' }

/* Systems the agents work in: the EHRs the healthcare copy names, then general integrations. */
const SYSTEMS = ['Epic', 'Cerner', 'Meditech', 'Outlook', 'Microsoft Teams', 'SharePoint', 'Snowflake', 'Twilio']

/* Tab copy per industry workflow (INDUSTRY_WORKFLOWS['healthcare-life-sciences']); neutral grey indicators. */
const TABS: Record<string, { title: string; body: string; mockup: ReactNode }> = {
  'Clinical and trial document summaries': {
    title: 'Summaries of protocols and study documents, every line cited',
    body: 'Agents read protocols, amendments, study reports and guidelines, and draft summaries your team checks against the cited page instead of reading the whole file.',
    mockup: <SummaryMockup />,
  },
  'Clinical documentation': {
    title: 'Referrals, lab reports and forms become clean records',
    body: 'Incoming documents are read, checked against your rules and posted to the right system. Fields the agent is unsure of go to a person, next to the source page.',
    mockup: <IntakeMockup />,
  },
  'Audit finding classification': {
    title: 'Classify audit findings and route them to the right owner',
    body: 'Each finding gets a category, a severity and a reason, learned from how your quality team has decided before. Borderline cases go to a reviewer.',
    mockup: <FindingsMockup />,
  },
}
const TAB_COLORS = ['#ffffff', '#9a9a9a', '#5c5c5c']

/**
 * Healthcare & life sciences landing on the scale.com/enterprise/healthcare layout (template clone:
 * enterprise-healthcare, components/scale-clone/enterprise-healthcare/). Slice order and motion follow the
 * clone's HealthcarePage; each section is a Vahue dark copy of the clone section:
 *   hero FullBleedMedia (startPercentage 0, systems marquee) -> TabbedPanel (the industry's workflows with
 *   Vahue mock UIs) -> metrics testimonial (verified Docplanner case) -> SgpStack (Audit / Pilot / Operate
 *   over the control-layer illustration) -> BlogPreview (related Vahue pages) -> TextImageSplit (control
 *   features) -> pre-footer FullBleedMedia (startPercentage 10, narrow).
 * Not shown from the industry copy: the outcome figures (no verified Vahue case behind them), micro-job
 * outcomes, triggers/emotions/pains, point B, barriers and competitors.
 */
export default function IndustryPage({ content, workflows }: { content: SegmentContent; workflows: string[] }) {
  const tabs: TabItem[] = workflows
    .filter((name) => TABS[name])
    .map((name, i) => {
      const w = workflowFor(name)
      return {
        label: name,
        color: TAB_COLORS[i % TAB_COLORS.length],
        title: TABS[name].title,
        body: TABS[name].body,
        cta: w ? { label: `See ${w.label.toLowerCase()}`, href: `/automations/${w.slug}/` } : undefined,
        mockup: TABS[name].mockup,
      }
    })

  const docplanner = getCaseStudy('docplanner-voicebot-recovery')
  const roadmap = getCaseStudy('clinical-ai-product-roadmap')
  const consent = content.ahas[1]

  return (
    <div className="overflow-x-hidden bg-bg font-display text-white">
      <SmoothScroll />

      {/* pageHero: FullBleedMedia startPercentage 0. The clone's pt-24 sits under Scale's overlay header;
          Vahue's sticky navbar takes space in the flow, so the top padding drops to pt-4 (as on /industries/insurance). */}
      <div className="pb-10 pt-4">
        <FullBleedMedia
          as="h1"
          startPercentage={0}
          media={<HeroVisual />}
          headline={content.title}
          body={content.oneLiner}
          primary={CTA}
          marquee={{ label: 'Works inside', names: SYSTEMS }}
        />
      </div>

      <TabbedPanel heading="Where we start in healthcare and life sciences" items={tabs} />

      {docplanner ? (
        <CaseSpotlight
          color="#121212"
          contrast="#ffffff"
          summary={docplanner.summary}
          metricValue="~20%"
          metricLabel="booking conversion, up from roughly 10%"
          client={docplanner.client}
          tag={`${docplanner.disclosure} · Scheduling voicebot`}
          icon={<MdSchedule size="55%" />}
          link={{ label: 'Read the case', href: `/case-studies/${docplanner.slug}/` }}
        />
      ) : null}

      <SgpStack
        heading="Audit, pilot, then we run it for you"
        media={<ControlIllustration />}
        cards={PHASES.map((p) => ({ title: p.name, meta: p.length, body: p.body }))}
      />

      <ResourceTiles
        heading="Read more"
        tiles={[
          ...(roadmap ? [{ title: roadmap.title, category: 'Case study', href: `/case-studies/${roadmap.slug}/` }] : []),
          { title: 'Workflow audit: one workflow and its baseline, mapped in two weeks', category: 'Workflow audit', href: '/strategy/' },
          { title: 'Security: where agents run and what they can see', category: 'Security', href: '/security/' },
        ]}
      />

      <ControlSplit headline={consent?.title ?? 'Built for patient data and audit'} body={consent?.body ?? ''} items={CONTROL_FEATURES} />

      <div className="h-8 w-full bg-bg" />
      <FullBleedMedia
        startPercentage={10}
        narrow
        media={<PrefooterVisual phases={PHASES} />}
        headline="Start with one healthcare workflow."
        primary={CTA}
      />
      <div className="h-8 w-full bg-bg" />
    </div>
  )
}
