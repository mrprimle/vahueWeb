'use client'

import { useCallback, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import 'keen-slider/keen-slider.min.css'
import styles from './styles.module.css'

const BASE = '/scale-clone/generative-ai-data-engine'

// TODO: Vahue copy (titles). Posters are Scale's Wistia stills; `id` is the Wistia media id from scale.com's
// VideoGallery props, played through the same fast.wistia.net iframe Scale swaps in on click.
const DEMOS = [
  { title: 'Guided Instruction Tuning Walkthrough', poster: `${BASE}/demo-1.jpg`, id: '4n8xcpuanb' },
  { title: 'Span Feedback', poster: `${BASE}/demo-2.jpg`, id: '10r609ojj4' },
  { title: 'Preference Ranking with Human Review', poster: `${BASE}/demo-3.jpg`, id: 'wtp2wcktbl' },
]
type Demo = (typeof DEMOS)[number]

const Play = () => (
  <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
    <svg viewBox="0 0 60 60" className="h-[27px] w-[27px] sm:h-9 sm:w-9" aria-hidden>
      <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742zm0 0" />
    </svg>
  </span>
)

// Scale's Wistia Video (chunk 30w17vppvfdah.js, module 832862): poster button, click (or autoPlay) swaps in the
// iframe `fast.wistia.net/embed/iframe/<id>?autoPlay=1`.
function Video({ demo, autoPlay = false, className = '' }: { demo: Demo; autoPlay?: boolean; className?: string }) {
  const [playing, setPlaying] = useState(autoPlay)
  if (playing) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-2xl ${className}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://fast.wistia.net/embed/iframe/${demo.id}?autoPlay=1`}
          title={demo.title}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${demo.title}`}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f2] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={demo.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <Play />
    </button>
  )
}

/*
 * Scale's VideoGallery (chunk 30w17vppvfdah.js, module 482270), Keen Slider options copied verbatim.
 *  - slide click: becomes active; on >= 640px it also autoplays in the big player and smooth-scrolls the
 *    gallery to 16px below the viewport top (window.scrollTo behavior 'smooth')
 *  - slideChanged: active = track abs, autoplay off
 *  - cursor starts 'default' (<= 3 videos), 'grabbing' while dragging, 'grab' after
 *  - dots render once the slider is created
 */
export default function Demos() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [created, setCreated] = useState(false)
  const [cursor, setCursor] = useState<'default' | 'grab' | 'grabbing'>(() => (DEMOS.length > 3 ? 'grab' : 'default'))
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    rubberband: false,
    created: () => setCreated(true),
    dragStarted: () => setCursor('grabbing'),
    dragEnded: () => setCursor('grab'),
    slideChanged: (s) => {
      setActive(s.track.details.abs)
      setAutoPlay(false)
    },
    breakpoints: {
      '(min-width: 0px) and (max-width: 639px)': { slides: { perView: 1, spacing: 32 }, mode: 'snap' },
      '(min-width: 640px) and (max-width: 767px)': { slides: { perView: 2, spacing: 32 }, mode: 'free' },
      '(min-width: 768px) and (max-width: 1040px)': { slides: { perView: 3.1, spacing: 32 }, mode: 'snap' },
      '(min-width: 1041px)': { slides: { perView: 3, spacing: 32 }, mode: 'snap' },
    },
  }, [WheelControls])

  const scrollToGallery = useCallback(() => {
    const el = rootRef.current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' })
  }, [])

  const onSlideClick = (i: number) => {
    setActive(i)
    if (!matchMedia('(max-width: 639px)').matches) {
      setAutoPlay(true)
      scrollToGallery()
    }
  }

  return (
    <div ref={rootRef} className="relative scroll-mt-[-15px]">
      <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
        <Video key={DEMOS[active].title} demo={DEMOS[active]} autoPlay={autoPlay} className={`${styles.fadeIn} hidden sm:block`} />

        <div ref={ref} className="keen-slider !overflow-visible" style={{ cursor }}>
          {DEMOS.map((d, i) => (
            <div
              key={d.title}
              onClick={() => onSlideClick(i)}
              className={`keen-slider__slide !overflow-visible grid h-fit cursor-pointer opacity-100 transition-opacity duration-300 ${
                i === active ? '' : 'hover:opacity-70 sm:opacity-50 sm:hover:opacity-70'
              }`}
            >
              <Video demo={d} className="sm:hidden" />
              <div className={`${styles.videoThumb} hidden sm:block`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.poster} alt={d.title} width={384} height={214} className="block h-auto w-[384px] max-w-full rounded-[11px]" />
              </div>
              <div className="relative">
                {/* TODO: Vahue copy */}
                <h4 className="mb-3 mt-2 text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{d.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {created && slider.current ? (
          <div className="relative z-50 mx-auto flex justify-center gap-x-1 sm:hidden">
            {DEMOS.map((d, i) => (
              <button key={d.title} type="button" aria-label={`Slide to ${i + 1}`} className="cursor-pointer px-0.5 py-2" onClick={() => slider.current?.moveToIdx(i)}>
                <span className={`block min-h-[10px] min-w-[10px] rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-[#37383B]'}`} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
