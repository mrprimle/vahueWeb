import { CONTAINER, SectionHeader } from './Sections'
import s from './styles.module.css'

/*
 * "Phases" = Scale's Features block with numbers (automotive clone): 3 columns from lg, xl gap 40/56, 3:2 media
 * per card, numbered title (22px ring at -40px), body at 16/1.65. Scale's media are video stills behind a play
 * button; Vahue has no video, so each card's media is the dark dot-texture panel carrying the phase length.
 */

type Phase = { name: string; length: string; body: string }

export default function Phases({ phases, title, sub }: { phases: Phase[]; title: string; sub: string }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader over="How we start" title={title} sub={sub} />
      <div className="mt-10">
        <ol className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
          {phases.map((p, i) => (
            <li key={p.name}>
              <div className={s.feature}>
                <div className="hero-texture relative flex aspect-[3/2] w-full flex-col justify-between overflow-hidden rounded-lg bg-surface p-6" aria-hidden>
                  <span className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/45">Phase {String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-[clamp(2rem,1.25rem+2vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-white">{p.length}</span>
                </div>
              </div>
              <h3 className="relative ml-11 mt-8 font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white lg:mt-12">
                <span
                  className={`${s.number} absolute -left-10 top-[7px] flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white/[0.09] text-[12px] leading-[1.5] tracking-[-0.02em] text-white`}
                >
                  {i + 1}
                </span>
                {p.name}
                <span className="sr-only"> ({p.length})</span>
              </h3>
              <p className="relative ml-11 mt-3 text-[16px] leading-[1.65] tracking-[-0.01em] text-white/70">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
