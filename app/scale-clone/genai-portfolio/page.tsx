import type { Metadata } from 'next'
import GenAiPortfolioPage from '@/components/scale-clone/genai-portfolio/GenAiPortfolioPage'

export const metadata: Metadata = {
  title: 'Agent Platform | Scale clone',
}

// Structural clone of scale.com/genai-portfolio. Spec: reference-snapshots/scale-clone/genai-portfolio.md
export default function Page() {
  return <GenAiPortfolioPage />
}
