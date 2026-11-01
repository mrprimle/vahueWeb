import { UpcomingCard } from './EventCard'
import PastEventsList from './PastEventsList'
import type { EventsContent } from './content'
import s from './events.module.css'

/*
 * scale.com/events body (between the shared header and footer), driven entirely by `content` (see content.ts).
 * Spec: reference-snapshots/scale-clone/events.md
 *
 * 1. Centred hero: h1 60/96px weight 500 leading 1.08 + 18px lede (pt-36 pb-20 / md:pt-40 md:pb-24).
 * 2. #upcoming: 1 / md 2 / lg 3 column grid (gap 12) of tall cards (min-h 540 / md 620).
 * 3. #past: heading + grid of shorter cards (min-h 420); 6 shown, "Show more events" adds 6.
 * No scroll or entrance motion in Scale's page body (REA: no listeners on the sections, no ScrollTrigger on html);
 * card and button hovers are CSS background transitions (200ms). No featured event, filters or tabs.
 */
export default function EventsPage({ content, as: Root = 'main' }: { content: EventsContent; as?: 'main' | 'div' }) {
  const { hero, upcoming, past, upcomingEmpty } = content
  const upcomingCards = upcoming.length === 0 && upcomingEmpty ? [upcomingEmpty] : upcoming
  return (
    <Root className="overflow-x-hidden bg-white font-display text-black">
      <section className={s.hero}>
        <div className={`${s.container} flex flex-col items-center gap-5 text-center`}>
          <h1 className={`${s.title} font-display`}>{hero.title}</h1>
          <p className={s.lede}>{hero.lede}</p>
        </div>
      </section>

      <section id="upcoming" className={s.upcoming}>
        <div className={`${s.container} flex flex-col gap-10`}>
          <div className={s.grid}>
            {upcomingCards.map((e) => (
              <UpcomingCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      <section id="past" className={s.past}>
        <div className={s.container}>
          <PastEventsList past={past} />
        </div>
      </section>
    </Root>
  )
}
