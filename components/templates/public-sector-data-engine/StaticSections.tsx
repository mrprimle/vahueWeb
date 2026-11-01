import { ASSET, logos, overview, why } from './content'
import { Check, FeatureGlyph } from './icons'
import styles from './styles.module.css'

// scale.com `.container`: 1.5rem gutters, 2rem from 1024px, capped at 768 / 1024 / 1280.
export const CONTAINER = 'mx-auto w-full px-6 md:max-w-[768px] lg:max-w-[1024px] lg:px-8 xl:max-w-[1280px]'
// `py-18 lg:py-20 !pt-8 !pb-10 md:!pt-10`
export const SECTION = 'pt-8 pb-10 md:pt-10'

export function SectionHeader({
  eyebrow,
  title,
  body,
  eyebrowClassName = 'text-[#525252]',
}: {
  eyebrow: string
  title: string
  body?: string
  eyebrowClassName?: string
}) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* TODO: Vahue copy */}
          <div className={`mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] ${eyebrowClassName}`}>
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-black md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        {body ? (
          <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-black/70 lg:mt-2 lg:text-[20px]">
            {body}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function Tile({ w, h }: { w: number; h: number }) {
  // TODO: partner logo. Neutral placeholder at the source logo's rendered size.
  return <div className="rounded-[4px] bg-black/10" style={{ width: w, height: h }} aria-hidden />
}

export function LogoWall() {
  const total = logos.tiles.reduce((s, t) => s + t.w + 48, 0)
  return (
    <section className="pb-10 pt-8 md:pt-10">
      <div className={`${CONTAINER} relative`}>
        {/* TODO: Vahue copy */}
        <p className="mx-auto mb-12 w-full max-w-[698px] text-balance px-4 text-center text-[16px] leading-[1.65] tracking-[-0.01em] text-[#374151]">
          <span className="mr-2">{logos.lead}</span>
          <span className="inline">
            {/* ArrowLink theme "light": `text-link hover:text-blue-700`, but Scale's CSS has no blue-700 rule, so the
                colour stays #008eff on hover; only the arrow moves (translate-x 4px, 300ms ease-out). */}
            <a href="#" data-qa="logo-link" className="group inline-flex items-center gap-1 text-[#008eff] transition-colors duration-300">
              <span className="font-medium">{logos.link}</span>
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
          </span>
        </p>
        <div className="hidden md:block">
          <ul className="mx-auto flex w-full items-center justify-between gap-8 px-6 sm:min-h-[52px] md:gap-y-16 md:max-w-[768px] lg:max-w-[1024px] lg:px-8 xl:max-w-[1280px]">
            {logos.tiles.map((t, i) => (
              <li key={i} className="flex flex-col items-center justify-center gap-3">
                <Tile {...t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="-mx-6 overflow-hidden px-6 md:hidden">
          <div className="overflow-hidden">
            <div className={styles.marquee} style={{ ['--marquee-duration' as string]: `${total / 50}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
                  {logos.tiles.map((t, i) => (
                    <li key={i} className="ml-12 flex flex-col items-center justify-center gap-3">
                      <Tile {...t} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProductOverview() {
  return (
    <section className={SECTION}>
      <div className={`${CONTAINER} relative`}>
        <SectionHeader eyebrow={overview.eyebrow} title={overview.title} body={overview.body} />
        <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
          {overview.cards.map((c) => (
            <div key={c.title} className="shrink-0 grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
                <span className="flex h-6 w-6 items-center justify-center">
                  <FeatureGlyph name={c.icon} />
                </span>
              </figure>
              <div>
                {/* TODO: Vahue copy */}
                <h4 className="relative mt-6 whitespace-pre-line text-[24px] text-black font-normal leading-[1.5] tracking-[-0.01em]">{c.title}</h4>
                <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyScale() {
  return (
    <section className={SECTION}>
      <div className={`${CONTAINER} relative`}>
        <SectionHeader eyebrow={why.eyebrow} title={why.title} body={why.body} />
        <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
          <div className="flex w-full flex-col gap-6 md:w-5/12">
            {why.items.map((item, i) => (
              <div key={item.title}>
                <div className="flex flex-row items-start gap-4">
                  <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.09]">
                    <Check className="h-3 w-3 text-black/70" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* TODO: Vahue copy */}
                    <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.01em] text-black">{item.title}</p>
                    <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-black/70">{item.body}</p>
                  </div>
                </div>
                {i < why.items.length - 1 ? <hr className="mt-6 border-white/10" /> : null}
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center p-2 md:w-7/12">
            {/* TODO: Vahue diagram. Scale's flywheel illustration (labels are Scale copy). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSET}/why-scale.png`} alt="" width={1944} height={1740} loading="lazy" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

