'use client'

import { useCallback, useEffect, useRef } from 'react'

/*
 * labs AnimatedGridBg (chunk 2bejownx-dgf7.js, module 726785) — the 2D-canvas fallback of the hero "living grid",
 * used when WebGPU is unavailable. Ported 1:1: ~80px cells fitted to the parent, 0.5px rgba(0,0,0,.04) lines,
 * max(8, 3.5% of cells) lit cells with hashed period/peak alpha/drift, a sine-smoothstep breathe, and 1/6 of the
 * cells reseeded every 12 s.
 */
type Cell = {
  col: number; row: number; period: number; offset: number; peakAlpha: number
  driftAxis: 'h' | 'v'; driftSpeed: number; driftDir: 1 | -1; birthCol: number; birthRow: number; born: number
}

// Same float-multiply-then-ToInt32 expression as labs (not Math.imul), so hashes match bit for bit.
const hash = (a: number, b: number) => ((0x9e3779b1 * a) ^ (0x85ebca77 * b)) >>> 0

function makeCell(col: number, row: number, h: number, born: number, offset: number): Cell {
  return {
    col, row,
    period: 6e3 + (h % 8e3),
    offset,
    peakAlpha: 0.06 + (h % 100) / 1400,
    driftAxis: h % 2 === 0 ? 'h' : 'v',
    driftSpeed: 3e-5 + ((h >> 8) % 100) / 5e6,
    driftDir: ((h >> 16) % 2 === 0 ? 1 : -1) as 1 | -1,
    birthCol: col, birthRow: row, born,
  }
}

export default function AnimatedGridBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  const cells = useRef<Cell[]>([])
  const raf = useRef(0)
  const grid = useRef({ cols: 0, rows: 0, cellW: 80, cellH: 80 })

  const seed = useCallback((now: number) => {
    const { cols, rows } = grid.current
    const total = cols * rows
    const n = Math.max(8, Math.floor(0.035 * total))
    const set = new Set<number>()
    while (set.size < n && set.size < total) set.add(Math.floor(Math.random() * total))
    cells.current = [...set].map((i) => {
      const c = i % cols
      const r = Math.floor(i / cols)
      const h = hash(c, r)
      return makeCell(c, r, h, now - (h % 1e4), h % 1e4)
    })
  }, [])

  const resize = useCallback(() => {
    const c = ref.current
    const p = c?.parentElement
    if (!c || !p) return
    const dpr = window.devicePixelRatio || 1
    const w = p.clientWidth
    const h = p.clientHeight
    c.width = w * dpr
    c.height = h * dpr
    c.style.width = `${w}px`
    c.style.height = `${h}px`
    const cols = Math.max(1, Math.round(w / 80))
    const rows = Math.max(1, Math.round(h / 80))
    grid.current = { cols, rows, cellW: w / cols, cellH: h / rows }
  }, [])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    resize()
    window.addEventListener('resize', resize)
    const ro = typeof ResizeObserver !== 'undefined' && c.parentElement ? new ResizeObserver(() => resize()) : null
    if (ro && c.parentElement) ro.observe(c.parentElement)
    seed(performance.now())

    const iv = setInterval(() => {
      const { cols, rows } = grid.current
      const total = cols * rows
      const list = cells.current
      const k = Math.max(1, Math.ceil(list.length / 6))
      const now = performance.now()
      for (let i = 0; i < k; i++) {
        const slot = Math.floor(Math.random() * list.length)
        const idx = Math.floor(Math.random() * total)
        const col = idx % cols
        const row = Math.floor(idx / cols)
        list[slot] = makeCell(col, row, hash(col, row + Math.floor(now)), now, 0)
      }
    }, 12e3)

    const draw = (t: number) => {
      const dpr = window.devicePixelRatio || 1
      const W = c.width / dpr
      const H = c.height / dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const { cols, rows, cellW, cellH } = grid.current
      ctx.strokeStyle = 'rgba(0,0,0,0.04)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let i = 0; i <= cols; i++) { const x = i * cellW; ctx.moveTo(x, 0); ctx.lineTo(x, H) }
      for (let i = 0; i <= rows; i++) { const y = i * cellH; ctx.moveTo(0, y); ctx.lineTo(W, y) }
      ctx.stroke()
      for (const cell of cells.current) {
        const s = 0.5 * Math.sin((((t - cell.born + cell.offset) % cell.period) / cell.period) * Math.PI * 2) + 0.5
        const a = s * s * (3 - 2 * s) * cell.peakAlpha
        if (a < 0.003) continue
        const d = (t - cell.born) * cell.driftSpeed * cell.driftDir
        let x = cell.birthCol + (cell.driftAxis === 'h' ? d : 0)
        let y = cell.birthRow + (cell.driftAxis === 'v' ? d : 0)
        x = ((x % cols) + cols) % cols
        y = ((y % rows) + rows) % rows
        const px = Math.floor(x) * cellW
        const py = Math.floor(y) * cellH
        const fx = x - Math.floor(x)
        const fy = y - Math.floor(y)
        if (fx < 0.15 && fy < 0.15) {
          ctx.fillStyle = `rgba(0,0,0,${a})`
          ctx.fillRect(px + 0.5, py + 0.5, cellW - 1, cellH - 1)
        } else {
          const m = Math.max(fx, fy)
          const a1 = a * (1 - m)
          const a2 = a * m
          ctx.fillStyle = `rgba(0,0,0,${a1})`
          ctx.fillRect(px + 0.5, py + 0.5, cellW - 1, cellH - 1)
          if (a2 > 0.003) {
            ctx.fillStyle = `rgba(0,0,0,${a2})`
            if (cell.driftAxis === 'h') {
              const nx = ((Math.floor(x) + cell.driftDir + cols) % cols) * cellW
              ctx.fillRect(nx + 0.5, py + 0.5, cellW - 1, cellH - 1)
            } else {
              const ny = ((Math.floor(y) + cell.driftDir + rows) % rows) * cellH
              ctx.fillRect(px + 0.5, ny + 0.5, cellW - 1, cellH - 1)
            }
          }
        }
      }
      raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      ro?.disconnect()
      cancelAnimationFrame(raf.current)
      clearInterval(iv)
    }
  }, [resize, seed])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
