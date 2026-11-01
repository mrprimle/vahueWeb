'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAnimatedText, prefersReducedMotion, type AnimatedText } from './animatedText'
import type { BentoVariant } from './content'
import s from './blog.module.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * One scale.com BlogPreview tile (module 808358 function j) inside BaseCardViewportEntrance (module 598042/317967).
 *
 * Entrance (scaleDir "none", entranceTranslateX 0 on /blog):
 *   layout effect: in viewport -> set { scale 1, opacity 1, x 0, y 0 }, else { scale 1, opacity 0, x 0, y 16 }.
 *   when the slot turns visible: gsap.to(final, 0.6s, delay 0.05 * min(index, 3), overwrite "auto").
 *   Scale passes ease "cubic-bezier(0.23, 1, 0.32, 1)", a string GSAP cannot parse, so the tween runs on GSAP's
 *   default ease power1.out (measured: opacity .085/.240/.503/.710/.861/.958/.999 at 50ms steps = power1.out over 0.6s).
 * Title: AnimatedText ("words, lines", line masks with descender compensation), animateIn({ delay 0.05 }) once
 *   (Scale passes duration 1.2, which the default intro ignores).
 * Image wrapper: ScrollTrigger trigger = card, "top bottom" -> "center center", scrub true, invalidateOnRefresh,
 *   scale mapRange(progress, 0..1, 1.08..1, clamped); willChange "transform" while active, "auto" otherwise.
 * Image hover: Tailwind `group-hover/caption:scale-105 transition-transform duration-1000 ease-out` on the <img>; the
 *   group is the image wrapper, which the category chip and title boxes (z-10) sit on top of, so the zoom only runs
 *   while the pointer is over bare image (not over the title or chip).
 * Text tone (desktop only, no textColor override): the cover is drawn into a 64x64 canvas in requestIdleCallback
 *   (timeout 2s); mean luminance < 0.5 keeps light text, otherwise the chip label turns neutral-950 and the overlay
 *   variant switches to the white gradient / dark title. Results are cached per image URL.
 */

const toneCache = new Map<string, 'light' | 'dark'>()

type Props = {
  title: string
  href: string
  category: string | null
  image: string
  imageAlt: string
  gradient: boolean
  variant: BentoVariant
  swatch?: string
  origin: string
  index: number
  isMobile: boolean
  isVisible: boolean
}

export default function BentoTile({ title, href, category, image, imageAlt, gradient, variant, swatch, origin, index, isMobile, isVisible }: Props) {
  const card = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const h3 = useRef<HTMLHeadingElement>(null)
  const text = useRef<AnimatedText | null>(null)
  const played = useRef(false)
  const [lightText, setLightText] = useState(true)

  // BaseCardViewportEntrance initial state (before paint).
  useLayoutEffect(() => {
    const el = card.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) gsap.set(el, { scale: 1, opacity: 1, x: 0, y: 0 })
    else gsap.set(el, { scale: 1, opacity: 0, x: 0, y: 16 })
  }, [])

  // Entrance tween once the slot is visible.
  useEffect(() => {
    const el = card.current
    if (!isVisible || !el || prefersReducedMotion()) return
    const t = gsap.to(el, { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.6, delay: 0.05 * Math.min(index, 3), ease: 'power1.out', overwrite: 'auto' })
    return () => {
      t.kill()
    }
  }, [isVisible, index])

  // Title split + intro.
  useEffect(() => {
    const el = h3.current
    if (!el) return
    const t = createAnimatedText(el, 'lines,words', true)
    text.current = t
    if (played.current) t.seek()
    return () => {
      t.revert()
      text.current = null
    }
  }, [variant, isMobile])

  useEffect(() => {
    if (!isVisible || played.current) return
    played.current = true
    text.current?.animateIn({ delay: 0.05 })
  }, [isVisible])

  // Image scrub.
  useEffect(() => {
    const el = card.current
    const m = media.current
    if (!el || !m) return
    gsap.set(m, { transformOrigin: '50% 50%' })
    if (prefersReducedMotion()) {
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
    return () => {
      st.kill()
      m.style.willChange = 'auto'
    }
  }, [variant])

  // Cover luminance -> text tone (desktop only).
  useEffect(() => {
    if (isMobile || !image) return
    const cached = toneCache.get(image)
    if (cached) {
      setLightText(cached === 'light')
      return
    }
    let dead = false
    const run = () => {
      if (dead) return
      const img = new window.Image()
      const measure = () => {
        if (dead) return
        try {
          const c = document.createElement('canvas')
          c.width = 64
          c.height = 64
          const ctx = c.getContext('2d')
          if (!ctx) return
          ctx.drawImage(img, 0, 0, 64, 64)
          const { data } = ctx.getImageData(0, 0, 64, 64)
          let r = 0, g = 0, b = 0, n = 0
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]
            g += data[i + 1]
            b += data[i + 2]
            n++
          }
          const light = ((r / n) * 0.299 + (g / n) * 0.587 + (b / n) * 0.114) / 255 < 0.5
          toneCache.set(image, light ? 'light' : 'dark')
          setLightText(light)
        } catch {}
      }
      img.crossOrigin = 'anonymous'
      img.onload = measure
      img.src = image
      if (img.complete) {
        img.onload = null
        measure()
      }
    }
    const ric = window.requestIdleCallback
    const id = typeof ric === 'function' ? ric(run, { timeout: 2000 }) : window.setTimeout(run, 1)
    return () => {
      dead = true
      if (typeof window.cancelIdleCallback === 'function' && typeof ric === 'function') window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [image, isMobile])

  const overlay = variant === 'overlay'
  const chip = category ? (
    <div className="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-[4px] p-1">
      <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: swatch ?? '#525252' }} aria-hidden="true">
        <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z"
            fill="white"
          />
        </svg>
      </span>
      <span className={`flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate font-mono text-[11px] uppercase leading-none tracking-[0.05em] ${lightText ? 'text-white' : 'text-[#101010]'}`}>
        {category}
      </span>
    </div>
  ) : null

  const fontSize = isMobile ? '1.375rem' : `clamp(1rem, ${Math.max(4, 10 - 0.06 * title.length).toFixed(2)}cqw, 2.5rem)`
  const heading = (
    <div style={{ fontSize }}>
      <h3
        ref={h3}
        className={`${s.title} ${s.pending} text-left font-display ${
          overlay
            ? `text-[32px] font-normal leading-[38px] tracking-[-0.01em] ${lightText ? 'text-white' : 'text-[#101010]'}`
            : 'text-[length:inherit] font-medium leading-[1.375] tracking-[-0.025em] text-white'
        }`}
      >
        {title}
      </h3>
    </div>
  )

  const img = (
    <div ref={media} className={`${s.media} absolute inset-0 ${overlay ? 'bg-neutral-900' : ''}`}>
      <img src={image} alt={imageAlt} loading="lazy" decoding="async" className={`${s.cover} absolute inset-0 h-full w-full object-cover`} />
    </div>
  )

  return (
    <div ref={card} className="h-full min-h-0 w-full" style={{ transformOrigin: origin }}>
      <Link href={href} className={`${s.tile} ${s.focusRing} block h-full w-full overflow-hidden rounded-2xl bg-transparent`}>
        {overlay ? (
          <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden lg:min-h-0">
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="absolute inset-0 z-0 overflow-hidden">{img}</div>
              {gradient && <div className={`pointer-events-none absolute inset-0 z-[1] ${lightText ? s.overlayShade : s.overlayShadeLight}`} aria-hidden="true" />}
              <div className="absolute left-5 top-5 z-10">{chip}</div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-6">{heading}</div>
            </div>
          </div>
        ) : (
          <div className="relative flex h-full min-h-[280px] w-full flex-col overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">{img}</div>
            <div className={`pointer-events-none absolute inset-0 z-[1] ${s.captionShade}`} aria-hidden="true" />
            <div className="absolute left-5 top-5 z-10">{chip}</div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-6">{heading}</div>
          </div>
        )}
      </Link>
    </div>
  )
}
