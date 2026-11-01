'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PullApart from './PullApart'
import { createHeroScene } from './heroScene'
import { heroHeading, heroStages, heroVideo } from './content'

gsap.registerPlugin(ScrollTrigger)

// Pinned for 4.5 viewports (2.32 on phones) without pin spacing, so the next
// section slides over it. The last 20% of the pin lifts the panel by 10%.
const PIN_LENGTH = { desktop: 4.5, phone: 2.32 }

export default function ScrollHero() {
  const pinned = useRef<HTMLDivElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const canvasHost = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  const headingShown = useRef<boolean | null>(null)
  const [visible, setVisible] = useState<[boolean, boolean, boolean]>([false, false, false])
  const [videoReady, setVideoReady] = useState(false)

  // Heading shows only at the very top (scene progress <= 3.5%); the scroll cue follows 1s later.
  const showHeading = (show: boolean) => {
    if (show === headingShown.current) return
    headingShown.current = show
    const h = heading.current
    const c = cue.current
    if (show) {
      if (h) {
        gsap.killTweensOf(h, 'autoAlpha')
        gsap.set(h, { autoAlpha: 1 })
      }
      if (c) {
        gsap.killTweensOf(c, 'autoAlpha')
        gsap.to(c, { autoAlpha: 1, duration: 0.25, delay: 1, overwrite: 'auto' })
      }
    } else {
      if (h) {
        gsap.killTweensOf(h, 'autoAlpha')
        gsap.to(h, { autoAlpha: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
      }
      if (c) {
        gsap.killTweensOf(c, 'autoAlpha')
        gsap.to(c, { autoAlpha: 0, duration: 0.25, overwrite: 'auto' })
      }
    }
  }

  useEffect(() => {
    if (!canvasHost.current) return
    const scene = createHeroScene(canvasHost.current, {
      videoSrc: heroVideo,
      onSectionChange: (v) => setVisible(v),
      onHeadingChange: showHeading,
      onVideoReady: () => setVideoReady(true),
    })
    return () => scene.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!pinned.current || !parallax.current) return
    const length = () =>
      window.innerHeight * (matchMedia('(max-width: 768px)').matches ? PIN_LENGTH.phone : PIN_LENGTH.desktop)
    const tl = gsap.timeline({ paused: true })
    tl.set(parallax.current, { yPercent: 0 }, 0).to(parallax.current, { yPercent: -10, duration: 0.2, ease: 'power2.inOut' }, 0.8)
    const st = ScrollTrigger.create({
      trigger: pinned.current,
      start: 'top top',
      end: () => length(),
      pin: true,
      pinSpacing: false,
      scrub: true,
      animation: tl,
      invalidateOnRefresh: true,
    })
    const id = requestAnimationFrame(() => requestAnimationFrame(() => st.refresh()))
    return () => {
      cancelAnimationFrame(id)
      st.kill()
      tl.kill()
    }
  }, [])

  const anyVisible = (i: number) => visible.some((v, k) => v && k !== i)

  return (
    <div className="HomeHero relative left-0 top-0 -mt-[var(--header-height)] h-[450dvh] min-h-dvh w-full bg-bg max-md:h-[232dvh]">
      <div ref={pinned} className="h-dvh w-full">
        <div ref={parallax} className="absolute left-0 top-0 h-dvh w-full">
          {/* WebGL scene, faded in once the video has its first frames */}
          <div
            className="absolute inset-0 z-[1] transition-opacity duration-1000 ease-out"
            style={{ opacity: videoReady ? 1 : 0 }}
          >
            <div ref={canvasHost} className="absolute inset-0 h-dvh w-full" style={{ touchAction: 'none' }} />
          </div>

          {/* Black frame shown until the video is ready */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] select-none transition-opacity duration-1000 ease-out"
            style={{ opacity: videoReady ? 0 : 1 }}
          >
            <div className="absolute bottom-6 left-6 right-6 top-[88px] overflow-hidden rounded-2xl bg-black max-md:bottom-4 max-md:left-4 max-md:right-4 max-md:top-[72px] md:max-[1449px]:bottom-[18px] md:max-[1449px]:left-[18px] md:max-[1449px]:right-[18px] md:max-[1449px]:top-[75px]" />
          </div>

          {/* Opening heading */}
          <section className="absolute left-0 top-0 z-10 flex min-h-dvh w-full flex-col items-center px-8 py-16 max-md:justify-start max-md:pt-[45dvh] md:justify-center md:max-[1449px]:justify-start md:max-[1449px]:pt-[50dvh] lg:px-16 min-[1450px]:justify-center">
            <div ref={heading} className="flex w-full max-w-6xl flex-col items-center justify-center">
              <h1 className="w-full text-center font-display text-hero font-light text-balance text-white">
                {heroHeading}
              </h1>
            </div>
          </section>

          {heroStages.map((stage, i) => (
            <PullApart
              key={stage.title}
              index={i as 0 | 1 | 2}
              stage={stage}
              visible={visible[i]}
              otherVisible={anyVisible(i)}
              isLast={i === heroStages.length - 1}
            />
          ))}

          {/* Scroll cue */}
          <div
            ref={cue}
            className="invisible absolute bottom-[72px] right-[72px] z-10 opacity-0 max-md:bottom-10 max-md:right-10 md:max-[1449px]:bottom-[54px] md:max-[1449px]:right-[54px]"
          >
            <div className="flex items-center gap-4 text-center text-white" aria-label="Scroll to explore">
              <p className="hidden text-[0.875rem] font-medium leading-none tracking-wide md:block">Scroll to explore</p>
              <div className="flex aspect-square items-center justify-center rounded-sm border border-white p-2">
                <div className="h-4 w-4 overflow-hidden">
                  <svg className="size-4 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0-7-7m7 7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
