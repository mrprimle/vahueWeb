// Scale module 1900 (SectionTitle), light theme, centred. Same markup as the copy in pages/data-engine/primitives.tsx.
import { cn } from '../lib/cn'

export function SectionTitle({ overtitle, title, subtitle, className }: { overtitle: string; title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center', className)}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono text-[#525252]">
            <span>{overtitle}</span>
          </div>
          <h2 className="font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance] text-black">{title}</h2>
        </div>
        {subtitle ? <p className="mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal w-full text-black/70">{subtitle}</p> : null}
      </div>
    </div>
  )
}
