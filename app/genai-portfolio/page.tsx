import type { Metadata } from 'next'
import { content } from '@/components/pages/genai-portfolio/content.scale'
import { GenAiPortfolioPage } from '@/components/pages/genai-portfolio/GenAiPortfolioPage'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <GenAiPortfolioPage content={content} />
}
