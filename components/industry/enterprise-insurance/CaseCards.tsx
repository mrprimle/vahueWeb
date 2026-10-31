import s from './styles.module.css'

/*
 * scale.com "Features" slice with video cards (chunk 17ea4hx823ss4, module 450359), on Vahue dark.
 * Grid: 1 col, gap 56 -> md 2 cols gap 24 -> lg 2 cols gap 56 (<= 2 features).
 * Card: .feature (radius 12) > 3:2 media, rounded-lg, centred 64px round button bg-black/40 -> hover /60.
 * Title mt-8 lg:mt-12 24/36; description mt-3 16/26.4.
 * Vahue: each card is a verified case. The video still becomes the dark dot-texture panel showing the case's
 * headline metric, and the play button / modal becomes a link to the case study.
 */

export type CaseCard = { client: string; note: string; metric: string; title: string; body: string; href: string }

const Arrow = () => (
  <svg width={20} height={20} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Card({ c }: { c: CaseCard }) {
  return (
    <a href={c.href} className="group block">
      <div className={s.feature}>
        <div className="hero-texture relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-border-soft bg-surface">
          <div className="absolute left-6 top-6 flex items-center gap-2 md:left-8 md:top-8">
            <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-white/55" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
            <span className={`${s.detailMono} font-mono text-white/55`}>
              {c.client} · {c.note}
            </span>
          </div>
          <p className="absolute bottom-6 left-6 right-6 whitespace-nowrap font-display text-[clamp(1.75rem,0.5rem+2.8vw,3.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-white md:bottom-8 md:left-8">
            {c.metric}
          </p>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 text-white transition-colors group-hover:bg-black/60">
              <Arrow />
            </span>
          </div>
        </div>
      </div>
      <p className={`${s.featureTitle} relative font-display text-white`}>{c.title}</p>
      <p className={`${s.bodyBase} relative mt-3 font-display text-white/70`}>{c.body}</p>
      <span className={`${s.bodyBase} mt-3 inline-flex items-center gap-1 font-display font-medium text-white`}>
        <span className="underline-offset-4 group-hover:underline">Read the case</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </a>
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
