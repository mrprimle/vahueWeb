'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRefreshOnPageGrow } from '@/lib/useRefreshOnPageGrow'
import { setScaleNavTheme } from '../shared/header/navTheme'
import Applications from './Applications'
import BenchmarkGrid from './BenchmarkGrid'
import BlogPreview from './BlogPreview'
import HomeHero from './HomeHero'
import ScrollingQuote from './ScrollingQuote'
import VideoCta from './VideoCta'
import type { HomeContent, HomeMedia } from './content'
import s from './home.module.css'

/*
 * scale.com homepage layout, driven by `content` + `media` (see content.ts). Spec: reference-snapshots/scale-clone/home.md.
 * Order (RSC slices): homeHeroSlice -> scrollingQuote -> applications (with fullWidthCardCarousel) -> ScrollRevealSection > CardGrid
 * -> blogPreview -> videoCta. Scale's colours, the page's own fonts.
 * Header: HomeHero's Lenis rule (dark past 350px) plus SectionThemeTracker (ScrollingQuote registers as dark); light from the
 * Applications section on.
 */
export default function HomePage({ content, media }: { content: HomeContent; media?: HomeMedia }) {
  useRefreshOnPageGrow()
  const heroDark = useRef(false)
  const next = useRef<HTMLDivElement>(null)
  const apply = useCallback(() => {
    const el = next.current
    const y = scrollY + 35
    const beforeApps = el ? y < el.getBoundingClientRect().top + scrollY : true
    setScaleNavTheme(heroDark.current && beforeApps ? 'dark' : null)
  }, [])
  const onDark = useCallback((d: boolean) => {
    heroDark.current = d
    apply()
  }, [apply])
  useEffect(() => {
    window.addEventListener('scroll', apply, { passive: true })
    apply()
    return () => {
      window.removeEventListener('scroll', apply)
      setScaleNavTheme(null)
    }
  }, [apply])
  return (
    <div className={`${s.root} HomePage overflow-x-clip font-display`}>
      <div className="CMSSliceRenderer rootPageRenderer relative">
        <HomeHero content={content.hero} media={media} onDarkChange={onDark} />
        <ScrollingQuote text={content.quote.text} media={media?.quote} />
        <div ref={next}>
          <Applications content={content.applications} />
        </div>
        <BenchmarkGrid content={content.benchmark} />
        <BlogPreview heading={content.blog.heading} posts={content.blog.posts} />
        <VideoCta content={content.prefooter} media={media?.prefooter} />
      </div>
    </div>
  )
}
