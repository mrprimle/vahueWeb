import type { Metadata } from 'next'
import PlaceholderPage from '@/components/shared/PlaceholderPage'

export const metadata: Metadata = {
  title: 'Contact | Vahue',
  description: 'Get in touch with Vahue.',
}

export default function Page() {
  return <PlaceholderPage eyebrow="Contact" title="Contact us" />
}
