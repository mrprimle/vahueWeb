import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Team Training | Vahue',
  description: 'Team Training services by Vahue.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Services" title="Team Training" />
}
