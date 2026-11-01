'use client'

// Scale module 382790. `desktopGrid` swaps the slider for a grid from lg; without it the slider stays at every width.
// pages/data-engine has its own copy with the grid always on.
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { GlowBackground } from './GlowBackground'
import { WheelControls } from './keenWheelControls'

export type ResourceItem = {
  id: string
  overtitle: string
  title: string
  image: { src: string; alt?: string }
  description?: string
  link: string
}

function ResourceCard({ item, showDescription, className }: { item: ResourceItem; showDescription?: boolean; className: string }) {
  return (
    <Link href={item.link} className={cn('block', className)}>
      <div className="aspect-[389/243] rounded-lg relative z-10 bg-black overflow-hidden">
        <Image src={item.image.src} width={640} height={402} alt={item.image.alt || item.title || 'Resource image'} className="object-cover w-full h-full rounded-lg" />
      </div>
      <div className="relative z-20 pt-6">
        <p className="text-sm font-medium leading-[1.71] text-[#D1AAD7]">{item.overtitle}</p>
        <h5 className="line-clamp-2 text-2xl font-aeonik leading-[1.33] mt-1">{item.title}</h5>
        {showDescription ? <p className="text-zinc-400 leading-[1.5] line-clamp-5  lg:mt-2">{item.description}</p> : null}
      </div>
    </Link>
  )
}

export function ResourcesCarousel({ items, className, description, desktopGrid = false }: { items: ResourceItem[]; className?: string; description?: boolean; desktopGrid?: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [created, setCreated] = useState(false)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: 'snap',
      rubberband: false,
      slides: { perView: 1.05, spacing: 24 },
      breakpoints: {
        '(min-width: 640px)': { mode: 'free', slides: { perView: 1.4, spacing: 24 } },
        '(min-width: 768px)': { mode: 'free', slides: { perView: 2, spacing: 24 } },
        '(min-width: 1280px)': { mode: 'free', slides: { perView: 2.8, spacing: 24 } },
      },
      dragStarted: () => {
        if (slider.current) slider.current.container.style.cursor = 'grabbing'
      },
      dragEnded: () => {
        if (slider.current) slider.current.container.style.cursor = 'grab'
      },
      created: () => setCreated(true),
      destroyed: () => setCreated(false),
    },
    [WheelControls],
  )
  useEffect(() => {
    if (items.length && !created) {
      const t = setTimeout(() => setCreated(true), 1000)
      return () => clearTimeout(t)
    }
  }, [items.length, created])
  useEffect(() => {
    const el = wrapper.current
    if (!el || !slider.current) return
    const onKey = (e: KeyboardEvent) => {
      if (!slider.current || e.key !== 'Tab') return
      if (e.shiftKey) slider.current.prev()
      else slider.current.next()
    }
    const onFocus = (e: FocusEvent) => {
      const s = slider.current
      if (!s?.slides?.length || !s.track?.details) return
      if (e.target === s.slides[0]) s.moveToIdx(s.track.details.minIdx)
      if (e.target === s.slides[s.slides.length - 1]) s.moveToIdx(s.track.details.maxIdx)
    }
    el.addEventListener('keydown', onKey)
    el.addEventListener('focusin', onFocus)
    return () => {
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('focusin', onFocus)
    }
  }, [items.length, slider])
  return (
    <div className={cn(className, 'relative z-0')}>
      <GlowBackground className="absolute -top-[80%] -bottom-[20%] inset-0 opacity-30" />
      <div ref={wrapper} className={cn('overflow-x-hidden', desktopGrid && 'lg:hidden')}>
        <div
          ref={sliderRef}
          className={cn('keen-slider !overflow-visible cursor-grab h-full', created ? 'opacity-100' : 'opacity-50')}
          style={{ visibility: 'visible', transition: 'opacity 0.3s ease-in-out' }}
        >
          {items.map((item) => (
            <ResourceCard key={item.id} item={item} showDescription={description} className="keen-slider__slide" />
          ))}
        </div>
      </div>
      {desktopGrid ? (
        <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <ResourceCard key={item.id} item={item} showDescription={description} className="block h-full" />
          ))}
        </div>
      ) : null}
    </div>
  )
}
