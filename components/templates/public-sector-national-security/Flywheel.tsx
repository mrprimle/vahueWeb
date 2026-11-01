'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { Triangle12 } from './icons'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import { mapRange, retroEnter } from './scroll'
import type { FlywheelContent, FlywheelStep } from './content'
import s from './ns.module.css'

/*
 * scale.com SgpSteppedVideo, componentName "SgpFlywheel" (chunk 0sni47mcvnqwg.js, module 154479, the H component) with
 * this page's props: layout "stepsOnly", hideProcessLabel, no intro copy, 4 steps that all carry an image (so the
 * WebCodecs / three.js frame scene stays hidden and the step images cross-fade instead).
 * stepsOnly: no 150vh height and no pin; the current step starts at 1; the panel only ever expands.
 *   expand     useScrollTrigger(root, "top bottom-=25%", retroactive) -> expanded = true. A {progress} proxy tweens
 *              0 -> 1 over 2s power3.out (collapsed state = 0 on mount) and drives (ec):
 *              >= 1280  grey Background clip inset(0 0 0 lerp(1 - media/box, 0)% round 16px), steps panel clip
 *                       inset(0 0 0 map(.2..1, 100 -> 0)% round 16px)
 *              <  1280  Background clip inset(lerp(1 - mediaH/boxH, 0)% 0 0 0 round 16px), steps panel clip from the
 *                       top, media y .65 * boxH / 2 -> 0 px
 *              arrows opacity = progress, counter yPercent 100 -> 0
 *              arrow buttons animateIn (opacity 0 / scale .9 -> 1 / 1, .5s power3.out, delay 1 + .1 i); on mount the
 *              collapse leaves them at opacity 1 / scale .9 (inside the row at opacity 0)
 *   steps      on a step change (once expanded): previous step animateOut, new step animateIn:
 *              label AnimatedText + triangle opacity 0 -> 1 (.5s power2.out), paragraphs animateIn(+.2); when they are
 *              done the "Learn more" link rises (yPercent 100 / opacity 0 -> 0 / 1, .85s power2.out); out: label,
 *              paragraphs (+.2), link yPercent -100 / opacity 0 (.35s power2.in), triangle 1 -> 0
 *   images     [introImage (none), ...steps]: the image at index = current step at opacity 1 (transition 500ms)
 *   controls   48px buttons (bg black, hover fill scale-y 0 -> 1 from the bottom, 300ms; disabled gray-30 / gray-60,
 *              pointer-events none), ← / → on the focused root; counter "01 | 04"
 * Page CSS lBBaeq: >= 1280 the panel is min-height clamp(792px, 1362px - 29.7vw, 982px) (max-height 900 loses), the
 *   second paragraph pulls up 1.5rem (1rem below 1280); < 1280 paragraphs are 17/24, the image max-height 240 and
 *   the step copy starts at padding-top calc(4.5rem + 240px).
 */

type LinkHandle = { animateIn: () => void; animateOut: () => void }

const StepItem = forwardRef<LinkHandle, { step: FlywheelStep; active: boolean }>(function StepItem({ step, active }, ref) {
  const tri = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLParagraphElement>(null)
  const paras = useRef<(HTMLHeadingElement | null)[]>([])
  const link = useRef<HTMLDivElement>(null)
  const texts = useRef<{ label: AnimatedText | null; paras: AnimatedText[] }>({ label: null, paras: [] })
  const token = useRef(0)

  useEffect(() => {
    const l = label.current ? createAnimatedText(label.current) : null
    const p = paras.current.filter(Boolean).map((el) => createAnimatedText(el as HTMLElement))
    texts.current = { label: l, paras: p }
    if (prefersReducedMotion()) gsap.set([tri.current, link.current], { opacity: 1 })
    return () => {
      l?.revert()
      p.forEach((t) => t.revert())
    }
  }, [])

  useImperativeHandle(ref, () => ({
    animateIn() {
      const n = ++token.current
      texts.current.label?.animateIn()
      gsap.fromTo(tri.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      const tls = texts.current.paras.map((t) => t.animateIn({ delay: 0.2 })).filter((t): t is gsap.core.Timeline => !!t)
      Promise.all(tls.map((t) => t.then())).then(() => {
        if (n !== token.current || !link.current) return
        gsap.fromTo(link.current, { yPercent: 100, opacity: 0 }, { duration: 0.85, ease: 'power2.out', yPercent: 0, opacity: 1, overwrite: 'auto' })
      })
    },
    animateOut() {
      texts.current.label?.animateOut()
      texts.current.paras.forEach((t) => t.animateOut({ delay: 0.2 }))
      token.current += 1
      if (link.current) gsap.to(link.current, { duration: 0.35, ease: 'power2.in', yPercent: -100, opacity: 0, overwrite: 'auto' })
      gsap.fromTo(tri.current, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' })
    },
  }))

  return (
    <div
      className={`${s.fwStep} absolute left-0 top-0 flex h-full w-full flex-col justify-start gap-16 p-8 pb-32 xl:p-16 ${active ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="flex items-center gap-2">
          <div ref={tri} className="text-[var(--ns-gray-30)] opacity-0">
            <Triangle12 />
          </div>
          <p ref={label} className={`${s.mono} ${s.pending} font-mono !leading-none text-[var(--ns-gray-30)]`}>
            {step.title}
          </p>
        </div>
        {step.paragraphs.map((text, i) => (
          <div key={i} className={`RichText ${i > 0 ? s.fwNext : ''}`}>
            <h4
              ref={(r) => {
                paras.current[i] = r
              }}
              className={`${s.header4} ${s.fwPara} ${s.pending} text-black`}
            >
              {text}
            </h4>
          </div>
        ))}
        {step.link ? (
          <div className="mt-2">
            <div className="my-[-0.12em] overflow-clip py-[0.12em]">
              <div ref={link} className="opacity-0">
                <a href={step.link.href} className={`${s.textLink} group`} aria-label={step.link.label}>
                  <span>{step.link.label}</span>
                  <span className={s.textArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})

type ArrowHandle = { animateIn: (d: number) => void; animateOut: (d: number) => void }

const NavButton = forwardRef<ArrowHandle, { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }>(function NavButton(
  { dir, disabled, onClick },
  ref,
) {
  const el = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => ({
    animateIn(delay) {
      if (el.current) gsap.fromTo(el.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay })
    },
    animateOut(delay) {
      if (el.current) gsap.fromTo(el.current, { opacity: 1, scale: 1 }, { opacity: 1, scale: 0.9, duration: 0.5, ease: 'power3.out', delay })
    },
  }))
  return (
    <button
      ref={el}
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous step' : 'Next step'}
      className={`group/button relative flex aspect-square w-12 cursor-pointer items-center justify-center overflow-clip rounded-[4px] transition-colors duration-300 ${
        disabled ? 'pointer-events-none bg-[var(--ns-gray-30)] text-[var(--ns-gray-60)]' : 'pointer-events-auto bg-black text-white'
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-full origin-bottom scale-y-0 bg-[var(--ns-gray-30)] transition-transform duration-300 group-hover/button:scale-y-100" />
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10" aria-hidden="true">
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
})

export default function Flywheel({ content }: { content: FlywheelContent }) {
  const { steps } = content
  const total = steps.length
  const root = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const introCol = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLParagraphElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const arrows = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const btns = useRef<(ArrowHandle | null)[]>([])
  const items = useRef<(LinkHandle | null)[]>([])
  const prog = useRef({ progress: 0 })
  const shownItem = useRef<LinkHandle | null>(null)

  const [step, setStep] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const expandedRef = useRef(false)

  // Scale's ec(): proxy progress -> styles
  const apply = useCallback(() => {
    const box = bg.current
    const vid = media.current
    if (!box || !vid) return
    const p = prog.current.progress
    const narrow = window.innerWidth < 1280
    const l = (1 - vid.clientWidth / box.clientWidth) * 100
    const i = (1 - vid.clientHeight / box.clientHeight) * 100
    const h = box.getBoundingClientRect().height
    const d = mapRange(p, 0, 1, narrow ? i : l, 0)
    const m = mapRange(p, 0.2, 1, 100, 0)
    const v = mapRange(p, 0, 1, 1, 0)
    if (narrow) {
      gsap.set(box, { clipPath: `inset(${d}% 0% 0% 0% round 16px)` })
      gsap.set(panel.current, { clipPath: `inset(${m}% 0% 0% 0% round 16px)` })
      gsap.set(vid, { y: `${mapRange(p, 0, 1, 0.65 * (h / 2), 0)}px` })
      gsap.set(introCol.current, { y: `${mapRange(p, 0, 1, 0, -600)}px` })
    } else {
      gsap.set(box, { clipPath: `inset(0% 0% 0% ${d}% round 16px)` })
      gsap.set(panel.current, { clipPath: `inset(0% 0% 0% ${m}% round 16px)` })
      gsap.set(vid, { y: '0%' })
      gsap.set(introCol.current, { y: `${mapRange(p, 0, 1, 0, -100)}px` })
    }
    gsap.set(arrows.current, { opacity: `${p}` })
    gsap.set(counter.current, { y: `${100 * v}%` })
  }, [])

  const expand = useCallback(() => {
    if (expandedRef.current) return
    expandedRef.current = true
    setExpanded(true)
    setStep((n) => (n > 0 ? n : 1))
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (prefersReducedMotion()) {
      prog.current.progress = 1
      apply()
      expand()
      return
    }
    const off = retroEnter(el, 'top bottom-=25%', expand)
    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    return () => {
      off()
      window.removeEventListener('resize', onResize)
    }
  }, [apply, expand])

  // expand / collapse choreography (ed / eu); runs on mount with expanded = false
  useEffect(() => {
    gsap.killTweensOf(prog.current)
    if (prefersReducedMotion()) return
    if (expanded) {
      gsap.to(prog.current, { progress: 1, duration: 2, ease: 'power3.out', onUpdate: apply })
      btns.current.forEach((b, i) => b?.animateIn(0.1 * i + 1))
      gsap.set(arrows.current, { pointerEvents: 'auto' })
    } else {
      gsap.to(prog.current, { progress: 0, duration: 2, ease: 'power3.out', onUpdate: apply })
      btns.current.forEach((b, i) => b?.animateOut(0.1 * i + 1))
      gsap.set(arrows.current, { pointerEvents: 'none' })
    }
  }, [expanded, apply])

  // step change (only once expanded): previous out, new in
  useEffect(() => {
    if (!expanded) return
    const n = Math.min(step, total)
    shownItem.current?.animateOut()
    const next = items.current[n - 1] ?? null
    next?.animateIn()
    shownItem.current = next
  }, [step, total, expanded])

  const next = () => setStep((n) => Math.min(n + 1, total))
  const prev = () => setStep((n) => Math.max(n - 1, 1))

  return (
    <div
      ref={root}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') next()
        else if (e.key === 'ArrowLeft') prev()
      }}
      className="SgpFlywheel relative w-full overflow-clip bg-white text-black outline-none"
    >
      <div className={`${s.grid} ${s.fwPanel} h-dvh min-h-0 w-full !py-6 md:!py-24`}>
        <div className="relative col-span-full flex h-full w-full flex-col md:col-span-10 md:col-start-2 xl:flex-row">
          <div ref={bg} className="Background absolute left-0 top-0 z-10 h-full w-full bg-[var(--ns-gray-90)]" />
          <div className="absolute -z-10 h-full w-full p-8 xl:w-[36%] xl:p-12">
            <div ref={introCol} className="flex h-full w-full flex-col justify-start xl:justify-center">
              <div className="intro-wrapper" />
            </div>
          </div>
          <div className="absolute right-6 z-10 flex h-full items-end p-6 xl:right-16 xl:items-start xl:p-16">
            <div className={`${s.mono} mb-6 w-fit overflow-clip rounded-[4px] font-mono text-black xl:mb-0`}>
              <p ref={counter} className="relative flex translate-y-full flex-col items-center overflow-clip">
                {`${String(step).padStart(2, '0')} | ${String(total).padStart(2, '0')}`}
              </p>
            </div>
          </div>
          <div ref={panel} className="absolute z-20 h-full w-full flex-1 p-8 xl:relative xl:p-12">
            <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end p-8 xl:p-16">
              {steps.map((st, i) => (
                <StepItem
                  key={i}
                  ref={(r) => {
                    items.current[i] = r
                  }}
                  step={st}
                  active={step === i + 1}
                />
              ))}
              <div ref={arrows} className="relative z-20 flex gap-2 opacity-0">
                <NavButton
                  ref={(r) => {
                    btns.current[0] = r
                  }}
                  dir="left"
                  onClick={prev}
                  disabled={step <= 1}
                />
                <NavButton
                  ref={(r) => {
                    btns.current[1] = r
                  }}
                  dir="right"
                  onClick={next}
                  disabled={step >= total}
                />
              </div>
            </div>
          </div>
          <div
            ref={media}
            className="relative z-10 flex h-[60%] min-w-0 translate-y-[80%] items-center justify-center p-8 mix-blend-darken xl:h-full xl:flex-[1.3] xl:translate-y-0"
          >
            <div className="relative h-full w-full">
              {steps.map((st, i) => {
                const on = step === i + 1
                return (
                  <div
                    key={i}
                    aria-hidden={!on}
                    className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${on ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className={`${s.fwImage} relative h-full w-full`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={st.image} alt="" className="absolute inset-0 h-full w-full object-contain" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
