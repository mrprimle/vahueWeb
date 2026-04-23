import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Banking & Financial Services | Vahue',
  description: 'Vahue for Banking & Financial Services.',
}

export default function Page() {
  return (
    <PlaceholderPage eyebrow="Industries" title="Banking & Financial Services" />
  )
}
