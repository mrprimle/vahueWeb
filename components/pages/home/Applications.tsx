'use client'

// Scale module 920565 (chunk 0sni47mcvnqwg.js): images on a tilted orbit, cycling headline word, carousel underneath.
import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap, ScrollTrigger, useGSAP } from '@/components/site/lib/gsap'
import { LANDSCAPE_PHONE, useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { CMSLink } from '@/components/site/shared/CMSLink'
import { FlatCta } from '@/components/site/shared/FlatCta'
import { FullWidthCardCarousel } from '@/components/site/shared/FullWidthCardCarousel'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { ScrollRevealSection } from '@/components/site/shared/ScrollRevealSection'
import type { ApplicationItem, HomeContent } from './content.types'

function wave(t: number, offset = 0) {
  return 0.5 + 0.5 * Math.sin((((t + offset) % 1) + 1) % 1 * Math.PI)
}
function waveSize(t: number, offset = 0) {
  return 100 + 100 * Math.sin((((t + offset) % 1) + 1) % 1 * Math.PI)
}
function desktopScale(t: number, offset: number) {
  return ((wave(t, offset) * waveSize(t, offset)) / 100) * 0.7
}
function mobileScale(t: number, offset: number) {
  return (((0.74 + ((wave(t, offset) - 0.5) / 0.5) * 0.26) * (106 + ((waveSize(t, offset) - 100) / 100) * 94)) / 100) * 0.7
}

function ApplicationTile({
  className,
  image,
  link,
  applicationType,
  getParentSection,
  updateHoverState,
  updateHighlightIndustry,
  onMobileInteraction,
}: ApplicationItem & {
  className: string
  getParentSection: () => HTMLElement | null
  updateHoverState: (v: boolean) => void
  updateHighlightIndustry: (v: string) => void
  onMobileInteraction: () => void
}) {
  const el = useRef<HTMLDivElement>(null)
  const url = link?.url
  const desktop = useCallback(() => {
    const s = getParentSection()
    return !!(s && s.offsetWidth > 769)
  }, [getParentSection])
  const onTap = (e?: React.MouseEvent) => {
    if (desktop()) return
    e?.preventDefault()
    updateHighlightIndustry(applicationType.toLowerCase() || 'result')
    onMobileInteraction()
  }
  const img = (
    <div className={cn('relative size-full min-h-0 min-w-0 origin-center overflow-hidden', className)}>
      <ResponsiveImage asset={image} fill className="object-cover w-full h-full" sizes="(max-width: 768px) 70px, 150px" priority={false} objectCover />
    </div>
  )
  return (
    <div
      ref={el}
      className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
      onMouseEnter={() => {
        if (!desktop()) return
        updateHoverState(true)
        updateHighlightIndustry(applicationType.toLowerCase() || 'result')
        if (el.current) el.current.style.transform = 'scale(1.5)'
      }}
      onMouseLeave={() => {
        if (!desktop()) return
        updateHoverState(false)
        if (el.current) el.current.style.transform = 'scale(1)'
      }}
      onClick={url ? undefined : onTap}
    >
      {url ? (
        <CMSLink href={url} className="block" style={{ width: '100%', height: '100%' }} onClick={onTap}>
          {img}
        </CMSLink>
      ) : (
        img
      )}
    </div>
  )
}

export function Applications({ content, phaseOffset = 0.25, scalePhaseOffset = 0.75 }: { content: HomeContent['applications']; phaseOffset?: number; scalePhaseOffset?: number }) {
  const { headline, items, cta, carousel, realWord } = content
  const list = items?.filter(Boolean) ?? []
  const stage = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const realRef = useRef<HTMLHeadingElement>(null)
  const dynamicBox = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const orbit = useRef<HTMLDivElement>(null)
  const reveal = useRef<{ getScaleValue: () => number | null }>(null)
  const setX = useRef<((v: number) => void) | null>(null)
  const setY = useRef<((v: number) => void) | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const upper = useRef<HTMLDivElement>(null)
  const shade = useRef<HTMLDivElement>(null)
  const loop = useRef<gsap.core.Timeline | null>(null)
  const boost = useRef(0)
  const speed = useRef(1)
  const scrub = useRef<{ getVelocity?: () => number } | null>(null)
  const lenisRef = useRef<{ velocity: number } | null>(null)
  const hoverRef = useRef(false)
  const activeRef = useRef(false)
  const lower = useRef<HTMLElement>(null)
  const lenis = useLenis()
  const [hovered, setHovered] = useState(false)
  const highlight = useRef(list[0]?.applicationType?.toLowerCase() ?? '')
  const shown = useRef<string | undefined>(undefined)
  const applyHeader = useRef<((name: string, o?: { force?: boolean; resetPrevious?: boolean }) => void) | null>(null)
  const inViewMobile = useRef(false)
  const autoTimer = useRef<number | null>(null)
  const [manual, setManual] = useState(false)
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 769px)').matches)
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  const landscape = useMediaQuery(LANDSCAPE_PHONE, false)
  const pathMobile = (() => {
    const cy = landscape ? 240 : 286
    const ry = landscape ? 180 : 268
    const r = (5 * Math.PI) / 180
    const c = Math.cos(r)
    const s = Math.sin(r)
    const x1 = 510 + 710 * c
    const y1 = cy + 710 * s
    return `M ${+x1.toFixed(2)} ${+y1.toFixed(2)} A 710 ${+ry.toFixed(2)} 5 1 1 ${+(510 - 710 * c).toFixed(2)} ${+(cy - 710 * s).toFixed(2)} A 710 ${+ry.toFixed(2)} 5 1 1 ${+x1.toFixed(2)} ${+y1.toFixed(2)}`
  })()
  const types: { title: string; textColor: ApplicationItem['textColor']; direction?: string }[] = []
  const seen = new Set<string>()
  list.forEach((e) => {
    const key = `${e.applicationType ?? ''}\0${e.textColor?.hex ?? ''}`
    if (seen.has(key)) return
    seen.add(key)
    types.push({ title: e.applicationType, textColor: e.textColor, direction: e.animationDirection })
  })
  const typeNames = useRef<string[]>([])
  typeNames.current = types.map((e) => (e.title || '').toLowerCase())
  const firstType = list[0]?.applicationType?.toLowerCase() ?? ''
  const setHighlight = useCallback((next: string | ((c: string) => string), o: { force?: boolean; resetPrevious?: boolean } = {}) => {
    const current = highlight.current
    const value = typeof next === 'function' ? next(current) : next
    const name = typeof value === 'string' ? value.toLowerCase() : ''
    if (!name) return
    if (o.force || name !== current) {
      highlight.current = name
      applyHeader.current?.(name, o)
    }
  }, [])
  const stopAuto = useCallback(() => {
    if (autoTimer.current !== null) {
      window.clearInterval(autoTimer.current)
      autoTimer.current = null
    }
  }, [])
  const startAuto = useCallback(() => {
    if (types.length > 1 && mobile && inViewMobile.current && !manual) {
      if (autoTimer.current === null) {
        autoTimer.current = window.setInterval(() => {
          const names = typeNames.current.filter(Boolean)
          if (names.length < 2) return
          setHighlight((c) => {
            const i = names.indexOf(c)
            return names[((i === -1 ? 0 : i) + 1) % names.length]
          })
        }, 3000)
      }
    } else stopAuto()
  }, [types.length, mobile, manual, setHighlight, stopAuto])
  const resetHighlight = useCallback(() => {
    if (window.matchMedia('(max-width: 769px)').matches) return
    if (firstType) setHighlight(firstType, { force: true, resetPrevious: true })
  }, [firstType, setHighlight])
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 769px)')
    const on = () => setMobile(mq.matches)
    setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return
        if (e.isIntersecting) {
          inViewMobile.current = true
          startAuto()
        } else {
          inViewMobile.current = false
          stopAuto()
          setManual(false)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [list.length, stopAuto, startAuto])
  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [startAuto, stopAuto])
  const onMobileInteraction = useCallback(() => setManual(true), [])
  function setLoopActive(on: boolean) {
    activeRef.current = on
    const t = loop.current
    if (!t) return
    if (!on) {
      gsap.killTweensOf(t)
      t.pause()
      return
    }
    if (hoverRef.current) {
      gsap.killTweensOf(t)
      t.pause()
      t.timeScale(0)
      return
    }
    gsap.killTweensOf(t)
    t.play()
    speed.current = 1 + boost.current
    t.timeScale(1)
  }
  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    setX.current = gsap.quickSetter(el, 'scaleX') as (v: number) => void
    setY.current = gsap.quickSetter(el, 'scaleY') as (v: number) => void
  }, [])
  useScrubTrigger(stage, {
    start: 'top bottom',
    end: 'top top',
    pinSpacing: false,
    onUpdate: () => {
      if (!reveal.current || !setX.current || !setY.current) return
      const v = reveal.current.getScaleValue()
      if (v === null) return
      setX.current(v)
      setY.current(v)
    },
  })
  useInViewTrigger(root, {
    start: 'top bottom',
    end: 'bottom top',
    pinSpacing: false,
    ticker: () => {
      const t = loop.current
      if (!t || hoverRef.current) return
      const r = scrub.current?.getVelocity?.() ?? 0
      const l = lenisRef.current
      const lv = l && typeof l.velocity === 'number' ? 32 * l.velocity : 0
      const n = Math.abs(lv) >= Math.abs(r) ? lv : r
      const add = 0.0035 * Math.abs(n)
      if (n > 0) boost.current = Math.min(2.75, boost.current + add)
      else if (n < 0) boost.current = Math.max(-2, boost.current - add)
      boost.current *= 0.92
      if (boost.current > -0.001 && boost.current < 0.001) boost.current = 0
      const target = 1 + boost.current
      const cur = speed.current
      speed.current = cur + (target - cur) * 0.99
      t.timeScale(1)
    },
    onEnter: () => {
      setLoopActive(true)
      resetHighlight()
    },
    onLeave: () => setLoopActive(false),
    onEnterBack: () => {
      setLoopActive(true)
      resetHighlight()
    },
    onLeaveBack: () => setLoopActive(false),
  })
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    let raf: number | null = requestAnimationFrame(() => {
      raf = null
      ScrollTrigger.refresh()
      if (ScrollTrigger.getAll().some((t) => t.trigger === el && t.isActive)) resetHighlight()
    })
    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [list.length, resetHighlight])
  useEffect(() => {
    lenisRef.current = (lenis as unknown as { velocity: number }) ?? null
  }, [lenis])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    let timer: number | null = null
    const read = () => setWide(mq.matches)
    read()
    const on = () => {
      if (timer !== null) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        timer = null
        read()
      }, 150)
    }
    mq.addEventListener('change', on)
    return () => {
      mq.removeEventListener('change', on)
      if (timer !== null) window.clearTimeout(timer)
    }
  }, [])
  useGSAP(
    () => {
      const el = root.current
      const s = shade.current
      const u = upper.current
      if (!el || !s || !u) return
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: () => (window.matchMedia('(max-width: 769px)').matches ? 'bottom bottom-=50vh' : 'bottom bottom'),
            end: () => `+=${1.5 * window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
            onEnter: () => {
              if (!stage.current?.classList.contains('bg-scale-gray-90')) stage.current?.classList.add('bg-scale-gray-90')
              gsap.set(s, { zIndex: 3 })
            },
            onLeaveBack: () => {
              gsap.set(s, { zIndex: 1 })
              stage.current?.classList.remove('bg-scale-gray-90')
            },
          },
        })
        .fromTo(lower.current, { y: 0 }, { y: '-20vh', ease: 'power1.out', duration: 0.25 })
        .fromTo(s, { opacity: 0 }, { opacity: 0.35, ease: 'power1.out', duration: 0.5 })
      return () => {
        tl.kill()
      }
    },
    { scope: root, dependencies: [list.length] },
  )
  useGSAP(
    () => {
      const el = orbit.current
      if (!el) return
      const tiles = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.application-item'))
      const count = tiles.length
      if (count === 0) return
      const path = wide ? '#image-path-desktop' : '#image-path-mobile'
      const offset = wide ? scalePhaseOffset : (((scalePhaseOffset + 0.5) % 1) + 1) % 1
      const scaleFn = wide ? desktopScale : mobileScale
      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'none', duration: 28 } })
      tiles.forEach((tile, i) => {
        const start = (((i / count + phaseOffset) % 1) + 1) % 1
        gsap.set(tile, { scale: scaleFn((start + 0) % 1, offset) })
        tl.to(
          tile,
          {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false, start, end: 1 + start },
            onUpdate(this: gsap.core.Tween) {
              const t = (start + this.progress()) % 1
              gsap.set(tile, { scale: scaleFn(t, offset) })
            },
          },
          0,
        )
      })
      loop.current = tl
      const refreshLoop = () => {
        const t = loop.current
        if (!t) return
        t.invalidate()
        const p = t.progress()
        t.progress(0)
        t.progress(p)
        ScrollTrigger.refresh()
      }
      let raf: number | null = requestAnimationFrame(() => {
        raf = null
        ScrollTrigger.refresh()
        const r = root.current
        if (r && loop.current) {
          setLoopActive(ScrollTrigger.getAll().some((t) => t.trigger === r && t.isActive))
          refreshLoop()
        }
      })
      let rof: number | null = null
      const ro = new ResizeObserver(() => {
        if (rof === null) {
          rof = requestAnimationFrame(() => {
            rof = null
            refreshLoop()
          })
        }
      })
      ro.observe(el)
      refreshLoop()
      return () => {
        if (raf !== null) cancelAnimationFrame(raf)
        if (rof !== null) cancelAnimationFrame(rof)
        ro.disconnect()
        loop.current = null
      }
    },
    { scope: root, dependencies: [list.length, phaseOffset, scalePhaseOffset, wide, landscape] },
  )
  useEffect(() => {
    hoverRef.current = hovered
  }, [hovered])
  useGSAP(
    () => {
      const t = loop.current
      if (!t) return
      gsap.killTweensOf(t)
      if (hovered) gsap.to(t, { timeScale: 0, duration: 1, ease: 'power2.out', overwrite: true })
      else if (activeRef.current) {
        t.play()
        speed.current = 1 + boost.current
      } else {
        gsap.killTweensOf(t)
        t.pause()
      }
      return () => {
        if (loop.current) gsap.killTweensOf(loop.current)
      }
    },
    { scope: root, dependencies: [hovered] },
  )
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const check = () => {
      if (el.offsetWidth <= 769) setHovered(false)
    }
    const ro = new ResizeObserver(check)
    ro.observe(el)
    check()
    return () => ro.disconnect()
  }, [])
  useGSAP(
    () => {
      applyHeader.current = (name, o = {}) => {
        const box = dynamicBox.current
        if (!box) return
        const words = gsap.utils.toArray<HTMLElement>(box.querySelectorAll('.dynamic-header'))
        if (words.length === 0) return
        if (o.resetPrevious) shown.current = undefined
        if (!o.force && name === shown.current) return
        const ease = 'expo.out'
        const previous = shown.current
        words.forEach((w) => {
          if (w.dataset.type === name) {
            gsap.to(box, { width: w.offsetWidth, duration: 0.5, ease })
            gsap.fromTo(w, { xPercent: -10, yPercent: 100 }, { xPercent: 0, yPercent: 0, duration: 0.5, ease })
          } else if (previous === w.dataset.type) {
            gsap.fromTo(w, { xPercent: 0, yPercent: 0 }, { xPercent: w.dataset.direction === 'left' ? -10 : 10, yPercent: -102, duration: 0.5, ease })
          } else gsap.set(w, { xPercent: -10, yPercent: 100 })
        })
        shown.current = name
      }
      applyHeader.current(highlight.current, { force: true, resetPrevious: true })
      return () => {
        applyHeader.current = null
      }
    },
    { scope: root, dependencies: [types.length] },
  )
  const getParent = () => stage.current
  if (list.length === 0) return null
  return (
    <ScrollRevealSection ref={reveal} backdropColor="transparent" contentContainerColor="scale-gray-90">
      <div ref={root} className="relative flex flex-col justify-end Applications min-h-dvh isolate">
        <div ref={shade} className="absolute top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none animateOutBackground z-1" />
        <div ref={upper} className="relative z-2">
          <section ref={stage} className="relative flex origin-top items-center justify-center min-h-[90vh] md:min-h-screen z-2 overflow-clip">
            <div className="relative z-50 flex flex-col items-center w-full max-w-5xl gap-6 md:gap-8 mx-auto pointer-events-none">
              <div className="text-center">
                <h2 ref={headlineRef} className="text-black max-md:text-[28px] max-md:leading-[30px] md:text-[4rem] md:leading-[1.05]">
                  {headline}
                </h2>
                <div ref={rowRef} className="flex justify-center gap-2 max-lg:flex-col max-lg:items-center max-lg:gap-0">
                  <h2 ref={realRef} className="text-black max-md:text-[28px] max-md:leading-[30px] md:text-[4rem] md:leading-[1.05]">
                    {realWord}
                  </h2>
                  <div ref={dynamicBox} className="relative flex flex-col items-start overflow-clip min-h-[30px] md:min-h-[72px] md:max-lg:min-h-[59px]">
                    {types.map((t, i) => (
                      <h2
                        className="absolute dynamic-header whitespace-nowrap max-md:text-[28px] max-md:leading-[30px] md:text-[4rem] md:leading-[1.05] md:max-lg:text-[3.5rem]"
                        style={t.textColor?.hex ? { color: t.textColor.hex.startsWith('#') ? t.textColor.hex : `#${t.textColor.hex}` } : undefined}
                        data-type={t.title.toLowerCase()}
                        data-direction={t.direction}
                        key={i}
                      >
                        {t.title}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <FlatCta href={cta.url} text={cta.text} variant={cta.variant} theme="white" className="pointer-events-auto" />
            </div>
            <div
              ref={orbit}
              className="absolute top-1/2 left-1/2 -translate-x-[52%] translate-y-[calc(-56%_+_40px)] md:-translate-y-[56%] w-[min(75%,1020px)] aspect-3/5 sm:aspect-1020/572 md:aspect-1020/572"
            >
              <svg className="block max-w-full pointer-events-none select-none size-full" viewBox="0 0 1020 572" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path
                  id="image-path-desktop"
                  fill="none"
                  d="M438.952 40.8213C578.331 0.420355 712.457 -8.66301 816.626 9.29004C920.833 27.2496 994.888 72.2245 1014.46 139.774C1034.04 207.324 995.505 284.934 917.051 355.841C838.624 426.722 720.427 490.778 581.048 531.179C441.669 571.58 307.543 580.663 203.374 562.71C99.1674 544.75 25.1119 499.775 5.53711 432.226C-14.0376 364.676 24.4945 287.066 102.949 216.159C181.376 145.278 299.573 81.2224 438.952 40.8213Z"
                />
                <path id="image-path-mobile" fill="none" d={pathMobile} />
              </svg>
              {list.map((e, i) =>
                e.image?.path ? (
                  <div className="absolute top-0 left-0 application-item will-change-transform shrink-0" style={{ width: 100, height: 100 }} key={e._key || i}>
                    <ApplicationTile
                      {...e}
                      className="md:scale-[1] scale-[0.6] overflow-clip rounded-[8px]"
                      getParentSection={getParent}
                      updateHoverState={setHovered}
                      updateHighlightIndustry={setHighlight}
                      onMobileInteraction={onMobileInteraction}
                    />
                  </div>
                ) : null,
              )}
            </div>
          </section>
          <div className="relative pb-40 oml:pb-2 z-2 bg-scale-gray-90">
            <section ref={lower} className="relative">
              <FullWidthCardCarousel header={carousel.header} cards={carousel.cards} />
            </section>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  )
}
