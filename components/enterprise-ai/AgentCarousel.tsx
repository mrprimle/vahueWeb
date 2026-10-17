'use client'

import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import Reveal from '@/components/motion/Reveal'
import { horizontal, technical, vertical, type Agent } from './Agents'

const agents: { group: string; agent: Agent }[] = [
  ...technical.map((agent) => ({ group: 'Technical', agent })),
  ...horizontal.map((agent) => ({ group: 'Horizontal', agent })),
  ...vertical.map((agent) => ({ group: 'Vertical', agent })),
]

// Slides tilt away from the centre as they scroll past (rotateY up to 18deg in a
// 900px perspective) and fade slightly, so the track reads as a shallow arc.
const MAX_TILT = 18

export default function AgentCarousel() {
  const [viewport, embla] = useEmblaCarousel({ loop: true, align: 'center', dragFree: false, dragThreshold: 10 })
  const slides = useRef<HTMLDivElement[]>([])

  const tilt = useCallback((api: EmblaCarouselType) => {
    const progress = api.scrollProgress()
    const snaps = api.scrollSnapList()
    const engine = api.internalEngine()
    snaps.forEach((snap, i) => {
      let diff = snap - progress
      // Loop clones: measure distance to the nearest copy of the slide
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((lp) => {
          if (lp.index === i && lp.target() !== 0) diff = snap - (progress + Math.sign(lp.target()))
        })
      }
      const el = slides.current[i]
      if (!el) return
      const d = Math.max(-1, Math.min(1, diff * snaps.length * 0.5))
      el.style.transform = `rotateY(${(-d * MAX_TILT).toFixed(2)}deg) translateZ(${(-Math.abs(d) * 60).toFixed(1)}px)`
      el.style.opacity = String(1 - Math.abs(d) * 0.45)
    })
  }, [])

  useEffect(() => {
    if (!embla) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    tilt(embla)
    embla.on('scroll', tilt).on('reInit', tilt)
    return () => {
      embla.off('scroll', tilt).off('reInit', tilt)
    }
  }, [embla, tilt])

  return (
    <section className="overflow-hidden py-24 max-md:py-12">
      <div className="mx-auto max-w-shell px-6">
        <div className="grid grid-cols-12 gap-2 pb-12 max-md:pb-8">
          <p className="col-span-12 font-mono text-[11px] uppercase tracking-[0.05em] text-white/55 md:col-span-3">
            Agents in the hub
          </p>
          <Reveal as="h2" className="col-span-12 font-display text-section font-light text-white md:col-span-9">
            Pre-configured agents, tuned to your systems.
          </Reveal>
        </div>
      </div>

      <div ref={viewport} className="cursor-grab [perspective:900px] active:cursor-grabbing">
        <div className="flex touch-pan-y [transform-style:preserve-3d]">
          {agents.map(({ group, agent }, i) => (
            <div key={agent.key} className="min-w-0 shrink-0 grow-0 basis-[min(440px,82vw)] px-1">
              <div
                ref={(el) => {
                  if (el) slides.current[i] = el
                }}
                className="flex h-[440px] flex-col justify-between rounded-3xl border border-border-soft bg-surface p-8 will-change-transform max-md:h-[400px] max-md:p-6"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/45">{group}</p>
                  <h3 className="mt-6 text-card font-medium text-white">{agent.name}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-normal text-white/70">{agent.description}</p>
                </div>
                <dl className="grid grid-cols-2 gap-2 border-t border-border-soft pt-6">
                  {agent.benefits.slice(0, 2).map((b) => (
                    <div key={b.label}>
                      <dt className="font-display text-[1.75rem] font-light leading-none text-white">{b.metric}</dt>
                      <dd className="mt-2 text-xs leading-snug text-white/55">{b.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
