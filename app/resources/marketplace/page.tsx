import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Marketplace | Vahue',
  description: 'Vahue Marketplace.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Resources" title="Marketplace" />
}
