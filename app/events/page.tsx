import type { Metadata } from 'next'
import { EventsPage } from '@/components/pages/events/EventsPage'
import { content } from '@/components/pages/events/content.scale'

export const metadata: Metadata = { title: content.meta.title, description: content.meta.description }

export default function Page() {
  return <EventsPage content={content} />
}
