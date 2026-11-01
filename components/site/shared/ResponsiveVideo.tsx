'use client'

// Scale module 310080: autoplay only while on screen.
import { useEffect, useRef } from 'react'
import { cn } from '../lib/cn'

export type VideoAsset = { url: string }

export function ResponsiveVideo({
  asset,
  loop,
  autoPlay,
  muted,
  controls,
  className,
  poster,
}: {
  asset: VideoAsset
  loop?: boolean
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  className?: string
  poster?: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const auto = !!autoPlay && !!muted
  useEffect(() => {
    if (!auto) return
    const v = video.current
    if (!v) return
    const check = () => {
      const r = v.getBoundingClientRect()
      if (r.bottom >= 0 && r.top <= window.innerHeight) v.play().catch(() => {})
      else v.pause()
    }
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
    window.addEventListener('pageshow', check)
    document.addEventListener('visibilitychange', check)
    window.addEventListener('focus', check)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    return () => {
      io.disconnect()
      window.removeEventListener('pageshow', check)
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('focus', check)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [asset.url, auto])
  if (!asset.url) return null
  return (
    <div className={cn('overflow-clip ResponsiveVideo', className)}>
      <video
        ref={video}
        src={asset.url}
        loop={loop ?? true}
        autoPlay={autoPlay}
        muted={muted ?? false}
        playsInline={auto || undefined}
        controls={controls}
        poster={poster}
        preload={auto ? 'metadata' : undefined}
        className="block object-cover w-full h-full min-h-full"
      />
    </div>
  )
}
