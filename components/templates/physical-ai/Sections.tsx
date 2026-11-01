import Image from 'next/image'
import type { ReactNode } from 'react'
import { FeatureIcon } from './icons'
import type { IconName } from './content'
import styles from './physical-ai.module.css'

/*
 * The legacy scale.com section template used for every block between the testimonial and the prefooter.
 * section: pt-16 pb-16 md:pt-20 (64/64 mobile, 80/64 desktop); container max 1280 with 24px / 32px side padding
 * (1216px content at 1440). These sections have no scroll motion on scale.com.
 */

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="bg-transparent pb-16 pt-16 md:pt-20">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-8">{children}</div>
    </section>
  )
}

/* Centred header: max-w-3xl, md:mt-12, mb-10. Eyebrow 12/24 mono +1px; H2 30/1.375 -> 48/1.25; subtitle 16 -> 20, lh 1.6. */
export function SectionHeader({ eyebrow, title, subtitle, muted = true }: { eyebrow?: string; title: string; subtitle?: string; muted?: boolean }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="text-xs mb-5 font-mono uppercase leading-6 tracking-[1px]" style={{ color: muted ? '#525252' : '#000' }}>
          {/* TODO: Vahue copy */}
          <span>{eyebrow}</span>
        </div>
        {/* TODO: Vahue copy */}
        <h2 className="text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-black [text-wrap:balance] md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
          {title}
        </h2>
      </div>
      {subtitle ? (
        // TODO: Vahue copy
        <p className="mt-4 block w-full text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-black/70 [text-wrap:balance] lg:mt-2 lg:text-[20px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function IconTile({ name }: { name: IconName }) {
  return (
    <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
      <span className="flex h-6 w-6 items-center justify-center">
        <FeatureIcon name={name} />
      </span>
    </figure>
  )
}

type Feature = { icon: IconName; title: string; body: string }

/* Two-column, icon beside text: gap-x-14 gap-y-12. */
export function FeaturesTwoCol({ items }: { items: Feature[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
      {items.map((f) => (
        <div key={f.title} className="flex flex-row items-start gap-4 text-black">
          <div className="shrink-0">
            <IconTile name={f.icon} />
          </div>
          <div>
            {/* TODO: Vahue copy */}
            <h4 className="relative mt-0 whitespace-pre-line text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black">{f.title}</h4>
            <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Wrapping three-up, icon on top: gap 64, md gap-y-20 gap-x-6, xl gap-x-14; items basis 1/4 grow, max 368px. */
export function FeaturesWrap({ items }: { items: Feature[] }) {
  return (
    <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
      {items.map((f) => (
        <div key={f.title} className="shrink-0 grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
          <div>
            <IconTile name={f.icon} />
          </div>
          <div>
            {/* TODO: Vahue copy */}
            <h4 className="relative mt-6 whitespace-pre-line text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black">{f.title}</h4>
            <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Text + media split row: 2 cols at lg, gap 48 (32 on the use-case row below lg), items centred. */
export function SplitRow({
  title,
  body,
  media,
  mediaFirst = false,
  className = '',
  gapClassName = 'gap-12',
}: {
  title: string
  body: string[]
  media: ReactNode
  mediaFirst?: boolean
  className?: string
  gapClassName?: string
}) {
  const text = (
    <div>
      {/* TODO: Vahue copy */}
      <h3 className="mb-4 text-[24px] font-medium leading-[1.5] tracking-[-0.01em] text-black">{title}</h3>
      {body.map((p, i) => (
        <p key={i} className={`text-[16px] leading-[1.5] tracking-[-0.01em] text-[#364153] ${i < body.length - 1 ? 'mb-4' : ''}`}>
          {p}
        </p>
      ))}
    </div>
  )
  const mediaEl = (
    <div>
      <div className="relative z-10 overflow-hidden rounded-2xl bg-white/10 p-0 md:overflow-visible lg:items-center">{media}</div>
    </div>
  )
  return (
    <div className={`grid grid-cols-1 items-center lg:grid-cols-2 ${gapClassName} ${className}`}>
      {mediaFirst ? mediaEl : text}
      {mediaFirst ? text : mediaEl}
    </div>
  )
}

export function ResponsiveImg({ src, width, height }: { src: string; width: number; height: number }) {
  return <Image src={src} alt="" width={width} height={height} sizes="(max-width: 1024px) 100vw, 584px" className="h-auto w-full max-w-full" />
}

/* 4:3 image cards, 3-up: md 2 cols gap 24, lg 3 cols, xl gap-x-10 gap-y-14. Title 24/36 (mt-8 -> lg:mt-12), body 16/1.65 black/70. */
export function ImageCards({ cards }: { cards: { image: string; title: string; body: string }[] }) {
  return (
    <div className="relative grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
      {cards.map((c) => (
        <div key={c.title}>
          <div className={`${styles.feature} relative aspect-[4/3]`}>
            <Image src={c.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px" className="rounded-lg object-cover" />
          </div>
          {/* TODO: Vahue copy */}
          <p className="relative mt-8 text-[24px] leading-[1.5] tracking-[-0.01em] text-black lg:mt-12">{c.title}</p>
          <p className="relative mt-3 text-[16px] leading-[1.65] tracking-[-0.01em] text-black/70">{c.body}</p>
        </div>
      ))}
    </div>
  )
}
