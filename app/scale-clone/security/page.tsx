import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/security/FullBleedMedia'
import CardGrid from '@/components/scale-clone/security/CardGrid'
import ScrollReveal from '@/components/scale-clone/security/ScrollReveal'
import {
  Compliance,
  Disclosure,
  MdLock,
  MdPublic,
  MdSecurity,
  Promos,
  SectionHeader,
} from '@/components/scale-clone/security/Sections'

export const metadata: Metadata = {
  title: 'Security | Scale clone',
}

const ASSET = '/scale-clone/security'

// TODO: Vahue copy (all three cards)
const cards = [
  {
    icon: <MdLock color="#79648C" />,
    title: 'Placeholder card title one.',
    body: 'Placeholder description about safeguarding the data and integrity of critical customer work, and a program designed to protect customer assets and proactively reduce the frequency of negative events across the platform.',
  },
  {
    icon: <MdSecurity color="#A8927C" />,
    title: 'Placeholder title two.',
    body: 'Placeholder description about building trust with customers through a clear commitment to protecting their data.',
  },
  {
    icon: <MdPublic color="#839CB2" />,
    title: 'Placeholder card title three.',
    body: 'Placeholder description about investing in the security program to meet the needs of a growing customer base, so we actively partner with government, industry and the research community to raise standards for secure systems.',
  },
]

// Structural clone of scale.com/security. Spec: reference-snapshots/scale-clone/security.md
export default function SecurityPage() {
  return (
    <main className="overflow-x-hidden bg-white font-display text-black">
      <div className="pb-10 pt-12 md:pt-24">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/hero.webp`}
          imageBg="#193A29"
          priority
          startPercentage={0}
          headline="Placeholder Security"
          body="Placeholder sentence on the trust customers place in us for their most important applications. A second placeholder line on building protection into every level."
        />
      </div>
      <section className="bg-white py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <SectionHeader over="Placeholder" title="Placeholder section title here" className="!mb-10 !mt-0" />
          <CardGrid cards={cards} />
        </div>
      </section>
      <ScrollReveal backdrop="#f2f2f2" panel="#000">
        <Compliance />
      </ScrollReveal>
      <Promos />
      <Disclosure />
      <div className="pb-8">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/prefooter.jpg`}
          imageBg="#193A29"
          headline="Placeholder headline about joining the team?"
          primary={{ label: 'Placeholder CTA', href: '#' }}
        />
      </div>
    </main>
  )
}
