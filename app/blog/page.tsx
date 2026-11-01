import type { Metadata } from 'next'
import VahueBlogPage from '@/components/blog/VahueBlogPage'

const PAGE_URL = 'https://vahue.ai/blog/'
const DESCRIPTION =
  'Insights, guides, and field notes on AI-native engineering, LLM deployment, agentic AI, AI search and enterprise AI transformation.'

export const metadata: Metadata = {
  title: 'Blog',
  description: DESCRIPTION,
  openGraph: { title: 'Blog | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/blog clone (components/templates/blog) in Scale's own colours.
export default function Page() {
  return <VahueBlogPage />
}
