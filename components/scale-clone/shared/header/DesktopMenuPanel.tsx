'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { FeaturedCard, MenuColumn } from './MenuBlocks'
import { firstLinkWithImage, type NavCategory, type NavLink } from './navData'
import s from './header.module.css'

// Desktop dropdown content (Scale's `A` component). Motion, verbatim from scale.com's nav chunk:
// open   : wrapper clip-path inset(0 0 100% 0) -> inset(0)  .36s power2.out
//          inner fill scaleY .001 -> 1                       .36s power2.out (origin top)
//          [data-menu-text-reveal] autoAlpha 0, y 10 -> 1, 0  .36s power2.out, stagger .0308 from start, at .08s
//          images scale 1.4 -> 1                              .8s power3.out
// switch : items re-stagger (.34s power2.out), images re-scale; the header bg re-grows (see ScaleHeader)
// close  : clip-path -> inset(0 0 100% 0) .24s power2.out; items autoAlpha 0 .18s power2.in;
//          content autoAlpha 0 .14s power2.in; fill scaleY .001 .52s power2.in; then unmount.
const STAGGER = 0.044 * 0.7

const revealItems = (root: HTMLElement | null) =>
  root
    ? Array.from(root.querySelectorAll<HTMLElement>('[data-menu-text-reveal]')).sort(
        (a, b) => Number(a.dataset.staggerIndex) - Number(b.dataset.staggerIndex),
      )
    : []

type Props = {
  category: NavCategory
  openKey: string | null
  isOpen: boolean
  onClosed: () => void
  onMotionRest: () => void
  onNavigate: () => void
}

export default function DesktopMenuPanel({ category, openKey, isOpen, onClosed, onMotionRest, onNavigate }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const prevKey = useRef<string | null>(null)

  const defaultLink = useMemo(() => firstLinkWithImage(category), [category])
  const [hovered, setHovered] = useState<NavLink | null>(null)
  const shown = hovered ?? defaultLink
  useEffect(() => setHovered(null), [openKey])
  const onHoverLink = useCallback((l: NavLink) => setHovered(l), [])

  const leftCount = category.leftColumn.length
  const total = leftCount + category.rightColumn.length
  const hasCards = !!category.featuredPosts?.length

  useLayoutEffect(() => {
    const fill = fillRef.current
    const content = contentRef.current
    const wrap = wrapRef.current
    const opening = isOpen && !wasOpen.current
    const closing = !isOpen && wasOpen.current
    const switching = isOpen && wasOpen.current && openKey != null && prevKey.current != null && openKey !== prevKey.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const kill = () => {
      const items = revealItems(content)
      if (items.length) gsap.killTweensOf(items)
      if (content) gsap.killTweensOf(content)
    }

    if (opening) {
      if (fill) gsap.killTweensOf(fill)
      kill()
      if (reduce) {
        gsap.set(wrap, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(content, { autoAlpha: 1, y: 0 })
        gsap.set(revealItems(content), { autoAlpha: 1, y: 0 })
        onMotionRest()
      } else {
        if (fill) gsap.set(fill, { opacity: 1, transformOrigin: '50% 0%', scaleY: 0.001, force3D: true })
        const items = revealItems(content)
        const tl = gsap.timeline({ onComplete: onMotionRest })
        if (wrap) tl.to(wrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.36, ease: 'power2.out' }, 0)
        if (fill) tl.to(fill, { scaleY: 1, duration: 0.36, ease: 'power2.out', force3D: true }, 0)
        if (content) {
          gsap.set(content, { autoAlpha: 1, y: 0 })
          if (items.length) {
            gsap.set(items, { autoAlpha: 0, y: 10 })
            tl.to(items, { autoAlpha: 1, y: 0, duration: 0.36, ease: 'power2.out', stagger: { each: STAGGER, from: 'start' } }, fill ? '-=0.28' : 0)
          } else {
            // Scale's fallback for a panel without [data-menu-text-reveal] items (nav chunk 0sle6wl7ucd3b.js)
            gsap.set(content, { autoAlpha: 0 })
            tl.to(content, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, fill ? '-=0.22' : 0)
          }
          tl.fromTo(Array.from(content.querySelectorAll('img')), { scale: 1.4 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
        }
      }
    } else if (closing) {
      if (fill) gsap.killTweensOf(fill)
      kill()
      if (reduce) {
        gsap.set(wrap, { clipPath: 'inset(0% 0% 100% 0%)' })
        onClosed()
      } else {
        gsap.to(wrap, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.24, ease: 'power2.out' })
        const items = revealItems(content)
        const tl = gsap.timeline({ onComplete: onClosed })
        if (items.length) {
          tl.to(items, { autoAlpha: 0, duration: 0.18, ease: 'power2.in' }, 0)
          tl.to(content, { autoAlpha: 0, duration: 0.14, ease: 'power2.in' }, 0)
        } else if (content) tl.to(content, { autoAlpha: 0, duration: 0.16, ease: 'power2.in' }, 0)
        if (fill) {
          gsap.set(fill, { transformOrigin: '50% 0%' })
          tl.to(fill, { scaleY: 0.001, duration: 0.52, ease: 'power2.in', force3D: true }, 0)
        }
      }
    } else if (switching) {
      kill()
      const items = revealItems(content)
      if (content && items.length && !reduce) {
        gsap.set(content, { autoAlpha: 1, y: 0 })
        gsap.set(items, { autoAlpha: 0, y: 10 })
        const tl = gsap.timeline({ onComplete: onMotionRest })
        tl.to(items, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out', stagger: { each: STAGGER, from: 'start' } }, 0)
        tl.fromTo(Array.from(content.querySelectorAll('img')), { scale: 1.4 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
      } else onMotionRest()
    }
    wasOpen.current = isOpen
    prevKey.current = openKey
  }, [openKey, isOpen, onClosed, onMotionRest])

  const hasColumns = category.leftColumn.length > 0 || category.rightColumn.length > 0

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      <div ref={fillRef} className="pointer-events-none absolute inset-0 z-0 transition-shadow duration-300" aria-hidden="true" />
      <div ref={contentRef} className="relative z-[1] pb-[68px] pt-[68px] text-[var(--nav-text)] md:pt-11">
        <div className={`${s.grid} gap-y-8 md:items-stretch md:gap-y-0`}>
          {hasColumns && (
            <>
              <div
                className={`col-span-full md:col-span-3 md:col-start-1 md:row-start-1 md:self-start xl:col-span-2 xl:col-start-2 ${
                  hasCards ? 'row-start-2' : ''
                }`}
              >
                <MenuColumn blocks={category.leftColumn} staggerStart={0} onHoverLink={onHoverLink} onNavigate={onNavigate} />
              </div>
              <div
                className={`col-span-full md:col-span-3 md:col-start-4 md:row-start-1 md:self-start xl:col-span-2 xl:col-start-4 ${
                  hasCards ? 'row-start-3' : ''
                }`}
              >
                <MenuColumn blocks={category.rightColumn} staggerStart={leftCount} onHoverLink={onHoverLink} onNavigate={onNavigate} />
              </div>
            </>
          )}
          {hasCards ? (
            <div className="col-span-full row-start-1 flex flex-col gap-4 md:col-span-6 md:col-start-7 md:h-full md:min-h-0 md:flex-row md:items-stretch md:gap-3 md:self-stretch md:py-6 md:pl-10 md:pr-2 lg:pl-14 xl:col-span-7 xl:col-start-6 xl:pl-16">
              {category.featuredPosts!.slice(0, 2).map((c, i) => (
                <FeaturedCard key={i} card={c} staggerIndex={total + i} />
              ))}
            </div>
          ) : (
            <div
              className="col-span-full flex min-h-[192px] flex-col py-6 will-change-transform md:col-span-6 md:col-start-7 md:row-start-1 md:h-full md:min-h-0 md:py-0 md:pl-14 md:pr-2 lg:pl-20 xl:col-span-7 xl:col-start-6 xl:pl-24"
              data-menu-text-reveal="true"
              data-stagger-index={String(total)}
            >
              <div className="relative h-full min-h-[192px] w-full shrink-0 overflow-hidden rounded-xl">
                {shown && (
                  // Neutral placeholder; swaps per hovered link like Scale's per-link product imagery.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shown.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
