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

export default function Home() {
  return (
    <>
      {/* 1. Scroll hero (pinned stages) + stat card + 2. Clients strip */}
      <SmoothScroll />
      <ScrollHero />
      <ScrollQuote />
      <ClientsStrip />

      {/* 3. Problems — AJTBD triggers/emotions/pains + our answer */}
      <AJTBDProblems />

      {/* 4. Awards line */}
      <AwardsSlider />

      {/* 5. Engagement models — no linking */}
      <EngagementModels />

      {/* 6. Magazine line */}
      <Press />

      {/* 7. Industries/segments grid with AJTBD landing links */}
      <SegmentsGrid />

      {/* 9. Founder + team */}
      <FounderAndTeam />

      {/* 10. Verified delivery outcomes */}
      <DeliveryOutcomes />

      {/* 11. Blog */}
      <BlogSection />

      {/* 12. Contact with dynamic values + footer (from layout) */}
      <ContactDynamic />
    </>
  )
}
