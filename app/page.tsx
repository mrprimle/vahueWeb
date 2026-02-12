import Hero from '@/components/Hero'
import WhoWeAre from '@/components/WhoWeAre'
import WhatWeDo from '@/components/WhatWeDo'
import CaseStudies from '@/components/CaseStudies'
import Philosophy from '@/components/Philosophy'
import WhatSetsUsApart from '@/components/WhatSetsUsApart'
import DiscoverCTA from '@/components/DiscoverCTA'
import ContactCards from '@/components/ContactCards'

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <CaseStudies />
      <Philosophy />
      <WhatSetsUsApart />
      <DiscoverCTA />
      <ContactCards />
    </>
  )
}
