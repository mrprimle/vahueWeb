import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { bfsiContent } from '@/components/segments/content/bfsi'

export const metadata: Metadata = {
  title: 'Trusted GenAI for BFSI & RegTech',
  description:
    'GenAI systems for banks, insurers, and fintechs — governance-first, auditable, and tuned for risk, fraud, and customer ops.',
  openGraph: {
    title: 'Trusted GenAI for BFSI & RegTech | Vahue',
    description:
      'Governance-first GenAI for regulated environments — MRM-ready, explainable, private deployments.',
    url: 'https://vahue.ai/bfsi',
  },
}

export default function Page() {
  return <SegmentLanding content={bfsiContent} />
}
