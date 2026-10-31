'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import type { Workflow } from '@/lib/automation-content'
import { Glyph, type GlyphName } from './icons'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion } from './motion'
import styles from './styles.module.css'

// Icons in CONTROL_FEATURES order (review queues, approvals, access, audit log, deployment, dashboard).
const CONTROL_ICONS: GlyphName[] = ['factCheck', 'callSplit', 'shield', 'history', 'cloud', 'dashboard']

type Props = {
  eyebrow: string
  title: ReactNode
  body: ReactNode
  features: { title: string; body: string }[]
} & Pick<Workflow, 'guardrails' | 'tools'>

// Template "Offered as" EnterprisePillars (rlenvironments clone, chunk 1pr295x5wseyf.js, module 909085), on Vahue dark.
// Static left column (mono overtitle, header2, body1, square media). On section `top 80%` (once):
//   icon tile opacity 0 -> 1, 0.5s (gsap default ease)
//   card i after setTimeout(i * 200ms): headline cascade delay 0.2 (word stagger 0.06),
//     subtitle cascade delay 0.4 (word stagger 0.03)
//   divider i: scaleX 0 -> 1, 0.5s, delay 0.2*i + 0.2 (origin left)
// The square looping video is Scale's: it becomes a dot-texture panel with this workflow's own guardrails
// and the systems it runs in. The coloured icon tiles become the neutral Vahue tile.
export default function Guardrails({ eyebrow, title, body, features, guardrails, tools }: Props) {
  const section = useRef<HTMLElement>(null)
  const icons = useRef<(HTMLDivElement | null)[]>([])
  const titles = useRef<(HTMLHeadingElement | null)[]>([])
  const bodies = useRef<(HTMLParagraphElement | null)[]>([])
  const dividers = useRef<(HTMLDivElement | null)[]>([])
  const count = features.length

  useLayoutEffect(() => {
    if (reducedMotion()) {
      gsap.set(dividers.current, { scaleX: 1 })
      return
    }
    let cancelled = false
    const timers: number[] = []
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {
      gsap.set(icons.current, { opacity: 0 })
    }, section)
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const t = titles.current.map((el) => el && prepareCascade(el))
        const b = bodies.current.map((el) => el && prepareCascade(el))
        ;[...t, ...b].forEach((x) => x && splits.push(x.split))
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top 80%',
          end: 'bottom 20%',
          once: true,
          onEnter: () => {
            for (let i = 0; i < count; i++) {
              gsap.fromTo(icons.current[i], { opacity: 0 }, { opacity: 1, duration: 0.5 })
              const d = dividers.current[i]
              if (d) gsap.fromTo(d, { scaleX: 0 }, { scaleX: 1, duration: 0.5, delay: 0.2 * i + 0.2 })
              timers.push(
                window.setTimeout(() => {
                  if (cancelled) return
                  ctx.add(() => {
                    const ti = t[i]
                    const bi = b[i]
                    if (ti) playCascade(ti, 0.2, 0.06)
                    if (bi) playCascade(bi, 0.4, 0.03)
                  })
                }, i * 200),
              )
            }
          },
        })
      })
    })
    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [count])

  return (
    <section ref={section} className="bg-transparent py-24 text-white">
      <div className={styles.gridLayout}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-span-5 md:col-start-2 md:justify-center">
          <p className={`${styles.detailMono} font-mono tracking-[-0.01em] text-white/55`}>{eyebrow}</p>
          <h2 className={`${styles.header2} text-balance !font-normal tracking-[-0.01em] text-white`}>{title}</h2>
          <p className={`${styles.body1} tracking-[-0.01em] text-white/70`}>{body}</p>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border-soft bg-surface">
            <div className="hero-texture absolute inset-0 flex h-full w-full flex-col justify-between gap-8 p-6 md:p-10">
              {guardrails.length ? (
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">On this workflow</p>
                  <ul className="flex flex-col gap-3">
                    {guardrails.map((g) => (
                      <li key={g} className="flex items-start gap-3 text-[20px] leading-[1.35] tracking-[-0.01em] text-white md:text-[26px]">
                        <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60 md:mt-[14px]" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span />
              )}
              {tools.length ? (
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">Integrations</p>
                  <ul aria-label="Integrations" className="flex flex-wrap gap-x-8 gap-y-2">
                    {tools.map((t) => (
                      <li key={t} className="whitespace-nowrap font-display text-[20px] font-normal leading-[1.4] tracking-[-0.01em] text-white/55">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-span-full mt-12 flex flex-col gap-5 md:col-span-4 md:col-start-8 md:mt-0 md:gap-10">
          {features.map((f, i) => (
            <div key={f.title}>
              <article className="flex flex-col">
                <div
                  ref={(el) => {
                    icons.current[i] = el
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-mid bg-white/[0.09]"
                >
                  <span className="flex items-center justify-center text-white">
                    <Glyph name={CONTROL_ICONS[i % CONTROL_ICONS.length]} size={20} />
                  </span>
                </div>
                <div className="flex flex-col items-start gap-6 pt-6">
                  <h3
                    ref={(el) => {
                      titles.current[i] = el
                    }}
                    className={`${styles.header5} w-full text-left !font-normal tracking-[-0.01em] text-white`}
                  >
                    {f.title}
                  </h3>
                  <p
                    ref={(el) => {
                      bodies.current[i] = el
                    }}
                    className="w-full text-left text-[14px] leading-[1.5] tracking-[-0.01em] text-white/70 md:text-[16px]"
                  >
                    {f.body}
                  </p>
                </div>
              </article>
              {i !== features.length - 1 ? (
                <div
                  ref={(el) => {
                    dividers.current[i] = el
                  }}
                  className="mt-5 h-px w-full origin-left scale-x-0 bg-white/[0.12] md:mt-10"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
