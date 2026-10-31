import type { Metadata } from 'next'
import IndustryPage from '@/components/industry/enterprise-healthcare/IndustryPage'
import { healthcareLifeSciencesContent } from '@/components/segments/content/healthcare-life-sciences'
import { INDUSTRY_WORKFLOWS } from '@/lib/automation-content'

export const metadata: Metadata = {
  title: 'AI for Healthcare & Life Sciences | Vahue',
  description:
    'AI agents for clinical documentation, trial and protocol summaries, and audit finding classification — with review queues, role-based access and a full audit log.',
  openGraph: {
    title: 'AI for Healthcare & Life Sciences | Vahue',
    description:
      'Clinical and research workflows run by agents in your own environment — cited, reviewed by your team, and logged.',
    url: 'https://vahue.ai/industries/healthcare-life-sciences',
  },
  alternates: {
    canonical: 'https://vahue.ai/industries/healthcare-life-sciences',
    types: {
      'text/markdown': '/llms/industries-healthcare-life-sciences.md',
    },
  },
}

export default function Page() {
  return (
    <IndustryPage
      content={healthcareLifeSciencesContent}
      workflows={INDUSTRY_WORKFLOWS['healthcare-life-sciences'].workflows}
    />
  )
}
