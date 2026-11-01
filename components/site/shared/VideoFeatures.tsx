'use client'

// Scale module 450359 (Features) without `numbers`, with its video thumb, modal 582844 and the Wistia branch of player 832862.
// A local file plays in a `video` in the same box. `bullets`, `cta`, `overtitle` and `showBackground` are not ported: no page using this needs them yet.
import Image from 'next/image'
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/cn'
import { useThemeStore } from '../lib/themeStore'
import styles from './VideoFeatures.module.css'

export type VideoFeatureImage = { src: string; alt: string }
export type VideoFeature = { title: string; subtitle: string; image: VideoFeatureImage; videoLink?: string; aspectClassName?: string }

const WISTIA = /(?:medias|iframe|embed\/medias)\/([a-zA-Z0-9]+)/

function Modal({ isShowing, hide, children, contentClassName }: { isShowing: boolean; hide: () => void; children: ReactNode; contentClassName: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide()
    }
    document.body.style.overflow = isShowing ? 'hidden' : ''
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [hide, isShowing])
  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!(e.target as Element).closest('[data-modal]')) hide()
    },
    [hide],
  )
  if (!isShowing) return null
  return createPortal(
    <>
      <div className={`${styles.modalOverlay} bg-[#060606]/70 fixed w-screen h-screen inset-0`} style={{ zIndex: 60 }} />
      <div className={`${styles.modal} fixed inset-0 h-screen w-full overflow-y-scroll outline-hidden sm:p-y-10`} style={{ zIndex: 60 }} aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={onClick}>
        <div className="relative z-40 flex items-center justify-center min-h-screen sm:py-6">
          <div className={cn('relative flex flex-col md:text-center bg-neutral-950 sm:min-h-[auto] rounded-2xl pb-8 sm:pb-0 ', styles.modalWidth, contentClassName)} data-modal>
            <div>
              <button className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center" type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                    <path fill="white" fillRule="evenodd" d="M9.817 9.823a.625.625 0 0 1-.885 0L4.995 5.886 1.061 9.82a.626.626 0 0 1-.884-.884L4.11 5.002.177 1.069a.625.625 0 1 1 .885-.885l3.933 3.933L8.931.18a.625.625 0 0 1 .885.885L5.88 5.002l3.937 3.937a.625.625 0 0 1 0 .885Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="h-auto px-4 pb-4 overflow-hidden text-white/70">{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

/** Module 832862 with `autoPlay`, as the thumb mounts it. */
function Player({ src, poster, title }: { src: string; poster: string; title: string }) {
  const wistia = src.match(WISTIA)?.[1]
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl h-full">
      {wistia ? (
        <iframe className="absolute inset-0 h-full w-full" src={`https://fast.wistia.net/embed/iframe/${wistia}?autoPlay=1`} title={title} allow="autoplay; fullscreen" allowFullScreen />
      ) : (
        <video className="absolute inset-0 h-full w-full" src={src} poster={poster} title={title} controls autoPlay playsInline />
      )}
    </div>
  )
}

function VideoThumb({ image, videoLink }: { image: VideoFeatureImage; videoLink: string }) {
  const [open, setOpen] = useState(false)
  const hide = useCallback(() => setOpen(false), [])
  return (
    <div className="overflow-hidden relative w-full rounded-lg aspect-[3/2]">
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 80vw, 480px" className="object-cover absolute inset-0 w-full h-full" />
      <Modal isShowing={open} hide={hide} contentClassName="w-[95vw] max-w-7xl rounded-2xl bg-white/[15%] backdrop-blur-xl md:w-[80vw] lg:w-[70vw]">
        <div className="aspect-video w-full">{open ? <Player src={videoLink} poster={image.src} title={image.alt} /> : null}</div>
      </Modal>
      <div className="flex absolute inset-0 justify-center items-center pointer-events-none">
        <button onClick={() => setOpen(true)} className="pointer-events-auto w-16 h-16 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors" aria-label="Play video">
          <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function VideoFeatures({ features, className }: { features: VideoFeature[]; className?: string }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  const n = features.length
  return (
    <div className={cn(className, 'grid relative items-start grid-cols-1 md:grid-cols-2 gap-14 md:gap-6', (n <= 2 || n === 4) && 'lg:grid-cols-2 lg:gap-14', (n === 3 || n > 4) && 'lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14')}>
      {features.map((f, i) => (
        <div key={i}>
          <div className={cn(styles.feature, f.videoLink ? undefined : (f.aspectClassName ?? 'aspect-[4/3]'))}>
            {f.videoLink ? <VideoThumb image={f.image} videoLink={f.videoLink} /> : <Image className="object-cover w-full h-full rounded-lg" src={f.image.src} alt={f.image.alt} width={480} height={360} sizes="(max-width: 767px) 80vw,  480px" />}
          </div>
          <p className={cn('relative mt-8 text-2xl lg:mt-12 font-aeonik', dark ? 'text-white' : 'text-black')}>{f.title}</p>
          <p className={cn('relative mt-3 text-base', dark ? 'text-white/70' : 'text-black/70')}>{f.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
