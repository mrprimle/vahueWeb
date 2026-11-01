'use client'

// Scale module 872447 (ChecklistWithMedia, in 3_bsw0kgw5l_w.js). The `mockup` image branch (720912) is not ported: no page using this needs it yet.
import Image from 'next/image'
import type { ReactNode } from 'react'
import { useThemeStore } from '../lib/themeStore'

export type ChecklistFeature = { title: string; description: string }
export type ChecklistImage = { src: string; alt: string; width: number; height: number }

export function ChecklistWithMedia({
  features,
  image,
  mediaPosition = 'right',
  title,
  overtitle,
  dividers = true,
  className,
  children,
}: {
  features: ChecklistFeature[]
  image: ChecklistImage
  mediaPosition?: 'left' | 'right'
  title?: string
  overtitle?: string
  dividers?: boolean
  className?: string
  children?: ReactNode
}) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  const list = (
    <div className="flex flex-col w-full gap-6 md:w-5/12">
      {overtitle ? <p className={`text-xs font-medium tracking-widest uppercase ${dark ? 'text-white/50' : 'text-black/50'}`}>{overtitle}</p> : null}
      {title ? <h3 className="text-3xl heading">{title}</h3> : null}
      {features.map((f, i) => (
        <div key={f.title}>
          <div className="flex flex-row items-start gap-4">
            <div className={`shrink-0 mt-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full ${dark ? 'bg-white/[0.09] border border-white/10' : 'bg-black/[0.09] border border-black/10'}`}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={`w-3 h-3 ${dark ? 'text-white/70' : 'text-black/70'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <p className={`font-medium ${dark ? 'text-white' : 'text-black'}`}>{f.title}</p>
              <p className={`text-sm ${dark ? 'text-white/70' : 'text-black/70'}`}>{f.description}</p>
            </div>
          </div>
          {dividers && i < features.length - 1 ? <hr className="mt-6 border-white/10" /> : null}
        </div>
      ))}
      {children ? <div>{children}</div> : null}
    </div>
  )
  const media = (
    <div className="flex justify-center w-full p-2 md:w-7/12">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="w-full h-auto" />
    </div>
  )
  return (
    <div className={`flex flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px] mx-auto ${className ?? ''}`}>
      {mediaPosition === 'left' ? (
        <>
          {media}
          {list}
        </>
      ) : (
        <>
          {list}
          {media}
        </>
      )}
    </div>
  )
}
