'use client'

import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import { demos } from './content'
import { Play } from './icons'
import { CONTAINER, SECTION, SectionHeader } from './StaticSections'
import styles from './styles.module.css'

// TODO: Vahue demo poster. Scale's posters are product screenshots with baked-in titles,
// so a dark panel in the same colour family stands in for them.
function Poster() {
  return <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,#1a1530_0%,#07050f_70%)]" />
}

function Player({ title, className = '' }: { title: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={`Play ${title}`}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f2] ${className}`}
    >
      <Poster />
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
        <Play className="h-[27px] w-[27px] sm:h-9 sm:w-9" />
      </span>
    </button>
  )
}

// scale.com VideoGallery (chunk 30w17vppvfdah.js): Keen Slider, rubberband off,
//   <640 perView 1 / spacing 32 / snap / centered, 640-767 perView 2 free,
//   768-1040 perView 3.1 snap, >=1041 perView 3 snap. Inactive slides 50% (70% on hover).
export default function Demos() {
  const [active, setActive] = useState(0)
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
    slideChanged: (s) => setActive(s.track.details.abs),
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
        <div className="relative">
          <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
            <Player key={active} title={demos.items[active].title} className={`hidden sm:block ${styles.fadeIn}`} />
            <div ref={sliderRef} style={{ cursor }} className={`keen-slider ${styles.keen}`}>
              {demos.items.map((d, i) => (
                <div
                  key={d.title}
                  onClick={() => setActive(i)}
                  className={`keen-slider__slide grid h-fit cursor-pointer !overflow-visible opacity-100 transition-opacity duration-300 ${active !== i ? 'hover:opacity-70 sm:opacity-50' : ''}`}
                >
                  {mobile ? (
                    <Player title={d.title} />
                  ) : (
                    <div className={styles.videoThumbnail}>
                      <div className="relative aspect-[384/235] w-full overflow-hidden rounded-[11px]">
                        <Poster />
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    {/* TODO: Vahue copy */}
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
