import type { ReactNode } from 'react'
import s from './insurance.module.css'

/*
 * Static CMS slices on scale.com/enterprise/insurance (chunk 01xb85jkvr5_y "FeaturesWithIcons",
 * chunk 17ea4hx823ss4 "Features", Button color="glass"). None of them carry GSAP: no ScrollTrigger,
 * no SplitText, only CSS hover transitions.
 */

/* Material Design outline icons (react-icons md/*) exactly as rendered on scale.com, 22px in a 24px box. */
const Svg = ({ children }: { children: ReactNode }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" aria-hidden="true">
    {children}
  </svg>
)
export const icons = {
  layers: (
    <Svg>
      <path d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" />
    </Svg>
  ),
  manageSearch: (
    <Svg>
      <path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z" />
    </Svg>
  ),
  lock: (
    <Svg>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </Svg>
  ),
  assignment: (
    <Svg>
      <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
    </Svg>
  ),
  psychology: (
    <Svg>
      <path d="m15.82 7.22-1 .4c-.21-.16-.43-.29-.67-.39L14 6.17c-.02-.1-.1-.17-.2-.17h-1.6c-.1 0-.18.07-.19.17l-.15 1.06c-.24.1-.47.23-.67.39l-1-.4c-.09-.03-.2 0-.24.09l-.8 1.38a.2.2 0 0 0 .05.26l.85.66c-.03.12-.05.26-.05.39s.01.26.03.39l-.84.66a.19.19 0 0 0-.05.25l.8 1.39c.05.09.15.12.25.09l.99-.4c.21.16.43.29.68.39l.14 1.06c.02.1.1.17.2.17h1.6c.1 0 .18-.07.2-.17l.15-1.06c.24-.1.47-.23.67-.39l.99.4c.09.04.2 0 .24-.09l.8-1.39c.05-.09.03-.19-.05-.25l-.83-.66a2.561 2.561 0 0 0 0-.78l.85-.66a.2.2 0 0 0 .05-.26l-.8-1.38c-.05-.09-.16-.12-.25-.09zM13 11.43a1.43 1.43 0 1 1 0-2.86 1.43 1.43 0 0 1 0 2.86z" />
      <path d="M19.94 9.06c-.43-3.27-3.23-5.86-6.53-6.05C13.27 3 13.14 3 13 3 9.47 3 6.57 5.61 6.08 9l-1.93 3.48c-.41.66.07 1.52.85 1.52h1v2c0 1.1.9 2 2 2h1v3h7v-4.68a7.016 7.016 0 0 0 3.94-7.26zm-5.05 5.57-.89.42V19h-3v-3H8v-4H6.7l1.33-2.33C8.21 7.06 10.35 5 13 5c2.76 0 5 2.24 5 5 0 2.09-1.29 3.88-3.11 4.63z" />
    </Svg>
  ),
  lightbulb: (
    <Svg>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </Svg>
  ),
}

/* Slice wrapper: section.py-18 lg:py-20 > container max-w-[1472px] ps-6 pe-6. */
export function Slice({ children, className = 'py-[72px] lg:py-20' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-transparent ${className}`}>
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/*
 * Centred SectionHeader: mb-10 md:mt-12, max-w-3xl, items-center. The mono overtitle is rendered empty on
 * this page (0px tall, but its 20px margin-bottom still applies).
 * Title 30/1.375 -> md 42 -> lg 48/1.25; sub 16/1.6 mt-16 -> lg 20 mt-8, text-black/70.
 */
export function SectionHeader({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className={`${s.overtitle} font-mono text-[#525252]`}>
            <span />
          </div>
          {/* TODO: Vahue copy */}
          <h2 className={`${s.sectionTitle} font-display font-normal text-black`}>{title}</h2>
        </div>
        {sub ? (
          /* TODO: Vahue copy */
          <p className={`${s.centerSub} block w-full font-display font-normal text-black/70`}>{sub}</p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

/* FeaturesWithIcons, default columns: flex-wrap, gap 64 (mobile) / md gap-y-80 gap-x-24 / xl gap-x-56, cards basis-1/4 max 368. */
export type IconFeature = { icon: ReactNode; title: string; body: string }
export function IconFeatures({ items }: { items: IconFeature[] }) {
  return (
    <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
      {items.map((f, i) => (
        <div key={i} className="shrink-0 grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
          <div>
            <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
              <span className="flex h-6 w-6 items-center justify-center">{f.icon}</span>
            </figure>
          </div>
          <div>
            {/* TODO: Vahue copy */}
            <h4 className={`${s.iconTitle} relative mt-6 font-display font-normal text-black`}>{f.title}</h4>
            {/* TODO: Vahue copy */}
            <p className={`${s.iconBody} relative mt-4 font-display text-[#525252]`}>{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Button color="glass" variant="primary" size="small": 32px pill with a 1px gradient rim. */
export function GlassButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap items-center">
      <div className={s.glassWrap}>
        <a href={href} className={s.glass}>
          <span className={`${s.glassLabel} relative font-display`}>
            {children}
            <span className={s.glassArrow}>→</span>
          </span>
        </a>
      </div>
    </div>
  )
}
