import s from './styles.module.css'

/*
 * scale.com "Features" slice with video cards (chunk 17ea4hx823ss4, module 450359), in the clone's layout and
 * colours (components/scale-clone/enterprise-insurance/VideoFeatures.tsx): 1 col gap 56 -> md 2 cols gap 24 ->
 * lg gap 56; card .feature (radius 12) > 3:2 media, rounded-lg, centred 64px round button bg-black/40 -> hover /60;
 * title mt-8 lg:mt-12 24/36; description mt-3 16/26.4 black/70.
 * Vahue: each card is a verified case. The video poster becomes an own panel (Scale palette tone under the dot
 * texture, own line art, the client and the case's stated metric) and the play button links to the case study.
 */

export type CaseCard = { client: string; metric: string; title: string; body: string; href: string; background: string }

const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Card({ c }: { c: CaseCard }) {
  return (
    <div>
      <div className={s.feature}>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg" style={{ background: c.background }}>
          <span className={`${s.detailMono} absolute left-6 top-6 font-mono text-white/70 md:left-8 md:top-8`}>{c.client}</span>
          <span className="absolute bottom-6 left-6 whitespace-nowrap font-display text-[clamp(1.75rem,0.5rem+2.8vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white md:bottom-8 md:left-8">
            {c.metric}
          </span>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <a
              href={c.href}
              aria-label={`Read the case: ${c.title}`}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/60"
            >
              <Arrow />
            </a>
          </div>
        </div>
      </div>
      <p className={`${s.featureTitle} relative font-display text-black`}>{c.title}</p>
      <p className={`${s.bodyBase} relative mt-3 font-display text-black/70`}>{c.body}</p>
    </div>
  )
}

export default function CaseCards({ items }: { items: CaseCard[] }) {
  return (
    <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-14">
      {items.map((c) => (
        <Card key={c.href} c={c} />
      ))}
    </div>
  )
}
