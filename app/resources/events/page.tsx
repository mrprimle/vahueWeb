import type { Metadata } from 'next'
import EventsClient from '@/components/events/EventsClient'

export const metadata: Metadata = {
  title: 'Events | Vahue',
  description:
    'Connect, engage, and learn from the world\'s top experts on AI & Machine Learning.',
}

export default function Page() {
  return <EventsClient />
}
