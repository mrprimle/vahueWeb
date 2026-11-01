'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion } from '@/components/scale-clone/careers/animatedText'
import { createLogoSphere } from './logoSphereScene'
import type { DomainContent, Logo } from './content'
import s from './experts.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com/experts DomainExpertise (page chunk 3z_q0c19dxjc-.js sha256 054ace61…, module 558779).
 * section#domain-expertise: relative z-[2] overflow-clip bg #EAEAEA (scale-gray-90) rounded-t-3xl, inside a
 * `relative z-10` wrapper; container max-w-[1472px] px-6; md: 2-column grid, items-center.
 * Left: heading "The best minds in" (AnimatedText customAnimation F: words opacity 0 -> 1 0.8s stagger .03, lines
 *   y 100% -> 0 stagger .08, power2.out) played once at section `top 80%` (delay 0.1), also on any refresh once the
 *   trigger's progress > 0; then the rotating domain word (Framer AnimatePresence popLayout, initial false): enter
 *   y 60% / opacity 0 -> 0 / 1, exit -> y -60% / opacity 0, 0.45s ease [0.76, 0, 0.24, 1], colour = domain colour;
 *   an invisible copy of the longest label reserves the width.
 * Pills (click): if not the current key: word + pill switch at once; the details fade out (opacity 0, 0.2s
 *   power2.out), then the details content and the scene key switch and the details fade in (0.35s, delay 0.05).
 *   Pill CSS: transition bg/border/colour/shadow 200ms ease-out; inactive border black/10 bg white/50 text black/50,
 *   hover text black/80 border black/20; active transparent border, white text, shadow-sm, bg = domain colour.
 * Right (md+): the WebGL logo sphere (logoSphereScene.ts), remounted per domain (key `${scene}-${pageshowCount}`).
 * Below md: a logo marquee instead (64px white tiles, gap 12, list repeated ceil(10 / n) times and doubled,
 *   logo-marquee keyframes 0 -> -50%, 14s linear infinite).
 * window pageshow (persisted) -> remount the scene + ScrollTrigger.refresh().
 */

// framer-motion cubic-bezier(0.76, 0, 0.24, 1)
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    if (x <= 0 || x >= 1) return x
    let t = x
    for (let i = 0; i < 8; i++) {
      const d = dx(t)
      if (Math.abs(d) < 1e-6) break
      t -= (sx(t) - x) / d
    }
    return ((ay * t + by) * t + cy) * t
  }
}
const wordEase = bezier(0.76, 0, 0.24, 1)

function Sphere({ logos }: { logos: Logo[] }) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!box.current) return
    const h = createLogoSphere(box.current, logos)
    return () => h.destroy()
  }, [logos])
  return <div ref={box} className="h-full w-full" style={{ touchAction: 'none' }} />
}

function Marquee({ logos, color }: { logos: Logo[]; color: string }) {
  const list: (Logo | null)[] = logos.length > 0 ? logos : Array.from({ length: 6 }, () => null)
  const rep = Array.from({ length: Math.max(1, Math.ceil(10 / list.length)) }, () => list).flat()
  const all = [...rep, ...rep]
  return (
    <div className="w-full overflow-hidden md:hidden">
      <div className={`${s.marquee} animate-logo-marquee flex gap-3`} style={{ width: 'max-content', animationDuration: '14s' }}>
        {all.map((l, i) => (
          <div key={i} className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl p-2" style={{ backgroundColor: l ? '#ffffff' : color }}>
            {l ? (
              l.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.src} alt={l.alt} width={l.width} height={l.height} className="max-h-full max-w-full object-contain" style={{ filter: 'brightness(0)' }} />
              ) : (
                <span className="text-center font-display text-[9px] font-medium leading-[1.1] text-black">{l.alt}</span>
              )
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DomainExpertise({ content }: { content: DomainContent }) {
  const { domains, colors, labels } = content
  const first = domains[0]?.key ?? ''
  const section = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const details = useRef<HTMLDivElement>(null)
  const wordBox = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(first) // pill + word
  const [shown, setShown] = useState(first) // details
  const [sceneKey, setSceneKey] = useState(first) // sphere
  const [remount, setRemount] = useState(0)
  const [words, setWords] = useState<{ key: string; id: number; enter: boolean }[]>([{ key: first, id: 0, enter: false }])
  const wordId = useRef(0)

  const domain = domains.find((d) => d.key === shown) ?? domains[0]
  const sceneDomain = domains.find((d) => d.key === sceneKey) ?? domains[0]
  const longest = domains.reduce((a, b) => (a.label.length >= b.label.length ? a : b), domains[0])

  // heading intro: ScrollTrigger top 80%, once, + refresh check
  useEffect(() => {
    const el = section.current
    const h = heading.current
    if (!el || !h) return
    const text = createAnimatedText(h, { variant: 'fade' })
    let played = false
    const play = () => {
      if (played) return
      played = true
      text.animateIn({ delay: 0.1 })
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: play })
    const check = () => {
      if (st.progress > 0) play()
    }
    ScrollTrigger.addEventListener('refresh', check)
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      check()
    })
    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.removeEventListener('refresh', check)
      st.kill()
      text.revert()
    }
  }, [])

  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return
      requestAnimationFrame(() => {
        setRemount((n) => n + 1)
        ScrollTrigger.refresh()
      })
    }
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [])

  // word swap (AnimatePresence popLayout): new word enters while every other word exits, then unmounts
  useLayoutEffect(() => {
    const box = wordBox.current
    if (!box) return
    const reduce = prefersReducedMotion()
    words.forEach((w) => {
      const el = box.querySelector<HTMLElement>(`[data-word="${w.id}"]`)
      if (!el) return
      if (w.key === active && w.enter && !el.dataset.state) {
        el.dataset.state = 'in'
        gsap.fromTo(el, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reduce ? 0 : 0.45, ease: wordEase })
      } else if (w.key !== active && el.dataset.state !== 'out') {
        el.dataset.state = 'out'
        gsap.killTweensOf(el)
        gsap.to(el, {
          yPercent: -60,
          opacity: 0,
          duration: reduce ? 0 : 0.45,
          ease: wordEase,
          onComplete: () => setWords((ws) => ws.filter((x) => x.id !== w.id)),
        })
      }
    })
  }, [words, active])

  const select = useCallback(
    (key: string) => {
      if (key === active) return
      const d = details.current
      if (!d) return
      setActive(key)
      setWords((ws) => [...ws, { key, id: ++wordId.current, enter: true }])
      gsap.killTweensOf(d)
      gsap.to(d, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          setShown(key)
          setSceneKey(key)
          gsap.to(d, { opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
        },
      })
    },
    [active],
  )

  const rows = [
    { label: labels.who, value: domain.whoTheyAre },
    { label: labels.skills, value: domain.skills },
    { label: labels.project, value: domain.projectType },
    ...(domain.peerReviewedPublications ? [{ label: labels.peer, value: domain.peerReviewedPublications }] : []),
  ]
  const wordCls = 'font-display !font-normal text-4xl leading-[1.25] whitespace-nowrap lg:text-[3.25rem]'

  return (
    <div className="relative z-10">
      <section ref={section} id="domain-expertise" className="relative z-[2] scroll-mt-20 overflow-clip rounded-t-3xl bg-[#eaeaea]">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className="flex flex-col items-center md:grid md:grid-cols-2 md:items-center">
            <div className="pointer-events-none flex w-full flex-col items-start gap-7 pb-8 pt-16 md:pt-20 lg:py-24">
              <div className="flex flex-col items-start gap-0">
                <h2 ref={heading} className={`${wordCls} ${s.pending} !whitespace-normal text-black`}>
                  {content.heading}
                </h2>
                <div ref={wordBox} className="relative w-full">
                  <h2 aria-hidden className={`${wordCls} pointer-events-none invisible select-none`}>
                    {longest?.label}
                  </h2>
                  {words.map((w) => (
                    <h2 key={w.id} data-word={w.id} className={`${wordCls} absolute inset-x-0 top-0 text-left`} style={{ color: colors[w.key] }}>
                      {domains.find((d) => d.key === w.key)?.label}
                    </h2>
                  ))}
                </div>
              </div>
              <div className="pointer-events-auto flex flex-wrap justify-start gap-2">
                {domains.map((d) => {
                  const on = d.key === active
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => select(d.key)}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs leading-[18px] tracking-[0.046em] transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${
                        on
                          ? 'border-transparent text-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]'
                          : 'border-black/10 bg-white/50 text-black/50 hover:border-black/20 hover:text-black/80'
                      }`}
                      style={on ? { backgroundColor: colors[d.key] } : {}}
                    >
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${on ? 'bg-white/80' : ''}`} style={on ? {} : { backgroundColor: colors[d.key] }} />
                      {d.label}
                    </button>
                  )
                })}
              </div>
              <div ref={details} className="flex min-h-[280px] w-full flex-col divide-y divide-black/[0.09]">
                {rows.map(({ label, value }) => (
                  <div key={label} className="py-4 text-left first:pt-0 last:pb-0">
                    <p className="mb-2 font-mono text-[10px] uppercase !tracking-[0.1em] text-black/40">{label}</p>
                    <p className="font-display text-base text-black/75 md:text-lg lg:text-xl" style={{ textWrap: 'pretty', lineHeight: 1.375 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full pb-16 md:hidden">{domain.logos.length > 0 ? <Marquee logos={domain.logos} color={colors[active]} /> : null}</div>
            <div className="hidden h-full w-full items-center justify-center self-stretch md:flex">
              <Sphere key={`${sceneKey}-${remount}`} logos={sceneDomain.logos} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
