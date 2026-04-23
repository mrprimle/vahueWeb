import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Healthcare & Life Sciences | Vahue',
  description: 'Vahue for Healthcare & Life Sciences.',
}

export default function Page() {
  return (
    <PlaceholderPage eyebrow="Industries" title="Healthcare & Life Sciences" />
  )
}
