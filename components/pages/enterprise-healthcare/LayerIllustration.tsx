'use client'

// Scale module 892353, `animation: "gsap"` as this page passes it. Layer positions are Scale's. The module's CSS branch is not used by this page.
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'

const GEOMETRY = [
  { key: 'diagram', left: 10, top: 6, width: 719, height: 453.5, z: 30, duration: 6.5, delay: 4 },
  { key: 'dashboard', left: 6, top: 188, width: 723.5, height: 456, z: 20, duration: 8.5, delay: 2.5 },
  { key: 'avatars', left: 122, top: 402, width: 489.75, height: 282.75, z: 10, duration: 7, delay: 0 },
]

export function LayerIllustration({ layers }: { layers: { key: string; src: string }[] }) {
  const box = useRef<HTMLDivElement>(null)
  const scaled = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLDivElement | null)[]>([])
  const tweens = useRef<gsap.core.Tween[]>([])
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / 736)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tweens.current = []
      return
    }
    tweens.current = GEOMETRY.map((g, i) => {
      const el = items.current[i]
      return el ? gsap.to(el, { y: -6, duration: g.duration / 2, delay: g.delay, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }) : null
    }).filter((t): t is gsap.core.Tween => !!t)
    return () => {
      tweens.current.forEach((t) => t.kill())
      tweens.current = []
    }
  }, [])
  const play = () => tweens.current.forEach((t) => t.play())
  const pause = () => tweens.current.forEach((t) => t.pause())
  useInViewTrigger(scaled, { onEnter: play, onEnterBack: play, onLeave: pause, onLeaveBack: pause, retroactiveOnEnter: true })
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ aspectRatio: '736 / 691' }} aria-hidden="true">
      <div ref={scaled} className="HealthcareLeadingSystemsIllustration absolute left-0 top-0 origin-top-left" style={{ width: 736, height: 691, transform: `scale(${scale})` }}>
        {GEOMETRY.map((g, i) => (
          <div
            key={g.key}
            ref={(el) => {
              items.current[i] = el
            }}
            className="absolute"
            style={{ left: g.left, top: g.top, width: g.width, height: g.height, zIndex: g.z }}
          >
            <Image src={layers.find((l) => l.key === g.key)?.src ?? ''} alt="" fill unoptimized className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
