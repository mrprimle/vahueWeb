import { SCALE_PAST, SCALE_UPCOMING, type EventRow } from './scaleEvents'

/*
 * Content contract for the scale.com/events layout. EventsPage renders every section from this object, so a
 * Vahue /events page can reuse the same layout + interactions by passing its own content.
 * `scaleEventsContent` is Scale's own copy (static snapshot in scaleEvents.ts) so QA lines up with scale.com.
 */

export type EventItem = {
  id: string
  /** listingTypeLabel, e.g. "Conference" (may be empty: the past card then shows the date only). */
  type: string
  /** Rendered date label, e.g. "November 1, 2026", "April 23-27, 2026" or "Date TBD". */
  date: string
  title: string
  description: string
  /** http(s) URLs open in a new tab (target _blank, rel noopener noreferrer); anything else is a next/link. */
  href: string
  /** ctaLabel, default "Learn more". */
  cta?: string
}

export type EventsContent = {
  hero: { title: string; lede: string }
  upcoming: EventItem[]
  past: {
    title: string
    subtitle: string
    events: EventItem[]
    /** Scale: useState(6) and +6 per click. */
    initial?: number
    step?: number
    moreLabel?: string
  }
}

const toItems = (rows: EventRow[], prefix: string): EventItem[] =>
  rows.map(([date, type, title, description, href, cta], i) => ({
    id: `${prefix}${i}`,
    date,
    type,
    title,
    description,
    href,
    cta,
  }))

export const scaleEventsContent: EventsContent = {
  hero: {
    title: 'Events',
    lede: "Connect, engage, and learn from the world's top experts on AI & Machine Learning.",
  },
  upcoming: toItems(SCALE_UPCOMING, 'u'),
  past: {
    title: 'Past Events',
    subtitle: 'Explore highlights and recordings from our previous events.',
    events: toItems(SCALE_PAST, 'p'),
    initial: 6,
    step: 6,
    moreLabel: 'Show more events',
  },
}
