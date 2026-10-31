import type { Metadata } from 'next'
import { POSITIONING } from '@/lib/automation-content'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import FullBleedMedia from '@/components/automation/hub/FullBleedMedia'
import { FeaturedCase, IntegrationStrip, WhoItsFor } from '@/components/automation/hub/StaticSections'
import HowItWorks from '@/components/automation/hub/HowItWorks'
import PhaseLoop from '@/components/automation/hub/PhaseLoop'
import WorkflowGrid from '@/components/automation/hub/WorkflowGrid'
import Results from '@/components/automation/hub/Results'
import Guardrails from '@/components/automation/hub/Guardrails'

const PAGE_URL = 'https://vahue.ai/automations/'
const DESCRIPTION = `${POSITIONING.promise} Audit, pilot, then we run it.`

export const metadata: Metadata = {
  title: 'AI workflow automation',
  description: DESCRIPTION,
  openGraph: { title: 'AI workflow automation | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Automation hub on the layout of the data-engine clone (app/scale-clone/data-engine, spec in
// reference-snapshots/scale-clone/data-engine.md). Clone's light surfaces inverted to Vahue dark.
export default function Automations() {
  return (
    <div className="overflow-x-hidden bg-bg font-display text-white">
      <SmoothScroll />
      <div className="pb-10 pt-24">
        <FullBleedMedia
          level="h1"
          backdrop="#020202"
          image="/img/work2.jpg"
          priority
          headline={POSITIONING.line}
          body={POSITIONING.promise}
          primary={{ label: 'Book a workflow audit', href: '/contact/' }}
        />
      </div>
      <IntegrationStrip />
      <WhoItsFor />
      <FeaturedCase />
      <div className="w-full bg-[#0a0a0b]">
        <HowItWorks />
        <PhaseLoop />
        <WorkflowGrid />
        <Results />
        <Guardrails />
        <div className="pb-14 md:pb-20">
          <FullBleedMedia
            backdrop="#0a0a0b"
            image="/img/careers/office-3.jpg"
            imageBg="#111"
            headline="Start with one workflow and a two-week audit"
            body="We map it, record the baseline and agree the target before anything is built."
            primary={{ label: 'Book a workflow audit', href: '/contact/' }}
            secondary={{ label: 'See case studies', href: '/case-studies/' }}
          />
        </div>
      </div>
    </div>
  )
}
