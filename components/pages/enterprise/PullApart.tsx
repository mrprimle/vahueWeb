'use client'

// Scale module 322473: 450vh pinned WebGL section with two text beats.
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { AnimatedText, softRiseAnimation, type AnimatedTextHandle } from '@/components/site/shared/AnimatedText'
import { RichText, type RichBlock } from '@/components/site/shared/RichText'
import { ThreeCanvas } from '@/components/site/shared/ThreeCanvas'
import { createPullApartScene, usePullApartStore } from './pullApartScene'
import type { EnterpriseContent } from './types'

function Beat({ index, headline, subheading }: { index: number; headline: RichBlock[]; subheading: RichBlock[] }) {
  const title = useRef<AnimatedTextHandle>(null)
  const body = useRef<AnimatedTextHandle>(null)
  const visible = usePullApartStore((s) => s.sectionVisibleByIndex[index] === true)
  const show = useCallback(() => {
    title.current?.animateIn({ delay: 0.2 })
    body.current?.animateIn({ delay: 0.5 })
  }, [])
  const hide = useCallback(() => {
    title.current?.animateOut()
    body.current?.animateOut()
  }, [])
  useEffect(() => {
    if (visible) show()
    else hide()
  }, [visible, show, hide])
  return (
    <div className={`PullApartContent absolute ${index === 0 ? 'top-[15vh]' : 'bottom-[15vh] md:bottom-[6vh]'} grid-layout-mobile md:grid-layout-desktop text-white m-auto w-full`} aria-hidden={!visible}>
      <div className="text-center col-span-full col-span-8">
        <AnimatedText ref={title} tagName="h3" className="header3-regular pl-[12.5%] pr-[12.5%] [&_.word]:text-shadow-lg [&_.word]:text-shadow-black mb-6 md:mb-0">
          <RichText value={headline} />
        </AnimatedText>
        <AnimatedText ref={body} tagName="div" className="body1 text-scale-gray-60 [&_.word]:text-shadow-lg [&_.word]:text-shadow-black" customAnimation={softRiseAnimation}>
          <RichText value={subheading} />
        </AnimatedText>
      </div>
    </div>
  )
}

export function PullApart({ content: c }: { content: EnterpriseContent['pullApart'] }) {
  const pin = useRef<HTMLDivElement>(null)
  const parallax = useRef<HTMLDivElement>(null)
  const scene = useMemo(() => createPullApartScene({ video: c.video, logoTexture: c.logoTexture, curves: '/enterprise/pull-apart-curves.json' }), [c.video, c.logoTexture])
  useScrubTrigger(pin, {
    start: 'top top',
    end: () => `+=${4.5 * window.innerHeight}`,
    setupTimeline: (tl) => {
      tl.fromTo(parallax.current, { yPercent: 0 }, { yPercent: -25, duration: 1.5, ease: 'power2.inOut' }, 2.2)
    },
    pin: true,
    pinSpacing: false,
  })
  return (
    <div data-theme="dark" className="EnterprisePullApart relative isolate w-full h-[450vh] bg-black overflow-hidden">
      <div ref={pin} className="content relative h-screen w-full">
        <div ref={parallax} className="parallaxOut relative h-screen w-full">
          <ThreeCanvas className="relative inset-0 h-full w-full" scene={scene} />
          {c.textItems.map((t, i) => (
            <Beat key={i} index={i} headline={t.headline} subheading={t.subheading} />
          ))}
        </div>
      </div>
    </div>
  )
}
