'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { createAnimatedText, prefersReducedMotion } from './animatedText'
import type { Post, Slot } from './posts'
import s from './blog.module.css'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// BaseCardViewportEntrance ease: cubic-bezier(0.23, 1, 0.32, 1)
const CARD_EASE = CustomEase.create('blogCardEntrance', 'M0,0 C0.23,1 0.32,1 1,1')

/*
 * One scale.com BlogPreview tile (chunk 3dnh8g0pvq60q, modules 808358 / 598042 / 189756).
 *
 * BaseCardViewportEntrance (useViewportEntrance, scaleDir "none", entranceTranslateX 0 on /blog):
 *   layout: in viewport -> set final; else set { scale: 1, opacity: 0, x: 0, y: 16 }
 *   on visible (IntersectionObserver threshold 0.12, rootMargin "0px 0px -6% 0px", one-shot):
 *     to { scale 1, opacity 1, x 0, y 0 }, 0.6s, cubic-bezier(0.23,1,0.32,1), delay 0.05 * min(index, 3)
 *   transformOrigin: slot origin on desktop, "center top" on < 1024px.
 * Image wrapper: ScrollTrigger trigger = card, "top bottom" -> "center center", scrub: true,
 *   scale mapRange(progress, 0..1, 1.08..1), willChange toggled with isActive.
 * Image hover (CSS): img scale-105, transition-transform 1000ms ease-out.
 * Title: AnimatedText ("words, lines", mask lines, descender compensation), animateIn({ delay: 0.05 }) on visible.
 *   Font size wrapper: desktop clamp(1rem, max(4, 10 - 0.06 * title.length) cqw, 2.5rem); mobile 1.375rem.
 */

type Props = {
  post: Post
  slot: Slot
  index: number
  isMobile: boolean
  thumb: string
  className?: string
}

export default function BentoTile({ post, slot, index, isMobile, thumb, className }: Props) {
  const slotRef = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  // Mobile turns the overlay variant into caption (scale.com helper O()).
  const variant = isMobile ? 'caption' : slot.variant
  const origin = isMobile ? 'center top' : slot.scaleOrigin
  const fontSize = isMobile
    ? '1.375rem'
    : `clamp(1rem, ${Math.max(4, 10 - 0.06 * post.title.length).toFixed(2)}cqw, 2.5rem)`

  // Initial entrance state (before paint).
  useLayoutEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) gsap.set(el, { scale: 1, opacity: 1, x: 0, y: 0 })
    else gsap.set(el, { scale: 1, opacity: 0, x: 0, y: 16 })
  }, [])

  useEffect(() => {
    const el = card.current
    const m = media.current
    const h3 = title.current
    const root = slotRef.current
    if (!el || !m || !h3 || !root) return
    const reduced = prefersReducedMotion()
    const text = createAnimatedText(h3, 'lines,words', true)
    let io: IntersectionObserver | null = null
    let entrance: gsap.core.Tween | null = null

    const ctx = gsap.context(() => {
      gsap.set(m, { transformOrigin: '50% 50%' })
      if (reduced) {
        gsap.set(m, { scale: 1 })
        return
      }
      const apply = (p: number) => gsap.set(m, { scale: gsap.utils.mapRange(0, 1, 1.08, 1, gsap.utils.clamp(0, 1, p)) })
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          m.style.willChange = self.isActive ? 'transform' : 'auto'
        },
        onUpdate: (self) => apply(self.progress),
      })
      apply(st.progress)
    })

    if (!reduced) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            io?.unobserve(e.target)
            entrance = gsap.to(el, {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              delay: 0.05 * Math.min(index, 3),
              ease: CARD_EASE,
              overwrite: 'auto',
            })
            text.animateIn({ delay: 0.05 })
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      )
      io.observe(root)
    }

    return () => {
      io?.disconnect()
      entrance?.kill()
      text.revert()
      ctx.revert()
      m.style.willChange = 'auto'
    }
  }, [index])

  const category = post.category ? (
    <div className="absolute left-5 top-5 z-10">
      <div className="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-[4px] p-1">
        <span
          className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm"
          style={{ backgroundColor: slot.swatch }}
          aria-hidden="true"
        >
          <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z"
              fill="white"
            />
          </svg>
        </span>
        {/* TODO: Vahue copy */}
        <span className="flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em] text-white">
          {post.category.name}
        </span>
      </div>
    </div>
  ) : (
    <div className="absolute left-5 top-5 z-10" />
  )

  const heading = (
    <div className="absolute inset-x-0 bottom-0 z-10 p-6">
      <div style={{ fontSize }}>
        {/* TODO: Vahue copy */}
        <h3
          ref={title}
          className={`${s.title} ${s.pending} text-left font-display text-white ${
            variant === 'overlay'
              ? 'text-[32px] font-normal leading-[38px] tracking-[-0.01em]'
              : 'text-[length:inherit] font-medium leading-[1.375] tracking-[-0.025em]'
          }`}
        >
          {post.title}
        </h3>
      </div>
    </div>
  )

  const image = (
    <div ref={media} className={`absolute inset-0 ${variant === 'overlay' ? 'bg-neutral-900' : ''}`}>
      {/* Neutral thumbnail tile (TODO: Vahue imagery) */}
      <div className={`${s.thumb} absolute inset-0`} style={{ background: thumb }} aria-hidden="true" />
    </div>
  )

  return (
    <div
      ref={slotRef}
      className={`${s.slot} ${s.slotProportional} ${className ?? ''}`}
      style={{ ['--bp-grid-area' as string]: slot.gridArea }}
      data-tile-key={post.slug}
    >
      <div ref={card} className="h-full min-h-0 w-full" style={{ transformOrigin: origin }}>
        <a href="#" className={`${s.tile} block h-full w-full overflow-hidden rounded-2xl bg-transparent`}>
          {variant === 'overlay' ? (
            <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">{image}</div>
                <div className={`pointer-events-none absolute inset-0 z-[1] ${s.overlayShade}`} aria-hidden="true" />
                {category}
                {heading}
              </div>
            </div>
          ) : (
            <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">{image}</div>
              <div className={`pointer-events-none absolute inset-0 z-[1] ${s.captionShade}`} aria-hidden="true" />
              {category}
              {heading}
            </div>
          )}
        </a>
      </div>
    </div>
  )
}
