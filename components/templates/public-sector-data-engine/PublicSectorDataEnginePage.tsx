import Demos from './Demos'
import FullBleedMedia from './FullBleedMedia'
import Resources from './Resources'
import { LogoWall, ProductOverview, WhyScale } from './StaticSections'
import Testimonial from './Testimonial'
import type { PublicSectorDataEngineContent } from './content'

// scale.com/public-sector-data-engine layout, driven entirely by `content`.
// Spec: reference-snapshots/scale-clone/public-sector-data-engine.md
export default function PublicSectorDataEnginePage({ content }: { content: PublicSectorDataEngineContent }) {
  const { hero, logos, overview, why, testimonial, demos, resources, prefooter } = content
  return (
    <main className="font-display">
      <FullBleedMedia
        image={hero.image}
        title={hero.title}
        body={hero.body}
        cta={hero.cta}
        backdrop="bg-white"
        wrapperClassName="pb-10 pt-24"
        priority
      />
      <LogoWall content={logos} />
      <ProductOverview content={overview} />
      <WhyScale content={why} />
      <Testimonial content={testimonial} />
      <Demos content={demos} />
      <Resources content={resources} />
      <FullBleedMedia
        image={prefooter.image}
        title={prefooter.title}
        cta={prefooter.cta}
        backdrop="bg-gray-50"
        wrapperClassName="mt-16 pb-8"
      />
    </main>
  )
}
