'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * scale.com ProvenModelImprovementsChart (chunk 197mu5y2fw9hi, module 77633), redrawn 1:1.
 * 580x360 viewBox on #080808, 12px radius, aspect-video. Three log curves (ceilings 0.4 / 0.65 / 0.9) draw in with
 * stroke-dashoffset over 1.6s cubic-bezier(0.4,0,0.2,1), delays 0 / 0.3 / 0.6s, once 25% of the chart is visible.
 * Each label fades in (0.5s ease) at delay + 1.6 - 0.15s.
 */

const SERIES = [
  { color: '#E05533', ceiling: 0.4, delay: 0, duration: 1.6 },
  { color: '#7B6FF0', ceiling: 0.65, delay: 0.3, duration: 1.6 },
  { color: '#52C041', ceiling: 0.9, delay: 0.6, duration: 1.6 },
]

const curve = (ceiling: number) => {
  const pts: string[] = []
  for (let i = 0; i <= 120; i++) {
    const r = i / 120
    const x = 56 + 366 * r
    const y = 312 - (Math.log(1 + 9 * r) / Math.log(10)) * ceiling * 284
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return pts.join(' ')
}

const FONT = '-apple-system, system-ui, sans-serif'

export default function ModelChart({ yAxis, xAxis, labels }: { yAxis: string; xAxis: string; labels: string[][] }) {
  const root = useRef<HTMLDivElement>(null)
  const paths = useRef<(SVGPathElement | null)[]>([])
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!shown) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    paths.current.forEach((p) => {
      if (!p) return
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = reduce ? '0' : `${len}`
    })
    if (reduce) return
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        paths.current.forEach((p, i) => {
          if (!p) return
          const s = SERIES[i]
          p.style.transition = `stroke-dashoffset ${s.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${s.delay}s`
          p.style.strokeDashoffset = '0'
        })
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [shown])

  return (
    <div ref={root} className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-[#080808]" role="img" aria-label={`${yAxis} by ${xAxis}`}>
      <svg viewBox="0 0 580 360" className="h-full w-full">
        <line x1={56} y1={24} x2={56} y2={312} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <polygon points="56,18 52,33 60,33" fill="rgba(255,255,255,0.7)" />
        <line x1={56} y1={312} x2={426} y2={312} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <polygon points="432,312 420,308 420,316" fill="rgba(255,255,255,0.7)" />
        {/* TODO: Vahue copy */}
        <text x={13} y={170} fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily={FONT} textAnchor="middle" transform="rotate(-90, 13, 170)">
          {yAxis}
        </text>
        <text x={239} y={354} fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily={FONT} textAnchor="middle">
          {xAxis}
        </text>
        {SERIES.map((s, i) => {
          const ly = 312 - 284 * s.ceiling
          return (
            <g key={i}>
              <path
                ref={(el) => {
                  paths.current[i] = el
                }}
                d={curve(s.ceiling)}
                stroke={s.color}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={shown ? undefined : { opacity: 0 }}
              />
              {(labels[i] ?? []).map((l, j) => (
                <text
                  key={j}
                  x={432}
                  y={ly + 16 * j + 4}
                  fill={s.color}
                  fontSize="13"
                  fontFamily={FONT}
                  style={{ opacity: shown ? 1 : 0, transition: `opacity 0.5s ease ${s.delay + s.duration - 0.15}s` }}
                >
                  {l}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
