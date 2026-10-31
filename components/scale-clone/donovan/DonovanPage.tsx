import FullBleedMedia from './FullBleedMedia'
import LogoStrip from './LogoStrip'
import Showcase from './Showcase'
import { FeatureGrid, Foundation, ProductOverview } from './Sections'
import { ASSET, hero, overmatch, prefooter, trusted } from './content'

// Body of scale.com/donovan, top to bottom. Spec: reference-snapshots/scale-clone/donovan.md
export default function DonovanPage() {
  return (
    <main className="bg-white font-display tracking-[-0.01em] text-black">
      <div className="overflow-x-hidden">
        {/* 1. Full-bleed hero (ClipScrollSection) */}
        <div className="pb-10 pt-24">
          <FullBleedMedia
            image={`${ASSET}/hero.webp`}
            imageBg="#193A29"
            headline={hero.headline}
            body={hero.body}
            primary={hero.primary}
            backdrop="#fff"
            startPercentage={0}
            priority
          />
        </div>

        {/* 2. Customer logos */}
        <LogoStrip />

        {/* 3. Product overview: 3 product-UI cards */}
        <ProductOverview />

        {/* 4. Foundation cards (gray-50 band) */}
        <Foundation />

        {/* 5. Tabbed showcase */}
        <Showcase />

        {/* 6. Icon feature grid */}
        <FeatureGrid {...overmatch} sectionClassName="py-12" />

        {/* 7. Supported environments */}
        <FeatureGrid {...trusted} />

        {/* 8. Pre-footer CTA */}
        <div className="pb-8">
          <FullBleedMedia
            image={`${ASSET}/prefooter.jpg`}
            imageBg="#193A29"
            headline={prefooter.headline}
            primary={prefooter.primary}
            secondary={prefooter.secondary}
            backdrop="#fff"
            startPercentage={10}
          />
        </div>
      </div>
    </main>
  )
}
