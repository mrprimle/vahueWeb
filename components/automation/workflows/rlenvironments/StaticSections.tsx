import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Workflow } from '@/lib/automation-content'
import type { CaseStudy } from '@/lib/case-studies'
import { SectionHeader } from './SectionHeader'
import styles from './styles.module.css'

/*
 * Template "Overview" (rlenvironments clone), inverted to Vahue dark: band py-16 md:py-24, 1472 container,
 * 3-col grid gap 24. Card r16, 1px border; 4/3 media slot; p-6; h3 header5 mb-3; p 14 / 1.625.
 * Here each card is a verified Vahue case. The template's product screenshots are Scale's, so the 4/3 slot
 * is the dark dot-texture panel carrying the case metric. No scroll motion on scale.com.
 */
export function CaseOverview({ eyebrow, title, lead, cases }: { eyebrow: string; title: ReactNode; lead?: ReactNode; cases: CaseStudy[] }) {
  return (
    <section className="border-y border-border-soft bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border-soft bg-bg transition-colors duration-300 ease-out hover:border-border-strong"
            >
              <div className="hero-texture relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden bg-surface p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.05em] text-white/45">
                  {c.client} · {c.disclosure.toLowerCase()}
                </p>
                <p className="font-display text-[clamp(2rem,1.25rem+2vw,3.25rem)] font-light leading-[1.1] tracking-[-0.01em] text-white">{c.metric}</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className={`${styles.header5} mb-3 !font-normal tracking-[-0.01em] text-white`}>{c.title}</h3>
                <p className="text-[14px] leading-[1.625] tracking-[-0.01em] text-white/60">{c.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-white transition-colors duration-300 group-hover:text-white/70">
                  Read the case
                  <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/*
 * Template "Capabilities" side-by-side row (module 497052): py-16 md:py-24; article grid gap-8, lg 2 cols centred
 * gap-16; text max-w-440 space-y-5, h3 24/1.25 -> md 30, 600; p 16 / 1.625; media frame r16, 1px border, p-2,
 * shadow 0 18 60, inner r12. Text side lists today's process; the screenshot slot becomes a dark panel with
 * the result (same split as the physical-ai workflow page).
 */
export function BeforeAfter({ eyebrow, title, lead, before, after }: { eyebrow: string; title: ReactNode; lead?: ReactNode } & Pick<Workflow, 'before' | 'after'>) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="max-w-[440px] space-y-5">
            <h3 className="text-[24px] !font-semibold leading-[1.25] tracking-[-0.01em] text-white md:text-[30px]">Before</h3>
            <ul className="flex flex-col gap-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.625] tracking-[-0.01em] text-white/70">
                  <span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full overflow-hidden rounded-2xl border border-border-mid bg-surface p-2 shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
            <div className="hero-texture flex min-h-[260px] w-full md:aspect-[598/371] md:min-h-0 flex-col justify-between gap-8 overflow-hidden rounded-xl border border-border-soft bg-bg p-6 md:p-10">
              <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">After</p>
              <ul className="flex flex-col gap-4 md:gap-5">
                {after.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[20px] leading-[1.4] tracking-[-0.01em] text-white md:text-[28px] md:leading-[1.3]">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60 md:mt-[16px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
