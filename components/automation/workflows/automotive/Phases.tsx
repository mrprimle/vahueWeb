import { CONTAINER, SectionHeader } from './Sections'
import s from './styles.module.css'

/*
 * "Phases" = Scale's Features block with numbers (automotive clone): 3 columns from lg, xl gap 40/56, 3:2 media in
 * the `.feature` wrapper, numbered title (22px chip at -40px), body 16/1.65 black/70. Scale's media are video stills
 * behind a play button; Vahue has no video, so each card holds an own 3:2 panel (phase name and length) and no
 * play button.
 */

type Phase = { title: string; length: string; body: string }

function PhaseMedia({ p, i }: { p: Phase; i: number }) {
  const tones = ['#193A29', '#273252', '#79648C']
  return (
    <svg viewBox="0 0 600 400" className="block aspect-[3/2] w-full rounded-lg font-display" aria-hidden>
      <rect width="600" height="400" fill={tones[i % tones.length]} />
      <text x="40" y="66" fontSize="18" letterSpacing="2" fill="#fff" opacity=".6">
        {`PHASE ${String(i + 1).padStart(2, '0')}`}
      </text>
      <text x="40" y="340" fontSize="56" fill="#fff">
        {p.length}
      </text>
    </svg>
  )
}

export default function Phases({ title, sub, items }: { title: string; sub: string; items: Phase[] }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title={title} sub={sub} />
      <div className="mt-10">
        <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
          {items.map((p, i) => (
            <div key={p.title}>
              <div className={s.feature}>
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <PhaseMedia p={p} i={i} />
                </div>
              </div>
              <h3 className="relative ml-11 mt-8 font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black lg:mt-12">
                <span
                  className={`${s.number} absolute -left-10 top-[7px] flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white/[0.09] text-[12px] leading-[1.5] tracking-[-0.02em] text-black`}
                >
                  {i + 1}
                </span>
                {p.title}
              </h3>
              <p className="relative ml-11 mt-3 text-[16px] leading-[1.65] tracking-[-0.01em] text-black/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
