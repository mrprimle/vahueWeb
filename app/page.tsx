import Hero from '@/components/Hero'
import ClientsStrip from '@/components/main/ClientsStrip'
import AJTBDProblems from '@/components/main/AJTBDProblems'
import AwardsSlider from '@/components/engineering/AwardsSlider'
import SegmentsGrid from '@/components/main/SegmentsGrid'
import Press from '@/components/engineering/Press'
import EngagementModels from '@/components/shared/EngagementModels'
import CaseStudies from '@/components/CaseStudies'
import FounderAndTeam from '@/components/main/FounderAndTeam'
import Testimonials from '@/components/engineering/Testimonials'
import BlogSection from '@/components/engineering/BlogSection'
import ContactDynamic from '@/components/main/ContactDynamic'

export default function Home() {
  return (
    <>
      {/* 1. Hero + 2. Clients strip */}
      <Hero />
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

      {/* 9. Case studies */}
      <CaseStudies />

      {/* 10. Founder + team */}
      <FounderAndTeam />

      {/* 11. Testimonials */}
      <Testimonials />

      {/* 12. Blog */}
      <BlogSection />

      {/* 13. Contact with dynamic values + 14. Footer (from layout) */}
      <ContactDynamic />
    </>
  )
}
