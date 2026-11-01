'use client'

// Scale module 553471: WebM with alpha, or HEVC on Safari. Fades in on first data, plays only while on screen.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '../lib/cn'

export type TransparentVideoAsset = { mov?: string; webm?: string; poster?: string; aspectRatio?: string; name?: string }
export type TransparentVideoHandle = { play: () => void; pause: () => void; reset: () => void }

export const TransparentVideo = forwardRef<TransparentVideoHandle, { video: TransparentVideoAsset; className?: string }>(function TransparentVideo({ video, className }, ref) {
  const el = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { mov, webm, poster, aspectRatio = '1 / 1', name } = video
  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        el.current?.play().catch(() => {})
      },
      pause: () => {
        el.current?.pause()
      },
      reset: () => {
        if (el.current) el.current.currentTime = 0
      },
    }),
    [],
  )
  useEffect(() => {
    const v = el.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target !== v) continue
          if (e.isIntersecting) v.play().catch(() => {})
          else v.pause()
        }
      },
      { threshold: 0 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [mov, webm])
  useEffect(() => {
    const v = el.current
    if (!v || !mov || !webm) return
    setLoaded(false)
    v.src = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? mov : webm
    v.load()
  }, [mov, webm])
  if (!mov && !webm) return null
  return (
    <div style={{ aspectRatio }} className={cn('TransparentVideo w-full transition-opacity duration-700 ease-out', loaded ? 'opacity-100' : 'opacity-0', className)}>
      <video ref={el} className="block h-full w-full object-contain" poster={poster} playsInline muted loop preload="metadata" aria-label={name || 'Video'} onLoadedData={() => setLoaded(true)} onCanPlay={() => setLoaded(true)} />
    </div>
  )
})
TransparentVideo.displayName = 'TransparentVideo'
