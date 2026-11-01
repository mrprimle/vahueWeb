import type { Metadata } from 'next'
import EventsPage from '@/components/scale-clone/events/EventsPage'
import { scaleEventsContent } from '@/components/scale-clone/events/content'

export const metadata: Metadata = {
  title: 'Events | Scale clone',
}

// 1:1 clone of scale.com/events with Scale's own copy (static snapshot). Spec: reference-snapshots/scale-clone/events.md
export default function Page() {
  return <EventsPage content={scaleEventsContent} />
}
