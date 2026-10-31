import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/rlenvironments/FullBleedMedia'
import FeatureCards from '@/components/scale-clone/rlenvironments/FeatureCards'
import { Capabilities, Overview } from '@/components/scale-clone/rlenvironments/StaticSections'
import EnvironmentTypes from '@/components/scale-clone/rlenvironments/EnvironmentTypes'
import { ASSET, hero, prefooter } from '@/components/scale-clone/rlenvironments/content'

export const metadata: Metadata = {
  title: 'RL Environments (Scale clone)',
}

// Structural clone of scale.com/rlenvironments. Spec: reference-snapshots/scale-clone/rlenvironments.md
export default function RlEnvironmentsPage() {
  return (
    <main className="overflow-x-clip bg-white font-display text-black">
      <FullBleedMedia
        image={`${ASSET}/hero.webp`}
        video={`${ASSET}/hero.mp4`}
        title={hero.title}
        body={hero.body}
        cta={hero.cta}
        startPercentage={0}
        wrapperClassName="pb-10 pt-12 md:pt-24"
        priority
      />
      <FeatureCards />
      <Overview />
      <Capabilities />
      <EnvironmentTypes />
      <FullBleedMedia
        image={`${ASSET}/prefooter.jpg`}
        title={prefooter.title}
        cta={prefooter.cta}
        startPercentage={10}
        wrapperClassName="pb-8"
      />
    </main>
  )
}
