import type { Metadata } from 'next'
import { POSITIONING } from '@/lib/automation-content'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import FullBleedMedia from '@/components/automation/hub/FullBleedMedia'
import { FeaturedCase, IntegrationStrip, WhoItsFor } from '@/components/automation/hub/StaticSections'
import HowItWorks from '@/components/automation/hub/HowItWorks'
import PhaseLoop from '@/components/automation/hub/PhaseLoop'
import WorkflowGrid from '@/components/automation/hub/WorkflowGrid'
import Results from '@/components/automation/hub/Results'
import Testimonial from '@/components/automation/hub/Testimonial'

const PAGE_URL = 'https://vahue.ai/automations/'
const DESCRIPTION = `${POSITIONING.promise} Audit, pilot, then we run it.`

export const metadata: Metadata = {
  title: 'AI workflow automation',
  description: DESCRIPTION,
  openGraph: { title: 'AI workflow automation | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Automation hub on the layout of the data-engine clone (scale.com/data-engine, spec in
// reference-snapshots/scale-clone/data-engine.md). Strict parity: every clone section in order, in the clone's own
// (Scale) colours; Vahue fonts, logo, copy and own imagery.
export default function Automations() {
  return (
    <div className="overflow-x-hidden bg-white font-display text-black">
      <SmoothScroll />
      <div className="pb-10 pt-24">
        <FullBleedMedia
          level="h1"
          backdrop="#fff"
          image="/img/work2.jpg"
          priority
          headline="Vahue Workflow Automation"
          body="Map one workflow. Run it with agents. Measure it. Repeat."
          primary={{ label: 'Book an Audit', href: '/contact/' }}
        />
      </div>
      <IntegrationStrip />
      <WhoItsFor />
      <FeaturedCase />
      <div className="w-full bg-[#f2f2f2]">
        <HowItWorks />
        <PhaseLoop />
        <WorkflowGrid />
        <Results />
        <Testimonial />
        <div className="pb-14 md:pb-20">
          <FullBleedMedia
            backdrop="#f9fafb"
            image="/img/careers/office-3.jpg"
            imageBg="#193A29"
            headline="Your busiest workflow, run by agents"
            primary={{ label: 'Book an Audit', href: '/contact/' }}
            secondary={{ label: 'See Case Studies', href: '/case-studies/' }}
          />
        </div>
      </div>
    </div>
  )
}
