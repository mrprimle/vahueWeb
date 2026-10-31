'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { createAnimatedText, mapRange, prefersReducedMotion, type AnimatedText } from './motion'
import IntroScene, { TEX_H, TEX_W, type IntroSceneHandle } from './IntroScene'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/*
 * Template SgpIntro ("SgpSteppedVideo") with Vahue's own scene in place of Scale's video streams.
 * 600vh section, inner h-dvh pinned for 7 viewports (pinSpacing false), so the next section slides over it for the
 * last viewport. Same scroll mapping as the template (sgp-intro.json), expressed in the template's frame numbers:
 *   entry      section "top bottom-=30%" -> "top top": scene build-up 0 -> 1 (template frames 0 -> 93)
 *   pinned     start "top top", end "+=7*innerHeight", scrub; p -> scrub = min(1, p / (5/7));
 *              frame = 93 + scrub * 360; active step = last step window whose start frame <= frame.
 *              Entering a step plays its pulse edge, then its loop; below frame 160 the pulses are parked.
 *   intro copy scrub <= 0.1 -> headline/body animate in (fade variant body), > 0.1 -> animate out
 *   steps      on step change: previous step animateOut, new step animateIn (title, body +0.2, chip fade 0.5s)
 *   progress   fill scaleX(scrub); track clipped at 18% and rescaled; 8px ticks at each step window start
 *   arrows     scroll to the middle of the step's timeline window (start+end)/2 of (height - innerHeight)
 *   uScale     <=768: 2 (offset tweens per step, 0.5s power2.out); else clamp(.75,1,map(1024..1728)).
 *   uOffset    >1280: (1, 0); else (0.5, 0.5)
 * Four steps use the template's exact windows; other counts spread the same range evenly.
 */

const SCRUB_FROM = 93
const SCRUB_TO = 453
const PARK_BELOW = 160
// Template step starts (frames 05:01, 07:18, 10:05, 12:17) and timeline windows (percent).
const T_STARTS = [151, 228, 305, 377]
const T_WINDOWS: [number, number][] = [
  [18, 38],
  [38, 59],
  [59, 83.22],
  [79, 100],
]
// Phone camera per step, re-aimed at this scene (sources, question, answer, loop); 0 = before step 1.
const MOBILE_OFFSETS = [
  { x: 0.5, y: 0.5 },
  { x: 0.3, y: 0.5 },
  { x: 1, y: 0.5 },
  { x: 1, y: 0.5 },
  { x: 0.5, y: 0.5 },
]
// Step chips: single-hue dark tints (Vahue palette) in place of Scale's brand colours.
const CHIP = ['#1a1a1c', '#1d1d1f', '#202022', '#1d1d1f']

function windows(n: number) {
  if (n === 4) return { starts: T_STARTS, pct: T_WINDOWS }
  const starts = Array.from({ length: n }, (_, i) => Math.round(T_STARTS[0] + ((T_STARTS[3] - T_STARTS[0]) * i) / Math.max(1, n - 1)))
  const pct = starts.map((f, i): [number, number] => {
    const a = 18 + (82 * i) / n
    return [a, 18 + (82 * (i + 1)) / n]
  })
  return { starts, pct }
}

/** textureContain() from Scale's fragment shader, solved for the rendered rect (CSS px, y down). */
function containRect(W: number, H: number, scale: number, pos: { x: number; y: number }) {
  const s0x = W / Math.max(H, 1)
  const s0y = 1
  const ri = TEX_W / TEX_H
  const nx = s0x > ri ? ri * s0y : s0x
  const ny = s0x > ri ? s0y : s0x / ri
  const sx = (s0x - 0.5) / scale + 0.5
  const sy = (s0y - 0.5) / scale + 0.5
  const kx = nx / sx
  const ky = ny / sy
  const left = pos.x * (1 - kx)
  const bottom = pos.y * (1 - ky)
  return { left: left * W, top: (1 - bottom - ky) * H, width: kx * W, height: ky * H }
}

type StepHandle = { animateIn: (current: number) => void; animateOut: () => void }

const Step = forwardRef<StepHandle, { title: string; body: string; index: number; total: number }>(function Step(
  { title, body, index, total },
  ref,
) {
  const chip = useRef<HTMLDivElement>(null)
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  const texts = useRef<AnimatedText[]>([])

  useEffect(() => {
    const list = [h.current, p.current].filter(Boolean).map((el) => createAnimatedText(el as HTMLElement))
    texts.current = list
    if (!prefersReducedMotion()) gsap.set(chip.current, { opacity: 0 })
    return () => list.forEach((t) => t.revert())
  }, [])

  useImperativeHandle(ref, () => ({
    animateIn() {
      const c = chip.current
      if (!c) return
      texts.current[0]?.animateIn()
      texts.current[1]?.animateIn({ delay: 0.2 })
      if (prefersReducedMotion()) gsap.set(c, { opacity: 1 })
      else gsap.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    },
    animateOut() {
      texts.current[0]?.animateOut()
      texts.current[1]?.animateOut({ delay: 0.2 })
      if (prefersReducedMotion()) gsap.set(chip.current, { opacity: 0 })
      else gsap.fromTo(chip.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
    },
  }))

  return (
    <div className={`${s.grid} pointer-events-none absolute inset-0 w-full items-end !pb-[120px] md:inset-x-0 md:bottom-auto md:top-0 md:items-start md:!pb-0`}>
      <div className="col-span-full mb-8 flex h-fit flex-col gap-4 md:col-span-5 md:col-start-2 md:mb-0 xl:col-span-3 xl:col-start-2">
        <div
          ref={chip}
          className="flex w-fit items-center gap-3 rounded border border-border-soft px-1.5 py-1.5 md:px-3 md:py-2"
          style={{ backgroundColor: CHIP[index % CHIP.length] }}
        >
          <div className="h-2 w-2 bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          <p className={`${s.mono} font-mono tracking-[0.05em] text-white/70`}>{`Step ${index + 1} of ${total}`}</p>
        </div>
        <h3 ref={h} className={`${s.header3} ${s.pending} !leading-none`}>
          {title}
        </h3>
        <div ref={p} className={`${s.pending} h-fit text-sm leading-[21px] tracking-normal text-white/70`}>
          {body}
        </div>
      </div>
    </div>
  )
})

type Props = {
  heading: string
  body: string
  steps: { title: string; body: string }[]
  sources: string[]
}

export default function Intro({ heading, body, steps, sources }: Props) {
  const n = steps.length
  const { starts, pct } = useMemo(() => windows(n), [n])
  const stepStarts = useMemo(() => starts.map((f) => (f - SCRUB_FROM) / (SCRUB_TO - SCRUB_FROM)), [starts])
  const tags = useMemo(() => steps.map((st) => st.title), [steps])

  const section = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const scene = useRef<IntroSceneHandle>(null)
  const introH = useRef<HTMLHeadingElement>(null)
  const introP = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(StepHandle | null)[]>([])
  const [active, setActive] = useState<number | null>(null)
  const activeRef = useRef<number | null>(null)
  const offset = useRef({ x: 1, y: 0, scale: 1 })

  const layout = useCallback(() => {
    const st = stage.current
    const fr = frame.current
    if (!st || !fr) return
    const r = containRect(st.clientWidth, st.clientHeight, offset.current.scale, offset.current)
    fr.style.left = `${r.left}px`
    fr.style.top = `${r.top}px`
    fr.style.width = `${r.width}px`
    fr.style.height = `${r.height}px`
  }, [])

  const configure = useCallback(() => {
    const w = window.innerWidth
    const c = gsap.utils.clamp(0.75, 1, mapRange(w, 1024, 1728, 0.75, 1, false))
    const o = offset.current
    if (w <= 768) {
      o.scale = 2
      const m = MOBILE_OFFSETS[Math.min(activeRef.current ?? 0, 4)]
      o.x = m.x
      o.y = m.y
    } else if (w <= 1280) {
      o.scale = c
      o.x = 0.5
      o.y = 0.5
    } else {
      o.scale = c
      o.x = 1
      o.y = 0
    }
    layout()
  }, [layout])

  // Steps: previous out, new in (Scale's effect on activeStepIndex)
  const shown = useRef(-1)
  useEffect(() => {
    if (active === null) return
    const k = Math.min(active, n)
    if (shown.current === k) return
    if (shown.current > 0) stepRefs.current[shown.current - 1]?.animateOut()
    if (k > 0) stepRefs.current[k - 1]?.animateIn(k)
    shown.current = k
    if (window.innerWidth <= 768) {
      const m = MOBILE_OFFSETS[Math.min(k, 4)]
      gsap.to(offset.current, { ...m, duration: 0.5, ease: 'power2.out', overwrite: true, onUpdate: layout })
    }
  }, [active, layout, n])

  useEffect(() => {
    const root = section.current
    const pinEl = pin.current
    const sc = scene.current
    if (!root || !pinEl || !sc) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    let scrubStep = -1
    let introIn = false
    let introOut = false

    configure()
    const onResize = () => configure()
    window.addEventListener('resize', onResize)

    const setStep = (k: number) => {
      if (activeRef.current === k) return
      activeRef.current = k
      setActive(k)
    }

    const ctx = gsap.context(() => {
      if (introH.current) texts.push(createAnimatedText(introH.current))
      if (introP.current) texts.push(createAnimatedText(introP.current, { variant: 'fade' }))

      if (reduced) {
        // Static: the settled scene of step 1, all copy visible, steps switch through the arrows only.
        sc.setEntry(1)
        sc.setProgress(stepStarts[0] + 0.05, stepStarts)
        setStep(1)
        return
      }

      sc.setEntry(0)
      sc.setProgress(0, stepStarts)

      // Entry: build-up while the section rises into view.
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom-=30%',
        end: 'top top',
        onUpdate: (self) => sc.setEntry(self.progress),
        onRefresh: (self) => sc.setEntry(self.progress),
      })

      const SEG = 5 / 7
      ScrollTrigger.create({
        trigger: pinEl,
        start: 'top top',
        end: () => `+=${window.innerHeight * 7}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress
          const e = p <= SEG ? p / SEG : 1
          // intro copy
          if (e > 0.1) {
            if (!introOut) {
              if (introIn) {
                texts[0]?.animateOut()
                texts[1]?.animateOut({ delay: 0.1 })
              }
              introOut = true
              introIn = false
            }
          } else if (!introIn) {
            texts[0]?.animateIn()
            texts[1]?.animateIn({ delay: 0.1 })
            introIn = true
            introOut = false
          }
          const t = Math.max(0, Math.min(1, e))
          const f = Math.round(SCRUB_FROM + t * (SCRUB_TO - SCRUB_FROM))
          // active step from the step windows (0 = intro)
          let k = 0
          starts.forEach((x, i) => {
            if (f >= x) k = i + 1
          })
          setStep(k)
          sc.setEntry(1)
          sc.setProgress(t, stepStarts)
          if (k !== scrubStep) {
            const back = self.direction === -1
            if (k > 0 && f >= PARK_BELOW) sc.playStage(Math.min(k, 4), back && k < scrubStep)
            scrubStep = k
          }
          if (f < PARK_BELOW) {
            sc.park()
            scrubStep = 0
          }
          if (fill.current) fill.current.style.transform = `scaleX(${t})`
        },
      })
    }, root)

    return () => {
      window.removeEventListener('resize', onResize)
      texts.forEach((t) => t.revert())
      ctx.revert()
      sc.park()
    }
  }, [configure, starts, stepStarts])

  const go = (delta: number) => {
    const cur = activeRef.current
    if (cur === null) return
    const k = Math.max(1, Math.min(n, cur + delta))
    const root = section.current
    if (!root) return
    const w = pct[k - 1]
    if (!w) return
    const t = (w[0] + w[1]) / 200
    const top = root.getBoundingClientRect().top + window.scrollY
    const y = Math.min(top + t * Math.max(0, root.offsetHeight - window.innerHeight), document.documentElement.scrollHeight - window.innerHeight)
    gsap.to(window, { scrollTo: y, duration: prefersReducedMotion() ? 0 : 1.2, ease: 'power2.inOut', overwrite: true })
    requestAnimationFrame(() => {
      activeRef.current = k
      setActive(k)
    })
  }

  const cur = active ?? 0
  const ticks = pct.map((w) => w[0])

  return (
    <div
      ref={section}
      role="region"
      tabIndex={0}
      aria-label="How it works, step by step"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        else if (e.key === 'ArrowLeft') go(-1)
      }}
      className="relative w-full bg-bg text-white outline-none"
      style={{ height: '600vh' }}
    >
      <div ref={pin} className="relative flex h-dvh w-full flex-col overflow-hidden md:block">
        <div className="relative z-0 h-[50dvh] min-h-0 w-full shrink-0 md:absolute md:inset-0 md:h-full">
          <div ref={stage} className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div ref={frame} className="absolute">
              <IntroScene ref={scene} sources={sources} tags={tags} />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex h-[50dvh] min-h-0 w-full shrink-0 flex-col md:absolute md:left-0 md:right-0 md:top-28 md:h-auto">
          {steps.map((st, i) => (
            <Step
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              title={st.title}
              body={st.body}
              index={i}
              total={n}
            />
          ))}
        </div>

        <div className={`${s.grid} z-10 hidden w-full md:absolute md:top-32 md:grid`}>
          <h2 ref={introH} className={`${s.header4} ${s.pending} col-span-6 col-start-2 mb-6 text-balance !leading-none md:col-span-5 md:col-start-2 md:text-left xl:col-span-3`}>
            {heading}
          </h2>
          <div ref={introP} className={`${s.pending} col-span-6 col-start-2 leading-6 tracking-normal text-white/70 md:col-span-5 md:col-start-2 xl:col-span-3`}>
            {body}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-4 px-6 pb-5 md:grid md:grid-cols-[repeat(12,minmax(0,150px))] md:justify-center md:gap-2 md:pb-6">
          <div className="md:col-span-10 md:col-start-2">
            <div className="flex gap-2">
              <ArrowButton dir="prev" disabled={cur <= 1} onClick={() => go(-1)} />
              <ArrowButton dir="next" disabled={cur >= n} onClick={() => go(1)} />
            </div>
            <div className="mx-auto mb-0 flex items-end justify-end gap-3 text-[10px] font-medium uppercase leading-[15px] tracking-[0.05em] text-white/45 md:mb-10">
              <span>Scroll to explore</span>
            </div>
            <div
              className="relative mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.12]"
              style={{ clipPath: 'inset(0% 0% 0% 18%)', transformOrigin: 'left center', transform: `scaleX(${100 / 82}) translateX(-18%)` }}
            >
              <div ref={fill} className="h-full w-full origin-left rounded-full bg-white/60 will-change-transform" style={{ transform: 'scaleX(0)' }} />
              {ticks.map((t) => (
                <div key={t} className="absolute left-0 top-0 z-10 h-[400px] w-2 -translate-x-1/2 bg-bg" style={{ left: `${t}%` }} />
              ))}
            </div>
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
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border-soft bg-white/[0.06] text-white transition-colors duration-300 hover:bg-white/[0.12] ${disabled ? '!cursor-default opacity-50' : ''}`}
    >
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
        <path
          d={
            dir === 'prev'
              ? 'M7.26381 15.7054C7.48251 15.9241 7.83708 15.9241 8.05577 15.7054L8.7134 15.0478C8.93209 14.8291 8.93209 14.4745 8.7134 14.2558L3.2585 8.80094C2.78011 8.32255 2.78011 7.54692 3.2585 7.06853L8.71339 1.61363C8.93209 1.39494 8.93209 1.04036 8.7134 0.82167L8.05577 0.164046C7.83708 -0.0546478 7.48251 -0.0546474 7.26381 0.164046L0.359331 7.06853C-0.119061 7.54692 -0.119061 8.32255 0.359331 8.80094L7.26381 15.7054Z'
              : 'M1.61314 15.7054C1.39445 15.9241 1.03988 15.9241 0.821182 15.7054L0.163558 15.0478C-0.055136 14.8291 -0.0551357 14.4745 0.163558 14.2558L5.61846 8.80094C6.09685 8.32255 6.09685 7.54692 5.61846 7.06853L0.163558 1.61363C-0.0551354 1.39494 -0.0551357 1.04036 0.163558 0.82167L0.821182 0.164046C1.03988 -0.0546478 1.39445 -0.0546474 1.61314 0.164046L8.51762 7.06853C8.99601 7.54692 8.99601 8.32255 8.51762 8.80094L1.61314 15.7054Z'
          }
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
