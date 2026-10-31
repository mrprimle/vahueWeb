import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/automotive/FullBleedMedia'
import { Foundation, LogoStrip, Overview, SectionHeader, WhyUs } from '@/components/scale-clone/automotive/Sections'
import SupportedData from '@/components/scale-clone/automotive/SupportedData'
import Phases from '@/components/scale-clone/automotive/Phases'
import Resources from '@/components/scale-clone/automotive/Resources'

export const metadata: Metadata = {
  title: 'Automotive | Scale clone',
}

const ASSET = '/scale-clone/automotive'

// Structural clone of scale.com/automotive. Spec: reference-snapshots/scale-clone/automotive.md
export default function AutomotivePage() {
  return (
    <main className="overflow-x-hidden bg-white font-display text-black">
      <div className="pb-10 pt-24">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/hero.webp`}
          imageBg="#193A29"
          priority
          startPercentage={0}
          headline="Road Vehicle Signal Engine"
          body="Unlocking self-driving with first-rate inputs."
          primary={{ label: 'Book a Call', href: '#' }}
        />
      </div>
      <LogoStrip />
      <Overview />
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-8">
        {/* TODO: Vahue copy */}
        <SectionHeader over="Self-driving stack" title="How to Build Self-Driving" />
        <SupportedData />
      </section>
      <Phases />
      <WhyUs />
      <Resources />
      <Foundation />
      <div className="mt-16 pb-8">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/prefooter.jpg`}
          imageBg="#193A29"
          headline="Where your field's next chapter begins"
          primary={{ label: 'Book a Call', href: '#' }}
          secondary={{ label: 'Start Now', href: '#' }}
        />
      </div>
    </main>
  )
}
