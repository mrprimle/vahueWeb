'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import styles from './enterprise.module.css'
import { blog } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com BlogPreview3D (chunk 0sni47mcvnqwg, module 62032). Embla { dragFree: false, loop: true, align: "center" }
 * (dragThreshold 10 default) on a perspective(900px) track. Slides are min(405px, 80%) wide with a -20% right
 * margin so they overlap. On every Embla scroll/reInit/slideFocus each slide layer gets, with c = snap - progress
 * (loop-corrected), p = |c|, a = mean snap spacing, h = p / a, d = 0.14 * snapCount:
 *   layer   translateX(c * -d * 100%) scale(v),  v = 1 - min(1, p / .2)^.82 * .3
 *   image   scale 2v (gsap.set)
 *   slide   z-index round(100 + 900v), opacity max(W(|raw c|), W(p)) with W fading between 2a and 2.4a,
 *           extra translate3d nudge c / (.085a + |c|) * (56 e^-((h-1)/.78)^2 - 72 e^-((h-2)/.9)^2) px
 * Desktop repeats the 4 posts until there are more than 5 slides. Autoplay scrollNext every 4.5s while in view
 * and untouched (stops on pointerDown / arrows / keys). Enter ("top center", "top 80%" on touch): carousel opacity
 * 0 -> 1 over 1.2s power2.out, heading animateIn(.05).
 */

const W = (e: number, t: number) => {
  if (t <= 0) return 1
  const a = 2 * t
  const b = 2.4 * t
  return e <= a ? 1 : e >= b ? 0 : 1 - (e - a) / (b - a)
}
const r2 = (n: number) => Math.round(100 * n) / 100

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg aria-hidden className="h-[35%] w-[35%]" width="8" height="12" viewBox="0 0 8 12" fill="none">
      {dir === 'left' ? (
        <path
          d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.9141C6.74251 10.7579 6.74251 10.5046 6.5863 10.3484L2.68994 6.45205C2.34823 6.11034 2.34823 5.55632 2.68994 5.21461L6.5863 1.31826C6.74251 1.16205 6.74251 0.908784 6.5863 0.752574L6.11657 0.282842C5.96036 0.126633 5.70709 0.126633 5.55088 0.282843L0.619108 5.21461C0.2774 5.55632 0.277399 6.11034 0.619108 6.45205L5.55088 11.3838Z"
          fill="black"
        />
      ) : (
        <path
          d="M2.31826 11.3838C2.16205 11.54 1.90878 11.54 1.75257 11.3838L1.28284 10.9141C1.12663 10.7579 1.12663 10.5046 1.28284 10.3484L5.1792 6.45205C5.52091 6.11034 5.52091 5.55632 5.1792 5.21461L1.28284 1.31826C1.12663 1.16205 1.12663 0.908784 1.28284 0.752574L1.75257 0.282842C1.90878 0.126633 2.16205 0.126633 2.31826 0.282843L7.25003 5.21461C7.59174 5.55632 7.59174 6.11034 7.25003 6.45205L2.31826 11.3838Z"
          fill="black"
        />
      )}
    </svg>
  )
}

function Card({ post, index }: { post: (typeof blog.posts)[number]; index: number }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1}`}
      className="relative aspect-[405/440] min-w-0 max-w-full shrink-0 grow-0 basis-[var(--slide-width)] [backface-visibility:hidden] [transform-style:preserve-3d] [transform:translate3d(0,0,0)] [margin-right:calc(-1*var(--slide-overlap))]"
    >
      <div className="h-full rounded-xl md:rounded-3xl">
        <div data-embla-layer className="relative flex h-full w-full origin-center justify-center will-change-transform [transform-style:preserve-3d]">
          <a href="#" className="group/card relative inset-0 block h-full w-full overflow-clip rounded-xl outline-none md:rounded-3xl" draggable={false}>
            <div className="img-container absolute h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="" draggable={false} className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-125" />
            </div>
            <div className="absolute left-5 top-5 z-10 inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-sm p-1 md:left-9 md:top-9">
              <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ background: post.swatch }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                  <path d="M6.79 0H.5C.06 0-.17.54.15.85l6.29 6.3c.31.3.85.08.85-.36V.5c0-.28-.22-.5-.5-.5Z" fill="white" />
                </svg>
              </span>
              {/* TODO: Vahue copy */}
              <span className="flex min-h-[26px] min-w-0 flex-1 items-center truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em] text-white">{post.category}</span>
            </div>
            <div className="absolute right-6 top-6 z-10 overflow-clip md:right-10 md:top-10">
              <svg className="size-6 shrink-0 -translate-x-full text-white transition-transform duration-500 group-hover/card:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div aria-hidden className={`absolute inset-0 overflow-hidden rounded-xl md:rounded-3xl ${styles.imageGradient}`} />
            <div className="absolute bottom-0 z-10 m-6 md:m-10">
              {/* TODO: Vahue copy */}
              <h3 className="text-balance text-[18.4px] font-normal leading-[1.375] tracking-[-0.01em] text-white drop-shadow-md">{post.title}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function BlogCarousel() {
  const section = useRef<HTMLElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const [desktop, setDesktop] = useState(true)
  const [emblaRef, embla] = useEmblaCarousel({ dragFree: false, loop: true, align: 'center' })
  const depth = useRef(0)
  const spacing = useRef(0.09)
  const layers = useRef<(HTMLElement | null)[]>([])
  const nudge = useRef<{ last: number[]; total: (number | null)[] }>({ last: [], total: [] })
  const interacted = useRef(false)
  const inView = useRef(false)
  const hidden = useRef(false)
  const jumped = useRef(false)
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  useEffect(() => {
    const mq = matchMedia('(hover: hover) and (pointer: fine)')
    setDesktop(mq.matches)
  }, [])

  const slides = useMemo(() => {
    const base = blog.posts
    if (base.length > 5 || !desktop) return base
    const out = [...base]
    while (out.length <= 5) out.push(...base)
    return out
  }, [desktop])

  const reset = useCallback((api: EmblaCarouselType) => {
    const nodes = api.slideNodes()
    nodes.forEach((n) => {
      n.style.removeProperty('transform')
      n.style.removeProperty('opacity')
      n.style.removeProperty('z-index')
      n.style.removeProperty('pointer-events')
      const layer = n.querySelector<HTMLElement>('[data-embla-layer]')
      layer?.style.removeProperty('transform')
      const img = layer?.querySelector('.img-container')
      if (img) gsap.set(img, { clearProps: 'transform' })
    })
    layers.current = nodes.map((n) => n.querySelector<HTMLElement>('[data-embla-layer]'))
    nudge.current = { last: nodes.map(() => 0), total: nodes.map(() => null) }
  }, [])
  const measure = useCallback((api: EmblaCarouselType) => {
    depth.current = 0.14 * api.scrollSnapList().length
    const s = api.scrollSnapList()
    if (s.length < 2) spacing.current = 1
    else {
      let sum = 0
      for (let i = 1; i < s.length; i++) sum += s[i] - s[i - 1]
      spacing.current = sum / (s.length - 1)
    }
  }, [])
  const tween = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine()
    const progress = api.scrollProgress()
    const a = spacing.current
    api.scrollSnapList().forEach((snap, snapIndex) => {
      engine.slideRegistry[snapIndex].forEach((slideIndex) => {
        let c = snap - progress
        const raw = Math.abs(c)
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((lp) => {
            const target = lp.target()
            if (slideIndex === lp.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) c = snap - (1 + progress)
              if (sign === 1) c = snap + (1 - progress)
            }
          })
        }
        const p = Math.abs(c)
        const h = a > 1e-9 ? p / a : 0
        const x = c * -depth.current * 100
        const g = a > 1e-9 ? (c / (0.085 * a + Math.abs(c))) * (56 * Math.exp(-Math.pow((h - 1) / 0.78, 2)) - 72 * Math.exp(-Math.pow((h - 2) / 0.9, 2))) : 0
        const v = 1 - Math.pow(Math.min(1, p / 0.2), 0.82) * (1 - 0.7)
        const layer = layers.current[slideIndex]
        if (!layer) return
        layer.style.transform = `translateX(${x}%) scale(${v})`
        const img = layer.querySelector('.img-container')
        if (img) gsap.set(img, { scale: 2 * v })
        const node = api.slideNodes()[slideIndex]
        if (!node) return
        node.style.zIndex = String(Math.round(100 + 900 * v))
        const o = Math.max(W(raw, a), W(p, a))
        node.style.opacity = String(o)
        node.style.pointerEvents = o < 0.04 ? 'none' : 'auto'
        // Add the nudge on top of Embla's own loop translate.
        const st = nudge.current
        const m = /translate3d\(\s*([-0-9.eE]+)px\s*,\s*([-0-9.eE]+)px/i.exec(node.style.transform || '')
        const cur = m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 }
        const prevN = st.last[slideIndex] ?? 0
        const prevT = st.total[slideIndex]
        let base = cur.x
        if (prevT != null && Math.abs(cur.x - prevT) <= 120) base = cur.x - prevN
        const nx = r2(base + g)
        const ny = r2(cur.y)
        st.last[slideIndex] = g
        st.total[slideIndex] = nx
        if (Math.abs(nx) < 1e-4 && Math.abs(ny) < 1e-4) {
          node.style.removeProperty('transform')
          st.last[slideIndex] = 0
          st.total[slideIndex] = null
        } else node.style.transform = `translate3d(${nx}px, ${ny}px, 0px)`
      })
    })
  }, [])
  const refresh = useCallback(
    (api: EmblaCarouselType) => {
      measure(api)
      tween(api)
    },
    [measure, tween],
  )

  useEffect(() => {
    if (!embla) return
    reset(embla)
    measure(embla)
    tween(embla)
    const onSelect = () => setSelected(embla.selectedScrollSnap())
    const onInit = () => {
      setSnaps(embla.scrollSnapList())
      onSelect()
    }
    onInit()
    embla.on('reInit', reset).on('reInit', measure).on('reInit', tween).on('scroll', tween).on('slideFocus', tween).on('select', onSelect).on('reInit', onInit)
    const onDown = () => void (interacted.current = true)
    embla.on('pointerDown', onDown)
    if (!jumped.current && slides.length >= 2) {
      jumped.current = true
      requestAnimationFrame(() => {
        embla.scrollNext(true)
        embla.scrollNext(true)
        refresh(embla)
      })
    }
    return () => {
      embla.off('reInit', reset).off('reInit', measure).off('reInit', tween).off('scroll', tween).off('slideFocus', tween).off('select', onSelect).off('reInit', onInit)
      embla.off('pointerDown', onDown)
    }
  }, [embla, reset, measure, tween, refresh, slides.length])

  // Autoplay + keyboard + visibility.
  useEffect(() => {
    if (!embla) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const vis = () => void (hidden.current = document.visibilityState === 'hidden')
    const blur = () => void (hidden.current = true)
    document.addEventListener('visibilitychange', vis)
    window.addEventListener('blur', blur)
    window.addEventListener('focus', vis)
    const timer = reduce
      ? 0
      : window.setInterval(() => {
          if (!interacted.current && inView.current && !hidden.current) embla.scrollNext()
        }, 4500)
    const key = (e: KeyboardEvent) => {
      if (!inView.current || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const t = e.target as HTMLElement | null
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      interacted.current = true
      if (e.key === 'ArrowLeft') embla.scrollPrev()
      else embla.scrollNext()
    }
    window.addEventListener('keydown', key)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', vis)
      window.removeEventListener('blur', blur)
      window.removeEventListener('focus', vis)
      window.removeEventListener('keydown', key)
    }
  }, [embla])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.set(wrap.current, { opacity: reduce ? 1 : 0, transformOrigin: '0% 100%' })
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: desktop ? 'top center' : 'top 80%',
        end: 'bottom top',
        onEnter: () => {
          inView.current = true
          gsap.to(wrap.current, {
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
          if (embla) refresh(embla)
        },
        onEnterBack: () => {
          inView.current = true
          if (embla) refresh(embla)
        },
        onLeave: () => void (inView.current = false),
        onLeaveBack: () => void (inView.current = false),
      })
    })
    return () => ctx.revert()
  }, [desktop, embla, refresh])

  const click = (dir: 'prev' | 'next') => {
    interacted.current = true
    if (dir === 'prev') embla?.scrollPrev()
    else embla?.scrollNext()
  }

  return (
    <section ref={section} className="BlogPreview3D h-full w-full bg-white px-4 pb-4 pt-0 md:pb-40 md:pt-16">
      <div className="grid w-full grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full mb-6 text-center text-black md:col-span-8 md:col-start-3 md:mb-12">
          {/* TODO: Vahue copy */}
          <AnimatedText ref={heading} as="h3" maskCompensation className="text-[24px] font-normal leading-[1.05] tracking-[-0.01em] text-black md:text-[40px] md:leading-[1.25]">
            {blog.heading}
          </AnimatedText>
        </div>
      </div>
      <div
        ref={wrap}
        role="region"
        aria-roledescription="carousel"
        aria-label="Blog posts"
        className="relative mx-auto box-border w-full max-w-[1920px] [--slide-overlap:calc(var(--slide-width)*0.2)] [--slide-width:min(405px,80%)]"
      >
        <div ref={emblaRef} className="my-3 select-none [perspective-origin:50%_50%] [perspective:900px]">
          <div className="flex items-center [touch-action:pan-y_pinch-zoom] [transform-style:preserve-3d]">
            {slides.map((p, i) => (
              <Card key={`${p.title}-${i}`} post={p} index={i} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute top-1/2 hidden w-full -translate-y-1/2 gap-[1.2rem] xl:flex">
          <div className="flex w-full flex-row justify-between gap-[0.6rem]">
            {(['prev', 'next'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => click(d)}
                aria-label={d === 'prev' ? 'Previous slide' : 'Next slide'}
                className="pointer-events-auto z-[1] m-0 inline-flex h-8 w-8 cursor-pointer appearance-none items-center justify-center rounded-md border-0 bg-[#EAEAEA] p-0 hover:brightness-75"
              >
                <Chevron dir={d === 'prev' ? 'left' : 'right'} />
              </button>
            ))}
          </div>
        </div>
        <div className="my-16 flex flex-wrap items-center justify-center xl:hidden">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                interacted.current = true
                embla?.scrollTo(i)
              }}
              aria-label={`Go to slide ${i + 1} of ${snaps.length}`}
              aria-current={i === selected ? 'true' : undefined}
              className={`relative mx-0.5 inline-flex size-[6px] cursor-pointer rounded-[2px] ${i === selected ? 'bg-[#525252]' : 'bg-[#C7C7C7]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
