'use client'

import { useState } from 'react'
import BookNowModal from './BookNowModal'

type EventItem = {
  id: string
  type: string
  date: string
  title: string
  location: string
  description: string
  ctaLabel?: string
  bookable?: boolean
}

const events: EventItem[] = [
  {
    id: 'vahue-momentum-ai-sf-2026',
    type: 'CONFERENCE',
    date: 'May 16, 2026',
    title: 'Vahue Momentum AI San-Francisco',
    location: 'San-Francisco',
    description:
      'A Vahue-hosted AI conference in San-Francisco bringing together business and technology leaders to explore real-world AI adoption and strategy.',
    ctaLabel: 'Reserve your spot',
    bookable: true,
  },
  {
    id: 'vahue-ai-summit-la-2026',
    type: 'CONFERENCE',
    date: 'May 19, 2026',
    title: 'Vahue AI Summit Los Angeles',
    location: 'Los Angeles',
    description:
      'A curated Vahue AI Summit in Los Angeles featuring a shortlist of invited speakers from AI, Banking, Finance, Insurance, and Real Estate — bringing together industry leaders for focused conversation on practical AI adoption.',
    ctaLabel: 'Reserve your spot',
    bookable: true,
  },
  {
    id: 'vahue-ai-summit-london-2026',
    type: 'CONFERENCE',
    date: 'May 30, 2026',
    title: 'Vahue AI Summit London',
    location: 'London',
    description:
      'A curated Vahue AI Summit in London featuring a shortlist of invited speakers from AI, Banking, Finance, Insurance, and Real Estate — bringing together industry leaders for focused conversation on practical AI adoption.',
    ctaLabel: 'Reserve your spot',
    bookable: true,
  },
]

export default function EventsClient() {
  const [selected, setSelected] = useState<EventItem | null>(null)

  return (
    <main className="bg-bg">
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Events
          </h1>
          <p className="mt-6 text-base md:text-lg text-white leading-relaxed">
            Connect, engage, and learn from the world&apos;s top experts on AI
            &amp; Machine Learning.
          </p>
        </div>
      </section>

      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-24">
        <div className="rounded-2xl border border-white/10 bg-black overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/10">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Upcoming Events
            </h2>
            <p className="mt-1 text-sm text-white/55">
              Join us at these upcoming events to connect with the AI community.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-black">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-6 md:p-8 flex flex-col min-h-[260px] border-r border-b border-white/10 last:border-r-0"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80">
                    {event.type}
                  </span>
                  <span className="text-white/40 text-sm">&middot;</span>
                  <span className="text-white/60 text-sm">{event.date}</span>
                </div>
                <h3 className="mt-5 text-lg md:text-xl font-semibold text-white leading-snug">
                  {event.title}
                </h3>
                <p className="mt-3 text-sm text-white/55 leading-relaxed flex-1">
                  {event.description}
                </p>
                <div className="mt-6">
                  {event.bookable ? (
                    <button
                      type="button"
                      onClick={() => setSelected(event)}
                      className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors"
                    >
                      {event.ctaLabel ?? 'Learn more'}
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  ) : (
                    <span className="group inline-flex items-center gap-2 text-sm text-white/85">
                      {event.ctaLabel ?? 'Learn more'}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookNowModal
        open={selected !== null}
        onClose={() => setSelected(null)}
        eventName={selected?.title ?? ''}
        eventDate={selected?.date ?? ''}
        eventLocation={selected?.location ?? ''}
      />
    </main>
  )
}
