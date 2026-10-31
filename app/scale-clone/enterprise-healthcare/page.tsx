import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/enterprise-healthcare/FullBleedMedia'
import TabbedPanel from '@/components/scale-clone/enterprise-healthcare/TabbedPanel'
import Testimonial from '@/components/scale-clone/enterprise-healthcare/Testimonial'
import SgpStack from '@/components/scale-clone/enterprise-healthcare/SgpStack'
import BlogPreview from '@/components/scale-clone/enterprise-healthcare/BlogPreview'
import TrustSplit from '@/components/scale-clone/enterprise-healthcare/TrustSplit'

export const metadata: Metadata = {
  title: 'Healthcare | Scale clone',
}

const ASSET = '/scale-clone/enterprise-healthcare'

// Hero "Trusted by" marquee: Scale's logo slot boxes (width x logo height, 35px row), rendered as placeholders.
const LOGO_SLOTS = [
  { w: 70, h: 16 },
  { w: 47, h: 28 },
  { w: 48, h: 28 },
  { w: 70, h: 21 },
  { w: 70, h: 13 },
  { w: 26, h: 28 },
  { w: 70, h: 19 },
  { w: 57, h: 28 },
]

// Structural clone of scale.com/enterprise/healthcare. Spec: reference-snapshots/scale-clone/enterprise-healthcare.md
export default function EnterpriseHealthcarePage() {
  return (
    <main className="overflow-x-hidden bg-white font-display text-black">
      <div className="pb-10 pt-24">
        {/* TODO: Vahue copy */}
        <FullBleedMedia
          image={`${ASSET}/hero.webp`}
          imageBg="#537B95"
          priority
          startPercentage={0}
          headline="Reliable Placeholder for the Most Critical Decisions"
          body="Placeholder sentence about tools that people can trust, embedded inside your workflows and evaluated continuously so they stay accountable."
          logos={{ label: 'Trusted by', widths: LOGO_SLOTS }}
        />
      </div>
      <TabbedPanel />
      <Testimonial />
      <SgpStack />
      <BlogPreview />
      <TrustSplit />
      <div className="h-8 w-full bg-white" />
      {/* TODO: Vahue copy */}
      <FullBleedMedia
        image={`${ASSET}/prefooter.webp`}
        imageBg="#6A7C96"
        startPercentage={10}
        narrow
        headline="Placeholder future of the field starts here"
        primary={{ label: 'Speak with an expert', href: '#' }}
      />
      <div className="h-8 w-full bg-white" />
    </main>
  )
}
