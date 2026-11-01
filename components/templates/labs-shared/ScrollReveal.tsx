'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/*
 * labs ScrollReveal (chunk 10l5gu25zzpir.js, module 953971), a framer-motion `motion.div`:
 *   initial {opacity:0, y:14}, whileInView {opacity:1, y:0}, viewport {once:true, amount:0.06},
 *   transition {duration:0.5, delay, ease:[0.16,1,0.3,1]}
 * Reproduced with the same IntersectionObserver threshold motion uses for `amount` plus a WAAPI tween on the same
 * cubic-bezier (the repo has no framer-motion). SSR markup matches labs: inline opacity:0; translateY(14px).
 */
export default function ScrollReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const done = () => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const a = el.animate(
          [
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 500, delay: delay * 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' },
        )
        a.onfinish = () => {
          done()
          a.cancel()
        }
      },
      { threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(14px)' }}>
      {children}
    </div>
  )
}
