'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/components/scale-clone/enterprise-healthcare/animatedText'

gsap.registerPlugin(ScrollTrigger)

/*
 * Vahue stand-in for the clone's HealthcareIllustration (three floating screenshot layers): the same 736x691
 * stage scaled to the container width, with three mock windows from the control layer (review queue, audit
 * log, approval) instead of Scale's images. Motion is the clone's: each layer floats y 0 -> -6, yoyo,
 * repeat -1, sine.inOut, durations 3.25 / 4.25 / 3.5s, delays 4 / 2.5 / 0s; tweens play on enter/enterBack
 * and pause on leave/leaveBack ("top 80%" -> "bottom 20%"). Reduced motion: static.
 */

const MONO = 'font-mono text-[11px] uppercase tracking-[0.06em] text-white/45'

function Window({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0b0b0b]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-display text-[15px] text-white">{title}</span>
        <span className={MONO}>{meta}</span>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

const queue = [
  { item: 'Referral letter', field: 'Letter date' },
  { item: 'Lab report', field: 'Units' },
  { item: 'Study summary', field: 'Open question' },
]
const log = [
  { t: '09:12', who: 'Agent', what: 'Read referral letter, 6 fields' },
  { t: '09:12', who: 'Agent', what: 'Sent 1 field to review' },
  { t: '09:20', who: 'Reviewer', what: 'Corrected letter date' },
  { t: '09:21', who: 'Agent', what: 'Posted record to EHR' },
]

const layers: { key: string; left: number; top: number; width: number; height: number; z: number; duration: number; delay: number; node: ReactNode }[] = [
  {
    key: 'queue',
    left: 24,
    top: 16,
    width: 470,
    height: 268,
    z: 30,
    duration: 6.5,
    delay: -4,
    node: (
      <Window title="Review queue" meta="Below threshold">
        {queue.map((q) => (
          <div key={q.item} className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 last:border-b-0">
            <div>
              <p className="font-display text-[14px] text-white">{q.item}</p>
              <p className="font-display text-[12px] text-white/50">{q.field}</p>
            </div>
            <span className="rounded border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.04em] text-white/70">Review</span>
          </div>
        ))}
      </Window>
    ),
  },
  {
    key: 'log',
    left: 236,
    top: 232,
    width: 480,
    height: 262,
    z: 20,
    duration: 8.5,
    delay: -2.5,
    node: (
      <Window title="Audit log" meta="Every action">
        {log.map((l, i) => (
          <div key={i} className="grid grid-cols-[52px_84px_1fr] items-center border-b border-white/10 px-5 py-3 last:border-b-0">
            <span className="font-mono text-[11px] text-white/45">{l.t}</span>
            <span className="font-display text-[12px] text-white/60">{l.who}</span>
            <span className="truncate font-display text-[13px] text-white">{l.what}</span>
          </div>
        ))}
      </Window>
    ),
  },
  {
    key: 'approve',
    left: 72,
    top: 466,
    width: 400,
    height: 200,
    z: 10,
    duration: 7,
    delay: 0,
    node: (
      <Window title="Approval" meta="Role: clinical ops">
        <div className="flex flex-1 flex-col justify-between px-5 py-4">
          <p className="font-display text-[14px] text-white/80">Post today’s checked records to the EHR?</p>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white px-3 py-1.5 font-display text-[13px] font-medium text-black">Approve</span>
            <span className="rounded-md border border-white/20 px-3 py-1.5 font-display text-[13px] text-white/80">Dry run first</span>
          </div>
        </div>
      </Window>
    ),
  },
]

export default function ControlIllustration() {
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
            {l.node}
          </div>
        ))}
      </div>
    </div>
  )
}
