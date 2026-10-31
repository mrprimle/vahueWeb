import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Workflow } from '@/lib/automation-content'
import type { CaseStudy } from '@/lib/case-studies'
import LogoMarquee from './LogoMarquee'
import s from './styles.module.css'

/*
 * Static sections of the scale.com/automotive layout (copied from the automotive clone), on Vahue dark.
 * None of these have scroll motion on scale.com.
 */

// Scale's `container`: max-w 1280, px 24 -> 32 (lg), centred.
export const CONTAINER = 'mx-auto w-full max-w-[1280px] px-6 lg:px-8'

/* ---------- CMS SectionHeader (centred) ---------- */
export function SectionHeader({ over = '', title, sub }: { over?: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <div className={`${s.sectionHeader} flex max-w-3xl flex-col items-center justify-center text-center`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* The overtitle block keeps its 20px margin even when empty (as on Scale). */}
          <div className={`${s.overtitle} font-mono`}>{over ? <span>{over}</span> : null}</div>
          <h2 className={`${s.sectionTitle} font-display font-normal`}>{title}</h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-display font-normal`}>{sub}</p> : null}
      </div>
    </div>
  )
}

const Mono = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55 ${className}`}>{children}</p>
)

/* ---------- Logo cloud -> integrations: the workflow's tools as wordmarks (row on md+, marquee below) ---------- */
const ToolName = ({ name }: { name: string }) => (
  <span className="block whitespace-nowrap font-display text-[20px] font-normal leading-[1.4] tracking-[-0.01em] text-white/55">{name}</span>
)

export function ToolStrip({ tools }: Pick<Workflow, 'tools'>) {
  if (!tools.length) return null
  return (
    <section className="py-10 md:py-14" aria-label="Integrations">
      <div className="w-full">
        <div className="hidden md:block">
          <ul className={`${CONTAINER} flex items-center justify-around gap-8 sm:min-h-[52px] md:gap-y-16`}>
            {tools.map((t) => (
              <li key={t} className="flex flex-col items-center justify-center gap-3">
                <ToolName name={t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <ul className="sr-only">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <LogoMarquee items={tools.map((t) => <ToolName key={t} name={t} />)} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Overview (ChecklistWithMedia) -> how it works: steps on the left, loop diagram on the right ---------- */
const Check = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor" className={className} aria-hidden>
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)

export function StepsOverview({ steps, title, sub }: Pick<Workflow, 'steps'> & { title: string; sub: string }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader over="How it works" title={title} sub={sub} />
      <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
        <ol className="flex w-full flex-col gap-6 md:w-5/12">
          {steps.map((c, i) => (
            <li key={c.title}>
              <div className="flex flex-row items-start gap-4">
                <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.09]">
                  <Check className="h-3 w-3 text-white/70" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] font-medium leading-6 tracking-[-0.01em] text-white">{c.title}</h3>
                  <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-white/70">{c.body}</p>
                </div>
              </div>
              {i < steps.length - 1 ? <hr className="mt-6 border-white/10" /> : null}
            </li>
          ))}
        </ol>
        <div className="flex w-full justify-center p-2 md:w-7/12">
          <LoopDiagram labels={steps.map((x) => x.title)} />
        </div>
      </div>
    </section>
  )
}

/*
 * Scale's loop diagram (2000 x 1669, rounded tiles joined by arrows), redrawn on dark with the workflow's step
 * names. Three steps keep the template geometry (one tile on top, two below); four close the loop as a 2 x 2.
 */
const BOX_W = 580
const BOX_H = 575
const LAYOUTS: Record<number, { boxes: [number, number][]; arrows: string[] }> = {
  3: {
    boxes: [
      [712, 193],
      [1218, 958],
      [205, 958],
    ],
    arrows: ['M1293 463H1460Q1527 463 1527 530V890', 'M1198 1246H805', 'M489 938V540Q489 463 560 463H655'],
  },
  4: {
    boxes: [
      [205, 193],
      [1218, 193],
      [1218, 958],
      [205, 958],
    ],
    arrows: ['M805 480H1158', 'M1508 788V898', 'M1198 1246H845', 'M495 938V828'],
  },
}

function LoopDiagram({ labels }: { labels: string[] }) {
  const layout = LAYOUTS[labels.length]
  if (!layout) return null
  return (
    <svg viewBox="0 0 2000 1669" className="h-auto w-full rounded-lg" role="img" aria-label={`${labels.join(', ')}, then repeat`}>
      <rect width="2000" height="1669" fill="#fff" fillOpacity="0.04" />
      <defs>
        <marker id="wf-auto-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#fff" fillOpacity="0.4" />
        </marker>
      </defs>
      <g fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="3">
        {layout.arrows.map((d) => (
          <path key={d} d={d} markerEnd="url(#wf-auto-arrow)" />
        ))}
      </g>
      {layout.boxes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={BOX_W} height={BOX_H} rx={72} fill="#0b0b0c" stroke="#fff" strokeOpacity="0.12" strokeWidth="3" />
          <text x={x + BOX_W / 2} y={y + 159} textAnchor="middle" fontSize={40} fill="#fff" fillOpacity="0.45" className="font-mono" letterSpacing="4">
            {String(i + 1).padStart(2, '0')}
          </text>
          <text x={x + BOX_W / 2} y={y + BOX_H / 2 + 40} textAnchor="middle" fontSize={84} fill="#fff" className="font-display" letterSpacing="-1">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ---------- Why (FeaturesWithIcons) -> guardrails: the control layer every workflow runs under ---------- */
// Material outline glyphs (Apache 2.0), 24px grid, in CONTROL_FEATURES order.
const CONTROL_ICONS = [
  'M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM10 7H5v2h5V7zm0 4H5v2h5v-2zm0 4H5v2h5v-2zm9.08-5.59L17.66 8l-3.17 3.17-1.41-1.42-1.41 1.41L14.49 14z',
  'M18 3h-5v2h3.59l-3.3 3.29 1.42 1.42L18 6.41V10h2V5c0-1.1-.9-2-2-2zM8 3H3v2h3.59l7.05 7.05c.23.23.36.55.36.88V21h2v-7.07c0-.86-.34-1.67-.95-2.27L8.41 5H12V3H8z',
  'M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z',
  'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z',
  'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
]

const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)

export function Guardrails({ guardrails, features }: Pick<Workflow, 'guardrails'> & { features: { title: string; body: string }[] }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader
        over="Guardrails"
        title={
          <>
            Agents propose.
            <br />
            Your team stays in control.
          </>
        }
        sub={guardrails.length ? `On this workflow: ${guardrails.map((g, i) => (i === 0 ? g : lowerFirst(g))).join('; ')}.` : undefined}
      />
      <div className="mt-10">
        <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
          {features.map((w, i) => (
            <div key={w.title} className="flex-shrink-0 flex-grow basis-full text-white md:max-w-[368px] lg:basis-1/4">
              <div>
                <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-border-mid bg-white/[0.09] text-white">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden>
                      <path d={CONTROL_ICONS[i % CONTROL_ICONS.length]} />
                    </svg>
                  </span>
                </figure>
              </div>
              <div>
                <h3 className="relative mt-6 whitespace-pre-line font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-white">{w.title}</h3>
                <p className="relative mt-4 text-[16px] leading-6 tracking-[-0.01em] text-white/55">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Foundation model (text + media split) -> one verified case in detail ---------- */
export function FeaturedCase({ caseStudy: c }: { caseStudy: CaseStudy }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader over="Case study" title="One deployment, in detail" />
      <div className="mt-12 flex flex-col items-center gap-16 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <Mono>
            {c.client} · {c.disclosure}
          </Mono>
          <h3 className="font-display text-[30px] font-normal leading-[1.5] tracking-[-0.01em] text-white lg:text-[36px] lg:leading-[1.25]">{c.title}</h3>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-white/55">{c.summary}</p>
          <Link href={`/case-studies/${c.slug}/`} className="mt-2 text-[16px] leading-6 text-white transition-colors duration-150 hover:text-white/60">
            Read the case study →
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <div className="hero-texture flex aspect-[1920/1079] w-full flex-col justify-between gap-6 overflow-hidden rounded-lg border border-border-soft bg-surface p-6 md:p-8">
            <Mono>{c.service}</Mono>
            <div>
              <p className="font-display text-[clamp(2rem,1rem+3vw,3.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-white">{c.metric}</p>
              <ul className="mt-5 hidden flex-col gap-2 sm:flex">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-[14px] leading-[1.5] tracking-[-0.01em] text-white/70">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
