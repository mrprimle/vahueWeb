'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import FlatCta from './FlatCta'
import CardCarousel from './CardCarousel'
import ScrollReveal, { type ScrollRevealHandle } from './ScrollReveal'
import { prefersReducedMotion } from './scroll'
import type { HomeContent, OrbitItem } from './content'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/*
 * Applications (0sni47mcvnqwg.js module 920565) in ScrollRevealSection (backdrop transparent, panel gray-90 #EAEAEA).
 *   Section scale: scaleX = scaleY = the reveal value, "top bottom" -> "top top".
 *   Orbit: paused repeat -1 timeline, per item motionPath 28s ease none along #image-path-desktop (>=1024) / -mobile, start
 *     o = (i/n + .25) % 1, end 1 + o, scale(t) = v(t) (scale phase .75; phone b(t) with phase .25): x = .5 + .5 sin(((t+p)%1)π),
 *     g = 100 + 100 sin(same), v = x * g / 100 * .7, b = (.74 + (x-.5)/.5*.26) * (106 + (g-100)/100*94) / 100 * .7.
 *     Plays only while the root's ScrollTrigger (top bottom -> bottom top) is active.
 *   Hover (section wider than 769): tile wrapper scale 1.5 (CSS 300ms ease-out), timeline timeScale -> 0 (1s power2.out), dynamic word
 *     switches to that item; leave resumes at timeScale 1.
 *   Phone: tap -> preventDefault, word switches, autoplay stops; autoplay every 3s while the word row is in view (IO .25).
 *   Dynamic word: container width -> word width (.5s expo.out); new word xPercent -10 / yPercent 100 -> 0 (.5s expo.out); old word
 *     yPercent -102, xPercent -10 (10 when direction right), .5s expo.out. Reset to the first item on enter / enter back (desktop).
 *   Pin out: root pinned "bottom bottom" (phone "bottom bottom-=50vh") -> +=1.5*innerHeight, pinSpacing false, scrub: carousel y 0 ->
 *     -20vh (.25, power1.out), then black overlay opacity 0 -> .35 (.5, power1.out); onEnter section gets gray-90, overlay z-index 3.
 */

const norm = (v: number) => ((v % 1) + 1) % 1
const x = (e: number, t = 0) => 0.5 + 0.5 * Math.sin(norm(e + t) * Math.PI)
const gv = (e: number, t = 0) => 100 + 100 * Math.sin(norm(e + t) * Math.PI)
const desktopScale = (e: number, t: number) => ((x(e, t) * gv(e, t)) / 100) * 0.7
const phoneScale = (e: number, t: number) => (((0.74 + ((x(e, t) - 0.5) / 0.5) * 0.26) * (106 + ((gv(e, t) - 100) / 100) * 94)) / 100) * 0.7

function mobilePath(landscape: boolean) {
  const j = landscape ? 240 : 286
  const N = landscape ? 180 : 268
  const k = (5 * Math.PI) / 180
  const S = Math.cos(k)
  const R = Math.sin(k)
  const T = 510 + 710 * S
  const C = j + 710 * R
  return `M ${+T.toFixed(2)} ${+C.toFixed(2)} A 710 ${+N.toFixed(2)} 5 1 1 ${+(510 - 710 * S).toFixed(2)} ${+(j - 710 * R).toFixed(2)} A 710 ${+N.toFixed(2)} 5 1 1 ${+T.toFixed(2)} ${+C.toFixed(2)}`
}

function OrbitTile({ item, section, onHover, onHighlight, onTap }: { item: OrbitItem; section: () => HTMLElement | null; onHover: (on: boolean) => void; onHighlight: (w: string) => void; onTap: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const wide = () => (section()?.offsetWidth ?? 0) > 769
  const tap = (e: React.MouseEvent) => {
    if (wide()) return
    e.preventDefault()
    onHighlight(item.type.toLowerCase())
    onTap()
  }
  return (
    <div
      ref={wrap}
      className="h-full w-full transition-transform duration-300 ease-out will-change-transform"
      onMouseEnter={() => {
        if (!wide()) return
        onHover(true)
        onHighlight(item.type.toLowerCase())
        if (wrap.current) wrap.current.style.transform = 'scale(1.5)'
      }}
      onMouseLeave={() => {
        if (!wide()) return
        onHover(false)
        if (wrap.current) wrap.current.style.transform = 'scale(1)'
      }}
    >
      <Link href={item.href} className="block" style={{ width: '100%', height: '100%' }} onClick={tap} aria-label={item.type} draggable={false}>
        <div className="relative size-full min-h-0 min-w-0 origin-center scale-[0.6] overflow-clip rounded-[8px] md:scale-100">{item.image}</div>
      </Link>
    </div>
  )
}

export default function Applications({ content }: { content: HomeContent['applications'] }) {
  const { items, headline, realWord, cta, carousel } = content
  const words = useMemo(() => {
    const seen = new Set<string>()
    const out: { title: string; color: string; direction?: string }[] = []
    items.forEach((i) => {
      const key = `${i.type}\0${i.color}`
      if (seen.has(key)) return
      seen.add(key)
      out.push({ title: i.type, color: i.color, direction: i.direction })
    })
    return out
  }, [items])
  const reveal = useRef<ScrollRevealHandle>(null)
  const sectionEl = useRef<HTMLElement>(null)
  const rootEl = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const carouselBox = useRef<HTMLElement>(null)
  const orbit = useRef<HTMLDivElement>(null)
  const wordBox = useRef<HTMLDivElement>(null)
  const wordRow = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const inside = useRef(false)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)
  const current = useRef(words[0]?.title.toLowerCase() ?? '')
  const prevWord = useRef<string | undefined>(undefined)
  const inView = useRef(false)
  const stopped = useRef(false)
  const auto = useRef<number | null>(null)

  const show = useCallback((word: string, opts: { force?: boolean; resetPrevious?: boolean } = {}) => {
    const box = wordBox.current
    if (!box) return
    const els = gsap.utils.toArray<HTMLElement>(box.querySelectorAll('.dynamic-header'))
    if (!els.length) return
    if (opts.resetPrevious) prevWord.current = undefined
    if (!opts.force && word === prevWord.current) return
    const ease = 'expo.out'
    const prior = prevWord.current
    els.forEach((el) => {
      if (el.dataset.type === word) {
        gsap.to(box, { width: el.offsetWidth, duration: 0.5, ease })
        gsap.fromTo(el, { xPercent: -10, yPercent: 100 }, { xPercent: 0, yPercent: 0, duration: 0.5, ease })
      } else if (prior === el.dataset.type) {
        gsap.fromTo(el, { xPercent: 0, yPercent: 0 }, { xPercent: el.dataset.direction === 'right' ? 10 : -10, yPercent: -102, duration: 0.5, ease })
      } else gsap.set(el, { xPercent: -10, yPercent: 100 })
    })
    prevWord.current = word
  }, [])

  const highlight = useCallback((word: string, opts: { force?: boolean; resetPrevious?: boolean } = {}) => {
    if (!word || (!opts.force && word === current.current)) return
    current.current = word
    show(word, opts)
  }, [show])

  const stopAuto = useCallback(() => {
    if (auto.current !== null) clearInterval(auto.current)
    auto.current = null
  }, [])
  const syncAuto = useCallback(() => {
    if (words.length > 1 && matchMedia('(max-width: 769px)').matches && inView.current && !stopped.current) {
      if (auto.current === null)
        auto.current = window.setInterval(() => {
          const list = words.map((w) => w.title.toLowerCase())
          highlight(list[(Math.max(0, list.indexOf(current.current)) + 1) % list.length])
        }, 3000)
    } else stopAuto()
  }, [words, highlight, stopAuto])
  const resetWord = useCallback(() => {
    if (matchMedia('(max-width: 769px)').matches) return
    const first = words[0]?.title.toLowerCase()
    if (first) highlight(first, { force: true, resetPrevious: true })
  }, [words, highlight])

  const setPlaying = useCallback((on: boolean) => {
    inside.current = on
    const t = tl.current
    if (!t) return
    gsap.killTweensOf(t)
    if (!on) {
      t.pause()
      return
    }
    if (hoveredRef.current) {
      t.pause()
      t.timeScale(0)
      return
    }
    t.play()
    t.timeScale(1)
  }, [])

  useLayoutEffect(() => {
    if (wordBox.current && words[0]) show(words[0].title.toLowerCase(), { force: true, resetPrevious: true })
    return undefined
  }, [show, words])

  useEffect(() => {
    const el = wordRow.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e) return
      inView.current = e.isIntersecting
      if (e.isIntersecting) syncAuto()
      else {
        stopAuto()
        stopped.current = false
      }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => {
      io.disconnect()
      stopAuto()
    }
  }, [syncAuto, stopAuto])

  useEffect(() => {
    const sec = sectionEl.current
    const root = rootEl.current
    const orbitEl = orbit.current
    if (!sec || !root || !orbitEl) return
    const reduce = prefersReducedMotion()
    const lg = matchMedia('(min-width: 1024px)').matches
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>(orbitEl.querySelectorAll('.application-item'))
      const n = nodes.length
      const path = lg ? '#image-path-desktop' : '#image-path-mobile'
      const phase = lg ? 0.75 : norm(0.75 + 0.5)
      const scaleAt = lg ? desktopScale : phoneScale
      const master = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'none', duration: 28 } })
      nodes.forEach((el, i) => {
        const o = norm(i / n + 0.25)
        gsap.set(el, { scale: scaleAt(norm(o), phase) })
        master.to(el, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false, start: o, end: 1 + o },
          onUpdate(this: gsap.core.Tween) {
            gsap.set(el, { scale: scaleAt(norm(o + this.progress()), phase) })
          },
        }, 0)
      })
      tl.current = master
      master.progress(0.0001)
      if (reduce) return

      const setX = gsap.quickSetter(sec, 'scaleX')
      const setY = gsap.quickSetter(sec, 'scaleY')
      ScrollTrigger.create({
        trigger: sec,
        start: 'top bottom',
        end: 'top top',
        onUpdate: () => {
          const v = reveal.current?.getScaleValue()
          if (v == null) return
          setX(v)
          setY(v)
        },
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => { setPlaying(true); resetWord() },
        onLeave: () => setPlaying(false),
        onEnterBack: () => { setPlaying(true); resetWord() },
        onLeaveBack: () => setPlaying(false),
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: () => (matchMedia('(max-width: 769px)').matches ? 'bottom bottom-=50vh' : 'bottom bottom'),
            end: () => `+=${1.5 * innerHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              sec.classList.add(s.gray90)
              gsap.set(overlay.current, { zIndex: 3 })
            },
            onLeaveBack: () => {
              gsap.set(overlay.current, { zIndex: 1 })
              sec.classList.remove(s.gray90)
            },
          },
        })
        .fromTo(carouselBox.current, { y: 0 }, { y: '-20vh', ease: 'power1.out', duration: 0.25 })
        .fromTo(overlay.current, { opacity: 0 }, { opacity: 0.35, ease: 'power1.out', duration: 0.5 })
    }, root)
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const on = ScrollTrigger.getAll().some((st) => st.trigger === root && st.isActive)
      setPlaying(on)
    })
    return () => {
      cancelAnimationFrame(raf)
      tl.current = null
      ctx.revert()
    }
  }, [resetWord, setPlaying])

  useEffect(() => {
    hoveredRef.current = hovered
    const t = tl.current
    if (!t) return
    gsap.killTweensOf(t)
    if (hovered) gsap.to(t, { timeScale: 0, duration: 1, ease: 'power2.out', overwrite: true })
    else if (inside.current) {
      t.play()
      t.timeScale(1)
    } else t.pause()
  }, [hovered])

  const landscape = false
  return (
    <ScrollReveal ref={reveal} panelColor="#EAEAEA">
      <div ref={rootEl} className="Applications relative isolate flex min-h-dvh flex-col justify-end">
        <div ref={overlay} className="animateOutBackground pointer-events-none absolute left-0 top-0 z-[1] h-full w-full bg-black opacity-0" />
        <div className="relative z-[2]">
          <section ref={sectionEl} className="relative z-[2] flex min-h-[90vh] origin-top items-center justify-center overflow-clip md:min-h-screen">
            <div className="pointer-events-none relative z-50 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 md:gap-8">
              <div className="text-center">
                <h2 className={`${s.appWord} text-black`}>{headline}</h2>
                <div ref={wordRow} className="flex justify-center gap-2">
                  <h2 className={`${s.appWord} text-black`}>{realWord}</h2>
                  <div ref={wordBox} className="relative flex min-h-[30px] flex-col items-start overflow-clip md:min-h-[72px]">
                    {words.map((w) => (
                      <h2 key={w.title} className={`${s.appWord} dynamic-header absolute whitespace-nowrap`} style={{ color: w.color }} data-type={w.title.toLowerCase()} data-direction={w.direction}>
                        {w.title}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <FlatCta href={cta.href} text={cta.text} variant="fill" theme="white" className="pointer-events-auto" />
            </div>
            <div ref={orbit} className={`${s.orbit} absolute left-1/2 top-1/2 w-[min(75%,1020px)]`}>
              <svg className="pointer-events-none block size-full max-w-full select-none" viewBox="0 0 1020 572" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
                <path id="image-path-desktop" fill="none" d="M438.952 40.8213C578.331 0.420355 712.457 -8.66301 816.626 9.29004C920.833 27.2496 994.888 72.2245 1014.46 139.774C1034.04 207.324 995.505 284.934 917.051 355.841C838.624 426.722 720.427 490.778 581.048 531.179C441.669 571.58 307.543 580.663 203.374 562.71C99.1674 544.75 25.1119 499.775 5.53711 432.226C-14.0376 364.676 24.4945 287.066 102.949 216.159C181.376 145.278 299.573 81.2224 438.952 40.8213Z" />
                <path id="image-path-mobile" fill="none" d={mobilePath(landscape)} />
              </svg>
              {items.map((it) => (
                <div key={it.href + it.type} className="application-item absolute left-0 top-0 shrink-0 will-change-transform" style={{ width: 100, height: 100 }}>
                  <OrbitTile
                    item={it}
                    section={() => sectionEl.current}
                    onHover={setHovered}
                    onHighlight={(w) => highlight(w)}
                    onTap={() => {
                      stopped.current = true
                      stopAuto()
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
          <div className="relative z-[2] bg-[#EAEAEA] pb-40">
            <section ref={carouselBox} className="relative">
              <CardCarousel content={carousel} />
            </section>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
