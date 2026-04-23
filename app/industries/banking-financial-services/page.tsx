import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { bankingFinancialServicesContent } from '@/components/segments/content/banking-financial-services'

export const metadata: Metadata = {
  title: 'AI for Banking & Financial Services | Vahue',
  description:
    'Fraud, AML, KYC, lending, and advisor copilots shipped inside your tenant — MRM-ready, explainable, and tuned for regulated banking.',
  openGraph: {
    title: 'AI for Banking & Financial Services | Vahue',
    description:
      'Production GenAI for banks and fintechs — governance-first, auditable, private by default.',
    url: 'https://vahue.ai/industries/banking-financial-services',
  },
}

export default function Page() {
  return <SegmentLanding content={bankingFinancialServicesContent} />
}
