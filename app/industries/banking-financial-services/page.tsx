import type { Metadata } from 'next'
import EnterpriseIndustryPage from '@/components/industry/enterprise/EnterpriseIndustryPage'
import { bankingConfig } from '@/components/industry/enterprise/banking-financial-services'

export const metadata: Metadata = {
  title: 'AI for Banking & Financial Services',
  description:
    'AI agents for mortgage and loan documents, KYC intake and reconciliations across core and finance systems, with review queues, approvals and a full audit log.',
  openGraph: {
    title: 'AI for Banking & Financial Services | Vahue',
    description: 'Banking back-office workflows run by agents inside your systems, reviewed by your team and logged.',
    url: 'https://vahue.ai/industries/banking-financial-services',
  },
  alternates: {
    canonical: 'https://vahue.ai/industries/banking-financial-services',
    types: {
      'text/markdown': '/llms/industries-banking-financial-services.md',
    },
  },
}

export default function Page() {
  return <EnterpriseIndustryPage config={bankingConfig} />
}
