'use client'

import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ASSET, CONTAINER, SectionHeader } from './Sections'
import s from './automotive.module.css'

/*
 * Resources slider (Scale's ResourcesSlider, same options at every width, no desktop grid on this page):
 * snap, perView 1.05, spacing 24, rubberband off; free mode from 640 (1.4), 768 (2), 1280 (2.8).
 * Track bleeds right: wrapper pl-6 / lg:pl-[max(2rem,(100vw-80rem)/2+2rem)], overflow-x hidden.
 * The track sits at opacity .5 until Keen's `created` (or a 1s fallback), then .3s ease-in-out to 1.
 */

// TODO: Vahue copy + links. Card 1 on Scale is a webinar still with speaker photos and title text: placeholder tile.
const CARDS = [
  { tag: 'Signal Engine', title: 'Turning Your Vehicle Fleet Into a Road Signal Engine', image: null },
  { tag: 'Guides', title: 'The Complete Field Guide', image: `${ASSET}/resource-guide.png` },
]

export default function Resources() {
  const [ready, setReady] = useState(false)
  const [ref] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'snap',
    rubberband: false,
    slides: { perView: 1.05, spacing: 24 },
    breakpoints: {
      '(min-width: 640px)': { mode: 'free', slides: { perView: 1.4, spacing: 24 } },
      '(min-width: 768px)': { mode: 'free', slides: { perView: 2, spacing: 24 } },
      '(min-width: 1280px)': { mode: 'free', slides: { perView: 2.8, spacing: 24 } },
    },
    created: () => setReady(true),
    destroyed: () => setReady(false),
    dragStarted: (sl) => {
      sl.container.style.cursor = 'grabbing'
    },
    dragEnded: (sl) => {
      sl.container.style.cursor = 'grab'
    },
  })

  useEffect(() => {
    if (ready) return
    const t = setTimeout(() => setReady(true), 1000)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <section className="relative py-16">
      <div className={CONTAINER}>
        <SectionHeader over="Resources" title="Read More About the Signal Engine" />
      </div>
      <div className="mt-10">
        <div className="relative z-0 pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className={`${s.whiteGlow} pointer-events-none absolute inset-0 -bottom-[20%] -top-[80%] select-none opacity-30`} />
          <div className="overflow-x-hidden">
            <div
              ref={ref}
              className={`keen-slider h-full cursor-grab !overflow-visible ${ready ? 'opacity-100' : 'opacity-50'}`}
              style={{ transition: 'opacity 0.3s ease-in-out' }}
            >
              {CARDS.map((c, i) => (
                <a key={i} href="#" className="keen-slider__slide block">
                  <div className="relative z-10 aspect-[389/243] overflow-hidden rounded-lg bg-black">
                    {c.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt="" loading="lazy" className="h-full w-full rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3" aria-hidden="true">
                        <span className="block h-3 w-16 rounded bg-white/25" />
                        <span className="block h-6 w-3/5 rounded bg-white/20" />
                        <span className="block h-6 w-2/5 rounded bg-white/20" />
                        <span className="mt-2 block h-10 w-20 rounded-full bg-white/15" />
                      </div>
                    )}
                  </div>
                  <div className="relative z-20 pt-6">
                    {/* TODO: Vahue copy */}
                    <p className="text-[14px] font-medium leading-[1.71] tracking-[-0.01em] text-[#D1AAD7]">{c.tag}</p>
                    <h5 className="mt-1 line-clamp-2 font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">
                      {c.title}
                    </h5>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
