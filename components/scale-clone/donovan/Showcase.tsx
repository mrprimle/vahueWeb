'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type TouchEvent as ReactTouchEvent } from 'react'
import gsap from 'gsap'
import { ASSET, showcase } from './content'
import s from './donovan.module.css'

/*
 * scale.com TabsWithImages (CSS module _5VC0Rq_; chunk 1x2up343t82em.js, module 753553; headless-ui v2 Tabs, chunk 1fzcrwo_jci11.js 970554).
 * lg+: pill tablist (1px black/15 border, radius 100, p-4px) with an absolute indicator pill (black/10 fill,
 *      black/10 border). On every selection change (desktop only) GSAP tweens its left/width/height to the
 *      selected tab: duration 0.2, ease "Power2.inOut", which GSAP doesn't know, so it runs its default
 *      power1.out (rAF samples match power1.out 0.2s). Tab text black vs black/50, transition-colors 200ms.
 *      1px separators (::after) hide (scale-y-0, 100ms) next to the selected tab.
 *      Keyboard (headless-ui, automatic activation): ArrowLeft/Right wrap, Home/PageUp first, End/PageDown last,
 *      focus moves with the selection; Enter/Space select. Click focuses the tab (preventScroll) and selects;
 *      mousedown is prevented. Roving tabIndex; the panel is focusable (tabIndex 0).
 * <lg: tablist hidden; the panels wrapper is a swipe container (touch-action pan-y, user-select none) driven by
 *      touchstart/move/end: start - last move > 50px -> next, < -50px -> previous, no wrap, a tap does nothing.
 *      (On Scale a swipe that starts on the bullet text never fires: its ReactMarkdown `li` override is an inline
 *      component, so every render remounts the <li> under the finger. Here it works from anywhere in the panel.)
 *      Dot pagination: active bar w-4, others w-1 black/40; Scale's `transition-width` isn't a utility, so
 *      `duration-300` alone gives all 0.3s ease.
 * Panel: grid 1.5fr/2fr (lg) -> 1.2fr/2fr (xl), gap-x 114 at xl; text first on desktop, media first on mobile.
 * Image media: black figure p-4 radius 16 with a 1px rgba(209,170,215,.16) border, img max-h 400.
 * Video media on Scale is a Wistia iframe; here it is a neutral aspect-video frame (TODO).
 */

export default function Showcase() {
  const [active, setActive] = useState(0)
  const uid = useId()
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const indRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [mobile, setMobile] = useState(false)
  const [minH, setMinH] = useState<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Indicator: gsap.to(left/width/height), 0.2s, power1.out (Scale's 'Power2.inOut' falls back to the default).
  const activeRef = useRef(active)
  activeRef.current = active
  const moveIndicator = (duration: number) => {
    const ind = indRef.current
    const el = tabRefs.current[activeRef.current]
    if (!ind || !el) return
    gsap.to(ind, { left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight, duration, ease: 'power1.out', overwrite: 'auto' })
  }
  useEffect(() => {
    if (mobile) return
    moveIndicator(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mobile])
  useEffect(() => {
    // Keep it on the tab after webfont swap / resize (Scale's fonts are preloaded, so it never sees this).
    const snap = () => !window.matchMedia('(max-width: 1023px)').matches && moveIndicator(0)
    document.fonts?.ready.then(snap)
    window.addEventListener('resize', snap)
    return () => window.removeEventListener('resize', snap)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mobile: Scale sets the panels wrapper's min-height to the first panel's scrollHeight. On a change it measures
  // the target panel while it is still a hidden placeholder (0), so after the first change min-height is gone
  // (measured: 423px at rest, '' after any dot click or swipe). No visual effect either way.
  const changed = useRef(false)
  useEffect(() => {
    if (active !== 0) changed.current = true
    if (!mobile || changed.current) return setMinH(null)
    const el = panelRef.current
    if (el) setMinH(el.scrollHeight)
  }, [active, mobile])

  const select = (i: number, focus: 'click' | 'key' | false = false) => {
    setActive(i)
    const el = tabRefs.current[i]
    if (focus && el) el.focus(focus === 'click' ? { preventScroll: true } : undefined)
  }
  const onTabKey = (e: ReactKeyboardEvent, i: number) => {
    const n = showcase.length
    let next: number | null = null
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      return select(i)
    }
    if (e.key === 'Home' || e.key === 'PageUp') next = 0
    else if (e.key === 'End' || e.key === 'PageDown') next = n - 1
    else if (e.key === 'ArrowRight') next = (i + 1) % n
    else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n
    if (next == null) return
    e.preventDefault()
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') e.stopPropagation()
    select(next, 'key')
  }

  // Swipe (mobile): Scale's touch handlers on the panels wrapper.
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)
  const onTouchStart = (e: ReactTouchEvent) => {
    touchEnd.current = null
    touchStart.current = e.targetTouches[0].clientX
  }
  const onTouchMove = (e: ReactTouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX
  }
  const onTouchEnd = () => {
    const k = touchStart.current
    const c = touchEnd.current
    if (!k || !c) return
    const d = k - c
    if (d > 50 && active < showcase.length - 1) setActive(active + 1)
    if (d < -50 && active > 0) setActive(active - 1)
  }

  const tab = showcase[active]

  return (
    <section className="bg-transparent py-[72px] lg:py-20">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        <div className={s.tabsWrap}>
          <div className="no-scrollbar mx-auto mb-8 hidden w-fit overflow-x-auto px-8 lg:block lg:overflow-visible">
            <div className={s.tabs} role="tablist" aria-orientation="horizontal">
              <div ref={indRef} className="absolute rounded-full border border-black/10 bg-black/10" />
              {showcase.map((t, i) => (
                <div
                  key={t.label}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  tabIndex={i === active ? 0 : -1}
                  aria-selected={i === active}
                  aria-controls={i === active ? `${uid}-panel` : undefined}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(i, 'click')}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`${s.tab} ${i === active || i === active - 1 ? s.tabNoSep : ''} relative cursor-pointer rounded-full px-4 py-2 font-display transition-colors duration-200 focus:outline-none ${
                    i === active ? 'text-black' : 'text-black/50'
                  }`}
                >
                  {/* TODO: Vahue copy */}
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${s.box} px-6 py-8 md:px-10 lg:py-12 lg:pl-[58px] lg:pr-0 xl:py-20`}
          >
            <div
              className={`${s.boxGlow} pointer-events-none absolute inset-0 z-0 -translate-y-1/2 select-none opacity-50`}
            />
            <div
              className={`relative z-10 w-full ${mobile ? s.swipe : ''}`}
              style={mobile && minH ? { minHeight: `${minH}px` } : undefined}
              onTouchStart={mobile ? onTouchStart : undefined}
              onTouchMove={mobile ? onTouchMove : undefined}
              onTouchEnd={mobile ? onTouchEnd : undefined}
            >
              <div
                ref={panelRef}
                id={`${uid}-panel`}
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`${uid}-tab-${active}`}
                className="grid gap-6 md:gap-8 lg:grid-cols-[1.5fr_2fr] lg:items-center lg:gap-8 xl:grid-cols-[1.2fr_2fr] xl:gap-x-[114px]"
              >
                <div className="order-1 text-black lg:order-none">
                  <ul className="my-2 list-none pl-0">
                    {tab.bullets.map((b) => (
                      <li key={b} className={`${s.bullet} font-display`}>
                        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-black/10 bg-black/[0.09]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${ASSET}/check.svg`} alt="" width={10} height={8} />
                        </span>
                        {/* TODO: Vahue copy */}
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="z-10 flex w-full items-center justify-center lg:ml-6">
                  {tab.media.kind === 'image' ? (
                    <figure className={`${s.imageBorder} relative rounded-2xl bg-black p-4`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tab.media.src}
                        alt=""
                        width={tab.media.width}
                        height={tab.media.height}
                        draggable={false}
                        className="block select-none rounded-2xl object-cover backdrop-blur-xl"
                        style={{ maxWidth: '100%', height: 'auto', maxHeight: 400 }}
                      />
                    </figure>
                  ) : (
                    // TODO: Vahue product video (Scale embeds a Wistia player here).
                    <figure className="relative aspect-video w-full max-w-2xl rounded-2xl">
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/[0.06]">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/80">
                          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                            <path d="M17 10 1 19V1l16 9Z" fill="#fff" />
                          </svg>
                        </span>
                      </div>
                    </figure>
                  )}
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
                  style={{ transition: 'all 0.3s ease' }}
                  className={`h-1 rounded-full sm:h-1.5 md:h-2 ${
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
