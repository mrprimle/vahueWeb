'use client'

import { Check, Minus, X } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { cn } from '@/components/site/lib/cn'
import { gsap, useGSAP } from '@/components/site/lib/gsap'
import { mapRange } from '@/components/site/lib/math'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedText, linkTextAnimation, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { BlogPreview } from '@/components/site/shared/BlogPreview'
import { CardGrid } from '@/components/site/shared/CardGrid'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { ClipScrollSection } from '@/components/site/shared/ClipScrollSection'
import { CMSLink } from '@/components/site/shared/CMSLink'
import { Faqs } from '@/components/site/shared/Faqs'
import { HeadlineWithCta, type HeadlineWithCtaHandle } from '@/components/site/shared/HeadlineWithCta'
import { LogoMarquee, LogoTile, type LogoMarqueeHandle } from '@/components/site/shared/LogoMarquee'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { RichText, type RichBlock } from '@/components/site/shared/RichText'
import { ScrollToExplore, type ScrollToExploreHandle } from '@/components/site/shared/ScrollToExplore'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { SteppedVideo } from '@/components/site/shared/stepped-video/SteppedVideo'
import { TransparentVideo, type TransparentVideoHandle } from '@/components/site/shared/TransparentVideo'
import { TwoColumnTextWithVideo } from '@/components/site/shared/TwoColumnTextWithVideo'
import styles from './genai-portfolio.module.css'
import type { Applicable, CapabilityCell, GenAiContent, MarqueeLogoItem } from './types'

// Scale's CMS holds an empty h4 in this slot, and it takes up a grid row.
const EMPTY_H4: RichBlock[] = [{ style: 'h4', text: '' }]

const setTheme = (el: HTMLElement | null, theme: string) => el?.setAttribute('data-theme', theme)

/** Scale module 700758: `animateSet` before paint, `animateIn` once the loader store reports the end (true by default). */
function useIntroAnimation({ animateSet, animateIn }: { animateSet: () => void; animateIn: () => void }) {
  const set = useRef(animateSet)
  const run = useRef(animateIn)
  useEffect(() => {
    set.current = animateSet
    run.current = animateIn
  })
  useLayoutEffect(() => {
    set.current?.()
  }, [])
  useEffect(() => {
    run.current?.()
  }, [])
}

function MaskLogo({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <LogoTile className="h-[27px]" />
  const url = `url("${src}")`
  return (
    <div className="inline-block h-full" style={{ backgroundColor: 'currentColor', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="opacity-0 pointer-events-none" width="auto" height="auto" style={{ width: 'auto', height: 'auto', maxWidth: 70, maxHeight: 28 }} />
    </div>
  )
}

// Scale module 63135.
function SgpHero({ c }: { c: GenAiContent['hero'] }) {
  const scroll = useRef<ScrollToExploreHandle>(null)
  const marquee = useRef<LogoMarqueeHandle>(null)
  const head = useRef<HeadlineWithCtaHandle>(null)
  const root = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const video = useRef<TransparentVideoHandle>(null)
  useIntroAnimation({
    animateSet: () => {
      setTheme(root.current, 'dark')
      marquee.current?.animateSet()
      gsap.set(media.current, { opacity: 0 })
    },
    animateIn: async () => {
      await head.current?.ready()
      head.current?.animateIn({ delay: 1 })
      marquee.current?.animateIn({ delay: 2.2 })
      gsap.to(media.current, { opacity: 1, duration: 1, delay: 2 })
      scroll.current?.animateIn?.({ delay: 1 })
    },
  })
  const logos = c.logos.map((l: MarqueeLogoItem) => ({ id: l.key, node: <MaskLogo src={l.src} alt={l.alt} /> }))
  return (
    <div ref={root} data-theme="dark" className="SgpHero relative h-screen bg-black text-white">
      <div className="w-full h-full py-10 grid-layout-mobile md:grid-layout-desktop oml:grid-layout-desktop gap-y-8 md:py-16 md:gap-y-0 oml:py-16 oml:gap-y-0">
        <div ref={media} className="col-span-6 col-start-2 flex justify-center items-center md:self-center oml:self-center max-md:pt-8 oml:-translate-y-1/5 md:row-start-1 oml:row-start-1 md:col-start-2 md:col-span-5 oml:col-start-1 oml:col-span-4">
          <TransparentVideo className="scale-110 md:scale-100" ref={video} video={c.video} />
        </div>
        <div className="flex flex-col lg:gap-10 oml:gap-10 col-span-full md:self-center oml:self-center md:row-start-1 oml:row-start-1 md:col-start-8 md:col-span-4 oml:col-start-6 oml:col-span-6">
          <HeadlineWithCta
            animationManual
            ref={head}
            padding={false}
            headline={c.headline}
            subtitle={c.subtitle}
            headerClass="header3-regular oml:header4-regular leading-none text-center! md:text-left! oml:text-left!"
            subtitleClasses="text-scale-gray-60 text-center! md:text-left! oml:text-left!"
            width="w-full"
            className="items-center! md:items-start! oml:items-start! pt-0 max-sm:pb-10"
          />
          <div className="flex flex-col gap-2 w-full min-w-0 oml:hidden">
            <LogoMarquee ref={marquee} logos={logos} className="w-full min-w-0 opacity-50" logoClassName="text-gray-300" />
          </div>
        </div>
      </div>
      <ScrollToExplore ref={scroll} theme="dark" label={c.scrollLabel} className="absolute bottom-[5vh] max-sm:hidden right-8 md:right-12 oml:right-12 z-10" />
    </div>
  )
}

type StackCardHandle = { animateIn: (o?: { delay?: number }) => Promise<void>; animateOut: (o?: { delay?: number }) => Promise<void> }

const StackCard = forwardRef<StackCardHandle, { card: GenAiContent['stack']['cards'][number]; cardIndex: number }>(function StackCard({ card, cardIndex }, ref) {
  const root = useRef<HTMLElement>(null)
  const title = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const mark = useRef<HTMLDivElement>(null)
  const animateIn = useCallback(async ({ delay = 0 } = {}) => {
    title.current?.animateIn({ delay })
    body.current?.animateIn({ delay })
    if (mark.current) gsap.fromTo(mark.current, { opacity: 0, y: 20, x: -10 }, { opacity: 1, y: 0, x: 0, delay, duration: 0.85, ease: 'power2.out' })
  }, [])
  const animateOut = useCallback(async ({ delay = 0 } = {}) => {
    title.current?.animateOut({ delay })
    body.current?.animateOut({ delay })
    if (mark.current) gsap.to(mark.current, { opacity: 0, y: 20, x: -10, delay, duration: 0.85, ease: 'power2.out' })
  }, [])
  useImperativeHandle(ref, () => ({ animateIn, animateOut }), [animateIn, animateOut])
  useInViewTrigger(root, {
    start: 'top 85%',
    onEnter: () => {
      void animateIn({ delay: 0.25 * cardIndex })
    },
    onLeaveBack: () => {
      void animateOut({ delay: 0.1 * cardIndex })
    },
  })
  return (
    <article ref={root} className="flex flex-col gap-2 rounded-xl p-8 min-h-[211px] justify-between oml:flex-1 oml:min-h-0 oml:justify-start bg-scale-gray-20">
      <div className="flex items-center gap-2 justify-between w-full">
        <AnimatedText tagName="h3" ref={title} className="header2b-regular leading-none text-white">
          {card.title}
        </AnimatedText>
        <div ref={mark} className={cn(card.colorClass, 'w-[17px] h-[17px] opacity-0')}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-full h-full align-top" aria-hidden>
            <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="body3 text-scale-gray-60">
        <RichText animatedTextRef={body} value={card.description} customAnimation={linkTextAnimation} />
      </div>
    </article>
  )
})

// Scale module 290276.
function SgpStack({ c }: { c: GenAiContent['stack'] }) {
  const root = useRef<HTMLElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  const cards = useRef<(StackCardHandle | null)[]>([])
  const media = useRef<HTMLDivElement>(null)
  const video = useRef<TransparentVideoHandle>(null)
  useEffect(() => {
    setTheme(root.current, 'dark')
    if (media.current) {
      gsap.set(media.current, { opacity: 0 })
      video.current?.reset()
    }
  }, [])
  useGSAP(
    () => {
      if (!plate.current || !root.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(plate.current, { width: '100%' })
        return
      }
      const t = gsap.fromTo(plate.current, { scale: 0.98, transformOrigin: 'center top' }, { scale: 1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom 75%', scrub: true } })
      return () => {
        t.scrollTrigger?.kill()
        t.kill()
      }
    },
    { scope: root, dependencies: [c.cards.length] },
  )
  useInViewTrigger(root, {
    start: 'top center',
    onEnter: () => {
      if (!media.current) return
      gsap.to(media.current, { opacity: 1, duration: 1 })
      video.current?.reset()
      video.current?.play()
    },
    onLeaveBack: () => {
      if (!media.current) return
      gsap.to(media.current, { opacity: 0, duration: 1 })
      video.current?.pause()
      cards.current.forEach((card, i) => {
        void card?.animateOut({ delay: 0.1 * i })
      })
    },
  })
  return (
    <section ref={root} className="SgpStack relative isolate overflow-hidden grid-layout-mobile lg:grid-layout-desktop pt-0 lg:px-0! pb-7! bg-black">
      <div className="relative col-span-full lg:col-start-1 lg:col-span-12 text-neutral-900 py-5 pb-7 md:pb-0 md:py-10 md:pl-10 md:pr-10 lg:pb-10">
        <div className="grid-layout-mobile lg:grid-layout-desktop-double md:px-0 md:pb-10">
          <div className="col-span-full pb-0 relative z-2 lg:col-start-1 lg:col-span-12 xl:col-start-1 xl:col-span-7 lg:self-start [&_.HeadlineWithCta]:text-inherit">
            <HeadlineWithCta padding={false} headline={c.headline} subtitle={c.subtitle} width="w-full" align="left" headerClass="header3-regular text-balance md:mt-[-0.5rem] text-white" subtitleClasses="text-pretty text-scale-gray-60" className="py-0!" />
          </div>
          <div ref={media} className="pointer-events-none col-span-full lg:absolute z-1 lg:w-1/2 lg:h-full flex items-center pb-10 lg:left-[45%] lg:-translate-x-1/2 justify-center" aria-hidden="true">
            <TransparentVideo ref={video} video={c.video} className="w-full" />
          </div>
          <div className="col-span-full relative z-2 flex flex-col oml:flex-row gap-2 lg:col-start-18 lg:col-span-7 lg:self-start">
            {c.cards.map((card, i) => (
              <StackCard
                key={i}
                card={card}
                cardIndex={i}
                ref={(el) => {
                  cards.current[i] = el
                }}
              />
            ))}
          </div>
        </div>
        <div ref={plate} className="absolute z-0 w-full h-full inset-0 grid-layout-mobile lg:grid-layout-desktop-double p-0">
          <div className="w-full h-full rounded-2xl col-span-full lg:col-span-24 bg-scale-gray-10" />
        </div>
      </div>
    </section>
  )
}

// Scale module 698764, with `parallaxFadeOut`, holding one CardGrid.
function TrustSection({ c }: { c: GenAiContent['trust'] }) {
  const root = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setTheme(root.current, 'dark')
  }, [])
  useGSAP(
    () => {
      const tl = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'bottom 100%', end: 'bottom top', scrub: true } })
        .to(root.current, { yPercent: 20, duration: 1, ease: 'power3.in' }, 0)
        .fromTo(inner.current, { opacity: 1 }, { opacity: 0, duration: 0.75, ease: 'none' }, 0.15)
      return () => {
        tl.kill()
      }
    },
    { scope: root, dependencies: [] },
  )
  return (
    <div ref={root} className="Section overflow-hidden py-16! md:py-32! oml:py-10! text-white grid-layout-mobile md:grid-layout-desktop relative isolate bg-evergreen" data-text-theme="white">
      <div ref={inner} className="rounded-3xl relative isolate col-span-full md:col-start-1 md:col-span-12 xl:col-start-2 xl:col-span-10">
        <CardGrid heading={c.heading} animationDirection="down" directionalEntrance fluidLayout={false} headerAlignment="text-center" headerSize="md" iconSize="md" cards={c.cards.map((card) => ({ _type: 'card' as const, title: card.title, description: card.description }))} />
      </div>
    </div>
  )
}

const CELL: Record<Applicable, { icon: React.ReactNode; className: (note: boolean) => string }> = {
  applicable: { icon: <Check className="relative text-white size-4 shrink-0" strokeWidth={2.5} aria-label="Included" />, className: () => 'bg-evergreen' },
  partialApplicable: { icon: <Check className="relative text-black size-4 shrink-0" strokeWidth={2.5} aria-label="Included" />, className: (note) => `bg-scale-gray-80 ${note ? 'group-hover/card:bg-black' : ''}` },
  notApplicable: { icon: <X className="relative text-scale-gray-60 size-4 shrink-0" strokeWidth={2.5} aria-label="Included" />, className: () => 'bg-transparent' },
}

type CellHandle = { clickableRefs: (HTMLButtonElement | null)[] }

const Cell = forwardRef<CellHandle, { cell: CapabilityCell; index: number; total: number; isMobile: boolean }>(function Cell({ cell, index, total, isMobile }, ref) {
  const overlay = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState(false)
  const tip = useRef<HTMLDivElement>(null)
  const tipBody = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const clickable = useRef<(HTMLButtonElement | null)[]>([])
  useImperativeHandle(ref, () => ({
    get clickableRefs() {
      return clickable.current
    },
  }))
  useEffect(() => {
    const el = tip.current
    if (!el) return
    const last = index === total - 1
    gsap.set(el, { clipPath: last ? 'inset(0% 0% 100% 100% round 10px)' : 'inset(0% 100% 100% 0% round 10px)' })
    gsap.set(tipBody.current, { opacity: 0, scale: 0.8, transformOrigin: last ? 'right top' : 'left top' })
    const t = gsap.timeline({ paused: true })
    t.to(el, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 0.4, ease: 'power1.out' })
    t.to(tipBody.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out' }, '<0.1')
    tl.current = t
    return () => {
      t.kill()
      tl.current = null
    }
  }, [cell.note, isMobile, index, total])
  const kind = CELL[cell.applicable]
  useEffect(() => {
    if (!overlay.current) return
    if (modal) {
      overlay.current.style.display = 'flex'
      gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.fromTo(
        overlay.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            if (overlay.current) overlay.current.style.display = 'none'
          },
        },
      )
    }
  }, [modal])
  return (
    <div className="flex flex-1 items-center justify-center px-2 py-3 md:px-3" role="cell">
      <div onMouseEnter={() => tl.current?.play()} onMouseLeave={() => tl.current?.reverse()} className="relative group/card cursor-pointer">
        <button
          onClick={() => {
            if (isMobile) setModal(true)
          }}
          ref={(el) => {
            clickable.current[0] = el
          }}
          className={cn('h-6 w-6 rounded-sm flex justify-center items-center relative z-10 cursor-pointer', kind.className(!!cell.note))}
        >
          {kind.icon}
        </button>
        {cell.note && cell.applicable === 'partialApplicable' && modal ? (
          <div ref={overlay} aria-hidden={!modal} className="Mobile fixed z-50 flex rounded-md pointer-events-none justify-center items-center top-0 left-0 p-10 toolTip bg-black/20 w-screen h-screen">
            <div className="bg-scale-gray-90 p-6 rounded-md flex flex-col gap-4">
              <div className="flex justify-between w-full">
                <div className="h-6 w-6 rounded-sm flex justify-center items-center relative z-10 bg-black">
                  <Minus className="relative text-white size-5 shrink-0" strokeWidth={2.5} aria-label="Included" />
                </div>
                <button
                  onClick={() => {
                    if (isMobile) setModal(false)
                  }}
                  className="pointer-events-auto cursor-pointer"
                >
                  <X className="relative text-scale-gray-60 size-5 shrink-0" strokeWidth={2.5} aria-label="Included" />
                </button>
              </div>
              <div>
                <RichText value={cell.note} />
              </div>
            </div>
          </div>
        ) : null}
        {cell.note && !isMobile ? (
          <div ref={tip} className={cn('Desktop absolute z-20 flex flex-col gap-4 p-6 rounded-md pointer-events-none -top-6 toolTip bg-scale-gray-90 cursor-pointer', index === total - 1 ? '-right-6 items-end' : '-left-6 items-baseline')}>
            <div className={cn('h-6 w-6 rounded-sm flex justify-center items-center relative z-10', kind.className(true))}>
              <Minus className="relative text-white size-4 shrink-0" strokeWidth={2.5} aria-label="Included" />
            </div>
            <div ref={tipBody} className="min-w-[180px]">
              <RichText value={cell.note} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
})

type RowHandle = { divider: HTMLSpanElement | null; label: AnimatedTextHandle | null; itemRefs: (CellHandle | null)[] }

const CapabilityRow = forwardRef<RowHandle, { capability: GenAiContent['differentiators']['capabilities'][number]; categories: GenAiContent['differentiators']['categories']; rowIndex: number; isMobile: boolean }>(function CapabilityRow({ capability, categories, rowIndex, isMobile }, ref) {
  const divider = useRef<HTMLSpanElement>(null)
  const label = useRef<AnimatedTextHandle>(null)
  const items = useRef<(CellHandle | null)[]>([])
  useImperativeHandle(
    ref,
    () => ({
      get divider() {
        return divider.current
      },
      get label() {
        return label.current
      },
      get itemRefs() {
        return items.current
      },
    }),
    [],
  )
  return (
    <div className={cn('grid-layout-mobile relative md:grid-layout-desktop CapabilityRow', rowIndex % 2 === 0 ? 'bg-white' : 'bg-scale-gray-95')} role="row">
      <span ref={divider} aria-hidden className="pointer-events-none block absolute top-0 left-0 right-0 z-1 h-px origin-left scale-x-0 bg-scale-gray-80 will-change-transform" />
      <AnimatedText ref={label} tagName="p" type="lines" mask="lines" className="flex items-center body1 text-black col-span-3 py-6">
        {capability.label}
      </AnimatedText>
      <div className="flex col-span-5 col-start-4 md:col-start-8 gap-1.5">
        {categories.map((cat, i) => (
          <Cell
            key={cat.id}
            ref={(el) => {
              items.current[i] = el
            }}
            cell={capability.categories.find((x) => x.id === cat.id)!}
            index={i}
            total={categories.length}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  )
})

// Scale module 420112.
function SgpPlatformDifferentiators({ c }: { c: GenAiContent['differentiators'] }) {
  const root = useRef<HTMLElement>(null)
  const table = useRef<HTMLDivElement>(null)
  const rows = useRef<(RowHandle | null)[]>([])
  const dividers = useRef<HTMLSpanElement[]>([])
  const labels = useRef<AnimatedTextHandle[]>([])
  const heading = useRef<AnimatedTextHandle>(null)
  const capabilitiesHead = useRef<AnimatedTextHandle>(null)
  const headShown = useRef(false)
  const tableShown = useRef(false)
  const cells = useRef<(CellHandle | null)[][]>([])
  const count = c.capabilities.length
  useLayoutEffect(() => {
    const d: HTMLSpanElement[] = []
    const l: AnimatedTextHandle[] = []
    const r: (CellHandle | null)[][] = []
    for (let i = 0; i < count; i++) {
      const row = rows.current[i]
      if (row?.divider) d.push(row.divider)
      if (row?.label) l.push(row.label)
      if (row?.itemRefs) {
        row.itemRefs.forEach((item) => item?.clickableRefs.forEach((b) => gsap.set(b, { scale: 0 })))
        r.push(row.itemRefs)
      }
    }
    dividers.current = d
    labels.current = l
    cells.current = r
  }, [count, c.categories.length])
  useInViewTrigger(root, {
    onEnter: () => {
      if (headShown.current) return
      heading.current?.animateIn()
      headShown.current = true
    },
  })
  useInViewTrigger(table, {
    start: 'top center+=20%',
    end: 'bottom top',
    onEnter: () => {
      if (tableShown.current) return
      const d = dividers.current
      if (d.length === 0) return
      gsap.fromTo(d, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', stagger: 0.25, duration: 1.2, ease: 'power2.out' })
      const l = labels.current
      if (l.length === 0) return
      capabilitiesHead.current?.animateIn?.()
      l.forEach((t, i) => {
        void t.animateIn?.({ duration: 1.2, delay: 0.1 * i })
      })
      const r = cells.current
      if (r.length !== 0) {
        r.forEach((row, i) => {
          row.forEach((cell, j) => {
            gsap.fromTo(cell!.clickableRefs, { scale: 0 }, { scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.1 * i + 0.1 * j })
          })
        })
        tableShown.current = true
      }
    },
  })
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    const f = () => {
      clearTimeout(t)
      t = setTimeout(() => setIsMobile(window.innerWidth < 769), 50)
    }
    window.addEventListener('resize', f)
    f()
    return () => window.removeEventListener('resize', f)
  }, [])
  return (
    <section ref={root} className="SgpPlatformDifferentiators scroll-mt-28 text-black bg-white relative min-h-full items-end pb-16 md:py-20 flex alig-center justify-center">
      <div>
        <div className="flex flex-col gap-24 md:gap-30 col-span-full">
          <div className="grid-layout-mobile md:grid-layout-desktop">
            <AnimatedText ref={heading} tagName="h4" className="col-span-5 col-start-4 md:col-span-4 md:col-start-8 header2 md:text-5xl xl:header2 text-balance">
              {c.heading}
            </AnimatedText>
          </div>
          <div className="w-full overflow-x-clip">
            <div ref={table} className="w-full relative" role="table" aria-label={c.heading} style={{ gridTemplateColumns: `minmax(11rem, 5.5fr) repeat(${c.categories.length}, minmax(2.75rem, 1fr))` }}>
              <div>
                <div className="mb-8 grid-layout-mobile md:grid-layout-desktop" role="row">
                  <AnimatedText ref={capabilitiesHead} tagName="div" className="flex items-center col-span-3 bg-white body2-regular text-scale-gray-10" role="columnheader">
                    {c.capabilitiesLabel}
                  </AnimatedText>
                  <div className="flex col-span-5 col-start-4 md:col-start-8 gap-0.5 md:gap-1.5">
                    {c.categories.map((cat, i) => (
                      <div key={cat.id} className="flex-1">
                        <div className={cn('p-0.5 md:p-2 tracking-wide text-center capitalize detail-regular md:body3 text-neutral-900 rounded-md h-full flex items-center justify-center py-2', i === 0 ? 'bg-black text-white' : 'bg-scale-gray-90 text-black')} role="columnheader">
                          {cat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {c.capabilities.map((cap, i) => (
                <CapabilityRow
                  key={i}
                  ref={(el) => {
                    rows.current[i] = el
                  }}
                  capability={cap}
                  categories={c.categories}
                  rowIndex={i}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Scale module 146778.
function SgpSecurity({ c }: { c: GenAiContent['security'] }) {
  const root = useRef<HTMLElement>(null)
  const heading = useRef<AnimatedTextHandle>(null)
  const phone = useMediaQuery('(max-width: 768px)')
  const shown = useRef(false)
  useInViewTrigger(root, {
    start: 'top bottom-=20%',
    end: 'bottom top',
    onEnter: () => {
      if (shown.current) return
      heading.current?.animateIn()
      shown.current = true
    },
  })
  return (
    <section ref={root} className="SgpSecurity relative bg-scale-gray-80 text-neutral-900 pt-16 pb-16 md:pt-28">
      <div className="w-full grid-layout-mobile md:grid-layout-desktop gap-y-16 sm:gap-y-16 md:gap-y-28">
        <div className="col-span-full flex flex-col gap-6 md:gap-16 md:col-start-5 md:col-span-4 md:row-start-1">
          <AnimatedText ref={heading} tagName="h3" className="text-black header3-regular text-balance">
            {c.heading}
          </AnimatedText>
          <CMSLink href={c.link.url} className="text-sm font-medium transition-colors font-aeonik text-scale-gray-10 decoration-scale-gray-10/60 underline-offset-4 hover:text-white hover:decoration-white/60">
            {c.link.text} +
            <span className="absolute left-0 bottom-0 bg-black h-px scale-x-0 w-full transition-transform origin-left duration-300 ease-in-out group-hover/link:scale-x-100 group-hover/link:bg-white" />
          </CMSLink>
        </div>
        <div className="flex flex-col items-start gap-2 col-span-full md:col-start-10 md:col-span-2 md:row-start-1 md:content-start">
          {c.labels.map((label, i) => (
            <span key={`${label}-${i}`} className="inline-flex items-center max-w-full px-3 py-1 text-sm border rounded-lg w-fit border-scale-gray-10 font-aeonik text-scale-gray-10">
              {label}
            </span>
          ))}
        </div>
        <div className="col-span-full md:row-start-2">
          <ClipScrollSection startPercentage={10} startScale={1.2} borderRadius={phone ? 0.5 : 1} backdropColor="scale-gray-80">
            <div className="relative aspect-video w-full overflow-hidden xs:rounded-xl rounded-2xl h-[312px] xs:h-[312px] sm:h-[312px] md:h-[360px]">
              <ResponsiveImage asset={c.image} fill objectCover sizes="(min-width: 1024px) min(100vw, 1280px), 100vw" className="absolute inset-0 w-full h-full" />
            </div>
          </ClipScrollSection>
        </div>
      </div>
    </section>
  )
}

const DEMO_DESKTOP = { stackTopPx: 34, baseOffsetXPx: 200, baseOffsetYPx: 90, parallaxX: 1.3, parallaxY: 1.4, skewDeg: 18, max: 50 }
const DEMO_PHONE = { stackTopPx: 34, baseOffsetXPx: 80, baseOffsetYPx: 50, parallaxX: 1.3, parallaxY: 1.4, skewDeg: 18, max: 50 }
const vw = (px: number, base = 1520) => (100 * px) / base

// Scale module 309685.
function SgpDemo({ c }: { c: GenAiContent['demo'] }) {
  const root = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const head = useRef<HeadlineWithCtaHandle>(null)
  const shown = useRef(false)
  const images = c.images.filter((i) => i?.path).slice(0, 3)
  useInViewTrigger(root, {
    start: 'top bottom-=50%',
    end: 'bottom bottom',
    markers: false,
    onEnter: () => {
      if (shown.current) return
      head.current?.animateIn({ delay: 0, delayHeadline: 0, delaySubtitle: 0.5, delayCta: 1 })
      shown.current = true
    },
  })
  useScrubTrigger(root, {
    start: 'top bottom',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const phone = window.innerWidth < 768
      const base = phone ? 390 : 1520
      const k = phone ? DEMO_PHONE : DEMO_DESKTOP
      const p = mapRange(self.progress, 0, 1, k.max, 0, true)
      cards.current.forEach((el, i) => {
        if (!el) return
        const x = i * k.baseOffsetXPx + p * k.parallaxX * (i + 1)
        const y = i * k.baseOffsetYPx + p * k.parallaxY * (i + 1)
        gsap.set(el, { top: i * k.stackTopPx, transform: `translate(${vw(x, base)}vw, -${vw(y, base)}vw) skewY(${k.skewDeg}deg)` })
      })
    },
  })
  useEffect(() => {
    head.current?.animateSet?.()
    setTheme(root.current, 'dark')
  }, [])
  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => {
      cards.current.forEach((el, i) => {
        if (!el) return
        const phone = window.innerWidth < 768
        const base = phone ? 390 : 1520
        const k = phone ? DEMO_PHONE : DEMO_DESKTOP
        gsap.set(el, { top: i * k.stackTopPx, transform: `translate(${vw(i * k.baseOffsetXPx, base)}vw, -${vw(i * k.baseOffsetYPx, base)}vw) skewY(${k.skewDeg}deg)` })
      })
    })
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])
  return (
    <section ref={root} className={cn('SgpDemo relative isolate h-screen min-h-screen w-full overflow-hidden bg-black text-white', styles.root)}>
      <div className="relative z-10 grid h-full w-full grid-layout-mobile md:grid-layout-desktop min-h-dvh md:min-h-screen content-center">
        <div className="col-span-full flex flex-col max-md:justify-center md:justify-end pb-[25vw] md:pb-[15vh] order-2 md:order-1 md:col-start-2 md:col-span-3 md:justify-center md:self-center md:pb-0 max-md:[&_.HeadlineWithCta]:items-center md:[&_.HeadlineWithCta]:items-start max-md:[&_.HeadlineWithCta>*:nth-child(1)]:text-center! md:[&_.HeadlineWithCta>*:nth-child(1)]:text-left! max-md:[&_.HeadlineWithCta>*:nth-child(2)]:text-center! md:[&_.HeadlineWithCta>*:nth-child(2)]:text-left! max-md:[&_.HeadlineWithCta_button]:mx-auto md:[&_.HeadlineWithCta_button]:mx-0">
          <HeadlineWithCta ref={head} animationManual padding={false} headline={c.headline} subtitle={c.subtitle} cta={[{ url: c.cta.url, text: c.cta.text, variant: 'arrow' }]} align="left" headerClass="header3-regular leading-none" width="w-full" subtitleClasses="max-w-xl md:max-w-none text-scale-gray-60" />
        </div>
        <div className="pointer-events-none min-h-0 max-md:w-full md:block md:self-center pt-[14vh] py-14 md:py-0 col-start-2 col-span-6 order-1 md:order-2 md:col-start-6 md:col-span-4">
          <div className="relative h-auto md:h-full w-full">
            <div className="relative flex h-full min-h-0 w-full items-center justify-end">
              <div className="relative h-[min(420px,52vh)] w-full">
                {images.map((img, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      cards.current[i] = el
                    }}
                    className={cn('absolute aspect-[1.5] w-full overflow-hidden rounded-lg md:rounded-2xl shadow-[0_28px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/10', styles.orthoImage)}
                    style={{ zIndex: images.length - i, perspective: '1000px' }}
                  >
                    <ResponsiveImage asset={img} fill objectCover sizes="(max-width: 767px) 85vw, (min-width: 768px) min(38vw, 420px), 0" className="absolute inset-0 h-full w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialLogo({ src }: { src: string }) {
  const url = `url("${src}")`
  return (
    <div className="relative block w-full h-full">
      <div className="inline-block h-full relative z-10 w-full" style={{ backgroundColor: 'currentColor', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="opacity-0 pointer-events-none" width={100} style={{ width: 100, height: 'auto', maxWidth: 100, maxHeight: 80 }} />
      </div>
    </div>
  )
}

export function GenAiPortfolioPage({ content: c }: { content: GenAiContent }) {
  return (
    <div className="relative overflow-x-hidden no-scrollbar" data-initial-chrome-theme="dark">
      <PageThemeSetter theme="dark" />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        <SgpHero c={c.hero} />
        <SteppedVideo componentName="SgpIntro" configFilePath="sgp-intro.json" introHeadline={c.intro.headline} introBody={c.intro.body} steps={c.intro.steps} counterLabel={c.intro.counterLabel} scrollLabel={c.intro.scrollLabel} />
        <div id={c.postTraining.anchorId} aria-hidden="true" className="h-0 scroll-mt-28" />
        <TwoColumnTextWithVideo theme="enterpriseRaceIsOn" videoFirst background={{ className: 'bg-white text-black' }} cta={c.postTraining.cta} ctaColumn="right" heading={EMPTY_H4} leftColumn={c.postTraining.left} rightColumn={c.postTraining.right} />
        <SgpStack c={c.stack} />
        <TrustSection c={c.trust} />
        <SteppedVideo componentName="SgpFlywheel" configFilePath="sgp-flywheel.json" introHeadline={c.flywheel.headline} introBody={c.flywheel.body} steps={c.flywheel.steps} flywheelLabels={c.flywheel.labels} />
        <TwoColumnTextWithVideo theme="enterpriseRaceIsOn" videoFirst background={{ className: 'bg-white text-black' }} cta={c.dialect.cta} ctaColumn="left" leftColumn={c.dialect.left} rightColumn={c.dialect.right} video={c.dialect.video} />
        <SgpPlatformDifferentiators c={c.differentiators} />
        <SgpSecurity c={c.security} />
        <ClientTestimonials
          heading={c.testimonials.heading}
          colorTheme={{ tailwindClass: 'foundry-tan', hex: '#A8927C', contrastColor: '#010101' }}
          pinOnExit
          testimonials={c.testimonials.items.map((t) => ({ clientName: t.clientName, title: t.title, testimonial: t.testimonial, logoNode: t.logo ? <TestimonialLogo src={t.logo} /> : undefined }))}
        />
        <SgpDemo c={c.demo} />
        <Faqs heading={c.faqs.heading} faqs={c.faqs.items} ctaText={c.faqs.ctaText} ctaHref={c.faqs.ctaHref} />
        <BlogPreview heading={c.blog.heading} pageThemeOverride="dark" posts={c.blog.posts} />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
