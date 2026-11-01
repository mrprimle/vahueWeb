'use client'

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import BentoTile from './BentoTile'
import { postHref, type BlogContent, type BlogPost } from './content'
import s from './blog.module.css'

/*
 * scale.com BlogPreview (chunk 3dnh8g0pvq60q.js, module 808358; slot table module 189756), as /blog configures it:
 * pageThemeOverride "light", captionFullBleed true, fullWidth true, no heading.
 *
 * - isMobile = useSyncExternalStore(matchMedia("(max-width: 1023px)")), server snapshot undefined. Anything but
 *   `false` caps the tiles at 4 (G = 4), so the server HTML and a phone show 4; desktop adds the 5th after hydration.
 * - Each slot (div[data-tile-key], grid-area from the slot table) is observed by one IntersectionObserver
 *   (threshold 0.12, rootMargin "0px 0px -6% 0px"); the first intersection marks it visible and unobserves it.
 * - Variant per tile: entry.variantOverride ?? slot variant; on mobile "overlay" becomes "caption" (helper O()).
 * - Entrance origin per tile: slot scaleOrigin on desktop, "center top" on mobile; entranceTranslateX is passed as 0.
 */

const MOBILE = '(max-width: 1023px)'

export type Slot = {
  variant: 'overlay' | 'caption' | 'titleOnly'
  gridArea: string
  scaleOrigin: string
  swatch: string
}

// Module 189756 slot table (first 5 of 10 are used on /blog).
export const SLOTS: Slot[] = [
  { variant: 'titleOnly', gridArea: '1 / 1 / 5 / 3', scaleOrigin: 'left center', swatch: '#C4B8D4' },
  { variant: 'overlay', gridArea: '1 / 3 / 6 / 5', scaleOrigin: 'right center', swatch: '#1D4133' },
  { variant: 'caption', gridArea: '5 / 1 / 7 / 3', scaleOrigin: 'left center', swatch: '#5A6B85' },
  { variant: 'caption', gridArea: '6 / 3 / 7 / 4', scaleOrigin: 'center center', swatch: '#A07862' },
  { variant: 'caption', gridArea: '6 / 4 / 7 / 5', scaleOrigin: 'right center', swatch: '#A3BED8' },
  { variant: 'caption', gridArea: '7 / 1 / 9 / 2', scaleOrigin: 'left center', swatch: '#D2DAE3' },
  { variant: 'overlay', gridArea: '7 / 2 / 9 / 4', scaleOrigin: 'center center', swatch: '#BD9B7D' },
  { variant: 'caption', gridArea: '7 / 4 / 9 / 5', scaleOrigin: 'right center', swatch: '#3F4F3A' },
  { variant: 'caption', gridArea: '9 / 1 / 11 / 3', scaleOrigin: 'left center', swatch: '#B89670' },
  { variant: 'caption', gridArea: '9 / 3 / 11 / 5', scaleOrigin: 'right center', swatch: '#2A5754' },
]

const subscribe = (cb: () => void) => {
  const mq = matchMedia(MOBILE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile() {
  return useSyncExternalStore<boolean | undefined>(subscribe, () => matchMedia(MOBILE).matches, () => undefined)
}

export default function BlogPreview({ content }: { content: BlogContent }) {
  const isMobile = useIsMobile()
  const bySlug = useMemo(() => new Map(content.posts.map((p) => [p.slug, p])), [content.posts])
  const entries = useMemo(() => {
    const all = content.bento
      .map((e) => ({ entry: e, post: bySlug.get(e.slug) }))
      .filter((x): x is { entry: (typeof content.bento)[number]; post: BlogPost } => !!x.post)
    return isMobile !== false ? all.slice(0, 4) : all
  }, [content.bento, bySlug, isMobile])
  const keys = entries.map((x) => x.entry.slug).join('|')

  const slotEls = useRef(new Map<string, HTMLDivElement>())
  const [visible, setVisible] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    setVisible(new Set())
    const els = slotEls.current
    if (els.size === 0) return
    const io = new IntersectionObserver(
      (list) => {
        list.forEach((e) => {
          if (!e.isIntersecting) return
          const k = e.target.getAttribute('data-tile-key')
          if (!k) return
          setVisible((v) => (v.has(k) ? v : new Set(v).add(k)))
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [keys])

  return (
    <section className="BlogPreview isolate w-full scroll-mt-28 overflow-hidden bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className={`${s.grid} ${s.gridProportional}`}>
          {entries.map(({ entry, post }, i) => {
            const slot = SLOTS[i]
            const variant = entry.variantOverride ?? slot?.variant ?? 'caption'
            return (
              <div
                key={entry.slug}
                ref={(el) => {
                  if (el) slotEls.current.set(entry.slug, el)
                  else slotEls.current.delete(entry.slug)
                }}
                className={`${s.slot} ${s.slotProportional}`}
                style={{ ['--bp-grid-area' as string]: slot?.gridArea ?? 'auto' }}
                data-tile-key={entry.slug}
              >
                <BentoTile
                  title={post.title}
                  href={postHref(content, post)}
                  category={post.category?.name ?? null}
                  image={entry.image}
                  imageAlt={entry.imageAlt ?? ''}
                  gradient={entry.imageGradientOverlay === true}
                  variant={isMobile === true && variant === 'overlay' ? 'caption' : variant}
                  swatch={entry.swatch ?? slot?.swatch}
                  origin={isMobile === true ? 'center top' : slot?.scaleOrigin ?? 'center top'}
                  index={i}
                  isMobile={isMobile === true}
                  isVisible={visible.has(entry.slug)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
