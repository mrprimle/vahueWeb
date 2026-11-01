'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, type AnimatedText } from './animatedText'
import FlatCta, { type FlatCtaHandle } from './FlatCta'
import { prefersReducedMotion } from './scroll'
import type { HomeContent, HomeMedia, PullApartItem } from './content'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * HomeHero (0sni47mcvnqwg.js sha256 0e137e33…, module 677838). 450dvh (232dvh under 768), bg white. Its h-dvh child is pinned
 * "top top" -> innerHeight * 4.5 (2.32), pinSpacing false; inner .parallaxOut scrubbed yPercent 0 -> -10 (.8..1 of 1,
 * power2.inOut). The next section (isolate) paints over the pinned layer. Canvas: see heroScene.ts. A black rounded plate
 * covers the frame's box (top 88, inset 24 / 18 / 16) until the texture is ready, canvas and plate cross-fade over 1s.
 * Headline: autoAlpha 1 set / 0 over .25s power2.out, driven by showHeading (p <= .035). "Scroll to explore": autoAlpha 1
 * (.25s, delay 1) / 0 (.25s) on the same flag.
 * Page theme: Lenis scroll > 350 going down -> dark; < 350 going up -> light (the header colours).
 *
 * PullApartContent (same module), per item, r = phone ? 1.4 : 1 and a = (last item scrolling back) ? 1.35 : 1:
 *   in   (two rAFs after visible): category default duration .8/r/a delay .1/r/a; title delay .3/r/a; body "lift" duration 1.8/r/a
 *        delay .5/r/a; CTA intro .85/r/a delay 1.3/r/a; logos after body: autoAlpha 0 -> 1, scale 1.15 -> 1, .65/r/a, stagger .08/r/a
 *   out  y tween to 25 (.9s power2.out) + 25% of the scroll distance for 2s; category out; title delay .1, body delay .2
 *        (fadeOutSimple on item 0); CTA delay .3; logos autoAlpha 0, y -6, .22s, delay .4, stagger .04 from end
 *   If another item becomes visible during those 2s the outgoing layer fades in .2s.
 */

function PullApartContent({ index, item, visible, anyOther, isLast }: { index: number; item: PullApartItem; visible: boolean; anyOther: boolean; isLast: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const logos = useRef<HTMLDivElement>(null)
  const catEl = useRef<HTMLHeadingElement>(null)
  const titleEl = useRef<HTMLHeadingElement>(null)
  const bodyEl = useRef<HTMLParagraphElement>(null)
  const cta = useRef<FlatCtaHandle>(null)
  const texts = useRef<{ cat?: AnimatedText; title?: AnimatedText; body?: AnimatedText }>({})
  const runId = useRef(0)
  const prev = useRef(visible)
  const exiting = useRef(false)
  const fastHidden = useRef(false)
  const exitTimer = useRef<gsap.core.Tween | null>(null)
  const yTween = useRef<gsap.core.Tween | null>(null)
  const logoCall = useRef<gsap.core.Tween | null>(null)
  const logoTween = useRef<gsap.core.Tween | null>(null)
  const yBase = useRef({ v: 0 })
  const yScroll = useRef(0)
  const lastScroll = useRef<number | null>(null)
  const scrollingUp = useRef(false)
  const prevScroll = useRef<number | null>(null)
  const isVisible = useRef(visible)
  isVisible.current = visible

  const applyY = useCallback(() => {
    if (root.current) gsap.set(root.current, { y: yBase.current.v + yScroll.current })
  }, [])
  const logoEls = useCallback(() => gsap.utils.toArray<HTMLElement>(logos.current?.querySelectorAll('[data-logo]') ?? []), [])

  useEffect(() => {
    const t: typeof texts.current = {}
    if (catEl.current) t.cat = createAnimatedText(catEl.current)
    if (titleEl.current) t.title = createAnimatedText(titleEl.current)
    if (bodyEl.current) t.body = createAnimatedText(bodyEl.current, { variant: 'lift' })
    texts.current = t
    gsap.set(root.current, { y: 0, autoAlpha: isVisible.current ? 1 : 0 })
    cta.current?.set()
    const l = logoEls()
    if (l.length && !prefersReducedMotion()) gsap.set(l, { autoAlpha: 0, scale: 1.15, y: 0 })
    return () => {
      exitTimer.current?.kill()
      yTween.current?.kill()
      logoCall.current?.kill()
      logoTween.current?.kill()
      t.cat?.revert()
      t.title?.revert()
      t.body?.revert()
    }
  }, [logoEls])

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY
      if (prevScroll.current !== null) scrollingUp.current = y < prevScroll.current
      prevScroll.current = y
      if (isVisible.current) {
        lastScroll.current = y
        return
      }
      if (!exiting.current) return
      if (lastScroll.current !== null) yScroll.current -= (y - lastScroll.current) * 0.25
      lastScroll.current = y
      applyY()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [applyY])

  useEffect(() => {
    if (!exiting.current || fastHidden.current || visible || !anyOther) return
    fastHidden.current = true
    const r = root.current
    if (r) {
      gsap.killTweensOf(r, 'autoAlpha')
      gsap.to(r, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
    }
  }, [anyOther, visible])

  useEffect(() => {
    const was = prev.current
    prev.current = visible
    const r = root.current
    if (!r) return
    if (prefersReducedMotion()) {
      gsap.set(r, { autoAlpha: visible ? 1 : 0 })
      return
    }
    if (!visible) {
      if (!was) return
      exiting.current = true
      fastHidden.current = false
      exitTimer.current?.kill()
      exitTimer.current = gsap.delayedCall(2, () => {
        exiting.current = false
        exitTimer.current = null
      })
      runId.current += 1
      yTween.current?.kill()
      yBase.current.v = 0
      yScroll.current = 0
      lastScroll.current = null
      yTween.current = gsap.to(yBase.current, { v: 25, duration: 0.9, ease: 'power2.out', overwrite: 'auto', onUpdate: applyY })
      const variant = index === 0 ? 'fadeOutSimple' : 'default'
      texts.current.cat?.animateOut()
      texts.current.title?.animateOut({ delay: 0.1, variant })
      texts.current.body?.animateOut({ delay: 0.2, variant })
      const l = logoEls()
      logoCall.current?.kill()
      logoTween.current?.kill()
      if (l.length) gsap.killTweensOf(l)
      cta.current?.animateOut({ delay: 0.3 })
      if (l.length) gsap.to(l, { autoAlpha: 0, y: -6, duration: 0.22, delay: 0.4, stagger: { each: 0.04, from: 'end' }, ease: 'power2.out', overwrite: 'auto' })
      return
    }
    exitTimer.current?.kill()
    exiting.current = false
    fastHidden.current = false
    yTween.current?.kill()
    yBase.current.v = 0
    yScroll.current = 0
    lastScroll.current = null
    gsap.killTweensOf(r)
    gsap.set(r, { y: 0, autoAlpha: 1 })
    let cancelled = false
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (cancelled) return
        runId.current += 1
        const id = runId.current
        const phone = matchMedia('(max-width: 767px)').matches ? 1.4 : 1
        const back = isLast && scrollingUp.current ? 1.35 : 1
        const k = phone * back
        texts.current.cat?.animateIn({ duration: 0.8 / k, delay: 0.1 / k })
        texts.current.title?.animateIn({ duration: 0.8 / k, delay: 0.3 / k })
        const bodyDelay = 0.5 / k
        const bodyDur = 1.8 / k
        const l = logoEls()
        logoTween.current?.kill()
        if (l.length) gsap.killTweensOf(l)
        cta.current?.animateIn({ duration: 0.85 / k, delay: 1.3 / k })
        texts.current.body?.animateIn({ duration: bodyDur, delay: bodyDelay })
        logoCall.current?.kill()
        logoCall.current = gsap.delayedCall(bodyDelay + bodyDur, () => {
          if (!isVisible.current || id !== runId.current) return
          const e = logoEls()
          if (e.length) logoTween.current = gsap.fromTo(e, { autoAlpha: 0, scale: 1.15, y: 0 }, { autoAlpha: 1, scale: 1, duration: 0.65 / k, stagger: 0.08 / k, ease: 'power2.out', overwrite: 'auto' })
        })
      }),
    )
    return () => {
      cancelled = true
    }
  }, [visible, index, isLast, applyY, logoEls])

  const first = index === 0
  const place = first
    ? 'min-[1450px]:col-span-4 min-[1450px]:col-start-5 max-md:py-10 md:py-12 min-[1450px]:py-24 items-center text-center'
    : `${index % 2 === 1 ? 'min-[1450px]:col-start-2' : 'min-[1450px]:col-start-9'} min-[1450px]:col-span-3 md:max-[1449px]:py-0 min-[1450px]:py-12 items-start text-center min-[1450px]:text-left`
  const textAlign = first ? '' : 'w-full text-center min-[1450px]:text-left'
  return (
    <div
      ref={root}
      className={`PullApartContent ${s.grid3xl} absolute left-0 top-0 h-dvh w-full pb-0 max-md:items-start max-md:pt-[45dvh] md:max-[1449px]:items-start md:max-[1449px]:pt-[50dvh] ${first ? 'min-[1450px]:items-end' : 'min-[1450px]:items-center'} ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ zIndex: 10 + index, perspective: 1000 }}
      aria-hidden={!visible}
    >
      <div className={`col-span-8 flex min-w-0 flex-col gap-0 md:max-[1449px]:col-span-6 md:max-[1449px]:col-start-2 md:max-[1449px]:justify-self-center md:gap-6 min-[1450px]:gap-4 ${place}`}>
        {item.category ? (
          <h2 ref={catEl} className={`${s.category} ${s.pending} pb-0 font-mono text-[10px] uppercase leading-[1.5] text-[#929292] max-md:mb-6 md:mb-0 md:text-[11px] min-[1450px]:pb-6 ${textAlign}`}>
            {item.category}
          </h2>
        ) : null}
        <div className="flex w-full min-w-0 flex-col gap-[15px] max-md:mb-6 md:mb-0">
          <p ref={titleEl} className={`${s.header4} ${s.pending} text-white ${textAlign}`} style={{ textWrap: 'balance', lineHeight: 1.1875 }}>
            {item.title}
          </p>
          <p ref={bodyEl} className={`${s.pending} text-[14px] leading-[1.43] text-[#C7C7C7] ${textAlign}`} style={{ textWrap: 'balance' }}>
            {item.body}
          </p>
        </div>
        {item.cta || item.logos?.length ? (
          <div className={`flex w-full min-w-0 flex-col gap-10 md:gap-[50px] ${first ? 'items-center' : 'items-start'}`}>
            {item.cta ? (
              <div className="mx-auto w-fit max-w-full pt-0 min-[1450px]:mx-0 min-[1450px]:pt-6">
                <FlatCta ref={cta} href={item.cta.href} text={item.cta.text} variant="arrow" theme="evergreen" intro="filledEvergreenArrow" tall />
              </div>
            ) : null}
            {item.logos?.length ? (
              <div ref={logos} className={`relative flex max-h-12 flex-wrap items-center gap-x-6 gap-y-2 self-center pb-12 pt-0 min-[1450px]:self-start min-[1450px]:pb-0 ${first ? 'justify-center' : 'justify-start'}`}>
                {item.logos.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={l.name} data-logo src={l.src} alt="" aria-hidden className="max-h-[30px] max-w-[68px] object-contain" style={{ filter: 'brightness(0) invert(.57)' }} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function HomeHero({ content, media, onDarkChange }: { content: HomeContent['hero']; media?: HomeMedia; onDarkChange?: (dark: boolean) => void }) {
  const pin = useRef<HTMLDivElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const canvasBox = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState<boolean[]>(() => content.items.map(() => false))

  useEffect(() => {
    let dark = false
    let last = scrollY
    const onScroll = () => {
      const y = scrollY
      const dir = y - last
      last = y
      if (y > 4.55 * innerHeight) return
      const next = y > 350 && dir !== 0 ? true : y < 350 && dir < 0 ? false : dark
      if (next !== dark) {
        dark = next
        onDarkChange?.(next)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onDarkChange])

  useEffect(() => {
    const h = heading.current
    const hi = hint.current
    const show = (on: boolean) => {
      if (h) {
        gsap.killTweensOf(h, 'autoAlpha')
        if (on) gsap.set(h, { autoAlpha: 1 })
        else gsap.to(h, { autoAlpha: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
      }
      if (hi) {
        gsap.killTweensOf(hi, 'autoAlpha')
        gsap.to(hi, on ? { autoAlpha: 1, duration: 0.25, delay: 1, overwrite: 'auto' } : { autoAlpha: 0, duration: 0.25, overwrite: 'auto' })
      }
    }
    if (scrollY < 50) show(true)
    let destroyed = false
    let destroy = () => {}
    const box = canvasBox.current
    import('./heroScene').then(({ createHeroScene }) => {
      if (destroyed || !box) return
      destroy = createHeroScene(box, {
        source: media?.hero,
        onFrameReady: () => setReady(true),
        onHeading: show,
        onSectionVisible: (i, on) =>
          setVisible((v) => {
            if (v[i] === on) return v
            const n = [...v]
            n[i] = on
            return n
          }),
      })
    })
    const reduce = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduce) return
      const end = () => innerHeight * (matchMedia('(max-width: 768px)').matches ? 2.32 : 4.5)
      gsap
        .timeline({ scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${end()}`, pin: true, pinSpacing: false, scrub: true, invalidateOnRefresh: true } })
        .set(parallax.current, { yPercent: 0 }, 0)
        .to(parallax.current, { yPercent: -10, duration: 0.2, ease: 'power2.inOut' }, 0.8)
    })
    return () => {
      destroyed = true
      destroy()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const any = visible.findIndex(Boolean)
  return (
    <div className="HomeHero relative left-0 top-0 h-[450dvh] min-h-dvh w-full bg-white max-md:h-[232dvh]">
      <div ref={pin} className="h-dvh w-full">
        <div ref={parallax} className="parallaxOut absolute left-0 top-0 h-dvh w-full">
          <div className="absolute inset-0 z-[1] transition-opacity duration-1000 ease-out" style={{ opacity: ready ? 1 : 0 }}>
            <div ref={canvasBox} className="absolute inset-0 h-dvh w-full" style={{ touchAction: 'none' }} />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[2] select-none transition-opacity duration-1000 ease-out" style={{ opacity: ready ? 0 : 1 }} aria-hidden>
            <div className="absolute bottom-6 left-6 right-6 top-[88px] overflow-hidden rounded-2xl bg-black md:max-[1449px]:bottom-[18px] md:max-[1449px]:left-[18px] md:max-[1449px]:right-[18px] max-md:bottom-4 max-md:left-4 max-md:right-4" />
          </div>
          <section className="absolute left-0 top-0 z-10 flex min-h-dvh w-full flex-col items-center px-8 py-16 max-md:justify-start max-md:pt-[45dvh] md:justify-center md:max-[1449px]:justify-start md:max-[1449px]:pt-[50dvh] lg:px-16">
            <div ref={heading} className="flex w-full max-w-6xl flex-col items-center justify-center">
              <h1 className={`${s.header2} w-full text-center font-display font-normal text-white`}>{content.headline}</h1>
            </div>
          </section>
          {content.items.map((item, i) => (
            <PullApartContent key={item.title} index={i} item={item} visible={visible[i]} anyOther={any !== -1 && any !== i} isLast={i === content.items.length - 1} />
          ))}
          <div ref={hint} className="invisible absolute bottom-[72px] right-[72px] z-10 opacity-0 max-md:bottom-10 max-md:right-10 md:max-[1449px]:bottom-[54px] md:max-[1449px]:right-[54px]">
            <div className="flex items-center gap-4 text-center text-white" aria-label={content.scrollHint}>
              <p className={`${s.body3} hidden font-medium leading-none tracking-wide md:block`}>{content.scrollHint}</p>
              <div className="flex aspect-square items-center justify-center rounded-sm border border-white p-2">
                <div className="size-4 overflow-hidden">
                  <svg className="size-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
