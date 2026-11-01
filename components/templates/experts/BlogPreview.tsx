'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from '@/components/templates/careers/animatedText'
import type { ResourcePost, ResourcesContent } from './content'
import s from './experts.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com BlogPreview (module 808358 + slot table 189756; chunk 3lbyg5foru4s_.js, identical to 3x8z3_0hhtdcb.js
 * apart from minifier renames). /experts props: heading "Resources", pageThemeOverride "light", captionFullBleed false,
 * fullWidth false (md:col-start-2 col-span-10), 5 static posts, no image gradients.
 * - isMobile = matchMedia("(max-width: 1023px)") with a server snapshot of undefined; anything but `false` caps the
 *   tiles at 4, so the server HTML and phones show 4 and desktop adds the 5th after hydration.
 * - Slots (desktop): titleOnly 1/1/5/3, overlay 1/3/6/5, caption 5/1/7/3, caption 6/3/7/4, caption 6/4/7/5. Below 1024
 *   one column (row-gap 16) and "overlay" renders as "caption".
 * - Each slot is observed once (IO threshold 0.12, rootMargin 0 0 -6% 0). Entrance (BaseCardViewportEntrance, scaleDir
 *   "none"): off-screen tiles start opacity 0 / y 16 and tween to 1 / 0 over 0.6s, delay 0.05 * min(i, 3); the ease
 *   string "cubic-bezier(0.23, 1, 0.32, 1)" isn't a GSAP ease (no CustomEase on the page), so GSAP falls back to its
 *   default power1.out. Tiles already on screen at mount start visible. Then the title AnimatedText plays (delay 0.05).
 * - Image: scale 1.08 -> 1 scrubbed, trigger = tile, "top bottom" -> "center center"; CSS hover scale 1.05 on the img
 *   (group-hover/full-bleed, group-hover/caption, 1000ms ease-out).
 * - Chip label colour on image tiles comes from the image's mean luminance (64x64 canvas; < .5 -> white text, else
 *   neutral-950), skipped on mobile (white). titleOnly chip: neutral-800.
 * - Heading: AnimatedText, useScrollTrigger start "top 80%", delay 0.05.
 */

const MOBILE = '(max-width: 1023px)'
type Variant = 'titleOnly' | 'overlay' | 'caption'
const SLOTS: { variant: Variant; area: string; origin: string; swatch: string }[] = [
  { variant: 'titleOnly', area: '1 / 1 / 5 / 3', origin: 'left center', swatch: '#C4B8D4' },
  { variant: 'overlay', area: '1 / 3 / 6 / 5', origin: 'right center', swatch: '#1D4133' },
  { variant: 'caption', area: '5 / 1 / 7 / 3', origin: 'left center', swatch: '#5A6B85' },
  { variant: 'caption', area: '6 / 3 / 7 / 4', origin: 'center center', swatch: '#A07862' },
  { variant: 'caption', area: '6 / 4 / 7 / 5', origin: 'right center', swatch: '#A3BED8' },
]
const INK = '#101010'

const subscribe = (cb: () => void) => {
  const mq = matchMedia(MOBILE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useIsMobile = () => useSyncExternalStore<boolean | undefined>(subscribe, () => matchMedia(MOBILE).matches, () => undefined)

const lumaCache = new Map<string, boolean>()

function CategoryIcon({ color, label, labelColor }: { color: string; label: string; labelColor: string }) {
  return (
    <div className="CategoryIcon inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-sm p-1">
      <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: color }} aria-hidden="true">
        <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z" fill="white" />
        </svg>
      </span>
      <span className="flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em]" style={{ color: labelColor }}>
        {label}
      </span>
    </div>
  )
}

function Tile({ post, index, mobile, visible }: { post: ResourcePost; index: number; mobile: boolean | undefined; visible: boolean }) {
  const slot = SLOTS[index]
  const isMobile = mobile === true
  const variant: Variant = isMobile && slot.variant === 'overlay' ? 'caption' : slot.variant
  const card = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const text = useRef<AnimatedText | null>(null)
  const played = useRef(false)
  const image = variant === 'titleOnly' ? undefined : post.image
  const [lightText, setLightText] = useState(true)

  useEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    if (r.top < innerHeight && r.bottom > 0) gsap.set(el, { scale: 1, opacity: 1, x: 0, y: 0 })
    else gsap.set(el, { scale: 1, opacity: 0, x: 0, y: 16 })
  }, [])

  useEffect(() => {
    if (!title.current) return
    text.current = createAnimatedText(title.current)
    if (played.current) text.current.animateIn()
    return () => {
      text.current?.revert()
      text.current = null
    }
  }, [variant])

  useEffect(() => {
    if (!visible) return
    if (!played.current) {
      played.current = true
      text.current?.animateIn({ delay: 0.05 })
    }
    if (prefersReducedMotion() || !card.current) return
    const tw = gsap.to(card.current, { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: 'cubic-bezier(0.23, 1, 0.32, 1)', overwrite: 'auto' })
    return () => {
      tw.kill()
    }
  }, [visible, index])

  useEffect(() => {
    const el = card.current
    const w = img.current
    if (!image || !el || !w) return
    gsap.set(w, { transformOrigin: '50% 50%' })
    if (prefersReducedMotion()) return void gsap.set(w, { scale: 1 })
    const zoom = (p: number) => gsap.set(w, { scale: gsap.utils.mapRange(0, 1, 1.08, 1, gsap.utils.clamp(0, 1, p)) })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'center center',
      invalidateOnRefresh: true,
      onToggle: (self) => (w.style.willChange = self.isActive ? 'transform' : 'auto'),
      onUpdate: (self) => zoom(self.progress),
    })
    zoom(st.progress)
    return () => {
      st.kill()
      w.style.willChange = 'auto'
    }
  }, [image, variant])

  // luminance of the cover decides the chip / overlay text colour (desktop only)
  useEffect(() => {
    if (!image || isMobile) return
    if (lumaCache.has(image)) return setLightText(lumaCache.get(image)!)
    let off = false
    const run = () => {
      const im = new Image()
      im.onload = () => {
        if (off) return
        try {
          const c = document.createElement('canvas')
          c.width = c.height = 64
          const g = c.getContext('2d')!
          g.drawImage(im, 0, 0, 64, 64)
          const { data } = g.getImageData(0, 0, 64, 64)
          let r = 0, gg = 0, b = 0, n = 0
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]
            gg += data[i + 1]
            b += data[i + 2]
            n++
          }
          const light = (0.299 * (r / n) + 0.587 * (gg / n) + 0.114 * (b / n)) / 255 < 0.5
          lumaCache.set(image, light)
          setLightText(light)
        } catch {}
      }
      im.src = image
    }
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
    const id = ric ? ric(run, { timeout: 2000 }) : window.setTimeout(run, 1)
    return () => {
      off = true
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback
      if (ric && cic) cic(id)
      else clearTimeout(id)
    }
  }, [image, isMobile])

  const light = isMobile ? true : lightText
  const media = image ? (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={img} className={`absolute inset-0 ${variant === 'overlay' ? 'bg-neutral-900' : ''} ${s.zoomGroup}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${s.zoomImg}`} />
      </div>
    </div>
  ) : null

  let body
  if (variant === 'titleOnly') {
    body = (
      <div className="relative flex h-full min-h-[115px] w-full flex-col p-4 lg:min-h-0 lg:p-5" style={{ backgroundColor: '#F2F2F2', color: INK }}>
        <div className="shrink-0">
          <CategoryIcon color={slot.swatch} label={post.category} labelColor="#262626" />
        </div>
        <div className="mt-auto flex min-h-0 w-full flex-col items-start pb-0.5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-[24px] font-normal leading-[1.25] lg:text-[2.5rem]`} style={{ color: INK, textWrap: 'balance' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    )
  } else if (variant === 'overlay') {
    body = (
      <div className={`relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0 ${image ? '' : 'bg-neutral-900'}`}>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {media}
          <div className="absolute left-5 top-5 z-10">
            <CategoryIcon color={slot.swatch} label={post.category} labelColor={light ? '#ffffff' : INK} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div>
              <h3 ref={title} className={`${s.pending} text-left font-display text-[32px] font-normal leading-[38px]`} style={{ color: light ? '#ffffff' : INK, textWrap: 'pretty' }}>
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    body = (
      <div className="flex h-full min-h-[280px] w-full flex-col overflow-hidden p-4 lg:min-h-0 lg:p-5" style={{ backgroundColor: '#F2F2F2', color: INK }}>
        <div className="relative isolate aspect-[16/10] min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-neutral-200 lg:aspect-video">
          {media}
          <div className="absolute left-2 top-1.5 z-10 lg:left-3 lg:top-2.5">
            <CategoryIcon color={slot.swatch} label={post.category} labelColor={image && !light ? INK : '#ffffff'} />
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-base font-medium leading-[1.375] !tracking-[-0.025em]`} style={{ color: INK, textWrap: 'pretty' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={card} className="BaseCard h-full min-h-0 w-full" style={{ transformOrigin: isMobile ? 'center top' : slot.origin }}>
      <a href={post.href} className="BlogPreviewTile block h-full w-full overflow-hidden rounded-2xl bg-transparent">
        {body}
      </a>
    </div>
  )
}

export default function BlogPreview({ content }: { content: ResourcesContent }) {
  const mobile = useIsMobile()
  const posts = (mobile !== false ? content.posts.slice(0, 4) : content.posts).slice(0, SLOTS.length)
  const heading = useRef<HTMLHeadingElement>(null)
  const slots = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<Set<number>>(() => new Set())

  useEffect(() => {
    const el = heading.current
    if (!el) return
    const t = createAnimatedText(el)
    let played = false
    const play = () => {
      if (played) return
      played = true
      t.animateIn({ delay: 0.05 })
    }
    const st = ScrollTrigger.create({ trigger: el.parentElement, start: 'top 80%', once: true, onEnter: play })
    return () => {
      st.kill()
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
  }, [posts.length])

  return (
    <section className="BlogPreview isolate w-full scroll-mt-28 overflow-hidden bg-white py-12 md:py-16">
      <div className="grid grid-cols-8 gap-2 px-6 md:grid-cols-12">
        <div className="col-span-full md:col-span-10 md:col-start-2">
          <div className="mb-8 md:mb-20">
            <h2 ref={heading} className={`${s.pending} text-center font-display text-[32px] font-normal leading-[1.05] text-black lg:text-[4rem]`} style={{ textWrap: 'balance' }}>
              {content.heading}
            </h2>
          </div>
          <div className={s.bpGrid}>
            {posts.map((p, i) => (
              <div
                key={p.title}
                data-index={i}
                ref={(el) => {
                  slots.current[i] = el
                }}
                className={`BlogPreview__slot ${s.bpSlot}`}
                style={{ '--bp-grid-area': SLOTS[i].area } as React.CSSProperties}
              >
                <Tile post={p} index={i} mobile={mobile} visible={visible.has(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
