'use client'

// Scale module 857484.
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { cn } from '../lib/cn'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'
import { ClipScrollSection } from './ClipScrollSection'
import { ResponsiveVideo } from './ResponsiveVideo'
import { RichText, type RichBlock } from './RichText'

const nonEmpty = (v?: RichBlock[]) => !!v?.length

export type TwoColumnTextWithVideoProps = {
  theme?: string
  videoFirst?: boolean
  heading?: RichBlock[]
  leftColumn?: RichBlock[]
  rightColumn?: RichBlock[]
  video?: { url: string }
  background?: { className: string }
  cta?: { url: string; text: string }
  ctaColumn?: 'left' | 'right'
}

export function TwoColumnTextWithVideo({ theme, videoFirst = false, heading, leftColumn, rightColumn, video, background, cta, ctaColumn = 'left' }: TwoColumnTextWithVideoProps) {
  const first = !!videoFirst
  const headingRef = useRef<AnimatedTextHandle>(null)
  const leftRef = useRef<AnimatedTextHandle>(null)
  const rightRef = useRef<AnimatedTextHandle>(null)
  const ctaRef = useRef<AnimatedTextHandle>(null)
  const root = useRef<HTMLElement>(null)
  const onEnter = useCallback(() => {
    headingRef.current?.animateIn({ delay: 0.35 })
    leftRef.current?.animateIn({ delay: 0.45 })
    rightRef.current?.animateIn({ delay: 0.45 })
    ctaRef.current?.animateIn({ delay: 0.55 })
  }, [])
  useInViewTrigger(root, { onEnter })
  const videoCls = 'relative aspect-video w-full md:min-h-0'
  const mediaCls = cn('col-span-full w-full overflow-clip rounded-2xl', first ? 'order-1 md:col-start-2 md:col-span-10' : 'order-3 md:col-start-3 md:col-span-9')
  const leftCls = first ? 'col-span-full md:col-start-2 md:col-span-5' : 'col-span-full md:col-start-3 md:col-span-4'
  const gridCls = cn('w-full py-24! grid-layout-mobile md:grid-layout-desktop oml:py-10!', first && 'sm:gap-y-5 md:gap-y-16')
  const hasHeading = nonEmpty(heading)
  const headingInside = first && hasHeading
  const leftOrder = first && headingInside ? 'order-3' : 'order-2'
  const rightOrder = first ? (headingInside ? 'order-4' : 'order-3') : 'order-1'
  const link = cta?.url ? (
    <AnimatedText ref={ctaRef} tagName="div" className="mt-6" contentKey={cta.url} noSplit={first}>
      <Link className="flex items-center gap-1 text-sm font-medium align-middle font-aeonik" href={cta.url}>
        {cta.text}
        <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
          <path d="M8.64645 3.43929C8.84171 3.63456 8.84171 3.95114 8.64645 4.1464L5.35355 7.43929C5.15829 7.63456 4.84171 7.63456 4.64645 7.43929L4.29105 7.0839C4.09579 6.88864 4.09579 6.57206 4.29105 6.37679L5.27145 5.3964C5.58643 5.08142 5.36335 4.54285 4.91789 4.54285L0.5 4.54285C0.223858 4.54285 -1.51847e-07 4.31899 -1.63918e-07 4.04285L-1.85773e-07 3.54285C-1.97844e-07 3.2667 0.223857 3.04285 0.5 3.04285L4.91789 3.04285C5.36335 3.04285 5.58643 2.50428 5.27145 2.18929L4.29105 1.2089C4.09579 1.01364 4.09579 0.697055 4.29105 0.501793L4.64645 0.1464C4.84171 -0.0488622 5.15829 -0.0488622 5.35355 0.1464L8.64645 3.43929Z" fill="#1C1B1F" />
        </svg>
      </Link>
    </AnimatedText>
  ) : null
  return (
    <section ref={root} className={cn('TwoColumnTextWithVideo relative bg-white text-black', theme && `TwoColumnTextWithVideo--${theme} relative`)}>
      {!headingInside && hasHeading ? (
        <div className="grid-layout-mobile md:grid-layout-desktop">
          <div className="py-8 col-span-full">
            <RichText value={heading!} animatedTextRef={headingRef} animatedTextClassName="w-full" blockClassNames={{ h4: 'leading-8' }} noSplit={first} />
          </div>
        </div>
      ) : null}
      <div className={cn(gridCls, background?.className)}>
        {headingInside ? (
          <div className="order-2 py-8 col-span-full md:col-start-2 md:col-span-10">
            <RichText value={heading!} animatedTextRef={headingRef} animatedTextClassName="w-full" noSplit={first} />
          </div>
        ) : null}
        <div className={cn(leftCls, leftOrder, 'pb-6', !headingInside && 'row-start-1', first && 'mt-6 md:mt-0 row-start-2')}>
          {nonEmpty(leftColumn) ? <RichText value={leftColumn!} animatedTextRef={leftRef} blockClassNames={{ h4: 'leading-9' }} animatedTextClassName="w-full" noSplit={first} /> : null}
          {ctaColumn === 'left' ? link : null}
        </div>
        <div className={cn('col-span-full md:col-start-8 md:col-span-4', rightOrder, 'pb-6')}>
          {nonEmpty(rightColumn) ? <RichText value={rightColumn!} animatedTextRef={rightRef} animatedTextClassName="w-full" /> : null}
          {ctaColumn === 'right' ? link : null}
        </div>
        {video?.url ? (
          <div className={mediaCls}>
            {first ? (
              <ClipScrollSection startPercentage={20}>
                <ResponsiveVideo asset={video} loop autoPlay muted className={videoCls} />
              </ClipScrollSection>
            ) : (
              <ResponsiveVideo asset={video} loop autoPlay muted className={videoCls} />
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
