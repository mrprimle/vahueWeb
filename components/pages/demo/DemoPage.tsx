'use client'

// https://scale.com/demo. Page body from the RSC payload; 721992 StaticForm in DemoForm.tsx, 659050 DemoQuoteSidebar below (chunk 0_fm2xcv8_y2d.js).
import { useEffect, useRef } from 'react'
import { gsap } from '@/components/site/lib/gsap'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { AnimatedText, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { DemoForm } from './DemoForm'
import type { DemoContent, DemoLogo } from './types'

function Logo({ logo }: { logo: DemoLogo }) {
  const box = { width: `${logo.displayWidth}px`, height: `${logo.displayHeight}px` }
  if (logo.src) {
    const mask = `url(${logo.src}) center / contain no-repeat`
    return <span aria-label={logo.alt} role="img" className="block bg-scale-gray-10" style={{ ...box, WebkitMask: mask, mask }} />
  }
  return (
    <span aria-label={logo.alt} role="img" className="flex items-center justify-center rounded-sm border border-black/30 text-[10px] leading-none text-black/50" style={box}>
      {logo.alt}
    </span>
  )
}

function DemoQuoteSidebar({ sidebar }: { sidebar: DemoContent['sidebar'] }) {
  const root = useRef<HTMLDivElement>(null)
  const quote = useRef<AnimatedTextHandle>(null)
  const who = useRef<AnimatedTextHandle>(null)
  const logos = useRef<HTMLDivElement>(null)
  const rows = [sidebar.logos.slice(0, 4), sidebar.logos.slice(4)]

  useEffect(() => {
    if (logos.current) gsap.set(logos.current.querySelectorAll('span[role="img"]'), { opacity: 0, y: 8 })
  }, [])

  useInViewTrigger(root, {
    start: 'top 85%',
    onEnter: async () => {
      if (quote.current) {
        await quote.current.ready()
        quote.current.animateIn({ delay: 0 })
      }
      if (who.current) {
        await who.current.ready()
        who.current.animateIn({ delay: 0.15 })
      }
      if (logos.current) {
        gsap.to(logos.current.querySelectorAll('span[role="img"]'), { opacity: 1, y: 0, stagger: 0.06, delay: 0.3, duration: 0.5, ease: 'power2.out' })
      }
    },
  })

  return (
    <div ref={root} className="flex flex-col justify-start gap-8 rounded-2xl bg-cloud-slate p-8 md:p-10">
      <blockquote className="relative">
        <span aria-hidden className="absolute -left-4 top-0 font-serif text-3xl leading-none text-black/30">
          “
        </span>
        <AnimatedText ref={quote} tagName="p" className="header5-regular text-scale-gray-10 leading-snug" type="lines">
          {sidebar.quote}
          <span aria-hidden className="ml-0.5 font-serif text-black/30">
            ”
          </span>
        </AnimatedText>
      </blockquote>
      <AnimatedText ref={who} tagName="div" type="lines">
        <p className="body3 text-scale-gray-10 font-medium">{sidebar.name}</p>
        <p className="body3 text-black/50">{sidebar.position}</p>
      </AnimatedText>
      <hr className="h-px border-0 bg-black/15" />
      <p className="detail-mono text-black/50 text-center max-sm:px-1">{sidebar.trustedBy}</p>
      <div ref={logos} className="flex flex-col items-center gap-8">
        {rows.map((row, i) => (
          <div key={i} className={`grid w-full max-w-[480px] place-items-center gap-x-4 gap-y-6 ${i === 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
            {row.map((logo, j) => (
              <span key={`${logo.alt}-${j}`} className="flex h-10 w-[96px] shrink-0 items-center justify-center">
                <Logo logo={logo} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DemoPage({ content }: { content: DemoContent }) {
  return (
    <div className="min-h-screen bg-white">
      <PageThemeSetter theme="light" />
      <section className="pt-24! py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
            <div className="flex flex-col gap-10 p-2 md:p-4">
              <div className="flex flex-col gap-3">
                <h1 className="header3-regular text-scale-gray-10">{content.heading}</h1>
                <p className="body2-regular text-scale-gray-30">{content.intro}</p>
              </div>
              <DemoForm form={content.form} />
            </div>
            <DemoQuoteSidebar sidebar={content.sidebar} />
          </div>
        </div>
      </section>
      <SectionThemeWatcher />
    </div>
  )
}
