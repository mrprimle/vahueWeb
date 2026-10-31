import type { ReactNode } from 'react'
import type { Workflow } from '@/lib/automation-content'

/*
 * The legacy scale.com section template (physical-ai clone), on Vahue dark.
 * section: pt-16 pb-16 md:pt-20; container max 1280 with 24px / 32px side padding (1216px content at 1440).
 * These sections have no scroll motion on scale.com.
 */

export function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="bg-transparent pb-16 pt-16 md:pt-20">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-8">{children}</div>
    </section>
  )
}

/* Centred header: max-w-3xl, md:mt-12, mb-10. Eyebrow 12/24 mono +1px; H2 30/1.375 -> 48/1.25; subtitle 16 -> 20, lh 1.6. */
export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-balance font-display text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-white md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-white/70 lg:mt-2 lg:text-[20px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

// Material outline glyphs (Apache 2.0), 24px grid.
const ICONS = {
  inbox: 'M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z',
  document: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  factCheck:
    'M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM10 7H5v2h5V7zm0 4H5v2h5v-2zm0 4H5v2h5v-2zm9.08-5.59L17.66 8l-3.17 3.17-1.41-1.42-1.41 1.41L14.49 14z',
  storage: 'M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z',
  trending: 'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
  callSplit:
    'M18 3h-5v2h3.59l-3.3 3.29 1.42 1.42L18 6.41V10h2V5c0-1.1-.9-2-2-2zM8 3H3v2h3.59l7.05 7.05c.23.23.36.55.36.88V21h2v-7.07c0-.86-.34-1.67-.95-2.27L8.41 5H12V3H8z',
  shieldCheck:
    'M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78zm-9.18-.5L7.4 12l3.54 3.54 5.66-5.66-1.41-1.41-4.24 4.24-2.13-2.12z',
  shield: 'M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z',
  history:
    'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  cloud:
    'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z',
} as const
type IconName = keyof typeof ICONS

// Icons in step order (receive, extract, check, write/act, then repeat) and in control-feature order.
const STEP_ICONS: IconName[] = ['inbox', 'document', 'factCheck', 'storage', 'trending']
const CONTROL_ICONS: IconName[] = ['factCheck', 'callSplit', 'shield', 'history', 'cloud', 'trending']

function IconTile({ name }: { name: IconName }) {
  return (
    <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-border-mid bg-white/[0.09] text-white">
      <span className="flex h-6 w-6 items-center justify-center">
        <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden>
          <path d={ICONS[name]} />
        </svg>
      </span>
    </figure>
  )
}

/* Template "Product overview": two columns, icon beside text, gap-x-14 gap-y-12. Here the workflow's steps. */
export function Steps({ steps }: Pick<Workflow, 'steps'>) {
  return (
    <ol className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-row items-start gap-4 text-white">
          <div className="shrink-0">
            <IconTile name={STEP_ICONS[i % STEP_ICONS.length]} />
          </div>
          <div>
            <h3 className="relative mt-0 font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white">
              <span className="mr-3 font-mono text-[12px] leading-6 tracking-[1px] text-white/45 align-middle">{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </h3>
            <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* Template "The difference": wrapping three-up, icon on top; gap 64, md gap-y-20 gap-x-6, xl gap-x-14; items basis 1/4 grow, max 368px. */
export function ControlFeatures({ features }: { features: { title: string; body: string }[] }) {
  return (
    <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
      {features.map((f, i) => (
        <div key={f.title} className="shrink-0 grow basis-full text-white md:max-w-[368px] lg:basis-1/4">
          <div>
            <IconTile name={CONTROL_ICONS[i % CONTROL_ICONS.length]} />
          </div>
          <div>
            <h3 className="relative mt-6 whitespace-pre-line font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white">{f.title}</h3>
            <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">{children}</p>
)

/*
 * Template "Use case" split row (2 cols at lg, gap-8 lg:gap-12, items centred). Text side: today's process;
 * the isometric illustration slot (584 wide, rounded-2xl) becomes a dark panel with the result.
 */
export function BeforeAfter({ before, after }: Pick<Workflow, 'before' | 'after'>) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <h3 className="mb-4 font-display text-[24px] font-medium leading-[1.5] tracking-[-0.01em] text-white">Before</h3>
        <ul className="flex flex-col gap-4">
          {before.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/70">
              <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="relative z-10 overflow-hidden rounded-2xl border border-border-soft bg-surface md:overflow-visible">
          <div className="hero-texture flex min-h-[260px] flex-col justify-between gap-10 rounded-2xl p-8 md:min-h-[306px] md:p-10">
            <Label>After</Label>
            <ul className="flex flex-col gap-5">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[20px] leading-[1.4] tracking-[-0.01em] text-white md:text-[24px] md:leading-[1.33]">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white md:mt-[14px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
