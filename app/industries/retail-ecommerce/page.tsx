import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Retail & eCommerce | Vahue',
  description: 'Vahue for Retail & eCommerce.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Industries" title="Retail & eCommerce" />
}
