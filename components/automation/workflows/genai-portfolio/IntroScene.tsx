'use client'

import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react'
import gsap from 'gsap'

/*
 * Vahue's own scene for the pinned intro (replaces Scale's lines/tris video streams, which are reference only).
 * One SVG at the template's texture size (1920 x 1388), positioned by the parent with the same textureContain maths.
 *
 *   "lines" pass  -> setEntry(e) draws the grid, source outlines and agent ring while the section rises in
 *                    (Scale's frames 0 -> 93); setProgress(t) draws each stage's edges and nodes as the scrub
 *                    crosses that step's window (Scale's frames 93 -> 453).
 *   "tris" pass   -> playStage(k) runs pulses along stage k's edges: the entry edge once (32 frames @ 30fps,
 *                    like Scale's scrollable edges), then its loop edge forever; park() hides them (frame 0).
 *
 * Stages: 1 sources -> agent, 2 question -> agent, 3 agent -> cited answer, 4 open question -> new content.
 * Labels come from the workflow (tools as sources, step titles as stage tags), so the scene stays generic.
 */

export const TEX_W = 1920
export const TEX_H = 1388

// Edge timings in frames, from the template's EDGES (entry edge, loop edge) per stage.
const EDGE_FRAMES: [number, number][] = [
  [32, 45],
  [32, 45],
  [32, 40],
  [46, 30],
]
const FPS = 30

export type IntroSceneHandle = {
  setEntry: (e: number) => void
  /** t: scrub 0..1; starts: the scrub position at which each stage's step becomes active. */
  setProgress: (t: number, starts: number[]) => void
  playStage: (k: number, backwards?: boolean) => void
  park: () => void
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

const SRC_X = 640
const SRC_W = 300
const SRC_H = 76
const HUB = { x: 1220, y: 665, r: 96 }
const Q = { x: 1470, y: 250, w: 360, h: 128 }
const A = { x: 1470, y: 760, w: 360, h: 320 }
const NEW = { x: SRC_X, y: 168, w: SRC_W, h: SRC_H }

const IntroScene = forwardRef<IntroSceneHandle, { sources: string[]; tags: string[] }>(function IntroScene({ sources, tags }, ref) {
  const src = useMemo(() => (sources.length ? sources.slice(0, 5) : ['Documents', 'Wiki', 'Database']), [sources])
  const ys = useMemo(() => {
    const top = 330
    const bottom = 1000
    return src.map((_, i) => (src.length === 1 ? (top + bottom) / 2 : top + ((bottom - top) * i) / (src.length - 1)))
  }, [src])

  const grid = useRef<SVGRectElement>(null)
  const srcBoxes = useRef<(SVGRectElement | null)[]>([])
  const srcLabels = useRef<(SVGTextElement | null)[]>([])
  const hubRing = useRef<SVGCircleElement>(null)
  const hubCore = useRef<SVGGElement>(null)
  const edges1 = useRef<(SVGPathElement | null)[]>([])
  const qGroup = useRef<SVGGElement>(null)
  const edge2 = useRef<SVGPathElement>(null)
  const aGroup = useRef<SVGGElement>(null)
  const edge3 = useRef<SVGPathElement>(null)
  const chips = useRef<SVGGElement>(null)
  const cites = useRef<SVGGElement>(null)
  const loop = useRef<SVGPathElement>(null)
  const newGroup = useRef<SVGGElement>(null)
  const tagEls = useRef<(SVGGElement | null)[]>([])
  const pulses = useRef<(SVGCircleElement | null)[]>([])
  const tl = useRef<gsap.core.Timeline | null>(null)

  const srcEdge = (y: number) => `M ${SRC_X + SRC_W} ${y} C ${SRC_X + SRC_W + 110} ${y}, ${HUB.x - HUB.r - 90} ${HUB.y}, ${HUB.x - HUB.r} ${HUB.y}`
  const qEdge = `M ${Q.x} ${Q.y + Q.h / 2} C ${Q.x - 150} ${Q.y + Q.h / 2}, ${HUB.x} ${HUB.y - HUB.r - 160}, ${HUB.x} ${HUB.y - HUB.r}`
  const aEdge = `M ${HUB.x + HUB.r} ${HUB.y} C ${HUB.x + HUB.r + 90} ${HUB.y}, ${A.x - 120} ${A.y + 110}, ${A.x} ${A.y + 110}`
  const loopPath = `M ${Q.x + Q.w / 2} ${Q.y} C ${Q.x + Q.w / 2} ${Q.y - 140}, ${NEW.x + NEW.w + 260} ${NEW.y + NEW.h / 2}, ${NEW.x + NEW.w} ${NEW.y + NEW.h / 2}`
  const citePath = (y: number, i: number) =>
    `M ${A.x} ${A.y + 250 + i * 40} C ${A.x - 380} ${A.y + 330 + i * 40}, ${SRC_X + SRC_W + 200} ${y + 40}, ${SRC_X + SRC_W} ${y + 18}`

  // Which paths each stage's pulses travel along.
  const stagePaths = (k: number): SVGPathElement[] => {
    if (k === 1) return edges1.current.filter(Boolean) as SVGPathElement[]
    if (k === 2) return [edge2.current].filter(Boolean) as SVGPathElement[]
    if (k === 3) return [edge3.current].filter(Boolean) as SVGPathElement[]
    if (k === 4) return [loop.current].filter(Boolean) as SVGPathElement[]
    return []
  }

  const draw = (el: SVGPathElement | SVGRectElement | SVGCircleElement | null, p: number) => {
    if (el) el.style.strokeDashoffset = String(1 - clamp01(p))
  }

  useImperativeHandle(ref, () => ({
    setEntry(e) {
      const v = clamp01(e)
      if (grid.current) grid.current.style.opacity = String(v)
      srcBoxes.current.forEach((b, i) => draw(b, v * 1.25 - i * 0.05))
      draw(hubRing.current, v)
      srcLabels.current.forEach((l) => l && (l.style.opacity = String(0.35 * v)))
    },
    setProgress(t, starts) {
      const stage = (k: number) => {
        const p0 = starts[Math.min(k, starts.length) - 1] ?? 1
        return clamp01((t - (p0 - 0.07)) / 0.09)
      }
      const s1 = stage(1)
      const s2 = stage(2)
      const s3 = stage(3)
      const s4 = stage(4)
      // stage 1: every source wires into the agent
      edges1.current.forEach((e, i) => draw(e, s1 * 1.3 - i * 0.08))
      srcLabels.current.forEach((l) => l && (l.style.opacity = String(0.35 + 0.65 * s1)))
      srcBoxes.current.forEach((b) => b && (b.style.fillOpacity = String(0.04 + 0.05 * s1)))
      if (hubCore.current) hubCore.current.style.opacity = String(0.25 + 0.75 * s1)
      // stage 2: the question arrives
      if (qGroup.current) gsap.set(qGroup.current, { opacity: s2, y: (1 - s2) * 40 })
      draw(edge2.current, s2)
      // stage 3: the agent writes a cited answer
      draw(edge3.current, s3)
      if (aGroup.current) gsap.set(aGroup.current, { opacity: s3, y: (1 - s3) * 40 })
      if (chips.current) chips.current.style.opacity = String(clamp01(s3 * 2 - 1))
      if (cites.current) cites.current.style.opacity = String(0.6 * clamp01(s3 * 2 - 1))
      // stage 4: open questions turn into the next content
      draw(loop.current, s4)
      if (newGroup.current) gsap.set(newGroup.current, { opacity: s4, y: (1 - s4) * -30 })
      ;[s1, s2, s3, s4].forEach((s, i) => {
        const tag = tagEls.current[i]
        if (tag) tag.style.opacity = String(s)
      })
    },
    playStage(k, backwards = false) {
      tl.current?.kill()
      const paths = stagePaths(k)
      const dots = pulses.current.filter(Boolean) as SVGCircleElement[]
      gsap.set(dots, { opacity: 0 })
      if (!paths.length) return
      const [entry, loopF] = EDGE_FRAMES[Math.min(k, 4) - 1]
      const lens = paths.map((p) => p.getTotalLength())
      const used = dots.slice(0, paths.length)
      const place = (p: number) =>
        used.forEach((d, i) => {
          const pt = paths[i].getPointAtLength(clamp01(p) * lens[i])
          d.setAttribute('cx', String(pt.x))
          d.setAttribute('cy', String(pt.y))
        })
      const proxy = { p: backwards ? 1 : 0 }
      const t = gsap.timeline()
      t.set(used, { opacity: 1 })
      t.to(proxy, { p: backwards ? 0 : 1, duration: entry / FPS, ease: 'none', onUpdate: () => place(proxy.p) })
      t.add(
        gsap.fromTo(
          proxy,
          { p: 0 },
          { p: 1, duration: loopF / FPS, ease: 'none', repeat: -1, repeatDelay: 0.4, onUpdate: () => place(proxy.p) },
        ),
      )
      if (hubCore.current)
        t.fromTo(hubCore.current, { scale: 1 }, { scale: 1.06, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: '50% 50%' }, entry / FPS - 0.1)
      tl.current = t
    },
    park() {
      tl.current?.kill()
      tl.current = null
      gsap.set(pulses.current.filter(Boolean), { opacity: 0 })
    },
  }))

  const stroke = 'rgba(255,255,255,0.55)'
  const faint = 'rgba(255,255,255,0.18)'
  const mono = { fontFamily: 'var(--font-geist-mono), ui-monospace, monospace', letterSpacing: '0.05em' }

  const tag = (i: number, x: number, y: number) =>
    tags[i] ? (
      <g
        ref={(el) => {
          tagEls.current[i] = el
        }}
        style={{ opacity: 0 }}
      >
        <rect x={x} y={y} width={36} height={36} rx={6} fill="rgba(255,255,255,0.9)" />
        <text x={x + 18} y={y + 25} textAnchor="middle" fontSize={20} fill="#020202" style={mono}>
          {i + 1}
        </text>
        <text x={x + 50} y={y + 26} fontSize={24} fill="rgba(255,255,255,0.75)" style={mono}>
          {tags[i].toUpperCase()}
        </text>
      </g>
    ) : null

  return (
    <svg viewBox={`0 0 ${TEX_W} ${TEX_H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="kgDots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.10)" />
        </pattern>
        <radialGradient id="kgPulse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect ref={grid} x="0" y="0" width={TEX_W} height={TEX_H} fill="url(#kgDots)" style={{ opacity: 0 }} />

      {/* citations: the answer points back at its sources */}
      <g ref={cites} style={{ opacity: 0 }}>
        {ys.slice(0, 2).map((y, i) => (
          <path key={i} d={citePath(y, i)} fill="none" stroke={stroke} strokeWidth={2} strokeDasharray="6 10" />
        ))}
      </g>

      {/* stage 1 edges */}
      {ys.map((y, i) => (
        <path
          key={i}
          ref={(el) => {
            edges1.current[i] = el
          }}
          d={srcEdge(y)}
          pathLength={1}
          fill="none"
          stroke={stroke}
          strokeWidth={2.5}
          strokeDasharray="1 1"
          style={{ strokeDashoffset: 1 }}
        />
      ))}
      <path ref={edge2} d={qEdge} pathLength={1} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray="1 1" style={{ strokeDashoffset: 1 }} />
      <path ref={edge3} d={aEdge} pathLength={1} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray="1 1" style={{ strokeDashoffset: 1 }} />
      <path ref={loop} d={loopPath} pathLength={1} fill="none" stroke={stroke} strokeWidth={2.5} strokeDasharray="1 1" style={{ strokeDashoffset: 1 }} />

      {/* sources */}
      {src.map((name, i) => (
        <g key={name}>
          <rect
            ref={(el) => {
              srcBoxes.current[i] = el
            }}
            x={SRC_X}
            y={ys[i] - SRC_H / 2}
            width={SRC_W}
            height={SRC_H}
            rx={14}
            pathLength={1}
            fill="#ffffff"
            fillOpacity={0.04}
            stroke={stroke}
            strokeWidth={2}
            strokeDasharray="1 1"
            style={{ strokeDashoffset: 1 }}
          />
          <rect x={SRC_X + 24} y={ys[i] - 9} width={18} height={18} rx={4} fill="none" stroke={faint} strokeWidth={2} />
          <text
            ref={(el) => {
              srcLabels.current[i] = el
            }}
            x={SRC_X + 60}
            y={ys[i] + 9}
            fontSize={26}
            fill="#ffffff"
            style={{ ...mono, opacity: 0 }}
          >
            {name.toUpperCase()}
          </text>
        </g>
      ))}

      {/* new content (stage 4) */}
      <g ref={newGroup} style={{ opacity: 0 }}>
        <rect x={NEW.x} y={NEW.y} width={NEW.w} height={NEW.h} rx={14} fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth={2} strokeDasharray="8 8" />
        <text x={NEW.x + 33} y={NEW.y + NEW.h / 2 + 11} textAnchor="middle" fontSize={32} fill="#ffffff" style={mono}>
          +
        </text>
        <rect x={NEW.x + 60} y={NEW.y + NEW.h / 2 - 6} width={170} height={12} rx={6} fill="rgba(255,255,255,0.35)" />
      </g>

      {/* agent */}
      <circle
        ref={hubRing}
        cx={HUB.x}
        cy={HUB.y}
        r={HUB.r}
        pathLength={1}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeDasharray="1 1"
        style={{ strokeDashoffset: 1 }}
      />
      <g ref={hubCore} style={{ opacity: 0.25 }}>
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r - 22} fill="rgba(255,255,255,0.08)" />
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 34} fill="none" stroke={faint} strokeWidth={1.5} strokeDasharray="4 10" />
        <text x={HUB.x} y={HUB.y + 9} textAnchor="middle" fontSize={26} fill="#ffffff" style={mono}>
          AGENT
        </text>
      </g>

      {/* question */}
      <g ref={qGroup} style={{ opacity: 0 }}>
        <rect x={Q.x} y={Q.y} width={Q.w} height={Q.h} rx={18} fill="#0d0d0e" stroke={stroke} strokeWidth={2} />
        <text x={Q.x + 28} y={Q.y + 44} fontSize={22} fill="rgba(255,255,255,0.55)" style={mono}>
          ?
        </text>
        <rect x={Q.x + 60} y={Q.y + 30} width={250} height={14} rx={7} fill="rgba(255,255,255,0.55)" />
        <rect x={Q.x + 60} y={Q.y + 60} width={190} height={14} rx={7} fill="rgba(255,255,255,0.3)" />
        <rect x={Q.x + 60} y={Q.y + 90} width={120} height={14} rx={7} fill="rgba(255,255,255,0.18)" />
      </g>

      {/* cited answer */}
      <g ref={aGroup} style={{ opacity: 0 }}>
        <rect x={A.x} y={A.y} width={A.w} height={A.h} rx={18} fill="#0d0d0e" stroke={stroke} strokeWidth={2} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={A.x + 30} y={A.y + 36 + i * 34} width={[300, 270, 290, 230, 160][i]} height={13} rx={6.5} fill={`rgba(255,255,255,${i === 0 ? 0.6 : 0.3})`} />
        ))}
        <g ref={chips} style={{ opacity: 0 }}>
          {src.slice(0, 2).map((name, i) => (
            <g key={name}>
              <rect x={A.x + 30} y={A.y + 230 + i * 40} width={Math.min(300, 70 + name.length * 16)} height={30} rx={6} fill="rgba(255,255,255,0.1)" stroke={faint} />
              <text x={A.x + 44} y={A.y + 251 + i * 40} fontSize={18} fill="rgba(255,255,255,0.8)" style={mono}>
                {`[${i + 1}] ${name.toUpperCase()}`}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* stage tags */}
      {tag(0, SRC_X, ys[ys.length - 1] + SRC_H / 2 + 24)}
      {tag(1, Q.x, Q.y + Q.h + 22)}
      {tag(2, A.x, A.y + A.h + 22)}
      {tag(3, NEW.x + NEW.w + 40, NEW.y + NEW.h / 2 - 18)}

      {/* pulses ("tris" layer) */}
      {Array.from({ length: Math.max(1, src.length) }).map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            pulses.current[i] = el
          }}
          r={14}
          cx={-100}
          cy={-100}
          fill="url(#kgPulse)"
          style={{ opacity: 0 }}
        />
      ))}
    </svg>
  )
})

export default memo(IntroScene)
