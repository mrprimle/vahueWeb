import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Enterprise AI | Vahue',
  description: 'Enterprise AI services by Vahue.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Services" title="Enterprise AI" />
}
