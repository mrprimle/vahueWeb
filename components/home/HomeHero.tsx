'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const services = [
  {
    tag: 'For clinics & appointment businesses',
    name: 'Practice Front Office System',
    line: 'Every enquiry answered in minutes, day and night, and booked straight into your calendar.',
    href: '#how-it-works',
  },
  {
    tag: 'For product teams',
    name: 'Embedded AI Engineers',
    line: 'Senior AI engineers inside your team within two weeks, shipping to a quality bar you set.',
    href: '/ai-native-engineering/',
  },
]

/** Slow field of thin wave lines drawn on a canvas. Pauses off-screen; static under reduced motion. */
function WaveField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const lines = 34
      for (let i = 0; i < lines; i++) {
        const k = i / (lines - 1)
        const baseY = h * (0.18 + k * 0.78)
        const amp = 18 + 46 * Math.sin(k * Math.PI)
        const accent = i === 21
        ctx.beginPath()
        for (let x = 0; x <= w; x += 8) {
          const u = x / w
          const y =
            baseY +
            Math.sin(u * 3.2 + t * 0.00018 + k * 2.4) * amp +
            Math.sin(u * 7.1 - t * 0.00011 + k * 5.0) * amp * 0.25
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = accent ? 'rgba(187,222,242,0.55)' : `rgba(255,255,255,${0.035 + 0.07 * Math.sin(k * Math.PI)})`
        ctx.lineWidth = accent ? 1.2 : 1
        ctx.stroke()
      }
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (t - last < 33) return // ~30fps
      last = t
      draw(t)
    }

    resize()
    draw(0)
    window.addEventListener('resize', resize)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)
    if (!still) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}

export default function HomeHero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const rise = (delay: number) => ({
    className: `transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`,
    style: { transitionDelay: `${delay}ms` },
  })

  return (
    <section className="relative isolate overflow-hidden bg-[#08090b] text-white -mt-px">
      <WaveField />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#08090b]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-wide flex-col justify-end px-6 pb-14 pt-24 md:px-8 md:pb-20">
        <h1
          {...rise(100)}
          className={`${rise(100).className} font-display font-light text-[2.75rem] leading-[1.02] tracking-[-0.02em] md:text-7xl xl:text-[88px] max-w-5xl text-balance`}
        >
          We build the AI systems your business runs on.
        </h1>
        <p {...rise(240)} className={`${rise(240).className} mt-6 max-w-2xl text-lg text-white/65 md:text-xl`}>
          From a clinic&apos;s front desk to a product team&apos;s roadmap, designed, shipped and run by senior engineers.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-[1fr_1fr_0.85fr] md:gap-5">
          {services.map((s, i) => (
            <div key={s.name} {...rise(380 + i * 120)}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.035] p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{s.tag}</span>
                <span className="mt-4 font-display text-2xl font-normal">{s.name}</span>
                <span className="mt-2 text-[15px] leading-relaxed text-white/60">{s.line}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
                  Learn more
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          ))}

          <div {...rise(620)}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[#BBDEF2]/25 p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#BBDEF2]/80">Latest result</span>
              <div className="mt-6">
                <p className="font-display text-6xl font-light tracking-[-0.03em]">
                  5 <span className="text-white/35">→</span> 1
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                  A London clinic replaced five separate vendors with one Vahue system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
