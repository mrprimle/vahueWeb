'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from './animatedText'
import s from './styles.module.css'

/*
 * Scale's "Supported Data" block (DataLabeling, automotive clone), on Vahue dark: lavender-tinted panel
 * (#cc76ff at 2%) with a 50% radial glow; 466px text column on the right (row-reverse, gap 64), media panel
 * absolutely centred on the left (xl: -left-24, top 50%, translate(40px, -50%)), 649x402.
 *
 * Tabs: active pill tweens to the selected tab, gsap.to(pill, { left, width, height, duration: 0.2, ease: 'Power2.inOut' }).
 * Panel rows fade/rise in sequence like the template's text-highlight groups:
 *   fromTo({ autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut' }), first delay 0.5, then '>'.
 * Here the tabs are the workflow's before and after states; each panel lists that state.
 */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

type Tab = { title: string; caption: string; items: string[]; tone: 'muted' | 'bright' }

function StatePanel({ tab }: { tab: Tab }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true })
      el.querySelectorAll('[data-row]').forEach((row, i) => {
        tl.fromTo(
          row.querySelectorAll('[data-part]'),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut', ...(i === 0 ? { delay: 0.5 } : {}) },
          i === 0 ? undefined : '>',
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])
  const bright = tab.tone === 'bright'
  return (
    <div
      ref={ref}
      className={`${s.panelMedia} hero-texture flex min-h-[240px] w-full flex-col overflow-hidden sm:aspect-[649/402] rounded-lg border border-border-soft bg-[#0b0b0c] p-6 md:p-8 xl:max-w-[649px]`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 md:pb-5">
        <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white">{tab.title}</p>
        <p className="font-mono text-[11px] uppercase leading-6 tracking-[1px] text-white/45">{tab.caption}</p>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-3 md:gap-5">
        {tab.items.map((item, i) => (
          <li key={item} data-row className="flex items-start gap-3 md:gap-4">
            <span data-part className="mt-[3px] w-6 shrink-0 font-mono text-[11px] leading-6 tracking-[1px] text-white/45 md:mt-[5px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              data-part
              className={`text-[16px] leading-[1.4] tracking-[-0.01em] md:text-[24px] md:leading-[1.33] ${bright ? 'text-white' : 'text-white/55'}`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Tabs({ tabs, note, cta }: { tabs: Tab[]; note: string; cta: { label: string; href: string } }) {
  const [active, setActive] = useState(0)
  const btns = useRef<(HTMLButtonElement | null)[]>([])
  const pill = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useIso(() => {
    const t = btns.current[active]
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
      const t = btns.current[active]
      if (t && pill.current) gsap.set(pill.current, { left: t.offsetLeft, top: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (active + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    setActive(n)
    btns.current[n]?.focus()
  }

  return (
    <div className="flex flex-col-reverse items-start lg:flex-row">
      <div className="no-scrollbar relative max-w-full overflow-visible sm:mx-0 lg:w-[47%] xl:w-auto">
        <div className="no-scrollbar -mx-8 mb-8 overflow-x-auto px-8 lg:overflow-visible">
          <div className={s.tabs} role="tablist" onKeyDown={onKey}>
            <div ref={pill} className="absolute rounded-full border border-white/10 bg-white/10" />
            {tabs.map((t, i) => (
              <button
                key={t.title}
                ref={(el) => {
                  btns.current[i] = el
                }}
                type="button"
                role="tab"
                id={`wf-state-tab-${i}`}
                aria-controls={`wf-state-panel-${i}`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`${s.tab} ${active === i || active - 1 === i ? s.noDivider : ''} ${active === i ? 'text-white' : 'text-white/50'}`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
        <p className="mb-8 text-[16px] leading-6 tracking-[-0.01em] text-white/55">{note}</p>
        <div className="flex flex-wrap items-center gap-x-3 font-display xs:gap-x-6">
          <div className={s.glass}>
            <a href={cta.href} className={s.glassInner}>
              <span className="relative z-[1] flex items-center whitespace-nowrap px-[17px] py-2 text-[14px] font-medium leading-5 text-white">
                {cta.label}
                <span className={`${s.glassArrow} font-normal`} aria-hidden>
                  →
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full xl:absolute xl:-left-24 xl:top-1/2">
        {tabs.map((t, i) => (
          <div key={t.title} role="tabpanel" id={`wf-state-panel-${i}`} aria-labelledby={`wf-state-tab-${i}`} hidden={active !== i}>
            {active === i ? <StatePanel tab={t} /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

type Props = {
  heading: string
  sub: string
  before: string[]
  after: string[]
  note: string
  cta: { label: string; href: string }
}

export default function BeforeAfterTabs({ heading, sub, before, after, note, cta }: Props) {
  const tabs: Tab[] = [
    { title: 'Before', caption: 'Today', items: before, tone: 'muted' },
    { title: 'After', caption: 'With agents', items: after, tone: 'bright' },
  ]
  return (
    <div className="mt-10 bg-[#cc76ff]/[0.02]">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse lg:gap-16" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full flex-col justify-center lg:items-start xl:flex xl:w-auto xl:min-w-[466px] xl:max-w-[466px]">
          <p className="mb-2 font-display text-[32px] leading-[1.5] tracking-[-0.01em] text-white xl:text-[36px] xl:leading-[1.25]">{heading}</p>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-white/55">{sub}</p>
          <div className={`${s.pinkGlow} pointer-events-none absolute inset-0 select-none opacity-50`} />
          <div className="mt-8 lg:mt-10">
            <Tabs tabs={tabs} note={note} cta={cta} />
          </div>
        </div>
      </div>
    </div>
  )
}
