'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, type AnimatedText } from './animatedText'
import { prefersReducedMotion, useRetroEnter } from './scroll'
import type { BlogTile } from './content'
import s from './home.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * BlogPreview, light theme, 8 tiles (3x8z3_0hhtdcb.js sha256 89a4cc62…, modules 808358 + 189756; same motion as
 * about/BlogPreview.tsx, which stops at 5 slots). >= 1024: 4 columns, gap 8, grid-auto-rows minmax(70px, auto), slot table below.
 * Under 1024: one column, row-gap 16, first 4 tiles, overlay tiles use the caption layout.
 * Tile: IO threshold .12, rootMargin "0px 0px -6% 0px"; opacity 0 / y 16 -> 1 / 0, .6s cubic-bezier(.23,1,.32,1), delay .05*min(i,3),
 * tiles in view on mount start visible; title animateIn delay .05. Picture: scale 1.08 -> 1, tile "top bottom" -> "center center".
 * Picture hover: img scale 1.05, 1000ms ease-out. Heading: top 80%, retroactive, delay .05.
 */

const SLOTS: { variant: 'titleOnly' | 'overlay' | 'caption'; area: string; swatch: string }[] = [
  { variant: 'titleOnly', area: '1 / 1 / 5 / 3', swatch: '#C4B8D4' },
  { variant: 'overlay', area: '1 / 3 / 6 / 5', swatch: '#1D4133' },
  { variant: 'caption', area: '5 / 1 / 7 / 3', swatch: '#5A6B85' },
  { variant: 'caption', area: '6 / 3 / 7 / 4', swatch: '#A07862' },
  { variant: 'caption', area: '6 / 4 / 7 / 5', swatch: '#A3BED8' },
  { variant: 'caption', area: '7 / 1 / 9 / 2', swatch: '#D2DAE3' },
  { variant: 'overlay', area: '7 / 2 / 9 / 4', swatch: '#BD9B7D' },
  { variant: 'caption', area: '7 / 4 / 9 / 5', swatch: '#3F4F3A' },
  { variant: 'caption', area: '9 / 1 / 11 / 3', swatch: '#B89670' },
  { variant: 'caption', area: '9 / 3 / 11 / 5', swatch: '#2A5754' },
]
const OVERLAY_GRADIENT = 'linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 40%), linear-gradient(0deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.14) 38%, rgba(0,0,0,0) 68%)'

const quint = gsap.parseEase('power4.out')

function Chip({ color, label, labelClass }: { color: string; label: string; labelClass: string }) {
  return (
    <div className="CategoryIcon inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-sm p-1">
      <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: color }} aria-hidden>
        <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z" fill="white" />
        </svg>
      </span>
      <span className={`flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono text-[11px] uppercase leading-none tracking-wider ${labelClass}`}>{label}</span>
    </div>
  )
}

function Tile({ post, index, desktop, visible }: { post: BlogTile; index: number; desktop: boolean; visible: boolean }) {
  const slot = SLOTS[index]
  const card = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const text = useRef<AnimatedText | null>(null)
  const variant = !desktop && slot.variant === 'overlay' ? 'caption' : slot.variant
  const light = post.textColor !== 'dark'

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
    const tw = gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: quint, overwrite: 'auto' })
    return () => {
      tw.kill()
    }
  }, [visible, index])

  const media = (bg = '') => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div ref={img} className={`${s.bpImgWrap} absolute inset-0 ${bg}`} style={{ transformOrigin: '50% 50%' }}>
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={post.imageAlt ?? ''} loading="lazy" className={`${s.bpImg} absolute inset-0 h-full w-full object-cover`} />
        ) : null}
      </div>
    </div>
  )
  const chipLabel = light ? 'text-white' : 'text-neutral-950'
  const body =
    variant === 'titleOnly' ? (
      <div className="relative flex h-full min-h-[115px] w-full flex-col p-4 text-neutral-950 lg:min-h-0 lg:p-5" style={{ backgroundColor: '#F2F2F2' }}>
        <div className="shrink-0">{post.category ? <Chip color={slot.swatch} label={post.category} labelClass="text-neutral-800" /> : null}</div>
        <div className="mt-auto flex min-h-0 w-full flex-col items-start pb-0.5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-[24px] font-normal leading-[1.25] text-neutral-950 lg:text-[2.5rem] lg:leading-[1.25]`} style={{ textWrap: 'balance' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    ) : variant === 'caption' ? (
      <div className="flex h-full min-h-[280px] w-full flex-col overflow-hidden p-4 text-neutral-950 lg:min-h-0 lg:p-5" style={{ backgroundColor: '#F2F2F2' }}>
        <div className="relative isolate aspect-[16/10] min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-neutral-200 lg:aspect-video">
          {media()}
          {post.gradient && post.image ? <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/[0.14] to-transparent" /> : null}
          <div className="absolute left-2 top-1.5 z-10 lg:left-3 lg:top-2.5">
            {post.category ? <Chip color={slot.swatch} label={post.category} labelClass={chipLabel} /> : null}
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">
          <div>
            <h3 ref={title} className={`${s.pending} text-left font-display text-base font-medium leading-snug tracking-tight text-neutral-950`} style={{ textWrap: 'pretty' }}>
              {post.title}
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {media('bg-neutral-900')}
          {post.gradient && post.image ? <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ backgroundImage: OVERLAY_GRADIENT }} /> : null}
          <div className="absolute left-5 top-5 z-10">
            {post.category ? <Chip color={slot.swatch} label={post.category} labelClass={chipLabel} /> : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div>
              <h3 ref={title} className={`${s.pending} text-left font-display text-[32px] font-normal leading-[38px] ${light ? 'text-white' : 'text-neutral-950'}`} style={{ textWrap: 'pretty' }}>
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  return (
    <div ref={card} className="BaseCard h-full min-h-0 w-full">
      <Link href={post.href} className="BlogPreviewTile block h-full w-full overflow-hidden rounded-2xl bg-transparent focus-visible:[outline:revert]">
        {body}
      </Link>
    </div>
  )
}

export default function BlogPreview({ heading, posts }: { heading: string; posts: BlogTile[] }) {
  const h = useRef<HTMLHeadingElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const slots = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<Set<number>>(() => new Set())
  const [desktop, setDesktop] = useState<boolean | null>(null)
  const text = useRef<AnimatedText | null>(null)
  useEffect(() => {
    if (h.current) text.current = createAnimatedText(h.current)
    return () => text.current?.revert()
  }, [])
  useRetroEnter(wrap, () => {
    text.current?.animateIn({ delay: 0.05 })
  })
  useEffect(() => {
    const mq = matchMedia('(max-width: 1023px)')
    const on = () => setDesktop(!mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const shown = (desktop === true ? posts : posts.slice(0, 4)).slice(0, SLOTS.length)
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
          <div ref={wrap} className="mb-8 md:mb-20">
            <h2 ref={h} className={`${s.pending} whitespace-pre-line text-center font-display text-[32px] font-normal leading-[1.05] text-black lg:text-[4rem] lg:leading-[1.05]`} style={{ textWrap: 'balance' }}>
              {heading}
            </h2>
          </div>
          <div className={s.bpGrid}>
            {shown.map((p, i) => (
              <div key={p.title} data-index={i} ref={(el) => { slots.current[i] = el }} className={`BlogPreview__slot ${s.bpSlot}`} style={{ '--bp-grid-area': SLOTS[i].area } as React.CSSProperties}>
                <Tile post={p} index={i} desktop={desktop !== false} visible={visible.has(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
