'use client'

// Scale module 460138. `bgImage` and the bullet list (842862) are not ported: no page using this needs them yet.
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { useThemeStore } from '../lib/themeStore'

export type Feature = { iconNode?: ReactNode; title: string; subtitle: string }

export function FeaturesWithIcons({
  features = [],
  featuresIconColor,
  className,
  columns,
  alignCenter = false,
  iconSide = false,
  iconsOnTop = false,
}: {
  features?: Feature[]
  featuresIconColor?: string
  className?: string
  columns?: '2' | '3' | '4'
  alignCenter?: boolean
  iconSide?: boolean
  iconsOnTop?: boolean
}) {
  const light = useThemeStore((s) => s.pageTheme) === 'light'
  const color = light ? 'black' : featuresIconColor
  return (
    <div
      className={cn(
        className,
        columns === '2' ? 'grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-12' : '!flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6',
        columns === '4' && 'xl:gap-x-12',
        columns !== '2' && columns !== '4' && 'xl:gap-x-14',
        alignCenter && 'justify-center',
      )}
    >
      {features.map((f, i) => (
        <div
          key={i}
          className={cn(
            columns === '4' && 'flex-grow flex-shrink-0 basis-full md:max-w-[368px] lg:basis-1/5',
            (!columns || (columns !== '4' && columns !== '2')) && 'flex-grow flex-shrink-0 basis-full md:max-w-[368px] lg:basis-1/4',
            iconSide && 'flex flex-row items-start gap-4',
            iconsOnTop && 'flex flex-col md:flex-row items-start gap-5',
            light && 'text-black',
          )}
        >
          {f.iconNode ? (
            <div className={cn((iconSide || iconsOnTop) && 'shrink-0')}>
              <figure
                className={cn(
                  'relative flex items-center justify-center rounded-lg select-none w-11 h-11',
                  color !== 'red' && color !== 'black' && 'bg-white/[0.09] border border-white/10 text-white',
                  color === 'red' && 'bg-[#EF3D57]/[0.09] border border-[#EF3D57]/10 text-[#EF3D57]',
                  color === 'black' && 'bg-black/[0.09] border border-black/10 text-black',
                )}
              >
                <span className="w-6 h-6 flex items-center justify-center">{f.iconNode}</span>
              </figure>
            </div>
          ) : null}
          <div>
            <h4 className={cn('relative text-2xl font-aeonik whitespace-pre-line', iconSide || iconsOnTop ? 'mt-0' : 'mt-6')}>{f.title}</h4>
            <p className={cn('relative mt-4', light ? 'text-[#525252]' : 'text-white/70')}>{f.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
