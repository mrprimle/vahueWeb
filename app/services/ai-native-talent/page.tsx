import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'AI-Native Talent | Vahue',
  description: 'AI-Native Talent services by Vahue.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Services" title="AI-Native Talent" />
}
