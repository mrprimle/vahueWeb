import type { Metadata } from 'next'
import AISEOPage from '@/components/pages/AISEOPage'

export const metadata: Metadata = {
  title: 'AI SEO & LLM Discoverability | Vahue',
  description:
    'Measure and improve your brand\'s visibility in AI-generated answers from ChatGPT, Claude, Gemini, Perplexity, and Copilot. AI Search Audit, llms.txt, structured data, and monitoring.',
  openGraph: {
    title: 'AI SEO & LLM Discoverability | Vahue',
    description:
      'Get cited by AI assistants. Vahue audits your AI visibility, builds the discoverability layer (llms.txt, Markdown mirrors, JSON-LD), and monitors your AI search presence.',
    url: 'https://vahue.ai/ai-seo',
  },
  alternates: {
    canonical: 'https://vahue.ai/ai-seo',
    types: {
      'text/markdown': '/llms/ai-seo.md',
    },
  },
}

export default function AISEO() {
  return <AISEOPage />
}
