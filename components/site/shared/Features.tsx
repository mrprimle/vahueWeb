'use client'

// Scale module 450359 (Features) with the bullet list 842862: image-on-top feature grid. `numbers` branch: /automotive keeps its own copy with the video thumb and modal; `showBackground`, `grayscale` and `cta` are not ported, no page using this needs them yet.
import Image from 'next/image'
import { cn } from '../lib/cn'
import { useThemeStore } from '../lib/themeStore'

export type FeatureItem = { overtitle?: string; title: string; subtitle?: string; image: { src: string; alt: string }; bullets?: string[] }

const FEATURE = 'rounded-xl relative overflow-hidden after:pointer-events-none after:select-none after:content-[""] after:border after:border-[#fff3] after:rounded-xl after:absolute after:inset-0'

export function Features({ features, className }: { features: FeatureItem[]; className?: string }) {
  const dark = useThemeStore((s) => s.pageTheme) === 'dark'
  const n = features.length
  return (
    <div
      className={cn(
        className,
        'grid relative items-start grid-cols-1 md:grid-cols-2 gap-14 md:gap-6',
        (n <= 2 || n === 4) && 'lg:grid-cols-2 lg:gap-14',
        (n === 3 || n > 4) && 'lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14',
      )}
    >
      {features.map((f, i) => (
        <div key={i}>
          <div className={cn(FEATURE, 'aspect-[4/3]')}>
            <Image className="object-cover w-full h-full rounded-lg" src={f.image.src} alt={f.image.alt} width={480} height={360} sizes="(max-width: 767px) 80vw,  480px" />
          </div>
          <p className={`relative mt-8 text-2xl lg:mt-12 font-aeonik ${dark ? 'text-white' : 'text-black'}`}>
            {f.overtitle ? <span className="block text-sm font-medium text-[#D1AAD7]">{f.overtitle}</span> : null}
            {f.title}
          </p>
          <p className={`relative mt-3 text-base ${dark ? 'text-white/70' : 'text-black/70'}`}>{f.subtitle}</p>
          {f.bullets?.length ? (
            <ul className="mt-8 space-y-4">
              {f.bullets.map((text) => (
                <li key={text} className="flex items-start text-lg">
                  <picture className={`relative translate-y-0.5 w-[18px] h-[18px] rounded-full justify-center flex items-center shrink-0 ${dark ? 'bg-white/[0.09] border border-white/10' : 'bg-black/[0.09] border border-black/10'}`}>
                    <Image src="/site/features-check.svg" alt="" width={10} height={8} sizes="10px" />
                  </picture>
                  <p className={`flex-1 text-base leading-6 translate-x-3 ${dark ? 'text-white/70' : 'text-black/70'}`}>{text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}
