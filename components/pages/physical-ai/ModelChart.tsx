'use client'

// Scale module 77633 (ProvenModelImprovementsChart).
import { useEffect, useRef, useState } from 'react'
import type { ChartSeries } from './types'

const FONT = '-apple-system, system-ui, sans-serif'

function curve(ceiling: number) {
  const points: string[] = []
  for (let i = 0; i <= 120; i++) {
    const t = i / 120
    const x = 56 + 366 * t
    const y = 312 - (Math.log(1 + 9 * t) / Math.log(10)) * ceiling * 284
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return points.join(' ')
}

export function ModelChart({ ariaLabel, yLabel, xLabel, series }: { ariaLabel: string; yLabel: string; xLabel: string; series: ChartSeries[] }) {
  const root = useRef<HTMLDivElement>(null)
  const paths = useRef<(SVGPathElement | null)[]>([])
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!inView) return
    paths.current.forEach((path) => {
      if (!path) return
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
    })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        paths.current.forEach((path, i) => {
          if (!path) return
          const s = series[i]
          path.style.transition = `stroke-dashoffset ${s.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${s.delay}s`
          path.style.strokeDashoffset = '0'
        })
      })
    })
  }, [inView, series])
  return (
    <div ref={root} className="w-full aspect-video bg-[#080808] rounded-xl flex items-center justify-center overflow-hidden" aria-label={ariaLabel}>
      <svg viewBox="0 0 580 360" className="w-full h-full">
        <line x1={56} y1={24} x2={56} y2={312} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <polygon points="56,18 52,33 60,33" fill="rgba(255,255,255,0.7)" />
        <line x1={56} y1={312} x2={426} y2={312} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <polygon points="432,312 420,308 420,316" fill="rgba(255,255,255,0.7)" />
        <text x={13} y={170} fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily={FONT} textAnchor="middle" transform="rotate(-90, 13, 170)">
          {yLabel}
        </text>
        <text x={239} y={354} fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily={FONT} textAnchor="middle">
          {xLabel}
        </text>
        {series.map((s, i) => {
          const labelY = 312 - 284 * s.ceiling
          const labelDelay = s.delay + s.duration - 0.15
          return (
            <g key={s.id}>
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
              />
              {s.label.map((line, j) => (
                <text
                  key={j}
                  x={432}
                  y={labelY + 16 * j + 4}
                  fill={s.color}
                  fontSize="13"
                  fontFamily={FONT}
                  style={{ opacity: +inView, transition: `opacity 0.5s ease ${labelDelay}s` }}
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
