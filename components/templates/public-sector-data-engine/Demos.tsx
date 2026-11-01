'use client'

import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import type { PublicSectorDataEngineContent } from './content'
import { Play } from './icons'
import { CONTAINER, SECTION, SectionHeader } from './StaticSections'
import styles from './styles.module.css'

type Demo = PublicSectorDataEngineContent['demos']['items'][number]

function Poster({ poster }: { poster: Demo['poster'] }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={poster.src} alt={poster.alt} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-contain" />
}

// scale.com ResponsiveVideo -> WistiaPlayer (chunk 30w17vppvfdah.js, module 832862): a poster button that swaps itself
// for the embed on click, or straight away when rendered with autoPlay. A demo with no video is a still frame, with no
// play control.
function Player({ demo, autoPlay = false, className = '' }: { demo: Demo; autoPlay?: boolean; className?: string }) {
  const [playing, setPlaying] = useState(autoPlay)
  const frame = `relative aspect-video w-full overflow-hidden rounded-2xl bg-[#f2f2f2] ${className}`
  if (!demo.video) {
    return (
      <div className={frame} data-qa="demo-still">
        <Poster poster={demo.poster} />
      </div>
    )
  }
  if (playing) {
    return (
      <div className={frame} data-qa="demo-playing">
        <iframe src={demo.video} title={demo.title} allow="autoplay; fullscreen" className="absolute inset-0 h-full w-full" />
      </div>
    )
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${demo.title}`} className={`group block cursor-pointer ${frame}`}>
      <Poster poster={demo.poster} />
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
        <Play className="h-[27px] w-[27px] sm:h-9 sm:w-9" />
      </span>
    </button>
  )
}

// scale.com VideoGallery (chunk 30w17vppvfdah.js): Keen Slider, rubberband off,
//   <640 perView 1 / spacing 32 / snap / centered, 640-767 perView 2 free,
//   768-1040 perView 3.1 snap, >=1041 perView 3 snap. Inactive slides 50% (70% on hover).
//   Slide click: select it; on >=640px also autoplay the main player and window.scrollTo({ behavior: 'smooth' })
//   the gallery root to 16px below the viewport top. slideChanged selects the slide and clears autoplay.
export default function Demos({ content: demos }: { content: PublicSectorDataEngineContent['demos'] }) {
  const [active, setActive] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const gallery = useRef<HTMLDivElement>(null)
  const [created, setCreated] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [cursor, setCursor] = useState(demos.items.length > 3 ? 'grab' : 'default')

  useEffect(() => {
    const mq = matchMedia('(max-width: 639px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
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

  return (
    <section className={SECTION}>
      <div className={`${CONTAINER} relative`}>
        <SectionHeader eyebrow={demos.eyebrow} title={demos.title} eyebrowClassName="text-black" />
        <div ref={gallery} data-qa="gallery" className="relative">
          <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
            <Player key={demos.items[active].title} demo={demos.items[active]} autoPlay={autoPlay} className={`hidden sm:block ${styles.fadeIn}`} />
            <div ref={sliderRef} style={{ cursor }} className={`keen-slider ${styles.keen}`}>
              {demos.items.map((d, i) => (
                <div
                  key={d.title}
                  onClick={() => {
                    setActive(i)
                    if (mobile) return
                    setAutoPlay(true)
                    const el = gallery.current
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' })
                  }}
                  className={`keen-slider__slide grid h-fit cursor-pointer !overflow-visible opacity-100 transition-opacity duration-300 ${active !== i ? 'hover:opacity-70 sm:opacity-50' : ''}`}
                >
                  {mobile ? (
                    <Player demo={d} />
                  ) : (
                    <div className={styles.videoThumbnail}>
                      <div className="relative aspect-[384/235] w-full overflow-hidden rounded-[11px] bg-[#f2f2f2]">
                        <Poster poster={d.poster} />
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <h4 className="mb-3 mt-2 text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{d.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {created && slider.current ? (
            <div className="relative z-50 mx-auto flex justify-center gap-x-1 sm:hidden">
              {demos.items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide to ${i + 1}`}
                  onClick={() => slider.current?.moveToIdx(i)}
                  className="cursor-pointer px-0.5 py-2"
                >
                  <span className={`block min-h-[10px] min-w-[10px] rounded-full transition-colors ${active === i ? 'bg-white' : 'bg-[#37383B]'}`} />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
