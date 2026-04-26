import type { Metadata } from 'next'
import AINativeEngineeringPage from '@/components/pages/AINativeEngineeringPage'

export const metadata: Metadata = {
  title: 'AI-Native Engineering | Vahue',
  description:
    'Ship 10× faster with AI without losing senior control. AI-assisted software development with human senior oversight — production-grade quality, enterprise security, predictable delivery.',
  openGraph: {
    title: 'AI-Native Engineering | Vahue',
    description:
      'AI-assisted software development with human senior oversight. 10× faster delivery, 40–60% lower cost, 80% fewer bugs.',
    url: 'https://vahue.ai/ai-native-engineering',
  },
  alternates: {
    canonical: 'https://vahue.ai/ai-native-engineering',
    types: {
      'text/markdown': '/llms/ai-native-engineering.md',
    },
  },
}

export default function Page() {
  return <AINativeEngineeringPage />
}
