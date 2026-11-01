'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { WheelControls } from '@/components/templates/public-sector-data-engine/keenWheel'
import { CONTAINER } from './StaticSections'
import { PlayGlyph } from './icons'
import type { VideoContent } from './content'
import s from './gps.module.css'

/*
 * WistiaPlayer (chunk 2xfd582q915vr.js module 832862, Wistia branch): a `button` (aspect-video, rounded-2xl,
 * bg-scale-gray-95, aria-label "Play video" when the title is empty) showing the poster (object-cover) and a 72px / sm 96px
 * bg-black/50 disc that darkens to /70 on group hover (transition-colors 200ms). Click -> the iframe
 * fast.wistia.net/embed/iframe/<id>?autoPlay=1 in the same box.
 * Scale fetches the poster from the Wistia oEmbed API at runtime; the clone ships that thumbnail as a static file
 * (no runtime API call). The ~15s video itself is not shipped: the iframe only loads after a click, as on Scale.
 */
function Player({ video, className = '' }: { video: VideoContent; className?: string }) {
  const [playing, setPlaying] = useState(false)
  if (playing && video.embedSrc) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-2xl ${className}`}>
        <iframe className="absolute inset-0 h-full w-full" src={video.embedSrc} title={video.title} allow="autoplay; fullscreen" allowFullScreen />
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={video.title ? `Play ${video.title}` : 'Play video'}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[var(--gps-card)] ${className}`}
    >
      {video.poster ? <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
        <PlayGlyph />
      </span>
    </button>
  )
}

/*
 * VideoGallery (page chunk 25a4rb779kpr2.js module 482270) with one video, inside section.py-12 > container >
 * `bg-white/10 p-4 z-10 relative rounded-2xl overflow-hidden md:overflow-visible` (box-asset-dark).
 *   >= 640px: only the main player (`rEiMFa_fadeIn` .6s ease-out, hidden sm:block); with a single video the Keen
 *     strip is not rendered (it needs mobile || videos > 1).
 *   < 640px (useMediaQuery "(max-width: 639px)"): Keen Slider strip, rubberband false, perView 1 / spacing 32 / snap /
 *     centered, plus the wheel plugin (module 29713: horizontal wheel -> ksDrag*); each slide = its own Player, an empty
 *     h4 (mt-2 mb-3) and p; then one dot button per slide ("Slide to N", 10px, active bg-white) once the slider exists.
 *   Slide click selects it (and, >= 640px only, autoplays the main player + smooth-scrolls the gallery to 16px).
 *   cursor: "default" (<= 3 videos), "grabbing" / "grab" on drag.
 * Listeners: React click on the button (REA ev_b29d6c24…: HubSpot mousedown + React click).
 */
export default function VideoGallery({ video }: { video: VideoContent }) {
  const [mobile, setMobile] = useState(false)
  const [created, setCreated] = useState(false)
  const [cursor, setCursor] = useState('default')
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = matchMedia('(max-width: 639px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      rubberband: false,
      created: () => setCreated(true),
      dragStarted: () => setCursor('grabbing'),
      dragEnded: () => setCursor('grab'),
      breakpoints: {
        '(min-width: 0px) and (max-width: 639px)': { slides: { perView: 1, spacing: 32 }, mode: 'snap' },
        '(min-width: 640px) and (max-width: 767px)': { slides: { perView: 2, spacing: 32 }, mode: 'free' },
        '(min-width: 768px) and (max-width: 1040px)': { slides: { perView: 3.1, spacing: 32 }, mode: 'snap' },
        '(min-width: 1041px)': { slides: { perView: 3, spacing: 32 }, mode: 'snap' },
      },
    },
    [WheelControls],
  )

  return (
    <section className="py-12">
      <div className={CONTAINER}>
        <div>
          <div className="relative z-10 overflow-hidden rounded-2xl bg-white/10 p-4 md:overflow-visible lg:items-center">
            <div ref={root} className={s.videoSection}>
              <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
                <Player video={video} className={`${s.fadeIn} hidden sm:block`} />
                {mobile ? (
                  <div ref={sliderRef} style={{ cursor }} className="keen-slider !overflow-visible">
                    <div className="keen-slider__slide grid h-fit cursor-pointer !overflow-visible opacity-100 transition-opacity duration-300">
                      <Player video={video} />
                      <div className="relative">
                        <h4 className="mb-3 mt-2 font-display text-2xl leading-[1.33] text-black">{video.title}</h4>
                        <p className="font-display text-zinc-400">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {mobile && created && slider.current ? (
                <div className="relative z-50 mx-auto flex justify-center gap-x-1 sm:hidden">
                  {slider.current.track.details.slides.map((_, i) => (
                    <button key={i} type="button" onClick={() => slider.current?.moveToIdx(i)} className="cursor-pointer px-0.5 py-2" aria-label={`Slide to ${i + 1}`}>
                      <span className="block min-h-[10px] min-w-[10px] rounded-full bg-white transition-colors" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
