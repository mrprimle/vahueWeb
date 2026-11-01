'use client'

import { useEffect, useRef, useState } from 'react'
import s from './styles.module.css'

/*
 * Template LogoStrip (section !py-12, 5 marks). Vahue ships no customer logos, so the row lists the systems the
 * workflow runs inside as plain wordmarks, black like Scale's brightness-0 logos.
 * Desktop (md+): one row, max-w 1280 with px-8, justify-between, gap 32, min-h 52.
 * Mobile: marquee at 50px/s, two copies of the track, ml-12 per item. Items keep the 63px height of Scale's tallest mark.
 */

const Name = ({ name }: { name: string }) => (
  <span className="block whitespace-nowrap font-display text-[20px] font-medium leading-[1.4] tracking-[-0.02em] text-black/80">
    {name}
  </span>
)

export default function IntegrationStrip({ tools }: { tools: string[] }) {
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

  if (!tools.length) return null

  return (
    <section className="!py-12">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        <h2 className="sr-only">Integrations</h2>
        <div className="hidden md:block">
          <ul
            aria-label="Integrations"
            className={`mx-auto flex w-full max-w-[1280px] items-center gap-8 px-8 sm:min-h-[52px] md:gap-y-16 ${
              tools.length > 3 ? 'justify-between' : 'justify-around'
            }`}
          >
            {tools.map((t) => (
              <li key={t} className="flex min-h-[63px] flex-col items-center justify-center gap-3">
                <Name name={t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <div className="flex w-full overflow-hidden" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
            {[0, 1].map((copy) => (
              <div key={copy} ref={copy === 0 ? track : undefined} className={s.marqueeTrack} aria-hidden={copy === 1}>
                {tools.map((t) => (
                  <div key={t} className="ml-12 flex min-h-[63px] shrink-0 flex-col items-center justify-center gap-3">
                    <Name name={t} />
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
