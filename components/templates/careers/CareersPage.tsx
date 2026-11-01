import type { CSSProperties } from 'react'
import FullBleedMedia from './FullBleedMedia'
import OpenPositions from './OpenPositions'
import { Benefits, Credos, Mission, News, SectionHeader } from './Sections'
import type { CareersContent } from './content'
import s from './careers.module.css'

/**
 * scale.com/careers layout, driven entirely by `content` (see content.tsx for the contract and Scale's own copy).
 * Order follows the page's RSC tree (a hand-built route, not CMS slices):
 *   FullBleedMediaSection hero (wrapper pt-24, animateCta false) -> In The News -> Our Mission -> Our Credos
 *   -> Our Benefits -> #open-roles (FilterPosition, py-16 md:py-24) -> FullBleedMediaSection pre-footer
 *   (wrapper mt-16 pb-8, animated CTA).
 * Spec: reference-snapshots/scale-clone/careers.md
 *
 * Theme: every colour reads a --car-* variable (defaults = Scale's light palette, set on .root in careers.module.css).
 * Override them through `theme` (or a wrapper class) to restyle the page, e.g. a dark Vahue /careers:
 *   --car-bg page, --car-fg headings, --car-fg-2 titles / active filter (scale-gray-10), --car-fg-3 body copy
 *   (gray-30), --car-muted meta text (gray-60), --car-line hairlines / row hover (gray-90), --car-card cards / inputs
 *   / open department panel (gray-95), --car-over overtitles, --car-sub subtitles + benefit copy, --car-hover-ink
 *   row title on hover, --car-active-bg / --car-active-fg selected dropdown + checkbox, --car-menu-bg dropdown,
 *   --car-sticky-bg filter bar (with an 8px backdrop blur), --car-shadow benefit images, --car-credo-filter credo line
 *   art (Scale ships white strokes and inverts them; use `none` on a dark page).
 */
export default function CareersPage({ content, theme }: { content: CareersContent; theme?: Record<`--car-${string}`, string> }) {
  const { hero, news, mission, credos, benefits, positions, prefooter } = content
  return (
    <main data-careers-root className={`${s.root} CareersPage overflow-x-hidden font-display`} style={theme as CSSProperties | undefined}>
      <div className="pt-24">
        <FullBleedMedia {...hero} animateCta={false} priority />
      </div>
      <News news={news} />
      <Mission mission={mission} />
      <Credos credos={credos} />
      <Benefits benefits={benefits} />
      <section id={positions.id} className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1472px] px-6" id="jobs">
          <SectionHeader over={positions.overtitle} title={positions.title} className="mb-10 md:mt-12" />
          <OpenPositions positions={positions} />
        </div>
      </section>
      <div className="mt-16 pb-8">
        <FullBleedMedia {...prefooter} />
      </div>
    </main>
  )
}
