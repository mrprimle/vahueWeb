import type { Metadata } from 'next'
import SegmentLanding from '@/components/segments/SegmentLanding'
import { engineeringContent } from '@/components/segments/content/engineering'

export const metadata: Metadata = {
  title: 'AI-Native Engineering',
  description:
    'Ship AI features to production — with evals, guardrails, and CI you can trust. AI-native engineering pods embedded in your team.',
  openGraph: {
    title: 'AI-Native Engineering | Vahue',
    description:
      'Ship AI features to production. AI-native engineering pods embedded in your team.',
    url: 'https://vahue.ai/ai-native-engineering',
  },
}

export default function Page() {
  return <SegmentLanding content={engineeringContent} />
}
