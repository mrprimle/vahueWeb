import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Insurance | Vahue',
  description: 'Vahue for Insurance.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Industries" title="Insurance" />
}
