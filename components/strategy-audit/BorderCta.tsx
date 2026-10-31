'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { gsap, reducedMotion } from './motion'

export type BorderCtaHandle = { prepare: () => void; play: (delay?: number) => gsap.core.Tween | null }

type Phase = 'rest' | 'in' | 'out' | 'reset'

// scale.com FlatCta, variant "border", theme "white", intro "fadeIn" (chunk 1h0nvyhf5gbrf.js):
//   intro: autoAlpha 0 -> 1, 0.85s power2.out (delay 0.5s, same call as the arrow CTA)
//   hover: a current-colour sheet (opacity 30%) rises from below (translate-y-full -> 0) and
//          leaves through the top (-translate-y-full), 300ms ease-out; label scales to 0.9 (300ms ease-out)
//   box:   1px white border, r6, px-4 py-2, label 14 / 1.5 medium
const BorderCta = forwardRef<BorderCtaHandle, { href: string; label: string }>(function BorderCta({ href, label }, ref) {
  const root = useRef<HTMLAnchorElement>(null)
  const [phase, setPhase] = useState<Phase>('rest')

  useImperativeHandle(ref, () => ({
    prepare() {
      if (reducedMotion()) return
      gsap.set(root.current, { autoAlpha: 0 })
    },
    play(delay = 0) {
      if (reducedMotion()) return null
      return gsap.to(root.current, {
        autoAlpha: 1,
        duration: 0.85,
        delay,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(root.current, { clearProps: 'opacity,visibility' })
        },
      })
    },
  }))

  const sweep = phase === 'in' ? 'translate-y-0' : phase === 'out' ? '-translate-y-full' : 'translate-y-full'

  return (
    <a
      ref={root}
      href={href}
      onPointerEnter={() => setPhase('in')}
      onPointerLeave={() => {
        setPhase('out')
        window.setTimeout(() => setPhase((p) => (p === 'out' ? 'reset' : p)), 360)
      }}
      className="group/cta relative inline-flex h-max w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white text-white"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 size-full rounded-[inherit] bg-current opacity-30 ease-out motion-reduce:transition-none ${sweep} ${phase === 'reset' ? 'transition-none' : 'transition-transform'}`}
        style={{ transitionDuration: phase === 'reset' ? '0ms' : '300ms' }}
      />
      <div className="relative z-[1] inline-flex items-center justify-center px-4 py-2">
        <span className="relative z-[1] block origin-center transform-gpu self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5] transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none motion-reduce:group-hover/cta:scale-100">
          {label}
        </span>
      </div>
    </a>
  )
})

export default BorderCta
