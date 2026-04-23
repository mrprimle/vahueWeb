import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { insuranceContent } from '@/components/segments/content/insurance'

export const metadata: Metadata = {
  title: 'AI for Insurance | Vahue',
  description:
    'Grounded AI agents for FNOL, claims, underwriting, servicing, fraud, and subrogation — wired into Guidewire, Duck Creek, and homegrown cores.',
  openGraph: {
    title: 'AI for Insurance | Vahue',
    description:
      'Production-grade insurance AI — cited decisions, human-in-the-loop, integrated with your core admin system.',
    url: 'https://vahue.ai/industries/insurance',
  },
}

export default function Page() {
  return <SegmentLanding content={insuranceContent} />
}
