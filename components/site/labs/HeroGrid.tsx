'use client'

// labs.scale.com WgslGridBg (module 539120) and its canvas fallback AnimatedGridBg (module 726785).
// Scale draws through its private `vgpu` wrapper; this calls WebGPU directly with the same shader, uniforms, blending and loop.
// Params: dpr [1, 2], premultiplied alpha, clear 0, mouse_radius 210, strength eases by .12 per frame, pointer listens on the canvas parent,
// reduced motion freezes one frame at time 8.
import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_GRID_WGSL } from './heroGridShader'

const CLASSES = 'absolute inset-0 w-full h-full pointer-events-none'

type GpuHandle = { dispose: () => void }

async function startGpu(canvas: HTMLCanvasElement, reducedMotion: boolean, onError: () => void, disposed: () => boolean): Promise<GpuHandle | null> {
  // WebGPU types are not in the project's TS lib set.
  const gpu = (navigator as unknown as { gpu: any }).gpu // eslint-disable-line @typescript-eslint/no-explicit-any
  const adapter = await gpu.requestAdapter()
  if (!adapter) throw new Error('no adapter')
  const device = await adapter.requestDevice()
  if (disposed()) {
    device.destroy()
    return null
  }
  // vgpu forwards device errors to its `onError`, which drops to the canvas fallback.
  device.addEventListener?.('uncapturederror', () => onError())
  const context = canvas.getContext('webgpu') as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const format = gpu.getPreferredCanvasFormat()
  context.configure({ device, format, alphaMode: 'premultiplied' })
  const module = device.createShaderModule({ code: HERO_GRID_WGSL })
  const blendPart = { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' }
  const pipeline = device.createRenderPipeline({
    label: 'hero-grid',
    layout: 'auto',
    vertex: { module, entryPoint: 'vgpu_fullscreen_vs' },
    fragment: { module, entryPoint: 'main', targets: [{ format, blend: { color: blendPart, alpha: blendPart } }] },
    primitive: { topology: 'triangle-list' },
  })
  const uniform = device.createBuffer({ size: 32, usage: 0x40 | 0x8 /* UNIFORM | COPY_DST */ })
  const bindGroup = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: uniform } }] })
  const data = new Float32Array(8)
  let failed = false
  device.lost?.then((info: { reason?: string }) => {
    if (!disposed() && info?.reason !== 'destroyed' && !failed) {
      failed = true
      onError()
    }
  })

  const size = () => [Math.max(1, canvas.clientWidth), Math.max(1, canvas.clientHeight)]
  const mouse = [-1e4, -1e4]
  let target = 0
  let strength = 0

  const draw = (time: number) => {
    const [w, h] = size()
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2)
    const pw = Math.max(1, Math.round(w * dpr))
    const ph = Math.max(1, Math.round(h * dpr))
    if (canvas.width !== pw) canvas.width = pw
    if (canvas.height !== ph) canvas.height = ph
    data.set([w, h, mouse[0], mouse[1], time, 210, strength, 0])
    device.queue.writeBuffer(uniform, 0, data)
    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
      colorAttachments: [{ view: context.getCurrentTexture().createView(), clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: 'clear', storeOp: 'store' }],
    })
    pass.setPipeline(pipeline)
    pass.setBindGroup(0, bindGroup)
    pass.draw(3)
    pass.end()
    device.queue.submit([encoder.finish()])
  }

  const cleanups: (() => void)[] = []
  const resize = new ResizeObserver(() => {
    if (reducedMotion) draw(8)
  })
  resize.observe(canvas)
  cleanups.push(() => resize.disconnect())

  if (reducedMotion) {
    draw(8)
  } else {
    const parent = canvas.parentElement ?? canvas
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse[0] = e.clientX - r.left
      mouse[1] = e.clientY - r.top
      target = 1
    }
    const onLeave = () => {
      target = 0
    }
    parent.addEventListener('pointermove', onMove, { passive: true })
    parent.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    })
    let start = -1
    let frame = requestAnimationFrame(function tick(now) {
      if (start < 0) start = now
      strength += (target - strength) * 0.12
      try {
        draw((now - start) / 1000)
      } catch {
        if (!failed) {
          failed = true
          onError()
        }
        return
      }
      frame = requestAnimationFrame(tick)
    })
    cleanups.push(() => cancelAnimationFrame(frame))
  }
  return {
    dispose: () => {
      cleanups.forEach((c) => c())
      device.destroy()
    },
  }
}

export function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<'probe' | 'gpu' | 'fallback'>('probe')
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('gpu' in navigator) || !(navigator as unknown as { gpu?: unknown }).gpu) {
      setMode('fallback')
      return
    }
    const canvas = ref.current
    if (!canvas) return
    let disposed = false
    let handle: GpuHandle | null = null
    const fail = () => setMode('fallback')
    startGpu(canvas, window.matchMedia('(prefers-reduced-motion: reduce)').matches, fail, () => disposed)
      .then((h) => {
        if (disposed) h?.dispose()
        else handle = h
      })
      .catch(fail)
    setMode('gpu')
    return () => {
      disposed = true
      handle?.dispose()
    }
  }, [])
  if (mode === 'fallback') return <AnimatedGridBg />
  return <canvas ref={ref} className={CLASSES} aria-hidden="true" />
}

type GridCell = {
  col: number
  row: number
  period: number
  offset: number
  peakAlpha: number
  driftAxis: 'h' | 'v'
  driftSpeed: number
  driftDir: number
  birthCol: number
  birthRow: number
  born: number
}

function hash(a: number, b: number) {
  return ((0x9e3779b1 * a) ^ (0x85ebca77 * b)) >>> 0
}

/** Module 726785, verbatim logic: 2d canvas grid with slowly drifting filled cells. */
export function AnimatedGridBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  const cells = useRef<GridCell[]>([])
  const raf = useRef(0)
  const dims = useRef({ cols: 0, rows: 0, cellW: 80, cellH: 80 })

  const seed = useCallback((now: number) => {
    const { cols, rows } = dims.current
    const total = cols * rows
    const count = Math.max(8, Math.floor(0.035 * total))
    const picks = new Set<number>()
    while (picks.size < count) picks.add(Math.floor(Math.random() * total))
    cells.current = [...picks].map((r) => {
      const col = r % cols
      const row = Math.floor(r / cols)
      const h = hash(col, row)
      return {
        col,
        row,
        period: 6e3 + (h % 8e3),
        offset: h % 1e4,
        peakAlpha: 0.06 + (h % 100) / 1400,
        driftAxis: h % 2 === 0 ? 'h' : 'v',
        driftSpeed: 3e-5 + ((h >> 8) % 100) / 5e6,
        driftDir: (h >> 16) % 2 === 0 ? 1 : -1,
        birthCol: col,
        birthRow: row,
        born: now - (h % 1e4),
      }
    })
  }, [])

  const measure = useCallback(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const dpr = window.devicePixelRatio || 1
    const w = parent.clientWidth
    const h = parent.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const cols = Math.max(1, Math.round(w / 80))
    const rows = Math.max(1, Math.round(h / 80))
    dims.current = { cols, rows, cellW: w / cols, cellH: h / rows }
  }, [])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    measure()
    window.addEventListener('resize', measure)
    let observer: ResizeObserver | undefined
    if (canvas.parentElement) {
      observer = new ResizeObserver(() => measure())
      observer.observe(canvas.parentElement)
    }
    seed(performance.now())
    const reseed = setInterval(() => {
      const { cols, rows } = dims.current
      const total = cols * rows
      const list = cells.current
      const n = Math.max(1, Math.ceil(list.length / 6))
      const now = performance.now()
      for (let i = 0; i < n; i++) {
        const at = Math.floor(Math.random() * list.length)
        const pick = Math.floor(Math.random() * total)
        const col = pick % cols
        const row = Math.floor(pick / cols)
        const h = hash(col, row + Math.floor(now))
        list[at] = {
          col,
          row,
          period: 6e3 + (h % 8e3),
          offset: 0,
          peakAlpha: 0.06 + (h % 100) / 1400,
          driftAxis: h % 2 === 0 ? 'h' : 'v',
          driftSpeed: 3e-5 + ((h >> 8) % 100) / 5e6,
          driftDir: (h >> 16) % 2 === 0 ? 1 : -1,
          birthCol: col,
          birthRow: row,
          born: now,
        }
      }
    }, 12e3)
    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const { cols, rows, cellW, cellH } = dims.current
      ctx.strokeStyle = 'rgba(0,0,0,0.04)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let i = 0; i <= cols; i++) {
        const x = i * cellW
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let i = 0; i <= rows; i++) {
        const y = i * cellH
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()
      for (const c of cells.current) {
        const s = 0.5 * Math.sin((((now - c.born + c.offset) % c.period) / c.period) * Math.PI * 2) + 0.5
        const alpha = s * s * (3 - 2 * s) * c.peakAlpha
        if (alpha < 0.003) continue
        const drift = (now - c.born) * c.driftSpeed * c.driftDir
        let fx = c.birthCol + (c.driftAxis === 'h' ? drift : 0)
        let fy = c.birthRow + (c.driftAxis === 'v' ? drift : 0)
        fx = ((fx % cols) + cols) % cols
        fy = ((fy % rows) + rows) % rows
        const x = Math.floor(fx) * cellW
        const y = Math.floor(fy) * cellH
        const mx = fx - Math.floor(fx)
        const my = fy - Math.floor(fy)
        if (mx < 0.15 && my < 0.15) {
          ctx.fillStyle = `rgba(0,0,0,${alpha})`
          ctx.fillRect(x + 0.5, y + 0.5, cellW - 1, cellH - 1)
        } else {
          const a = alpha * (1 - Math.max(mx, my))
          const b = alpha * Math.max(mx, my)
          ctx.fillStyle = `rgba(0,0,0,${a})`
          ctx.fillRect(x + 0.5, y + 0.5, cellW - 1, cellH - 1)
          if (b > 0.003) {
            ctx.fillStyle = `rgba(0,0,0,${b})`
            if (c.driftAxis === 'h') {
              const nx = ((Math.floor(fx) + c.driftDir + cols) % cols) * cellW
              ctx.fillRect(nx + 0.5, y + 0.5, cellW - 1, cellH - 1)
            } else {
              const ny = ((Math.floor(fy) + c.driftDir + rows) % rows) * cellH
              ctx.fillRect(x + 0.5, ny + 0.5, cellW - 1, cellH - 1)
            }
          }
        }
      }
      raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', measure)
      observer?.disconnect()
      cancelAnimationFrame(raf.current)
      clearInterval(reseed)
    }
  }, [measure, seed])

  return <canvas ref={ref} className={CLASSES} aria-hidden="true" />
}
