import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Workflow } from '@/lib/automation-content'
import { ChatMock, HandoffMock, QueueMock } from './Mocks'
import s from './styles.module.css'

/*
 * Static sections of the donovan clone on Vahue dark. These have no scroll motion on scale.com.
 * Shell: py-18 lg:py-20 (72 / 80), container max-w 1472 px-6.
 */
export function Section({ children, className = 'py-[72px] lg:py-20' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-transparent ${className}`}>
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/* Overtitle mono 12/24 +1px (mb 20), title 30/1.375 -> 42 (md) -> 48/60 (lg), subtitle 16/1.6 -> 20 (lg), mt 16 -> 8. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tightBottom = false,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  tightBottom?: boolean
}) {
  return (
    <div
      className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center md:mt-12 ${
        tightBottom ? 'mb-10' : 'mb-10 md:mb-20'
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-xs uppercase leading-6 tracking-[1px] text-white/55">
            <span>{eyebrow}</span>
          </div>
          <h2 className={`${s.sectionHeaderTitle} font-display font-normal tracking-[-0.01em] text-white [text-wrap:balance]`}>{title}</h2>
        </div>
        {subtitle ? (
          <p className="mt-4 block w-full text-base font-normal leading-[1.6] tracking-[-0.01em] text-white/70 [text-wrap:balance] lg:mt-2 lg:text-xl lg:leading-[1.6]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/* ---------- Icons (Material Design glyphs, Apache 2.0, 24px grid) redrawn inline ---------- */
export const ICONS = {
  factCheck:
    'M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM10 7H5v2h5V7zm0 4H5v2h5v-2zm0 4H5v2h5v-2zm9.08-5.59L17.66 8l-3.17 3.17-1.41-1.42-1.41 1.41L14.49 14z',
  callSplit:
    'M18 3h-5v2h3.59l-3.3 3.29 1.42 1.42L18 6.41V10h2V5c0-1.1-.9-2-2-2zM8 3H3v2h3.59l7.05 7.05c.23.23.36.55.36.88V21h2v-7.07c0-.86-.34-1.67-.95-2.27L8.41 5H12V3H8z',
  shield:
    'M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z',
  history:
    'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  cloud:
    'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z',
  insights:
    'M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z',
  person:
    'M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z',
  lock:
    'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
  trending: 'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  search:
    'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  play: 'M8 5v14l11-7z',
} as const
export type IconName = keyof typeof ICONS

export const Glyph = ({ name, size = 22 }: { name: IconName; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d={ICONS[name]} />
  </svg>
)

// Mocks module is a client module, so the list is built here (a client-module array is opaque to the server).
const OUTCOME_MOCKS = [ChatMock, HandoffMock, QueueMock]

/* ---------- Product overview -> Before and after: one product-UI card per outcome (aspect 764/560) ---------- */
export function OutcomeCards({ before, after }: Pick<Workflow, 'before' | 'after'>) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {after.map((outcome, i) => {
        const Mock = OUTCOME_MOCKS[i % OUTCOME_MOCKS.length]
        return (
          <div key={outcome}>
            <Mock />
            <p className="mt-8 font-display text-2xl leading-[1.5] tracking-[-0.01em] text-white lg:mt-10">{outcome}</p>
            {before[i] ? (
              <p className="mt-3 text-base leading-[1.65] tracking-[-0.01em] text-white/55">
                <span className="mr-2 font-mono text-[12px] uppercase tracking-[1px] text-white/45">Before</span>
                {before[i]}
              </p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Foundation: top row, a brace, bottom row (flex-wrap, left-aligned like Scale) on a lifted band ---------- */
function FoundationCard({ title, body, icon }: { title: string; body?: string; icon: IconName }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-solid border-border-soft bg-surface p-6 sm:w-[368px]">
      <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg text-white">
        <Glyph name={icon} size={24} />
      </figure>
      <div className="flex flex-col items-center gap-2 self-stretch">
        <p className="text-center font-display text-2xl font-normal leading-8 tracking-[-0.01em] text-white">{title}</p>
        {body ? <p className="text-center text-[14px] leading-[1.5] tracking-[-0.01em] text-white/55">{body}</p> : null}
      </div>
    </div>
  )
}

const Brace = () => (
  <svg viewBox="0 0 687 36" fill="none" aria-hidden="true" className="h-auto w-full max-w-[687px] shrink-0">
    <g opacity="0.45">
      <path
        d="M0.527344 35.1703C0.527344 22.8684 10.5 12.8958 22.8018 12.8958H330.542C337.664 12.8958 343.437 7.12213 343.437 0"
        stroke="#959595"
        strokeWidth="1.05511"
      />
      <path
        d="M686.348 35.1703C686.348 22.8684 676.375 12.8958 664.073 12.8958H356.333C349.211 12.8958 343.438 7.12213 343.438 0"
        stroke="#959595"
        strokeWidth="1.05511"
      />
    </g>
  </svg>
)

type FoundationItem = { title: string; body?: string; icon: IconName }

export function Foundation({
  eyebrow,
  title,
  subtitle,
  top,
  bottom,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  top: FoundationItem[]
  bottom: FoundationItem[]
}) {
  const row = 'flex flex-wrap content-start items-stretch justify-center gap-8 self-stretch rounded-2xl p-6'
  return (
    <div className="border-y border-border-soft bg-white/[0.02]">
      <Section>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="mb-24 flex flex-col items-center gap-6">
          <div className={row}>
            {top.map((c) => (
              <FoundationCard key={c.title} {...c} />
            ))}
          </div>
          <Brace />
          <div className={row}>
            {bottom.map((c) => (
              <FoundationCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

/* ---------- Icon feature grid (template "Overmatch" / "Trusted & Secure") ---------- */
export type Feature = { icon: IconName; title: string; body?: ReactNode; meta?: string; href?: string; linkLabel?: string }

export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  sectionClassName,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  items: Feature[]
  sectionClassName?: string
}) {
  return (
    <Section className={sectionClassName}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} tightBottom />
      <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {items.map((f) => (
          <div key={f.title} className="shrink-0 grow basis-full text-white md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-border-mid bg-white/[0.09] text-white">
                <span className="flex h-6 w-6 items-center justify-center">
                  <Glyph name={f.icon} />
                </span>
              </figure>
            </div>
            <div>
              {f.meta ? <p className="mt-6 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">{f.meta}</p> : null}
              <h3
                className={`relative ${f.meta ? 'mt-1' : 'mt-6'} whitespace-pre-line font-display text-2xl font-normal leading-[1.5] tracking-[-0.01em] text-white`}
              >
                {f.title}
              </h3>
              {f.body ? <p className="relative mt-4 text-base leading-6 tracking-[-0.01em] text-white/55">{f.body}</p> : null}
              {f.href ? (
                <Link
                  href={f.href}
                  className="group mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-white transition-colors duration-300 hover:text-white/70"
                >
                  {f.linkLabel ?? 'Read more'}
                  <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
