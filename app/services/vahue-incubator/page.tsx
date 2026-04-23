import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Vahue Incubator | Vahue',
  description: 'Vahue Incubator program.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Services" title="Vahue Incubator" />
}
