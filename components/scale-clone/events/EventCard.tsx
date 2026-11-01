import Link from 'next/link'
import type { ReactNode } from 'react'
import type { EventItem } from './content'
import s from './events.module.css'

// lucide "calendar-days" (strokeWidth 1.8), as rendered on Scale (size-7 upcoming, size-6 past).
export function CalendarDays() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

/*
 * Scale's card link (module 187078 `l`): /^https?:\/\//i -> <a target=_blank rel="noopener noreferrer">,
 * otherwise next/link. Neither carries CMSLink focus classes, so the UA focus ring shows (s.card resets the
 * app's global `a { outline: none }`).
 */
function CardLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

// Upcoming card (server-rendered on Scale): 64px tile, "TYPE · DATE" row, 30px title, 18px description.
export function UpcomingCard({ event }: { event: EventItem }) {
  return (
    <CardLink href={event.href} className={`${s.card} ${s.cardUpcoming}`}>
      <div className={`${s.tile} ${s.tileLg}`}>
        <CalendarDays />
      </div>
      <div className={s.bodyUpcoming}>
        <div className={s.metaRow}>
          <span className={s.meta}>{event.type}</span>
          <span className={s.dot} aria-hidden="true">
            ·
          </span>
          <span className={s.meta}>{event.date}</span>
        </div>
        <h3 className={`${s.cardTitle} font-display`}>{event.title}</h3>
        {event.description && <p className={`${s.desc} font-display`}>{event.description}</p>}
      </div>
      <span className={s.cta}>{event.cta || 'Learn more'}</span>
    </CardLink>
  )
}

// Past card (PastEventsList `n`): 56px tile with shadow-sm, "DATE   TYPE" (three spaces, filter(Boolean)), 24px title, 16px description.
export function PastCard({ event }: { event: EventItem }) {
  const meta = [event.date, event.type].filter(Boolean).join('   ')
  return (
    <CardLink href={event.href} className={`${s.card} ${s.cardPast}`}>
      <div className={`${s.tile} ${s.tileSm}`}>
        <CalendarDays />
      </div>
      <div className={s.bodyPast}>
        {meta && <p className={s.meta}>{meta}</p>}
        <h3 className={`${s.cardTitle} ${s.cardTitleSm} font-display`}>{event.title}</h3>
        {event.description && <p className={`${s.desc} ${s.descSm} font-display`}>{event.description}</p>}
      </div>
      <span className={s.cta}>{event.cta || 'Learn more'}</span>
    </CardLink>
  )
}
