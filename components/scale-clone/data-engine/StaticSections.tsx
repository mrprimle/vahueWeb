import FlatCta from './FlatCta'
import { CornerGlyph } from './icons'
import s from './dataEngine.module.css'

const ASSET = '/scale-clone/data-engine'

/* ---------- Logo strip: neutral placeholder tiles at Scale's logo sizes ---------- */
// TODO: Vahue customer logos (Scale shows 7 customer marks, brightness-0).
const LOGO_SIZES: [number, number][] = [
  [90, 23],
  [100, 24],
  [100, 20],
  [112, 20],
  [111, 23],
  [60, 24],
  [100, 24],
]

export function LogoStrip() {
  return (
    <section className="pb-14 pt-10 md:pb-20 md:pt-10">
      <div className="mx-auto w-full px-6">
        <div className="w-full overflow-x-auto">
          <ul className="flex min-w-max items-center justify-around gap-12 md:min-w-0 md:gap-10">
            {LOGO_SIZES.map(([w, h], i) => (
              <li key={i} className="flex shrink-0 items-center justify-center">
                <span className="block rounded-[4px] bg-black/10" style={{ width: w, height: h }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- "Best in the business": intro + illustration, 2x2 value cards ---------- */
const VALUES = [
  { title: 'Precision', color: '#79648C', body: 'Placeholder line describing how the work keeps every label accurate and reviewed.' },
  {
    title: 'Efficient Spend',
    color: '#A8927C',
    body: 'Placeholder copy about finding weak spots quickly, sorting them, and putting budget where it moves the result most.',
  },
  {
    title: 'Elastic Capacity',
    color: '#273252',
    body: 'Placeholder copy about supporting small pilot projects through to large production programmes, growing or shrinking on demand.',
  },
  {
    title: 'Breadth',
    color: '#193A29',
    body: 'Placeholder copy about the widest range of sources and formats, so the final system performs better.',
  },
]

export function BestInBusiness() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full px-6">
        <div className="rounded-2xl bg-[#f2f2f2] p-6 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(560px,1.05fr)] lg:items-stretch">
            <div className="flex flex-col justify-between gap-10">
              <div className="max-w-[460px]">
                {/* TODO: Vahue copy */}
                <h2 className={`${s.header3} font-normal text-[#212121]`}>Trusted By Serious Teams</h2>
                <p className={`${s.body2} mt-4 text-[#575757]`}>
                  Placeholder sentence about the leading teams that rely on this engine to move their work forward.
                </p>
              </div>
              <div className="flex min-h-[360px] items-center justify-center lg:min-h-[560px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${ASSET}/the-business.webp`}
                  alt=""
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="h-auto w-full max-w-[760px] object-contain"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
              {VALUES.map((v) => (
                <article key={v.title} className="flex min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-white p-6 md:p-8">
                  <div className="flex items-start justify-between gap-6">
                    {/* TODO: Vahue copy */}
                    <h3 className={`${s.header5} font-normal text-[#212121]`}>{v.title}</h3>
                    <div className="h-[17px] w-[17px] shrink-0" style={{ color: v.color }}>
                      <CornerGlyph className="inline-block h-full w-full align-top" />
                    </div>
                  </div>
                  {/* TODO: Vahue copy */}
                  <p className={`${s.body2} text-[#575757]`}>{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Customer case study ---------- */
export function CaseStudy() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full px-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-[#E7131A] md:min-h-[420px]">
            <div className="flex h-full min-h-[280px] items-center justify-center p-10 md:min-h-[420px]">
              {/* TODO: Vahue customer logo (Scale shows the customer's wordmark, 240x75, inverted) */}
              <span className="block h-[75px] w-[240px] rounded-md bg-white/25" aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-12 p-6 md:p-10 lg:p-12">
            <div>
              {/* TODO: Vahue copy */}
              <p className={`${s.detailMono} font-mono text-[#575757]`}>Customer Case Study</p>
              <h3 className={`${s.header3} mt-4 font-normal text-[#212121]`}>
                A placeholder customer and our team rebuilt their publishing workflow with assistive tools made for a worldwide
                readership.
              </h3>
            </div>
            <FlatCta href="#" variant="fill" theme="black">
              Read the full story
            </FlatCta>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Centered section header (overtitle / title / subtitle) ---------- */
export function SectionHeader({ over, title, sub, className = '' }: { over: string; title: string; sub?: string; className?: string }) {
  return (
    <div className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* TODO: Vahue copy */}
          <div className={`${s.overtitle} font-mono`}>
            <span>{over}</span>
          </div>
          <h2 className={`${s.sectionTitle} font-display font-normal`}>{title}</h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-normal`}>{sub}</p> : null}
      </div>
    </div>
  )
}
