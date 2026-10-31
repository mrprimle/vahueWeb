import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/data-engine/FullBleedMedia'
import { BestInBusiness, CaseStudy, LogoStrip } from '@/components/scale-clone/data-engine/StaticSections'
import BuildAi from '@/components/scale-clone/data-engine/BuildAi'
import DataEngineLoop from '@/components/scale-clone/data-engine/DataEngineLoop'
import AnnotationTypes from '@/components/scale-clone/data-engine/AnnotationTypes'
import Resources from '@/components/scale-clone/data-engine/Resources'
import Testimonial from '@/components/scale-clone/data-engine/Testimonial'

export const metadata: Metadata = {
  title: 'Data Engine | Scale clone',
}

const ASSET = '/scale-clone/data-engine'

// Structural clone of scale.com/data-engine. Spec: reference-snapshots/scale-clone/data-engine.md
export default function DataEnginePage() {
  return (
    <main className="overflow-x-hidden bg-white font-display text-black">
      <div className="pb-10 pt-24">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/hero.webp`}
          priority
          headline="Signal Engine"
          body="Gather, sort, and label inputs. Train models and review them. Again."
          primary={{ label: 'Book a Call', href: '#' }}
        />
      </div>
      <LogoStrip />
      <BestInBusiness />
      <CaseStudy />
      <div className="w-full bg-[#f2f2f2]">
        <BuildAi />
        <DataEngineLoop />
        <AnnotationTypes />
        <Resources />
        <Testimonial />
        <div className="pb-14 md:pb-20">
          {/* TODO: Vahue copy */}
          <FullBleedMedia
            backdrop="#f9fafb"
            image={`${ASSET}/prefooter.jpg`}
            imageBg="#193A29"
            headline="Where your field's next chapter begins"
            primary={{ label: 'Book a Call', href: '#' }}
            secondary={{ label: 'Start Now', href: '#' }}
          />
        </div>
      </div>
    </main>
  )
}
