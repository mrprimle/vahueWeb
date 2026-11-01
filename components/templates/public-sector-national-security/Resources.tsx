'use client'

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './motion'
import { retroEnter } from './scroll'
import type { ResourcePost, ResourcesContent } from './content'
import s from './ns.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com BlogPreview "Resources" (chunk 3x8z3_0hhtdcb.js sha256 89a4cc62…, modules 808358 + 189756; adapted from the
 * about clone's port), light theme, 3 posts with variantOverride caption / overlay / overlay (overlays with
 * imageGradientOverlay, light text).
 * Page CSS lBBaeq (>= 1024): res1 grid-area 1/1/3/3, aspect 605/552, align-self start, tile padding 32, image aspect
 *   auto; res2 1/3/2/5 and res3 2/3/3/5, aspect 605/400. Below 1024 one column (row gap 16) and overlays fall back to
 *   the caption layout.
 * Motion (same as the about / experts audits):
 *   tile entrance  IntersectionObserver per slot (threshold .12, rootMargin 0 0 -6% 0): opacity 0 / y 16 -> 1 / 0,
 *                  .6s cubic-bezier(.23, 1, .32, 1), delay .05 * min(i, 3); tiles in view on mount start visible
 *   tile title     AnimatedText animateIn(.05) when the tile becomes visible
 *   tile image     scale 1.08 -> 1 scrubbed, tile "top bottom" -> "center center"
 *   heading        useScrollTrigger("top 80%", retroactive) -> animateIn(.05)
 *   image hover    the picture scales to 1.05 (Tailwind 4 `scale`, 1000ms ease-out); chip and title don't trigger it
 * Links: external, target _blank rel noopener noreferrer (scale.com links open in the same tab on Scale).
 */

const SLOTS = [
  { area: '1 / 1 / 3 / 3', aspect: '605 / 552', align: 'start', origin: 'left center' },
  { area: '1 / 3 / 2 / 5', aspect: '605 / 400', align: 'stretch', origin: 'right center' },
  { area: '2 / 3 / 3 / 5', aspect: '605 / 400', align: 'stretch', origin: 'left center' },
]

const OVERLAY_GRADIENT =
  'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 40%), linear-gradient(0deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.14) 38%, rgba(0,0,0,0) 68%)'

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1
  const c = (a1: number) => 3 * a1
  const calc = (t: number, a1: number, a2: number) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t
  const slope = (t: number, a1: number, a2: number) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1)
  return (x: number) => {
    if (x <= 0 || x >= 1) return x
    let t = x
    for (let i = 0; i < 8; i++) {
      const sl = slope(t, x1, x2)
      if (Math.abs(sl) < 1e-6) break
      t -= (calc(t, x1, x2) - x) / sl
    }
    return calc(t, y1, y2)
  }
}
const easeOutQuint = bezier(0.23, 1, 0.32, 1)

const CategoryIcon = ({ color, label }: { color: string; label: string }) => (
  <div className="CategoryIcon inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-[4px] p-1">
    <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: color }} aria-hidden="true">
      <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.5C7.29218 0.223858 7.06832 0 6.79229 0Z" fill="white" />
      </svg>
    </span>
    <span className="flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em] text-white">{label}</span>
  </div>
)

function Media({ image, alt, imgRef, bg }: { image: string; alt: string; imgRef: RefObject<HTMLDivElement | null>; bg?: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={imgRef} className={`${s.bpImgWrap} absolute inset-0 ${bg ?? ''}`} style={{ transformOrigin: '50% 50%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt} loading="lazy" className={`${s.bpImg} absolute inset-0 h-full w-full object-cover`} />
      </div>
    </div>
  )
}

function Tile({ post, index, desktop, visible }: { post: ResourcePost; index: number; desktop: boolean; visible: boolean }) {
  const slot = SLOTS[index] ?? SLOTS[SLOTS.length - 1]
  const card = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const text = useRef<AnimatedText | null>(null)
  const variant = !desktop && post.variant === 'overlay' ? 'caption' : post.variant
  const first = index === 0

  useEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    if (r.top < innerHeight && r.bottom > 0) gsap.set(el, { opacity: 1, y: 0 })
    else gsap.set(el, { opacity: 0, y: 16 })
  }, [])

  useEffect(() => {
    const el = card.current
    if (!el || !title.current) return
    const t = createAnimatedText(title.current)
    text.current = t
    if (visible) t.animateIn({ delay: 0.05 })
    let st: ScrollTrigger | null = null
    if (!prefersReducedMotion() && img.current) {
      const zoom = (p: number) => img.current && gsap.set(img.current, { scale: gsap.utils.mapRange(0, 1, 1.08, 1, gsap.utils.clamp(0, 1, p)) })
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'center center',
        invalidateOnRefresh: true,
        onUpdate: (self) => zoom(self.progress),
      })
      zoom(st.progress)
    }
    return () => {
      st?.kill()
      t.revert()
      text.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  useEffect(() => {
    if (!visible) return
    text.current?.animateIn({ delay: 0.05 })
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const tw = gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: easeOutQuint, overwrite: 'auto' })
    return () => {
      tw.kill()
    }
  }, [visible, index])

  const body =
    variant === 'caption' ? (
      <div className={`flex h-full min-h-[280px] w-full flex-col overflow-hidden bg-[var(--ns-gray-95)] p-4 text-[#101010] lg:min-h-0 lg:p-5 ${first ? 'lg:!p-8' : ''}`}>
        <div className={`relative isolate aspect-[16/10] min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-neutral-200 lg:aspect-video ${first ? 'lg:!aspect-auto' : ''}`}>
          <Media image={post.image} alt={post.imageAlt} imgRef={img} />
          {post.gradient ? <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/[0.14] to-transparent" /> : null}
          <div className="absolute left-2 top-1.5 z-10 lg:left-3 lg:top-2.5">
            <CategoryIcon color={post.swatch} label={post.category} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left text-base font-medium leading-[22px] !tracking-[-0.025em] text-[#101010]`} style={{ textWrap: 'pretty' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Media image={post.image} alt={post.imageAlt} imgRef={img} bg="bg-neutral-900" />
          {post.gradient ? <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: OVERLAY_GRADIENT }} /> : null}
          <div className="absolute left-5 top-5 z-10">
            <CategoryIcon color={post.swatch} label={post.category} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div>
              <h3 ref={title} className={`${s.pending} text-left text-[32px] font-normal leading-[38px] text-white`} style={{ textWrap: 'pretty' }}>
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )

  const external = /^https?:\/\//.test(post.href) && !post.href.includes('scale.com')
  return (
    <div ref={card} className="BaseCard h-full min-h-0 w-full" style={{ transformOrigin: desktop ? slot.origin : 'center top' }}>
      <a
        href={post.href}
        className={`BlogPreviewTile ${s.focusUa} block h-full w-full overflow-hidden rounded-2xl bg-transparent`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {body}
      </a>
    </div>
  )
}

export default function Resources({ content }: { content: ResourcesContent }) {
  const heading = useRef<HTMLParagraphElement>(null)
  const headWrap = useRef<HTMLDivElement>(null)
  const slots = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<Set<number>>(() => new Set())
  const [desktop, setDesktop] = useState<boolean | null>(null)
  const posts = content.posts.slice(0, SLOTS.length)

  useEffect(() => {
    const mq = matchMedia('(max-width: 1023px)')
    const on = () => setDesktop(!mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    if (!heading.current || !headWrap.current) return
    const t = createAnimatedText(heading.current)
    if (prefersReducedMotion()) return () => t.revert()
    const off = retroEnter(headWrap.current, 'top 80%', () => t.animateIn({ delay: 0.05 }))
    return () => {
      off()
      t.revert()
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = Number((e.target as HTMLElement).dataset.index)
          setVisible((v) => (v.has(i) ? v : new Set(v).add(i)))
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    slots.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="BlogPreview isolate w-full scroll-mt-28 overflow-hidden bg-white py-12 md:py-16">
      <div className={s.grid}>
        <div className="col-span-full md:col-span-10 md:col-start-2">
          <div ref={headWrap} className="mb-8 md:mb-20">
            <p ref={heading} className={`${s.header2} ${s.pending} text-center text-black`} style={{ textWrap: 'balance' }}>
              {content.heading}
            </p>
          </div>
          <div className={s.bpGrid}>
            {posts.map((p, i) => (
              <div
                key={p.title}
                data-index={i}
                data-tile-key={`res${i + 1}`}
                ref={(el) => {
                  slots.current[i] = el
                }}
                className={`BlogPreview__slot ${s.bpSlot}`}
                style={{ '--bp-grid-area': SLOTS[i].area, '--bp-aspect': SLOTS[i].aspect, '--bp-align': SLOTS[i].align } as CSSProperties}
              >
                <Tile post={p} index={i} desktop={desktop !== false} visible={visible.has(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
