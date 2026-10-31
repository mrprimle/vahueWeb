import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/generative-ai-data-engine/FullBleedMedia'
import LogoStrip from '@/components/scale-clone/generative-ai-data-engine/LogoStrip'
import Testimonial from '@/components/scale-clone/generative-ai-data-engine/Testimonial'
import Demos from '@/components/scale-clone/generative-ai-data-engine/Demos'
import Resources from '@/components/scale-clone/generative-ai-data-engine/Resources'
import {
  ExpertiseImage,
  Features,
  Lifecycle,
  OverviewSplit,
  SectionHeader,
  Slice,
} from '@/components/scale-clone/generative-ai-data-engine/Sections'

export const metadata: Metadata = {
  title: 'Generative AI Data Engine | Scale clone',
}

const BASE = '/scale-clone/generative-ai-data-engine'

// Structural clone of https://scale.com/generative-ai-data-engine. Spec:
// reference-snapshots/scale-clone/generative-ai-data-engine.md
export default function GenerativeAiDataEnginePage() {
  return (
    <main className="overflow-x-hidden font-display tracking-[-0.01em]">
      {/* TODO: Vahue copy */}
      <FullBleedMedia
        image={`${BASE}/hero.webp`}
        headline="Generative Data Platform"
        body="Fuelling the next generation of AI."
        cta={{ href: '/scale-clone/', label: 'Book a Demo' }}
        startPercentage={0}
        wrapperClassName="pb-10 pt-24"
      />
      <LogoStrip />
      <Slice>
        {/* TODO: Vahue copy */}
        <SectionHeader
          eyebrow="Product Overview"
          title="Generative Data Platform"
          lead="Builds tailored, high-grade datasets quickly, curated by vetted domain experts to train the most capable models in the world."
        />
      </Slice>
      <ExpertiseImage />
      <Testimonial />
      <OverviewSplit />
      <Lifecycle />
      <Features />
      <Slice>
        {/* TODO: Vahue copy */}
        <SectionHeader eyebrow="Demos" title="Data Platform Demos" />
        <Demos />
      </Slice>
      <Slice>
        {/* TODO: Vahue copy */}
        <SectionHeader
          eyebrow="Resources"
          title="Case Studies & Resources"
          lead={
            <>
              We have partnered with leading AI labs for years,
              <br />
              and produced more high-grade data than anyone else.
            </>
          }
        />
        <Resources />
      </Slice>
      {/* TODO: Vahue copy */}
      <FullBleedMedia
        image={`${BASE}/prefooter.jpg`}
        headline="Your industry's next chapter begins here"
        cta={{ href: '/scale-clone/', label: 'Book a Demo' }}
        startPercentage={10}
        wrapperClassName="pb-8 pt-16"
      />
    </main>
  )
}
