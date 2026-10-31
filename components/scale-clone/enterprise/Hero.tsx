'use client'

import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import FlatCta, { type FlatCtaHandle } from './FlatCta'
import styles from './enterprise.module.css'
import { hero } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com EnterpriseHero (chunk 0sni47mcvnqwg, module 291143). A DOM graph, not WebGL:
 * seven photo nodes pinned to the viewport corners (1550x880 design frame), joined by SVG edges.
 *
 * Pointer: window pointermove -> p = (clientX / innerWidth * 2 - 1, clientY / innerHeight * 2 - 1).
 *   Each node smooths p at 0.3 * C[i] per frame (C = .027 .03 .01 .037 .02 .043 .046) and offsets by
 *   p * 20px * (1 + 0.4 * i) * smoothOut (desktop only). Idle drift on top:
 *   x = sin(0.4t + 1e4 i) * (10 + 5i) * 1.25 * P[i], y = cos(0.5t + 1e4 i) * ..., scale 1 + .05 cos(0.3t + 1e4 i)
 *   (P = .94 .98 1.02 1.06 1.1 1.14 1.18, x0.3 under 768px). smoothOut ramps 0 -> 1 (4s sine.out) 1.7s after intro.
 * Hover a node: node scale 1.2 and image 1.2 -> 1 (0.35s sine.inOut).
 * Intro: node from (xStartOffset, yStartOffset), scale 0, opacity .4 -> 0 / 1 / 1 (x 2s, y 1s, power4.inOut, delay
 *   node.delay); image scale 5 -> 1.2 (2s); clip inset(10px round 10%) -> 0 (1.6s power3.inOut); label + triangle
 *   follow. Edges draw in (dashoffset 1000 -> 0, 1.2s power2.out, delay 1.1 + .05 * target) and a black dash
 *   sweeps each edge forever (8s yoyo, delay 2 + .5 i). Headline/subtitle/CTA animateIn (1.2s; .75/.8/.9s).
 * Scroll: hero pinned "top top" -> "bottom top" (pinSpacing false) with yPercent 0 -> -20 (power2.out), so the
 *   black pull-apart section slides over it.
 */

type Pin = { x: number; y: number; xStartOffset: number; yStartOffset: number; horizontal: 'left' | 'right'; vertical: 'top' | 'bottom'; width: number; height: number }
type NodeDef = { id: number; desktop: Pin; mobile: Pin; delay: number; connections?: number[] }

const P = (x: number, y: number, xs: number, ys: number, h: 'left' | 'right', v: 'top' | 'bottom', s: number): Pin => ({
  x,
  y,
  xStartOffset: xs,
  yStartOffset: ys,
  horizontal: h,
  vertical: v,
  width: s,
  height: s,
})

// Scale's node table (desktop / mobile, non-touch layout).
const NODES: NodeDef[] = [
  { id: 0, desktop: P(60, 178, 300, 300, 'left', 'top', 168), mobile: P(120, 60, 160, -160, 'left', 'bottom', 96), delay: 0, connections: [1, 2] },
  { id: 1, desktop: P(426, 160, -100, 100, 'left', 'top', 110), mobile: P(-10, 150, -50, -100, 'right', 'bottom', 90), delay: 0.1 },
  { id: 2, desktop: P(264, 162, 50, -300, 'left', 'bottom', 144), mobile: P(10, 180, 100, -140, 'left', 'bottom', 80), delay: 0.2 },
  { id: 3, desktop: P(510, 146, 290, 100, 'right', 'top', 116), mobile: P(105, 160, 150, -200, 'left', 'top', 100), delay: 0.2, connections: [5] },
  { id: 4, desktop: P(124, 250, -100, -100, 'right', 'top', 132), mobile: P(0, 260, 50, -100, 'right', 'top', 63), delay: 0.3, connections: [3, 5] },
  { id: 5, desktop: P(62, 104, -100, -300, 'right', 'bottom', 170), mobile: P(50, 120, -20, 40, 'right', 'top', 80), delay: 0.5, connections: [6] },
  { id: 6, desktop: P(452, 90, 600, -200, 'right', 'bottom', 116), mobile: P(5, 115, 100, 100, 'left', 'top', 90), delay: 0.3 },
]
const C = [0.027, 0.03, 0.01, 0.037, 0.02, 0.043, 0.046]
const PH = [0.94, 0.98, 1.02, 1.06, 1.1, 1.14, 1.18]
const MOBILE = '(max-width: 767px)'

const pinVars = (p: Pin, k: string) => ({
  [`--pin-left-${k}`]: p.horizontal === 'left' ? 'var(--_x)' : 'auto',
  [`--pin-right-${k}`]: p.horizontal === 'right' ? 'var(--_x)' : 'auto',
  [`--pin-top-${k}`]: p.vertical === 'top' ? 'var(--_y)' : 'auto',
  [`--pin-bottom-${k}`]: p.vertical === 'bottom' ? 'var(--_y)' : 'auto',
})

const Triangle = forwardRef<SVGSVGElement>(function Triangle(_, ref) {
  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="shrink-0 scale-0 text-[#839CB2]" aria-hidden>
      <path
        d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z"
        fill="currentColor"
      />
    </svg>
  )
})

type NodeHandle = {
  el: () => HTMLDivElement | null
  img: () => HTMLDivElement | null
  set: () => void
  animateIn: () => void
  idle: (t: number, i: number, amp: number, s: { x: number; y: number }) => void
}

const GraphNode = forwardRef<NodeHandle, { node: NodeDef; index: number }>(function GraphNode({ node, index }, ref) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const tri = useRef<SVGSVGElement>(null)
  const label = useRef<AnimatedTextHandle>(null)
  const smoothOut = useRef(0)
  const info = hero.nodes[index]

  const vars = useMemo(() => {
    const d = node.desktop
    const m = node.mobile
    return {
      '--node-w': d.width,
      '--node-h': d.height,
      '--node-w-mobile': m.width,
      '--node-h-mobile': m.height,
      '--x-desktop': d.x,
      '--y-desktop': d.y,
      '--x-mobile': m.x,
      '--y-mobile': m.y,
      ...pinVars(d, 'desktop'),
      ...pinVars(m, 'mobile'),
    } as CSSProperties
  }, [node])

  useImperativeHandle(ref, () => ({
    el: () => outer.current,
    img: () => img.current,
    set() {
      const pin = matchMedia(MOBILE).matches ? node.mobile : node.desktop
      gsap.set(outer.current, { x: pin.xStartOffset, y: pin.yStartOffset, scaleX: 0, scaleY: 0, opacity: 0.4 })
      gsap.set(img.current, { scale: 1.2 })
      gsap.set(clip.current, { clipPath: 'inset(10px round 10%)' })
      smoothOut.current = 0
    },
    animateIn() {
      const o = outer.current
      if (!o) return
      const tl = gsap.timeline()
      tl.to(o, { x: 0, scale: 1, opacity: 1, duration: 2, delay: node.delay, ease: 'power4.inOut' }, 'sync')
      tl.fromTo(img.current, { scale: 5 }, { scale: 1.2, duration: 2, ease: 'power4.inOut' }, 'sync')
      tl.to(o, { y: 0, duration: 1, delay: node.delay, ease: 'power4.inOut' }, 'sync')
      tl.to(
        o,
        {
          duration: 1,
          opacity: 1,
          ease: 'power4.inOut',
          onComplete() {
            label.current?.animateIn()
            gsap.to(tri.current, { scale: 1, duration: 0.5, ease: 'power4.inOut' })
          },
        },
        '-=1.8',
      )
      gsap.to(clip.current, { clipPath: 'inset(0px round 10%)', duration: 1.6, ease: 'power3.inOut', delay: node.delay })
      setTimeout(() => {
        const v = { value: 0 }
        gsap.to(v, { value: 1, duration: 4, ease: 'sine.out', onUpdate: () => void (smoothOut.current = v.value) })
      }, 1700)
    },
    idle(t, i, amp, s) {
      const n = inner.current
      if (!n) return
      const mobile = matchMedia(MOBILE).matches
      const k = (mobile ? 0.3 : 1) * amp
      const so = smoothOut.current
      const ix = Math.sin(0.4 * t + 1e4 * i) * (10 + 5 * i) * k * so
      const iy = Math.cos(0.5 * t + 1e4 * i) * (10 + 5 * i) * k * so
      const sc = 1 + 0.05 * Math.cos(0.3 * t + 1e4 * i) * so
      const px = mobile ? 0 : 20
      const depth = 1 + 0.4 * i
      gsap.set(n, { x: ix + s.x * px * depth * so, y: iy + s.y * px * depth * so, scale: sc })
    },
  }))

  const hoverIn = () => {
    gsap.to(outer.current, { scale: 1.2, duration: 0.35, ease: 'sine.inOut' })
    gsap.to(img.current, { scale: 1, duration: 0.35, ease: 'sine.inOut' })
  }
  const hoverOut = () => {
    gsap.to(outer.current, { scale: 1, duration: 0.35, ease: 'sine.inOut' })
    gsap.to(img.current, { scale: 1.2, duration: 0.35, ease: 'sine.inOut' })
  }

  return (
    <div ref={outer} className={styles.node} style={vars} aria-label={`${info.label}: view solutions`}>
      <div ref={inner} className="relative left-0 top-0 flex h-full w-full flex-col items-center justify-center">
        <div ref={clip} className="relative h-full w-full shrink-0" onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <div className="pointer-events-none relative h-full w-full select-none overflow-hidden" style={{ background: info.color }}>
            <div ref={img} className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={info.image} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-start gap-2">
          <Triangle ref={tri} />
          {/* TODO: Vahue copy */}
          <AnimatedText ref={label} as="div" className="mt-1 w-full text-left font-mono text-[0.5rem] uppercase leading-[1.5] text-black md:text-[0.625rem]">
            {info.label}
          </AnimatedText>
        </div>
      </div>
    </div>
  )
})

type Edge = { key: string; a: number; b: number }
const EDGES: Edge[] = NODES.flatMap((n, i) => (n.connections ?? []).map((b) => ({ key: `${i}-${b}`, a: i, b })))

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const nodes = useRef<(NodeHandle | null)[]>([])
  const basePaths = useRef<(SVGPathElement | null)[]>([])
  const dashPaths = useRef<(SVGPathElement | null)[]>([])
  const headRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const ctaRef = useRef<FlatCtaHandle>(null)
  const scrollP = useRef<AnimatedTextHandle>(null)
  const scrollBox = useRef<HTMLDivElement>(null)
  const arrowA = useRef<SVGSVGElement>(null)
  const arrowB = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    nodes.current.forEach((n) => n?.set())
    basePaths.current.forEach((p) => p && gsap.set(p, { strokeDasharray: 1000, strokeDashoffset: 1000 }))
    ctaRef.current?.set()
    gsap.set(scrollBox.current, { autoAlpha: 0 })
  }, [])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0 }
    const smoothed = NODES.map(() => ({ x: 0, y: 0 }))
    let time = 0
    let visible = true
    const dashTweens: gsap.core.Tween[] = []

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / (window.innerWidth || 1)) * 2 - 1
      pointer.y = (e.clientY / (window.innerHeight || 1)) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const center = (el: Element | null, box: DOMRect) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
    }
    const updateEdges = () => {
      const s = svg.current
      if (!s) return
      const box = s.getBoundingClientRect()
      EDGES.forEach((e, i) => {
        const a = center(nodes.current[e.a]?.img() ?? null, box)
        const b = center(nodes.current[e.b]?.img() ?? null, box)
        if (!a || !b) return
        const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`
        basePaths.current[i]?.setAttribute('d', d)
        dashPaths.current[i]?.setAttribute('d', d)
      })
    }

    const tick = (_t: number, dt: number) => {
      if (!visible) return
      time += 1e-3 * dt
      NODES.forEach((_, i) => {
        const s = smoothed[i]
        const a = C[i] ?? 0.03
        s.x += (pointer.x - s.x) * (0.3 * a)
        s.y += (pointer.y - s.y) * (0.3 * a)
        nodes.current[i]?.idle(time, i, 1.25 * (PH[i] ?? 1), s)
      })
      updateEdges()
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: 'top bottom', end: 'bottom top', onToggle: (st) => (visible = st.isActive) })
      if (!reduce) {
        gsap.fromTo(
          root.current,
          { yPercent: 0 },
          { yPercent: -20, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true, pin: true, pinSpacing: false } },
        )
      }
    })
    gsap.ticker.add(tick)
    updateEdges()

    // Intro (Scale fires it once the page-transition store reports ready).
    const intro = setTimeout(async () => {
      updateEdges()
      if (reduce) {
        headRef.current?.animateIn()
        bodyRef.current?.animateIn()
        scrollP.current?.animateIn()
        return
      }
      scrollP.current?.animateIn({ delay: 1 })
      gsap.to(scrollBox.current, { autoAlpha: 1, duration: 0.25, delay: 1 })
      await Promise.all([headRef.current?.ready(), bodyRef.current?.ready()])
      headRef.current?.animateIn({ delay: 0.75 })
      bodyRef.current?.animateIn({ delay: 0.8 })
      ctaRef.current?.animateIn({ duration: 1.2, delay: 0.9 })
      nodes.current.forEach((n) => n?.animateIn())
      EDGES.forEach((e, i) => {
        const p = basePaths.current[i]
        if (p) gsap.to(p, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', delay: 1.1 + 0.05 * e.b })
      })
      dashPaths.current.forEach((p, i) => {
        if (!p) return
        const ph = { phase: 0 }
        dashTweens.push(
          gsap.to(ph, {
            phase: 1,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            delay: 2 + 0.5 * i,
            onUpdate: () => {
              const L = p.getTotalLength()
              if (L < 0.01) return
              const bump = 4 * ph.phase * (1 - ph.phase)
              const a = Math.pow(bump, 3) * L
              const off = bump * (a + L)
              p.setAttribute('stroke-dasharray', `${a} ${L}`)
              p.setAttribute('stroke-dashoffset', String(-ph.phase * off))
            },
          }),
        )
      })
    }, 120)

    // Scroll-to-explore arrow: the second arrow drops in every 5.5s.
    const arrows = reduce
      ? null
      : gsap
          .timeline({ repeat: -1, repeatDelay: 5 })
          .fromTo(arrowA.current, { y: '-100%' }, { y: '0%', duration: 0.5 }, 0)
          .fromTo(arrowB.current, { y: '-100%' }, { y: '0%', duration: 0.5 }, 0)

    return () => {
      clearTimeout(intro)
      window.removeEventListener('pointermove', onMove)
      gsap.ticker.remove(tick)
      dashTweens.forEach((t) => t.kill())
      arrows?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} className="EnterpriseHero h-full w-full bg-white text-black">
      <div className="relative isolate mx-auto h-dvh w-full overflow-hidden px-6 py-[60px]">
        <div className="absolute inset-0 left-1/2 top-[34%] z-10 grid h-full w-full -translate-x-1/2 grid-cols-12 items-start justify-center gap-2 px-6 max-sm:top-[33%] max-sm:max-w-full">
          <div className="col-span-10 col-start-2 flex flex-col items-center gap-6 py-6 md:col-span-4 md:col-start-5">
            {/* TODO: Vahue copy */}
            <AnimatedText
              ref={headRef}
              as="h1"
              className="w-auto text-balance text-center text-[1.75rem] font-normal leading-[1.25] tracking-[-0.01em] text-black sm:text-[36px] md:leading-none lg:text-[48px] xl:text-[64px] xl:leading-none"
            >
              {hero.headline}
            </AnimatedText>
            {/* TODO: Vahue copy */}
            <AnimatedText
              ref={bodyRef}
              as="p"
              className={`mb-4 w-full max-w-[88%] text-center text-[14px] leading-[1.5] tracking-[-0.01em] text-black max-sm:max-w-full md:text-[16px] ${styles.heroBody}`}
            >
              {hero.body}
            </AnimatedText>
            <FlatCta ref={ctaRef} variant="arrow" theme="evergreen" href={hero.cta.href} text={hero.cta.text} />
          </div>
        </div>
        <div className="graph absolute left-0 top-0 h-full w-full">
          <svg ref={svg} className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2" aria-hidden>
            {EDGES.map((e, i) => (
              <g key={e.key}>
                <path
                  ref={(el) => {
                    basePaths.current[i] = el
                  }}
                  stroke="#B5B5B5"
                  fill="none"
                />
                <path
                  ref={(el) => {
                    dashPaths.current[i] = el
                  }}
                  stroke="#000000"
                  strokeWidth={1}
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  fill="none"
                />
              </g>
            ))}
          </svg>
          {NODES.map((n, i) => (
            <GraphNode
              key={n.id}
              node={n}
              index={i}
              ref={(h) => {
                nodes.current[i] = h
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-[5vh] right-8 z-10 flex items-center gap-4 text-center text-black md:right-12" aria-label="Scroll to explore">
          {/* TODO: Vahue copy */}
          <AnimatedText ref={scrollP} as="p" className="hidden text-[14px] font-medium leading-[1.5] tracking-[0.025em] md:block">
            {hero.scroll}
          </AnimatedText>
          <div ref={scrollBox} className="flex aspect-square items-center justify-center rounded-sm border border-black p-2">
            <div className="h-4 w-4 overflow-clip">
              {[arrowA, arrowB].map((r, i) => (
                <svg key={i} ref={r} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-black" aria-hidden>
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
