'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from './motion'

/*
 * Vahue drawing for the hero and the before/after panel (in place of Scale's transparent loop videos):
 * the workflow's systems orbit one agent on two rings, with pulses running in along the spokes.
 * One slow GSAP loop (80s per lap) drives every node; static under reduced motion.
 */

const C = 300
const RINGS = [150, 235]

export default function Orbit({ labels, className = '' }: { labels: string[]; className?: string }) {
  const nodes = useRef<(SVGGElement | null)[]>([])
  const spokes = useRef<(SVGLineElement | null)[]>([])
  const pulses = useRef<(SVGCircleElement | null)[]>([])
  const items = labels.length ? labels.slice(0, 6) : ['Source', 'Source', 'Source']

  useEffect(() => {
    const n = items.length
    const base = items.map((_, i) => (360 * i) / n + (i % 2 ? 18 : 0))
    const radius = items.map((_, i) => RINGS[i % 2])
    const place = (lap: number, pulse: number) => {
      items.forEach((_, i) => {
        const dir = i % 2 ? -1 : 1
        const a = ((base[i] + dir * lap) * Math.PI) / 180
        const x = C + radius[i] * Math.cos(a)
        const y = C + radius[i] * Math.sin(a)
        nodes.current[i]?.setAttribute('transform', `translate(${x} ${y})`)
        const sp = spokes.current[i]
        if (sp) {
          sp.setAttribute('x2', String(x))
          sp.setAttribute('y2', String(y))
        }
        const pl = pulses.current[i]
        if (pl) {
          const k = (pulse + i / n) % 1
          pl.setAttribute('cx', String(x + (C - x) * k))
          pl.setAttribute('cy', String(y + (C - y) * k))
          pl.style.opacity = String(Math.sin(k * Math.PI))
        }
      })
    }
    const state = { lap: 0, pulse: 0.3 }
    place(0, 0.3)
    if (prefersReducedMotion()) return
    const a = gsap.to(state, { lap: 360, duration: 80, ease: 'none', repeat: -1, onUpdate: () => place(state.lap, state.pulse) })
    const b = gsap.to(state, { pulse: 1.3, duration: 3.2, ease: 'none', repeat: -1 })
    return () => {
      a.kill()
      b.kill()
    }
  }, [items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const mono = { fontFamily: 'var(--font-geist-mono), ui-monospace, monospace', letterSpacing: '0.05em' }

  return (
    <svg viewBox="0 0 600 600" className={`h-full w-full ${className}`} aria-hidden="true">
      {RINGS.map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      ))}
      <circle cx={C} cy={C} r={285} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="2 8" />
      {items.map((_, i) => (
        <line
          key={`s${i}`}
          ref={(el) => {
            spokes.current[i] = el
          }}
          x1={C}
          y1={C}
          x2={C}
          y2={C}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={1}
        />
      ))}
      {items.map((_, i) => (
        <circle
          key={`p${i}`}
          ref={(el) => {
            pulses.current[i] = el
          }}
          r={3}
          fill="#ffffff"
          style={{ opacity: 0 }}
        />
      ))}
      <circle cx={C} cy={C} r={62} fill="#0d0d0e" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} />
      <circle cx={C} cy={C} r={78} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 6" />
      <text x={C} y={C + 5} textAnchor="middle" fontSize={13} fill="#ffffff" style={mono}>
        AGENT
      </text>
      {items.map((label, i) => (
        <g
          key={`n${i}`}
          ref={(el) => {
            nodes.current[i] = el
          }}
        >
          <rect x={-58} y={-17} width={116} height={34} rx={8} fill="#0d0d0e" stroke="rgba(255,255,255,0.28)" strokeWidth={1} />
          <text x={0} y={4.5} textAnchor="middle" fontSize={label.length > 12 ? 9.5 : 11} fill="rgba(255,255,255,0.8)" style={mono}>
            {label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  )
}
