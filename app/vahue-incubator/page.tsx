import type { Metadata } from 'next'
import IncubatorHero from '@/components/incubator/IncubatorHero'
import CommunityFor from '@/components/incubator/CommunityFor'
import NeuralChange from '@/components/incubator/NeuralChange'
import WhatYouGet from '@/components/incubator/WhatYouGet'
import RecognizeYourself from '@/components/incubator/RecognizeYourself'
import WhatChanges from '@/components/incubator/WhatChanges'
import HowItWorks from '@/components/incubator/HowItWorks'
import WhyUsNot from '@/components/incubator/WhyUsNot'
import Founder from '@/components/incubator/Founder'
import Pricing from '@/components/incubator/Pricing'
import LaunchSoon from '@/components/incubator/LaunchSoon'
import IncubatorFAQ from '@/components/incubator/IncubatorFAQ'

export const metadata: Metadata = {
  title: 'Vahue Incubator | Vahue',
  description:
    'A founders community to create AI products 10 times faster — AI CPO AURA, weekly events with practitioners, and a like-minded chat.',
}

export default function Page() {
  return (
    <>
      <IncubatorHero />
      <CommunityFor />
      <NeuralChange />
      <WhatYouGet />
      <RecognizeYourself />
      <WhatChanges />
      <HowItWorks />
      <WhyUsNot />
      <Founder />
      <Pricing />
      <LaunchSoon />
      <IncubatorFAQ />
    </>
  )
}
