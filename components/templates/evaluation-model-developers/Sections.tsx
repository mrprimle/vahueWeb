import type { ReactNode } from 'react'
import CardGrid from './CardGrid'
import type { CardSectionContent, HeaderContent, ResourcesContent } from './content'
import s from './styles.module.css'

// Every block on this page sits in the same shell (RSC payload): section `py-18 lg:py-20 bg-transparent !pt-8 !pb-10
// md:!pt-10` > container `max-w-[1472px] ps-6 pe-6`. SectionHeaders, the taxonomy figure and the resource grid are
// static on scale.com: no AnimatedText class, no tweens, no listeners (REA: `img[alt^="Red team"]` has only React
// load/error; resource links only HubSpot mousedown + React click; no hover classes).
function Shell({ children }: { children: ReactNode }) {
  return (
    <section className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

// SectionHeader align "center" with the page's className overrides:
// `mb-8 md:mb-10 md:mt-12 max-w-3xl`, eyebrow mono 12/24 +1px uppercase #525252 mb-5;
// h2 2.5rem -> md 3rem -> lg 3.25rem / 1.08, max-w 760; p mt-4 lg:mt-2 18/1.55 black/60, max-w 760.
export function SectionHeader({ eyebrow, title, body }: HeaderContent) {
  return (
    <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center justify-center text-center md:mb-10 md:mt-12">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px]" style={{ color: 'var(--emd-muted)' }}>
            <span>{eyebrow}</span>
          </div>
          <h2 className={`${s.sectionTitle} font-display`}>{title}</h2>
        </div>
        {body ? <p className={`${s.sectionBody} mt-4 block w-full font-display font-normal lg:mt-2`}>{body}</p> : null}
      </div>
    </div>
  )
}

// Header + EvaluationLinkCardGrid; the Experts block adds the red-team taxonomy figure between them:
// `relative mb-10 overflow-hidden rounded-lg border border-black/10 bg-[#f5f5f3] p-6 md:p-10`, image box
// `aspect-[1129/480]`, object-contain.
export function CardSection({ content }: { content: CardSectionContent }) {
  return (
    <Shell>
      <SectionHeader {...content.header} />
      {content.figure ? (
        <div className="relative mb-10 overflow-hidden rounded-lg border border-black/10 p-6 md:p-10" style={{ background: 'var(--emd-media-bg)' }}>
          <div className="relative aspect-[1129/480] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.figure.src} alt={content.figure.alt} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
          </div>
        </div>
      ) : null}
      <CardGrid cards={content.cards} />
    </Shell>
  )
}

// Resources: `grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4`; card `a.block`: media `aspect-[389/243] rounded-lg
// bg-[#f5f5f3] p-6` with a 112px (h-28 w-28) object-contain icon and an sr-only title; text `pt-5`: category 14/1.71
// 500 #525252, h5 `mt-1 line-clamp-2` 24/1.33 #111111.
export function Resources({ content }: { content: ResourcesContent }) {
  return (
    <Shell>
      <SectionHeader {...content.header} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {content.posts.map((post) => (
          <a key={post.href} className="block" href={post.href}>
            <div className="relative flex aspect-[389/243] items-center justify-center overflow-hidden rounded-lg p-6" style={{ background: 'var(--emd-media-bg)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="" width={256} height={256} loading="lazy" className="h-28 w-28 object-contain" />
              <span className="sr-only">{post.title}</span>
            </div>
            <div className="pt-5">
              <p className="font-display text-[14px] font-medium leading-[1.71]" style={{ color: 'var(--emd-muted)' }}>
                {post.category}
              </p>
              <h5 className="mt-1 line-clamp-2 font-display text-[24px] font-normal leading-[1.33]" style={{ color: 'var(--emd-ink-2)' }}>
                {post.title}
              </h5>
            </div>
          </a>
        ))}
      </div>
    </Shell>
  )
}
