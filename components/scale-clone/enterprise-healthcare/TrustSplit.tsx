'use client'

import { useRef } from 'react'
import { useRevealText } from './useRevealText'
import s from './healthcare.module.css'

/*
 * scale.com TextImageSplit (chunk 0sni47mcvnqwg.js), bg-gray-50, imagePosition "right", imageTreatment "muted"
 * ([&_img]:grayscale [&_img]:opacity-35), 8 certification badges in a 4-column grid (gap 16 / 12 mobile),
 * width clamp(320px, 38vw, 580px), each cell aspect-square with p-[12%].
 * Headline + subtitle = HeadlineWithCta (AnimatedText, IntersectionObserver -15%, delays 0.5 / 1).
 */

export default function TrustSplit({ headline, body, badges }: { headline: string; body: string; badges: { alt: string; src?: string }[] }) {
  const h = useRef<HTMLHeadingElement>(null)
  const p = useRef<HTMLDivElement>(null)
  useRevealText(h)
  useRevealText(p, { delay: 1 })

  return (
    <section className="TextImageSplit bg-[#f9fafb] py-20 text-black">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          <div className="flex flex-1 flex-col items-start gap-6 py-6">
            <h3 ref={h} className={`${s.header2} ${s.pending} w-full text-left font-display font-normal text-black`}>
              {headline}
            </h3>
            <div ref={p} className={`${s.splitBody} ${s.pending} w-full text-left font-display text-black`} style={{ textWrap: 'pretty' }}>
              {body}
            </div>
          </div>
          <div className="relative w-full shrink-0 md:w-[clamp(320px,38vw,580px)]">
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {badges.map((b) => (
                <div key={b.alt} className="relative aspect-square p-[12%]">
                  {b.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.src} alt={b.alt} className="relative h-full w-full object-contain opacity-35 grayscale" />
                  ) : (
                    // third-party certification mark not shipped: neutral tile in the same cell
                    <div role="img" aria-label={b.alt} className="relative h-full w-full rounded-full border-[3px] border-[#929292] bg-[#929292]/40 opacity-35" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
