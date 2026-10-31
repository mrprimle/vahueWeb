import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import FullBleedMedia from '@/components/strategy-audit/FullBleedMedia'
import { Challenge, HowItWorks, Solution } from '@/components/strategy-audit/Sections'
import { hero, prefooter } from '@/components/strategy-audit/content'

const PAGE_URL = 'https://vahue.ai/strategy/'
const TITLE = 'Workflow audit'
const DESCRIPTION =
  'A two-week workflow audit: we map one high-volume workflow end to end, record the baseline (volume, minutes per item, error rate and cost) and agree the target and stop point before a pilot starts.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Vahue`, description: DESCRIPTION, url: PAGE_URL },
  alternates: {
    canonical: PAGE_URL,
    types: {
      'text/markdown': '/llms/ai-strategy.md',
    },
  },
}

// Workflow audit page in strict parity with the evaluation-enterprise clone
// (app/scale-clone/evaluation-enterprise, spec reference-snapshots/scale-clone/evaluation-enterprise.md):
// the same five sections, counts and Scale's own colours (white page, #f9fafb pre-footer backdrop, #193a29 media
// fill); Vahue fonts, logo, photography and copy (components/strategy-audit/content.ts).
export default function Strategy() {
  return (
    <div className="overflow-x-clip bg-white font-display text-black">
      <SmoothScroll />
      <FullBleedMedia
        level="h1"
        image="/img/careers/office-4.jpg"
        title={hero.title}
        body={hero.body}
        primary={hero.primary}
        secondary={hero.secondary}
        startPercentage={0}
        backdropClassName="bg-white"
        // Vahue's navbar sits in the flow (light on this route, see Navbar.tsx), so the clone's pt-24 gap is reduced
        wrapperClassName="pb-10 pt-6 md:pt-10"
        priority
      />
      <Challenge />
      <Solution />
      <HowItWorks />
      <FullBleedMedia
        image="/img/careers/office-2.jpg"
        title={prefooter.title}
        primary={prefooter.primary}
        secondary={prefooter.secondary}
        startPercentage={10}
        backdropClassName="bg-[#f9fafb]"
        wrapperClassName="pb-8 pt-16"
      />
    </div>
  )
}
