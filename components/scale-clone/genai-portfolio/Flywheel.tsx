'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, mapRange, prefersReducedMotion, type AnimatedText } from './motion'
import { EdgeController, FramePlayer, type Edge } from './framePlayer'
import s from './styles.module.css'

const ASSET = '/scale-clone/genai-portfolio'

/*
 * SgpFlywheel: section 150vh (overflow clip), inner h-dvh panel pinned "top top" -> "bottom bottom-=50%"
 * (pinSpacing true inside the fixed-height section, so the next section rises over it after 900px).
 *
 * Collapsed (before the pin): grey Background is clipped to the video column (inset left = 1 - video/box),
 * intro headline + copy sit on white to its left, label reads "PERFORMANCE OVER TIME" shifted x = 0.45*width.
 * Pin enter -> expand: a {progress} proxy tweens 0 -> 1 over 2s power3.out and drives
 *   Background clip  inset(0 0 0 lerp(l,0)% round 16px)     steps panel clip inset(0 0 0 map(.2..1,100->0)%)
 *   intro column y   0 -> -100px                            label x 0.45w -> 0, swap span y -100% / 100% -> 0
 *   counter y        100% -> 0                              arrows opacity 0 -> 1
 * Below 1280 the same proxy drives the vertical variant (clip from the top, video y .65*h/2 -> 0, intro y -> -600).
 * Intro copy animates out (delay .1*i) on expand and back in (delay 1 + .1*i) on collapse; arrow buttons scale in.
 * Video (sgp-flywheel-v2, 24fps, 981 frames): scrubbed 00:00 -> 02:02 by "top center-=15%" -> "top top+=1%";
 * step edges (0,1) / (2,3) / (6,7) / (8,9) autoplay with their loop / loop-back edges, as in sgp-flywheel.json.
 */

const FPS = 24
const TOTAL = 981
const EDGES: Record<string, Edge> = {
  '0,1': { fromIndex: 0, toIndex: 1, fromMs: '02:02', toMs: '04:09', autoNext: true },
  '1,2': { fromIndex: 1, toIndex: 2, fromMs: '04:09', toMs: '06:21', loop: true },
  '2,3': { fromIndex: 2, toIndex: 3, fromMs: '06:21', toMs: '08:09', autoNext: true },
  '3,4': { fromIndex: 3, toIndex: 4, fromMs: '08:09', toMs: '10:15', autoNext: true },
  '4,5': { fromIndex: 4, toIndex: 5, fromMs: '10:15', toMs: '13:12', autoNext: true },
  '5,6': { fromIndex: 5, toIndex: 6, fromMs: '13:12', toMs: '16:12', loopBackConditional: '3,4' },
  '6,7': { fromIndex: 6, toIndex: 7, fromMs: '16:12', toMs: '18:13', autoNext: true },
  '7,8': { fromIndex: 7, toIndex: 8, fromMs: '18:13', toMs: '20:12', loop: true },
  '8,9': { fromIndex: 8, toIndex: 9, fromMs: '20:12', toMs: '30:12', autoNext: true },
  '9,10': { fromIndex: 9, toIndex: 10, fromMs: '30:12', toMs: '40:21', loop: true },
}
const STEP_EDGE: Record<number, [number, number]> = { 1: [1, 2], 2: [2, 3], 3: [6, 7], 4: [8, 9] }
const STEP_COLOR = ['#79648c', '#a8927c', '#193a29', '#839cb2'] // archive-purple, foundry-tan, evergreen, cloud-slate

// TODO: Vahue copy (Scale's four steps, similar lengths)
const STEPS = [
  { label: 'Runs turn into data', body: 'Each prompt, choice, and result is logged and organised on its own. No signal goes to waste.' },
  { label: 'People in the loop', body: 'Collect reviewer input and turn raw run signals into clean, well-structured data.' },
  { label: 'Data drives gains', body: 'Live run data becomes focused upgrades; no manual work, no wait.' },
  { label: 'Gains stack up', body: 'Better agents get used more. More use produces better data. The loop keeps turning.' },
]

const Triangle = ({ color }: { color: string }) => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ color }}>
    <path
      d="M10.6884 0H0.652204C0.0720246 0 -0.218065 0.700892 0.192105 1.11106L10.2283 11.1473C10.6385 11.5575 11.3394 11.2667 11.3394 10.6872V0.650964C11.3394 0.291354 11.048 0 10.6884 0Z"
      fill="currentColor"
    />
  </svg>
)

type StepHandle = { animateIn: () => void; animateOut: () => void }

const StepItem = forwardRef<StepHandle, { label: string; body: string; color: string; active: boolean }>(function StepItem(
  { label, body, color, active },
  ref,
) {
  const row = useRef<HTMLDivElement>(null) // the triangle (Scale fades only this; the label is AnimatedText)
  const lab = useRef<HTMLParagraphElement>(null)
  const txt = useRef<HTMLDivElement>(null)
  const texts = useRef<AnimatedText[]>([])
  useEffect(() => {
    const list = [lab.current, txt.current].filter(Boolean).map((el) => createAnimatedText(el as HTMLElement))
    texts.current = list
    if (!prefersReducedMotion()) gsap.set(row.current, { opacity: 0 })
    return () => list.forEach((t) => t.revert())
  }, [])
  useImperativeHandle(ref, () => ({
    animateIn() {
      texts.current[0]?.animateIn()
      gsap.fromTo(row.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      texts.current[1]?.animateIn({ delay: 0.2 })
    },
    animateOut() {
      texts.current[0]?.animateOut()
      texts.current[1]?.animateOut({ delay: 0.2 })
      gsap.fromTo(row.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
    },
  }))
  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full flex-col justify-end gap-16 p-8 pb-32 xl:justify-center xl:p-16 ${active ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="flex items-center gap-2">
          <div ref={row} data-qa="fw-tri" style={{ color }}>
            <Triangle color="currentColor" />
          </div>
          <p ref={lab} className={`${s.mono} ${s.pending} font-mono !leading-none text-[#575757]`}>
            {label}
          </p>
        </div>
        <div ref={txt} className={`${s.pending} text-[24px] leading-[1.2] tracking-[-0.03em] text-black md:text-[32px]`}>
          {body}
        </div>
      </div>
    </div>
  )
})

const NavButton = forwardRef<HTMLButtonElement, { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }>(
  function NavButton({ dir, disabled, onClick }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={dir === 'left' ? 'Previous step' : 'Next step'}
        className={`group/button relative flex aspect-square w-12 items-center justify-center overflow-clip rounded-sm transition-colors duration-300 ${
          disabled ? 'pointer-events-none bg-[#575757] text-[#929292]' : 'pointer-events-auto cursor-pointer bg-black text-white'
        }`}
      >
        <div className="absolute left-0 top-0 h-full w-full origin-bottom scale-y-0 bg-[#575757] transition-transform duration-300 group-hover/button:scale-y-100" />
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="relative z-10" aria-hidden="true">
          <path
            d={
              dir === 'left'
                ? 'M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.914C6.74251 10.7578 6.74251 10.5046 6.5863 10.3483L2.68994 6.45199C2.34823 6.11028 2.34823 5.55626 2.68994 5.21455L6.5863 1.3182C6.74251 1.16199 6.74251 0.908723 6.5863 0.752513L6.11657 0.282781C5.96036 0.126572 5.70709 0.126572 5.55088 0.282782L0.619108 5.21455C0.2774 5.55626 0.277399 6.11028 0.619108 6.45199L5.55088 11.3838Z'
                : 'M2.44912 11.3838C2.29291 11.54 2.03964 11.54 1.88343 11.3838L1.4137 10.914C1.25749 10.7578 1.25749 10.5046 1.4137 10.3483L5.31006 6.45199C5.65177 6.11028 5.65177 5.55626 5.31006 5.21455L1.4137 1.3182C1.25749 1.16199 1.25749 0.908723 1.4137 0.752513L1.88343 0.282781C2.03964 0.126572 2.29291 0.126572 2.44912 0.282782L7.38089 5.21455C7.7226 5.55626 7.7226 6.11028 7.38089 6.45199L2.44912 11.3838Z'
            }
            fill="currentColor"
          />
        </svg>
      </button>
    )
  },
)

export default function Flywheel() {
  const section = useRef<HTMLDivElement>(null)
  const pinEl = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const introCol = useRef<HTMLDivElement>(null)
  const introWrap = useRef<HTMLDivElement>(null)
  const introH = useRef<HTMLHeadingElement>(null)
  const introP = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const labelA = useRef<HTMLSpanElement>(null)
  const labelB = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLParagraphElement>(null)
  const stepsPanel = useRef<HTMLDivElement>(null)
  const arrows = useRef<HTMLDivElement>(null)
  const btnL = useRef<HTMLButtonElement>(null)
  const btnR = useRef<HTMLButtonElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const items = useRef<(StepHandle | null)[]>([])
  const player = useRef<FramePlayer | null>(null)
  const edges = useRef<EdgeController | null>(null)
  const prog = useRef({ progress: 0 })
  const fromButton = useRef(false)
  const prevStep = useRef(1)
  const shown = useRef(-1)

  const [expanded, setExpanded] = useState(false)
  const [step, setStep] = useState(0)

  // proxy -> styles (Scale's ec())
  const apply = () => {
    const box = bg.current
    const vid = media.current
    const col = introCol.current
    const wrap = introWrap.current
    if (!box || !vid || !col || !wrap) return
    const p = prog.current.progress
    const narrow = window.innerWidth < 1280
    const l = (1 - vid.clientWidth / box.clientWidth) * 100
    // Scale (not stepsOnly): the grey box starts just under the intro copy: (A.offsetTop + G.offsetHeight + 32) / box
    const inner = wrap.parentElement as HTMLElement
    const i = narrow ? ((inner.offsetTop + wrap.offsetHeight + 32) / box.clientHeight) * 100 : 0
    const { width: w, height: hh } = box.getBoundingClientRect()
    const half = hh / 2
    const d = mapRange(p, 0, 1, narrow ? i : l, 0)
    const m = mapRange(p, 0.2, 1, 100, 0)
    const v = mapRange(p, 0, 1, 1, 0)
    if (narrow) {
      gsap.set(box, { clipPath: `inset(${d}% 0% 0% 0% round 16px)` })
      gsap.set(stepsPanel.current, { clipPath: `inset(${m}% 0% 0% 0% round 16px)` })
      gsap.set(vid, { y: mapRange(p, 0, 1, 0.65 * half, 0) })
      gsap.set(col, { y: mapRange(p, 0, 1, 0, -600) })
      gsap.set(label.current, { x: 0, y: mapRange(p, 0, 1, 0.9 * half, 0) })
    } else {
      gsap.set(box, { clipPath: `inset(0% 0% 0% ${d}% round 16px)` })
      gsap.set(stepsPanel.current, { clipPath: `inset(0% 0% 0% ${m}% round 16px)` })
      gsap.set(label.current, { x: mapRange(p, 0, 1, (w / 2) * 0.9, 0), y: 0 })
      gsap.set(vid, { y: 0 })
      gsap.set(col, { y: mapRange(p, 0, 1, 0, -100) })
    }
    gsap.set(labelA.current, { yPercent: -100 * p })
    gsap.set(labelB.current, { yPercent: 100 * v })
    gsap.set(counter.current, { yPercent: 100 * v })
    gsap.set(arrows.current, { opacity: p })
  }

  // intro texts
  const introTexts = useRef<AnimatedText[]>([])

  useEffect(() => {
    const root = section.current
    const v = video.current
    if (!root || !v) return
    const reduced = prefersReducedMotion()
    const fp = new FramePlayer(v, FPS, TOTAL)
    player.current = fp
    edges.current = new EdgeController(EDGES, fp)
    const list = [introH.current, introP.current].filter(Boolean).map((el) => createAnimatedText(el as HTMLElement))
    introTexts.current = list

    const expand = () => {
      setExpanded(true)
      setStep((n) => (n > 0 ? n : 1))
    }
    const collapse = () => {
      setExpanded(false)
      setStep(0)
    }

    const ctx = gsap.context(() => {
      apply()
      list.forEach((t) => t.set(true))
      // Scale's mount-time collapse leaves the buttons at opacity 1 / scale .9 (the arrow row itself is at opacity 0)
      gsap.set([btnL.current, btnR.current], { opacity: 1, scale: 0.9 })
      if (reduced) {
        prog.current.progress = 1
        apply()
        gsap.set([btnL.current, btnR.current], { opacity: 1, scale: 1 })
        setExpanded(true)
        setStep(1)
        return
      }
      ScrollTrigger.create({
        trigger: root,
        start: 'top center-=15%',
        end: 'top top+=1%',
        scrub: true,
        onUpdate: (self) => {
          if (self.isActive) {
            fp.stop()
            fp.setFrame(Math.round(self.progress * fp.toFrame('02:02')))
          }
        },
        onLeave: (self) => self.kill(),
      })
      // Scale passes end "bottom bottom-=50%", but its pin spacer measures 450px at 1440x900 (padding-bottom 450, the
      // panel unpins 450px after "top top"), i.e. the pin ends when the 150vh section's bottom meets the viewport
      // bottom. "bottom bottom" reproduces that span (0.5 viewport).
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl.current,
        pinSpacing: true,
        onEnter: () => expand(),
        onEnterBack: () => expand(),
        onLeaveBack: () => collapse(),
      })
    }, root)

    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      list.forEach((t) => t.revert())
      ctx.revert()
      fp.destroy()
    }
  }, [])

  // expand / collapse choreography (Scale's ed() / eu())
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion()) return
    gsap.killTweensOf(prog.current)
    const [hText, pText] = introTexts.current
    if (expanded) {
      gsap.to(prog.current, { progress: 1, duration: 2, ease: 'power3.out', onUpdate: apply })
      ;[btnL.current, btnR.current].forEach((b, i) =>
        gsap.fromTo(b, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 * i + 1 }),
      )
      hText?.animateOut()
      pText?.animateOut({ delay: 0.1 })
    } else {
      gsap.to(prog.current, { progress: 0, duration: 2, ease: 'power3.out', onUpdate: apply })
      ;[btnL.current, btnR.current].forEach((b, i) =>
        gsap.fromTo(b, { opacity: 1, scale: 1 }, { opacity: 1, scale: 0.9, duration: 0.5, ease: 'power3.out', delay: 0.1 * i + 1 }),
      )
      hText?.animateIn({ delay: 1 })
      pText?.animateIn({ delay: 1.1 })
    }
  }, [expanded])

  // step changes: video edge + step copy
  useEffect(() => {
    const ec = edges.current
    const n = Math.min(step, 4)
    const button = fromButton.current
    fromButton.current = false
    if (ec && !prefersReducedMotion()) {
      if (n === 1 && !button) ec.apply(0, 1)
      else if (prevStep.current === 1 && n === 0 && !button) ec.apply(0, 1, { backwards: true })
      else if (button && STEP_EDGE[n]) ec.apply(STEP_EDGE[n][0], STEP_EDGE[n][1], { backwards: n < prevStep.current, noBackwards: true })
    }
    prevStep.current = n
    if (shown.current === n) return
    if (shown.current > 0) items.current[shown.current - 1]?.animateOut()
    if (n > 0) items.current[n - 1]?.animateIn()
    shown.current = n
  }, [step])

  const next = () => {
    const n = Math.min(step + 1, 4)
    if (n !== step) fromButton.current = true
    setStep(n)
  }
  const prev = () => {
    const n = Math.max(step - 1, 1)
    if (n !== step) fromButton.current = true
    setStep(n)
  }

  return (
    <div
      ref={section}
      data-qa="flywheel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') next()
        else if (e.key === 'ArrowLeft') prev()
      }}
      className="relative w-full overflow-clip bg-white text-black outline-none"
      style={{ height: '150vh' }}
    >
      <div ref={pinEl} className={`${s.grid} h-dvh min-h-0 w-full !py-6 md:!py-24`}>
        <div className="relative col-span-full flex h-full w-full flex-col md:col-span-10 md:col-start-2 xl:flex-row">
          <div ref={bg} data-qa="fw-bg" className="absolute left-0 top-0 z-10 h-full w-full bg-[#eaeaea]" />
          <div ref={introCol} className="absolute -z-10 h-full w-full p-8 xl:w-[36%] xl:p-12">
            <div className="flex h-full w-full flex-col justify-start xl:justify-center">
              <div ref={introWrap}>
                {/* TODO: Vahue copy */}
                <h4 ref={introH} className={`${s.header4} ${s.pending} mb-6 text-balance text-center !leading-none xl:text-left`}>
                  The more it runs, the sharper it gets.
                </h4>
                {/* TODO: Vahue copy */}
                <div ref={introP} className={`${s.pending} text-center leading-[1.375] tracking-normal max-sm:text-sm xl:text-left`}>
                  VAP records how work actually gets done, captures expert calls, and keeps lifting agent quality over time.
                  The outcome: agents that give better answers, with no manual retraining rounds to run.
                </div>
              </div>
            </div>
          </div>
          <div
            ref={label}
            data-qa="fw-label"
            className={`${s.mono} absolute left-6 top-6 z-10 w-fit rounded-sm bg-white px-2 py-1 font-mono tracking-[-0.01em] text-black md:left-16 md:top-16`}
          >
            <p className="relative flex flex-col items-center overflow-clip">
              {/* TODO: Vahue copy */}
              <span ref={labelA} className="block">
                Quality over time
              </span>
              <span ref={labelB} className="absolute block">
                The flywheel loop
              </span>
            </p>
          </div>
          <div className="absolute right-6 z-10 flex h-full items-end p-6 xl:right-16 xl:items-start xl:p-16">
            <div className={`${s.mono} mb-6 w-fit overflow-clip rounded-sm font-mono tracking-[-0.01em] text-black xl:mb-0`}>
              <p ref={counter} data-qa="fw-counter" className="relative flex flex-col items-center overflow-clip">
                {`${String(step).padStart(2, '0')} | ${String(STEPS.length).padStart(2, '0')}`}
              </p>
            </div>
          </div>
          <div ref={stepsPanel} data-qa="fw-steps" className="absolute z-20 h-full w-full flex-1 p-8 xl:relative xl:p-12">
            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end p-8 xl:p-16">
              {STEPS.map((st, i) => (
                <StepItem
                  key={i}
                  ref={(el) => {
                    items.current[i] = el
                  }}
                  label={st.label}
                  body={st.body}
                  color={STEP_COLOR[Math.max(0, Math.min(step, 4) - 1)]}
                  active={step === i + 1}
                />
              ))}
              <div ref={arrows} className="relative z-20 flex gap-2 opacity-0">
                <NavButton ref={btnL} dir="left" onClick={prev} disabled={step <= 1} />
                <NavButton ref={btnR} dir="right" onClick={next} disabled={step >= 4} />
              </div>
            </div>
          </div>
          <div
            ref={media}
            className="relative z-10 flex h-[60%] min-w-0 translate-y-[80%] items-center justify-center p-8 mix-blend-darken xl:h-full xl:flex-[1.3] xl:translate-y-0"
          >
            <video ref={video} className="h-full w-full object-contain" src={`${ASSET}/flywheel.mp4`} muted playsInline preload="auto" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
