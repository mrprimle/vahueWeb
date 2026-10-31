import type { EventItem } from './eventsData'
import s from './events.module.css'

// lucide "calendar-days" (strokeWidth 1.8), as rendered on Scale. Also at public/scale-clone/events/calendar-days.svg.
export function CalendarDays() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

// Upcoming card: 64px tile, "TYPE · DATE" row, 30px title, 18px description.
export function UpcomingCard({ event }: { event: EventItem }) {
  return (
    <a href={event.href} className={`${s.card} ${s.cardUpcoming} group`}>
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
        {/* TODO: Vahue copy */}
        <h3 className={`${s.cardTitle} font-display`}>{event.title}</h3>
        {/* TODO: Vahue copy */}
        <p className={`${s.desc} font-display`}>{event.description}</p>
      </div>
      <span className={s.cta}>Learn more</span>
    </a>
  )
}

// Past card: 56px tile with shadow-sm, "DATE   TYPE" line, 24px title, 16px description.
export function PastCard({ event }: { event: EventItem }) {
  return (
    <a href={event.href} className={`${s.card} ${s.cardPast} group`}>
      <div className={`${s.tile} ${s.tileSm}`}>
        <CalendarDays />
      </div>
      <div className={s.bodyPast}>
        <p className={s.meta}>{[event.date, event.type].join('   ')}</p>
        {/* TODO: Vahue copy */}
        <h3 className={`${s.cardTitle} ${s.cardTitleSm} font-display`}>{event.title}</h3>
        {/* TODO: Vahue copy */}
        <p className={`${s.desc} ${s.descSm} font-display`}>{event.description}</p>
      </div>
      <span className={s.cta}>Learn more</span>
    </a>
  )
}
