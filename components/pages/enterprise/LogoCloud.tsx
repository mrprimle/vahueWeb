'use client'

// Scale module 151755 (LogoCloud slice). Its category buttons are built from an empty list on Scale, so none render.
import { useMemo, useRef } from 'react'
import { useInViewTrigger } from '@/components/site/lib/useInViewTrigger'
import { useScrubTrigger } from '@/components/site/lib/useScrubTrigger'
import { HeadlineWithCta, type HeadlineWithCtaHandle } from '@/components/site/shared/HeadlineWithCta'
import { ThreeCanvas } from '@/components/site/shared/ThreeCanvas'
import { createLogoSphereScene, useLogoSphereStore } from './logoSphereScene'
import type { EnterpriseContent } from './types'

export function LogoCloud({ content: c }: { content: EnterpriseContent['logoCloud'] }) {
  const root = useRef<HTMLDivElement>(null)
  const headline = useRef<HeadlineWithCtaHandle>(null)
  const scene = useMemo(() => createLogoSphereScene(c.logos), [c.logos])
  useInViewTrigger(root, {
    start: 'top bottom',
    end: 'top center',
    onEnter: () => headline.current?.animateIn(),
  })
  useScrubTrigger(root, {
    start: 'top bottom',
    end: 'top center',
    onUpdate: (self) => useLogoSphereStore.getState().setScrollProgress(self.progress),
  })
  return (
    <div ref={root} className="LogoCloud grid-layout-mobile sm:grid-layout-desktop bg-scale-gray-90 text-black h-[90vh] oml:h-screen">
      <div className="relative flex items-center justify-center col-span-8 col-start-1 sm:col-span-12 md:col-span-6 md:col-start-2 md:row-start-1 oml:col-span-5 oml:col-start-2 oml:row-start-1">
        <div className="flex h-[92%] md:h-full w-full flex-col gap-4 justify-center items-center oml:pb-4">
          <ThreeCanvas className="relative w-screen h-full md:w-full" scene={scene} />
        </div>
      </div>
      <div className="relative col-span-8 col-start-1 sm:col-span-12 md:col-span-4 md:col-start-8 md:row-start-1 oml:col-span-5 oml:col-start-7 oml:row-start-1">
        <div className="flex flex-col items-center justify-center w-full h-auto gap-4 md:h-full oml:h-full">
          <HeadlineWithCta ref={headline} headline={c.headline} width="w-full" padding={false} headerClass="md:header3-regular text-[1.5rem] text-balance leading-none" />
          <div className="flex flex-wrap gap-2 md:w-[72%] justify-center oml:w-[72%]" />
        </div>
      </div>
    </div>
  )
}
