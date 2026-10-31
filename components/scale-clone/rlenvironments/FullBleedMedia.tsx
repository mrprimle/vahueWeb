'use client'

import { useLayoutEffect, useRef } from 'react'
import ArrowCta, { type ArrowCtaHandle } from './ArrowCta'
import { gsap, ScrollTrigger, playCascade, prepareCascade, reducedMotion } from './motion'
import styles from './styles.module.css'

type Props = {
  /** poster / still image (also the reduced-motion fallback when a video is given) */
  image: string
  video?: string
  title: string
  body?: string
  cta: string
  /** ClipScrollSection startPercentage: 0 on the hero (no inset), 10 on the prefooter (inset 5% → 0) */
  startPercentage: number
  wrapperClassName: string
  priority?: boolean
}

// scale.com FullBleedMediaSection inside a ClipScrollSection (chunk 37xz28pjbnlx4.js, modules 478135 / 540431):
//   clip:  inset((1 - p) * 0.5 * startPercentage % round 1.5rem), root `top bottom` -> `center center`
//   media: scale 1.25 -> 1 over the same range (onUpdate, linear map of progress)
//   text:  section `top center` (retroactive, once): heading + body AnimatedText cascade (body +0.2s),
//          CTA filledWhiteArrow intro (0.85s, delay 0.5s)
//   overlay: flat bg-black/45 over the media
export default function FullBleedMedia({
  image,
  video,
  title,
  body,
  cta,
  startPercentage,
  wrapperClassName,
  priority,
}: Props) {
  const root = useRef<HTMLDivElement>(null)
  const clip = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const para = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<ArrowCtaHandle>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion()) {
      videoRef.current?.pause()
      return
    }
    let cancelled = false
    const splits: { revert: () => void }[] = []
    const ctx = gsap.context(() => {})
    const apply = (p: number) => {
      const inset = (1 - p) * 0.5 * startPercentage
      if (clip.current) clip.current.style.clipPath = `inset(${inset}% round 1.5rem)`
      if (media.current) gsap.set(media.current, { scale: 1.25 + (1 - 1.25) * p })
    }
    ctx.add(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'center center',
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      })
    })

    ctaRef.current?.prepare()
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const h = heading.current && prepareCascade(heading.current)
        const p = para.current && prepareCascade(para.current)
        if (h) splits.push(h.split)
        if (p) splits.push(p.split)
        ScrollTrigger.create({
          trigger: section.current,
          start: 'top center',
          once: true,
          onEnter: () => {
            ctaRef.current?.play(0.5)
            if (h) playCascade(h, 0)
            if (p) playCascade(p, 0.2)
          },
        })
      })
    })
    return () => {
      cancelled = true
      ctx.revert()
      splits.forEach((sp) => sp.revert())
    }
  }, [startPercentage])

  return (
    <div className={wrapperClassName}>
      <div ref={root} className={`relative isolate w-full bg-white ${styles.gridLayout} !px-4`}>
        <div ref={clip} className="col-span-full h-full w-full overflow-hidden">
          <div className="h-full w-full">
            <section ref={section} className={`overflow-hidden rounded-3xl bg-white text-black ${styles.roundClip}`}>
              <div
                className={`relative flex min-h-[480px] items-end overflow-hidden rounded-3xl p-8 md:min-h-[720px] md:p-16 ${styles.roundClip}`}
              >
                <div className="relative z-20 flex w-full max-w-[72rem] flex-col gap-6 text-white">
                  {/* TODO: Vahue copy */}
                  <h2
                    ref={heading}
                    className={`${styles.header2} text-balance !text-[clamp(2rem,0.5rem+5vw,4rem)] !font-normal tracking-[-0.01em] !text-white`}
                  >
                    {title}
                  </h2>
                  {body ? (
                    // TODO: Vahue copy
                    <p ref={para} className={`${styles.body1} w-full text-balance tracking-[-0.01em] text-white`}>
                      {body}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-4 md:flex-row">
                    <ArrowCta ref={ctaRef} href="#" label={cta} />
                  </div>
                </div>
                <div className={`absolute left-0 top-0 h-full w-full origin-center overflow-hidden rounded-3xl ${styles.roundClip}`}>
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-black/45" />
                  <div ref={media} className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl bg-[#193a29]">
                    {video ? (
                      <video
                        ref={videoRef}
                        src={video}
                        poster={image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="pointer-events-none absolute inset-0 block h-full w-full rounded-3xl object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt=""
                        loading={priority ? 'eager' : 'lazy'}
                        fetchPriority={priority ? 'high' : 'auto'}
                        className="absolute inset-0 h-full w-full rounded-3xl object-cover"
                      />
                    )}
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
