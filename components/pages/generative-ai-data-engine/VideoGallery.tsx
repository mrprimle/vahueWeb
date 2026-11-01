'use client'

// Scale modules 482270 (VideoGallery) and 832862 (its Wistia player). Scale fetches thumbnails from Wistia's oEmbed on mount;
// here `cover` is always a local file, so the fetch only runs for a Wistia source with no cover.
// A non-Wistia `src` is a local file played by <video> in the same box. On Scale that branch is a YouTube player.
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useThemeStore } from '@/components/site/lib/themeStore'
import { WheelControls } from '@/components/site/shared/keenWheelControls'
import type { Video } from './types'
import styles from './generative-ai-data-engine.module.css'

function VideoPlayer({ src, poster, title = '', autoPlay = false, className }: { src: string; poster?: string; title?: string; autoPlay?: boolean; className?: string }) {
  const wistia = /wistia\.(com|net)/.test(src)
  const id = wistia ? (src.match(/(?:medias|iframe|embed\/medias)\/([a-zA-Z0-9]+)/)?.[1] ?? null) : null
  const [playing, setPlaying] = useState(autoPlay)
  const [fetched, setFetched] = useState<string | null>(null)
  useEffect(() => {
    if (poster || !id) return
    let stale = false
    fetch(`https://fast.wistia.com/oembed.json?url=https://home.wistia.com/medias/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!stale && d?.thumbnail_url) setFetched(d.thumbnail_url)
      })
      .catch(() => {})
    return () => {
      stale = true
    }
  }, [poster, id])
  const image = poster || fetched
  if (playing) {
    return (
      <div className={cn('relative aspect-video w-full overflow-hidden rounded-2xl', className)}>
        {wistia ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://fast.wistia.net/embed/iframe/${id}?autoPlay=1`} title={title} allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          <video className="absolute inset-0 h-full w-full" src={src} title={title} poster={image ?? undefined} controls autoPlay playsInline />
        )}
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title ? `Play ${title}` : 'Play video'}
      className={cn('group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-scale-gray-95', className)}
    >
      {image ? <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 896px" className="object-cover" unoptimized /> : null}
      <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-colors duration-200 group-hover:bg-black/70 sm:h-24 sm:w-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className="h-[27px] w-[27px] sm:h-9 sm:w-9">
          <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742zm0 0" />
        </svg>
      </span>
    </button>
  )
}

export function VideoGallery({ videos, className }: { videos: Video[]; className?: string }) {
  const theme = useThemeStore((s) => s.pageTheme)
  const [active, setActive] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [created, setCreated] = useState(false)
  const [cursor, setCursor] = useState(() => (videos.length > 3 ? 'grab' : 'default'))
  const mobile = useMediaQuery('(max-width: 639px)')
  const root = useRef<HTMLDivElement>(null)
  const scrollToTop = useCallback(() => {
    if (root.current) window.scrollTo({ top: root.current.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' })
  }, [])
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      rubberband: false,
      created() {
        setCreated(true)
      },
      dragStarted: () => setCursor('grabbing'),
      dragEnded: () => setCursor('grab'),
      slideChanged: (s) => {
        setActive(s.track.details.abs)
        setAutoPlay(false)
      },
      breakpoints: {
        // Scale also passes `centered: true` here. Keen 6 has no such option and ignores it.
        '(min-width: 0px) and (max-width: 639px)': { slides: { perView: 1, spacing: 32 }, mode: 'snap' },
        '(min-width: 640px) and (max-width: 767px)': { slides: { perView: 2, spacing: 32 }, mode: 'free' },
        '(min-width: 768px) and (max-width: 1040px)': { slides: { perView: 3.1, spacing: 32 }, mode: 'snap' },
        '(min-width: 1041px)': { slides: { perView: 3, spacing: 32 }, mode: 'snap' },
      },
    },
    [WheelControls],
  )
  return (
    <div className={cn(styles.section, className)} ref={root}>
      <div className="relative flex flex-col mb-12 gap-y-10 sm:mb-0">
        <VideoPlayer
          key={videos[active].title}
          className={cn(styles.fadeIn, 'hidden sm:block')}
          src={videos[active].src}
          poster={videos[active].cover}
          title={videos[active].title}
          autoPlay={autoPlay}
        />
        {mobile || videos.length > 1 ? (
          <div ref={sliderRef} style={{ cursor }} className="keen-slider !overflow-visible">
            {videos.map((v, i) => (
              <div
                key={v.title}
                className={cn(active !== i && 'sm:opacity-50 hover:opacity-70', 'cursor-pointer transition-opacity duration-300 keen-slider__slide !overflow-visible opacity-100 grid h-fit')}
                onClick={() => {
                  setActive(i)
                  if (!mobile) {
                    setAutoPlay(true)
                    scrollToTop()
                  }
                }}
              >
                {mobile ? (
                  <VideoPlayer src={v.src} poster={v.cover} title={v.title} />
                ) : (
                  <div className={styles.videoThumbnail}>{v.cover ? <Image src={v.cover} alt={v.title} width={384} height={235} className="rounded-[11px]" /> : null}</div>
                )}
                <div className="relative">
                  <h4 className={`mt-2 mb-3 leading-[1.33] text-2xl text-${theme === 'dark' ? 'white' : 'black'}`}>{v.title}</h4>
                  <p className="text-zinc-400">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {created && slider.current ? (
        <div className="relative z-50 flex justify-center mx-auto gap-x-1 sm:hidden">
          {videos.map((_, i) => (
            <button key={i} onClick={() => slider.current?.moveToIdx(i)} className="px-0.5 py-2 cursor-pointer" aria-label={`Slide to ${i + 1}`} type="button">
              <span className={cn('rounded-full min-w-[10px] min-h-[10px] block transition-colors', active === i ? 'bg-white' : 'bg-[#37383B]')} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
