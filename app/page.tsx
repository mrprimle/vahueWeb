import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import ScrollHero from '@/components/home/scroll-hero/ScrollHero'
import ScrollQuote from '@/components/home/scroll-hero/ScrollQuote'
import ClientsStrip from '@/components/main/ClientsStrip'
import AJTBDProblems from '@/components/main/AJTBDProblems'
import AwardsSlider from '@/components/engineering/AwardsSlider'
import SegmentsGrid from '@/components/main/SegmentsGrid'
import Press from '@/components/engineering/Press'
import EngagementModels from '@/components/shared/EngagementModels'
import FounderAndTeam from '@/components/main/FounderAndTeam'
import DeliveryOutcomes from '@/components/engineering/Testimonials'
import BlogSection from '@/components/engineering/BlogSection'
import ContactDynamic from '@/components/main/ContactDynamic'
import CaseStrip from '@/components/main/CaseStrip'
import RevealScope from '@/components/motion/RevealScope'
import type { Metadata } from 'next'
import { POSITIONING, WORKFLOWS } from '@/lib/automation-content'

export const metadata: Metadata = {
  title: { absolute: `${POSITIONING.line} | Vahue` },
  description: POSITIONING.promise,
}

export default function Home() {
  return (
    <>
      {/* 1. Scroll hero (pinned stages) + stat card + 2. Clients strip */}
      <SmoothScroll />
      <ScrollHero />
      <ScrollQuote />
      {/* Everything after the hero scrolls over the pinned stat card */}
      <RevealScope className="relative z-[2] bg-bg">
        <ClientsStrip />

        {/* 3. The six workflows, each linking to /automations/<slug> */}
        <AJTBDProblems />

        {/* 4. Awards line */}
        <AwardsSlider />

        {/* 5. Audit → Pilot → Operate + controls */}
        <EngagementModels />

        {/* 6. Magazine line */}
        <Press />

        {/* 7. Industries grid with each industry's workflows */}
        <SegmentsGrid />

        {/* 8. Draggable case-study strip */}
        <CaseStrip />

        {/* 9. Founder + team */}
        <FounderAndTeam />

        {/* 10. Verified delivery outcomes */}
        <DeliveryOutcomes />

        {/* 11. Blog */}
        <BlogSection />

        {/* 12. Contact with dynamic values + footer (from layout) */}
        <ContactDynamic values={WORKFLOWS.map((w) => w.label.toLowerCase())} />
      </RevealScope>
    </>
  )
}
