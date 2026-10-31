'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import styles from './styles.module.css'

const BASE = '/scale-clone/generative-ai-data-engine'

// TODO: Vahue copy. The first card on scale.com is a customer case-study image (third-party brand),
// so it renders as a neutral placeholder tile.
const ITEMS: { kicker: string; title: string; image?: string }[] = [
  { kicker: 'Case Studies', title: 'Client Story: A Media Publisher' },
  { kicker: 'Report', title: 'State of AI Adoption', image: `${BASE}/resource-report.png` },
]

// Keen Slider options copied from scale.com's resources carousel.
export default function Resources() {
  const [ready, setReady] = useState(false)
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
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
    created: () => setReady(true),
    destroyed: () => setReady(false),
  })

  return (
    <div className="relative z-0">
      <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
      <div className="overflow-x-hidden">
        <div ref={ref} className={`keen-slider !overflow-visible h-full cursor-grab transition-opacity duration-300 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`}>
          {ITEMS.map((item) => (
            <Link key={item.title} href="/scale-clone/" className="keen-slider__slide block">
              <div className="relative z-10 aspect-[389/243] overflow-hidden rounded-lg bg-black">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="h-full w-full rounded-lg object-cover" draggable={false} />
                ) : (
                  <div className="h-full w-full rounded-lg bg-[#e7e7e7]" />
                )}
              </div>
              <div className="relative z-20 pt-6">
                <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">{item.kicker}</p>
                <h5 className="mt-1 line-clamp-2 text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{item.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
