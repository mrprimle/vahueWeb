import type { ReactNode } from 'react'
import Hero from './Hero'
import PullApart from './PullApart'
import Bridge from './Bridge'
import BlogCarousel from './BlogCarousel'
import LogoCloud from './LogoCloud'
import Stats from './Stats'
import Testimonials from './Testimonials'
import FullBleedMedia from './FullBleedMedia'
import { BuiltToBeTrusted, Pillars, PoweredBy, Race } from './Sections'
import { enterpriseContent, type EnterpriseContent } from './content'

/** Own visuals for slots where Scale had media (used when the slice's image/video is omitted). */
export type EnterpriseMedia = {
  bridge?: ReactNode
  race?: ReactNode
  pillars?: ReactNode
  poweredBy?: ReactNode
  trusted?: ReactNode
  prefooter?: ReactNode
}

/**
 * Body of scale.com/enterprise, top to bottom. Spec: reference-snapshots/scale-clone/enterprise.md
 *
 * Reusable: pass `content` (any slice left out drops that section) and `media` slots. The clone renders
 * Scale's copy (`enterpriseContent`). Vahue pages on this layout (/operations, banking/retail/distribution
 * industry pages) pass their own content and visuals.
 *
 * Theme: colours are CSS custom properties with Scale's values as fallbacks, so a page re-skins the layout by
 * setting them on an ancestor (see components/enterprise-vahue/theme.ts for the Vahue dark set):
 *   --ent-bg #fff, --ent-fg #000, --ent-fg-2 #212121, --ent-band #EAEAEA, --ent-band-2 #C7C7C7, --ent-card #fff,
 *   --ent-card-2 #F2F2F2, --ent-accent #193A29, --ent-line #EAEAEA, --ent-edge #B5B5B5, --ent-icon #1C1B1F,
 *   --ent-cta-gray #EAEAEA, --ent-mark #839CB2 (hero label triangle), --ent-dot-on #525252, --ent-dot-off #C7C7C7, and for the logo-cloud scene
 *   --ent-cloud-tile #fff, --ent-cloud-ink #000, --ent-cloud-line #c4c4c4, --ent-cloud-band #000 (hex only).
 * The root is a <div>: the site layout already provides <main>.
 */
export default function EnterprisePage({ content = enterpriseContent, media = {} }: { content?: EnterpriseContent; media?: EnterpriseMedia }) {
  const c = content
  return (
    <div className="EnterprisePage bg-[var(--ent-bg,#fff)] font-display tracking-[-0.01em] text-[color:var(--ent-fg,#000)]">
      <div className="relative overflow-x-hidden">
        {/* 1. Hero: DOM node graph, pointer parallax, pinned under the next section */}
        {c.hero ? <Hero content={c.hero} /> : null}
        {/* 2. Pull-apart: pinned three.js scene, 450vh */}
        {c.pullApart ? <PullApart content={c.pullApart} /> : null}
        {/* 3. Bridge: evergreen inset panel with transparent video */}
        {c.bridge ? <Bridge content={c.bridge} media={media.bridge} /> : null}
        {/* 4. Blog carousel: Embla with 3D perspective */}
        {c.blog ? <BlogCarousel content={c.blog} /> : null}
        {/* 5. Logo cloud: drag-to-rotate WebGL sphere */}
        {c.logoCloud ? <LogoCloud content={c.logoCloud} /> : null}
        {/* 6. Results: scroll-scrubbed stat cards */}
        {c.stats ? <Stats content={c.stats} /> : null}
        {/* 7. Testimonials (cloud slate) */}
        {c.testimonials ? <Testimonials content={c.testimonials} /> : null}
        {/* 8. The race is on: two columns + video */}
        {c.race ? <Race content={c.race} media={media.race} /> : null}
        {/* 9. Three pillars */}
        {c.pillars ? <Pillars content={c.pillars} media={media.pillars} /> : null}
        {/* 10. Powered by the platform */}
        {c.poweredBy ? <PoweredBy content={c.poweredBy} media={media.poweredBy} /> : null}
        {/* 11. Built to be trusted */}
        {c.trusted ? <BuiltToBeTrusted content={c.trusted} media={media.trusted} /> : null}
        {/* 12. Prefooter (FullBleedMediaSection, default startPercentage 10) */}
        {c.prefooter ? (
          <>
            <div className="h-16 w-full bg-[var(--ent-bg,#fff)]" />
            <FullBleedMedia
              wrapperClassName=""
              backdropClassName="bg-[var(--ent-bg,#fff)]"
              startPercentage={10}
              image={c.prefooter.image}
              media={media.prefooter}
              headline={c.prefooter.headline}
              body={c.prefooter.body}
              primary={c.prefooter.cta}
              secondary={c.prefooter.secondary}
            />
            <div className="h-8 w-full bg-[var(--ent-bg,#fff)]" />
          </>
        ) : null}
      </div>
    </div>
  )
}
