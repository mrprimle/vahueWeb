'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText, { type AnimatedTextHandle } from './AnimatedText'
import { createLogoCloudScene } from './logoCloudScene'
import type { LogoCloudContent } from './content'

gsap.registerPlugin(ScrollTrigger)

/*
 * scale.com LogoCloud slice (chunk 0sni47mcvnqwg, module 151755): grey #EAEAEA band, h-[90vh], 12-col grid.
 * Left (cols 2-7): click-and-drag WebGL tile sphere (logoCloudScene.ts). Right (cols 8-11): headline.
 * ScrollTrigger "top bottom" -> "top center": onEnter headline animateIn; onUpdate feeds the scene's scroll progress.
 * Scale's category filter buttons are empty on this page (no categories in the CMS data), so none are rendered.
 */

export default function LogoCloud({ content: logoCloud }: { content: LogoCloudContent }) {
  const root = useRef<HTMLDivElement>(null)
  const canvasBox = useRef<HTMLDivElement>(null)
  const head = useRef<AnimatedTextHandle>(null)

  useEffect(() => {
    const scene = canvasBox.current ? createLogoCloudScene(canvasBox.current, logoCloud.tiles ?? 10) : null
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'top center',
        onEnter: () => head.current?.animateIn(),
        onUpdate: (st) => scene?.setScrollProgress(st.progress),
        onRefresh: (st) => scene?.setScrollProgress(st.progress),
      })
    })
    return () => {
      ctx.revert()
      scene?.destroy()
    }
  }, [logoCloud.tiles])

  return (
    <div ref={root} className="LogoCloud grid h-[90vh] grid-cols-8 gap-2 bg-[#EAEAEA] px-6 text-black sm:grid-cols-12">
      <div className="relative col-span-8 col-start-1 flex items-center justify-center sm:col-span-12 md:col-span-6 md:col-start-2 md:row-start-1">
        <div className="flex h-[92%] w-full flex-col items-center justify-center gap-4 md:h-full">
          <div ref={canvasBox} className="relative h-full w-screen md:w-full" style={{ touchAction: 'none' }} />
        </div>
      </div>
      <div className="relative col-span-8 col-start-1 sm:col-span-12 md:col-span-4 md:col-start-8 md:row-start-1">
        <div className="flex h-auto w-full flex-col items-center justify-center gap-4 md:h-full">
          <div className="flex w-full flex-col items-center gap-6 py-6">
            <AnimatedText
              ref={head}
              as="h3"
              maskCompensation
              className="w-full text-balance text-center text-[1.5rem] font-normal leading-none tracking-[-0.01em] text-black md:text-[40px] md:leading-[1.25]"
            >
              {logoCloud.headline}
            </AnimatedText>
          </div>
        </div>
      </div>
    </div>
  )
}
