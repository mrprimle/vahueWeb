'use client'

// Scale modules 808358, 189756 (slot table) and 280239 (CategoryIcon), chunk 3x8z3_0hhtdcb.js.
// The video-tile branch (Radix dialog) is not ported: /  does not use it. Port it from 808358 if a page needs it.
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { mapRange } from '../lib/math'
import { useTheme } from '../lib/themeStore'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { useMediaQuery } from '../lib/useMediaQuery'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'
import { BaseCard } from './BaseCard'
import styles from './BlogPreview.module.css'
import { isInternalHref } from './CMSLink'
import { RichText, type RichBlock } from './RichText'

export type BlogCategory = { name: string; color?: { hex: string } | null }
export type BlogPreviewPost = {
  _key?: string
  title: string
  url?: string
  /** Absent on a tile that has an image slot: the tile renders Scale's empty grey image box. */
  image?: string
  alt?: string
  category?: BlogCategory
  textColor?: 'dark' | 'light'
  imageGradientOverlay?: boolean | null
  titleOnly?: boolean
  openInNewTab?: boolean
  variantOverride?: Variant
}

type Variant = 'titleOnly' | 'overlay' | 'caption'
type Slot = { variant: Variant; gridArea: string; scaleOrigin: string; entranceTranslateX: number; categorySwatchColor: string }

const SLOTS: Slot[] = [
  { variant: 'titleOnly', gridArea: '1 / 1 / 5 / 3', scaleOrigin: 'left center', entranceTranslateX: -40, categorySwatchColor: '#C4B8D4' },
  { variant: 'overlay', gridArea: '1 / 3 / 6 / 5', scaleOrigin: 'right center', entranceTranslateX: 40, categorySwatchColor: '#1D4133' },
  { variant: 'caption', gridArea: '5 / 1 / 7 / 3', scaleOrigin: 'left center', entranceTranslateX: -40, categorySwatchColor: '#5A6B85' },
  { variant: 'caption', gridArea: '6 / 3 / 7 / 4', scaleOrigin: 'center center', entranceTranslateX: 0, categorySwatchColor: '#A07862' },
  { variant: 'caption', gridArea: '6 / 4 / 7 / 5', scaleOrigin: 'right center', entranceTranslateX: 40, categorySwatchColor: '#A3BED8' },
  { variant: 'caption', gridArea: '7 / 1 / 9 / 2', scaleOrigin: 'left center', entranceTranslateX: -40, categorySwatchColor: '#D2DAE3' },
  { variant: 'overlay', gridArea: '7 / 2 / 9 / 4', scaleOrigin: 'center center', entranceTranslateX: 0, categorySwatchColor: '#BD9B7D' },
  { variant: 'caption', gridArea: '7 / 4 / 9 / 5', scaleOrigin: 'right center', entranceTranslateX: 40, categorySwatchColor: '#3F4F3A' },
  { variant: 'caption', gridArea: '9 / 1 / 11 / 3', scaleOrigin: 'left center', entranceTranslateX: -40, categorySwatchColor: '#B89670' },
  { variant: 'caption', gridArea: '9 / 3 / 11 / 5', scaleOrigin: 'right center', entranceTranslateX: 40, categorySwatchColor: '#2A5754' },
]
const MOBILE_MAX = 4
const TEXT_DURATION = 1.2
const ROOT_MARGIN = '0px 0px -6% 0px'
const THRESHOLD = 0.12
const MOBILE_QUERY = '(max-width: 1023px)'
const slotAt = (i: number) => (i < 0 || i >= SLOTS.length ? null : SLOTS[i])

export function CategoryIcon({ category, colorHex, labelClassName, className }: { category: BlogCategory; colorHex?: string; labelClassName?: string; className?: string }) {
  const name = category.name?.trim()
  if (!name) return null
  return (
    <div className={cn('CategoryIcon inline-flex max-w-full min-w-0 items-center gap-2 justify-center rounded-sm p-1', className)}>
      <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[5px] shadow-sm" style={{ backgroundColor: colorHex ?? '#525252' }} aria-hidden>
        <svg className="block size-[8px] shrink-0" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z" fill="white" />
        </svg>
      </span>
      <span className={cn('flex min-h-[26px] min-w-0 flex-1 items-center self-center truncate detail-mono text-[11px] tracking-wider leading-none', labelClassName ?? 'text-white')}>{name}</span>
    </div>
  )
}

const luminanceCache = new Map<string, 'light' | 'dark'>()

function Tile({
  post,
  layoutVariant,
  pageThemeOverride,
  categoryOverride,
  categorySwatchColor,
  scaleTransformOrigin = 'center top',
  staggerIndex = 0,
  isMobile = false,
  isVisible = false,
  captionFullBleed = false,
}: {
  post: BlogPreviewPost
  layoutVariant: Variant
  pageThemeOverride?: 'light' | 'dark'
  categoryOverride?: BlogCategory | null
  categorySwatchColor?: string
  scaleTransformOrigin?: string
  staggerIndex?: number
  isMobile?: boolean
  isVisible?: boolean
  captionFullBleed?: boolean
}) {
  const titleRef = useRef<AnimatedTextHandle>(null)
  const zoom = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const played = useRef(false)
  const lastVariant = useRef<Variant | null>(null)
  const [imageIsDark, setImageIsDark] = useState(true)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)') === true
  const title = post.title
  const category = categoryOverride ?? post.category
  const href = post.url
  const titleOnly = layoutVariant === 'titleOnly'
  const overlay = layoutVariant === 'overlay'
  const caption = layoutVariant === 'caption'
  const image = titleOnly ? null : (post.image ?? null)
  const alt = post.alt ?? ''
  useEffect(() => {
    if (!image) return
    const trigger = card.current
    const el = zoom.current
    if (!trigger || !el) return
    gsap.set(el, { transformOrigin: '50% 50%' })
    if (reducedMotion) {
      gsap.set(el, { scale: 1 })
      return
    }
    const apply = (p: number) => gsap.set(el, { scale: mapRange(p, 0, 1, 1.08, 1, true) })
    const st = ScrollTrigger.create({
      trigger,
      start: 'top bottom',
      end: 'center center',
      scrub: true,
      invalidateOnRefresh: true,
      onToggle(self) {
        el.style.willChange = self.isActive ? 'transform' : 'auto'
      },
      onUpdate(self) {
        apply(self.progress)
      },
    })
    apply(st.progress)
    return () => {
      st.kill()
      el.style.willChange = 'auto'
    }
  }, [image, layoutVariant, reducedMotion])
  useEffect(() => {
    if (!isVisible) return
    const was = lastVariant.current
    const changed = was !== null && was !== layoutVariant
    lastVariant.current = layoutVariant
    const t = titleRef.current
    if (!t) return
    t.ready().then(() => {
      t.reflowLayout?.()
      if (changed && played.current) t.seek?.(1)
      else if (!played.current)
        t.animateIn({ delay: 0.05, duration: TEXT_DURATION }).then(() => {
          played.current = true
        })
    })
  }, [isVisible, layoutVariant])
  useEffect(() => {
    if (post.textColor !== undefined || !image || isMobile) return
    if (luminanceCache.has(image)) {
      setImageIsDark(luminanceCache.get(image) === 'light')
      return
    }
    let cancelled = false
    const read = (img: HTMLImageElement) => {
      if (cancelled) return
      try {
        const c = document.createElement('canvas')
        c.width = 64
        c.height = 64
        const ctx = c.getContext('2d')!
        ctx.drawImage(img, 0, 0, 64, 64)
        const { data } = ctx.getImageData(0, 0, 64, 64)
        let r = 0
        let g = 0
        let b = 0
        let n = 0
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          n++
        }
        const dark = ((r / n) * 0.299 + (g / n) * 0.587 + (b / n) * 0.114) / 255 < 0.5
        luminanceCache.set(image, dark ? 'light' : 'dark')
        if (!cancelled) setImageIsDark(dark)
      } catch {}
    }
    const load = () => {
      if (cancelled) return
      const i = new window.Image()
      i.crossOrigin = 'anonymous'
      i.onload = () => read(i)
      i.src = image
      if (i.complete) {
        i.onload = null
        read(i)
      }
    }
    const handle = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(load, { timeout: 2000 }) : window.setTimeout(load, 1)
    return () => {
      cancelled = true
      if (handle != null) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle)
        else window.clearTimeout(handle)
      }
    }
  }, [image, post.textColor, isMobile])
  const lightPage = pageThemeOverride === 'light'
  const lightText = post.textColor !== undefined ? post.textColor !== 'dark' : imageIsDark
  const swatch = category?.color?.hex ?? categorySwatchColor
  const gradient = post.imageGradientOverlay === true && image
  const overlayGradient = gradient
    ? lightText
      ? 'pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0)_40%),linear-gradient(0deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.14)_38%,rgba(0,0,0,0)_68%)]'
      : 'pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_40%),linear-gradient(0deg,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.12)_38%,rgba(255,255,255,0)_68%)]'
    : null
  const captionGradient = gradient ? (lightText ? 'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/14 to-transparent' : 'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/52 via-white/14 to-transparent') : null
  const hasContent = !!title || !!(typeof href === 'string' && href.trim()) || !!image
  const chipPos = 'absolute left-5 top-5 z-10'
  const chip = (onImage: boolean, darkLabel = false) =>
    category ? <CategoryIcon category={category} colorHex={swatch} labelClassName={onImage ? (darkLabel ? 'text-neutral-950' : undefined) : lightPage ? 'text-neutral-800' : 'text-white/90'} /> : null
  const fluidTitle = useMemo(() => {
    if (!captionFullBleed || !title) return undefined
    if (isMobile) return { fontSize: '1.375rem' }
    return { fontSize: `clamp(1rem, ${Math.max(4, 10 - 0.06 * title.length).toFixed(2)}cqw, 2.5rem)` }
  }, [captionFullBleed, title, isMobile])
  const titleEl = title ? (
    <div style={fluidTitle}>
      <AnimatedText
        ref={titleRef}
        tagName="h3"
        contentKey={post._key ?? undefined}
        className={cn(
          titleOnly && 'text-pretty text-left text-balance font-normal max-lg:text-[24px] max-lg:leading-[1.25] lg:text-[2.5rem] lg:leading-[1.25]',
          overlay && 'text-pretty text-left text-[32px] font-normal leading-[38px]',
          caption && 'text-pretty text-left font-medium leading-snug tracking-tight',
          !captionFullBleed && caption && 'text-base',
          overlay && (lightText ? 'text-white' : 'text-neutral-950'),
          caption && (captionFullBleed && image ? 'text-white' : lightPage ? 'text-neutral-950' : 'text-white'),
          titleOnly && (lightPage ? 'text-neutral-950' : 'text-white'),
        )}
      >
        {title}
      </AnimatedText>
    </div>
  ) : null
  const titleOnlyBody = (
    <div className={cn('relative flex h-full min-h-[115px] w-full flex-col p-4 lg:p-5 lg:min-h-0', lightPage ? 'text-neutral-950' : 'bg-white/5 text-white')} style={lightPage ? { backgroundColor: '#F2F2F2' } : undefined}>
      <div className="shrink-0">{chip(false)}</div>
      <div className="mt-auto flex min-h-0 w-full flex-col items-start pb-0.5">{titleEl}</div>
    </div>
  )
  const captionBody =
    captionFullBleed && image ? (
      <div className="relative flex h-full w-full min-h-[280px] flex-col overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={zoom} className="absolute inset-0 group/caption">
            <Image src={image} alt={alt} fill className="object-cover group-hover/caption:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 1023px) 100vw, 35vw" unoptimized />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
        <div className={chipPos}>{chip(true, !lightText)}</div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">{titleEl}</div>
      </div>
    ) : (
      <div className={cn('flex h-full w-full min-h-[280px] flex-col overflow-hidden p-4 lg:p-5 lg:min-h-0', lightPage ? 'text-neutral-950' : 'bg-neutral-950 text-white')} style={lightPage ? { backgroundColor: '#F2F2F2' } : undefined}>
        <div className={cn('relative isolate w-full min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-200', 'aspect-[16/10] lg:aspect-video')}>
          {image ? (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div ref={zoom} className="absolute inset-0 group/caption">
                <Image src={image} alt={alt} fill className="object-cover group-hover/caption:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 1023px) 100vw, 35vw" unoptimized />
              </div>
            </div>
          ) : null}
          {captionGradient ? <div className={captionGradient} aria-hidden /> : null}
          <div className="absolute left-2 top-1.5 z-10 lg:left-3 lg:top-2.5">{chip(true, !!image && !lightText)}</div>
        </div>
        <div className="flex shrink-0 flex-col justify-end overflow-hidden pt-4 lg:pt-5">{titleEl}</div>
      </div>
    )
  const overlayBody = (
    <div className={cn('relative flex h-full w-full min-h-[280px] flex-col overflow-hidden lg:min-h-0', !image && 'bg-neutral-900')}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {image ? (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div ref={zoom} className={cn('absolute inset-0 bg-neutral-900', 'group/full-bleed')}>
              <Image src={image} alt={alt} fill className="object-cover group-hover/full-bleed:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 1023px) 100vw, 50vw" unoptimized />
            </div>
          </div>
        ) : null}
        {overlayGradient ? <div className={overlayGradient} aria-hidden /> : null}
        <div className={chipPos}>{chip(true, !lightText)}</div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">{titleEl}</div>
      </div>
    </div>
  )
  const body = titleOnly ? titleOnlyBody : overlay && !isMobile ? overlayBody : captionBody
  const tileClass = cn('BlogPreviewTile block h-full w-full overflow-hidden rounded-2xl', captionFullBleed && '@container/tile', titleOnly && !lightPage && 'bg-white/5', !titleOnly && 'bg-transparent')
  const wrap = (children: React.ReactNode) => (
    <BaseCard ref={card} className="h-full w-full min-h-0" useViewportEntrance viewportEntranceActive={isVisible} scaleTransformOrigin={scaleTransformOrigin} entranceTranslateX={0} scaleDir="none" staggerIndex={staggerIndex} staggerCount={1}>
      {children}
    </BaseCard>
  )
  if (!hasContent) return wrap(<div className={cn(tileClass, 'min-h-[280px] lg:min-h-0', lightPage ? 'bg-neutral-200/50' : 'bg-white/[0.03]')} aria-hidden />)
  if (!href) return wrap(<div className={tileClass}>{body}</div>)
  if (isInternalHref(href))
    return wrap(
      <Link href={href} className={tileClass} target={post.openInNewTab ? '_blank' : undefined} rel={post.openInNewTab ? 'noopener noreferrer' : undefined}>
        {body}
      </Link>,
    )
  return wrap(
    <a href={href} className={tileClass} target="_blank" rel="noopener noreferrer">
      {body}
    </a>,
  )
}

const HEADING = 'text-center text-balance font-normal text-[32px] leading-[1.05] lg:text-[4rem] lg:leading-[1.05]'

export function BlogPreview({
  heading,
  anchorId,
  posts,
  pageThemeOverride,
  categoryOverride = null,
  captionFullBleed = false,
  fullWidth = false,
  mobileMaxVisibleTiles,
}: {
  heading?: RichBlock[] | string
  anchorId?: string
  posts?: BlogPreviewPost[]
  pageThemeOverride?: 'light' | 'dark'
  categoryOverride?: BlogCategory | null
  captionFullBleed?: boolean
  fullWidth?: boolean
  mobileMaxVisibleTiles?: number
}) {
  const blocks = Array.isArray(heading) && heading.length > 0 ? heading : null
  const plain = typeof heading === 'string' && heading.trim() ? heading.trim() : null
  const hasHeading = !!(blocks || plain)
  const list = useMemo(() => posts?.filter(Boolean) ?? [], [posts])
  const mobile = useMediaQuery(MOBILE_QUERY, undefined)
  const shownPosts = useMemo(() => {
    const max = mobileMaxVisibleTiles ?? MOBILE_MAX
    return (mobile !== false ? list.slice(0, max) : list).map((entry, index) => ({ entry, index }))
  }, [list, mobile, mobileMaxVisibleTiles])
  const signature = useMemo(() => shownPosts.map(({ entry, index }) => String(entry._key ?? index)).join('|'), [shownPosts])
  const section = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState<Set<string>>(() => new Set())
  const slots = useRef(new Map<string, HTMLDivElement>())
  const headingRef = useRef<AnimatedTextHandle>(null)
  const headingWrap = useRef<HTMLDivElement>(null)
  const { setSectionTheme } = useTheme()
  useInViewTrigger(headingWrap, {
    onEnter: () => {
      if (!hasHeading) return
      const h = headingRef.current
      if (h) h.ready().then(() => h.animateIn({ delay: 0.05, duration: TEXT_DURATION }))
    },
  })
  useEffect(() => {
    setVisible(new Set())
    const map = slots.current
    if (map.size === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const key = e.target.getAttribute('data-tile-key')
          if (key) {
            setVisible((s) => {
              if (s.has(key)) return s
              const next = new Set(s)
              next.add(key)
              return next
            })
            io.unobserve(e.target)
          }
        })
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
    )
    map.forEach((el) => {
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [signature])
  useEffect(() => {
    if (pageThemeOverride !== 'light') setSectionTheme(section.current, 'dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (list.length === 0) return null
  const light = pageThemeOverride === 'light'
  return (
    <section ref={section} id={anchorId?.trim() || undefined} className={cn('BlogPreview scroll-mt-28 overflow-hidden isolate w-full py-12 md:py-16', light ? 'bg-white' : 'bg-black')}>
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div className={fullWidth ? 'col-span-full' : 'col-span-full md:col-start-2 md:col-span-10'}>
          {hasHeading ? (
            <div ref={headingWrap} className="mb-8 md:mb-20">
              {blocks ? (
                <RichText animatedTextRef={headingRef} value={blocks} animatedTextClassName={cn(HEADING, light ? 'text-black' : 'text-white')} />
              ) : (
                <AnimatedText ref={headingRef} tagName="h2" className={cn(HEADING, light ? 'text-black' : 'text-white')}>
                  {plain}
                </AnimatedText>
              )}
            </div>
          ) : null}
          <div className={cn(styles.grid, captionFullBleed && styles.gridProportional)}>
            {shownPosts.map(({ entry, index }) => {
              const slot = slotAt(index)
              const gridArea = slot?.gridArea ?? 'auto'
              const origin = mobile === true ? 'center top' : (slot?.scaleOrigin ?? 'center top')
              const wanted = entry.variantOverride ?? (entry.titleOnly ? 'titleOnly' : (slot?.variant ?? 'caption'))
              const variant = mobile === true && wanted === 'overlay' ? 'caption' : wanted
              const key = String(entry._key ?? index)
              return (
                <div
                  className={cn('BlogPreview__slot', styles.slot, captionFullBleed && styles.slotProportional)}
                  style={{ '--bp-grid-area': gridArea } as React.CSSProperties}
                  data-tile-key={key}
                  ref={(el) => {
                    if (el) slots.current.set(key, el)
                    else slots.current.delete(key)
                  }}
                  key={key}
                >
                  <Tile
                    post={entry}
                    layoutVariant={variant}
                    pageThemeOverride={pageThemeOverride}
                    categoryOverride={categoryOverride}
                    categorySwatchColor={slot?.categorySwatchColor}
                    scaleTransformOrigin={origin}
                    captionFullBleed={captionFullBleed}
                    staggerIndex={index}
                    isMobile={mobile === true}
                    isVisible={visible.has(key)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
