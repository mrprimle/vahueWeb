import Hero from '@/components/Hero'
import PainRecognition from '@/components/PainRecognition'
import ServicesSection from '@/components/ServicesSection'
import AwardsSlider from '@/components/engineering/AwardsSlider'
import WhatSetsUsApart from '@/components/WhatSetsUsApart'
import EngagementModels from '@/components/shared/EngagementModels'
import Press from '@/components/engineering/Press'
import SubpageIndustries from '@/components/shared/SubpageIndustries'
import CaseStudies from '@/components/CaseStudies'
import WhoWeAre from '@/components/WhoWeAre'
import FounderCTA from '@/components/engineering/FounderCTA'
import Testimonials from '@/components/engineering/Testimonials'
import BlogSection from '@/components/engineering/BlogSection'
import ContactContainer from '@/components/engineering/ContactContainer'

export default function Home() {
  return (
    <>
      <Hero />
      <PainRecognition />
      <ServicesSection />
      <AwardsSlider />
      <WhatSetsUsApart />
      <EngagementModels />
      <Press />
      <SubpageIndustries />
      <CaseStudies />
      <WhoWeAre />
      <FounderCTA />
      <Testimonials />
      <BlogSection />
      <ContactContainer />
    </>
  )
}
