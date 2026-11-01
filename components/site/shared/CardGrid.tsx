'use client'

// Scale modules 540409 (CardGrid + Card) and 874328 (LinkCard).
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { useInViewTrigger } from '../lib/useInViewTrigger'
import { useMediaQuery } from '../lib/useMediaQuery'
import { AnimatedText, type AnimatedTextHandle } from './AnimatedText'
import { BaseCard, CARD_HEADER2, CARD_PADDING, GRID_COLS, directionalEntrance, resolveColumns } from './BaseCard'
import { CMSLink } from './CMSLink'
import { FlatCta, type FlatCtaProps } from './FlatCta'
import { RichText, type RichBlock } from './RichText'

type CardHandle = { animateIn: (o?: { delay?: number; index?: number }) => Promise<void>; animateSet: () => void }
type IconComponent = (p: { size?: number; className?: string }) => ReactNode

type Common = {
  _key?: string
  icon?: IconComponent
  label?: string
  title?: string
  iconSize?: 'md' | 'sm'
  className?: string
  scaleDir?: 'up' | 'down' | 'none'
  scaleTransformOrigin?: string
  entranceTranslateX?: number
  staggerIndex?: number
  staggerCount?: number
  scrollTriggerEnd?: string
  fillFluidCell?: boolean
  iconBgColor?: { hex?: string }
}

export type CardData = Common & {
  _type: 'card'
  labelEnd?: string
  description?: string | RichBlock[]
  theme?: 'dark' | 'light'
  titleSize?: 'header5-regular' | 'header2' | string
  iconBgClass?: string
}

export type LinkCardData = Common & {
  _type: 'linkCard'
  description?: RichBlock[]
  link?: { url: string; text?: string }
  hoveredColor?: { tailwindClass: string; hex?: string }
  gap?: 'sm' | 'md'
  iconColor?: { hex?: string }
}

export const Card = forwardRef<CardHandle, Omit<CardData, '_type'>>(function Card(
  {
    icon,
    label,
    labelEnd,
    title,
    description,
    iconSize,
    className,
    scaleDir,
    scaleTransformOrigin,
    entranceTranslateX,
    staggerIndex,
    staggerCount,
    scrollTriggerEnd,
    theme = 'dark',
    titleSize = 'header5-regular',
    fillFluidCell = false,
    iconBgClass,
    iconBgColor,
  },
  ref,
) {
  const titleRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const done = useRef(false)
  const iconBox = useRef<HTMLDivElement>(null)
  const iconInner = useRef<HTMLSpanElement>(null)
  useImperativeHandle(ref, () => ({
    animateIn: async ({ delay = 0, index = 0 } = {}) => {
      if (done.current) return
      if (iconBox.current) gsap.to(iconBox.current, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: 0.1 * index + delay })
      if (iconInner.current) gsap.to(iconInner.current, { opacity: 1, duration: 1, ease: 'power1.out', delay: 0.1 * index + delay + 0.1 })
      const t = titleRef.current
      const b = bodyRef.current
      if (!t && !b) {
        done.current = true
        return
      }
      await Promise.all([t?.ready(), b?.ready()].filter(Boolean))
      const at = 0.1 * index + delay
      const bodyAt = at + 0.14 * Number(!!t)
      await Promise.all([t ? t.animateIn({ delay: at, duration: 2 }) : Promise.resolve(), b ? b.animateIn({ delay: bodyAt, duration: 2 }) : Promise.resolve()])
      done.current = true
    },
    animateSet: () => {
      if (iconBox.current) gsap.set(iconBox.current, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
      if (iconInner.current) gsap.set(iconInner.current, { opacity: 0 })
    },
  }))
  const size = iconSize === 'sm' ? 'w-8 h-8' : 'w-16 h-16'
  const px = iconSize === 'sm' ? 16 : 32
  const Icon = icon
  return (
    <BaseCard
      className={cn(fillFluidCell && 'flex min-h-0 flex-col flex-1', className)}
      scaleTransformOrigin={scaleTransformOrigin}
      entranceTranslateX={entranceTranslateX}
      scaleDir={scaleDir}
      staggerIndex={staggerIndex}
      staggerCount={staggerCount}
      scrollTriggerEnd={scrollTriggerEnd}
    >
      <div className={cn('Card rounded-2xl', fillFluidCell ? 'flex min-h-0 flex-1 flex-col' : 'h-full', theme === 'light' ? 'bg-scale-gray-95 text-scale-gray-10' : 'bg-white/13 text-white')}>
        <div className={cn('flex flex-col justify-between gap-5 md:gap-16', fillFluidCell ? 'min-h-0 flex-1' : 'h-full', CARD_PADDING)}>
          <div className="flex flex-col gap-5 md:gap-16">
            <div className="flex items-center gap-2">
              {Icon ? (
                <div
                  ref={iconBox}
                  className={cn('flex items-center justify-center rounded-md', !iconBgColor?.hex && (iconBgClass ?? (theme === 'light' ? 'bg-black/5' : 'bg-white/10')), size)}
                  style={iconBgColor?.hex ? { backgroundColor: iconBgColor.hex } : undefined}
                >
                  <span ref={iconInner} className="flex items-center justify-center">
                    <Icon size={px} className={iconBgColor || iconBgClass ? 'text-white' : theme === 'light' ? 'text-black/70' : 'text-white/80'} />
                  </span>
                </div>
              ) : null}
              {label ? <p className="font-mono text-sm uppercase text-scale-gray-60">{label}</p> : null}
              {labelEnd?.trim() ? <p className="CardLabelEnd ml-auto text-right font-mono text-sm uppercase">{labelEnd}</p> : null}
            </div>
            {title ? (
              <AnimatedText ref={titleRef} tagName="h3" className={titleSize === 'header2' ? CARD_HEADER2 : titleSize}>
                {title}
              </AnimatedText>
            ) : null}
          </div>
          <div className="flex flex-col gap-4">
            {description && typeof description === 'string' ? (
              <AnimatedText ref={bodyRef} tagName="p" className={cn('body2-regular', theme === 'light' ? 'text-scale-gray-30' : 'text-white')}>
                {description}
              </AnimatedText>
            ) : description?.length ? (
              <RichText value={description as RichBlock[]} animatedTextRef={bodyRef} animatedTextClassName="min-h-16" className="[&_.header2]:mb-2" />
            ) : null}
          </div>
        </div>
      </div>
    </BaseCard>
  )
})

const LINK_CARD_CLASSES =
  'max-xl:!rounded-[8px] [&_.header5-regular]:max-xl:text-[18px] [&_.header5-regular]:max-xl:leading-[1.35] [&_.RichText_p.body1]:max-xl:text-[14px] [&_.RichText_p.body1]:max-xl:leading-[1.45] [&_.RichText_p.body2-regular]:max-xl:text-[14px] [&_.RichText_p.body2-regular]:max-xl:leading-[1.45] [&_.RichText_p.body3]:max-xl:text-[14px] [&_.RichText_p.body3]:max-xl:leading-[1.45] [&_.RichText_p.detail-regular]:max-xl:text-[14px] [&_.RichText_p.detail-regular]:max-xl:leading-[1.45] [&_.RichText_p.detail-mono]:max-xl:text-[14px] [&_.RichText_p.detail-mono]:max-xl:leading-[1.45] [&_.RichText_li]:max-xl:text-[14px] [&_.RichText_li]:max-xl:leading-[1.45] [&_.FlatCta_span.self-center]:max-xl:font-medium'

export const LinkCard = forwardRef<CardHandle, Omit<LinkCardData, '_type'>>(function LinkCard(
  {
    icon,
    label,
    title,
    description,
    link,
    className,
    scaleDir,
    iconSize,
    hoveredColor,
    scaleTransformOrigin,
    entranceTranslateX,
    staggerIndex,
    staggerCount,
    scrollTriggerEnd,
    gap,
    fillFluidCell = false,
    iconBgColor,
    iconColor,
  },
  ref,
) {
  const titleRef = useRef<AnimatedTextHandle>(null)
  const bodyRef = useRef<AnimatedTextHandle>(null)
  const done = useRef(false)
  const cta = useRef<HTMLElement>(null)
  const iconBox = useRef<HTMLDivElement>(null)
  const iconInner = useRef<HTMLSpanElement>(null)
  useEffect(
    () => () => {
      done.current = false
    },
    [],
  )
  const hoverClass = hoveredColor?.tailwindClass
  useImperativeHandle(
    ref,
    () => ({
      animateSet: () => {
        if (iconBox.current) gsap.set(iconBox.current, { clipPath: 'inset(0% 100% 0% 0% round 10px)' })
        if (iconInner.current) gsap.set(iconInner.current, { opacity: 0 })
        if (cta.current) gsap.set(cta.current, { opacity: 0, y: 10 })
      },
      animateIn: async ({ delay = 0, index = 0 } = {}) => {
        if (done.current) return
        done.current = true
        const t = titleRef.current
        const b = bodyRef.current
        if (!t && !b && !iconBox.current && !cta.current) return
        await Promise.all([t?.ready(), b?.ready()].filter(Boolean))
        const at = 0.05 * index + delay
        const titleAt = at + 0.16
        const bodyAt = titleAt + 0.18 * Number(!!t)
        if (iconBox.current) gsap.to(iconBox.current, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 0.5, ease: 'power1.out', delay: at })
        if (iconInner.current) gsap.to(iconInner.current, { opacity: 1, duration: 1, ease: 'power1.out', delay: at + 0.05 })
        const color = hoveredColor ? { variant: { colorIn: hoveredColor } } : {}
        await Promise.all([
          t ? t.animateIn({ delay: titleAt, ...color }) : Promise.resolve(),
          b ? b.animateIn({ delay: bodyAt, ...color }) : Promise.resolve(),
        ])
        if (cta.current) {
          await new Promise<void>((resolve) => {
            gsap.to(cta.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', onComplete: () => resolve() })
          })
        }
      },
    }),
    [hoveredColor],
  )
  const size = iconSize === 'sm' ? 'w-10 h-10' : 'w-10 h-10 md:w-16 md:h-16'
  const px = iconSize === 'sm' ? 16 : 32
  const gapClass = gap === 'sm' ? 'gap-2 md:gap-4 xl:gap-8' : 'gap-5 md:gap-6 xl:gap-16'
  const Icon = icon
  const iconTone = iconColor ? undefined : iconBgColor ? 'text-white' : 'text-black/70'
  const ctaProps: FlatCtaProps = { href: link?.url, text: link?.text, variant: 'fill', theme: 'gray', as: 'button' }
  return (
    <BaseCard
      className={cn(fillFluidCell && 'flex min-h-0 flex-col flex-1', className)}
      scaleTransformOrigin={scaleTransformOrigin}
      entranceTranslateX={entranceTranslateX}
      scaleDir={scaleDir}
      staggerIndex={staggerIndex}
      staggerCount={staggerCount}
      scrollTriggerEnd={scrollTriggerEnd}
    >
      <div className={cn('LinkCard rounded-2xl overflow-clip relative text-black bg-scale-gray-95 group/card', fillFluidCell ? 'flex min-h-0 flex-1 flex-col' : 'h-full', LINK_CARD_CLASSES)}>
        <CMSLink href={link?.url}>
          {hoverClass ? <div className={cn(`bg-${hoverClass}`, 'w-full h-full absolute origin-bottom transition-transform duration-500 ease-out scale-y-0 group-hover/card:scale-y-100')} /> : null}
          <div className={cn('relative z-10 flex flex-col justify-between max-xl:p-[24px] xl:p-10', fillFluidCell ? 'min-h-0 flex-1' : 'h-full', gapClass)}>
            <div className="flex items-center gap-2">
              {Icon ? (
                <div
                  ref={iconBox}
                  className={cn('flex items-center justify-center rounded-xl', !iconBgColor && 'bg-black/[0.06]', size)}
                  style={iconBgColor?.hex ? { backgroundColor: iconBgColor.hex } : undefined}
                >
                  <span ref={iconInner} className="flex items-center justify-center" style={iconColor?.hex ? { color: iconColor.hex } : undefined}>
                    <Icon size={px} className={iconTone} />
                  </span>
                </div>
              ) : null}
              {label ? <p className="font-mono text-sm uppercase">{label}</p> : null}
            </div>
            {title ? (
              <AnimatedText ref={titleRef} tagName="h5" className="header5-regular">
                {title}
              </AnimatedText>
            ) : null}
            <div className="flex flex-col justify-end flex-1 gap-4">
              {description?.length ? (
                <div className="text-scale-gray-10 CardGridDescription md:min-h-(--cg-desc-min-h,0px)">
                  <RichText value={description} animatedTextRef={bodyRef} animatedTextClassName="text-scale-gray-10" />
                </div>
              ) : null}
              {link?.text ? (
                <div className="pt-4">
                  <FlatCta ref={cta} {...ctaProps} className="transition-all duration-500 ease-out group-hover/card:bg-black group-hover/card:text-white" />
                </div>
              ) : null}
            </div>
          </div>
        </CMSLink>
      </div>
    </BaseCard>
  )
})

const GRID_CLASSES =
  '[&_.Card]:max-xl:!rounded-[8px] [&_.Card>div]:max-xl:!p-[24px] [&_.Card_.header5-regular]:max-xl:text-[18px] [&_.Card_.header5-regular]:max-xl:leading-[1.35] [&_.Card_.RichText_p.body1]:max-xl:text-[14px] [&_.Card_.RichText_p.body1]:max-xl:leading-[1.45] [&_.Card_.RichText_p.body2-regular]:max-xl:text-[14px] [&_.Card_.RichText_p.body2-regular]:max-xl:leading-[1.45] [&_.Card_.RichText_p.body3]:max-xl:text-[14px] [&_.Card_.RichText_p.body3]:max-xl:leading-[1.45] [&_.Card_.RichText_p.detail-regular]:max-xl:text-[14px] [&_.Card_.RichText_p.detail-regular]:max-xl:leading-[1.45] [&_.Card_.RichText_p.detail-mono]:max-xl:text-[14px] [&_.Card_.RichText_p.detail-mono]:max-xl:leading-[1.45] [&_.Card_.RichText_li]:max-xl:text-[14px] [&_.Card_.RichText_li]:max-xl:leading-[1.45]'

const FLUID_CELL = '@container min-w-0'
const FLUID_TALL = 'lg:min-h-[calc(100cqw*268/320)]'
const FLUID_WIDE = 'lg:min-h-[calc(100cqw*218/485)]'

export type CardGridProps = {
  heading?: string
  anchorId?: string
  headingClassName?: string
  noSplitHeading?: boolean
  headerSize?: 'md' | 'lg'
  headerAlignment?: string
  fluidLayout?: boolean
  cards?: (CardData | LinkCardData)[]
  animationDirection?: 'up' | 'down' | 'none'
  iconSize?: 'md' | 'sm'
  directionalEntrance?: boolean
  scrollTriggerEnd?: string
  theme?: 'dark' | 'light'
  titleSize?: string
  columns?: number
  retroactiveOnEnter?: boolean
}

export function CardGrid({
  heading,
  anchorId,
  headingClassName,
  noSplitHeading = false,
  headerSize = 'md',
  headerAlignment = 'text-left',
  fluidLayout = false,
  cards,
  animationDirection = 'up',
  iconSize = 'md',
  directionalEntrance: directional = false,
  scrollTriggerEnd,
  theme = 'dark',
  titleSize = 'header5-regular',
  columns,
  retroactiveOnEnter = true,
}: CardGridProps) {
  const list = useMemo(() => cards?.filter(Boolean) ?? [], [cards])
  const section = useRef<HTMLElement>(null)
  const headingRef = useRef<AnimatedTextHandle>(null)
  const refs = useRef<(CardHandle | null)[]>([])
  const started = useRef(false)
  const wanted = useRef(false)
  const lg = useMediaQuery('(min-width: 1024px)') === true
  const headingProps = { md: { tagName: 'h3', className: 'header3-regular' }, lg: { tagName: 'h2', className: CARD_HEADER2 } }[headerSize]
  useEffect(
    () => () => {
      started.current = false
      wanted.current = false
    },
    [],
  )
  useEffect(() => {
    refs.current = refs.current.slice(0, list.length)
    refs.current.forEach((c) => c?.animateSet?.())
  }, [list])
  const onEnter = useCallback(() => {
    if (started.current) return
    wanted.current = true
    if (typeof document !== 'undefined' && document.hidden) return
    started.current = true
    headingRef.current?.ready().then(() => {
      headingRef.current?.animateIn({ delay: 0.125 })
    })
    list.forEach((_, i) => {
      refs.current[i]?.animateIn({ delay: 0.125, index: i })
    })
  }, [list])
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && wanted.current && !started.current) onEnter()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [onEnter])
  useInViewTrigger(section, { start: 'top bottom', onEnter, retroactiveOnEnter })
  if (list.length === 0) return null
  const gridCols = fluidLayout ? 'grid-cols-6' : GRID_COLS[resolveColumns(columns, list.length)]
  return (
    <section ref={section} id={anchorId?.trim() || undefined} className={cn('CardGrid scroll-mt-28', GRID_CLASSES, 'w-full py-12 xl:py-24 oml:py-0')}>
      <div className="w-full mx-auto">
        {heading ? (
          <AnimatedText
            ref={headingRef}
            tagName={headingProps.tagName as 'h2' | 'h3'}
            className={cn('max-sm:mx-auto mb-[48px] text-inherit xl:mb-16 w-4/5 md:w-full oml:w-full oml:mb-10 oml:mt-10', headerAlignment, headingProps.className, headingClassName)}
            noSplit={noSplitHeading}
          >
            {heading}
          </AnimatedText>
        ) : null}
        <div className={cn('CardGridContainer lg:grid md:p-0 flex flex-col grid-gap', gridCols)}>
          {list.map((card, i) => {
            const { scaleTransformOrigin, entranceTranslateX } = directionalEntrance(i, list.length, fluidLayout, directional, columns, !lg)
            const span = i >= 3 ? 'col-span-full lg:col-span-3' : 'col-span-full lg:col-span-2'
            const min = i < 3 ? FLUID_TALL : FLUID_WIDE
            const { _type, _key, ...data } = card
            const shared = {
              scaleDir: animationDirection,
              iconSize,
              ref: (el: CardHandle | null) => {
                refs.current[i] = el
              },
              className: fluidLayout ? cn('w-full min-h-0 flex-1', min) : undefined,
              fillFluidCell: !!fluidLayout,
              scaleTransformOrigin,
              entranceTranslateX,
              staggerIndex: i,
              staggerCount: list.length,
              scrollTriggerEnd,
            }
            const node =
              _type === 'linkCard' ? (
                <LinkCard {...(data as Omit<LinkCardData, '_type'>)} {...shared} key={_key ?? i} />
              ) : (
                <Card {...(data as Omit<CardData, '_type'>)} {...shared} theme={theme} titleSize={titleSize} key={_key ?? i} />
              )
            return fluidLayout ? (
              <div className={cn(FLUID_CELL, span, 'flex min-h-0 flex-col lg:h-full')} key={_key ?? i}>
                {node}
              </div>
            ) : (
              node
            )
          })}
        </div>
      </div>
    </section>
  )
}
