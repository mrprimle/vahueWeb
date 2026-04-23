import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { operationsContent } from '@/components/segments/content/operations'

export const metadata: Metadata = {
  title: 'AI for Operations',
  description:
    'An agentic back-office: AP/AR, procurement, HR ops, ERP/ITSM overlays — automated with full audit trail.',
  openGraph: {
    title: 'AI for Operations | Vahue',
    description:
      'Agentic back-office workflows for AP/AR, procurement, and HR ops — with audit trail.',
    url: 'https://vahue.ai/operations',
  },
}

export default function Page() {
  return <SegmentLanding content={operationsContent} />
}
