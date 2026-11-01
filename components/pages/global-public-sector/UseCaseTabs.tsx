'use client'

// Scale module 623453 (UseCaseTabs): marker pill above sm, dots below it, 180ms fade while a case swaps.
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { cn } from '@/components/site/lib/cn'
import styles from '@/components/site/shared/TabsWithImages.module.css'
import type { GlobalPublicSectorContent } from './types'

export function UseCaseTabs({ content }: { content: GlobalPublicSectorContent['useCases'] }) {
  const { overtitle, challengeLabel, outcomesLabel, cases } = content
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tabs = useRef<HTMLDivElement>(null)
  const marker = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const item = cases[active]
  useLayoutEffect(() => {
    tabs.current?.style.setProperty('--marker-color', '0, 0, 0')
  }, [])
  useLayoutEffect(() => {
    const b = buttons.current[0]
    if (b && marker.current) gsap.set(marker.current, { left: b.offsetLeft, width: b.offsetWidth, height: b.offsetHeight })
  }, [])
  useEffect(() => {
    const b = buttons.current[active]
    if (b && marker.current) gsap.to(marker.current, { left: b.offsetLeft, width: b.offsetWidth, height: b.offsetHeight, duration: 0.2, ease: 'power2.inOut' })
  }, [active])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  const select = (i: number) => {
    if (i === active) return
    if (timer.current !== null) clearTimeout(timer.current)
    setFading(true)
    timer.current = setTimeout(() => {
      setActive(i)
      setFading(false)
      timer.current = null
    }, 180)
  }
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(113,77,255,0.08) 0%, transparent 70%)' }} />
      <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6 relative z-10">
        <div className="flex flex-col items-center gap-5 mb-12">
          <p className="detail-mono text-scale-gray-60">{overtitle}</p>
          <div className="hidden px-8 mx-auto overflow-x-auto sm:block w-fit sm:overflow-x-visible no-scrollbar">
            <div ref={tabs} className={cn(styles.tabs, 'relative')}>
              <div ref={marker} className="absolute border rounded-full bg-black/10 border-black/10" />
              {cases.map((c, i) => (
                <button
                  key={c.tab}
                  ref={(el) => {
                    buttons.current[i] = el
                  }}
                  onClick={() => select(i)}
                  type="button"
                  className={cn(
                    'relative cursor-pointer rounded-full px-4 py-2 detail-regular transition-colors duration-200 focus:outline-none whitespace-nowrap',
                    i !== cases.length - 1 && 'after:absolute after:right-0 after:top-1/2 after:inline-block after:h-1/2 after:w-px after:-translate-y-1/2 after:bg-black/20 after:transition-transform after:duration-100',
                    (active - 1 === i || active === i) && 'after:scale-y-0',
                    active === i ? 'text-black' : 'text-black/50',
                  )}
                >
                  {c.tab}
                </button>
              ))}
            </div>
          </div>
          {cases.length > 1 ? (
            <div className="flex sm:hidden items-center gap-1.5 mt-1">
              {cases.map((c, i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => select(i)}
                  type="button"
                  aria-label={c.tab}
                  className={cn('h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out', active === i ? 'bg-black w-5' : 'bg-black/30 w-1.5')}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl overflow-hidden border border-scale-gray-80 bg-scale-gray-95 grid grid-cols-1 lg:grid-cols-2" style={{ opacity: fading ? 0 : 1, transition: 'opacity 180ms ease' }}>
          <div className="relative min-h-[300px] lg:min-h-[560px] bg-scale-gray-95">
            <Image key={item.image.src} alt={item.image.alt} src={item.image.src} fill quality={85} sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6 lg:p-10 grayscale" />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <div className="flex flex-col gap-3">
              <span className="detail-mono text-scale-gray-60 tabular-nums">
                {String(active + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
              </span>
              <h3 className="header2 text-scale-gray-10 text-balance">{item.title}</h3>
              <p className="body2-regular text-scale-gray-30 pt-1">{item.subtitle}</p>
            </div>
            {item.stats.length > 0 ? (
              <div className="grid gap-px overflow-hidden rounded-xl bg-scale-gray-80" style={{ gridTemplateColumns: `repeat(${item.stats.length}, 1fr)` }}>
                {item.stats.map((s) => (
                  <div key={s.value} className="flex flex-col gap-1 px-4 py-4 bg-scale-gray-90">
                    <span className="header3-regular text-scale-gray-10 leading-none">{s.value}</span>
                    <span className="detail-regular text-scale-gray-30">{s.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="border-t border-scale-gray-80 pt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="detail-mono text-scale-gray-60">{challengeLabel}</p>
                <p className="body2-regular text-scale-gray-30">{item.challenge}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="detail-mono text-scale-gray-60">{outcomesLabel}</p>
                <ul className="flex flex-col gap-2">
                  {item.outcomes.map((o) => (
                    <li key={o.text} className="flex items-start gap-2.5 body2-regular text-scale-gray-30">
                      <svg className="mt-[3px] shrink-0 text-scale-gray-30" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {o.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
