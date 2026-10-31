import type { Metadata } from 'next'
import EnterpriseIndustryPage from '@/components/industry/enterprise/EnterpriseIndustryPage'
import { distributionConfig } from '@/components/industry/enterprise/distribution-manufacturing'

export const metadata: Metadata = {
  title: 'AI for Distribution & Manufacturing',
  description:
    'AI agents for supplier onboarding, quotes, invoices from packing slips and bills of materials from drawings, inside your ERP, with review queues, approvals and a full audit log.',
  openGraph: {
    title: 'AI for Distribution & Manufacturing | Vahue',
    description: 'Supplier paperwork, quotes and bills of materials run by agents inside your ERP, reviewed by your team and logged.',
    url: 'https://vahue.ai/industries/distribution-manufacturing',
  },
  alternates: {
    canonical: 'https://vahue.ai/industries/distribution-manufacturing',
  },
}

export default function Page() {
  return <EnterpriseIndustryPage config={distributionConfig} />
}
