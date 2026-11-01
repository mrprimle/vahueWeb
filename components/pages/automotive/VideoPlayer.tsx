'use client'

// Scale module 638474, loaded through 832862 with ssr off: Vidstack player with its default video layout.
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react'
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import type { CSSProperties } from 'react'
import { cn } from '@/components/site/lib/cn'

export default function VideoPlayer({ src, poster, title = '', autoPlay = false, className }: { src: string; poster: string; title?: string; autoPlay?: boolean; className?: string }) {
  return (
    <MediaPlayer title={title} src={src} poster={poster} autoPlay={autoPlay} load={autoPlay ? 'eager' : 'play'} posterLoad="eager" playsInline aspectRatio="16/9" style={{ '--media-brand': '#79648C' } as CSSProperties} className={cn('overflow-hidden rounded-2xl', className)}>
      <MediaProvider>
        <Poster className="vds-poster" src={poster} alt={title} />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  )
}
