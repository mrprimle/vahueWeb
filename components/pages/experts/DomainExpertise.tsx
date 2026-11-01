'use client'

// Scale module 558779 (`DomainExpertise`, chunk 3z_q0c19dxjc-.js).
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap, ScrollTrigger } from '@/components/site/lib/gsap'
import { AnimatedText, type AnimatedTextHandle, type TextAnimation } from '@/components/site/shared/AnimatedText'
import { ThreeCanvas } from '@/components/site/shared/ThreeCanvas'
import { domainScene } from './domainScene'
import type { Domain, DomainLogo, ExpertsContent } from './types'

/** Scale's preset `F` in module 947153. */
const HEADING_ANIMATION: TextAnimation = {
  replaceBuiltIn: true,
  prepareForIn(split) {
    if (split.words?.length) gsap.set(split.words, { opacity: 0 })
    if (split.lines?.length) gsap.set(split.lines, { y: '100%' })
  },
  onAnimateIn(tl, { split }) {
    if (split.words?.length) tl.to(split.words, { opacity: 1, duration: 0.8, stagger: { each: 0.03, from: 'start' }, ease: 'power2.out' }, 0)
    if (split.lines?.length) tl.to(split.lines, { y: '0%', opacity: 1, x: 0, stagger: { each: 0.08, from: 'start' }, ease: 'power2.out' }, 0)
  },
  onAnimateOut(tl, { split }) {
    const lines = split.lines
    if (lines?.length)
      tl.to(lines, { opacity: 0, duration: 0.8, x: '10%', stagger: { each: 0.08, from: 'end' }, ease: 'power2.in', onComplete: () => void gsap.set(lines, { opacity: 0, x: 0, y: '100%' }) }, 0)
    if (split.words?.length) tl.to(split.words, { opacity: 0, duration: 0.35, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
  },
}

const HEADING = 'font-aeonik text-4xl lg:text-[3.25rem] leading-tight'

function LogoMarqueeStrip({ logos, domainColor }: { logos: DomainLogo[]; domainColor: string }) {
  const base: (DomainLogo | null)[] = logos.length > 0 ? logos : Array.from({ length: 6 }, () => null)
  const once = Array.from({ length: Math.max(1, Math.ceil(10 / base.length)) }, () => base).flat()
  const doubled = [...once, ...once]
  return (
    <div className="md:hidden w-full overflow-hidden">
      <div className="flex gap-3 animate-logo-marquee" style={{ width: 'max-content', animationDuration: '14s' }}>
        {doubled.map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center p-2" style={{ backgroundColor: logo ? '#ffffff' : domainColor }}>
            {logo ? <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="object-contain max-w-full max-h-full" style={{ filter: 'brightness(0)' }} /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DomainExpertise({ content }: { content: ExpertsContent['domains'] }) {
  const items: Domain[] = content.items
  const section = useRef<HTMLElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const started = useRef(false)
  const panel = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(items[0].key)
  const [shown, setShown] = useState(items[0].key)
  const [sceneKey, setSceneKey] = useState(items[0].key)
  const [restores, setRestores] = useState(0)
  const current = items.find((d) => d.key === shown) ?? items[0]
  const colorOf = (key: string) => items.find((d) => d.key === key)?.color

  const reveal = useCallback(() => {
    const h = heading.current
    if (h && !started.current) {
      started.current = true
      h.ready().then(() => {
        h.animateIn({ delay: 0.1 })
      })
    }
  }, [])
  useEffect(() => {
    const el = section.current
    if (!el) return
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: reveal })
    const onRefresh = () => {
      if (st.progress > 0) reveal()
    }
    ScrollTrigger.addEventListener('refresh', onRefresh)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      onRefresh()
    })
    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      st.kill()
    }
  }, [reveal])
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted)
        requestAnimationFrame(() => {
          setRestores((n) => n + 1)
          ScrollTrigger.refresh()
        })
    }
    window.addEventListener('pageshow', onShow)
    return () => window.removeEventListener('pageshow', onShow)
  }, [])
  const select = (key: string) => {
    if (key === active) return
    const el = panel.current
    if (!el) return
    setActive(key)
    gsap.killTweensOf(el)
    gsap.to(el, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        setShown(key)
        setSceneKey(key)
        gsap.to(el, { opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
      },
    })
  }
  const longest = items.reduce((a, b) => (a.label.length >= b.label.length ? a : b)).label
  const rows = [
    { label: content.labels.who, value: current.whoTheyAre },
    { label: content.labels.expertise, value: current.skills },
    { label: content.labels.projectType, value: current.projectType },
    ...(current.peerReviewedPublications ? [{ label: content.labels.publications, value: current.peerReviewedPublications }] : []),
  ]
  return (
    <section ref={section} id="domain-expertise" className="relative z-[2] overflow-clip bg-scale-gray-90 scroll-mt-20 rounded-t-3xl">
      <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
        <div className="flex flex-col items-center md:grid md:grid-cols-2 md:items-center">
          <div className="flex flex-col items-start gap-7 pointer-events-none pt-16 pb-8 md:pt-20 lg:py-24 w-full">
            <div className="flex flex-col items-start gap-0">
              <AnimatedText ref={heading} tagName="h2" className={cn(HEADING, 'text-black')} customAnimation={HEADING_ANIMATION}>
                {content.headline}
              </AnimatedText>
              <div className="relative w-full">
                <h2 className={cn('invisible whitespace-nowrap pointer-events-none select-none', HEADING)} aria-hidden>
                  {longest}
                </h2>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.h2
                    key={active}
                    className={cn('absolute inset-x-0 top-0 text-left whitespace-nowrap', HEADING)}
                    style={{ color: colorOf(active) }}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {items.find((d) => d.key === active)?.label}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-wrap justify-start gap-2 pointer-events-auto">
              {items.map((d) => (
                <button
                  key={d.key}
                  onClick={() => select(d.key)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono tracking-wide transition-[background-color,border-color,color,box-shadow] duration-200 ease-out cursor-pointer',
                    active === d.key ? 'border-transparent text-white shadow-sm' : 'border-black/10 bg-white/50 text-black/50 hover:text-black/80 hover:border-black/20',
                  )}
                  style={active === d.key ? { backgroundColor: d.color } : {}}
                >
                  <span className={cn('w-2.5 h-2.5 rounded-sm shrink-0', active === d.key ? 'bg-white/80' : '')} style={active !== d.key ? { backgroundColor: d.color } : {}} />
                  {d.label}
                </button>
              ))}
            </div>
            <div ref={panel} className="flex flex-col divide-y divide-black/[0.09] w-full min-h-[280px]">
              {rows.map(({ label, value }) => (
                <div key={label} className="py-4 first:pt-0 last:pb-0 text-left">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-black/40 mb-2">{label}</p>
                  <p className="text-base md:text-lg lg:text-xl text-black/75 leading-snug [text-wrap:pretty]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden w-full pb-16">{current.logos.length > 0 ? <LogoMarqueeStrip logos={current.logos} domainColor={colorOf(active) ?? ''} /> : null}</div>
          <div className="hidden md:flex items-center justify-center w-full self-stretch">
            <ThreeCanvas key={`${sceneKey}-${restores}`} className="w-full h-full" scene={domainScene} sceneProps={{ logos: current.logos }} fixedBackground={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
