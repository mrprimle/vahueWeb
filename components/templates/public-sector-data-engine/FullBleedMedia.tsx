'use client'

import { useLayoutEffect, useRef } from 'react'
import ArrowCta, { type ArrowCtaHandle } from './ArrowCta'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion, retroactiveEnter } from './motion'
import styles from './styles.module.css'

type Props = {
  image: string
  title: string
  body?: string
  cta: { label: string; href: string }
  /** backdrop colour behind the rounded clip (white on the hero, gray-50 on the prefooter) */
  backdrop: string
  wrapperClassName: string
  priority?: boolean
  /** ClipScrollSection startPercentage (REA-verified): 0 on the hero (no clip), 10 on the pre-footer. Defaults to 0 when `priority`. */
  startPercentage?: number
}

// scale.com FullBleedMediaSection inside a ClipScrollSection (chunk 37xz28pjbnlx4.js):
//   clip:  inset(0.5*startPercentage % -> 0% round 1.5rem), trigger = ClipScrollSection root, top bottom -> center center
//          (hero passes startPercentage 0 = no clip; pre-footer uses the default 10 = 5% -> 0)
//   media: scale 1.25 -> 1, same range
//   text:  on "top center" (retroactive) heading + body run the AnimatedText cascade
//          (body 0.2s after heading), CTA plays filledWhiteArrow (0.85s, delay 0.5s)
export default function FullBleedMedia({ image, title, body, cta, backdrop, wrapperClassName, priority, startPercentage: startPct }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<ArrowCtaHandle>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) return
    let cancelled = false
    let offRetro = () => {}
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {})
    const startPercentage = startPct ?? (priority ? 0 : 10)
    const apply = (p: number) => {
      const inset = (1 - p) * 0.5 * startPercentage
      if (clip.current) clip.current.style.clipPath = `inset(${inset}% round 1.5rem)`
    }
    apply(0)
    ctx.add(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'center center',
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      })
      gsap.fromTo(
        media.current,
        { scale: 1.25 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'center center', scrub: true },
        },
      )
    })

    ctaRef.current?.prepare()
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const h = heading.current && prepareCascade(heading.current)
        const p = para.current && prepareCascade(para.current)
        if (h) splits.push(h.split)
        if (p) splits.push(p.split)
        let played = false
        const enter = () => {
          if (played) return
          played = true
          ctaRef.current?.play(0.5)
          if (h) playCascade(h, 0)
          if (p) playCascade(p, 0.2)
        }
        // useScrollTrigger (module 210104): start `top center`, default end `bottom 20%`, retroactiveOnEnter
        const st = ScrollTrigger.create({ trigger: section.current, start: 'top center', end: 'bottom 20%', onEnter: enter })
        offRetro = retroactiveEnter(st, enter)
      })
    })
    // Sections above (lazy images, sliders, fonts) grow after these triggers are created, which left the
    // pre-footer clip/scale ~130-875px late in live sampling. Re-measure when the document height changes.
    let lastH = document.documentElement.scrollHeight
    let refreshTimer: ReturnType<typeof setTimeout> | undefined
    const heightWatch = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight
      if (h === lastH) return
      lastH = h
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    heightWatch.observe(document.body)
    return () => {
      cancelled = true
      offRetro()
      heightWatch.disconnect()
      clearTimeout(refreshTimer)
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [priority, startPct])

  return (
    <div className={wrapperClassName}>
      <div
        ref={root}
        className={`relative isolate grid w-full grid-cols-8 gap-2 px-4 md:grid-cols-[repeat(12,minmax(0,150px))] md:justify-center ${backdrop}`}
      >
        <div ref={clip} className="col-span-full h-full w-full overflow-hidden" style={{ clipPath: 'inset(0 round 1.5rem)' }}>
          <div className="h-full w-full">
            <section ref={section} className={`overflow-hidden rounded-3xl bg-white text-black ${styles.roundClip}`}>
              <div className={`relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16 ${styles.roundClip}`}>
                <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                  <h2
                    ref={heading}
                    className="text-balance text-[clamp(2rem,0.5rem+5vw,4rem)] font-normal leading-[1.05] tracking-[-0.01em] text-white"
                  >
                    {title}
                  </h2>
                  {body ? (
                    <p
                      ref={para}
                      className="w-full text-balance text-[16px] leading-[1.45] tracking-[-0.01em] text-white md:text-[20px] md:leading-[1.5]"
                    >
                      {body}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-4 md:flex-row">
                    <ArrowCta ref={ctaRef} href={cta.href} label={cta.label} />
                  </div>
                </div>
                <div className={`absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl ${styles.roundClip}`}>
                  <div className={`pointer-events-none absolute inset-0 z-10 rounded-3xl ${styles.mediaOverlay}`} />
                  <div ref={media} className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 rounded-3xl bg-[#193a29]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt=""
                        loading={priority ? 'eager' : 'lazy'}
                        fetchPriority={priority ? 'high' : 'auto'}
                        className="absolute inset-0 h-full w-full rounded-3xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
