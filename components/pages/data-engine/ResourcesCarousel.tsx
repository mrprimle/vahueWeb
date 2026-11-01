'use client'

// Scale module 382790: Keen Slider below lg, grid from lg. Wheel plugin is module 29713.
import { useKeenSlider, type KeenSliderInstance } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import type { DataEngineContent } from './types'
import styles from './data-engine.module.css'

type Item = DataEngineContent['resources']['items'][number]

function WheelControls(slider: KeenSliderInstance) {
  let timer: ReturnType<typeof setTimeout>
  let origin: { x: number; y: number }
  let active = false
  const emit = (e: WheelEvent, name: string) => {
    origin.x -= e.deltaX
    origin.y -= e.deltaY
    slider.container.dispatchEvent(new CustomEvent(name, { detail: { x: origin.x, y: origin.y } }))
  }
  const onWheel = (e: WheelEvent) => {
    if (Math.sign(e.deltaX) !== -0) e.preventDefault()
    if (!active) {
      origin = { x: e.pageX, y: e.pageY }
      emit(e, 'ksDragStart')
      active = true
    }
    emit(e, 'ksDrag')
    clearTimeout(timer)
    timer = setTimeout(() => {
      active = false
      emit(e, 'ksDragEnd')
    }, 50)
  }
  slider.on('created', () => {
    slider.container.addEventListener('wheel', onWheel, { passive: false })
  })
}

function ResourceCard({ item, className }: { item: Item; className: string }) {
  return (
    <Link href={item.link} className={cn('block', className)}>
      <div className="aspect-[389/243] rounded-lg relative z-10 bg-black overflow-hidden">
        <Image src={item.image.src} width={640} height={402} alt={item.image.alt || item.title || 'Resource image'} className="object-cover w-full h-full rounded-lg" />
      </div>
      <div className="relative z-20 pt-6">
        <p className="text-sm font-medium leading-[1.71] text-[#D1AAD7]">{item.overtitle}</p>
        <h5 className="line-clamp-2 text-2xl font-aeonik leading-[1.33] mt-1">{item.title}</h5>
      </div>
    </Link>
  )
}

export function ResourcesCarousel({ items }: { items: Item[] }) {
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
    <div className="relative z-0">
      <div className={cn('select-none pointer-events-none absolute -top-[80%] -bottom-[20%] inset-0 opacity-30', styles.glow)} />
      <div ref={wrapper} className="overflow-x-hidden lg:hidden">
        <div
          ref={sliderRef}
          className={cn('keen-slider !overflow-visible cursor-grab h-full', created ? 'opacity-100' : 'opacity-50')}
          style={{ visibility: 'visible', transition: 'opacity 0.3s ease-in-out' }}
        >
          {items.map((item) => (
            <ResourceCard key={item.id} item={item} className="keen-slider__slide" />
          ))}
        </div>
      </div>
      <div className="hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <ResourceCard key={item.id} item={item} className="block h-full" />
        ))}
      </div>
    </div>
  )
}
