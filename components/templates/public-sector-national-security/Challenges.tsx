'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import type { ChallengesContent, ChallengeStep } from './content'
import s from './ns.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com SgpSteppedVideo, componentName "SgpIntro" (chunk 0sni47mcvnqwg.js sha256 0e137e33…, module 154479, the X
 * component) with this page's props: layout "headingPinned", counterLabel "CHALLENGES", 4 steps that all carry an
 * image (so `staticImages`: no WebCodecs frame player, no three.js quad) and an introImage.
 *   height     (1 + scrubViewports) * 100vh, scrubViewports = (steps + 1) * viewportsPerStep(.35) = 1.75 -> 275vh
 *   pin        inner h-dvh, ScrollTrigger "top top" -> "+=" innerHeight * 3.75 (scrubViewports + 2), pin, pinSpacing
 *              false, scrub; progress p -> t = min(1, p / (1.75 / 3.75)) (so t = scroll into the section / 1.75vh)
 *   steps      static windows: step k (1..4) starts at k/5 and ends at (k+1)/5 (the last at 1); active step = last
 *              window whose start <= t (0 before .2); each nav bar fill = scaleX((t - start) / (end - start))
 *   intro      headline (h4, header3-regular) + body1 gray-60 (custom fade animation "H"): animateIn (delays .2 / .5)
 *              when the intro block's "top bottom-=5%" is passed (retroactive), animateOut (delay .1 i) once
 *              t > max(.02, .2 - (phone ? .02 : .06)), back in below it
 *   step copy  on step change: previous out (title, body +.2, chip opacity 1 -> 0 .5s power2.out), new in (title,
 *              body +.2, chip 0 -> 1 .5s power2.out); chip fixed bg-foundry-tan, black text "CHALLENGES n to 4"
 *              where n = the current step (all four chips share it)
 *   images     [introImage, ...steps] stacked, the one at min(step, 4) at opacity 1 (transition-opacity 500ms)
 *   art top    --ns-art-top = bottom of the tallest step / intro child + 16px (ResizeObserver + resize). The steps'
 *              pb-30 only applies below 768 (md:grid-layout-desktop's `padding: 0 1.5rem` overrides it on Scale)
 *   navigation prev / next (disabled at <= 1 / >= 4; both no-ops until the scrub has set a step), the four nav
 *              buttons and ← / → on the focused region scroll with the shared Lenis to the middle of the step window:
 *              top + mid * (height - innerHeight), then set the step on the next frame
 *   theme      setSectionTheme(root, "dark")
 * REA: no listeners on the region node itself (ev_ebecb4cd…): React's root onKeyDown/onClick.
 */

const VIEWPORTS_PER_STEP = 0.35

type LenisLike = { scroll: number; scrollTo: (y: number, o?: { immediate?: boolean }) => void }
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis

type StepHandle = { animateIn: () => void; animateOut: () => void }

const Step = forwardRef<StepHandle, { step: ChallengeStep; label: string; current: number; total: number }>(function Step(
  { step, label, current, total },
  ref,
) {
  const chip = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLParagraphElement>(null)
  const texts = useRef<AnimatedText[]>([])

  useEffect(() => {
    const list = [h.current, p.current].filter(Boolean).map((el) => createAnimatedText(el as HTMLElement))
    texts.current = list
    if (prefersReducedMotion()) gsap.set(chip.current, { opacity: 1 })
    return () => list.forEach((t) => t.revert())
  }, [])

  useImperativeHandle(ref, () => ({
    animateIn() {
      texts.current[0]?.animateIn()
      texts.current[1]?.animateIn({ delay: 0.2 })
      gsap.fromTo(chip.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    },
    animateOut() {
      texts.current[0]?.animateOut()
      texts.current[1]?.animateOut({ delay: 0.2 })
      gsap.fromTo(chip.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
    },
  }))

  return (
    <div className={`${s.grid} absolute inset-0 w-full items-end overflow-y-auto overscroll-y-contain pb-[120px] md:inset-auto md:pb-0 md:top-0 md:items-start md:overflow-visible`}>
      <div className="col-span-full mb-8 flex h-fit flex-col gap-4 md:col-span-5 md:col-start-2 md:mb-0 xl:col-span-3 xl:col-start-2">
        <div ref={chip} className="flex w-fit items-center gap-3 rounded bg-[var(--ns-tan)] px-1.5 py-1.5 opacity-0 md:px-3 md:py-2">
          <div className="h-2 w-2 bg-black" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          <p className={`${s.mono} font-mono !tracking-wider text-black`}>{`${label} ${Math.min(current, total)} to ${total}`}</p>
        </div>
        <h2 ref={h} className={`${s.header3} ${s.pending} !leading-none text-white`}>
          {step.title}
        </h2>
        <div className="h-fit text-sm text-[#C7C7C7]">
          <p ref={p} className={`${s.pending} leading-[21px]`}>
            {step.body}
          </p>
        </div>
      </div>
    </div>
  )
})

export default function Challenges({ content }: { content: ChallengesContent }) {
  const { steps } = content
  const total = steps.length
  const scrubViewports = (total + 1) * VIEWPORTS_PER_STEP
  const pinViewports = scrubViewports + 2
  const windows = steps.map((_, i) => {
    const e = 1 / (total + 1)
    return { step: i + 1, start: (i + 1) * e, end: i + 2 === total + 1 ? 1 : (i + 2) * e }
  })
  const images = [content.introImage, ...steps.map((x) => x.image)]
  const alts = ['', ...steps.map((x) => x.alt)]

  const root = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const stepsWrap = useRef<HTMLDivElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const introH = useRef<HTMLHeadingElement>(null)
  const introP = useRef<HTMLParagraphElement>(null)
  const fills = useRef<(HTMLSpanElement | null)[]>([])
  const stepRefs = useRef<(StepHandle | null)[]>([])
  const [active, setActive] = useState<number | null>(null)
  const activeRef = useRef<number | null>(null)
  const lastScrub = useRef<number | null>(null)

  const setStep = useCallback((n: number) => {
    activeRef.current = n
    setActive(n)
  }, [])

  // --ns-art-top: bottom of the tallest step / intro child (relative to the pinned panel) + 16
  useLayoutEffect(() => {
    const p = pin.current
    if (!p || typeof ResizeObserver === 'undefined') return
    const measure = () => {
      const top = p.getBoundingClientRect().top
      let max = 0
      ;[stepsWrap.current, intro.current].forEach((c) => {
        c?.querySelectorAll(':scope > *').forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.height > 0) max = Math.max(max, r.bottom - top)
        })
      })
      if (max > 0) p.style.setProperty('--ns-art-top', `${Math.round(max + 16)}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ;[stepsWrap.current, intro.current, p].forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // step change: previous out, new in
  const shown = useRef<number | null>(null)
  useEffect(() => {
    if (active === null) return
    const n = Math.min(active, total)
    if (shown.current === n) return
    if (shown.current && shown.current > 0) stepRefs.current[shown.current - 1]?.animateOut()
    if (n > 0) stepRefs.current[n - 1]?.animateIn()
    shown.current = n
  }, [active, total])

  useEffect(() => {
    const el = root.current
    const pinEl = pin.current
    if (!el || !pinEl) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    if (introH.current) texts.push(createAnimatedText(introH.current))
    if (introP.current) texts.push(createAnimatedText(introP.current, { variant: 'fade' }))
    let isIn = false
    let isOut = false
    const animIn = () => {
      texts[0]?.animateIn({ delay: 0.2 })
      texts[1]?.animateIn({ delay: 0.5 })
    }
    const animOut = () => texts.forEach((t, i) => t.animateOut({ delay: 0.1 * i }))

    const ctx = gsap.context(() => {
      if (reduced) {
        setStep(1)
        return
      }
      const threshold = () => Math.max(0.02, windows[0].start - (matchMedia('(max-width: 767px)').matches ? 0.02 : 0.06))
      const onScrub = (t: number) => {
        if (t > threshold()) {
          if (!isOut) {
            if (isIn) animOut()
            isOut = true
            isIn = false
          }
        } else if (!isIn) {
          animIn()
          isIn = true
          isOut = false
        }
        const c = Math.max(0, Math.min(1, t))
        let n = 0
        windows.forEach((w) => {
          if (c >= w.start) n = w.step
        })
        if (n !== lastScrub.current) {
          lastScrub.current = n
          setStep(n)
        }
        windows.forEach((w, i) => {
          const f = fills.current[i]
          if (!f) return
          const len = w.end - w.start
          const q = len > 0 ? (c - w.start) / len : 0
          f.style.transform = `scaleX(${Math.max(0, Math.min(1, q))})`
        })
      }
      ScrollTrigger.create({
        trigger: pinEl,
        start: 'top top',
        end: () => `+=${window.innerHeight * pinViewports}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress
          const k = scrubViewports / pinViewports
          onScrub(p <= k ? p / k : 1)
        },
      })
      // intro block: useScrollTrigger "top bottom-=5%", retroactive
      const st = ScrollTrigger.create({
        trigger: intro.current,
        start: 'top bottom-=5%',
        onEnter: () => {
          if (!isIn && !isOut) {
            isIn = true
            animIn()
          }
        },
      })
      const retro = () => {
        if ((st.progress > 0 || st.scroll() >= st.start - 1) && !isIn && !isOut) {
          isIn = true
          animIn()
        }
      }
      ScrollTrigger.addEventListener('refresh', retro)
      retro()
      return () => ScrollTrigger.removeEventListener('refresh', retro)
    }, el)
    return () => {
      ctx.revert()
      texts.forEach((t) => t.revert())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const go = (n: number) => {
    const el = root.current
    if (!el) return
    const l = lenis()
    const cur = l?.scroll ?? window.scrollY
    const w = windows.find((x) => x.step === n)
    let mid: number
    if (w) mid = (w.start + w.end) / 2
    else if (n > 0) return
    else mid = 0
    mid = Math.max(0, Math.min(1, mid))
    const y = Math.max(0, Math.min(el.getBoundingClientRect().top + cur + mid * Math.max(0, el.offsetHeight - window.innerHeight), document.documentElement.scrollHeight - window.innerHeight))
    if (l) l.scrollTo(y)
    else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    requestAnimationFrame(() => setStep(Math.max(0, Math.min(total, n))))
  }
  const step = (d: number) => {
    if (activeRef.current === null) return
    go(activeRef.current + d)
  }

  const imgIndex = Math.min(active ?? 0, images.length - 1)

  return (
    <div
      ref={root}
      role="region"
      tabIndex={0}
      aria-label={content.headline}
      data-section-theme="dark"
      data-nav-theme="dark"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        else if (e.key === 'ArrowLeft') step(-1)
      }}
      className="SgpIntro relative w-full bg-[var(--ns-dark)] text-white outline-none"
      style={{ height: `${(1 + scrubViewports) * 100}vh` }}
    >
      <div ref={pin} className="relative flex h-dvh w-full flex-col overflow-hidden md:block">
        <div className="relative z-0 h-[50dvh] min-h-0 w-full shrink-0 md:absolute md:inset-0 md:z-0 md:h-full">
          <div className="absolute inset-0 z-[1] max-md:inset-x-6 md:bottom-[3%] md:top-[var(--ns-art-top,max(22%,22rem))] md:mx-auto md:max-h-[50vh] md:max-w-[1472px] md:px-6">
            {images.map((src, i) => (
              <div
                key={i}
                aria-hidden={i !== imgIndex}
                className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${i === imgIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alts[i]} className="absolute inset-0 h-full w-full object-contain object-center md:object-top" />
              </div>
            ))}
          </div>
        </div>

        <div
          ref={stepsWrap}
          className={`${s.grid} relative z-10 flex h-[50dvh] min-h-0 w-full shrink-0 flex-col justify-start overflow-y-auto !px-4 pb-32 pt-4 md:absolute md:left-0 md:right-0 md:top-28 md:z-10 md:h-auto md:min-h-0 md:overflow-visible md:!px-0 md:pb-0 md:pt-0`}
        >
          {steps.map((st, i) => (
            <Step
              key={i}
              ref={(r) => {
                stepRefs.current[i] = r
              }}
              step={st}
              label={content.counterLabel}
              current={active ?? 0}
              total={total}
            />
          ))}
        </div>

        <div ref={intro} className={`${s.grid} absolute bottom-0 left-0 z-10 w-full pb-[120px] md:bottom-auto md:top-32 md:pb-0`}>
          <h4
            ref={introH}
            className={`${s.header3} ${s.pending} col-span-full col-start-1 mb-6 text-balance text-left !leading-none text-white md:col-span-5 md:col-start-2 xl:col-span-3 xl:col-start-2`}
          >
            {content.headline}
          </h4>
          <div className="col-span-full col-start-1 text-left text-[var(--ns-gray-60)] md:col-span-8 md:col-start-2 xl:col-span-6 xl:col-start-2">
            <p ref={introP} className={`${s.body1} ${s.pending}`}>
              {content.body}
            </p>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 z-20 flex w-full flex-col gap-4 px-6 pb-5 md:grid md:grid-cols-[repeat(12,minmax(0,150px))] md:justify-center md:gap-2 md:px-6 md:pb-6`}>
          <div className="col-span-10 col-start-2 opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <ArrowButton dir="prev" disabled={active === null || active <= 1} onClick={() => step(-1)} />
              <ArrowButton dir="next" disabled={active !== null && active >= total} onClick={() => step(1)} />
            </div>
            <nav aria-label={content.headline} className="mt-2 flex w-full gap-2 md:mb-6">
              {steps.map((st, i) => {
                const n = i + 1
                const on = active === n
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(n)}
                    aria-current={on ? 'step' : undefined}
                    className={`flex flex-1 cursor-pointer flex-col gap-2 text-left transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      on ? 'opacity-100' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    <span className={`text-[11px] leading-[1.25] tracking-wide md:truncate md:text-xs md:leading-[1.25] ${on ? 'text-white' : 'text-[var(--ns-gray-60)]'}`}>{st.title}</span>
                    <span className="h-0.5 w-full overflow-hidden rounded-full bg-[#212121]">
                      <span
                        ref={(r) => {
                          fills.current[i] = r
                        }}
                        className="block h-full w-full origin-left rounded-full bg-[#575757] will-change-transform"
                        style={{ transform: 'scaleX(0)' }}
                      />
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowButton({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous step' : 'Next step'}
      className={`arrow-control-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#212121] ${disabled ? '!cursor-default !opacity-50' : ''}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
        <path
          d={
            dir === 'prev'
              ? 'M7.26381 15.7054C7.48251 15.9241 7.83708 15.9241 8.05577 15.7054L8.7134 15.0478C8.93209 14.8291 8.93209 14.4745 8.7134 14.2558L3.2585 8.80094C2.78011 8.32255 2.78011 7.54692 3.2585 7.06853L8.71339 1.61363C8.93209 1.39494 8.93209 1.04036 8.7134 0.82167L8.05577 0.164046C7.83708 -0.0546478 7.48251 -0.0546474 7.26381 0.164046L0.359331 7.06853C-0.119061 7.54692 -0.119061 8.32255 0.359331 8.80094L7.26381 15.7054Z'
              : 'M1.61314 15.7054C1.39445 15.9241 1.03988 15.9241 0.821182 15.7054L0.163558 15.0478C-0.055136 14.8291 -0.0551357 14.4745 0.163558 14.2558L5.61846 8.80094C6.09685 8.32255 6.09685 7.54692 5.61846 7.06853L0.163558 1.61363C-0.0551354 1.39494 -0.0551357 1.04036 0.163558 0.82167L0.821182 0.164046C1.03988 -0.0546478 1.39445 -0.0546474 1.61314 0.164046L8.51762 7.06853C8.99601 7.54692 8.99601 8.32255 8.51762 8.80094L1.61314 15.7054Z'
          }
          fill="white"
        />
      </svg>
    </button>
  )
}
