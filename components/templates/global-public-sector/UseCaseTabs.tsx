'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { CONTAINER } from './StaticSections'
import { Tick } from './icons'
import type { UseCasesContent } from './content'
import s from './gps.module.css'

/*
 * scale.com UseCaseTabs (page chunk 25a4rb779kpr2.js module 623453).
 * section.relative.py-20.overflow-hidden with `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(113,77,255,.08) 0%,
 * transparent 70%)`; header column (items-center gap-5 mb-12): detail-mono gray-60 overtitle, then
 *   sm+: pill tab bar (`_5VC0Rq_tabs`: 1px border rgba(--marker-color 0,0,0 / .15), radius 100, padding 4, 14/22) with an
 *     absolutely positioned indicator (border rounded-full bg-black/10 border-black/10) gsap.set on mount to tab 0's
 *     offsetLeft / offsetWidth / offsetHeight and gsap.to the active tab on change (.2s power2.inOut). Buttons
 *     px-4 py-2 detail-regular, text-black (active) / text-black/50, `transition-colors 200ms`; a 1px black/20 divider
 *     (`after:`, h-1/2) on every tab but the last, `scale-y-0` next to / on the active one (transition 100ms).
 *   <sm: dots (h-1.5, active bg-black w-5, others bg-black/30 w-1.5, transition width + colour 200ms ease-out).
 * Selecting another tab: content opacity -> 0 (inline `transition: opacity 180ms ease`), after a 180ms timeout swap the
 *   case and fade back to 1; a click during the timeout restarts it.
 * Card: rounded-2xl border gray-80 bg gray-95, lg 2 cols; image `object-contain p-6 lg:p-10 grayscale` in a
 *   min-h-300 / lg 560 box; copy p-8 lg:p-12 gap-6: "01 / 02" detail-mono tabular-nums, h3 header2 gray-10 balance,
 *   subtitle body2 gray-30; stats grid (gap-px on gray-80, cells gray-90 px-4 py-4: header3-regular leading-none value,
 *   detail-regular label); border-t gray-80 pt-5: Challenge + Key Outcomes (tick list).
 * Listeners: React click only (REA ev_961c28f5…: HubSpot mousedown + React click on the tab buttons). No keyboard
 * handling beyond native button focus; `focus:outline-none` on the tabs.
 */
export default function UseCaseTabs({ content }: { content: UseCasesContent }) {
  const { cases } = content
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const marker = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const c = cases[active]

  useLayoutEffect(() => {
    bar.current?.style.setProperty('--marker-color', '0, 0, 0')
  }, [])
  useLayoutEffect(() => {
    const t = tabs.current[0]
    if (t && marker.current) gsap.set(marker.current, { left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight })
  }, [])
  useEffect(() => {
    const t = tabs.current[active]
    if (t && marker.current) gsap.to(marker.current, { left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight, duration: 0.2, ease: 'power2.inOut' })
  }, [active])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const select = (i: number) => {
    if (i === active) return
    if (timer.current !== null) clearTimeout(timer.current)
    setFading(true)
    timer.current = setTimeout(() => {
      setActive(i)
      setFading(false)
      timer.current = null
    }, 180)
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, var(--gps-glow) 0%, transparent 70%)' }} />
      <div className={`${CONTAINER} relative z-10`}>
        <div className="mb-12 flex flex-col items-center gap-5">
          <p className={`${s.detailMono} font-mono text-[var(--gps-fg-6)]`}>{content.overtitle}</p>
          <div className={`${s.noScrollbar} mx-auto hidden w-fit overflow-x-auto px-8 sm:block sm:overflow-x-visible`}>
            <div ref={bar} className={`${s.tabs} relative`}>
              <div ref={marker} className="absolute rounded-full border border-black/10 bg-black/10" />
              {cases.map((uc, i) => (
                <button
                  key={uc.tab}
                  ref={(e) => {
                    tabs.current[i] = e
                  }}
                  type="button"
                  onClick={() => select(i)}
                  className={[
                    `${s.detail} relative cursor-pointer whitespace-nowrap rounded-full px-4 py-2 font-display transition-colors duration-200 focus:outline-none`,
                    i !== cases.length - 1
                      ? 'after:absolute after:right-0 after:top-1/2 after:inline-block after:h-1/2 after:w-px after:-translate-y-1/2 after:bg-black/20 after:transition-transform after:duration-100'
                      : '',
                    active - 1 === i || active === i ? 'after:scale-y-0' : '',
                    active === i ? 'text-black' : 'text-black/50',
                  ].join(' ')}
                >
                  {uc.tab}
                </button>
              ))}
            </div>
          </div>
          {cases.length > 1 ? (
            <div className="mt-1 flex items-center gap-1.5 sm:hidden">
              {cases.map((uc, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={uc.tab}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out ${active === i ? 'w-5 bg-black' : 'w-1.5 bg-black/30'}`}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div
          className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--gps-line)] bg-[var(--gps-card)] lg:grid-cols-2"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 180ms ease' }}
        >
          <div className="relative min-h-[300px] bg-[var(--gps-card)] lg:min-h-[560px]">
            <img key={c.image.src} src={c.image.src} alt={c.image.alt} className="absolute inset-0 h-full w-full object-contain p-6 grayscale lg:p-10" />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <div className="flex flex-col gap-3">
              <span className={`${s.detailMono} font-mono tabular-nums text-[var(--gps-fg-6)]`}>
                {pad(active + 1)} / {pad(cases.length)}
              </span>
              <h3 className={`${s.header2} text-balance font-display text-[var(--gps-fg-1)]`}>{c.title}</h3>
              <p className={`${s.body2} pt-1 font-display text-[var(--gps-fg-3)]`}>{c.subtitle}</p>
            </div>
            {c.stats.length > 0 ? (
              <div className="grid gap-px overflow-hidden rounded-xl bg-[var(--gps-line)]" style={{ gridTemplateColumns: `repeat(${c.stats.length}, 1fr)` }}>
                {c.stats.map((st) => (
                  <div key={st.value} className="flex flex-col gap-1 bg-[var(--gps-card-2)] px-4 py-4">
                    <span className={`${s.header3} font-display !leading-none text-[var(--gps-fg-1)]`}>{st.value}</span>
                    <span className={`${s.detail} font-display text-[var(--gps-fg-3)]`}>{st.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex flex-col gap-4 border-t border-[var(--gps-line)] pt-5">
              <div className="flex flex-col gap-1.5">
                <p className={`${s.detailMono} font-mono text-[var(--gps-fg-6)]`}>{content.challengeLabel}</p>
                <p className={`${s.body2} font-display text-[var(--gps-fg-3)]`}>{c.challenge}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className={`${s.detailMono} font-mono text-[var(--gps-fg-6)]`}>{content.outcomesLabel}</p>
                <ul className="flex flex-col gap-2">
                  {c.outcomes.map((o) => (
                    <li key={o} className={`${s.body2} flex items-start gap-2.5 font-display text-[var(--gps-fg-3)]`}>
                      <Tick />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
