'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import { useRevealText } from './useRevealText'
import { MdPlayArrow } from './icons'
import s from './healthcare.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com BlogPreview, light theme, 3 tiles (chunk 3x8z3_0hhtdcb.js modules 808358 + 189756, CSS module gUrnSq).
 * Grid (>=1024): 4 columns, gap 8, grid-auto-rows minmax(70px, auto); slots
 *   0 titleOnly  "1 / 1 / 5 / 3"  swatch #C4B8D4  (video tile)
 *   1 overlay    "1 / 3 / 6 / 5"  swatch #1D4133  (video tile)
 *   2 caption    "5 / 1 / 7 / 3"  swatch #5A6B85  (link tile)
 * <1024: one column, row-gap 16, and every tile renders as the "caption" layout.
 * Motion:
 *   tile entrance (BaseCardViewportEntrance, scaleDir "none"): IntersectionObserver threshold 0.12,
 *     rootMargin "0px 0px -6% 0px"; from opacity 0 / y 16 -> 1 / 0, 0.6s cubic-bezier(0.23, 1, 0.32, 1),
 *     delay 0.05 * min(index, 3); tiles already in view on mount start visible.
 *   tile title: AnimatedText animateIn delay 0.05 when the tile becomes visible
 *   tile image: scale 1.08 -> 1 scrubbed, trigger = tile, "top bottom" -> "center center"
 *     (sampled 1.0768 / 1.0502 / 1.0237 / 1 at scroll 2900 / 3100 / 3300 / 3500)
 *   heading: AnimatedText, trigger "top 80%", delay 0.05
 *   play button: hover scale 1.1 + bg black/70, 300ms; click opens a video dialog (Radix on scale.com).
 */


// cubic-bezier(0.23, 1, 0.32, 1) as a GSAP ease function
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
export type BlogTileContent = { title: string; image?: string; fill?: string; video?: boolean; href?: string }
type Tile = BlogTileContent & { variant: Variant; area: string; swatch: string }

// Desktop slots (titleOnly / overlay / caption) with their grid areas and category swatches, in tile order.
const SLOTS: { variant: Variant; area: string; swatch: string }[] = [
  { variant: 'titleOnly', area: '1 / 1 / 5 / 3', swatch: '#C4B8D4' },
  { variant: 'overlay', area: '1 / 3 / 6 / 5', swatch: '#1D4133' },
  { variant: 'caption', area: '5 / 1 / 7 / 3', swatch: '#5A6B85' },
]

const CategoryIcon = ({ color, label }: { color: string; label: string }) => (
  <div className="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-sm p-1">
    <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px]" style={{ backgroundColor: color }} aria-hidden="true">
      <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.5C7.29218 0.223858 7.06832 0 6.79229 0Z" fill="white" />
      </svg>
    </span>
    <span className={`${s.detailMono} flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono !text-[11px] !leading-none tracking-[0.05em] text-white`}>
      {label}
    </span>
  </div>
)

function Media({ image, fill, imgRef }: { image?: string; fill?: string; imgRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={imgRef} className="absolute inset-0" style={{ transformOrigin: '50% 50%' }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: fill ?? '#000' }} />
        )}
      </div>
    </div>
  )
}

function BlogTile({ tile, index, desktop, visible, category }: { tile: Tile; index: number; desktop: boolean; visible: boolean; category: string }) {
  const card = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const [open, setOpen] = useState(false)
  const variant = desktop ? tile.variant : 'caption'

  // entrance initial state
  useEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    if (r.top < innerHeight && r.bottom > 0) gsap.set(el, { opacity: 1, y: 0 })
    else gsap.set(el, { opacity: 0, y: 16 })
  }, [])

  // title AnimatedText + image zoom
  useEffect(() => {
    const el = card.current
    if (!el || !title.current) return
    const t = createAnimatedText(title.current)
    let st: ScrollTrigger | null = null
    if (!prefersReducedMotion() && img.current) {
      const zoom = (p: number) => gsap.set(img.current, { scale: gsap.utils.mapRange(0, 1, 1.08, 1, gsap.utils.clamp(0, 1, p)) })
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'center center',
        invalidateOnRefresh: true,
        onUpdate: (self) => zoom(self.progress),
        onRefresh: (self) => zoom(self.progress),
        onToggle: (self) => {
          if (img.current) img.current.style.willChange = self.isActive ? 'transform' : 'auto'
        },
      })
    }
    ;(el as HTMLDivElement & { __title?: typeof t }).__title = t
    return () => {
      st?.kill()
      t.revert()
    }
  }, [variant])

  useEffect(() => {
    if (!visible) return
    const el = card.current as (HTMLDivElement & { __title?: { animateIn: (o?: { delay?: number }) => unknown } }) | null
    if (!el) return
    el.__title?.animateIn({ delay: 0.05 })
    if (prefersReducedMotion()) return
    const tw = gsap.to(el, { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: easeOutQuint, overwrite: 'auto' })
    return () => {
      tw.kill()
    }
  }, [visible, index, variant])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  const chipPos = variant === 'caption' ? 'left-2 top-1.5 lg:left-3 lg:top-2.5' : 'left-5 top-5'

  const body =
    variant === 'caption' ? (
      <div className="flex h-full min-h-[280px] w-full flex-col overflow-hidden bg-[#f2f2f2] p-4 text-[#101010] lg:min-h-0 lg:p-5">
        <div className="relative isolate aspect-[16/10] min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-[#e5e5e5] lg:aspect-video">
          <Media image={tile.image} fill={tile.fill} imgRef={img} />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/[0.14] to-transparent" />
          <div className={`absolute z-10 ${chipPos}`}>
            <CategoryIcon color={tile.swatch} label={category} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-base font-medium leading-[22px] tracking-[-0.025em] text-[#101010]`} style={{ textWrap: 'pretty' }}>
              {tile.title}
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Media image={tile.image} fill={tile.fill} imgRef={img} />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 40%), linear-gradient(0deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0) 68%)' }}
          />
          <div className={`absolute z-10 ${chipPos}`}>
            <CategoryIcon color={tile.swatch} label={category} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div>
              <h3 ref={title} className={`${s.pending} text-left font-display text-[32px] font-normal leading-[38px] tracking-[-0.01em] text-white`} style={{ textWrap: 'pretty' }}>
                {tile.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )

  const cls = 'block h-full w-full overflow-hidden rounded-2xl bg-transparent text-left'

  return (
    <div ref={card} className="h-full min-h-0 w-full" style={{ transformOrigin: 'center center' }}>
      {tile.video ? (
        <>
          <button type="button" aria-label={`Play video: ${tile.title}`} className={`group/video relative cursor-pointer ${cls}`} onClick={() => setOpen(true)}>
            {body}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition duration-300 group-hover/video:scale-110 group-hover/video:bg-black/70">
                <MdPlayArrow className="size-7 translate-x-px" />
              </span>
            </span>
          </button>
          {open ? (
            <div role="dialog" aria-modal="true" aria-label={tile.title}>
              <div className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
              <div className="fixed left-1/2 top-1/2 z-[999] w-[95vw] max-w-7xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl md:w-[80vw] lg:w-[70vw]">
                <div className="flex items-center justify-between gap-4 px-4 py-3 text-white">
                  <p className="text-left font-display text-base font-normal md:text-lg">{tile.title}</p>
                  <button
                    type="button"
                    aria-label="Close video"
                    onClick={() => setOpen(false)}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
                {/* video embed not shipped (Scale streams an MP4 here) */}
                <div className="aspect-video w-full overflow-hidden bg-black" />
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <a href={tile.href ?? '#'} className={cls}>
          {body}
        </a>
      )}
    </div>
  )
}

export default function BlogPreview({ heading: headline, category, tiles: items }: { heading: string; category: string; tiles: BlogTileContent[] }) {
  const tiles: Tile[] = items.slice(0, SLOTS.length).map((t, i) => ({ ...t, ...SLOTS[i] }))
  const heading = useRef<HTMLParagraphElement>(null)
  const slots = useRef<HTMLDivElement[]>([])
  const [visible, setVisible] = useState<Set<number>>(() => new Set())
  const [desktop, setDesktop] = useState(true)
  useRevealText(heading, { mode: 'st', delay: 0.05, start: 'top 80%' })

  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px)')
    const on = () => setDesktop(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
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
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full md:col-span-10 md:col-start-2">
          <div className="mb-8 md:mb-20">
            <p ref={heading} className={`${s.pending} text-center font-display text-[32px] font-normal leading-[1.05] tracking-[-0.01em] text-black lg:text-[4rem]`} style={{ textWrap: 'balance' }}>
              {headline}
            </p>
          </div>
          <div className={s.bpGrid}>
            {tiles.map((t, i) => (
              <div
                key={t.title}
                data-index={i}
                ref={(el) => {
                  if (el) slots.current[i] = el
                }}
                className={s.bpSlot}
                style={{ '--bp-grid-area': t.area } as React.CSSProperties}
              >
                <BlogTile tile={t} index={i} desktop={desktop} visible={visible.has(i)} category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
