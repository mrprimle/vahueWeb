'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import { useRevealText } from './useRevealText'
import type { AboutNewsPost } from './content'
import s from './about.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com BlogPreview, light theme ("Scale In The News", 5 posts), chunk 3x8z3_0hhtdcb.js (sha256 89a4cc62…, the
 * same file the healthcare / genai-portfolio audits read) modules 808358 + 189756, CSS module gUrnSq.
 * Grid (>=1024): 4 columns, gap 8, grid-auto-rows minmax(70px, auto); slot table (189756), first five:
 *   0 titleOnly "1 / 1 / 5 / 3" #C4B8D4   1 overlay "1 / 3 / 6 / 5" #1D4133   2 caption "5 / 1 / 7 / 3" #5A6B85
 *   3 caption   "6 / 3 / 7 / 4" #A07862   4 caption "6 / 4 / 7 / 5" #A3BED8
 *   /about overrides posts 0 and 1 to `overlay` (variantOverride) and sets textColor "light" on every post.
 * <1024 (matchMedia "(max-width: 1023px)"): one column, row-gap 16, only the first 4 posts (mobileMaxVisibleTiles
 *   default 4), and overlay tiles fall back to the caption layout.
 * imageGradientOverlay: overlay tiles get two stacked gradients (top 42% black -> 0 at 40%, bottom 58% -> 14% at 38%
 *   -> 0 at 68%); caption tiles get from-black/55 via-black/14 to-transparent over the image.
 * Motion:
 *   tile entrance (BaseCardViewportEntrance, scaleDir "none"): IntersectionObserver threshold 0.12, rootMargin
 *     "0px 0px -6% 0px"; opacity 0 / y 16 -> 1 / 0, 0.6s cubic-bezier(0.23, 1, 0.32, 1), delay 0.05 * min(index, 3);
 *     tiles already in view on mount start visible.
 *   tile title: AnimatedText animateIn delay 0.05 when the tile becomes visible
 *   tile image: scale 1.08 -> 1 scrubbed, trigger = tile, "top bottom" -> "center center" (onUpdate, initial set)
 *   heading: AnimatedText via useScrollTrigger onEnter (top 80%, retroactive), delay 0.05
 *   image hover: the image wrapper is `group/full-bleed` (overlay) / `group/caption` (caption); the img scales to 1.05
 *     on group hover (Tailwind 4 `scale` property, transition-transform 1000ms ease-out). The gradient layers are
 *     pointer-events-none, so pointing at the picture triggers it; the chip and title sit above the wrapper and don't
 *     (measured on /about: scale 1.05 over the CNBC tile picture).
 * Links: external posts are plain <a target=_blank rel="noopener noreferrer"> (HubSpot mousedown only, REA).
 */

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

type Variant = 'titleOnly' | 'overlay' | 'caption'
const SLOTS: { variant: Variant; area: string; swatch: string; origin: string }[] = [
  { variant: 'titleOnly', area: '1 / 1 / 5 / 3', swatch: '#C4B8D4', origin: 'left center' },
  { variant: 'overlay', area: '1 / 3 / 6 / 5', swatch: '#1D4133', origin: 'right center' },
  { variant: 'caption', area: '5 / 1 / 7 / 3', swatch: '#5A6B85', origin: 'left center' },
  { variant: 'caption', area: '6 / 3 / 7 / 4', swatch: '#A07862', origin: 'center center' },
  { variant: 'caption', area: '6 / 4 / 7 / 5', swatch: '#A3BED8', origin: 'right center' },
]
const MOBILE_MAX = 4

const OVERLAY_GRADIENT =
  'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 40%), linear-gradient(0deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.14) 38%, rgba(0,0,0,0) 68%)'

const CategoryIcon = ({ color, label }: { color: string; label: string }) => (
  <div className="CategoryIcon inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-sm p-1">
    <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: color }} aria-hidden="true">
      <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.5C7.29218 0.223858 7.06832 0 6.79229 0Z" fill="white" />
      </svg>
    </span>
    <span className={`${s.detailMono} flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono !text-[11px] !leading-none tracking-[0.05em] text-white`}>
      {label}
    </span>
  </div>
)

function Media({ image, alt, imgRef, bg }: { image?: string; alt?: string; imgRef: React.RefObject<HTMLDivElement | null>; bg?: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={imgRef} className={`${s.bpImgWrap} absolute inset-0 ${bg ?? ''}`} style={{ transformOrigin: '50% 50%' }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={alt ?? ''} loading="lazy" className={`${s.bpImg} absolute inset-0 h-full w-full object-cover`} />
        ) : null}
      </div>
    </div>
  )
}

function Tile({ post, index, desktop, visible }: { post: AboutNewsPost; index: number; desktop: boolean; visible: boolean }) {
  const slot = SLOTS[index]
  const card = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const text = useRef<AnimatedText | null>(null)
  const base: Variant = post.overlay ? 'overlay' : slot.variant
  const variant: Variant = !desktop && base === 'overlay' ? 'caption' : base

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
        onToggle: (self) => {
          if (img.current) img.current.style.willChange = self.isActive ? 'transform' : 'auto'
        },
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
      <div className="flex h-full min-h-[280px] w-full flex-col overflow-hidden p-4 text-[#101010] lg:min-h-0 lg:p-5" style={{ backgroundColor: '#F2F2F2' }}>
        <div className="relative isolate aspect-[16/10] min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-neutral-200 lg:aspect-video">
          <Media image={post.image} alt={post.imageAlt} imgRef={img} />
          {post.gradient && post.image ? (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/[0.14] to-transparent" />
          ) : null}
          <div className="absolute left-2 top-1.5 z-10 lg:left-3 lg:top-2.5">
            <CategoryIcon color={slot.swatch} label={post.category} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-base font-medium leading-[22px] !tracking-[-0.025em] text-[#101010]`} style={{ textWrap: 'pretty' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Media image={post.image} alt={post.imageAlt} imgRef={img} bg="bg-neutral-900" />
          {post.gradient && post.image ? (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: OVERLAY_GRADIENT }} />
          ) : null}
          <div className="absolute left-5 top-5 z-10">
            <CategoryIcon color={slot.swatch} label={post.category} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div>
              <h3 ref={title} className={`${s.pending} text-left font-display text-[32px] font-normal leading-[38px] text-white`} style={{ textWrap: 'pretty' }}>
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )

  const external = /^https?:\/\//.test(post.href) && !post.href.includes('scale.com')
  return (
    <div ref={card} className="BaseCard h-full min-h-0 w-full" style={{ transformOrigin: slot.origin }}>
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

export default function BlogPreview({ heading: headline, posts }: { heading: string; posts: AboutNewsPost[] }) {
  const heading = useRef<HTMLHeadingElement>(null)
  const headWrap = useRef<HTMLDivElement>(null)
  const slots = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<Set<number>>(() => new Set())
  // SSR renders the mobile cap (Scale's useMediaQuery is undefined on the server, so `false !== undefined` slices to 4)
  const [desktop, setDesktop] = useState<boolean | null>(null)
  useRevealText([heading], { mode: 'st', delays: [0.05], start: 'top 80%', trigger: headWrap })

  useEffect(() => {
    const mq = matchMedia('(max-width: 1023px)')
    const on = () => setDesktop(!mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const shown = (desktop === true ? posts : posts.slice(0, MOBILE_MAX)).slice(0, SLOTS.length)
  const key = shown.length

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
    slots.current.slice(0, key).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [key])

  return (
    <section className="BlogPreview isolate w-full scroll-mt-28 overflow-hidden bg-white py-12 md:py-16">
      <div className={s.gridLayout}>
        <div className="col-span-full md:col-span-10 md:col-start-2">
          <div ref={headWrap} className="mb-8 md:mb-20">
            <h2 ref={heading} className={`${s.pending} text-center font-display text-[32px] font-normal leading-[1.05] text-black lg:text-[4rem] lg:leading-[1.05]`} style={{ textWrap: 'balance' }}>
              {headline}
            </h2>
          </div>
          <div className={s.bpGrid}>
            {shown.map((p, i) => (
              <div
                key={p.title}
                data-index={i}
                ref={(el) => {
                  slots.current[i] = el
                }}
                className={`BlogPreview__slot ${s.bpSlot}`}
                style={{ '--bp-grid-area': SLOTS[i].area } as React.CSSProperties}
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
