/// <reference types="@webgpu/types" />
'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedGridBg from './AnimatedGridBg'
import { GRID_BG_WGSL } from './gridBgWgsl'

/*
 * labs WgslGridBg (chunk 10l5gu25zzpir.js, module 539120): the home hero's "living grid" drawn on the GPU with
 * Scale's internal @vgpu library. Reproduced here on the raw WebGPU API with the same shader and parameters:
 *   effect "hero-grid", blend premultiplied, surface dpr [1,2], alphaMode premultiplied, clear [0,0,0,0]
 *   params { resolution: [clientW, clientH], mouse: [-1e4,-1e4], time: 0, mouse_radius: 210, mouse_strength: 0 }
 *   pointermove (passive) on the canvas parent -> mouse = client - rect, target 1; pointerleave -> target 0
 *   per frame: strength += (target - strength) * 0.12; time = seconds since the first frame
 *   reduced motion: time frozen at 8, one frame (re-rendered on resize)
 *   no navigator.gpu, or any GPU error -> AnimatedGridBg (2D canvas fallback)
 * The vertex stage is vgpu's fullscreen pass; here a fullscreen triangle emits uv in [0,1] with y down so that
 * `uv * resolution` is in the same CSS-pixel space as the pointer.
 */
const VERTEX = /* wgsl */ `
struct VsOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VsOut {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var o: VsOut;
  o.pos = vec4f(p[i], 0.0, 1.0);
  o.uv = vec2f(p[i].x * 0.5 + 0.5, 0.5 - p[i].y * 0.5);
  return o;
}
`

export default function WgslGridBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<'probe' | 'gpu' | 'fallback'>('probe')

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('gpu' in navigator) || !navigator.gpu) {
      setMode('fallback')
      return
    }
    const canvas = ref.current
    if (!canvas) return
    setMode('gpu')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let raf = 0
    const cleanups: (() => void)[] = []
    const fail = () => {
      if (disposed) return
      disposed = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
      setMode('fallback')
    }

    ;(async () => {
      try {
        const adapter = await navigator.gpu.requestAdapter()
        if (!adapter) return fail()
        const device = await adapter.requestDevice()
        if (disposed) return device.destroy()
        cleanups.push(() => device.destroy())
        device.lost.then(() => fail())
        device.addEventListener('uncapturederror', () => fail())
        const ctx = canvas.getContext('webgpu')
        if (!ctx) return fail()
        const format = navigator.gpu.getPreferredCanvasFormat()
        ctx.configure({ device, format, alphaMode: 'premultiplied' })

        const module = device.createShaderModule({ code: VERTEX + '\n' + GRID_BG_WGSL })
        const pipeline = device.createRenderPipeline({
          layout: 'auto',
          vertex: { module, entryPoint: 'vs' },
          fragment: {
            module,
            entryPoint: 'main',
            targets: [
              {
                format,
                blend: {
                  color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                  alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                },
              },
            ],
          },
          primitive: { topology: 'triangle-list' },
        })
        // Params: resolution vec2f @0, mouse vec2f @8, time f32 @16, mouse_radius @20, mouse_strength @24 -> 32 bytes
        const ubo = device.createBuffer({ size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST })
        const bind = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: ubo } }] })
        const data = new Float32Array(8)
        const mouse = [-1e4, -1e4]
        let strength = 0
        let target = 0

        const size = () => {
          const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
          const w = Math.max(1, canvas.clientWidth)
          const h = Math.max(1, canvas.clientHeight)
          const bw = Math.round(w * dpr)
          const bh = Math.round(h * dpr)
          if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw
            canvas.height = bh
          }
          return [w, h]
        }
        const frame = (time: number) => {
          const [w, h] = size()
          data[0] = w
          data[1] = h
          data[2] = mouse[0]
          data[3] = mouse[1]
          data[4] = time
          data[5] = 210
          data[6] = strength
          device.queue.writeBuffer(ubo, 0, data)
          const enc = device.createCommandEncoder({ label: 'hero-grid' })
          const pass = enc.beginRenderPass({
            colorAttachments: [{ view: ctx.getCurrentTexture().createView(), clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: 'clear', storeOp: 'store' }],
          })
          pass.setPipeline(pipeline)
          pass.setBindGroup(0, bind)
          pass.draw(3)
          pass.end()
          device.queue.submit([enc.finish()])
        }

        if (typeof ResizeObserver !== 'undefined') {
          const ro = new ResizeObserver(() => reduced && !disposed && frame(8))
          ro.observe(canvas)
          cleanups.push(() => ro.disconnect())
        }
        if (reduced) return frame(8)

        const host = canvas.parentElement ?? canvas
        const onMove = (e: PointerEvent) => {
          const r = canvas.getBoundingClientRect()
          mouse[0] = e.clientX - r.left
          mouse[1] = e.clientY - r.top
          target = 1
        }
        const onLeave = () => {
          target = 0
        }
        host.addEventListener('pointermove', onMove, { passive: true })
        host.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          host.removeEventListener('pointermove', onMove)
          host.removeEventListener('pointerleave', onLeave)
        })
        let t0 = -1
        const loop = (now: number) => {
          if (disposed) return
          if (t0 < 0) t0 = now
          strength += (target - strength) * 0.12
          frame((now - t0) / 1000)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      } catch {
        fail()
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [])

  if (mode === 'fallback') return <AnimatedGridBg />
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
