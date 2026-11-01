'use client'

import { useState } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import { PastCard } from './EventCard'
import type { EventsContent } from './content'
import s from './events.module.css'

/*
 * Port of Scale's PastEventsList (chunk 0saoa1o-3163r.js, module 187078):
 * useState(6), events.slice(0, n), button onClick n => n + 6, hidden once everything is shown.
 * No animation on reveal: the new cards mount in the same frame. Lenis picks up the taller page through its
 * own ResizeObserver; useRefreshOnPageGrow re-measures any ScrollTrigger (shared nav theme, Vahue sections).
 */
export default function PastEventsList({ past }: { past: EventsContent['past'] }) {
  const { title, subtitle, events, initial = 6, step = 6, moreLabel = 'Show more events' } = past
  const [count, setCount] = useState(initial)
  useRefreshOnPageGrow()
  const visible = events.slice(0, count)
  const hasMore = count < events.length

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className={`${s.pastTitle} font-display`}>{title}</h2>
          <p className={`${s.pastSub} font-display`}>{subtitle}</p>
        </div>
        <div className={s.grid}>
          {visible.map((e) => (
            <PastCard key={e.id} event={e} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setCount((n) => n + step)} className={`${s.more} font-display`}>
            {moreLabel}
          </button>
        </div>
      )}
    </div>
  )
}
