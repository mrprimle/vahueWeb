import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Guides | Vahue',
  description: 'Vahue Guides.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Resources" title="Guides" />
}
