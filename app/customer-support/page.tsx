import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { customerSupportContent } from '@/components/segments/content/customer-support'

export const metadata: Metadata = {
  title: 'AI for Customer Support',
  description:
    'Deflect, assist, escalate — AI support systems grounded on your real policies. Lift CSAT, cut AHT, reduce cost per contact.',
  openGraph: {
    title: 'AI for Customer Support | Vahue',
    description:
      'AI support systems grounded on your real policies — deflection, agent-assist, RAG on your knowledge base.',
    url: 'https://vahue.ai/customer-support',
  },
}

export default function Page() {
  return <SegmentLanding content={customerSupportContent} />
}
