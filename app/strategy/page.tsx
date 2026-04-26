import type { Metadata } from 'next'
import StrategyPage from '@/components/pages/StrategyPage'

export const metadata: Metadata = {
  title: 'AI Strategy & Advisory | Vahue',
  description:
    'Transform scattered AI pilots into a coherent, funded, and governed AI portfolio. Vahue Strategy Sprint delivers a 12–24 month roadmap with architecture, governance, and activation.',
  openGraph: {
    title: 'AI Strategy & Advisory | Vahue',
    description:
      'From AI readiness diagnostic to 12–24 month roadmap — backed by Vahue\'s engineering and Hub teams so strategy leads directly to execution.',
    url: 'https://vahue.ai/strategy',
  },
  alternates: {
    canonical: 'https://vahue.ai/strategy',
    types: {
      'text/markdown': '/llms/ai-strategy.md',
    },
  },
}

export default function Strategy() {
  return <StrategyPage />
}
