'use client'

// Scale module 291143 (EnterpriseHeroSlice): seven image nodes on a pointer-reactive graph, 2 CSS modules.
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, type CSSProperties, type Ref } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { cn } from '@/components/site/lib/cn'
import { LANDSCAPE_PHONE, useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { HeadlineWithCta, type HeadlineWithCtaHandle } from '@/components/site/shared/HeadlineWithCta'
import { ResponsiveImage } from '@/components/site/shared/ResponsiveImage'
import { ScrollToExplore, type ScrollToExploreHandle } from '@/components/site/shared/ScrollToExplore'
import styles from './EnterpriseHero.module.css'
import type { EnterpriseContent } from './types'

const PHONE = '(max-width: 767px)'

type Layout = { x: number; y: number; xStartOffset: number; yStartOffset: number; horizontal: 'left' | 'right'; vertical: 'top' | 'bottom'; width: number; height: number }
type NodeDef = { id: number; desktop: Layout; mobile: Layout; delay: number; connections?: number[] }

function nodeDefs(k: number, landscape: boolean): NodeDef[] {
  const box = (s: number) => ({ width: s * k, height: s * k })
  return [
    {
      id: 0,
      desktop: { x: 60, y: 178, xStartOffset: 300, yStartOffset: 300, horizontal: 'left', vertical: 'top', ...box(168) },
      mobile: { x: landscape ? 50 : 120, y: landscape ? 30 : 60, xStartOffset: 160, yStartOffset: -160, horizontal: 'left', vertical: 'bottom', ...box(96) },
      delay: 0,
      connections: [1, 2],
    },
    {
      id: 1,
      desktop: { x: 426, y: 160, xStartOffset: -100, yStartOffset: 100, horizontal: 'left', vertical: 'top', ...box(110) },
      mobile: { x: landscape ? 70 : -10, y: landscape ? 70 : 150, xStartOffset: -50, yStartOffset: -100, horizontal: 'right', vertical: 'bottom', ...box(90) },
      delay: 0.1,
    },
    {
      id: 2,
      desktop: { x: 264, y: 162, xStartOffset: 50, yStartOffset: -300, horizontal: 'left', vertical: 'bottom', ...box(144) },
      mobile: { x: 10, y: 180, xStartOffset: 100, yStartOffset: -140, horizontal: 'left', vertical: 'bottom', ...box(80) },
      delay: 0.2,
    },
    {
      id: 3,
      desktop: { x: 510, y: 146, xStartOffset: 290, yStartOffset: 100, horizontal: 'right', vertical: 'top', ...box(116) },
      mobile: { x: 105, y: landscape ? 110 : 160, xStartOffset: 150, yStartOffset: -200, horizontal: 'left', vertical: 'top', ...box(100) },
      delay: 0.2,
      connections: [5],
    },
    {
      id: 4,
      desktop: { x: 124, y: 250, xStartOffset: -100, yStartOffset: -100, horizontal: 'right', vertical: 'top', ...box(132) },
      mobile: { x: 0, y: 260, xStartOffset: 50, yStartOffset: -100, horizontal: 'right', vertical: 'top', ...box(63) },
      delay: 0.3,
      connections: [3, 5],
    },
    {
      id: 5,
      desktop: { x: 62, y: 104, xStartOffset: -100, yStartOffset: -300, horizontal: 'right', vertical: 'bottom', ...box(170) },
      mobile: { x: 50, y: 120, xStartOffset: -20, yStartOffset: 40, horizontal: 'right', vertical: 'top', ...box(80) },
      delay: 0.5,
      connections: [6],
    },
    {
      id: 6,
      desktop: { x: 452, y: 90, xStartOffset: 600, yStartOffset: -200, horizontal: 'right', vertical: 'bottom', ...box(116) },
      mobile: { x: 5, y: 115, xStartOffset: 100, yStartOffset: 100, horizontal: 'left', vertical: 'top', ...box(90) },
      delay: 0.3,
    },
  ]
}

const PARALLAX_EASE = [0.027, 0.03, 0.01, 0.037, 0.02, 0.043, 0.046]
const IDLE_SCALE = [0.94, 0.98, 1.02, 1.06, 1.1, 1.14, 1.18]

function center(el: Element | null, svg: Element | null) {
  if (!el || !svg) return { x: 0, y: 0 }
  const a = el.getBoundingClientRect()
  const b = svg.getBoundingClientRect()
  return { x: a.left + a.width / 2 - b.left, y: a.top + a.height / 2 - b.top }
}

const bell = (x: number, p: number) => Math.pow(4 * x * (1 - x), p)

function followNodes(path: SVGPathElement | null, nodes: (HTMLDivElement | null)[]) {
  if (!path) return
  const a = nodes[Number(path.dataset.nodeA)]
  const b = nodes[Number(path.dataset.nodeB)]
  if (!a || !b) return
  const ax = Number(path.dataset.ax) + Number(a.dataset.horizontal)
  const ay = Number(path.dataset.ay) + Number(a.dataset.vertical)
  const bx = Number(path.dataset.bx) + Number(b.dataset.horizontal)
  const by = Number(path.dataset.by) + Number(b.dataset.vertical)
  path.setAttribute('d', `\n        M ${ax} ${ay}\n        L ${bx} ${by}\n      `)
}

type EdgeHandle = {
  animateSet: () => void
  animateIn: (i?: number) => void
  applyAnchors: (o: { nodeAId: number; nodeBId: number; nodeA: HTMLDivElement; nodeB: HTMLDivElement; svgEl: SVGSVGElement }) => void
  updatePath: (nodes: (HTMLDivElement | null)[]) => void
  startDashAnimation: (i: number) => void
  killDashAnimation: () => void
}

const Edge = forwardRef<EdgeHandle>(function Edge(_, ref) {
  const base = useRef<SVGPathElement>(null)
  const moving = useRef<SVGPathElement>(null)
  const dash = useRef<gsap.core.Tween | null>(null)
  useImperativeHandle(
    ref,
    () => ({
      animateSet() {
        if (base.current) gsap.set(base.current, { strokeDasharray: '1000', strokeDashoffset: '1000' })
      },
      animateIn(i = 0) {
        if (base.current) gsap.to(base.current, { strokeDashoffset: '0', duration: 1.2, ease: 'power2.out', delay: 1.1 + 0.05 * i })
      },
      applyAnchors({ nodeAId, nodeBId, nodeA, nodeB, svgEl }) {
        const p = base.current
        const q = moving.current
        if (!p || !q) return
        const a = center(nodeA.querySelector('img'), svgEl)
        const b = center(nodeB.querySelector('img'), svgEl)
        const set = (k: string, v: number | string) => {
          p.dataset[k] = q.dataset[k] = String(v)
        }
        set('ax', a.x - Number(gsap.getProperty(nodeA, 'x')))
        set('ay', a.y - Number(gsap.getProperty(nodeA, 'y')))
        set('bx', b.x - Number(gsap.getProperty(nodeB, 'x')))
        set('by', b.y - Number(gsap.getProperty(nodeB, 'y')))
        set('nodeA', nodeAId)
        set('nodeB', nodeBId)
        if ([a.x, a.y, b.x, b.y].some((v) => typeof v !== 'number' || Number.isNaN(v) || !Number.isFinite(v))) return
        const d = `\n        M ${a.x} ${a.y}\n        L ${b.x} ${b.y}\n      `
        p.setAttribute('d', d)
        q.setAttribute('d', d)
      },
      updatePath(nodes) {
        followNodes(base.current, nodes)
        followNodes(moving.current, nodes)
      },
      startDashAnimation(i) {
        const q = moving.current
        if (!q) return
        dash.current?.kill()
        const s = { phase: 0 }
        dash.current = gsap.to(s, {
          phase: 1,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'none',
          delay: 2 + 0.5 * i,
          onUpdate: () => {
            const len = q.getTotalLength()
            if (len < 0.01) return
            const a = bell(s.phase, 3) * len
            const l = bell(s.phase, 1) * (a + len)
            q.setAttribute('stroke-dasharray', `${a} ${len}`)
            q.setAttribute('stroke-dashoffset', String(-s.phase * l))
          },
        })
      },
      killDashAnimation() {
        dash.current?.kill()
        dash.current = null
      },
    }),
    [],
  )
  return (
    <g>
      <path ref={base} stroke="#B5B5B5" fill="none" />
      <path ref={moving} stroke="#000000" strokeWidth={1} strokeDasharray="1000" strokeDashoffset="1000" fill="none" />
    </g>
  )
})

function pinVars(l: Layout, suffix: string) {
  return {
    [`--pin-left-${suffix}`]: l.horizontal === 'left' ? 'var(--_x)' : 'auto',
    [`--pin-right-${suffix}`]: l.horizontal === 'right' ? 'var(--_x)' : 'auto',
    [`--pin-top-${suffix}`]: l.vertical === 'top' ? 'var(--_y)' : 'auto',
    [`--pin-bottom-${suffix}`]: l.vertical === 'bottom' ? 'var(--_y)' : 'auto',
  }
}

type Parallax = { current: { x: number; y: number } }
type NodeHandle = { animateSet: () => void; animateIn: () => void; resetIdleTick: () => void; idleTick: (time: number, index: number, scale?: number) => void }

const GraphNode = forwardRef<
  NodeHandle,
  { node: NodeDef; image?: { path: string; label: string; color?: string }; outerRef: Ref<HTMLDivElement>; parallaxSmoothedRef: Parallax; parallaxDepth: number }
>(function GraphNode({ node, image, outerRef, parallaxSmoothedRef, parallaxDepth = 1 }, ref) {
  const outer = useRef<HTMLDivElement | null>(null)
  const inner = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const label = useRef<AnimatedTextHandle>(null)
  const img = useRef<HTMLImageElement>(null)
  const mark = useRef<SVGSVGElement>(null)
  const style = useMemo(() => {
    const m = node.mobile
    return {
      '--node-w': node.desktop.width,
      '--node-h': node.desktop.height,
      '--node-w-mobile': m.width,
      '--node-h-mobile': m.height,
      '--x-desktop': node.desktop.x,
      '--y-desktop': node.desktop.y,
      '--x-mobile': m.x,
      '--y-mobile': m.y,
      '--x-start-desktop': node.desktop.xStartOffset,
      '--y-start-desktop': node.desktop.yStartOffset,
      '--x-start-mobile': m.xStartOffset,
      '--y-start-mobile': m.yStartOffset,
      ...pinVars(node.desktop, 'desktop'),
      ...pinVars(m, 'mobile'),
    } as CSSProperties
  }, [node])
  useImperativeHandle(
    ref,
    () => ({
      animateSet() {
        const el = outer.current
        if (!el) return
        const l = window.matchMedia(PHONE).matches && node.mobile ? node.mobile : node.desktop
        gsap.set(el, { x: `${l.xStartOffset}px`, y: `${l.yStartOffset}px`, scaleX: 0, scaleY: 0, opacity: 0.4 })
        el.dataset.smoothOut = '0'
        gsap.set(img.current, { scale: 1.2 })
        const x = gsap.getProperty(el, 'x')
        const y = gsap.getProperty(el, 'y')
        el.dataset.horizontal = String(Number(x))
        el.dataset.vertical = String(Number(y))
        el.dataset.animHorizontal = String(Number(x))
        el.dataset.animVertical = String(Number(y))
        if (clip.current) gsap.set(clip.current, { clipPath: 'inset(10px round 10%)' })
      },
      animateIn() {
        const el = outer.current
        if (!el) return
        const tl = gsap.timeline()
        tl.to(
          el,
          {
            x: 0,
            duration: 2,
            delay: node.delay,
            ease: 'power4.inOut',
            scale: 1,
            opacity: 1,
            onUpdate() {
              const v = Number(gsap.getProperty(el, 'x'))
              el.dataset.horizontal = String(v)
              el.dataset.animHorizontal = String(v)
            },
          },
          'sync',
        )
        setTimeout(() => {
          const s = { value: 0 }
          gsap.to(s, {
            value: 1,
            duration: 4,
            ease: 'sine.out',
            onUpdate() {
              el.dataset.smoothOut = String(s.value)
            },
          })
        }, 1700)
        tl.fromTo(img.current, { scale: 5 }, { scale: 1.2, duration: 2, ease: 'power4.inOut' }, 'sync')
        tl.to(
          el,
          {
            y: 0,
            duration: 1,
            delay: node.delay,
            ease: 'power4.inOut',
            onUpdate() {
              const v = Number(gsap.getProperty(el, 'y'))
              el.dataset.vertical = String(v)
              el.dataset.animVertical = String(v)
            },
          },
          'sync',
        )
        tl.to(
          el,
          {
            duration: 1,
            opacity: 1,
            ease: 'power4.inOut',
            onComplete() {
              label.current?.animateIn()
              gsap.to(mark.current, { scale: 1, duration: 0.5, ease: 'power4.inOut' })
            },
          },
          '-=1.8',
        )
        if (clip.current) gsap.to(clip.current, { clipPath: 'inset(0px round 10%)', duration: 1.6, ease: 'power3.inOut', delay: node.delay })
      },
      resetIdleTick() {
        if (outer.current && inner.current) gsap.set(inner.current, { x: 0, y: 0, scale: 1 })
      },
      idleTick(time, index, k = 1) {
        const el = outer.current
        const box = inner.current
        if (!el || !box) return
        const phone = window.matchMedia(PHONE).matches
        const amp = (phone ? 0.3 : 1) * k
        const smooth = Number(el.dataset.smoothOut)
        const x = Math.sin(0.4 * time + 1e4 * index) * (10 + 5 * index) * amp * smooth
        const y = Math.cos(0.5 * time + 1e4 * index) * (10 + 5 * index) * amp * smooth
        const scale = 1 + 0.05 * Math.cos(0.3 * time + 1e4 * index) * smooth
        const p = parallaxSmoothedRef?.current
        const reach = 20 * Number(!phone)
        const px = p ? p.x * reach * parallaxDepth * smooth : 0
        const py = p ? p.y * reach * parallaxDepth * smooth : 0
        gsap.set(box, { x: x + px, y: y + py, scale })
        el.dataset.horizontal = String(Number(el.dataset.animHorizontal) + x + px)
        el.dataset.vertical = String(Number(el.dataset.animVertical) + y + py)
      },
    }),
    [node, parallaxSmoothedRef, parallaxDepth],
  )
  const alt = image?.label ?? 'Enterprise'
  return (
    <div
      aria-label={`${alt}: view enterprise solutions`}
      className={cn(styles.node, 'node')}
      style={style}
      data-horizontal="0"
      data-vertical="0"
      ref={(el) => {
        outer.current = el
        if (typeof outerRef === 'function') outerRef(el)
      }}
    >
      <div ref={inner} className="relative top-0 left-0 flex flex-col items-center justify-center w-full h-full node-inner">
        <div
          ref={clip}
          className="relative w-full h-full shrink-0"
          onMouseEnter={() => {
            gsap.to(outer.current, { scale: 1.2, duration: 0.35, ease: 'sine.inOut' })
            gsap.to(img.current, { scale: 1, duration: 0.35, ease: 'sine.inOut' })
          }}
          onMouseLeave={() => {
            gsap.to(outer.current, { scale: 1, duration: 0.35, ease: 'sine.inOut' })
            gsap.to(img.current, { scale: 1.2, duration: 0.35, ease: 'sine.inOut' })
          }}
        >
          {image ? <ResponsiveImage ref={img} asset={{ path: image.path, alt: image.label }} fill objectCover sizes="300px" alt={image.label} className="pointer-events-none select-none" backgroundColor={image.color} /> : null}
        </div>
        <div className="flex items-center justify-start w-full oml:w-[150px] oml:justify-center oml:mx-auto oml:text-center gap-2 text-cloud-slate">
          <svg ref={mark} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" className="scale-0" aria-hidden>
            <path d="M6.79229 0H0.500785C0.0554314 0 -0.167603 0.538452 0.14731 0.853365L6.43881 7.14487C6.75373 7.45978 7.29218 7.23675 7.29218 6.79139V0.499889C7.29218 0.223808 7.06837 0 6.79229 0Z" fill="currentColor" />
          </svg>
          <AnimatedText ref={label} tagName="div" className="text-black font-mono text-[0.5rem] md:text-[0.625rem] text-left w-full mt-1 uppercase">
            {image?.label ?? ''}
          </AnimatedText>
        </div>
      </div>
    </div>
  )
})

export function EnterpriseHero({ content: c }: { content: EnterpriseContent['hero'] }) {
  const landscape = useMediaQuery(LANDSCAPE_PHONE, false) === true
  const scroll = useRef<ScrollToExploreHandle>(null)
  const root = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const nodeEls = useRef<(HTMLDivElement | null)[]>([])
  const headline = useRef<HeadlineWithCtaHandle>(null)
  const nodes = useRef<(NodeHandle | null)[]>([])
  const edges = useRef<Record<string, EdgeHandle>>({})
  const pointer = useRef({ x: 0, y: 0 })
  const smoothed = useRef<Parallax[]>([])
  const started = useRef(false)
  const defs = useMemo(() => nodeDefs(landscape ? 0.65 : 1, landscape), [landscape])
  const clock = useRef(0)
  const paused = useRef(false)
  const parallaxFor = useCallback((i: number) => {
    if (!smoothed.current[i]) smoothed.current[i] = { current: { x: 0, y: 0 } }
    return smoothed.current[i]
  }, [])
  useInViewTrigger(root, {
    start: 'top top',
    end: 'bottom top',
    tickerImmediate: true,
    ticker(_time, delta) {
      if (paused.current) return
      clock.current += 0.001 * delta
      const p = pointer.current
      defs.forEach((_, i) => {
        const s = parallaxFor(i).current
        const k = PARALLAX_EASE[i] ?? 0.03
        const idle = IDLE_SCALE[i] ?? 1
        s.x += (p.x - s.x) * (0.3 * k)
        s.y += (p.y - s.y) * (0.3 * k)
        nodes.current[i]?.idleTick(clock.current, i, 1.25 * idle)
      })
      Object.keys(edges.current).forEach((k) => edges.current[k]?.updatePath(nodeEls.current))
    },
  })
  useScrubTrigger(root, {
    start: 'top top',
    end: 'bottom top',
    setupTimeline: (tl) => {
      tl.fromTo(root.current, { yPercent: 0 }, { yPercent: -20, duration: 0.75, ease: 'power2.out' }, 0)
    },
    pin: true,
    pinSpacing: false,
  })
  const anchors = useCallback(() => {
    defs.forEach((d, i) => {
      d.connections?.forEach((j) => {
        const a = nodeEls.current[i]
        const b = nodeEls.current[j]
        if (a && b && svg.current) edges.current[`${i}-${j}`]?.applyAnchors({ nodeAId: defs[i].id, nodeBId: defs[j].id, nodeA: a, nodeB: b, svgEl: svg.current })
      })
    })
    setTimeout(() => {
      paused.current = false
    }, 500)
  }, [defs])
  const anchorsRef = useRef(anchors)
  useEffect(() => {
    anchorsRef.current = anchors
  })
  const startDashes = useCallback(() => {
    let i = 0
    Object.keys(edges.current).forEach((k) => {
      edges.current[k]?.killDashAnimation()
      edges.current[k]?.startDashAnimation(i++)
    })
  }, [])
  useLayoutEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const el = svg.current
    const ro =
      el && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            clock.current = 0
            paused.current = true
            nodes.current.forEach((n) => n?.resetIdleTick())
            clearTimeout(t)
            t = setTimeout(() => {
              if (started.current) anchorsRef.current()
            }, 250)
          })
        : null
    if (el && ro) ro.observe(el)
    const list = edges
    return () => {
      ro?.disconnect()
      Object.keys(list.current).forEach((k) => list.current[k]?.killDashAnimation())
    }
  }, [])
  useLayoutEffect(() => {
    nodes.current.forEach((n) => n?.animateSet())
    Object.values(edges.current).forEach((e) => e?.animateSet())
    // Scale runs this once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const p = pointer.current
    const move = (e: PointerEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      p.x = (e.clientX / w) * 2 - 1
      p.y = (e.clientY / h) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  useEffect(() => {
    if (started.current) return
    // One frame later than Scale: Strict Mode's simulated unmount would otherwise kill the dashes and text this starts.
    const raf = requestAnimationFrame(() => {
      started.current = true
      anchors()
      scroll.current?.animateIn({ delay: 1 })
      headline.current?.animateIn({ delay: 0, delayHeadline: 0.75, delaySubtitle: 0.8, delayCta: 0.9 })
      defs.forEach((d, i) => {
        nodes.current[i]?.animateIn()
        d.connections?.forEach((j) => edges.current[`${i}-${j}`]?.animateIn(j))
      })
      startDashes()
    })
    return () => cancelAnimationFrame(raf)
    // The intro runs once. Scale gates it on the loader store, which is already at rest on a direct load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div ref={root} className={cn('w-full h-full text-black bg-white EnterpriseHero', styles.hero)}>
      <div className="mx-auto w-full ps-6 pe-6 relative isolate h-dvh overflow-hidden py-15">
        <div className="absolute left-1/2 max-sm:top-[33%] top-[34%] oml:top-[30%] -translate-x-1/2 inset-0 z-10  items-start justify-center w-full max-sm:max-w-full h-full grid-layout-desktop">
          <HeadlineWithCta
            ref={headline}
            headerTag="h1"
            width="w-auto"
            headerClass="header2 oml:header4-regular text-balance max-sm:text-[1.75rem] max-lg:text-4xl max-xl:text-5xl max-xl:text-5xl max-sm:leading-tight max-md:leading-tight leading-none"
            className="col-span-10 col-start-2 md:col-span-4 md:col-start-5 oml:gap-2"
            align="center"
            subtitleClasses="max-sm:max-w-full max-w-[88%] body2-regular mb-4"
            padding={false}
            headline={c.headline}
            subtitle={c.subtitle}
            cta={[{ url: c.cta.url, text: c.cta.text, variant: 'arrow', theme: 'evergreen' }]}
            animationManual
            startHidden
          />
        </div>
        <div className="graph absolute left-0 top-0 w-full h-full">
          <svg ref={svg} className="edges absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full">
            {defs.flatMap((d, i) =>
              d.connections?.length
                ? d.connections.map((j) => (
                    <Edge
                      key={`${i}-${j}`}
                      ref={(e) => {
                        if (e) edges.current[`${i}-${j}`] = e
                        else delete edges.current[`${i}-${j}`]
                      }}
                    />
                  ))
                : [],
            )}
          </svg>
          {defs.map((d, i) => (
            <GraphNode
              key={i}
              ref={(n) => {
                nodes.current[i] = n
              }}
              node={d}
              image={c.images[i]}
              parallaxSmoothedRef={parallaxFor(i)}
              parallaxDepth={1 + 0.4 * i}
              outerRef={(el) => {
                nodeEls.current[i] = el
              }}
            />
          ))}
        </div>
        <ScrollToExplore ref={scroll} theme="light" label={c.scrollLabel} className="absolute bottom-[5vh] right-8 md:right-12 z-10" />
      </div>
    </div>
  )
}
