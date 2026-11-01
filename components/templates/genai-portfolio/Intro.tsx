'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { createAnimatedText, mapRange, prefersReducedMotion, type AnimatedText } from './motion'
import { EdgeController, FramePlayer, type Edge } from './framePlayer'
import s from './styles.module.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const ASSET = '/templates/genai-portfolio'

/*
 * SgpIntro ("SgpSteppedVideo"): 600vh section, inner h-dvh pinned for 7 viewports (pinSpacing false), so the
 * next section slides over it for the last viewport.
 *
 * Scale renders three decoded H.264 streams (lines, tris, tris mask; 1920x1388, 30fps, 454 frames) into a
 * three.js quad. Here: two <video> layers (lines + tris*mask pre-multiplied, screen-blended) positioned with
 * the shader's textureContain(uScale, uOffset) maths.
 *
 * Scroll mapping (sgp-intro.json):
 *   entry      ScrollTrigger section "top bottom-=30%" -> "top top": lines frames 00:00 -> 03:03 (0 -> 93)
 *   pinned     start "top top", end "+=7*innerHeight", scrub; progress p -> scrub = min(1, p / (5/7))
 *              lines frame = 93 + scrub * (453 - 93); active step = last edge whose fromMs <= frame
 *              entering a "scrollable" edge plays it on the tris layer (autoNext into its loop edge);
 *              a loop edge only replays when scrolling backwards. tris parked at frame 0 below frame 160.
 *   intro copy scrub <= 0.1 -> headline/body animate in (fade variant body), > 0.1 -> animate out
 *   steps      on step change: previous step animateOut, new step animateIn (title, body +0.2, chip fade 0.5s)
 *   progress   fill scaleX(scrub); track clipped at 18% and rescaled; 8px black ticks at 18/38/59/79%
 *   arrows     scroll to the middle of the step's timeline window (start+end)/2 of (height - innerHeight), with
 *              Lenis.scrollTo(y) and its default lerp easing (Scale's useLenis()); keys ← / → on the focused region
 *   uScale     <=768: 2 (and uOffset tweens per step, 0.5s power2.out); else clamp(.75,1,map(1024..1728)).
 *   uOffset    >1280: (1, 0) (right/bottom aligned); else (0.5, 0.5)
 */

const FPS = 30
const TOTAL = 454
const TEX_W = 1920
const TEX_H = 1388
const SCRUB_FROM = 93 // 03:03
const SCRUB_TO = 453 // 15:03

const EDGES: Record<string, Edge> = {
  '0,0': { activeStepIndex: 0, timelineStartPercent: 0, timelineEndPercent: 18, fromIndex: 0, toIndex: 0, fromMs: '00:00', toMs: '03:03' },
  '0,1': { activeStepIndex: 1, timelineStartPercent: 18, timelineEndPercent: 38, fromIndex: 0, toIndex: 1, fromMs: '05:01', toMs: '06:03', autoNext: true, scrollable: true },
  '1,2': { fromIndex: 1, toIndex: 2, fromMs: '06:03', toMs: '07:18', loop: true },
  '2,3': { activeStepIndex: 2, timelineStartPercent: 38, timelineEndPercent: 59, fromIndex: 2, toIndex: 3, fromMs: '07:18', toMs: '08:20', autoNext: true, scrollable: true },
  '3,4': { fromIndex: 3, toIndex: 4, fromMs: '08:20', toMs: '10:05', loop: true },
  '4,5': { activeStepIndex: 3, timelineStartPercent: 59, timelineEndPercent: 83.22, fromIndex: 4, toIndex: 5, fromMs: '10:05', toMs: '11:07', autoNext: true, scrollable: true },
  '5,6': { fromIndex: 5, toIndex: 6, fromMs: '11:07', toMs: '12:17', loop: true },
  '6,7': { activeStepIndex: 4, timelineStartPercent: 79, timelineEndPercent: 100, fromIndex: 6, toIndex: 7, fromMs: '12:17', toMs: '14:03', autoNext: true, scrollable: true },
  '7,8': { fromIndex: 7, toIndex: 8, fromMs: '14:03', toMs: '15:03', loop: true },
}

const code = (c: string) => {
  const [a, b] = c.split(':').map(Number)
  return a * FPS + b
}
const STEP_EDGES = Object.values(EDGES)
  .filter((e) => typeof e.activeStepIndex === 'number')
  .map((e) => ({ step: e.activeStepIndex as number, p0: (code(e.fromMs) - SCRUB_FROM) / (SCRUB_TO - SCRUB_FROM), edge: e }))
  .sort((a, b) => a.p0 - b.p0)
const TICKS = [18, 38, 59, 79]
const CHIP = ['#273252', '#193a29', '#a8927c', '#79648c'] // atlas-blue, evergreen, foundry-tan, archive-purple
const MOBILE_OFFSETS = [
  { x: 0, y: 1 },
  { x: 0.5, y: 0.5 },
  { x: 1.5, y: 0.5 },
  { x: 0.5, y: 1.5 },
]

// TODO: Vahue copy (4 steps, Scale's lengths)
const STEPS = [
  {
    title: 'Link Sources',
    body: 'Plug into company data across every system it already sits in, wherever that is. The engine pulls it in, tags it and shapes it so models can use it, while every record stays exactly where it lives.',
  },
  {
    title: 'Compose + Run',
    body: 'Launch, host and coordinate agents that reason over your own records. The runtime handles long async jobs, many agents working side by side and any model you pick (and again, no lock-in at all).',
  },
  {
    title: 'Score + Observe',
    body: 'Automatic and human review flows back in so you can tune, debug and lift agent quality through semantic monitoring, eval scores and full trace detail, all visible as it happens.',
  },
  {
    title: 'Learn + Refine',
    body: 'Reviewer input feeds straight back into the model loop as a training signal. Day-to-day telemetry turns into new data, so agents keep improving and your stack keeps up without rebuilds.',
  },
]

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

const Step = forwardRef<StepHandle, { title: string; body: string; current: number }>(function Step(
  { title, body, current },
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
    animateIn(n) {
      const c = chip.current
      if (!c) return
      c.style.backgroundColor = CHIP[Math.max(0, Math.min(n, 4) - 1)]
      const dark = n > 2
      c.dataset.dark = dark ? '1' : '0'
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
          data-dark="0"
          className="group flex w-fit items-center gap-3 rounded px-1.5 py-1.5 md:px-3 md:py-2"
          style={{ backgroundColor: CHIP[0] }}
        >
          <div className="h-2 w-2 bg-white group-data-[dark=1]:bg-black" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
          <p className={`${s.mono} font-mono tracking-[0.05em] text-[#c7c7c7] group-data-[dark=1]:text-black`}>
            {/* TODO: Vahue copy */}
            {`VAP ${Math.min(current, 4)} of 4`}
          </p>
        </div>
        <h2 ref={h} className={`${s.header3} ${s.pending} !leading-none`}>
          {title}
        </h2>
        <div ref={p} className={`${s.pending} h-fit text-sm leading-[21px] tracking-normal text-[#c7c7c7]`}>
          {body}
        </div>
      </div>
    </div>
  )
})

export default function Intro() {
  const section = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const lines = useRef<HTMLVideoElement>(null)
  const tris = useRef<HTMLVideoElement>(null)
  const introH = useRef<HTMLHeadingElement>(null)
  const introP = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const steps = useRef<(StepHandle | null)[]>([])
  const [active, setActive] = useState<number | null>(null)
  const activeRef = useRef<number | null>(null)
  const offset = useRef({ x: 1, y: 0, scale: 1 })

  const layout = useCallback(() => {
    const st = stage.current
    const fr = frame.current
    if (!st || !fr) return
    const W = st.clientWidth
    const H = st.clientHeight
    const r = containRect(W, H, offset.current.scale, offset.current)
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
      const idx = activeRef.current ?? 0
      const m = idx > 0 ? MOBILE_OFFSETS[idx - 1] : { x: 0.5, y: 0.5 }
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
    const n = Math.min(active, 4)
    if (shown.current === n) return
    if (shown.current > 0) steps.current[shown.current - 1]?.animateOut()
    if (n > 0) steps.current[n - 1]?.animateIn(n)
    shown.current = n
    if (window.innerWidth <= 768 && n > 0) {
      const m = MOBILE_OFFSETS[n - 1]
      gsap.to(offset.current, { ...m, duration: 0.5, ease: 'power2.out', overwrite: true, onUpdate: layout })
    }
  }, [active, layout])

  useEffect(() => {
    const root = section.current
    const pinEl = pin.current
    const lv = lines.current
    const tv = tris.current
    if (!root || !pinEl || !lv || !tv) return
    const reduced = prefersReducedMotion()
    const texts: AnimatedText[] = []
    const linesPlayer = new FramePlayer(lv, FPS, TOTAL)
    const trisPlayer = new FramePlayer(tv, FPS, TOTAL)
    const edges = new EdgeController(EDGES, trisPlayer)
    let scrubEdge: Edge | null = null
    let introIn = false
    let introOut = false

    configure()
    const onResize = () => configure()
    window.addEventListener('resize', onResize)

    const setStep = (n: number) => {
      if (activeRef.current === n) return
      activeRef.current = n
      setActive(n)
    }

    const ctx = gsap.context(() => {
      if (introH.current) texts.push(createAnimatedText(introH.current))
      if (introP.current) texts.push(createAnimatedText(introP.current, { variant: 'fade' }))

      if (reduced) {
        // Static: the settled frame of step 1, all copy visible, steps switch through the arrows only.
        linesPlayer.ready.then(() => linesPlayer.setFrame(code('06:03')))
        trisPlayer.ready.then(() => trisPlayer.setFrame(code('06:03')))
        setStep(1)
        return
      }

      // Entry: build-up frames 0 -> 93 while the section rises into view.
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom-=30%',
        end: 'top top',
        onUpdate: (self) => linesPlayer.setFrame(Math.round(self.progress * SCRUB_FROM)),
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
          // active step from the frame edges
          let step = STEP_EDGES[0].step
          STEP_EDGES.forEach((x) => {
            if (t >= x.p0) step = x.step
          })
          setStep(step)
          const f = Math.round(SCRUB_FROM + t * (SCRUB_TO - SCRUB_FROM))
          linesPlayer.setFrame(f)
          const edge =
            Object.values(EDGES).find((x) => f >= code(x.fromMs) && f <= code(x.toMs)) ?? null
          const same =
            (edge === null && scrubEdge === null) ||
            (!!edge && !!scrubEdge && edge.fromIndex === scrubEdge.fromIndex && edge.toIndex === scrubEdge.toIndex)
          scrubEdge = edge
          if (!same && edge) {
            const back = self.direction === -1
            if (edge.scrollable) {
              if (edge.activeStepIndex !== 0) edges.apply(edge.fromIndex, edge.toIndex, { backwards: back })
            } else if (back) edges.apply(edge.fromIndex, edge.toIndex)
          }
          if (f < 160) {
            trisPlayer.stop()
            trisPlayer.setFrame(0)
          }
          if (fill.current) fill.current.style.transform = `scaleX(${t})`
        },
      })
    }, root)

    return () => {
      window.removeEventListener('resize', onResize)
      texts.forEach((t) => t.revert())
      ctx.revert()
      linesPlayer.destroy()
      trisPlayer.destroy()
    }
  }, [configure])

  const go = (delta: number) => {
    const cur = activeRef.current
    if (cur === null) return
    const n = Math.max(0, Math.min(4, cur + delta))
    const root = section.current
    if (!root) return
    const edge = Object.values(EDGES).find((e) => e.activeStepIndex === n)
    if (!edge) return
    const t = ((edge.timelineStartPercent ?? 0) + (edge.timelineEndPercent ?? 0)) / 200
    const lenis = (window as unknown as { __lenis?: { scroll: number; scrollTo: (y: number) => void } }).__lenis
    const top = root.getBoundingClientRect().top + (lenis?.scroll ?? window.scrollY)
    const y = Math.max(0, Math.min(top + t * Math.max(0, root.offsetHeight - window.innerHeight), document.documentElement.scrollHeight - window.innerHeight))
    if (lenis) lenis.scrollTo(y)
    else gsap.to(window, { scrollTo: y, duration: prefersReducedMotion() ? 0 : 1.2, ease: 'power2.inOut', overwrite: true })
    requestAnimationFrame(() => {
      activeRef.current = n
      setActive(n)
    })
  }

  const cur = active ?? 0

  return (
    <div
      ref={section}
      data-qa="intro"
      role="region"
      tabIndex={0}
      aria-label="Platform walkthrough"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        else if (e.key === 'ArrowLeft') go(-1)
      }}
      data-nav-theme="dark"
      className="relative w-full bg-black text-white outline-none"
      style={{ height: '600vh' }}
    >
      <div ref={pin} className="relative flex h-dvh w-full flex-col overflow-hidden md:block">
        <div className="relative z-0 h-[50dvh] min-h-0 w-full shrink-0 md:absolute md:inset-0 md:h-full">
          <div ref={stage} className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div ref={frame} className="absolute">
              <video ref={lines} className="absolute inset-0 h-full w-full object-fill" src={`${ASSET}/intro-lines.mp4`} muted playsInline preload="auto" />
              <video ref={tris} className={`${s.screen} absolute inset-0 h-full w-full object-fill`} src={`${ASSET}/intro-tris.mp4`} muted playsInline preload="auto" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex h-[50dvh] min-h-0 w-full shrink-0 flex-col md:absolute md:left-0 md:right-0 md:top-28 md:h-auto">
          {STEPS.map((st, i) => (
            <Step key={i} ref={(el) => {
              steps.current[i] = el
            }} title={st.title} body={st.body} current={cur} />
          ))}
        </div>

        <div className={`${s.grid} z-10 hidden w-full md:absolute md:top-32 md:grid`}>
          {/* TODO: Vahue copy */}
          <h4 ref={introH} className={`${s.header4} ${s.pending} col-span-6 col-start-2 mb-6 text-balance !leading-none md:col-span-5 md:col-start-2 md:text-left xl:col-span-3`}>
            Keep the whole agent lifecycle under one roof.
          </h4>
          {/* TODO: Vahue copy */}
          <div ref={introP} className={`${s.pending} col-span-6 col-start-2 leading-6 tracking-normal md:col-span-5 md:col-start-2 xl:col-span-3`}>
            Most teams bolt a pile of separate tools together and call that a stack. VAP gives you one shared base, from
            the first data pipeline to live agent tracing, designed to fit together on day one.
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-4 px-6 pb-5 md:grid md:grid-cols-[repeat(12,minmax(0,150px))] md:justify-center md:gap-2 md:pb-6">
          <div className="md:col-span-10 md:col-start-2">
            <div className="flex gap-2">
              <ArrowButton dir="prev" disabled={cur <= 1} onClick={() => go(-1)} />
              <ArrowButton dir="next" disabled={cur >= 4} onClick={() => go(1)} />
            </div>
            <div className="mx-auto mb-0 flex items-end justify-end gap-3 text-[10px] font-medium uppercase leading-[15px] tracking-[0.05em] text-[#575757] md:mb-10">
              <span>Scroll to explore</span>
            </div>
            <div
              className="relative mt-2 h-0.5 w-full overflow-hidden rounded-full bg-[#212121]"
              style={{ clipPath: 'inset(0% 0% 0% 18%)', transformOrigin: 'left center', transform: `scaleX(${100 / 82}) translateX(-18%)` }}
            >
              <div ref={fill} className="h-full w-full origin-left rounded-full bg-[#575757] will-change-transform" style={{ transform: 'scaleX(0)' }} />
              {TICKS.map((t) => (
                <div key={t} className="absolute left-0 top-0 z-10 h-[400px] w-2 -translate-x-1/2 bg-black" style={{ left: `${t}%` }} />
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
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#212121] text-white ${disabled ? '!cursor-default opacity-50' : ''}`}
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
