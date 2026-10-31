import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/enterprise-insurance/FullBleedMedia'
import LogoCarousel from '@/components/scale-clone/enterprise-insurance/LogoCarousel'
import VideoFeatures from '@/components/scale-clone/enterprise-insurance/VideoFeatures'
import {
  GlassButton,
  IconFeatures,
  SectionHeader,
  Slice,
  icons,
} from '@/components/scale-clone/enterprise-insurance/Sections'

export const metadata: Metadata = {
  title: 'Insurance | Scale clone',
}

const ASSET = '/scale-clone/enterprise-insurance'

// TODO: Vahue copy (all cards)
const problems = [
  {
    icon: icons.layers,
    title: 'Placeholder Problem One',
    body: 'Placeholder sentence about key details locked inside files and reports that no system can read or analyze yet.',
  },
  {
    icon: icons.manageSearch,
    title: 'Placeholder Problem Two',
    body: 'Placeholder sentence about how only a sliver of cases gets reviewed, so large recoverable sums slip past every quarter.',
  },
  {
    icon: icons.lock,
    title: 'Placeholder Problem Three',
    body: 'Placeholder sentence about know-how that leaves with senior staff and the gaps that follow.',
  },
]

// TODO: Vahue copy (all cards)
const solutions = [
  {
    icon: icons.assignment,
    title: 'Placeholder Solution Title Number One',
    body: 'Placeholder sentence about turning messy reports and calls into clean structured records.',
  },
  {
    icon: icons.psychology,
    title: 'Placeholder Pattern\nSolution Two',
    body: 'Placeholder sentence about reviewing every case with a system that spots costly patterns across thousands of files at once.',
  },
  {
    icon: icons.lightbulb,
    title: 'Placeholder Knowledge & Scaling Three',
    body: 'Placeholder sentence about capturing how the best reviewers decide and sharing that judgment with every team member.',
  },
]

// TODO: Vahue copy
const features = [
  {
    image: `${ASSET}/feature-claims.webp`,
    title: 'Placeholder Feature Video Number One',
    body: 'Placeholder sentence about moving faster with a system that works next to your team.',
  },
  {
    image: `${ASSET}/feature-retention.webp`,
    title: 'Placeholder Feature Video Number Two Title',
    body: 'Placeholder sentence about spotting problems early with agents that predict issues and act ahead of time, not after the fact.',
  },
]

// Structural clone of scale.com/enterprise/insurance. Spec: reference-snapshots/scale-clone/enterprise-insurance.md
export default function EnterpriseInsurancePage() {
  return (
    <main className="overflow-x-hidden bg-white font-display text-black">
      {/* PageHeader (non-compact): pb-10 pt-24, FullBleedMedia with startPercentage 0 */}
      <div className="pb-10 pt-24">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/hero.webp`}
          imageBg="#193A29"
          priority
          startPercentage={0}
          headline="Placeholder Headline About Turning Files Into Insight"
          body="Placeholder sentence about deploying agents that turn scattered records, reports and documents into clear answers that stop losses, cut costs and speed up every decision across the business."
          primary={{ label: 'Placeholder CTA', href: '#' }}
        />
      </div>

      <Slice className="py-8">
        <LogoCarousel />
      </Slice>

      <Slice>
        <SectionHeader
          title="Placeholder Title About Three Costly Blind Spots"
          sub="Placeholder line about the challenges every team faces:"
        />
        <IconFeatures items={problems} />
      </Slice>

      <Slice>
        <SectionHeader
          title="Placeholder Title About Turning Chaos Into an Advantage"
          sub="Placeholder sentence about solving the three biggest challenges in daily operations with purpose-built tools that turn files into data, catch hidden waste and keep hard-won expertise."
        >
          {/* TODO: Vahue copy */}
          <GlassButton href="#">Placeholder all items</GlassButton>
        </SectionHeader>
        <IconFeatures items={solutions} />
      </Slice>

      <Slice>
        <SectionHeader title="Placeholder Title Here" sub="Placeholder line about our agent support" />
        <VideoFeatures items={features} />
      </Slice>

      {/* Pre-footer: pt-16 pb-8, FullBleedMedia default startPercentage 10 */}
      <div className="pb-8 pt-16">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          backdrop="#fff"
          image={`${ASSET}/prefooter.jpg`}
          imageBg="#193A29"
          headline="The placeholder closing line starts here"
          primary={{ label: 'Placeholder CTA', href: '#' }}
        />
      </div>
    </main>
  )
}
