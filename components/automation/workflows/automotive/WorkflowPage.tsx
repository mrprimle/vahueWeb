import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import type { Workflow } from '@/lib/automation-content'
import { caseStudies, getCaseStudy, type CaseStudy } from '@/lib/case-studies'
import FullBleedMedia from './FullBleedMedia'
import SupportedData from './SupportedData'
import Phases from './Phases'
import CaseSlider from './CaseSlider'
import { CONTAINER, Foundation, LogoStrip, Overview, SectionHeader, WhyUs } from './Sections'
import { SCORING as C } from './content'

/**
 * /automations/scoring-decisions on the scale.com/automotive layout, strict parity with the clone
 * (scale.com/automotive): the same 9 sections in the same order, in the clone's own colours.
 * hero -> 2-logo cloud -> overview checklist + loop -> supported data (5 tabs) -> phases (3) -> why (3)
 * -> resources slider (2) -> foundation split (one case) -> pre-footer. Copy and slot mapping: ./content.ts.
 */
export default function WorkflowPage({ workflow: _workflow }: { workflow: Workflow }) {
  const resources = C.resources.cases.map((s) => caseStudies.find((c) => c.slug === s)).filter((c): c is CaseStudy => Boolean(c))
  const featured = getCaseStudy(C.featured.slug)

  return (
    <div className="overflow-x-hidden bg-white font-display text-black">
      <SmoothScroll />
      <div className="pb-10 pt-24">
        <FullBleedMedia
          as="h1"
          backdrop="#fff"
          image={C.hero.image}
          imageBg="#193A29"
          priority
          startPercentage={0}
          headline={C.hero.headline}
          body={C.hero.body}
          primary={C.hero.primary}
        />
      </div>
      <LogoStrip tools={C.tools} />
      <Overview {...C.overview} />
      <section className={`${CONTAINER} py-16`}>
        <SectionHeader over={C.supported.over} title={C.supported.title} />
        <SupportedData heading={C.supported.heading} sub={C.supported.sub} body={C.supported.body} cta={C.supported.cta} tabs={C.supported.tabs} />
      </section>
      <Phases {...C.phases} />
      <WhyUs {...C.why} />
      <CaseSlider over={C.resources.over} title={C.resources.title} cases={resources} />
      {featured ? <Foundation title={C.featured.title} label={C.featured.label} link={C.featured.link} caseStudy={featured} /> : null}
      <div className="mt-16 pb-8">
        <FullBleedMedia
          backdrop="#fff"
          image={C.prefooter.image}
          imageBg="#193A29"
          headline={C.prefooter.headline}
          primary={C.prefooter.primary}
          secondary={C.prefooter.secondary}
        />
      </div>
    </div>
  )
}
