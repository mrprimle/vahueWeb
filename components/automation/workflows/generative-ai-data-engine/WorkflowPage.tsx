import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { Workflow } from '@/lib/automation-content'
import { caseStudies, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import ToolStrip from './ToolStrip'
import CaseHighlight from './CaseHighlight'
import CaseSlider from './CaseSlider'
import Demos from './Demos'
import { ExpertisePanel, Features, Lifecycle, Lines, OverviewSplit, SectionHeader, Slice } from './Sections'
import { BACK_OFFICE as C } from './content'

const pick = (slugs: string[]) => slugs.map((s) => caseStudies.find((c) => c.slug === s)).filter((c): c is CaseStudy => Boolean(c))

/**
 * /automations/back-office-sync on the scale.com/generative-ai-data-engine layout, strict parity with the clone
 * (app/scale-clone/generative-ai-data-engine/page.tsx): the same 11 sections in the same order, in the clone's own
 * colours. hero -> logo strip -> product overview -> expertise panel -> testimonial -> overview split -> lifecycle
 * -> key features -> demos -> resources -> pre-footer. Copy and slot mapping: ./content.ts.
 */
export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const [featured] = pick([C.featured])
  const resources = pick(C.resources.cases)

  return (
    <div className="overflow-x-hidden bg-white font-display tracking-[-0.01em] text-black">
      <SmoothScroll />
      <FullBleedMedia
        as="h1"
        image={C.hero.image}
        headline={C.hero.headline}
        body={C.hero.body}
        cta={C.cta}
        startPercentage={0}
        wrapperClassName="pb-10 pt-24"
      />
      <ToolStrip tools={workflow.tools} />
      <Slice>
        <SectionHeader eyebrow={C.overview.eyebrow} title={C.overview.title} lead={C.overview.lead} />
      </Slice>
      <ExpertisePanel data={C.expertise} />
      {featured ? <CaseHighlight caseStudy={featured} /> : null}
      <OverviewSplit statement={C.overviewSplit.statement} phases={C.overviewSplit.phases} />
      <Lifecycle data={C.lifecycle} />
      <Features eyebrow={C.features.eyebrow} title={C.features.title} lead={C.features.lead} items={C.features.items} />
      <Slice>
        <SectionHeader eyebrow={C.demos.eyebrow} title={C.demos.title} />
        <Demos titles={C.demos.items} />
      </Slice>
      <Slice>
        <SectionHeader eyebrow={C.resources.eyebrow} title={C.resources.title} lead={<Lines lines={C.resources.lead} />} />
        <CaseSlider cases={resources} />
      </Slice>
      <FullBleedMedia
        image={C.prefooter.image}
        headline={C.prefooter.headline}
        cta={C.cta}
        startPercentage={10}
        wrapperClassName="pb-8 pt-16"
      />
    </div>
  )
}
