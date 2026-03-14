import type { Metadata } from 'next'
import AINativeEngineeringPage from '@/components/pages/AINativeEngineeringPage'

export const metadata: Metadata = {
  title: 'AI-Native Engineering',
  description:
    'Build your own remote engineering team. Top-tier AI-native software engineering talent for startups and Fortune 500 companies.',
  openGraph: {
    title: 'AI-Native Engineering | Vahue',
    description:
      'Build your own remote engineering team. Top-tier AI-native software engineering talent.',
    url: 'https://vahue.ai/ai-native-engineering',
  },
}

export default function Page() {
  return <AINativeEngineeringPage />
}
