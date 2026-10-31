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

// Workflow audit page on the layout of the evaluation-enterprise clone
// (app/scale-clone/evaluation-enterprise, spec reference-snapshots/scale-clone/evaluation-enterprise.md).
// Clone's light surfaces inverted to Vahue dark; layout, type sizes and motion unchanged.
export default function Strategy() {
  return (
    <div className="overflow-x-clip bg-bg font-display text-white">
      <SmoothScroll />
      <FullBleedMedia
        level="h1"
        image="/img/careers/office-4.jpg"
        title={hero.title}
        body={hero.body}
        primary={hero.primary}
        secondary={hero.secondary}
        startPercentage={0}
        backdropClassName="bg-bg"
        // Vahue's navbar sits in the flow, so the clone's pt-24 gap under the header is reduced
        wrapperClassName="pb-10 pt-6 md:pt-10"
        priority
      />
      <Challenge />
      <Solution />
      <HowItWorks />
      <FullBleedMedia
        title={prefooter.title}
        primary={prefooter.primary}
        secondary={prefooter.secondary}
        startPercentage={10}
        backdropClassName="bg-bg"
        wrapperClassName="pb-8 pt-16"
      />
    </div>
  )
}
