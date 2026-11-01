import type { Metadata } from 'next'
import VahueEventsPage from '@/components/events/VahueEventsPage'

const PAGE_URL = 'https://vahue.ai/events/'
const DESCRIPTION =
  'Vahue events: AI summits in San Francisco, Los Angeles and London where business and technology leaders discuss practical AI adoption.'

export const metadata: Metadata = {
  title: 'Events',
  description: DESCRIPTION,
  openGraph: { title: 'Events | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

// Built on the scale.com/events clone (components/scale-clone/events) in Scale's own colours.
export default function Page() {
  return <VahueEventsPage />
}
