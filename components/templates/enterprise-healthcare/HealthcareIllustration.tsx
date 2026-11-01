'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './animatedText'

gsap.registerPlugin(ScrollTrigger)

/*
 * HealthcareLeadingSystemsIllustration, animation "gsap" (chunk 0sni47mcvnqwg.js module 892353), wrapped in
 * SgpStack's `w-full max-w-[685px]` media node. 736x691 stage scaled to the container width (offsetWidth / 736);
 * three layers float y 0 -> -6, yoyo, repeat -1, sine.inOut, duration = cssDuration / 2 (3.25 / 4.25 / 3.5s),
 * delay |cssDelay| (4 / 2.5 / 0s); tweens play on enter/enterBack and pause on leave/leaveBack
 * (Scale's useScrollTrigger defaults: "top 80%" -> "bottom 20%", retroactive).
 */

const ASSET = '/templates/enterprise-healthcare'
const layers = [
  { key: 'diagram', left: 10, top: 6, width: 719, height: 453.5, z: 30, duration: 6.5, delay: -4 },
  { key: 'dashboard', left: 6, top: 188, width: 723.5, height: 456, z: 20, duration: 8.5, delay: -2.5 },
  { key: 'avatars', left: 122, top: 402, width: 489.75, height: 282.75, z: 10, duration: 7, delay: 0 },
]

export default function HealthcareIllustration() {
  const box = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const items = useRef<HTMLDivElement[]>([])
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setScale(el.offsetWidth / 736)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || !stage.current) return
    const tweens = layers.map((l, i) =>
      gsap.to(items.current[i], { y: -6, duration: l.duration / 2, delay: Math.abs(l.delay), ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }),
    )
    const play = () => tweens.forEach((t) => t.play())
    const pause = () => tweens.forEach((t) => t.pause())
    const st = ScrollTrigger.create({
      trigger: stage.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
      onRefresh: (self) => {
        if (self.isActive) play()
      },
    })
    return () => {
      st.kill()
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={box} aria-hidden="true" className="relative w-full overflow-hidden" style={{ aspectRatio: '736 / 691' }}>
      <div ref={stage} className="absolute left-0 top-0 origin-top-left" style={{ width: 736, height: 691, transform: `scale(${scale})` }}>
        {layers.map((l, i) => (
          <div
            key={l.key}
            ref={(el) => {
              if (el) items.current[i] = el
            }}
            className="absolute"
            style={{ left: l.left, top: l.top, width: l.width, height: l.height, zIndex: l.z }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/layer-${l.key}.webp`} alt="" className="absolute inset-0 h-full w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
