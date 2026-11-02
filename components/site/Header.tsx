'use client'

// Port of Scale's header (module 511174, chunk 0sle6wl7ucd3b.js, sha256 3feec91c...). All tween params verbatim.
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLenis } from 'lenis/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { gsap } from './lib/gsap'
import { cn } from './lib/cn'
import { setHeaderVar } from './lib/headerVars'
import { useThemeStore } from './lib/themeStore'
import { Logo } from './Logo'
import { FlatCta, type FlatCtaThemeHandle } from './shared/FlatCta'
import { isInternalHref } from './shared/CMSLink'
import { ResponsiveImage } from './shared/ResponsiveImage'
import type { FeaturedPost, NavBlock, NavCategory, NavContent, NavLink } from './content.types'

const isLink = (b: NavBlock): b is NavLink => 'href' in b
const countVisible = (blocks?: NavBlock[]) => (blocks?.length ? blocks.length : 0)
const hasImage = (b?: NavLink | null) => !!b?.image?.path

function FeaturedCard({ entry, textStaggerIndex = null }: { entry: FeaturedPost; textStaggerIndex?: number | null }) {
  const reveal = textStaggerIndex != null ? { 'data-menu-text-reveal': 'true', 'data-stagger-index': String(textStaggerIndex) } : {}
  const body = (
    <>
      {entry.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <ResponsiveImage asset={entry.image} fill className="h-full w-full" sizes="320px" objectCover noBackground alt={entry.image.alt || entry.title} />
        </div>
      ) : null}
      <p className={cn('line-clamp-2 text-sm font-medium group-hover:underline text-(--nav-text)')}>{entry.title}</p>
    </>
  )
  const base = cn('flex min-w-0 flex-1 flex-col gap-2 overflow-hidden rounded-xl border p-3', textStaggerIndex != null && 'will-change-transform')
  const cls = cn(base, 'group relative transition-colors bg-(--nav-card-background) border-(--nav-card-background) w-full! focus:outline-1 focus:outline-scale-skyblue')
  return (
    <Link href={entry.url} className={cls} {...reveal}>
      {body}
    </Link>
  )
}

function MenuLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {
  const cls = cn('relative w-max focus:outline-1 focus:outline-scale-skyblue', className)
  return isInternalHref(href) ? (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cn(cls, 'external')} rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

function MenuBlock({
  block,
  onHoverPageLink,
  mobileDrawer = false,
  staggerIndex = null,
}: {
  block: NavBlock
  onHoverPageLink?: (b: NavBlock) => void
  mobileDrawer?: boolean
  staggerIndex?: number | null
}) {
  const reveal = staggerIndex != null ? { 'data-menu-text-reveal': 'true', 'data-stagger-index': String(staggerIndex) } : {}
  if (isLink(block)) {
    if (mobileDrawer) {
      return (
        <MenuLink
          href={block.href}
          className={cn('group flex !w-full items-center justify-between gap-3 py-1 transition-colors text-(--nav-text)')}
          onMouseEnter={() => onHoverPageLink?.(block)}
          onFocus={() => onHoverPageLink?.(block)}
        >
          <span className="min-w-0 flex-1 navigation-link leading-snug tracking-tight">{block.name}</span>
          <ChevronRight className="size-5 shrink-0 opacity-60 w-[40px]" strokeWidth={2} aria-hidden />
        </MenuLink>
      )
    }
    return (
      <MenuLink
        href={block.href}
        className="group block px-1 py-1 transition-colors md:px-0 md:py-0.5"
        onMouseEnter={() => onHoverPageLink?.(block)}
        onFocus={() => onHoverPageLink?.(block)}
      >
        <span className="flex flex-col will-change-transform" {...reveal}>
          <span className={cn('navigation-link leading-snug tracking-tight text-(--nav-text)', 'transition-colors duration-200 group-hover:text-[#775893]')}>{block.name}</span>
        </span>
      </MenuLink>
    )
  }
  return (
    <p className={cn('navigation-subheader tracking-wider pb-3 md:pb-2 text-neutral-500', staggerIndex != null && 'will-change-transform')} {...reveal}>
      {block.text}
    </p>
  )
}

function MenuColumn({
  blocks,
  onHoverPageLink,
  mobileDrawer = false,
  staggerIndexStart,
}: {
  blocks?: NavBlock[]
  onHoverPageLink?: (b: NavBlock) => void
  mobileDrawer?: boolean
  staggerIndexStart?: number
}) {
  if (!blocks?.length) return null
  const staggered = typeof staggerIndexStart === 'number'
  let index = staggered ? staggerIndexStart : 0
  const gap = mobileDrawer ? '' : 'gap-y-0 md:gap-y-1'
  const groups: ({ type: 'pages'; blocks: NavBlock[] } | { type: 'single'; block: NavBlock })[] = []
  let run: NavBlock[] = []
  for (const b of blocks) {
    if (isLink(b)) run.push(b)
    else {
      if (run.length) {
        groups.push({ type: 'pages', blocks: run })
        run = []
      }
      groups.push({ type: 'single', block: b })
    }
  }
  if (run.length) groups.push({ type: 'pages', blocks: run })
  return (
    <div className={cn('flex min-w-0 flex-col', gap, mobileDrawer && '[&>*:last-child]:pb-0')}>
      {groups.map((g, i) => {
        if (g.type === 'pages') {
          return (
            <div className={cn('flex min-w-0 flex-col pb-6 md:pb-3', gap)} key={`links-${i}`}>
              {g.blocks.map((b, j) => {
                const stagger = staggered && !mobileDrawer ? index++ : null
                return <MenuBlock block={b} onHoverPageLink={onHoverPageLink} mobileDrawer={mobileDrawer} staggerIndex={stagger} key={`${i}-${j}`} />
              })}
            </div>
          )
        }
        const stagger = staggered && !mobileDrawer ? index++ : null
        return <MenuBlock block={g.block} onHoverPageLink={onHoverPageLink} mobileDrawer={mobileDrawer} staggerIndex={stagger} key={i} />
      })}
    </div>
  )
}

const STAGGER = 0.044 * 0.7

function revealItems(root: HTMLElement | null) {
  return root ? (Array.from(root.querySelectorAll('[data-menu-text-reveal]')) as HTMLElement[]).sort((a, b) => Number(a.dataset.staggerIndex) - Number(b.dataset.staggerIndex)) : []
}
function killReveal(root: HTMLElement | null) {
  if (!root) return
  const items = revealItems(root)
  if (items.length) gsap.killTweensOf(items)
  gsap.killTweensOf(root)
}

function DesktopPanel({
  category,
  openKey = null,
  isOpen,
  onClosed,
  onMotionRest,
}: {
  category: NavCategory
  openKey?: string | null
  isOpen: boolean
  onClosed?: () => void
  onMotionRest?: () => void
}) {
  const featured = category.featureBlogPosts && category.featuredPosts?.length
  const hasColumns = !!(category.leftColumn?.length || category.rightColumn?.length)
  const firstImageLink = useMemo(() => {
    for (const col of [category.leftColumn, category.rightColumn]) for (const b of col ?? []) if (isLink(b) && hasImage(b)) return b
    return null
  }, [category.leftColumn, category.rightColumn])
  const leftCount = useMemo(() => countVisible(category.leftColumn), [category.leftColumn])
  const total = leftCount + useMemo(() => countVisible(category.rightColumn), [category.rightColumn])
  const [hovered, setHovered] = useState<NavLink | null>(null)
  const shown = hovered ?? firstImageLink
  useEffect(() => {
    setHovered(null)
  }, [openKey])
  const onHover = useCallback((b: NavBlock) => {
    if (isLink(b)) setHovered(b)
  }, [])
  const image = hasImage(shown) ? (
    <div className="relative h-full min-h-[192px] w-full shrink-0 overflow-hidden rounded-xl">
      <ResponsiveImage asset={shown!.image!} fill className="h-full w-full" sizes="(max-width: 1024px) 80vw, 1100px" objectCover noBackground alt={shown!.image!.alt || shown!.name || ''} />
    </div>
  ) : (
    <div className={cn('flex min-h-[192px] h-full w-full shrink-0 items-center justify-center rounded-xl', 'bg-white/5 text-neutral-500')} aria-hidden />
  )
  const grid =
    hasColumns || featured ? (
      <div className={cn('grid-layout-mobile md:grid-layout-desktop md:items-stretch', 'gap-y-8 md:gap-y-0')}>
        {hasColumns ? (
          <>
            <div className={cn('col-span-full md:col-span-3 xl:col-span-2 md:col-start-1 xl:col-start-2 md:row-start-1 md:self-start', featured && 'row-start-2')}>
              <MenuColumn blocks={category.leftColumn} onHoverPageLink={onHover} staggerIndexStart={0} />
            </div>
            <div className={cn('col-span-full md:col-span-3 xl:col-span-2 md:col-start-4 xl:col-start-4 md:row-start-1 md:self-start', featured && 'row-start-3', category.wideLeftColumn && 'md:pl-14 md:max-lg:pl-[72px]')}>
              <MenuColumn blocks={category.rightColumn} onHoverPageLink={onHover} staggerIndexStart={leftCount} />
            </div>
          </>
        ) : null}
        {featured ? (
          <div
            className={cn(
              'col-span-full flex flex-col gap-4 md:col-span-6 xl:col-span-7 md:col-start-7 xl:col-start-6 md:h-full md:min-h-0 md:flex-row md:gap-3 md:items-stretch md:self-stretch md:py-6 md:pr-2',
              hasColumns && 'md:pl-10 lg:pl-14 xl:pl-16',
              hasColumns && 'row-start-1',
            )}
          >
            {category.featuredPosts!.slice(0, 2).map((e, i) => (
              <FeaturedCard entry={e} textStaggerIndex={total + i} key={i} />
            ))}
          </div>
        ) : hasColumns ? (
          <div
            className={cn(
              'col-span-full flex min-h-[192px] flex-col py-6 md:col-span-6 xl:col-span-7 md:col-start-7 xl:col-start-6 md:row-start-1 md:h-full md:min-h-0 md:py-0 md:pr-2',
              hasColumns && 'md:pl-14 lg:pl-20 xl:pl-24',
              category.wideLeftColumn && 'md:max-lg:pl-28',
              'will-change-transform',
            )}
            data-menu-text-reveal="true"
            data-stagger-index={String(total)}
          >
            {image}
          </div>
        ) : null}
      </div>
    ) : null
  const fill = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const lastKey = useRef<string | null>(null)
  const clip = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const f = fill.current
    const c = content.current
    const opening = isOpen && !wasOpen.current
    const closing = !isOpen && wasOpen.current
    const switching = isOpen && wasOpen.current && openKey != null && lastKey.current != null && openKey !== lastKey.current
    if (opening) {
      if (f) gsap.killTweensOf(f)
      killReveal(c)
      if (f) gsap.set(f, { opacity: 1, transformOrigin: '50% 0%', scaleY: 0.001, force3D: true })
      const items = c ? revealItems(c) : []
      const tl = gsap.timeline({ onComplete: () => onMotionRest?.() })
      if (clip.current) tl.to(clip.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.36, ease: 'power2.out' }, 0)
      if (f) tl.to(f, { scaleY: 1, duration: 0.36, ease: 'power2.out', force3D: true }, 0)
      if (c) {
        gsap.set(c, { autoAlpha: 1, y: 0 })
        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: 10 })
          tl.to(items, { autoAlpha: 1, y: 0, duration: 0.36, ease: 'power2.out', stagger: { each: STAGGER, from: 'start' } }, f ? '-=0.28' : 0)
        } else {
          gsap.set(c, { autoAlpha: 0 })
          tl.to(c, { autoAlpha: 1, duration: 0.22, ease: 'power2.out' }, f ? '-=0.22' : 0)
        }
        tl.fromTo(Array.from(c.querySelectorAll('img')), { scale: 1.4 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
      }
    } else if (closing) {
      gsap.to(clip.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.24, ease: 'power2.out' })
      if (f) gsap.killTweensOf(f)
      killReveal(c)
      const items = c ? revealItems(c) : []
      const tl = gsap.timeline({ onComplete: () => onClosed?.() })
      if (items.length) {
        tl.to(items, { autoAlpha: 0, duration: 0.18, ease: 'power2.in' }, 0)
        tl.to(c, { autoAlpha: 0, duration: 0.14, ease: 'power2.in' }, 0)
      } else if (c) tl.to(c, { autoAlpha: 0, duration: 0.16, ease: 'power2.in' }, 0)
      if (f) {
        gsap.set(f, { transformOrigin: '50% 0%' })
        tl.to(f, { scaleY: 0.001, duration: 0.52, ease: 'power2.in', force3D: true }, 0)
      }
    } else if (switching) {
      killReveal(c)
      const items = c ? revealItems(c) : []
      if (c && items.length) {
        gsap.set(c, { autoAlpha: 1, y: 0 })
        gsap.set(items, { autoAlpha: 0, y: 10 })
        const tl = gsap.timeline({ onComplete: () => onMotionRest?.() })
        tl.to(items, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out', stagger: { each: STAGGER, from: 'start' } }, 0)
        tl.fromTo(Array.from(c.querySelectorAll('img')), { scale: 1.4 }, { scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
      } else onMotionRest?.()
    }
    wasOpen.current = isOpen
    lastKey.current = openKey
  }, [openKey, isOpen, onClosed, onMotionRest])
  return (
    <div ref={clip} className="relative w-full overflow-hidden" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      <div ref={fill} className={cn('pointer-events-none absolute inset-0 z-0 transition-shadow duration-300')} aria-hidden />
      <div ref={content} className={cn('relative z-[1] pb-17 pt-17 md:pt-11 text-(--nav-text)')}>
        {grid}
      </div>
    </div>
  )
}

function DrawerCategory({ category }: { category: NavCategory }) {
  const featured = category.featureBlogPosts && category.featuredPosts?.length
  const hasColumns = !!(category.leftColumn?.length || category.rightColumn?.length)
  if (!hasColumns && !featured) return null
  return (
    <div className={cn('w-full text-(--nav-text)')}>
      <div className="flex flex-col gap-6 pb-4 pt-2">
        {hasColumns ? (
          <>
            <MenuColumn blocks={category.leftColumn} mobileDrawer />
            <MenuColumn blocks={category.rightColumn} mobileDrawer />
          </>
        ) : null}
        {featured ? (
          <div className="flex flex-col gap-4">
            {category.featuredPosts!.slice(0, 2).map((e, i) => (
              <FeaturedCard entry={e} key={i} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function Header({ content }: { content: NavContent }) {
  const pathname = usePathname()
  const lenis = useLenis()
  const categories = content.categories
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [panelMounted, setPanelMounted] = useState(false)
  const [atRest, setAtRest] = useState(true)
  const lastOpen = useRef(openKey)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMounted, setMobileMounted] = useState(false)
  const [mobileCategory, setMobileCategory] = useState<string | null>(null)
  const lastCategory = useRef<NavCategory | null>(null)
  const keyOf = (i: number) => String(i)
  const openCategory = openKey == null ? null : (categories.find((_, i) => keyOf(i) === openKey) ?? null)
  if (openCategory) lastCategory.current = openCategory
  const panelCategory = openCategory ?? lastCategory.current
  useLayoutEffect(() => {
    if (openKey != null) setPanelMounted(true)
  }, [openKey])
  const onPanelClosed = useCallback(() => {
    setPanelMounted(false)
    setAtRest(true)
  }, [])
  const onPanelRest = useCallback(() => setAtRest(true), [])
  useEffect(() => {
    if (lastOpen.current !== openKey) {
      lastOpen.current = openKey
      setAtRest(false)
    }
  }, [openKey])
  const showPanel = panelCategory && (openKey != null || panelMounted)
  const drawerCategory = mobileCategory == null ? null : (categories.find((_, i) => keyOf(i) === mobileCategory) ?? null)
  const headerEl = useRef<HTMLElement>(null)
  const mobileFill = useRef<HTMLDivElement>(null)
  const mobileList = useRef<HTMLUListElement>(null)
  const prevMobileOpen = useRef(false)
  const prevListOpen = useRef(false)
  const prevCategory = useRef<string | null>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const mobileCta = useRef<HTMLElement>(null)
  const y = useRef(0)
  const lastScroll = useRef(0)
  const ctaBar = useRef<HTMLDivElement>(null)
  const hoverReveal = useRef(false)
  const bar = useRef<HTMLDivElement>(null)
  const barHeight = useRef(0)
  const loginTheme = useRef<FlatCtaThemeHandle>(null)
  const demoTheme = useRef<FlatCtaThemeHandle>(null)
  const drawerLive = (mobileOpen || mobileMounted) && categories.length > 0
  const drawerShown = mobileOpen || mobileMounted

  useEffect(() => {
    const light = useThemeStore.getState().pageTheme === 'light'
    if (loginTheme.current && demoTheme.current) {
      loginTheme.current.updateTheme(light ? 'mutedLight' : 'mutedDark')
      demoTheme.current.updateTheme(light ? 'black' : 'white')
    }
  }, [drawerLive])
  useLayoutEffect(() => {
    if (mobileOpen) setMobileMounted(true)
  }, [mobileOpen])

  // Backdrop: grows from the bar's top edge on every open and category switch.
  useEffect(() => {
    if (openKey || mobileOpen) {
      barHeight.current = bar.current?.offsetHeight ?? 0
      gsap.set(backdrop.current, { height: `calc(100%  + ${barHeight.current}px)`, y: `-${barHeight.current}px`, scaleY: 0 })
      gsap.to(backdrop.current, { transformOrigin: '50% 0%', scaleY: 1, duration: 1, delay: 0.1, y: `-${barHeight.current}px`, ease: 'expo.out' })
    } else {
      if (!backdrop.current) return
      gsap.to(backdrop.current, { transformOrigin: '50% 0%', scaleY: 0, duration: 0.5, y: `-${barHeight.current}px`, ease: 'expo.out' })
    }
  }, [openKey, mobileOpen])

  // Mobile fill sheet and CTA bar.
  useLayoutEffect(() => {
    if (!drawerLive) {
      prevMobileOpen.current = mobileOpen
      return
    }
    const fill = mobileFill.current
    const opening = mobileOpen && !prevMobileOpen.current
    const closing = !mobileOpen && prevMobileOpen.current
    if (opening && fill) {
      gsap.killTweensOf(fill)
      gsap.set(fill, { opacity: 1, transformOrigin: '50% 0%', scaleY: 0.001, force3D: true })
      gsap.to(fill, { scaleY: 1, duration: 0.36, ease: 'power2.out', force3D: true })
      gsap.fromTo(ctaBar.current, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.36, delay: 0.25, ease: 'power2.out' })
    } else if (closing) {
      gsap.to(ctaBar.current, { yPercent: 100, opacity: 0, duration: 0.36, ease: 'power2.out' })
      if (fill) {
        gsap.killTweensOf(fill)
        gsap.set(fill, { transformOrigin: '50% 0%' })
        gsap.to(fill, { scaleY: 0.001, duration: 0.52, ease: 'power2.in', force3D: true, onComplete: () => setMobileMounted(false) })
      } else setMobileMounted(false)
    }
    prevMobileOpen.current = mobileOpen
  }, [mobileOpen, mobileMounted, categories.length, drawerLive])

  // Mobile category list.
  useLayoutEffect(() => {
    const list = mobileList.current
    if (!drawerLive || !list) {
      prevListOpen.current = mobileOpen
      prevCategory.current = mobileCategory
      return
    }
    const items = Array.from(list.querySelectorAll(':scope > li'))
    if (!items.length) {
      prevListOpen.current = mobileOpen
      prevCategory.current = mobileCategory
      return
    }
    const closing = prevListOpen.current && !mobileOpen
    const enteringCategory = mobileCategory != null && prevCategory.current == null
    const backToList = mobileCategory == null && prevCategory.current != null
    const opening = mobileOpen && !prevListOpen.current
    if (closing || enteringCategory || opening || backToList) gsap.killTweensOf(items)
    if (closing) gsap.to(items, { opacity: 0, duration: 0.22, ease: 'power2.in' })
    else if (enteringCategory) gsap.to(items, { opacity: 0, duration: 0.18, ease: 'power2.in' })
    else if (opening || backToList) {
      gsap.set(items, { opacity: 0, y: 6 })
      gsap.to(items, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: { each: 0.048, from: 'start' } })
    }
    prevListOpen.current = mobileOpen
    prevCategory.current = mobileCategory
  }, [drawerLive, mobileOpen, mobileCategory, categories.length])

  // Header "Get Started" fades while the drawer is open.
  useLayoutEffect(() => {
    const el = mobileCta.current
    if (!el) return
    gsap.killTweensOf(el)
    if (mobileOpen) gsap.to(el, { opacity: 0, duration: 0.26, ease: 'power3.out', onComplete: () => mobileCta.current?.classList?.add?.('pointer-events-none') })
    else gsap.to(el, { opacity: 1, duration: 0.26, ease: 'power3.in', onStart: () => mobileCta.current?.classList?.remove?.('pointer-events-none') })
    return () => {
      gsap.killTweensOf(el)
    }
  }, [mobileOpen])

  const resetAll = useCallback(() => {
    setOpenKey(null)
    setPanelMounted(false)
    setMobileOpen(false)
    setMobileMounted(false)
    setMobileCategory(null)
    y.current = 0
    if (bar.current) gsap.set(bar.current, { y: 0 })
    setHeaderVar('--header-y', 0)
  }, [])
  useLayoutEffect(() => {
    resetAll()
  }, [pathname, resetAll])
  useEffect(() => {
    const write = () => {
      const h = bar.current?.offsetHeight
      if (h) setHeaderVar('--header-height', h)
    }
    write()
    window.addEventListener('resize', write)
    return () => {
      window.removeEventListener('resize', write)
      setHeaderVar('--header-height', undefined)
      setHeaderVar('--header-y', undefined)
    }
  }, [])

  // Hide on scroll: the bar follows the scroll delta, clamped to -max(height, 90).
  useEffect(() => {
    if (mobileOpen || mobileMounted || openKey != null) {
      y.current = 0
      if (bar.current) gsap.set(bar.current, { y: 0 })
      setHeaderVar('--header-y', 0)
      return
    }
    if (!lenis) return
    const el = bar.current
    if (!el || !el.offsetHeight) return
    const limit = () => {
      const b = bar.current
      return b ? -Math.max(b.offsetHeight || 0, 90) : -90
    }
    lastScroll.current = lenis.scroll
    const apply = () => {
      if (!bar.current) return
      gsap.set(bar.current, { y: y.current })
      setHeaderVar('--header-y', y.current)
    }
    const onScroll = () => {
      if (!bar.current) return
      const s = lenis.scroll
      const delta = s - lastScroll.current
      lastScroll.current = s
      if (s <= 0 && !hoverReveal.current) {
        y.current = 0
        apply()
        return
      }
      const min = limit()
      let next = y.current
      if (delta > 0) next = Math.max(min, next - delta)
      else if (delta < 0) next = Math.min(0, next - delta)
      if (!hoverReveal.current) {
        y.current = Math.ceil(next)
        apply()
      }
    }
    const onResize = () => {
      if (!bar.current) return
      y.current = Math.max(limit(), Math.min(0, y.current))
      apply()
    }
    lenis.on('scroll', onScroll)
    window.addEventListener('resize', onResize)
    apply()
    return () => {
      lenis.off('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      gsap.set(el, { y: 0 })
      y.current = 0
      setHeaderVar('--header-y', 0)
    }
  }, [lenis, mobileOpen, mobileMounted, openKey])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!headerEl.current?.contains(e.target as Node)) setOpenKey(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const login = { label: content.loginCtaLabel, href: content.loginCtaHref }
  const demo = { label: content.bookDemoCtaLabel, href: content.bookDemoCtaHref }
  return (
    <>
      {/* The class typo is Scale's: without `fixed` this element has no height, the tween only times the unmount. */}
      {drawerLive ? <div ref={mobileFill} className={cn('MobileNavFillfixed inset-0 z-40 origin-top transition-background transition-colors duration-300 ease-out md:hidden bg-(--nav-background)')} aria-hidden /> : null}
      <header
        ref={headerEl}
        onClickCapture={(e) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          const a = e.target instanceof Element ? (e.target.closest('a[href]') as HTMLAnchorElement | null) : null
          if (!a || (a.target && a.target !== '_self')) return
          const url = new URL(a.href, window.location.href)
          if (url.origin !== window.location.origin || url.hash) return
          if (url.pathname === window.location.pathname && url.search === window.location.search) {
            e.preventDefault()
            resetAll()
            if (lenis) lenis.scrollTo(0, { immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
            else window.scrollTo(0, 0)
          }
        }}
        onPointerEnter={() => {
          if (!bar.current) return
          hoverReveal.current = true
          const el = bar.current
          gsap
            .to(el, {
              y: 0,
              snap: 'y',
              onUpdate: () => setHeaderVar('--header-y', Math.ceil(Number(gsap.getProperty(el, 'y')))),
            })
            .then(() => {
              y.current = 0
              hoverReveal.current = false
            })
        }}
        className={cn(
          'fixed left-0 right-0 z-50 transition-colors duration-300',
          drawerShown
            ? 'top-0 bottom-0 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden md:top-[var(--announcement-offset,0px)] md:block md:h-auto md:max-h-none md:overflow-visible'
            : 'top-[var(--announcement-offset,0px)]',
        )}
      >
        <div
          ref={bar}
          className={cn('relative shrink-0 transition-colors duration-200 delay-20', drawerShown ? 'z-90 max-md:bg-transparent md:bg-(--nav-background)' : 'bg-(--nav-background) text-(--nav-text)')}
          onMouseLeave={() => setOpenKey(null)}
        >
          <div className="relative z-100 py-3.75 md:py-6 oml:py-3">
            {drawerShown && mobileCategory ? (
              <div className="pointer-events-none absolute inset-y-0 left-1/2 z-40 flex w-screen max-w-[100vw] -translate-x-1/2 items-center justify-center md:hidden">
                <p className={cn('w-full max-w-none whitespace-normal px-6 text-center text-base font-medium header6 leading-snug text-balance text-(--nav-text)')}>{drawerCategory?.name}</p>
              </div>
            ) : null}
            <div className={cn('relative items-center', 'flex gap-2 px-6 items-center justify-between md:grid-layout-desktop')}>
              <div className={cn('relative z-20 col-span-1 flex min-w-0 shrink-0 items-center self-center md:shrink-0 text-(--nav-text)')}>
                {drawerShown ? (
                  <div className="relative z-26 min-w-0 flex-1 overflow-hidden md:hidden">
                    <div className={cn('flex w-[200%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]', mobileCategory ? '-translate-x-1/2' : 'translate-x-0')}>
                      <div className="flex items-center justify-start w-1/2 shrink-0">
                        <Link href={content.logoLink} aria-label="Home" className="relative w-max focus:outline-1 focus:outline-scale-skyblue">
                          <Logo />
                        </Link>
                      </div>
                      <div className="flex items-center justify-start w-1/2 shrink-0">
                        <button type="button" className="inline-flex p-2 -ml-1 rounded-lg" aria-label="Back to categories" onClick={() => setMobileCategory(null)}>
                          <ChevronLeft className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className={cn(drawerShown ? 'hidden min-w-0 md:block' : 'block')}>
                  <Link href={content.logoLink} aria-label="Home" className="relative w-max focus:outline-1 focus:outline-scale-skyblue">
                    <Logo />
                  </Link>
                </div>
              </div>
              {categories.length ? (
                <nav className="relative md:col-start-3 lg:col-start-2 md:col-span-7 lg:col-span-8 z-20 hidden min-w-0 flex-1 items-center justify-start gap-3 md:flex md:gap-5 md:overflow-x-auto md:no-scrollbar lg:gap-7 lg:overflow-x-visible" aria-label="Main">
                  {categories.map((c, i) => {
                    const key = keyOf(i)
                    const isThis = openKey === key
                    return (
                      <div className={cn('relative transition-opacity duration-200 ease-out', openKey != null && openKey !== key && 'opacity-30')} onMouseEnter={() => setOpenKey(key)} key={key}>
                        <button
                          type="button"
                          className={cn(
                            'inline-flex h-10 shrink-0 items-center border-0 bg-transparent px-0 navigation-header-link transition-colors',
                            'rounded-none shadow-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                            'text-(--nav-text)',
                          )}
                          aria-expanded={isThis}
                          aria-haspopup="true"
                          onClick={() => {
                            if (isThis) {
                              if (atRest) setOpenKey(null)
                            } else setOpenKey(key)
                          }}
                        >
                          <span>{c.name}</span>
                        </button>
                      </div>
                    )
                  })}
                </nav>
              ) : null}
              <div className={cn('relative z-20 col-span-3 col-start-10 flex justify-end gap-2 self-center', 'md:ml-auto md:shrink-0 md:gap-3')}>
                <div className="hidden shrink-0 items-center gap-2 md:flex md:gap-3">
                  <FlatCta
                    href={login.href}
                    text={login.label}
                    variant="border"
                    theme="none"
                    className="shrink-0 text-sm h-10! whitespace-nowrap rounded-[8px]! border-(--nav-login-cta-border) bg-(--nav-login-cta-bg) text-(--nav-login-cta-text) transition-colors duration-300"
                  />
                  <FlatCta
                    href={demo.href}
                    text={demo.label}
                    variant="fill"
                    theme="none"
                    className="h-10! shrink-0 whitespace-nowrap rounded-[8px]! bg-(--nav-demo-desktop-cta-bg) text-(--nav-demo-desktop-cta-text) transition-colors duration-300"
                  />
                </div>
                <div className="flex shrink-0 md:hidden">
                  <FlatCta
                    href={demo.href}
                    text={demo.label}
                    variant="fill"
                    ref={mobileCta}
                    theme="none"
                    className="h-10! px-6 border-(--nav-mobile-demo-cta-border) bg-(--nav-mobile-demo-cta-bg) text-(--nav-mobile-demo-cta-text) transition-colors duration-300"
                  />
                </div>
                <button
                  type="button"
                  className={cn('inline-flex size-10 shrink-0 items-center justify-center rounded-lg md:hidden transition-colors transition-200 bg-(--nav-ctas-background) text-(--nav-text)', drawerShown ? 'bg-(--nav-mobile-close-background)' : null)}
                  aria-expanded={drawerShown}
                  aria-label={drawerShown ? 'Close menu' : 'Open menu'}
                  onClick={() => {
                    setOpenKey(null)
                    setMobileOpen((open) => {
                      if (open) setMobileCategory(null)
                      return !open
                    })
                  }}
                >
                  {drawerShown ? (
                    <svg className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  ) : (
                    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <rect x="7" y="10" width="10" height="2" rx="0.5" />
                      <rect x="7" y="14" width="10" height="2" rx="0.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {showPanel ? (
            <div className="absolute left-0 right-0 hidden w-full top-full z-60 md:block">
              <div ref={backdrop} className={cn('absolute inset-0 z-65 h-full w-full bg-(--nav-dropdown-background) shadow-[0_18px_60px_-20px_var(--nav-shadow)] backdrop-blur-lg')} />
              <div className="relative z-70">
                <DesktopPanel category={panelCategory} openKey={openKey} isOpen={openKey != null} onClosed={onPanelClosed} onMotionRest={onPanelRest} />
              </div>
            </div>
          ) : null}
        </div>
        {drawerLive ? (
          <div className="relative flex flex-col flex-1 min-h-0 bg-transparent md:hidden">
            <div ref={backdrop} className={cn('absolute inset-0 z-65 h-full w-full bg-(--nav-panel-background)')} />
            <div className="relative flex flex-col flex-1 min-h-0 z-70">
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className={cn('flex h-full w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]', mobileCategory ? '-translate-x-1/2' : 'translate-x-0')}>
                  <div className="flex flex-col w-1/2 h-full min-h-0" inert={mobileCategory != null || undefined}>
                    <nav className="flex-1 min-h-0 px-6 pt-1 pb-[calc(72px+max(1.5rem,env(safe-area-inset-bottom)))] overflow-y-auto overscroll-contain" aria-label="Main">
                      <ul ref={mobileList} className="flex flex-col">
                        {categories.map((c, i) => (
                          <li key={keyOf(i)}>
                            <button type="button" className={cn('flex w-full items-center justify-between gap-3 py-4 navigation-link-mobile oml:navigation-link-mobile-landscape text-(--nav-text)')} onClick={() => setMobileCategory(keyOf(i))}>
                              <span>{c.name}</span>
                              <ChevronRight className="size-5 shrink-0 opacity-60  w-[40px]" strokeWidth={2} aria-hidden />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="flex flex-col w-1/2 h-full min-h-0" inert={mobileCategory == null || undefined}>
                    <div className="flex-1 min-h-0 px-6 pt-2 pb-[calc(72px+max(1.5rem,env(safe-area-inset-bottom)))] overflow-y-auto overscroll-contain">{drawerCategory ? <DrawerCategory category={drawerCategory} /> : null}</div>
                  </div>
                </div>
              </div>
              <div ref={ctaBar} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div className="flex gap-2 p-2 rounded-[12px] bg-(--nav-mobile-cta-wrapper-bg)">
                  <FlatCta
                    href={login.href}
                    text={login.label}
                    themeControlRef={loginTheme}
                    variant="border"
                    theme="mutedLight"
                    className="pointer-events-auto min-h-0 min-w-0 flex-1 !rounded-[6px] !h-12 !px-3 py-2.5 text-sm !w-auto justify-center [&_.cta]:font-semibold"
                  />
                  <FlatCta
                    href={demo.href}
                    text={demo.label}
                    themeControlRef={demoTheme}
                    variant="fill"
                    theme="black"
                    className="pointer-events-auto min-h-0 min-w-0 flex-1 !rounded-[6px] !h-12 !px-3 py-2.5 !w-auto justify-center [&_.cta]:font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  )
}
