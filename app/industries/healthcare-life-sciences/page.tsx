import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { healthcareLifeSciencesContent } from '@/components/segments/content/healthcare-life-sciences'

export const metadata: Metadata = {
  title: 'AI for Healthcare & Life Sciences | Vahue',
  description:
    'Clinical and research AI agents — ambient scribe, prior auth, guideline surfacing, and evidence copilots — with HIPAA-grade consent, minimization, and audit.',
  openGraph: {
    title: 'AI for Healthcare & Life Sciences | Vahue',
    description:
      'Clinician-first AI deployed in your HIPAA / GxP environment — grounded, cited, and reviewable.',
    url: 'https://vahue.ai/industries/healthcare-life-sciences',
  },
}

export default function Page() {
  return <SegmentLanding content={healthcareLifeSciencesContent} />
}
