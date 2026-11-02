export type UpcomingEvent = {
  href: string
  typeLabel: string
  dateLabel: string
  title: string
  description: string
  ctaLabel: string
}

export type PastEvent = {
  id: string
  href: string
  dateLabel: string
  typeLabel: string
  title: string
  description: string
  ctaLabel: string
}

export type EventsContent = {
  meta: { title: string; description: string }
  intro: { title: string; body: string }
  upcoming: UpcomingEvent[]
  past: { title: string; body: string; showMoreLabel: string; events: PastEvent[] }
}
