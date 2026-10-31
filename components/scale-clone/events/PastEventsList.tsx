'use client'

import { useState } from 'react'
import { PastCard } from './EventCard'
import type { EventItem } from './eventsData'
import s from './events.module.css'

/*
 * Port of Scale's PastEventsList (chunk 0saoa1o-3163r.js, module 187078):
 * useState(6), events.slice(0, n), button onClick n => n + 6, hidden once everything is shown.
 * No animation on reveal: new cards simply mount.
 */
export default function PastEventsList({ events }: { events: EventItem[] }) {
  const [count, setCount] = useState(6)
  const visible = events.slice(0, count)
  const hasMore = count < events.length

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          {/* TODO: Vahue copy */}
          <h2 className={`${s.pastTitle} font-display`}>Past Events</h2>
          {/* TODO: Vahue copy */}
          <p className={`${s.pastSub} font-display`}>Browse highlights and recordings from our earlier sessions.</p>
        </div>
        <div className={s.grid}>
          {visible.map((e) => (
            <PastCard key={e.id} event={e} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setCount((n) => n + 6)} className={`${s.more} font-display`}>
            Show more events
          </button>
        </div>
      )}
    </div>
  )
}
