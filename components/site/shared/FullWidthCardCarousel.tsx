'use client'

// Scale module 424625 (chunk 0sni47mcvnqwg.js): Keen Slider card carousel, cards repeated to at least 16 slides.
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { cn } from '../lib/cn'
import { gsap } from '../lib/gsap'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { AnimatedText, linkTextAnimation, type AnimatedTextHandle } from './AnimatedText'
import { CMSLink } from './CMSLink'
import { FlatCta } from './FlatCta'
import { LogoTile } from './LogoMarquee'
import { RichText, type RichBlock } from './RichText'

export type CarouselCard = {
  _key?: string
  heading?: RichBlock[]
  /** Absent: a neutral tile at the same 40px box. */
  image?: { path: string; alt?: string }
  imageSubtitle?: string
  link?: { url: string; text?: string }
}

const ARROW_BUTTON = 'box-border !size-11 !min-h-11 !min-w-11 !max-h-11 !max-w-11 !shrink-0 !gap-0 !p-0 hover:opacity-80'
const GREY = '#929292'

function CardArrow() {
  return (
    <svg className="block size-5 shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M14.8491 12.0446C15.374 11.5196 15.0022 10.622 14.2598 10.622H0.833334C0.373096 10.622 0 10.2489 0 9.78867V9.51504C0 9.0548 0.373096 8.68171 0.833333 8.68171H14.2598C15.0022 8.68171 15.374 7.78409 14.8491 7.25912L9.21422 1.62428C8.88997 1.30003 8.88861 0.774728 9.2112 0.44881L9.41076 0.247186C9.7357 -0.08111 10.2657 -0.0824722 10.5923 0.244148L19.4107 9.0626C19.7362 9.38804 19.7362 9.91567 19.4107 10.2411L10.5923 19.0596C10.2657 19.3862 9.7357 19.3848 9.41076 19.0565L9.2112 18.8549C8.88861 18.529 8.88997 18.0037 9.21422 17.6794L14.8491 12.0446Z"
        fill="currentColor"
      />
    </svg>
  )
}

function HoverArrow() {
  return (
    <div className="size-5 shrink-0 overflow-hidden" style={{ color: GREY }} aria-hidden>
      <div
        className={cn(
          'flex h-full transform-gpu gap-2 will-change-transform',
          '-translate-x-[calc(20px+8px)] transition-none',
          'group-hover/card:translate-x-0 group-hover/card:transition-transform group-hover/card:ease-out',
          'motion-reduce:!translate-x-0 motion-reduce:!transition-none',
        )}
        style={{ width: 56, transitionDuration: '600ms' }}
      >
        <span className="flex size-5 shrink-0 items-center justify-center">
          <CardArrow />
        </span>
        <span className="flex size-5 shrink-0 items-center justify-center">
          <CardArrow />
        </span>
      </div>
    </div>
  )
}

export function FullWidthCardCarousel({ header, cards }: { header?: RichBlock[]; cards?: CarouselCard[] }) {
  const list = useMemo(() => cards?.filter(Boolean) ?? [], [cards])
  const slides = useMemo(() => {
    if (!list.length) return []
    const count = Math.max(4, Math.ceil(16 / list.length)) * list.length
    return Array.from({ length: count }, (_, i) => ({ card: list[i % list.length] }))
  }, [list])
  const section = useRef<HTMLElement>(null)
  const headings = useRef<(AnimatedTextHandle | null)[]>([])
  const subtitles = useRef<(AnimatedTextHandle | null)[]>([])
  const images = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<AnimatedTextHandle>(null)
  const inView = useRef(false)
  const total = slides.length
  useEffect(() => {
    headings.current = headings.current.slice(0, total)
    subtitles.current = subtitles.current.slice(0, total)
    images.current = images.current.slice(0, total)
  }, [total])
  const [trackRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: { perView: 'auto', spacing: 8, origin: 'center' },
    dragStarted() {
      if (slider.current?.container) slider.current.container.style.cursor = 'grabbing'
    },
    dragEnded() {
      if (slider.current?.container) slider.current.container.style.cursor = 'grab'
    },
  })
  useEffect(() => {
    slider.current?.update()
  }, [slider])
  useEffect(() => {
    if (list.length === 0) return
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
      const t = e.target as Element | null
      if (t && typeof t.closest === 'function' && t.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      if (e.key === 'ArrowLeft') slider.current?.prev()
      else slider.current?.next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [list.length, slider])
  const onEnter = useCallback(() => {
    if (inView.current) return
    inView.current = true
    const h = headerRef.current
    if (h) h.ready().then(() => h.animateIn({ delay: 0.02 }))
    const edge = window.innerWidth < 400 ? 3 : 5
    const seq = {
      images: [...images.current.slice(total - edge, total), ...images.current.slice(0, edge)],
      headings: [...headings.current.slice(total - edge, total), ...headings.current.slice(0, edge)],
      subs: [...subtitles.current.slice(total - edge, total), ...subtitles.current.slice(0, edge)],
    }
    const pending: Promise<void>[] = []
    for (let i = 0; i < seq.headings.length; i++) {
      const at = 0.09 * i
      const heading = seq.headings[i]
      const image = seq.images[i]
      if (image) gsap.to(image, { scale: 1, duration: 0.95, ease: 'power3.out', delay: at })
      if (heading) pending.push(heading.animateIn({ delay: at + 0.08 }))
      const sub = seq.subs[i]
      if (sub) pending.push(sub.animateIn({ delay: at + 0.15 }))
    }
    void Promise.all(pending).then(() => {
      for (let i = 0; i < total - 1; i++) {
        if (i < edge || i >= total - edge) continue
        if (images.current[i]) gsap.set(images.current[i], { scale: 1, opacity: 1 })
        headings.current[i]?.animateIn({ duration: 0.01 })
        subtitles.current[i]?.animateIn({ duration: 0.01 })
      }
    })
  }, [total])
  useInViewTrigger(section, {
    onEnter,
    onEnterBack: () => {
      inView.current = true
    },
    onLeave: () => {
      inView.current = false
    },
    onLeaveBack: () => {
      inView.current = false
    },
  })
  if (list.length === 0) return null
  const hasControls = slides.length > 1
  const hasFooter = !!header?.length || hasControls
  const both = !!header?.length && hasControls
  return (
    <div className="FullWidthCardCarousel">
      <section ref={section} className="w-full py-12 md:py-16">
        <div role="region" aria-roledescription="carousel" aria-label="Card carousel" className="flex flex-col">
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-4 md:px-6">
            <div ref={trackRef} className={cn('keen-slider !overflow-visible w-full', hasControls && 'cursor-grab active:cursor-grabbing')}>
              {slides.map(({ card }, r) => {
                const url = card.link?.url ?? null
                const p = r % list.length
                const key = card._key ?? p
                const label = card.link?.text?.trim() || 'Learn more'
                const subtitle = card.imageSubtitle?.trim() ?? ''
                const badge = (
                  <div className="flex self-start p-2 rounded-lg shrink-0 bg-scale-gray-90">
                    <div className="relative size-[40px] shrink-0 overflow-hidden rounded-sm">
                      {card.image ? <Image src={card.image.path} alt="" fill sizes="40px" className="object-cover" unoptimized /> : <LogoTile className="!size-[40px] !w-[40px] !h-[40px] !border-0 text-black" />}
                    </div>
                  </div>
                )
                const article = (
                  <article className="relative flex min-h-full min-w-0 flex-1 flex-col w-full max-w-full gap-4 p-8 overflow-hidden bg-white rounded-2xl">
                    <div className="flex justify-start w-full min-w-0 shrink-0">
                      <div
                        ref={(el) => {
                          images.current[r] = el
                        }}
                        className="origin-top-left w-fit scale-0 will-change-transform"
                      >
                        {badge}
                      </div>
                    </div>
                    <div className="flex w-full min-w-0 flex-col items-start justify-start flex-1 min-h-0 pt-12 oml:pt-1 text-left h-fit">
                      {card.heading?.length ? (
                        <AnimatedText
                          ref={(el) => {
                            headings.current[r] = el
                          }}
                          tagName="h3"
                          contentKey={`fwc-h-${r}-${key}`}
                          className={cn('text-left text-xl font-medium text-black text-balance md:text-2xl', 'w-full min-w-0')}
                        >
                          <RichText value={card.heading} />
                        </AnimatedText>
                      ) : null}
                    </div>
                    {subtitle || url ? (
                      <div className="mt-auto flex w-full min-w-0 shrink-0 items-end gap-3">
                        {subtitle ? (
                          <div className="min-w-0 flex-1 text-left text-pretty" style={{ color: GREY }}>
                            <AnimatedText
                              ref={(el) => {
                                subtitles.current[r] = el
                              }}
                              tagName="p"
                              contentKey={`fwc-sub-${r}-${key}`}
                              customAnimation={linkTextAnimation}
                              className={cn('block w-full min-w-0 text-left', 'text-base font-normal leading-[1.3]')}
                            >
                              {subtitle}
                            </AnimatedText>
                          </div>
                        ) : null}
                        {url ? <HoverArrow /> : null}
                      </div>
                    ) : null}
                  </article>
                )
                return (
                  <div
                    className={cn(
                      'keen-slider__slide flex flex-col',
                      'w-[calc(100vw_-_3.5rem)] min-w-[calc(100vw_-_3.5rem)] max-w-[calc(100vw_-_3.5rem)]',
                      'sm:w-[404px] sm:min-w-[404px] sm:max-w-[404px]',
                    )}
                    key={`slide-${r}-${key}`}
                  >
                    {url ? (
                      <CMSLink
                        href={url}
                        label={label}
                        className="!w-full flex min-h-0 flex-1 flex-col min-w-0 max-w-full text-inherit no-underline outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-black/20 group/card"
                      >
                        {article}
                      </CMSLink>
                    ) : (
                      <div className="flex min-h-0 flex-1 flex-col">{article}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {hasFooter ? (
            <div className="mx-auto mt-6 w-full max-w-[1600px] px-4 md:mt-8 md:px-6">
              <div className={cn(both ? 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4' : null, header?.length && !both ? 'max-w-3xl text-white' : null, !header?.length && hasControls ? 'flex justify-end' : null)}>
                {header?.length ? (
                  <AnimatedText
                    ref={headerRef}
                    tagName="h2"
                    contentKey="full-width-card-carousel-header"
                    className={cn('mt-4 text-2xl font-medium text-black text-balance leading-[1.1] sm:text-2xl md:text-4xl', both && 'min-w-0')}
                  >
                    <RichText value={header} />
                  </AnimatedText>
                ) : null}
                {hasControls ? (
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <FlatCta
                      as="button"
                      aria-label="Previous slide"
                      className={ARROW_BUTTON}
                      variant="arrowOutline"
                      theme="black"
                      iconOnly
                      direction="left"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        slider.current?.prev()
                      }}
                    />
                    <FlatCta
                      as="button"
                      aria-label="Next slide"
                      className={ARROW_BUTTON}
                      variant="arrowOutline"
                      theme="black"
                      iconOnly
                      direction="right"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        slider.current?.next()
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
