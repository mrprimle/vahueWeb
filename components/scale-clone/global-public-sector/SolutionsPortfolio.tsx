'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/scale-clone/about/animatedText'
import { CONTAINER, SectionHeader } from './StaticSections'
import type { PortfolioContent } from './content'
import s from './gps.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com AISolutionsGrid (page chunk 25a4rb779kpr2.js module 297990).
 * Desktop (md+): role=table; header row grid-layout-desktop mb-6 (Category col 1-3 / Solutions col 4-12, body2-regular
 *   gray-30); 10 rows `grid-layout-desktop relative py-6`, alternating white / gray-95, each with a 1px gray-80 top rule
 *   (`origin-left scale-x-0`), an 8px category dot, the category as AnimatedText (type lines, mask lines, body1 gray-10)
 *   and solution chips (rounded-lg border gray-80 bg gray-95 px-4 py-2 text-sm gray-30) or "Coming soon" (italic gray-60).
 * Mobile (<md): divide-y list, first 4 categories (7px dots, body2 label, rounded-md chips px-3 py-1), toggle button
 *   "See all 10 categories" / "Show less" with a 12px chevron rotating 0 -> 180deg (transition-transform 200ms).
 * Motion, useScrollTrigger (210104) on the section with the hook defaults start "top 80%" / end "bottom 20%", not
 *   retroactive, once (guard ref):
 *   rules: gsap.fromTo(lines, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", stagger: .12, duration: 1.2,
 *     ease: "power2.out" })
 *   categories: animateIn({ duration: 1.1, ease: "power2.out", delay: .08 i }) -> built-in AnimatedText intro (the
 *     duration/ease options are ignored by the built-in branch).
 * Listeners: React delegated click on the toggle only (REA `[role=table]` ev_c2334221…: none).
 */
export default function SolutionsPortfolio({ content }: { content: PortfolioContent }) {
  const [open, setOpen] = useState(false)
  const section = useRef<HTMLElement>(null)
  const lines = useRef<(HTMLSpanElement | null)[]>([])
  const cats = useRef<(HTMLParagraphElement | null)[]>([])
  const rows = content.rows
  const visible = open ? rows : rows.slice(0, content.mobileVisible)

  useLayoutEffect(() => {
    const el = section.current
    if (!el) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    let cancelled = false
    const ctx = gsap.context(() => {
      if (reduced) gsap.set(lines.current.filter(Boolean), { scaleX: 1 })
    }, el)
    document.fonts.ready.then(() => {
      if (cancelled) return
      cats.current.slice(0, rows.length).forEach((c) => c && texts.push(createAnimatedText(c, { type: 'lines' })))
      if (reduced) return
      let played = false
      ctx.add(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            if (played) return
            played = true
            const ls = lines.current.filter(Boolean)
            if (ls.length) gsap.fromTo(ls, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', stagger: 0.12, duration: 1.2, ease: 'power2.out' })
            texts.forEach((t, i) => t.animateIn({ delay: 0.08 * i }))
          },
        })
      })
    })
    return () => {
      cancelled = true
      texts.forEach((t) => t.revert())
      ctx.revert()
    }
  }, [rows.length])

  return (
    <section ref={section} className="py-20">
      <div className={CONTAINER}>
        <SectionHeader content={{ title: content.title }} showEyebrow={false} className="!mb-12 !max-w-none" />
        <div className="hidden md:block" role="table" aria-label="AI Solutions Portfolio">
          <div className={`${s.gridDesktop} mb-6`} role="row">
            <p className={`${s.body2} col-span-3 font-display text-[var(--gps-fg-3)]`} role="columnheader">
              {content.columns[0]}
            </p>
            <p className={`${s.body2} col-span-9 col-start-4 font-display text-[var(--gps-fg-3)]`} role="columnheader">
              {content.columns[1]}
            </p>
          </div>
          {rows.map((r, i) => (
            <div key={r.category} className={`${s.gridDesktop} relative py-6 ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--gps-card)]'}`} role="row">
              <span
                ref={(e) => {
                  lines.current[i] = e
                }}
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 block h-px origin-left scale-x-0 bg-[var(--gps-line)] will-change-transform"
              />
              <div className="col-span-3 flex items-center gap-3 pl-4" role="cell">
                <span aria-hidden className="inline-block shrink-0 rounded-full" style={{ width: 8, height: 8, backgroundColor: r.color }} />
                <p
                  ref={(e) => {
                    cats.current[i] = e
                  }}
                  className={`${s.body1} ${s.pending} font-display text-[var(--gps-fg-1)]`}
                >
                  {r.category}
                </p>
              </div>
              <div className="col-span-9 col-start-4 flex flex-wrap items-center gap-2 pr-4" role="cell">
                {r.solutions.length === 0 ? (
                  <span className={`${s.body2} font-display italic text-[var(--gps-fg-6)]`}>{content.emptyLabel}</span>
                ) : (
                  r.solutions.map((t) => (
                    <span key={t} className="rounded-lg border border-[var(--gps-line)] bg-[var(--gps-card)] px-4 py-2 font-display text-[14px] leading-[1.5] text-[var(--gps-fg-3)]">
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:hidden">
          <div className="divide-y divide-[var(--gps-line)]">
            {visible.map((r, i) => (
              <div key={r.category} className={`px-4 py-5 ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--gps-card)]'}`}>
                <div className="mb-3 flex items-center gap-2">
                  <span aria-hidden className="inline-block shrink-0 rounded-full" style={{ width: 7, height: 7, backgroundColor: r.color }} />
                  <span className={`${s.body2} font-display text-[var(--gps-fg-1)]`}>{r.category}</span>
                </div>
                {r.solutions.length === 0 ? (
                  <span className={`${s.body2} font-display italic text-[var(--gps-fg-6)]`}>{content.emptyLabel}</span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {r.solutions.map((t) => (
                      <span key={t} className="rounded-md border border-[var(--gps-line)] px-3 py-1 font-display text-[14px] leading-[1.5] text-[var(--gps-fg-3)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {rows.length > content.mobileVisible ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mx-auto mt-6 flex items-center gap-2 font-display text-[14px] leading-[1.5] text-[var(--gps-fg-3)] transition-colors hover:text-[var(--gps-fg-1)]"
            >
              {open ? 'Show less' : `See all ${rows.length} categories`}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-200"
                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden
              >
                <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
