import { UpcomingCard } from './EventCard'
import PastEventsList from './PastEventsList'
import { PAST, UPCOMING } from './eventsData'
import s from './events.module.css'

/*
 * scale.com/events body (between the shared header and footer). Spec: reference-snapshots/scale-clone/events.md
 *
 * 1. Centred hero: h1 60/96px weight 500 leading 1.08 + 18px lede (pt-36 pb-20 / md:pt-40 md:pb-24).
 * 2. #upcoming: 1 / md 2 / lg 3 column grid (gap 12) of 13 tall cards (min-h 540 / md 620).
 * 3. #past: "Past Events" heading + grid of shorter cards (min-h 420); 6 shown, "Show more events" adds 6.
 * No scroll or entrance motion on Scale's page body; card and button hovers are CSS background transitions (0.2s).
 * Scale has no featured event and no filter tabs on this page.
 */
export default function EventsPage() {
  return (
    <div className="font-display">
      <section className={s.hero}>
        <div className={`${s.container} flex flex-col items-center gap-5 text-center`}>
          {/* TODO: Vahue copy */}
          <h1 className={`${s.title} font-display`}>Events</h1>
          {/* TODO: Vahue copy */}
          <p className={s.lede}>Meet, share, and learn alongside leading practitioners in applied systems and data work.</p>
        </div>
      </section>

      <section id="upcoming" className={s.upcoming}>
        <div className={`${s.container} flex flex-col gap-10`}>
          <div className={s.grid}>
            {UPCOMING.map((e) => (
              <UpcomingCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      <section id="past" className={s.past}>
        <div className={s.container}>
          <PastEventsList events={PAST} />
        </div>
      </section>
    </div>
  )
}
