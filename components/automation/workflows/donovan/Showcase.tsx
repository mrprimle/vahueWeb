'use client'

import { useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { STEP_MOCKS } from './Mocks'
import s from './styles.module.css'

/*
 * scale.com "TabbedContent" (CSS module _5VC0Rq_, headless-ui Tabs).
 * lg+: pill tablist (1px black/15 border, radius 100, p-4px) with an absolute indicator pill (black/10 fill,
 *      black/10 border) sized/positioned to the selected tab by JS (no transition, it jumps). Tab text
 *      black vs black/50, transition-colors 200ms. 1px separators (::after) hide (scale-y-0, 100ms) next to the
 *      selected tab.
 * <lg: tablist hidden; the box is a swipe container (touch-action pan-y) plus dot pagination
 *      (active bar w-4, others w-1 black/40, transition-width 300ms).
 * Panel: grid 1.5fr/2fr (lg) -> 1.2fr/2fr (xl), gap-x 114 at xl; text first on desktop, media first on mobile.
 * Media: black figure p-4 radius 16 with a 1px rgba(209,170,215,.16) border, max-h 400; here it frames a
 * product-UI mock for the step instead of Scale's screenshot.
 * Clone colours (black marker). Five tabs with 2-3 bullets each, as on Scale (no section header).
 */

export type ShowcaseTab = { label: string; bullets: string[] }

export default function Showcase({ tabs: showcase }: { tabs: ShowcaseTab[] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const [ind, setInd] = useState<{ left: number; width: number; height: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active]
      if (!el) return
      setInd({ left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  // Swipe (mobile): horizontal drag > 50px switches tab.
  const start = useRef<number | null>(null)
  const onDown = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse') return
    start.current = e.clientX
  }
  const onUp = (e: ReactPointerEvent) => {
    if (start.current == null) return
    const dx = e.clientX - start.current
    start.current = null
    if (Math.abs(dx) < 50) return
    setActive((a) => Math.min(showcase.length - 1, Math.max(0, a + (dx < 0 ? 1 : -1))))
  }

  const tab = showcase[active]
  const Mock = STEP_MOCKS[active % STEP_MOCKS.length]

  return (
    <section className="bg-transparent py-[72px] lg:py-20">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        <div className={s.tabsWrap}>
          <div className="no-scrollbar mx-auto mb-8 hidden w-fit overflow-x-auto px-8 lg:block lg:overflow-visible">
            <div className={s.tabs} role="tablist" aria-orientation="horizontal">
              {ind ? (
                <div
                  className="absolute rounded-full border border-black/10 bg-black/10"
                  style={{ height: ind.height, width: ind.width, left: ind.left }}
                />
              ) : null}
              {showcase.map((t, i) => (
                <div
                  key={t.label}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  tabIndex={i === active ? 0 : -1}
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') setActive((active + 1) % showcase.length)
                    if (e.key === 'ArrowLeft') setActive((active - 1 + showcase.length) % showcase.length)
                  }}
                  className={`${s.tab} ${i === active || i === active - 1 ? s.tabNoSep : ''} relative cursor-pointer rounded-full px-4 py-2 font-display transition-colors duration-200 focus:outline-none ${
                    i === active ? 'text-black' : 'text-black/50'
                  }`}
                >
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${s.box} ${s.swipe} px-6 py-8 md:px-10 lg:py-12 lg:pl-[58px] lg:pr-0 xl:py-20`}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={() => (start.current = null)}
          >
            <div
              className={`${s.boxGlow} pointer-events-none absolute inset-0 z-0 -translate-y-1/2 select-none opacity-50`}
            />
            <div className="relative z-10 w-full">
              <div
                role="tabpanel"
                className="grid gap-6 md:gap-8 lg:grid-cols-[1.5fr_2fr] lg:items-center lg:gap-8 xl:grid-cols-[1.2fr_2fr] xl:gap-x-[114px]"
              >
                <div className="order-1 text-black lg:order-none">
                  <ul className="my-2 list-none pl-0">
                    {tab.bullets.map((b) => (
                      <li key={b} className={`${s.bullet} font-display`}>
                        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-black/10 bg-black/[0.09] text-black">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                            <path d="M1 4.2 3.6 6.8 9 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="z-10 flex w-full items-center justify-center lg:ml-6">
                  <figure className={`${s.imageBorder} relative w-full max-w-[496px] rounded-2xl bg-black p-4`}>
                    <Mock />
                  </figure>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-2 max-w-max lg:hidden" role="tablist">
            {showcase.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Select tab ${i + 1}: ${t.label}`}
                className="px-1 py-2 sm:px-2"
                onClick={() => setActive(i)}
              >
                <div
                  className={`h-1 rounded-full transition-[width] duration-300 sm:h-1.5 md:h-2 ${
                    i === active ? 'w-4 bg-black sm:w-5 md:w-6' : 'w-1 bg-black/40 sm:w-1.5 md:w-2'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
