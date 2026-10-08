'use client'

import { useEffect, useRef } from 'react'

/**
 * Slow field of thin wave lines with one highlighted accent line, drawn on a canvas.
 * Fills its positioned parent. Pauses off-screen and in hidden tabs; static under reduced motion.
 */
export default function WaveField({ className = '' }: { className?: string }) {
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

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />
}
