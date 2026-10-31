import type { ReactNode } from 'react'
import type { Workflow } from '@/lib/automation-content'
import styles from './styles.module.css'

/** Standard CMS slice: `py-18 lg:py-20 !pt-8 !pb-10 md:!pt-10` around the 1472px shell. */
export function Slice({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/** Centered eyebrow / H2 / lead block. */
export function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance font-display text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-white md:text-[44px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        {lead ? (
          <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-white/70 lg:mt-2 lg:text-[20px]">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** The template's `bg-white/10 rounded-2xl` raster panel, rebuilt as a live dark surface. */
export function Panel({ children, padded = false, className = '' }: { children: ReactNode; padded?: boolean; className?: string }) {
  return (
    <div className={`relative z-10 overflow-hidden rounded-2xl border border-border-soft bg-surface md:overflow-visible ${padded ? 'p-1' : 'p-0'} ${className}`}>
      {children}
    </div>
  )
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">{children}</p>
)

/** Takes the slot of the template's expertise illustration (1188 x 616). */
export function BeforeAfter({ before, after }: Pick<Workflow, 'before' | 'after'>) {
  const cols = [
    { label: 'Before', items: before, dot: 'bg-white/30', text: 'text-white/55' },
    { label: 'After', items: after, dot: 'bg-white', text: 'text-white' },
  ]
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        <Panel>
          <div className="grid grid-cols-1 md:min-h-[420px] md:grid-cols-2 lg:min-h-[560px]">
            {cols.map((c, i) => (
              <div key={c.label} className={`flex flex-col justify-between gap-10 p-8 md:p-12 ${i === 1 ? 'border-t border-border-soft bg-white/[0.02] md:border-l md:border-t-0' : ''}`}>
                <Label>{c.label}</Label>
                <ul className="flex flex-col gap-6">
                  {c.items.map((item) => (
                    <li key={item} className={`flex items-start gap-4 text-[20px] leading-[1.4] tracking-[-0.01em] md:text-[24px] md:leading-[1.33] ${c.text}`}>
                      <span aria-hidden className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full md:mt-[14px] ${c.dot}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Slice>
  )
}

/** Template OverviewSplit: H3 on the left, padded panel on the right (here: how an engagement starts). */
export function OverviewSplit({ statement, phases }: { statement: string; phases: { name: string; length: string; body: string }[] }) {
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 select-none`} />
          <h3 className="relative font-display text-[20px] font-medium leading-[1.625] tracking-[-0.01em] text-white">{statement}</h3>
          <div>
            <Panel padded>
              <div className="rounded-[12px] bg-bg/60 p-6 md:p-8">
                <Label>How we start</Label>
                <ol className="mt-6 flex flex-col">
                  {phases.map((p, i) => (
                    <li key={p.name} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border-soft py-6 last:pb-0">
                      <span className="font-mono text-[12px] leading-6 tracking-[1px] text-white/45">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-white">{p.name}</h4>
                          <span className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">{p.length}</span>
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Slice>
  )
}

/** Template Lifecycle: header + full-width panel (1216 x 637), here the workflow's steps. */
export function Steps({ steps, lead }: Pick<Workflow, 'steps'> & { lead?: string }) {
  const title = `${steps.map((s, i) => (i === 0 ? s.title : s.title.toLowerCase())).join(', ')}.`
  return (
    <Slice>
      <SectionHeader eyebrow="How it works" title={title} lead={lead} />
      <div>
        <Panel>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:min-h-[480px]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col justify-between gap-12 border-border-soft p-8 max-md:[&:not(:first-child)]:border-t md:max-lg:[&:nth-child(n+3)]:border-t md:max-lg:[&:nth-child(even)]:border-l lg:flex-1 lg:p-10 lg:[&:not(:first-child)]:border-l"
              >
                <span className="font-mono text-[12px] leading-6 tracking-[1px] text-white/45">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white">{s.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </Slice>
  )
}

// react-icons Material Design glyphs (MIT): fact check, call split, check circle, lock, history, cloud, insights.
const ICONS: string[] = [
  'M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM10 7H5v2h5V7zm0 4H5v2h5v-2zm0 4H5v2h5v-2zm9.08-5.59L17.66 8l-3.17 3.17-1.41-1.42-1.41 1.41L14.49 14z',
  'M18 3h-5v2h3.59l-3.3 3.29 1.42 1.42L18 6.41V10h2V5c0-1.1-.9-2-2-2zM8 3H3v2h3.59l7.05 7.05c.23.23.36.55.36.88V21h2v-7.07c0-.86-.34-1.67-.95-2.27L8.41 5H12V3H8z',
  'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z',
  'M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z',
]

/** Template Features: icon grid of up to six cards, here the control layer every workflow runs under. */
export function Guardrails({ guardrails, features }: { guardrails: string[]; features: { title: string; body: string }[] }) {
  return (
    <Slice>
      <SectionHeader
        eyebrow="Guardrails"
        title={
          <>
            Agents propose.
            <br />
            Your team stays in control.
          </>
        }
        lead={guardrails.length ? `On this workflow: ${guardrails.map((g, i) => (i === 0 ? g : g.charAt(0).toLowerCase() + g.slice(1))).join('; ')}.` : undefined}
      />
      <div className="!flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {features.map((f, i) => (
          <div key={f.title} className="flex-shrink-0 flex-grow basis-full text-white md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-border-mid bg-white/[0.09] text-white">
                <span className="flex h-6 w-6 items-center justify-center">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                    <path d={ICONS[i % ICONS.length]} />
                  </svg>
                </span>
              </figure>
            </div>
            <div>
              <h4 className="relative mt-6 whitespace-pre-line font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white">{f.title}</h4>
              <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slice>
  )
}
