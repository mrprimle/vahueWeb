'use client'

// Scale module 677838 (chunk 0sni47mcvnqwg.js): pinned hero, WebGL scene and the three pull-apart text blocks.
import { useLenis } from 'lenis/react'
import { ArrowDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import { cn } from '@/components/site/lib/cn'
import { gsap, ScrollTrigger } from '@/components/site/lib/gsap'
import { useTheme, useThemeStore } from '@/components/site/lib/themeStore'
import { useMediaQuery } from '@/components/site/lib/useMediaQuery'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedFlatCta, type AnimatedFlatCtaHandle } from '@/components/site/shared/AnimatedFlatCta'
import { AnimatedText, softRiseAnimation, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { LogoTile } from '@/components/site/shared/LogoMarquee'
import { RichText } from '@/components/site/shared/RichText'
import type { HeroLogo, HomeContent, PullApartItem } from './content.types'
import styles from './HomeHero.module.css'
import { useHomeHeroStore } from './homeHeroStore'

const CTA_SIZE = {
  className: '!h-11 !min-h-11 !max-h-11',
  contentInsetClassName: 'pl-4 pr-1 py-1.5',
  contentGapClassName: 'gap-1.5',
  contentRowClassName: 'justify-start',
  arrowBoxClassName: 'h-8 w-8 py-2 pl-2 pr-0',
}

const SceneCanvas = dynamic(() => import('./HomeHeroCanvas'), { ssr: false, loading: () => null })

// Scale module 964254: logo drawn as a mask in currentColor. A logo without an image becomes a neutral tile at the same box.
function PullApartLogo({ logo }: { logo: HeroLogo }) {
  if (!logo.path)
    return <LogoTile label={logo.alt} className="pull-apart-logo shrink-0" style={{ width: logo.width, height: logo.height }} aria-hidden />
  return (
    <div
      className="pull-apart-logo inline-block h-full"
      style={{
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url("${logo.path}")`,
        maskImage: `url("${logo.path}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.path} alt={logo.alt} className="opacity-0 pointer-events-none" style={{ width: 'auto', height: 'auto', maxWidth: 68, maxHeight: 30 }} />
    </div>
  )
}

function PullApartContent({
  index,
  category,
  title,
  body,
  cta,
  logos,
  isLastPullApart = false,
}: PullApartItem & { index: number; isLastPullApart?: boolean }) {
  const logosEl = useRef<HTMLDivElement>(null)
  const titleRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const categoryRef = useRef<AnimatedTextHandle>(null)
  const ctaRef = useRef<AnimatedFlatCtaHandle>(null)
  const logosTween = useRef<gsap.core.Tween | null>(null)
  const logosDelay = useRef<gsap.core.Tween | null>(null)
  const visibleRef = useRef(false)
  const generation = useRef(0)
  const contentEl = useRef<HTMLDivElement>(null)
  const visible = useHomeHeroStore((s) => s.sectionVisibleByIndex[index] === true)
  const root = useRef<HTMLDivElement>(null)
  const lingering = useRef(false)
  const faded = useRef(false)
  const lingerTimer = useRef<gsap.core.Tween | null>(null)
  const wasVisible = useRef(visible)
  const drift = useRef({ v: 0 })
  const driftTween = useRef<gsap.core.Tween | null>(null)
  const scrollShift = useRef(0)
  const lastScroll = useRef<number | null>(null)
  const prevScroll = useRef<number | null>(null)
  const scrollingUp = useRef(false)

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])
  useEffect(
    () => () => {
      lingerTimer.current?.kill?.()
      lingerTimer.current = null
      driftTween.current?.kill?.()
      driftTween.current = null
      logosDelay.current?.kill?.()
      logosDelay.current = null
    },
    [],
  )
  useEffect(
    () =>
      useHomeHeroStore.subscribe(() => {
        if (!lingering.current || faded.current) return
        const s = useHomeHeroStore.getState()
        if (s.sectionVisibleByIndex[index] === true) return
        const other = Object.entries(s.sectionVisibleByIndex).some(([k, v]) => v === true && Number(k) !== index)
        const el = root.current
        if (other && el) {
          faded.current = true
          gsap.killTweensOf(el, 'autoAlpha')
          gsap.to(el, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
        }
      }),
    [index],
  )
  const applyDrift = useCallback(() => {
    const el = root.current
    if (el) gsap.set(el, { y: drift.current.v + scrollShift.current })
  }, [])
  useLenis(
    (l) => {
      const scroll = l.scroll
      const prev = prevScroll.current
      if (prev !== null) scrollingUp.current = scroll < prev
      prevScroll.current = scroll
      if (visibleRef.current) {
        lastScroll.current = l.scroll
        return
      }
      if (!lingering.current) return
      const last = lastScroll.current
      if (last !== null) scrollShift.current -= (scroll - last) * 0.25
      lastScroll.current = scroll
      applyDrift()
    },
    [applyDrift],
  )
  const logoEls = useCallback(() => gsap.utils.toArray<HTMLElement>(logosEl.current?.querySelectorAll('.pull-apart-logo') ?? []), [])
  const hasCta = !!(cta?.text && cta.url)
  const animateIn = useCallback(() => {
    generation.current += 1
    const current = generation.current
    const speed = window.matchMedia('(max-width: 767px)').matches ? 1.4 : 1
    const back = isLastPullApart && scrollingUp.current ? 1.35 : 1
    categoryRef.current?.animateIn({ duration: 0.8 / speed / back, delay: 0.1 / speed / back })
    titleRef.current?.animateIn({ duration: 0.8 / speed / back, delay: 0.3 / speed / back })
    const bodyHandle = bodyRef.current
    const bodyDelay = 0.5 / speed / back
    const bodyDur = 1.8 / speed / back
    const afterBody = bodyDelay + bodyDur
    logosDelay.current?.kill?.()
    logosDelay.current = null
    const els = logoEls()
    logosTween.current?.kill()
    logosTween.current = null
    if (els.length) gsap.killTweensOf(els)
    const ctaAt = 1.3 / speed / back
    ctaRef.current?.animateIn({ duration: 0.85 / speed / back, delay: ctaAt })
    const queueLogos = (delay: number) => {
      logosDelay.current?.kill?.()
      logosDelay.current = null
      logosDelay.current = gsap.delayedCall(delay, () => {
        logosDelay.current = null
        if (!visibleRef.current || current !== generation.current) return
        const list = logoEls()
        if (list.length) {
          gsap.killTweensOf(list)
          logosTween.current = gsap.fromTo(
            list,
            { autoAlpha: 0, scale: 1.15, y: 0 },
            { autoAlpha: 1, scale: 1, duration: 0.65 / speed / back, stagger: 0.08 / speed / back, ease: 'power2.out', delay: 0, overwrite: 'auto' },
          )
        }
      })
    }
    if (bodyHandle) {
      bodyHandle.ready().then(() => {
        if (visibleRef.current && current === generation.current) {
          bodyHandle.animateIn({ duration: bodyDur, delay: bodyDelay })
          queueLogos(afterBody)
        }
      })
    } else queueLogos(index === 0 ? (hasCta ? ctaAt : 0.55 / speed / back) : 0.45 / speed / back)
  }, [logoEls, isLastPullApart, hasCta, index])
  const reset = useCallback(() => {
    driftTween.current?.kill()
    driftTween.current = null
    drift.current.v = 0
    scrollShift.current = 0
    lastScroll.current = null
    gsap.set(root.current, { y: 0, autoAlpha: +!!visibleRef.current })
    ctaRef.current?.animateSet()
    const els = logoEls()
    if (els.length) gsap.set(els, { autoAlpha: 0, scale: 1.15, y: 0 })
  }, [logoEls])
  const animateOut = useCallback(() => {
    generation.current += 1
    driftTween.current?.kill()
    drift.current.v = 0
    scrollShift.current = 0
    lastScroll.current = null
    driftTween.current = gsap.to(drift.current, { v: 25, duration: 0.9, ease: 'power2.out', overwrite: 'auto', onUpdate: applyDrift })
    categoryRef.current?.animateOut()
    titleRef.current?.animateOut({ delay: 0.1, variant: index === 0 ? 'fadeOutSimple' : 'default' })
    bodyRef.current?.animateOut({ delay: 0.2, variant: index === 0 ? 'fadeOutSimple' : 'default' })
    const els = logoEls()
    logosDelay.current?.kill?.()
    logosDelay.current = null
    logosTween.current?.kill()
    logosTween.current = null
    if (els.length) gsap.killTweensOf(els)
    ctaRef.current?.animateOut({ delay: 0.3 })
    if (els.length) gsap.to(els, { autoAlpha: 0, y: -6, duration: 0.22, delay: 0.4, stagger: { each: 0.04, from: 'end' }, ease: 'power2.out', overwrite: 'auto' })
  }, [logoEls, index, applyDrift])
  useEffect(() => {
    const was = wasVisible.current
    wasVisible.current = visible
    if (!visible) {
      if (was) {
        lingering.current = true
        faded.current = false
        lingerTimer.current?.kill?.()
        lingerTimer.current = gsap.delayedCall(2, () => {
          lingering.current = false
          lingerTimer.current = null
        })
        animateOut()
      }
      return
    }
    lingerTimer.current?.kill?.()
    lingerTimer.current = null
    lingering.current = false
    faded.current = false
    const el = root.current
    if (el) {
      driftTween.current?.kill()
      driftTween.current = null
      drift.current.v = 0
      scrollShift.current = 0
      lastScroll.current = null
      gsap.killTweensOf(el)
      gsap.set(el, { y: 0, autoAlpha: 1 })
    }
    let cancelled = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) animateIn()
      })
    })
    return () => {
      cancelled = true
    }
  }, [visible, animateIn, animateOut])
  useEffect(() => {
    reset()
  }, [reset])
  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)')
    const xl = window.matchMedia('(min-width: 1450px)')
    const reflow = () => {
      if (!visibleRef.current) return
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!visibleRef.current) return
          categoryRef.current?.reflowLayout?.()
          titleRef.current?.reflowLayout?.()
          bodyRef.current?.reflowLayout?.()
        })
      })
    }
    md.addEventListener('change', reflow)
    xl.addEventListener('change', reflow)
    return () => {
      md.removeEventListener('change', reflow)
      xl.removeEventListener('change', reflow)
    }
  }, [])

  const align = cn('max-md:items-start max-md:pt-[45dvh]', 'md:max-3xl:items-start md:max-3xl:pt-[50dvh]', 'oml:items-center', index === 0 ? '3xl:items-end' : '3xl:items-center')
  const column = 'col-span-8 md:max-3xl:col-span-6 md:max-3xl:col-start-2 md:max-3xl:justify-self-center'
  const stack = 'flex min-w-0 flex-col gap-0 md:gap-6 3xl:gap-4'
  const side = `${stack} md:max-3xl:py-0 3xl:py-12`
  const center = `${stack} max-md:py-10 md:py-12 3xl:py-24`
  const left = `${column} 3xl:col-start-2 3xl:col-span-3 ${side} items-start text-center 3xl:text-left`
  const right = `${column} 3xl:col-start-9 3xl:col-span-3 ${side} items-start text-center 3xl:text-left`
  const placement = index === 0 ? `${column} 3xl:col-start-5 3xl:col-span-4 ${center} items-center text-center` : index === 1 ? left : index === 2 ? right : index % 2 === 0 ? left : right
  const logoJustify = index === 0 ? 'justify-center' : 'justify-start'
  const textAlign = index === 0 ? undefined : 'w-full text-center 3xl:text-left'
  const hasLogos = !!(logos && logos.length > 0)
  const hidden = !visible && !wasVisible.current
  return (
    <div
      ref={root}
      className={cn(
        'PullApartContent pb-0 perspective-midrange absolute left-0 top-0 h-dvh w-full grid-layout-mobile 3xl:grid-layout-desktop md:top-auto md:bottom-0 md:max-3xl:top-0 md:max-3xl:bottom-auto 3xl:top-0 3xl:bottom-auto',
        align,
        visible ? 'pointer-events-auto' : 'pointer-events-none',
        hidden && 'opacity-0 invisible',
      )}
      style={{ zIndex: 10 + index }}
      aria-hidden={!visible}
    >
      {index === 0 ? <div className="mobileSpacer hidden" aria-hidden /> : null}
      <div ref={contentEl} className={placement}>
        {category ? (
          <AnimatedText ref={categoryRef} tagName="h2" className={cn(styles.category, 'text-[10px] text-scale-gray-60 uppercase font-mono pb-0 max-md:mb-6 md:mb-0 md:text-[11px] 3xl:pb-6', textAlign)}>
            {category}
          </AnimatedText>
        ) : null}
        <div className="flex min-w-0 w-full flex-col gap-[15px] max-md:mb-6 md:mb-0">
          <RichText value={title} animatedTextRef={titleRef} animatedTextClassName={cn('header4-regular text-balance text-white leading-[1.1875]', textAlign)} />
          <RichText
            value={body}
            animatedTextRef={bodyRef}
            animatedTextClassName={cn('body1 text-balance text-scale-gray-80 leading-[1.43] text-[14px]', textAlign)}
            contentKey={`pull-apart-body-${index}`}
            customAnimation={softRiseAnimation}
          />
        </div>
        {hasCta || hasLogos ? (
          <div className={cn('flex min-w-0 w-full flex-col gap-10 oml:gap-3 md:gap-[50px]', index === 0 ? 'items-center' : 'items-start')}>
            {hasCta ? (
              <div className="max-w-full w-fit mx-auto 3xl:mx-0 pt-0 3xl:pt-6">
                <AnimatedFlatCta ref={ctaRef} href={cta!.url} text={cta!.text} variant="arrow" theme="evergreen" introAnimation="filledEvergreenArrow" {...CTA_SIZE} />
              </div>
            ) : null}
            {hasLogos ? (
              <div
                ref={logosEl}
                className={cn('relative self-center 3xl:self-start flex items-center max-h-12 flex-wrap gap-x-6 gap-y-2 pt-0 pb-12 3xl:pb-0 text-scale-gray-60', !hasCta && '3xl:pt-12', logoJustify)}
              >
                {logos!.map((l) => (
                  <PullApartLogo logo={l} key={l._id} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function HomeHero({ content, className }: { content: HomeContent['hero']; className?: string }) {
  preload(content.video, { as: 'video', type: 'video/mp4' })
  const [fallbackShown, setFallbackShown] = useState(true)
  const [sceneShown, setSceneShown] = useState(false)
  const [mounted, setMounted] = useState(true)
  const [mountKey, setMountKey] = useState(0)
  const headingWrap = useRef<HTMLDivElement>(null)
  const shown = useRef(false)
  const pinEl = useRef<(HTMLDivElement & { getEnd?: () => number }) | null>(null)
  const parallaxEl = useRef<HTMLDivElement>(null)
  const pinRange = useRef<[number, number, string]>([4.55, 4.5, '450dvh'])
  useMediaQuery('(max-width: 768px)', undefined, (m) => {
    pinRange.current = m ? [2.35, 2.32, '232dvh'] : [4.55, 4.5, '450dvh']
    if (pinEl.current) pinEl.current.getEnd = () => window.innerHeight * pinRange.current[1]
  })
  const { setTheme } = useTheme()
  const hint = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const show = (e?: PageTransitionEvent) => {
      setMounted(true)
      if (e?.persisted) setMountKey((k) => k + 1)
    }
    show()
    window.addEventListener('pageshow', show)
    return () => window.removeEventListener('pageshow', show)
  }, [])
  useEffect(() => {
    const el = headingWrap.current
    useHomeHeroStore.getState().resetSectionVisibility()
    const apply = (show: boolean) => {
      if (show === shown.current) return
      shown.current = show
      const wrap = headingWrap.current
      if (show) {
        if (wrap) {
          gsap.killTweensOf(wrap, 'autoAlpha')
          gsap.set(wrap, { autoAlpha: 1 })
        }
        if (hint.current) {
          gsap.killTweensOf(hint.current, 'autoAlpha')
          gsap.to(hint.current, { autoAlpha: 1, duration: 0.25, delay: 1, overwrite: 'auto' })
        }
      } else {
        if (wrap) {
          gsap.killTweensOf(wrap, 'autoAlpha')
          gsap.to(wrap, { autoAlpha: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
        }
        if (hint.current) {
          gsap.killTweensOf(hint.current, 'autoAlpha')
          gsap.to(hint.current, { autoAlpha: 0, duration: 0.25, overwrite: 'auto' })
        }
      }
    }
    const unsubscribe = useHomeHeroStore.subscribe((s) => apply(s.showHeading))
    if (window.scrollY < 50) useHomeHeroStore.getState().fireHomeHeroHeadingIntro(true)
    else apply(useHomeHeroStore.getState().showHeading)
    const hintEl = hint.current
    return () => {
      useHomeHeroStore.getState().fireHomeHeroHeadingIntro(false)
      useHomeHeroStore.getState().resetSectionVisibility()
      unsubscribe()
      if (el) gsap.killTweensOf(el, 'autoAlpha')
      if (hintEl) gsap.killTweensOf(hintEl, 'autoAlpha')
    }
  }, [])
  useEffect(() => {
    let limit = 4.55 * window.innerHeight
    const onResize = () => {
      limit = 4.55 * window.innerHeight
      if (pinEl.current) pinEl.current.getEnd = () => window.innerHeight * pinRange.current[1]
    }
    const onScroll = ({ scroll, direction }: { scroll: number; direction: number }) => {
      if (scroll > limit) return
      const theme = useThemeStore.getState().pageTheme
      if (scroll > 350 && direction > 0 && theme === 'light') useThemeStore.getState().setPageThemeImmediate('dark')
      else if (scroll < 350 && direction < 0 && theme === 'dark') useThemeStore.getState().setPageThemeImmediate('light')
      else if (scroll > 350 && direction < 0 && theme === 'light') useThemeStore.getState().setPageThemeImmediate('dark')
    }
    lenis?.on('scroll', onScroll)
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      lenis?.off('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [lenis])
  useEffect(() => {
    setTheme('light')
  }, [setTheme])
  useEffect(() => {
    let done = false
    let interval: number | null = null
    let raf1: number | null = null
    let raf2: number | null = null
    const cancelRafs = () => {
      if (raf1 !== null) {
        window.cancelAnimationFrame(raf1)
        raf1 = null
      }
      if (raf2 !== null) {
        window.cancelAnimationFrame(raf2)
        raf2 = null
      }
    }
    const reveal = () => {
      if (interval !== null) {
        window.clearInterval(interval)
        interval = null
      }
      cancelRafs()
      raf1 = window.requestAnimationFrame(() => {
        raf1 = null
        raf2 = window.requestAnimationFrame(() => {
          raf2 = null
          if (!done) {
            setSceneShown(true)
            setFallbackShown(false)
          }
        })
      })
    }
    const check = () => {
      let video: HTMLVideoElement | undefined
      const ready =
        window.__homeHeroVideoTextureReady ||
        ((video = Array.from(document.querySelectorAll('video')).find((v) => (v.currentSrc || v.src).includes(content.video))),
        video && (video.play?.().catch(() => {}), video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && video.currentTime >= 0.08))
      if (ready) reveal()
      else {
        cancelRafs()
        if (!done) {
          setSceneShown(false)
          setFallbackShown(true)
        }
      }
    }
    const recheck = () => check()
    check()
    if (!window.__homeHeroVideoTextureReady) interval = window.setInterval(check, 100)
    window.addEventListener('homeHeroVideoTextureReady', reveal, { once: true })
    window.addEventListener('pageshow', recheck)
    document.addEventListener('visibilitychange', recheck)
    return () => {
      done = true
      if (interval !== null) window.clearInterval(interval)
      cancelRafs()
      window.removeEventListener('homeHeroVideoTextureReady', reveal)
      window.removeEventListener('pageshow', recheck)
      document.removeEventListener('visibilitychange', recheck)
    }
  }, [content.video])
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [])
  useEffect(() => {
    // Scale's loader store defaults to animatingEnd: true, so the intro call runs once on mount.
    if (!mounted) return
    void import('./homeHeroScene').then(({ playHomeHeroIntro }) => playHomeHeroIntro({ skipImageZoom: true }))
  }, [mounted])
  useScrubTrigger(pinEl, {
    start: 'top top',
    setupTimeline: (tl) => {
      const el = parallaxEl.current
      tl.set(el, { yPercent: 0 }, 0)
      tl.to(el, { yPercent: -10, duration: 0.2, ease: 'power2.inOut' }, 0.8)
    },
    pin: true,
    pinSpacing: false,
  })
  return (
    <div className={cn('HomeHero relative top-0 left-0 h-[450dvh] w-full min-h-dvh bg-white max-md:h-[232dvh]', className)}>
      <div ref={pinEl} className="w-full h-dvh">
        <div ref={parallaxEl} className="absolute top-0 left-0 w-full parallaxOut h-dvh">
          <div className="absolute inset-0 z-1 transition-opacity duration-1000 ease-out" style={{ opacity: +!!sceneShown }}>
            {mounted ? <SceneCanvas assets={{ video: content.video, ...content.textures }} key={mountKey} /> : null}
          </div>
          <div className="absolute inset-0 z-[2] pointer-events-none select-none transition-opacity duration-1000 ease-out" style={{ opacity: +!!fallbackShown }} aria-hidden>
            <div
              className={cn(
                'absolute overflow-hidden rounded-2xl bg-black',
                'top-[88px] bottom-6 left-6 right-6',
                'md:max-3xl:top-[88px] md:max-3xl:bottom-[18px] md:max-3xl:left-[18px] md:max-3xl:right-[18px]',
                'max-md:top-[72px] max-md:bottom-4 max-md:left-4 max-md:right-4',
              )}
            />
          </div>
          <section className="absolute top-0 left-0 z-10 flex min-h-dvh w-full flex-col items-center px-8 py-16 max-md:justify-start max-md:pt-[45dvh] md:max-3xl:justify-start md:max-3xl:pt-[50dvh] md:justify-center 3xl:justify-center lg:px-16">
            <div ref={headingWrap} className="max-w-6xl w-full flex flex-col items-center justify-center">
              <h2 className="w-full text-center text-white header2 oml:header3-regular">{content.headline}</h2>
            </div>
          </section>
          {content.items.map((item, i) => (
            <PullApartContent {...item} index={i} isLastPullApart={i === content.items.length - 1} key={item._key} />
          ))}
          <div ref={hint} className="absolute bottom-[72px] right-[72px] z-10 invisible opacity-0 md:max-3xl:bottom-[54px] md:max-3xl:right-[54px] max-md:bottom-10 max-md:right-10">
            <div className="flex items-center gap-4 text-center text-white" aria-label={content.scrollHint}>
              <p className="hidden font-medium tracking-wide body3 leading-none md:block">{content.scrollHint}</p>
              <div className="flex items-center justify-center p-2 border border-white rounded-sm aspect-square">
                <div className="w-4 h-4 overflow-hidden">
                  <ArrowDown className="size-4 shrink-0 text-white" strokeWidth={2} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
