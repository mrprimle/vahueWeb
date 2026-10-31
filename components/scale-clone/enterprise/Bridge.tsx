'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import styles from './enterprise.module.css'
import type { BridgeContent } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com Section (module 698764: marginVertical medium, contentWidth large, insetBackgroundColor evergreen)
 * wrapping EnterpriseBridge (chunk 058pnujclak3f, module 676267, mediaPosition left, size medium).
 * - Inset evergreen panel width 90% -> 100%: duration 1.15 power3.out, scrub, trigger panel "top bottom" -> "bottom 75%".
 * - TransparentVideo (webm, alpha): fades in 700ms ease-out once loaded, plays while intersecting.
 * - HeadlineWithCta (not manual): IntersectionObserver rootMargin "0px 0px -15% 0px" -> headline animateIn(.5s),
 *   subtitle animateIn(1s). Logo marquee: 40s linear loop.
 */

export default function Bridge({ content: bridge, media }: { content: BridgeContent; media?: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const head = useRef<AnimatedTextHandle>(null)
  const sub = useRef<AnimatedTextHandle>(null)
  const textBox = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(bg.current, { width: '100%' })
        return
      }
      gsap.fromTo(
        bg.current,
        { width: '90%' },
        { width: '100%', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: panel.current, start: 'top bottom', end: 'bottom 75%', scrub: true } },
      )
    })
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect()
          head.current?.animateIn({ delay: 0.5 })
          sub.current?.animateIn({ delay: 1 })
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    if (textBox.current) io.observe(textBox.current)
    const v = video.current
    // The media may finish loading before hydration attaches onLoadedData.
    if (!v || v.readyState >= 2) setLoaded(true)
    const vio = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) v?.play().catch(() => {})
        else v?.pause()
      }
    })
    if (v) vio.observe(v)
    return () => {
      io.disconnect()
      vio.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <div className="Section relative isolate grid grid-cols-8 gap-2 overflow-hidden bg-white px-6 py-16 text-black md:grid-cols-12 md:py-32">
      <div ref={panel} className="relative isolate col-span-full rounded-3xl md:col-span-12 md:col-start-1 xl:col-span-10 xl:col-start-2">
        <div ref={bg} aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 rounded-3xl bg-[#193A29]" style={{ width: '90%' }} />
        <div className="relative z-10 text-white">
          <div className="grid min-h-[60vh] w-full grid-cols-8 gap-2 py-6 md:grid-cols-10">
            <div className="col-span-8 col-start-1 flex flex-col justify-center gap-6 text-center md:col-span-4 md:col-start-2 md:row-start-1">
              <div className={`aspect-square w-full self-center transition-opacity duration-700 ease-out md:w-full ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                {bridge.video ? (
                  <video
                    ref={video}
                    className="block h-full w-full object-contain"
                    src={bridge.video}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    aria-hidden
                    onLoadedData={() => setLoaded(true)}
                    onCanPlay={() => setLoaded(true)}
                  />
                ) : (
                  media
                )}
              </div>
            </div>
            <div className="col-span-6 col-start-2 flex flex-col justify-center gap-6 text-center md:col-span-3 md:col-start-7 md:row-start-1 md:text-left">
              <div ref={textBox} className="flex w-full flex-col items-center gap-6 pb-6">
                <AnimatedText
                  ref={head}
                  as="h3"
                  maskCompensation
                  className="w-full text-center text-[24px] font-normal leading-7 tracking-[-0.03em] text-white md:text-left md:text-[32px] md:leading-10"
                >
                  {bridge.headline}
                </AnimatedText>
                <AnimatedText ref={sub} as="p" className="w-full text-center text-[14px] leading-normal tracking-[-0.01em] text-[#C7C7C7] md:text-left md:text-[16px]">
                  {bridge.body}
                </AnimatedText>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <div className="h-[6px] w-[6px] bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
                <p className="text-[0.625rem] uppercase leading-[1.5] tracking-wider text-white/80 md:text-xs">{bridge.trustedBy}</p>
              </div>
              {/* Customer logos: items without `src` are neutral same-size placeholder tiles. */}
              <div className="w-full min-w-0 overflow-hidden" aria-hidden>
                <div className={`flex w-max gap-8 overflow-hidden will-change-transform ${styles.marquee}`}>
                  {[...bridge.logos, ...bridge.logos].map((l, i) => (
                    <div key={i} className="relative flex h-[35px] shrink-0 items-center overflow-hidden" style={{ width: l.width ?? 70 }}>
                      {l.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.src} alt={l.name} className="h-[28px] w-full object-contain" />
                      ) : (
                        <div className="h-[22px] w-full rounded-[3px] bg-white/85" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
