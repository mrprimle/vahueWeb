import type { Metadata } from 'next'
import IndustryPage from '@/components/industry/enterprise-insurance/IndustryPage'
import { insuranceContent } from '@/components/segments/content/insurance'
import { INDUSTRY_WORKFLOWS } from '@/lib/automation-content'

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
  alternates: {
    canonical: 'https://vahue.ai/industries/insurance',
    types: {
      'text/markdown': '/llms/industries-insurance.md',
    },
  },
}

export default function Page() {
  return <IndustryPage content={insuranceContent} workflows={INDUSTRY_WORKFLOWS.insurance.workflows} />
}
