'use client'

// Scale module 497052 (in 0a0zz4e1l5m3e.js): text and image rows, side chosen per item. Scale's export has no name.
import Image from 'next/image'
import { cn } from '../lib/cn'
import { useThemeStore } from '../lib/themeStore'
import { BrowserFrame } from './BrowserFrame'

export type AlternatingRowImage = { src: string; alt: string; width: number; height: number; mockup?: boolean; mockupUrl?: string; plain?: boolean }
export type AlternatingRow = { title: string; description: string; textSide: 'left' | 'right'; image: AlternatingRowImage }

export function AlternatingImageRows({ items = [], className, headingLevel: Heading = 'h4' }: { items?: AlternatingRow[]; className?: string; headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  return (
    <div className={cn('space-y-14 md:space-y-24', className)}>
      {items.map((item) => {
        const textRight = item.textSide === 'right'
        const text = (
          <div className="max-w-[440px] space-y-5">
            <Heading className="text-2xl font-semibold leading-tight md:text-3xl">{item.title}</Heading>
            <p className={cn('text-base leading-relaxed', dark ? 'text-white/70' : 'text-black/70')}>{item.description}</p>
          </div>
        )
        const { src, alt, width, height } = item.image
        const framed = <Image src={src} alt={alt} width={width} height={height} className="object-cover w-full h-auto rounded-xl" />
        const media = item.image.plain ? (
          <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
        ) : item.image.mockup ? (
          <BrowserFrame url={item.image.mockupUrl}>{framed}</BrowserFrame>
        ) : (
          <div className={cn('w-full overflow-hidden rounded-2xl border p-2', dark ? 'border-white/10 bg-[#0b0b0b]' : 'border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]')}>{framed}</div>
        )
        return (
          <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16" key={item.title}>
            {textRight ? media : text}
            {textRight ? text : media}
          </article>
        )
      })}
    </div>
  )
}
