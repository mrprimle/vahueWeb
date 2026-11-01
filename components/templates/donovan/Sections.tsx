import type { ReactNode } from 'react'
import { AgentBuilderMock, AgentLibraryMock, CompareModelsMock } from './Mocks'
import { ASSET, foundation, overview } from './content'
import s from './donovan.module.css'

/* ---------- Shared section shell: py-18 lg:py-20 (72 / 80), container max-w 1472 px-6 ---------- */
export function Section({ children, className = 'py-[72px] lg:py-20' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-transparent ${className}`}>
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/*
 * CMS section header: overtitle mono 12/24 +1px #525252 (mb 20), title 30/1.375 -> 42 (md) -> 48/60 (lg),
 * subtitle 16/1.6 -> 20/32 (lg), black/70, mt 16 -> 8 (lg). Wrapper max-w-3xl, mb-10 md:mb-20 md:mt-12.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h3',
  tightBottom = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  as?: 'h2' | 'h3'
  tightBottom?: boolean
}) {
  return (
    <div
      className={`mx-auto flex max-w-3xl flex-col items-center justify-center text-center md:mt-12 ${
        tightBottom ? 'mb-10' : 'mb-10 md:mb-20'
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* TODO: Vahue copy */}
          <div className="mb-5 font-mono text-xs uppercase leading-6 tracking-[1px] text-[#525252]">
            <span>{eyebrow}</span>
          </div>
          {/* TODO: Vahue copy */}
          <Tag
            className={`${s.sectionHeaderTitle} font-display font-normal tracking-[-0.01em] text-black [text-wrap:balance]`}
          >
            {title}
          </Tag>
        </div>
        {/* TODO: Vahue copy */}
        <p className="mt-4 block w-full text-base font-normal leading-[1.6] tracking-[-0.01em] text-black/70 [text-wrap:balance] lg:mt-2 lg:text-xl lg:leading-[1.6]">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

/* ---------- Product overview: 3 dark product-UI cards (aspect 764/560, radius 12) ---------- */
const MOCKS = [AgentBuilderMock, CompareModelsMock, AgentLibraryMock]

export function ProductOverview() {
  return (
    <Section>
      <SectionHeader eyebrow={overview.eyebrow} title={overview.title} subtitle={overview.subtitle} />
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {overview.cards.map((c, i) => {
          const Mock = MOCKS[i]
          return (
            <div key={c.title}>
              <Mock />
              {/* TODO: Vahue copy */}
              <p className="mt-8 font-display text-2xl leading-[1.5] tracking-[-0.01em] text-black lg:mt-10">{c.title}</p>
              {/* TODO: Vahue copy */}
              <p className="mt-3 text-base leading-[1.65] tracking-[-0.01em] text-black/70">{c.body}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------- Foundation: 3 cards, a brace, 6 cards (flex-wrap, left-aligned like Scale) on gray-50 ---------- */
function FoundationCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex w-[368px] flex-col items-center gap-6 rounded-2xl border border-solid border-black/5 bg-white p-6">
      <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/foundation-${icon}.svg`} alt="" width={24} height={24} className="h-6 w-6" />
      </figure>
      {/* TODO: Vahue copy */}
      <p className="self-stretch text-center font-display text-2xl font-normal leading-8 tracking-[-0.01em] text-black">
        {title}
      </p>
    </div>
  )
}

const Brace = () => (
  <svg width="687" height="36" viewBox="0 0 687 36" fill="none" aria-hidden="true" className="shrink-0">
    <g opacity="0.45">
      <path
        d="M0.527344 35.1703C0.527344 22.8684 10.5 12.8958 22.8018 12.8958H330.542C337.664 12.8958 343.437 7.12213 343.437 0"
        stroke="#959595"
        strokeWidth="1.05511"
      />
      <path
        d="M686.348 35.1703C686.348 22.8684 676.375 12.8958 664.073 12.8958H356.333C349.211 12.8958 343.438 7.12213 343.438 0"
        stroke="#959595"
        strokeWidth="1.05511"
      />
    </g>
  </svg>
)

export function Foundation() {
  const row = 'flex flex-wrap content-start items-start gap-8 self-stretch rounded-2xl p-6'
  return (
    <div className="bg-[#f9fafb]">
      <Section>
        <SectionHeader as="h2" eyebrow={foundation.eyebrow} title={foundation.title} subtitle={foundation.subtitle} />
        <div className="mb-24 flex flex-col items-center gap-6">
          <div className={row}>
            {foundation.top.map((c) => (
              <FoundationCard key={c.title} {...c} />
            ))}
          </div>
          <Brace />
          <div className={row}>
            {foundation.bottom.map((c) => (
              <FoundationCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

/* ---------- Icon feature grid (Overmatch / Trusted & Secure) ---------- */
type Feature = { icon: string; title: string; body: string }

export function FeatureGrid({
  eyebrow,
  title,
  subtitle,
  items,
  sectionClassName,
}: {
  eyebrow: string
  title: string
  subtitle: string
  items: Feature[]
  sectionClassName?: string
}) {
  return (
    <Section className={sectionClassName}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} tightBottom />
      <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {items.map((f) => (
          <div key={f.title} className="shrink-0 grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
                <span className="flex h-6 w-6 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${ASSET}/feature-${f.icon}.svg`} alt="" width={22} height={22} />
                </span>
              </figure>
            </div>
            <div>
              {/* TODO: Vahue copy */}
              <h4 className="relative mt-6 whitespace-pre-line font-display text-2xl font-normal leading-[1.5] tracking-[-0.01em] text-black">
                {f.title}
              </h4>
              {/* TODO: Vahue copy */}
              <p className="relative mt-4 text-base leading-6 tracking-[-0.01em] text-[#525252]">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
