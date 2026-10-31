import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/public-sector-data-engine/FullBleedMedia'
import { LogoWall, ProductOverview, WhyScale } from '@/components/scale-clone/public-sector-data-engine/StaticSections'
import Testimonial from '@/components/scale-clone/public-sector-data-engine/Testimonial'
import Demos from '@/components/scale-clone/public-sector-data-engine/Demos'
import Resources from '@/components/scale-clone/public-sector-data-engine/Resources'
import { ASSET, hero, prefooter } from '@/components/scale-clone/public-sector-data-engine/content'

export const metadata: Metadata = {
  title: 'Public Sector Data Engine (Scale clone)',
}

// Structural clone of scale.com/public-sector-data-engine. Spec: reference-snapshots/scale-clone/public-sector-data-engine.md
export default function PublicSectorDataEnginePage() {
  return (
    <main className="font-display">
      <FullBleedMedia
        image={`${ASSET}/hero.webp`}
        title={hero.title}
        body={hero.body}
        cta={hero.cta}
        backdrop="bg-white"
        wrapperClassName="pb-10 pt-24"
        priority
      />
      <LogoWall />
      <ProductOverview />
      <WhyScale />
      <Testimonial />
      <Demos />
      <Resources />
      <FullBleedMedia
        image={`${ASSET}/prefooter.jpg`}
        title={prefooter.title}
        cta={prefooter.cta}
        backdrop="bg-gray-50"
        wrapperClassName="mt-16 pb-8"
      />
    </main>
  )
}
