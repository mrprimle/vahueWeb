// https://scale.com/events. Server-rendered on Scale too: only PastEventsList is a client component.
import { CalendarDays } from 'lucide-react'
import { EventLink } from './EventLink'
import { LightPageTheme } from './LightPageTheme'
import { PastEventsList } from './PastEventsList'
import type { EventsContent } from './types'

export function EventsPage({ content: c }: { content: EventsContent }) {
  return (
    // `.light-page` on Scale sets colour and background; those two are written here as utilities.
    <div className="light-page overflow-x-hidden bg-white text-black">
      <LightPageTheme />
      <section className="flex w-full flex-col items-center justify-center overflow-hidden pb-20 pt-36 md:pb-24 md:pt-40">
        <div className="container flex flex-col items-center gap-5 text-center">
          <h1 className="text-6xl font-medium leading-[1.08] text-black md:text-8xl">{c.intro.title}</h1>
          <p className="max-w-[760px] text-center text-[1.125rem] text-black/60 md:whitespace-nowrap">{c.intro.body}</p>
        </div>
      </section>
      <section id="upcoming" className="w-full scroll-mt-28 pb-16">
        <div className="container flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {c.upcoming.map((event, i) => (
              <EventLink
                key={i}
                href={event.href}
                className="group flex min-h-[540px] flex-col rounded-[28px] bg-[#f2f2f2] p-10 transition-colors duration-200 hover:bg-[#ececec] md:min-h-[620px] md:p-12"
              >
                <div className="flex size-16 items-center justify-center rounded-lg bg-white text-black">
                  <CalendarDays className="size-7" strokeWidth={1.8} aria-hidden />
                </div>
                <div className="mt-12 flex flex-col gap-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-medium uppercase tracking-widest text-black/45">{event.typeLabel}</span>
                    <span className="text-black/20" aria-hidden>
                      ·
                    </span>
                    <span className="text-xs font-medium uppercase tracking-widest text-black/45">{event.dateLabel}</span>
                  </div>
                  <h3 className="text-balance text-3xl font-medium leading-[1.08] text-black">{event.title}</h3>
                  <p className="text-lg leading-relaxed text-black/60">{event.description}</p>
                </div>
                <span className="mt-auto inline-flex w-fit items-center rounded-lg bg-black/[0.04] px-5 py-3 text-sm font-medium text-black transition-colors duration-200 group-hover:bg-black/[0.08]">
                  {event.ctaLabel}
                </span>
              </EventLink>
            ))}
          </div>
        </div>
      </section>
      <section id="past" className="w-full scroll-mt-28 py-16">
        <div className="container">
          <PastEventsList title={c.past.title} body={c.past.body} showMoreLabel={c.past.showMoreLabel} events={c.past.events} />
        </div>
      </section>
    </div>
  )
}
