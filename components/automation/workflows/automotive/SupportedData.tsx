'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from './animatedText'
import s from './styles.module.css'

/*
 * "Supported Data" (Scale's DataLabeling block), copied from the automotive clone with Vahue tabs and own panels: pink-tinted panel (bg #cc76ff at 2%) with a
 * 50% pink radial glow; 466px text column on the right (row-reverse, gap 64), media panel absolutely
 * centred on the left (xl: -left-24, top 50%, translate(40px, -50%)), 649x402, super shadow.
 *
 * Tabs = headless-ui Tab.Group. Active pill indicator tweens to the selected tab:
 *   gsap.to(indicator, { left, width, height, duration: 0.2, ease: 'Power2.inOut' })
 * Text panel: highlight groups fade/rise in sequence:
 *   fromTo({ autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut' }), first delay 0.5, then '>'
 */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

// Own 649x402 panel in place of Scale's media (lidar still / photos / text editor / audio demo): a dark scoring
// console for the selected kind of decision. The four highlight colours fade/rise in sequence like Scale's text tab.
type DecisionTab = { title: string; rows: string[] }
const ROUTES: [string, string][] = [
  ['ECA6FA', 'To reviewer'],
  ['B2FCD2', 'Approved'],
  ['DBC6FC', 'Approved'],
  ['E7FE53', 'Flagged'],
]
const SCORES = [0.54, 0.91, 0.83, 0.38]

function ScorePanel({ tab }: { tab: DecisionTab }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true })
      ROUTES.forEach(([c], i) => {
        tl.fromTo(
          el.querySelectorAll(`[data-color="${c}"]`),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut', ...(i === 0 ? { delay: 0.5 } : {}) },
          i === 0 ? undefined : '>',
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <svg
      ref={ref}
      viewBox="0 0 649 402"
      fill="none"
      className={`${s.panelMedia} aspect-[649/402] w-full rounded-lg bg-black font-display xl:max-w-[649px]`}
      role="img"
      aria-label={`${tab.title}: each item scored, explained and routed`}
    >
      <path fill="#111519" d="M0 0h649v402H0z" />
      <text x="32" y="56" fontSize="15" fill="#fff" opacity=".9">
        {tab.title}
      </text>
      <text x="617" y="56" fontSize="12" fill="#fff" opacity=".45" textAnchor="end">
        SCORE · EXPLANATION · ROUTE
      </text>
      <rect x="32" y="80" width="586" height="1" fill="#fff" opacity=".12" />
      {tab.rows.map((r, i) => {
        const [c, route] = ROUTES[i % ROUTES.length]
        const score = SCORES[i % SCORES.length]
        return (
          <g key={r}>
            <text x="32" y={128 + i * 72} fontSize="14" fill="#fff" opacity=".85">
              {r}
            </text>
            <rect x="32" y={142 + i * 72} width="300" height="6" rx="3" fill="#fff" opacity=".12" />
            <rect x="32" y={142 + i * 72} width={300 * score} height="6" rx="3" fill="#fff" opacity=".5" />
            <g data-color={c}>
              <rect x="470" y={112 + i * 72} width="148" height="26" rx="6" fill={`#${c}`} opacity=".9" />
              <text x="544" y={130 + i * 72} fontSize="12.5" fill="#111519" textAnchor="middle">
                {route}
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

function Tabs({ tabs: TABS, body, cta }: { tabs: DecisionTab[]; body: string; cta: { label: string; href: string } }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const pill = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useIso(() => {
    const t = tabs.current[active]
    const p = pill.current
    if (!t || !p) return
    const to = { left: t.offsetLeft, top: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight }
    if (first.current || prefersReducedMotion()) {
      first.current = false
      gsap.set(p, to)
      return
    }
    const tl = gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true })
    tl.to(p, { ...to, duration: 0.2, ease: 'Power2.inOut' })
    return () => {
      tl.kill()
    }
  }, [active])

  // Re-measure after web fonts settle.
  useEffect(() => {
    document.fonts?.ready.then(() => {
      const t = tabs.current[active]
      if (t && pill.current) gsap.set(pill.current, { left: t.offsetLeft, top: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // headless-ui Tab keyboard model (horizontal, automatic activation), measured on scale.com: moves from the
  // focused tab; ArrowRight / ArrowLeft wrap, Home / PageUp -> first, End / PageDown -> last, Enter / Space
  // select; focus and selection move together.
  const onKey = (e: React.KeyboardEvent) => {
    const list = tabs.current.slice(0, TABS.length)
    const cur = list.indexOf(e.target as HTMLButtonElement)
    if (cur < 0) return
    let n: number
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setActive(cur)
        return
      case 'Home':
      case 'PageUp':
        n = 0
        break
      case 'End':
      case 'PageDown':
        n = list.length - 1
        break
      case 'ArrowRight':
        n = (cur + 1) % list.length
        break
      case 'ArrowLeft':
        n = (cur - 1 + list.length) % list.length
        break
      default:
        return
    }
    e.preventDefault()
    list[n]?.focus()
    setActive(n)
  }

  return (
    <div className="flex flex-col-reverse items-start lg:flex-row">
      <div className="no-scrollbar relative max-w-full overflow-visible sm:mx-0 lg:w-[47%] xl:w-auto">
        <div className="no-scrollbar -mx-8 mb-8 overflow-x-auto px-8 lg:overflow-visible">
          <div className={s.tabs} role="tablist" onKeyDown={onKey}>
            <div ref={pill} className="absolute rounded-full border border-black/10 bg-black/10" />
            {TABS.map((t, i) => (
              <button
                key={t.title}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`${s.tab} ${active === i || active - 1 === i ? s.noDivider : ''} ${active === i ? 'text-black' : 'text-black/50'}`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
        <p className="mb-8 text-[16px] leading-6 tracking-[-0.01em] text-gray-500">{body}</p>
        <div className="flex flex-wrap items-center gap-x-3 font-display xs:gap-x-6">
          <div data-qa="glass" className={s.glass}>
            <a href={cta.href} className={s.glassInner}>
              <span className="relative z-[1] flex items-center whitespace-nowrap px-[17px] py-2 text-[14px] font-medium leading-5 text-white">
                {cta.label}
                <span className={`${s.glassArrow} font-normal`}>→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full xl:absolute xl:-left-24 xl:top-1/2">
        {TABS.map((t, i) => (
          <div key={t.title} role="tabpanel" hidden={active !== i}>
            {active === i ? <ScorePanel tab={t} /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SupportedData({
  heading,
  sub,
  body,
  cta,
  tabs,
}: {
  heading: string
  sub: string
  body: string
  cta: { label: string; href: string }
  tabs: DecisionTab[]
}) {
  return (
    <div className="mt-10 bg-[#cc76ff]/[0.02]">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse lg:gap-16" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full flex-col justify-center lg:items-start xl:flex xl:w-auto xl:min-w-[466px] xl:max-w-[466px]">
          <p className="mb-2 font-display text-[32px] leading-[1.5] tracking-[-0.01em] text-[#010101] xl:text-[36px] xl:leading-[1.25]">
            {heading}
          </p>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-[#a1a1aa]">{sub}</p>
          <div className={`${s.pinkGlow} pointer-events-none absolute inset-0 select-none opacity-50`} />
          <div className="mt-8 lg:mt-10">
            <Tabs tabs={tabs} body={body} cta={cta} />
          </div>
        </div>
      </div>
    </div>
  )
}
