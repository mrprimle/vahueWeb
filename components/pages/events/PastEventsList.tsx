'use client'

// Scale module 187078 (`PastEventsList`, chunk 0saoa1o-3163r.js): 6 cards, 6 more per click, no animation.
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { EventLink } from './EventLink'
import type { PastEvent } from './types'

function PastEventCard({ event }: { event: PastEvent }) {
  const label = [event.dateLabel, event.typeLabel].filter(Boolean).join('   ')
  return (
    <EventLink href={event.href} className="group flex min-h-[420px] flex-col rounded-[28px] bg-[#f2f2f2] p-10 transition-colors duration-200 hover:bg-[#ececec]">
      <div className="flex size-14 items-center justify-center rounded-lg bg-white text-black shadow-sm">
        <CalendarDays className="size-6" strokeWidth={1.8} aria-hidden />
      </div>
      <div className="mt-20 flex flex-col gap-5">
        {label && <p className="text-xs font-medium uppercase tracking-widest text-black/45">{label}</p>}
        <h3 className="text-balance text-2xl font-medium leading-[1.08] text-black">{event.title}</h3>
        {event.description && <p className="text-base leading-relaxed text-black/60">{event.description}</p>}
      </div>
      <span className="mt-auto inline-flex w-fit items-center rounded-lg bg-black/[0.04] px-5 py-3 text-sm font-medium text-black transition-colors duration-200 group-hover:bg-black/[0.08]">
        {event.ctaLabel}
      </span>
    </EventLink>
  )
}

export function PastEventsList({ title, body, showMoreLabel, events }: { title: string; body: string; showMoreLabel: string; events: PastEvent[] }) {
  const [count, setCount] = useState(6)
  const visible = events.slice(0, count)
  const hasMore = count < events.length
  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-2xl font-medium text-black">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-black/60">{body}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <PastEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCount((n) => n + 6)}
            className="rounded-lg bg-black/[0.04] px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-black/[0.08]"
          >
            {showMoreLabel}
          </button>
        </div>
      )}
    </div>
  )
}
