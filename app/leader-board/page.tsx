import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Leader Board | Vahue',
  description: 'Vahue Leader Board.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Resources" title="Leader Board" />
}
