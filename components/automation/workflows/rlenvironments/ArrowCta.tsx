'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { gsap, reducedMotion } from './motion'
import { Chevron } from './icons'

export type ArrowCtaHandle = { prepare: () => void; play: (delay?: number) => gsap.core.Timeline | null }

type Phase = 'rest' | 'in' | 'out' | 'reset'

// scale.com FlatCta, variant "arrow", theme "white" with the "filledWhiteArrow" intro (copied from the rlenvironments clone).
// Hover: a current-colour sheet (35% opacity) sweeps in from the left and leaves to the
// right, 600ms ease-out; the chevron track slides one slot.
const ArrowCta = forwardRef<ArrowCtaHandle, { href: string; label: string }>(function ArrowCta(
  { href, label },
  ref,
) {
  const root = useRef<HTMLAnchorElement>(null)
  const counter = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('rest')
  const [hover, setHover] = useState(false)

  useImperativeHandle(ref, () => ({
    prepare() {
      if (reducedMotion()) return
      gsap.set(root.current, { autoAlpha: 0, borderRadius: 0, scaleX: 0, transformOrigin: 'left center' })
      gsap.set(counter.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(text.current, { opacity: 0 })
      gsap.set(arrow.current, { x: -6 })
    },
    play(delay = 0) {
      if (reducedMotion()) return null
      const r = 0.85
      const tl = gsap.timeline({ delay })
      tl.to(root.current, { autoAlpha: 1, borderRadius: 8, scaleX: 1, duration: r, ease: 'power2.out' }, 0)
      tl.to(counter.current, { scaleX: 1, duration: r, ease: 'power2.out' }, 0.1)
      tl.to(text.current, { opacity: 1 }, r - 0.1)
      tl.to(arrow.current, { x: 0, duration: r, ease: 'power3.inOut' }, 0)
      tl.add(() => {
        gsap.set([counter.current, text.current, arrow.current], { clearProps: 'all' })
        gsap.set(root.current, { clearProps: 'opacity,visibility,transform,transformOrigin,borderRadius' })
      })
      return tl
    },
  }))

  const sweep =
    phase === 'in' ? 'translate-x-0' : phase === 'out' ? 'translate-x-full' : '-translate-x-full'

  return (
    <a
      ref={root}
      href={href}
      onPointerEnter={() => {
        setPhase('in')
        setHover(true)
      }}
      onPointerLeave={() => {
        setPhase('out')
        setHover(false)
        window.setTimeout(() => setPhase((p) => (p === 'out' ? 'reset' : p)), 680)
      }}
      className="group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white text-black"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current opacity-35 ease-out motion-reduce:transition-none ${sweep} ${phase === 'reset' ? 'transition-none' : 'transition-transform'}`}
        style={{ transitionDuration: phase === 'reset' ? '0ms' : '600ms' }}
      />
      <div ref={counter} className="relative z-[1] inline-flex items-center justify-center py-1 pl-4 pr-1">
        <div className="relative z-[1] flex flex-1 flex-wrap items-center justify-center gap-4">
          <span ref={text} className="block self-center text-nowrap text-[14px] font-medium leading-[1.5]">
            {label}
          </span>
          <div
            ref={arrow}
            className="relative z-[1] box-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2 text-white"
          >
            <div
              aria-hidden
              className={`absolute inset-0 flex h-full w-[200%] transform-gpu transition-transform ease-out motion-reduce:!translate-x-0 motion-reduce:!transition-none ${hover ? 'translate-x-0' : '-translate-x-1/2'}`}
              style={{ transitionDuration: '600ms' }}
            >
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                <Chevron />
              </span>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center">
                <Chevron />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
})

export default ArrowCta
