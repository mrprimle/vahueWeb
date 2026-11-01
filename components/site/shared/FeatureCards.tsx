'use client'

// Scale module 15518 (FeatureCards). Scale builds the colour classes with a template string; they are written out here so Tailwind sees them.
import Image from 'next/image'
import { useThemeStore } from '../lib/themeStore'

export type FeatureCardItem = { title: string; description: string; image?: string }
type Variant = 'default' | 'borderless'

function Card({ item, imageHeight, variant }: { item: FeatureCardItem; imageHeight: string; variant: Variant }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  if (variant === 'borderless') {
    return (
      <div className="flex flex-col gap-8">
        {item.image ? <Image src={item.image} alt={item.title} width={576} height={320} className="w-full h-[320px] object-cover rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]" /> : null}
        <div className="flex flex-col gap-2">
          <h3 className={`text-2xl ${dark ? 'text-white' : 'text-black'} font-aeonik`}>{item.title}</h3>
          <p className={`text-base ${dark ? 'text-white/70' : 'text-black/70'}`}>{item.description}</p>
        </div>
      </div>
    )
  }
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border ${dark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} h-full`}>
      {item.image ? (
        <div className="p-4 pb-0">
          <Image src={item.image} alt={item.title} width={600} height={300} className={`${imageHeight} w-full rounded-xl object-cover`} />
        </div>
      ) : null}
      <div className="p-6">
        <h4 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-black'}`}>{item.title}</h4>
        <p className={`mt-2 text-sm ${dark ? 'text-white/70' : 'text-black/70'} leading-relaxed`}>{item.description}</p>
      </div>
    </div>
  )
}

function TallCard({ item }: { item: FeatureCardItem }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border ${dark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.03]'} h-full`}>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
      </div>
      {item.image ? (
        <div className="flex items-center justify-center flex-1 p-4 pt-0">
          <Image src={item.image} alt={item.title} width={600} height={260} className="w-full max-h-[260px] rounded-xl object-cover" />
        </div>
      ) : null}
    </div>
  )
}

const COLUMNS = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'md:grid-cols-2 lg:grid-cols-4' }

export function FeatureCards({
  items,
  columns = '3',
  imageHeight = 'h-[140px]',
  className,
  variant = 'default',
}: {
  items: FeatureCardItem[]
  columns?: '2' | '3' | '4'
  imageHeight?: string
  className?: string
  variant?: Variant
}) {
  if (items.length === 5 && columns === '3' && variant === 'default') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className ?? ''}`}>
        <div className="flex flex-col h-full gap-6">
          <div className="flex-1">
            <Card item={items[0]} imageHeight={imageHeight} variant={variant} />
          </div>
          <div className="flex-1">
            <Card item={items[1]} imageHeight={imageHeight} variant={variant} />
          </div>
        </div>
        <TallCard item={items[2]} />
        <div className="flex flex-col h-full gap-6">
          <div className="flex-1">
            <Card item={items[3]} imageHeight={imageHeight} variant={variant} />
          </div>
          <div className="flex-1">
            <Card item={items[4]} imageHeight={imageHeight} variant={variant} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-1 ${variant === 'borderless' ? 'gap-16' : 'gap-6'} ${COLUMNS[columns]} ${className ?? ''}`}>
      {items.map((item) => (
        <Card key={item.title} item={item} imageHeight={imageHeight} variant={variant} />
      ))}
    </div>
  )
}
