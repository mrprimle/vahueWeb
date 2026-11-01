'use client'

// Scale module 62032: 3D Embla carousel. Slides nudge, scale and fade by distance from centre, autoplay every 4.5s
// until the first interaction, arrow keys while the section is on screen.
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { startTransition, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { cn } from '@/components/site/lib/cn'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { CategoryIcon } from '@/components/site/shared/BlogPreview'
import { CMSLink } from '@/components/site/shared/CMSLink'
import type { EnterpriseContent } from './types'

type Post = EnterpriseContent['blog']['posts'][number]

const SLIDE =
  'BlogPreview3DCard relative aspect-405/440 oml:aspect-4/2 min-w-0 max-w-full shrink-0 grow-0 pl-0 basis-(--slide-width) transform-3d transform-[translate3d(0,0,0)] backface-hidden will-change-[opacity] mr-[calc(-1*var(--slide-overlap))]'
const LAYER = 'relative flex justify-center w-full h-full origin-center will-change-transform transform-3d'
const LINK = 'relative inset-0 block w-full! h-full outline-none group/card overflow-clip rounded-xl md:rounded-3xl'
const ARROW =
  'z-[1] m-0 inline-flex h-8 w-8 cursor-pointer appearance-none items-center justify-center rounded-md border-0 bg-enterprise-gray-90 p-0 no-underline touch-manipulation hover:brightness-75 pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scale-skyblue'

function Slide({ post, index, total }: { post: Post; index: number; total: number }) {
  const id = useId()
  void total
  return (
    <div role="group" aria-roledescription="slide" aria-labelledby={id} className={SLIDE}>
      <div className="h-full rounded-xl md:rounded-3xl">
        <div className={LAYER} data-embla-layer>
          <CMSLink href={post.url} className={LINK}>
            <div className="absolute w-full h-full img-container">
              <Image src={post.image} alt="" fill unoptimized className="block object-cover h-full transition-transform duration-500 group-hover/card:scale-125" sizes="(max-width: 768px) min(405px, 100vw), 405px" priority={index === 0} />
            </div>
            <CategoryIcon category={post.category} className="absolute z-10 left-5 top-5 md:left-9 md:top-9 border-radius-sm" />
            <div className="absolute z-10 right-6 top-6 md:right-10 md:top-10 border-radius-sm overflow-clip">
              <ArrowRight className="size-6 shrink-0 text-white -translate-x-full group-hover/card:translate-x-0 transition-transform duration-500" strokeWidth={2} aria-hidden />
            </div>
            <div className="absolute inset-0 top-0 left-0 overflow-hidden outline-none z-index-10 rounded-xl md:rounded-3xl bg-image-gradient" aria-hidden />
            <div className="absolute bottom-0 z-10 m-6 md:m-10">
              <h3 id={id} className="leading-snug text-white header7 text-balance drop-shadow-md">
                {post.title}
              </h3>
            </div>
          </CMSLink>
        </div>
      </div>
    </div>
  )
}

function fade(distance: number, step: number) {
  if (step <= 0) return 1
  const a = 2 * step
  const b = 2.4 * step
  return distance <= a ? 1 : distance >= b ? 0 : 1 - (distance - a) / (b - a)
}

const round2 = (v: number) => Math.round(100 * v) / 100

function nudge(node: HTMLElement, i: number, amount: number, state: { lastNudge: number[]; lastTotal: (number | null)[] }) {
  const { lastNudge, lastTotal } = state
  while (lastNudge.length <= i) {
    lastNudge.push(0)
    lastTotal.push(null)
  }
  const m = /translate3d\(\s*([-0-9.eE]+)px\s*,\s*([-0-9.eE]+)px/i.exec(node.style.transform || '')
  const cur = m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 }
  const prev = lastNudge[i] ?? 0
  const total = lastTotal[i]
  let base = cur.x
  if (total != null && Math.abs(cur.x - total) <= 120) base = cur.x - prev
  const x = round2(base + amount)
  const y = round2(cur.y)
  lastNudge[i] = amount
  lastTotal[i] = x
  if (Math.abs(x) < 1e-4 && Math.abs(y) < 1e-4) {
    node.style.removeProperty('transform')
    lastNudge[i] = 0
    lastTotal[i] = null
  } else node.style.transform = `translate3d(${x}px, ${y}px, 0px)`
}

export function BlogPreview3D({ content: c }: { content: EnterpriseContent['blog'] }) {
  const titleId = useId()
  const section = useRef<HTMLElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const region = useRef<HTMLDivElement>(null)
  const [viewport, embla] = useEmblaCarousel({ dragFree: false, loop: true, align: 'center' })
  const spread = useRef(0)
  const layers = useRef<(HTMLElement | null)[]>([])
  const nudges = useRef<{ lastNudge: number[]; lastTotal: (number | null)[] }>({ lastNudge: [], lastTotal: [] })
  const step = useRef(0.09)
  // Scale reads react-device-detect's isDesktop; a touch screen is its "not desktop" here.
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)', false) === true
  const inView = useRef(false)
  const interacted = useRef(false)
  const hidden = useRef(false)
  const initialised = useRef(false)
  const stopAutoplay = useCallback(() => {
    interacted.current = true
  }, [])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  useEffect(() => {
    if (!embla) return
    const list = (e: EmblaCarouselType) => setSnaps(e.scrollSnapList())
    const select = (e: EmblaCarouselType) => setSelected(e.selectedScrollSnap())
    startTransition(() => {
      list(embla)
      select(embla)
    })
    embla.on('reInit', list).on('reInit', select).on('select', select)
    return () => {
      embla.off('reInit', list).off('reInit', select).off('select', select)
    }
  }, [embla])
  const resetSlides = useCallback((e: EmblaCarouselType) => {
    const nodes = e.slideNodes()
    nodes.forEach((n) => {
      n.style.removeProperty('transform')
      n.style.removeProperty('opacity')
      n.style.removeProperty('z-index')
      n.style.removeProperty('pointer-events')
      const layer = n.querySelector<HTMLElement>('[data-embla-layer]')
      if (layer) layer.style.removeProperty('transform')
      const img = layer?.querySelector('.img-container')
      if (img) gsap.set(img, { clearProps: 'transform' })
    })
    layers.current = nodes.map((n) => n.querySelector<HTMLElement>('[data-embla-layer]'))
    nudges.current = { lastNudge: Array.from({ length: nodes.length }, () => 0), lastTotal: Array.from({ length: nodes.length }, () => null) }
  }, [])
  const measureSpread = useCallback((e: EmblaCarouselType) => {
    spread.current = 0.14 * e.scrollSnapList().length
  }, [])
  const measureStep = useCallback((e: EmblaCarouselType) => {
    const t = e.scrollSnapList()
    if (t.length < 2) {
      step.current = 1
      return
    }
    let r = 0
    for (let i = 1; i < t.length; i++) r += t[i] - t[i - 1]
    step.current = r / (t.length - 1)
  }, [])
  const apply = useCallback((e: EmblaCarouselType) => {
    const engine = e.internalEngine()
    const progress = e.scrollProgress()
    const a = step.current
    e.scrollSnapList().forEach((snap, snapIndex) => {
      engine.slideRegistry[snapIndex].forEach((i) => {
        let d = snap - progress
        const direct = Math.abs(d)
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((p) => {
            const t = p.target()
            if (i === p.index && t !== 0) {
              const s = Math.sign(t)
              if (s === -1) d = snap - (1 + progress)
              if (s === 1) d = snap + (1 - progress)
            }
          })
        }
        const abs = Math.abs(d)
        const steps = a > 1e-9 ? abs / a : 0
        const x = d * (-1 * spread.current) * 100
        const n =
          Number.isFinite(steps) && !(steps < 0) && Number.isFinite(d) && Number.isFinite(a) && !(a < 1e-9)
            ? (d / (0.085 * a + Math.abs(d))) * (56 * Math.exp(-Math.pow((steps - 1) / 0.78, 2)) - 72 * Math.exp(-Math.pow((steps - 2) / 0.9, 2)))
            : 0
        const scale = 1 - Math.pow(Math.min(1, abs / 0.2), 0.82) * (1 - 0.7)
        const layer = layers.current[i]
        if (!layer) return
        layer.style.transform = `translateX(${x}%) scale(${scale})`
        const img = layer.querySelector('.img-container')
        if (img) gsap.set(img, { scale: 2 * scale })
        const node = e.slideNodes()[i]
        if (node) {
          node.style.zIndex = String(Math.round(100 + 900 * scale))
          const o = Math.max(fade(direct, a), fade(abs, a))
          node.style.opacity = String(o)
          node.style.pointerEvents = o < 0.04 ? 'none' : 'auto'
          nudge(node, i, n, nudges.current)
        }
      })
    })
  }, [])
  const refresh = useCallback(
    (e?: EmblaCarouselType) => {
      if (!e) return
      measureStep(e)
      apply(e)
    },
    [measureStep, apply],
  )
  useInViewTrigger(section, {
    start: isDesktop ? 'top center' : 'top 80%',
    end: 'bottom top',
    onEnter: () => {
      inView.current = true
      const el = region.current
      if (el)
        gsap.to(el, {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            if (embla) {
              embla.reInit()
              refresh(embla)
              requestAnimationFrame(() => refresh(embla))
            }
          },
        })
      heading.current?.ready().then(() => heading.current?.animateIn({ delay: 0.05 }))
      if (embla) {
        refresh(embla)
        requestAnimationFrame(() => {
          refresh(embla)
          requestAnimationFrame(() => refresh(embla))
        })
      }
    },
    onEnterBack: () => {
      inView.current = true
      if (embla) {
        refresh(embla)
        requestAnimationFrame(() => {
          refresh(embla)
          requestAnimationFrame(() => refresh(embla))
        })
      }
    },
    onLeave: () => {
      inView.current = false
    },
    onLeaveBack: () => {
      inView.current = false
    },
  })
  useEffect(() => {
    if (!embla) return
    resetSlides(embla)
    measureSpread(embla)
    measureStep(embla)
    apply(embla)
    gsap.set(region.current, { opacity: 0, transformOrigin: '0% 100%' })
    embla.on('reInit', resetSlides).on('reInit', measureSpread).on('reInit', measureStep).on('reInit', apply).on('scroll', apply).on('slideFocus', apply)
    return () => {
      embla.off('reInit', resetSlides)
      embla.off('reInit', measureSpread)
      embla.off('reInit', measureStep)
      embla.off('reInit', apply)
      embla.off('scroll', apply)
      embla.off('slideFocus', apply)
    }
  }, [embla, apply, resetSlides, measureSpread, measureStep])
  const posts = useMemo(() => {
    if (c.posts.length === 0) return []
    if (c.posts.length > 5 || !isDesktop) return c.posts
    const t = [...c.posts]
    while (t.length <= 5) t.push(...c.posts)
    return t
  }, [c.posts, isDesktop])
  useEffect(() => {
    if (!embla || posts.length < 2 || initialised.current) return
    let cancelled = false
    const raf = requestAnimationFrame(() => {
      if (cancelled || !embla || initialised.current) return
      initialised.current = true
      embla.scrollNext(true)
      embla.scrollNext(true)
      refresh(embla)
      requestAnimationFrame(() => {
        if (!cancelled && embla) refresh(embla)
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [embla, posts.length, refresh])
  useEffect(() => {
    const vis = () => {
      hidden.current = typeof document !== 'undefined' && document.visibilityState === 'hidden'
    }
    const blur = () => {
      hidden.current = true
    }
    vis()
    document.addEventListener('visibilitychange', vis)
    window.addEventListener('blur', blur)
    window.addEventListener('focus', vis)
    return () => {
      document.removeEventListener('visibilitychange', vis)
      window.removeEventListener('blur', blur)
      window.removeEventListener('focus', vis)
    }
  }, [])
  useEffect(() => {
    if (!embla || posts.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const down = () => stopAutoplay()
    embla.on('pointerDown', down)
    const t = window.setInterval(() => {
      if (!interacted.current && inView.current && !hidden.current) embla.scrollNext()
    }, 4500)
    return () => {
      embla.off('pointerDown', down)
      window.clearInterval(t)
    }
  }, [embla, posts.length, stopAutoplay])
  const prev = useCallback(() => {
    stopAutoplay()
    embla?.scrollPrev()
  }, [embla, stopAutoplay])
  const next = useCallback(() => {
    stopAutoplay()
    embla?.scrollNext()
  }, [embla, stopAutoplay])
  useEffect(() => {
    if (posts.length === 0) return
    const key = (e: KeyboardEvent) => {
      if (!inView.current || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const t = e.target as Element | null
      if (t && typeof t.closest === 'function' && t.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      if (e.key === 'ArrowLeft') prev()
      else next()
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [posts.length, prev, next])
  if (posts.length === 0) return null
  return (
    <section ref={section} className="w-full h-full px-4 pt-0 pb-4 bg-white BlogPreview3D md:pt-16 md:pb-40">
      <div className="w-full grid-layout-mobile md:grid-layout-desktop">
        <div id={titleId} className="mb-6 text-center text-black md:mb-12 col-span-full md:col-start-3 md:col-span-8 header2">
          <AnimatedText ref={heading} tagName="h3" className="header3-regular">
            {c.heading}
          </AnimatedText>
        </div>
      </div>
      <div ref={region} role="region" aria-roledescription="carousel" aria-labelledby={titleId} className="relative box-border mx-auto w-full max-w-480 [--slide-width:min(405px,80%)] [--slide-overlap:calc(var(--slide-width)*0.2)]">
        <div className="my-3 perspective-[900px] perspective-origin-[50%_50%] select-none" ref={viewport}>
          <div className="flex items-center [touch-action:pan-y_pinch-zoom] transform-3d">
            {posts.map((p, i) => (
              <Slide key={`${p.url}-${i}`} post={p} index={i} total={posts.length} />
            ))}
          </div>
        </div>
        {isDesktop ? (
          <div className="absolute top-1/2 hidden w-full -translate-y-1/2 gap-[1.2rem] pointer-events-none xl:flex">
            <div className="flex w-full flex-row justify-between gap-[0.6rem]">
              <button type="button" onClick={prev} aria-label="Previous slide" className={ARROW}>
                <svg aria-hidden className="h-[35%] w-[35%]" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.9141C6.74251 10.7579 6.74251 10.5046 6.5863 10.3484L2.68994 6.45205C2.34823 6.11034 2.34823 5.55632 2.68994 5.21461L6.5863 1.31826C6.74251 1.16205 6.74251 0.908784 6.5863 0.752574L6.11657 0.282842C5.96036 0.126633 5.70709 0.126633 5.55088 0.282843L0.619108 5.21461C0.2774 5.55632 0.277399 6.11034 0.619108 6.45205L5.55088 11.3838Z" fill="black" />
                </svg>
              </button>
              <button type="button" onClick={next} aria-label="Next slide" className={ARROW}>
                <svg aria-hidden className="h-[35%] w-[35%]" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.31826 11.3838C2.16205 11.54 1.90878 11.54 1.75257 11.3838L1.28284 10.9141C1.12663 10.7579 1.12663 10.5046 1.28284 10.3484L5.1792 6.45205C5.52091 6.11034 5.52091 5.55632 5.1792 5.21461L1.28284 1.31826C1.12663 1.16205 1.12663 0.908784 1.28284 0.752574L1.75257 0.282842C1.90878 0.126633 2.16205 0.126633 2.31826 0.282843L7.25003 5.21461C7.59174 5.55632 7.59174 6.11034 7.25003 6.45205L2.31826 11.3838Z" fill="black" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-center my-16 oml:my-5 xl:hidden">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                stopAutoplay()
                embla?.scrollTo(i)
              }}
              aria-label={`Go to slide ${i + 1} of ${snaps.length}`}
              aria-current={i === selected ? 'true' : undefined}
              className={cn('relative mx-0.5 inline-flex size-[6px] rounded-[2px] hover:cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-scale-skyblue', i === selected ? 'bg-enterprise-gray-30' : 'bg-enterprise-gray-80')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
