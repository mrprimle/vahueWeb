'use client'

import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import styles from './styles.module.css'

const BASE = '/scale-clone/generative-ai-data-engine'

// TODO: Vahue copy (titles); posters are Scale's Wistia stills, the players are not embedded.
const DEMOS = [
  { title: 'Guided Instruction Tuning Walkthrough', poster: `${BASE}/demo-1.jpg` },
  { title: 'Span Feedback', poster: `${BASE}/demo-2.jpg` },
  { title: 'Preference Ranking with Human Review', poster: `${BASE}/demo-3.jpg` },
]

const Play = () => (
  <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
    <svg viewBox="0 0 60 60" className="h-[27px] w-[27px] sm:h-9 sm:w-9" aria-hidden>
      <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742zm0 0" />
    </svg>
  </span>
)

// Keen Slider options copied from scale.com's demo carousel.
export default function Demos() {
  const [active, setActive] = useState(0)
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    rubberband: false,
    dragStarted: () => setCursor('grabbing'),
    dragEnded: () => setCursor('grab'),
    slideChanged: (s) => setActive(s.track.details.abs),
    breakpoints: {
      '(min-width: 0px) and (max-width: 639px)': { slides: { perView: 1, spacing: 32, origin: 'center' }, mode: 'snap' },
      '(min-width: 640px) and (max-width: 767px)': { slides: { perView: 2, spacing: 32 }, mode: 'free' },
      '(min-width: 768px) and (max-width: 1040px)': { slides: { perView: 3.1, spacing: 32 }, mode: 'snap' },
      '(min-width: 1041px)': { slides: { perView: 3, spacing: 32 }, mode: 'snap' },
    },
  })

  return (
    <div className="relative scroll-mt-[-15px]">
      <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
        <button
          key={active}
          type="button"
          aria-label={`Play ${DEMOS[active].title}`}
          className={`${styles.fadeIn} group relative hidden aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f2] sm:block`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={DEMOS[active].poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <Play />
        </button>

        <div ref={ref} className="keen-slider !overflow-visible" style={{ cursor }}>
          {DEMOS.map((d, i) => (
            <div
              key={d.title}
              onClick={() => setActive(i)}
              className={`keen-slider__slide !overflow-visible grid h-fit cursor-pointer transition-opacity duration-300 ${
                i === active ? 'opacity-100' : 'hover:opacity-70 sm:opacity-50'
              }`}
            >
              <button type="button" aria-label={`Play ${d.title}`} className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f2] sm:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <Play />
              </button>
              <div className={`${styles.videoThumb} hidden sm:block`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.poster} alt="" width={384} height={214} className="block h-auto w-[384px] max-w-full rounded-[11px]" />
              </div>
              <div className="relative">
                {/* TODO: Vahue copy */}
                <h4 className="mb-3 mt-2 text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{d.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-50 mx-auto flex justify-center gap-x-1 sm:hidden">
          {DEMOS.map((d, i) => (
            <button key={d.title} type="button" aria-label={`Go to ${d.title}`} className="cursor-pointer px-0.5 py-2" onClick={() => slider.current?.moveToIdx(i)}>
              <span className={`block min-h-[10px] min-w-[10px] rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-[#37383B]'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
