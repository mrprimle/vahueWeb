import Image from 'next/image'
import type { LogoItem } from './types'

const CHECK = 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'

export function CheckIcon({ className }: { className: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z" />
      <path d={CHECK} />
    </svg>
  )
}

/** Scale's corner triangle. */
export function CornerIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-full w-full align-top" aria-hidden>
      <path d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z" fill="currentColor" />
    </svg>
  )
}

/** Scale module 1900, light theme, centred. */
export function SectionTitle({
  overtitle,
  title,
  subtitle,
  className,
}: {
  overtitle: string
  title: string
  subtitle?: string
  className: string
}) {
  return (
    <div className={`flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center ${className}`}>
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

/** A logo at its box, or the neutral tile at the same box. */
export function LogoBox({ logo, className, styleHeightAuto = false }: { logo: LogoItem; className: string; styleHeightAuto?: boolean }) {
  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        unoptimized
        className={className}
        style={{ width: logo.width, height: styleHeightAuto ? 'auto' : logo.height }}
      />
    )
  }
  return (
    <span
      className={`flex items-center justify-center rounded-sm border border-current text-[10px] opacity-60 ${logo.className ?? ''}`}
      style={{ width: logo.width, height: logo.height }}
    >
      Logo
    </span>
  )
}
