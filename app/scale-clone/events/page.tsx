import type { Metadata } from 'next'
import EventsPage from '@/components/scale-clone/events/EventsPage'

export const metadata: Metadata = {
  title: 'Events | Scale clone',
}

// Structural clone of scale.com/events. Spec: reference-snapshots/scale-clone/events.md
export default function Page() {
  return <EventsPage />
}
