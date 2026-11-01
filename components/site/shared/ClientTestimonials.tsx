'use client'

// Scale module 685963 (ClientTestimonials: default, metrics, team variants).
import { useLenis } from 'lenis/react'
import { forwardRef, Fragment, useCallback, useEffect, useId, useImperativeHandle, useRef, useState, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { cn } from '../lib/cn'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { useMediaQuery } from '../lib/useMediaQuery'
import { AnimatedText, flipLinesAnimation, type AnimatedTextHandle } from './AnimatedText'
import { LogoTile } from './LogoMarquee'

type NameHandle = { animateToText: (o: { text: string; delay?: number }) => Promise<void> }

const ClientName = forwardRef<NameHandle, { textColor: string; contrastColor: string; themeHex: string }>(function ClientName({ textColor, contrastColor, themeHex }, ref) {
  const box = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const animateToText = useCallback(async ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const value = text.trim()
    await gsap.to(box.current, { width: 20, duration: 0.5, ease: 'power3.out', delay })
    label.current!.textContent = value
    const w = label.current!.getBoundingClientRect().width
    await new Promise((r) => setTimeout(r, 10))
    gsap.to(label.current, { opacity: 1, duration: 0.5, ease: 'none' })
    await gsap.to(box.current, { width: w + 26, duration: 0.5, ease: 'power3.out' })
  }, [])
  useImperativeHandle(ref, () => ({ animateToText }), [animateToText])
  return (
    <div ref={box} className={cn('text-sm rounded-sm leading-snug bg-black inline-block p-1 px-2 font-mono uppercase text-[10px] overflow-hidden', `text-${textColor} bg-${contrastColor}`)} style={{ color: themeHex }}>
      <div className="wrapper text-nowrap">
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1" aria-hidden>
          <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
        </svg>
        <div ref={label} className={cn('inline-block text-nowrap', `text-${textColor}`)} style={{ color: themeHex }} />
      </div>
    </div>
  )
})

function NavButton({ direction, theme, contrastColor, onClick }: { direction: 'left' | 'right'; theme: string; contrastColor: string; onClick: () => void }) {
  const el = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState(false)
  const [r, g, b] = gsap.utils.splitColor(contrastColor)
  const clear = `rgba(${r}, ${g}, ${b}, 0)`
  useGSAP(() => {
    gsap.set(el.current, { backgroundColor: clear, color: contrastColor, borderColor: contrastColor })
  })
  useEffect(() => {
    if (!el.current) return
    gsap.to(el.current, hover ? { backgroundColor: contrastColor, color: theme, borderColor: clear, duration: 0.3 } : { backgroundColor: clear, color: contrastColor, borderColor: contrastColor, duration: 0.3 })
  }, [hover, contrastColor, theme, clear])
  const tone = contrastColor === '#010101' ? 'black' : 'white'
  return (
    <button
      ref={el}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      className={cn(`cursor-pointer border border-solid border-${tone} text-${tone} aspect-square flex items-center justify-center rounded-md w-10 lg:w-full oml:w-full`)}
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        {direction === 'left' ? (
          <path d="M5.55088 11.3838C5.70709 11.54 5.96036 11.54 6.11657 11.3838L6.5863 10.914C6.74251 10.7578 6.74251 10.5046 6.5863 10.3483L2.68994 6.45199C2.34823 6.11028 2.34823 5.55626 2.68994 5.21455L6.5863 1.3182C6.74251 1.16199 6.74251 0.908723 6.5863 0.752513L6.11657 0.282781C5.96036 0.126572 5.70709 0.126572 5.55088 0.282782L0.619108 5.21455C0.2774 5.55626 0.277399 6.11028 0.619108 6.45199L5.55088 11.3838Z" fill="currentColor" />
        ) : (
          <path d="M2.44912 11.3838C2.29291 11.54 2.03964 11.54 1.88343 11.3838L1.4137 10.914C1.25749 10.7578 1.25749 10.5046 1.4137 10.3483L5.31006 6.45199C5.65177 6.11028 5.65177 5.55626 5.31006 5.21455L1.4137 1.3182C1.25749 1.16199 1.25749 0.908723 1.4137 0.752513L1.88343 0.282781C2.03964 0.126572 2.29291 0.126572 2.44912 0.282782L7.38089 5.21455C7.7226 5.55626 7.7226 6.11028 7.38089 6.45199L2.44912 11.3838Z" fill="currentColor" />
        )}
      </svg>
    </button>
  )
}

export type Testimonial = {
  _key?: string
  clientName?: string
  title?: string
  testimonial?: ReactNode
  logoLabel?: string
  metricValue?: string
  metricLabel?: string
}

function LogoTab({
  item,
  index,
  isActive,
  onSelect,
  activeColor = '',
  contrastColor = 'black',
  prevIndex,
  activeIndex,
  total,
  isMobile,
  panelId,
}: {
  item: Testimonial
  index: number
  isActive: boolean
  onSelect: () => void
  activeColor?: string
  contrastColor?: string
  prevIndex: number
  activeIndex: number
  total: number
  isMobile?: boolean
  panelId: string
}) {
  const name = item.clientName?.trim() || `Testimonial ${index + 1}`
  const fill = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isMobile) gsap.set(fill.current, isActive ? { x: '0%', y: '0%' } : { x: '100%', y: '0%' })
    else gsap.set(fill.current, isActive ? { x: '0%', y: '0%' } : { x: '0%', y: '100%' })
  }, [isActive, isMobile])
  useEffect(() => {
    if (prevIndex !== index && !isActive) return
    let from = 0
    if (isActive) {
      from = prevIndex > index ? 100 : -100
      from = index === 0 ? 100 : from
    }
    let to = prevIndex > index ? -100 : 100
    to = index === total - 1 ? -100 : to
    to = activeIndex === 0 ? -100 : to
    if (isMobile) {
      if (isActive) gsap.fromTo(fill.current, { x: `${from}%` }, { x: '0%', duration: 0.3 })
      else gsap.fromTo(fill.current, { x: '0%' }, { x: `${to}%`, duration: 0.3 })
    } else if (isActive) gsap.fromTo(fill.current, { y: `${from}%` }, { y: '0%', duration: 0.3 })
    else gsap.fromTo(fill.current, { y: '0%' }, { y: `${to}%`, duration: 0.3 })
  }, [isActive, prevIndex, index, activeIndex, total, isMobile])
  return (
    <button
      type="button"
      role="tab"
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'relative cursor-pointer flex w-full items-center justify-center rounded-lg aspect-square transition-all transition-duration-800 box-border p-3 md:p-3 lg:p-4 max-w-20 lg:max-w-38 oml:max-w-10 oml:p-1 overflow-hidden text-black',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 border border-solid',
      )}
      style={{ color: isActive ? activeColor : contrastColor, borderColor: contrastColor }}
      onClick={onSelect}
      aria-label={`Show testimonial from ${name}`}
    >
      <div ref={fill} className="absolute w-full h-full -z-10" style={{ background: contrastColor }} />
      <LogoTile label={item.logoLabel ?? 'Logo'} className="relative z-10" />
    </button>
  )
}

export type ClientTestimonialsProps = {
  heading?: string
  anchorId?: string
  colorTheme?: { tailwindClass?: string; hex?: string; contrastColor: string }
  testimonials?: Testimonial[]
  pinOnExit?: boolean
  backdropColor?: { tailwindClass: string; contrastColor?: string }
  minLogoSlots?: number
  minColumnHeight?: string | null
  logoLabel?: string | null
  variant?: 'default' | 'metrics' | 'team'
}

export function ClientTestimonials({
  heading,
  anchorId,
  colorTheme = { tailwindClass: 'cloud-slate', hex: '#839CB2', contrastColor: '#000000' },
  testimonials = [],
  pinOnExit = false,
  backdropColor = { tailwindClass: 'white', contrastColor: '#010101' },
  minLogoSlots = 0,
  minColumnHeight = null,
  logoLabel = null,
  variant = 'default',
}: ClientTestimonialsProps) {
  const isMetrics = (variant ?? 'default') === 'metrics'
  const isTeam = variant === 'team'
  const items = testimonials?.filter(Boolean) ?? []
  const spare = Math.max(0, (minLogoSlots ?? 0) - items.length)
  const [active, setActive] = useState(-1)
  const quoteRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const nameRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const valueRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const labelRefs = useRef<(AnimatedTextHandle | null)[]>([])
  const pendingMetric = useRef<Record<string, { cancel: () => void }>>({})
  const title = useRef<NameHandle>(null)
  const root = useRef<HTMLDivElement>(null)
  const itemsRef = useRef(items)
  const firstRun = useRef(true)
  const prev = useRef(-1)
  const panelBounds = useRef<HTMLDivElement>(null)
  const panelBg = useRef<HTMLDivElement>(null)
  const pinEl = useRef<HTMLDivElement>(null)
  const panelContent = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const safe = items.length ? Math.min(active, items.length - 1) : 0
  const current = items[safe]
  const panelId = useId()
  const currentName = (current ?? items[0])?.clientName?.trim()
  const panelLabel = currentName ? `Testimonial from ${currentName}` : 'Testimonial'
  const isMobile = useMediaQuery('(max-width: 768px)', false)
  const bgClass = colorTheme?.tailwindClass ?? 'cloud-slate'
  const hex = colorTheme?.hex ?? '#839CB2'
  const tone = colorTheme.contrastColor === '#010101' ? 'black' : 'white'

  useEffect(() => {
    quoteRefs.current = quoteRefs.current.slice(0, items.length)
    nameRefs.current = nameRefs.current.slice(0, items.length)
    valueRefs.current = valueRefs.current.slice(0, items.length)
    labelRefs.current = labelRefs.current.slice(0, items.length)
  }, [items.length])

  useEffect(() => {
    if (!items.length) return
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (prev.current === safe) return
    const old = prev.current
    const oldQuote = quoteRefs.current[old]
    const newQuote = quoteRefs.current[safe]
    const oldName = nameRefs.current[old]
    const newName = nameRefs.current[safe]
    prev.current = safe
    oldQuote?.animateOut()
    newQuote?.ready().then(() => newQuote.animateIn({ delay: 0.35 }))
    oldName?.animateOut({ delay: 0.5 })
    newName?.ready().then(() => newName.animateIn({ delay: 0.5 }))
    ;[valueRefs, labelRefs].forEach((group, g) => {
      const leaving = group.current[old]
      const entering = group.current[safe]
      const running = pendingMetric.current[`${g}-${old}`]
      if (running) running.cancel()
      else leaving?.animateOut()
      if (entering) {
        const key = `${g}-${safe}`
        let cancelled = false
        const t = setTimeout(
          () => {
            entering.ready().then(() => {
              if (cancelled) return
              delete pendingMetric.current[key]
              entering.animateIn()
            })
          },
          (old === -1 ? 350 : 500) + 100 * g,
        )
        pendingMetric.current[key] = {
          cancel: () => {
            cancelled = true
            clearTimeout(t)
            delete pendingMetric.current[key]
          },
        }
      }
    })
    title.current?.animateToText({ text: itemsRef.current[safe]?.title ?? '', delay: 0.05 })
  }, [items.length, safe])
  useEffect(() => {
    const running = pendingMetric.current
    return () => Object.values(running).forEach((p) => p.cancel())
  }, [])

  useGSAP(
    () => {
      if (!pinOnExit) return
      gsap
        .timeline({
          scrollTrigger: { trigger: pinEl.current, start: 'top top', end: () => `+=${1.5 * window.innerHeight}`, pin: true, pinSpacing: false, scrub: true },
        })
        .fromTo(pinEl.current, { y: 0 }, { y: '-15vh', ease: 'power2.out', duration: 0.5 }, 0)
        .fromTo(panelContent.current, { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.3 }, 0)
    },
    { scope: pinEl, dependencies: [pinOnExit] },
  )
  const scrollIn = useCallback(() => {
    if (root.current && lenis) lenis.scrollTo(root.current, { offset: -24 })
  }, [lenis])
  const step = useCallback(
    (dir: 'left' | 'right') => {
      scrollIn()
      if (dir === 'left') setActive(active <= 0 ? items.length - 1 : active - 1)
      else setActive(active >= items.length - 1 ? 0 : active + 1)
    },
    [active, items.length, scrollIn],
  )
  const select = useCallback(
    (i: number) => {
      scrollIn()
      setActive(i)
    },
    [scrollIn],
  )
  useInViewTrigger(root, {
    start: 'top 80%',
    onEnter: () => {
      if (active === -1) setActive(0)
    },
  })
  useGSAP(
    () => {
      if (!panelBounds.current || !panelBg.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(panelBg.current, { width: '100%' })
        return
      }
      const tween = gsap.fromTo(
        panelBg.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: panelBounds.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: pinEl, dependencies: [bgClass] },
  )
  if (!items.length) return null
  const tabs = () =>
    items.map((item, i) => (
      <LogoTab
        key={item._key ?? `${item.clientName}-${i}`}
        item={item}
        index={i}
        isActive={i === safe}
        panelId={panelId}
        prevIndex={prev.current}
        total={items.length}
        activeIndex={active}
        onSelect={() => select(i)}
        activeColor={colorTheme?.hex}
        contrastColor={colorTheme.contrastColor}
        isMobile={isMobile}
      />
    ))
  const nameList = items.map((item, i) => {
    const name = item.clientName?.trim()
    if (!name) return null
    const on = i === safe
    return (
      <div key={`name-${item._key ?? `${item.clientName}-${i}`}`} className={cn(on ? 'relative z-10' : 'absolute inset-0 z-0 overflow-hidden pointer-events-none')} aria-hidden={!on}>
        <AnimatedText
          ref={(el) => {
            nameRefs.current[i] = el
          }}
          tagName="p"
          contentKey={`${item._key ?? i}-client-name`}
          customAnimation={flipLinesAnimation}
          className={cn('text-base font-medium leading-tight lg:text-lg oml:text-lg', `text-${tone}`)}
          type="lines"
        >
          {name}
        </AnimatedText>
      </div>
    )
  })
  const titleChip = <ClientName textColor={bgClass} contrastColor={tone} ref={title} themeHex={hex} />
  return (
    <div ref={root} id={anchorId?.trim() || undefined} className={cn('scroll-mt-28 relative pt-20 pb-16 md:pt-20 md:pb-20 oml:pt-10 oml:pb-10 text-black ClientTestimonials', `bg-${backdropColor?.tailwindClass}`)}>
      <div ref={pinEl} className={`text-${colorTheme?.contrastColor} grid-layout-mobile grid-padding-1/2 lg:grid-layout-desktop lg:grid-padding oml:grid-layout-desktop oml:grid-padding`}>
        <div ref={panelBounds} className="relative min-w-0 col-span-full isolate">
          <div ref={panelBg} className={cn('pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-0 rounded-2xl', `bg-${bgClass}`)} aria-hidden />
          <div
            ref={panelContent}
            className={cn('grid-inner-8', 'col-span-full', 'relative z-10', 'flex', 'flex-col', 'gap-8', 'lg:grid-inner-12 oml:grid-inner-12', isMetrics && 'lg:grid-rows-[auto_1fr_auto] oml:grid-rows-[auto_1fr_auto]', 'p-8', 'lg:px-0 oml:px-0', 'lg:py-20 oml:py-10')}
          >
            <div
              className={cn(
                'flex flex-row items-start md:items-center justify-between md:justify-start w-full gap-8 text-left',
                isMetrics
                  ? 'relative z-20 lg:flex-col lg:items-start oml:flex-col oml:items-start lg:gap-4 oml:gap-4 lg:col-span-4 lg:col-start-2 lg:row-start-1 oml:col-span-4 oml:col-start-2 oml:row-start-1'
                  : [
                      'col-span-full lg:items-stretch lg:flex-col lg:col-span-1 lg:col-start-2 oml:items-stretch oml:flex-col oml:col-span-2 oml:col-start-2',
                      testimonials.length <= 1 ? 'lg:justify-end oml:justify-end' : 'lg:justify-between oml:justify-between',
                      minColumnHeight && 'lg:[min-height:var(--min-col-h)] oml:[min-height:var(--min-col-h)]',
                    ],
              )}
              style={!isMetrics && minColumnHeight ? ({ '--min-col-h': minColumnHeight } as React.CSSProperties) : undefined}
              role={isTeam ? undefined : 'tablist'}
              aria-label={isTeam ? undefined : 'Client testimonials'}
            >
              {heading?.trim() ? (
                <p className={cn('w-1/2 font-mono text-xs font-medium leading-snug md:leading-snug uppercase whitespace-pre-line col-span-full', isMetrics ? 'lg:w-[16ch] oml:w-[16ch]' : 'lg:w-full oml:w-full', `text-${tone}`)}>{heading.trim()}</p>
              ) : null}
              {items.length >= 1 && !isTeam ? (
                <div className={cn('hidden gap-2', isMetrics ? 'lg:grid lg:grid-cols-4 oml:grid oml:grid-cols-4 lg:w-full oml:w-full' : 'flex-col mb-2 lg:flex oml:flex')}>
                  {tabs()}
                  {isMetrics ? null : Array.from({ length: spare }).map((_, i) => <div key={`logo-placeholder-${i}`} aria-hidden="true" className="invisible w-full aspect-square max-w-20 lg:max-w-38 oml:max-w-10" />)}
                </div>
              ) : null}
              {testimonials.length > 1 ? (
                <div className={cn('flex justify-between gap-2', isMetrics && 'lg:w-24 oml:w-24 shrink-0')}>
                  <NavButton theme={hex} contrastColor={colorTheme?.contrastColor} direction="left" onClick={() => step('left')} />
                  <NavButton theme={hex} contrastColor={colorTheme?.contrastColor} direction="right" onClick={() => step('right')} />
                </div>
              ) : null}
            </div>
            {isMetrics ? <div aria-hidden className={cn('hidden lg:block oml:block lg:col-start-6 oml:col-start-6 lg:row-start-1 oml:row-start-1 lg:row-span-3 oml:row-span-3 justify-self-center w-px h-full opacity-30', `bg-${tone}`)} /> : null}
            <div
              className={cn(
                'relative col-span-4 row-start-2 lg:row-start-1 oml:row-start-1',
                isMetrics
                  ? [
                      'grid grid-cols-2 gap-x-4',
                      'lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-[normal] lg:col-start-2 lg:col-span-10 lg:row-span-3',
                      'oml:grid-cols-subgrid oml:grid-rows-subgrid oml:gap-[normal] oml:col-start-2 oml:col-span-10 oml:row-span-3',
                      minColumnHeight && 'lg:[min-height:var(--min-col-h)] oml:[min-height:var(--min-col-h)]',
                    ]
                  : 'lg:col-span-7 lg:col-start-5 oml:col-span-7 oml:col-start-5',
              )}
              style={isMetrics && minColumnHeight ? ({ '--min-col-h': minColumnHeight } as React.CSSProperties) : undefined}
              role={isTeam ? undefined : 'tabpanel'}
              id={panelId}
              aria-label={isTeam ? undefined : panelLabel}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className={isMetrics ? 'contents' : 'flex flex-col justify-between h-full min-h-0 gap-16'}>
                <div
                  className={cn(
                    'relative w-full leading-7 lg:leading-14 oml:leading-14',
                    isMetrics && 'col-span-2 lg:col-start-6 lg:col-span-5 lg:row-start-1 lg:row-span-2 oml:col-start-6 oml:col-span-5 oml:row-start-1 oml:row-span-2',
                    items.length > 1 && ['grid lg:max-h-[8lh] oml:max-h-[8lh] lg:overflow-y-clip oml:overflow-y-clip', !isTeam && 'lg:block oml:block lg:min-h-0 oml:min-h-0'],
                  )}
                >
                  {items.map((item, i) => {
                    const on = i === safe
                    const q = typeof item.testimonial === 'string' ? item.testimonial.trim() : item.testimonial
                    if (!q) return null
                    return (
                      <div
                        key={item._key ?? `${item.clientName}-${i}`}
                        className={cn(items.length > 1 && '[grid-area:1/1]', on ? 'relative z-10' : ['relative z-0 overflow-hidden pointer-events-none', !isTeam && 'lg:absolute oml:absolute lg:inset-0 oml:inset-0'])}
                        aria-hidden={!on}
                      >
                        <AnimatedText
                          ref={(el) => {
                            quoteRefs.current[i] = el
                          }}
                          tagName="div"
                          contentKey={item._key ?? `testimonial-${i}`}
                          customAnimation={flipLinesAnimation}
                          type="lines"
                          className={cn(
                            'max-w-none [&_p]:leading-none header4-regular leading-7 tracking-tighter font-normal pr-2.5',
                            isMetrics ? 'lg:leading-10 oml:leading-8' : 'lg:header3-regular oml:header4-regular lg:leading-11 oml:leading-7',
                            items.length > 1 && 'lg:line-clamp-8 oml:line-clamp-8',
                            `text-${tone}`,
                          )}
                        >
                          {isMetrics ? null : <span className="inline-block indent w-25 lg:w-40 oml:w-full"> </span>}
                          {typeof q === 'string' ? `“${q}”` : <>“{q}”</>}
                        </AnimatedText>
                      </div>
                    )
                  })}
                </div>
                {isMetrics ? (
                  <div className="grid col-span-2 row-start-2 mt-24 lg:col-start-1 lg:col-span-4 lg:row-start-2 lg:row-span-2 lg:self-start lg:mt-16 oml:col-start-1 oml:col-span-4 oml:row-start-2 oml:row-span-2 oml:self-start oml:mt-16">
                    {items.map((item, i) => {
                      const v = item.metricValue?.trim() ?? ''
                      const l = item.metricLabel?.trim() ?? ''
                      if (!v && !l) return null
                      const on = i === safe
                      return (
                        <div key={`metric-${item._key ?? i}`} className={cn('flex flex-col gap-4 [grid-area:1/1] self-start', on ? 'relative z-10' : 'relative z-0 pointer-events-none')} aria-hidden={!on}>
                          {v ? (
                            <AnimatedText
                              ref={(el) => {
                                valueRefs.current[i] = el
                              }}
                              tagName="p"
                              contentKey={`${item._key ?? i}-metric-value`}
                              customAnimation={flipLinesAnimation}
                              type="lines"
                              className={cn('header1 tracking-tighter max-lg:text-[4rem]! max-lg:leading-none!', `text-${tone}`)}
                            >
                              {v}
                            </AnimatedText>
                          ) : null}
                          {l ? (
                            <AnimatedText
                              ref={(el) => {
                                labelRefs.current[i] = el
                              }}
                              tagName="p"
                              contentKey={`${item._key ?? i}-metric-label`}
                              customAnimation={flipLinesAnimation}
                              type="lines"
                              className={cn('header5-regular max-w-80 text-pretty', `text-${tone}`)}
                            >
                              {l}
                            </AnimatedText>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ) : null}
                {isTeam ? (
                  <div className="flex items-center gap-3 mt-8 shrink-0 lg:justify-end lg:gap-4 lg:mt-0 oml:justify-end oml:gap-4 oml:mt-0">
                    {logoLabel ? (
                      <div className={cn('flex items-center justify-center shrink-0 rounded-lg size-10 p-[7px] lg:size-12 lg:p-[9px] oml:size-12 oml:p-[9px]', tone === 'black' ? 'bg-black text-white' : 'bg-white text-black')}>
                        <LogoTile label={logoLabel} className="w-full h-full" />
                      </div>
                    ) : null}
                    <div className="relative min-w-0 text-left nameWrapper">
                      {nameList}
                      {titleChip}
                      <div aria-hidden className="invisible h-0 overflow-hidden whitespace-nowrap">
                        {items.map((item, i) => (
                          <Fragment key={item._key ?? i}>
                            <p className="text-base font-medium leading-tight lg:text-lg oml:text-lg">{item.clientName?.trim()}</p>
                            <p className="font-mono text-[10px] tracking-normal uppercase pl-[26px]">{item.title?.trim()}</p>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={cn('relative text-left nameWrapper shrink-0', isMetrics ? 'col-span-2 row-start-3 mt-8 lg:self-end oml:self-end lg:col-start-6 lg:col-span-5 lg:row-start-3 lg:mt-14 oml:col-start-6 oml:col-span-5 oml:row-start-3 oml:mt-14' : 'mt-8 lg:mt-0 oml:mt-0 lg:text-right oml:text-right')}>
                    {nameList}
                    {titleChip}
                  </div>
                )}
              </div>
            </div>
            {items.length >= 1 && !isTeam ? (
              <div className="flex w-full gap-2 lg:hidden oml:hidden" role="tablist" aria-label="Client testimonials">
                {tabs()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
