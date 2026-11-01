'use client'

import { useEffect, useRef, useState } from 'react'
import { logoSizes } from './content'
import s from './donovan.module.css'

/*
 * Customer logo strip under the hero (section !py-12).
 * Desktop (md+): one row, `container` (1280 at 1440) with px-8, justify-between, gap 32, min-h 52.
 * Mobile: react-fast-marquee (speed 50px/s, two copies of the track, ml-12 per item).
 * TODO: Vahue customer logos. Neutral tiles at Scale's logo sizes for now.
 */

const Tile = ({ w, h }: { w: number; h: number }) => (
  <span className="block rounded-[4px] bg-black/10" style={{ width: w, height: h }} aria-hidden="true" />
)

export default function LogoStrip() {
  const track = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(10)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDuration(Math.max(1, el.scrollWidth / 50))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="!py-12">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        <div className="hidden md:block">
          <ul className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-8 px-8 sm:min-h-[52px] md:gap-y-16">
            {logoSizes.map(([w, h], i) => (
              <li key={i} className="flex flex-col items-center justify-center gap-3">
                <Tile w={w} h={h} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <div className="flex w-full overflow-hidden" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
            {[0, 1].map((copy) => (
              <div key={copy} ref={copy === 0 ? track : undefined} className={s.marqueeTrack} aria-hidden={copy === 1}>
                {logoSizes.map(([w, h], i) => (
                  <div key={i} className="ml-12 flex shrink-0 flex-col items-center justify-center gap-3">
                    <Tile w={w} h={h} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
