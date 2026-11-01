'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ASSET } from './Sections'
import { prefersReducedMotion } from './animatedText'
import s from './automotive.module.css'

/*
 * "Supported Data" (Scale's DataLabeling block, inverted): pink-tinted panel (bg #cc76ff at 2%) with a
 * 50% pink radial glow; 466px text column on the right (row-reverse, gap 64), media panel absolutely
 * centred on the left (xl: -left-24, top 50%, translate(40px, -50%)), 649x402, super shadow.
 *
 * Tabs = headless-ui Tab.Group. Active pill indicator tweens to the selected tab:
 *   gsap.to(indicator, { left, width, height, duration: 0.2, ease: 'Power2.inOut' })
 * Text panel: highlight groups fade/rise in sequence:
 *   fromTo({ autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut' }), first delay 0.5, then '>'
 */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

function LidarPanel() {
  // Scale lazy-mounts an iframe (lidar-now.scale.com) behind this placeholder still. The clone keeps the still.
  return (
    <div
      className={`${s.panelMedia} aspect-[649/402] w-full min-w-full max-w-max overflow-hidden rounded-[10px] border border-[#D1AAD7]/[0.16] bg-black lg:w-1/2 lg:min-w-[50%] xl:min-w-[unset]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${ASSET}/lidar.jpg`} alt="" className="h-full w-full object-cover" />
    </div>
  )
}

function ImagePanel({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={649} height={402} className={`${s.panelMedia} aspect-[649/402] w-full rounded-lg bg-black object-cover`} />
  )
}

// Placeholder "text labelling" frame: dark editor with lines of copy and four highlight groups.
const LINES: { y: number; parts: [number, number, string?][] }[] = [
  { y: 112, parts: [[40, 120], [168, 90, 'ECA6FA'], [266, 150], [424, 80, 'E7FE53'], [512, 90]] },
  { y: 146, parts: [[40, 70], [118, 130], [256, 110, 'DBC6FC'], [374, 160]] },
  { y: 180, parts: [[40, 150, 'B2FCD2'], [198, 100], [306, 80, 'ECA6FA'], [394, 170]] },
  { y: 214, parts: [[40, 110], [158, 90, 'E7FE53'], [256, 190], [454, 110, 'DBC6FC']] },
  { y: 248, parts: [[40, 200], [248, 70, 'B2FCD2'], [326, 140]] },
  { y: 282, parts: [[40, 90, 'ECA6FA'], [138, 160], [306, 100, 'E7FE53'], [414, 120]] },
  { y: 316, parts: [[40, 130], [178, 120, 'DBC6FC'], [306, 90], [404, 80, 'B2FCD2']] },
]

function TextPanel() {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true })
      ;['ECA6FA', 'E7FE53', 'DBC6FC', 'B2FCD2'].forEach((c, i) => {
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
      className={`${s.panelMedia} aspect-[649/402] w-full rounded-lg bg-black xl:max-w-[649px]`}
      aria-hidden="true"
    >
      <path fill="#111519" d="M0 0h649v402H0z" />
      <path
        d="M42.19 53.99h7.64M46.01 39.98a1.8 1.8 0 012.55 2.55L37.95 53.14l-3.4.85.85-3.4L46.01 39.98Z"
        stroke="#fff"
        strokeWidth="1.698"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="62" y="41" width="120" height="14" rx="3" fill="#fff" opacity=".9" />
      <rect x="32" y="80" width="586" height="1" fill="#fff" opacity=".12" />
      {LINES.map((l) =>
        l.parts.map(([x, w, c], i) => (
          <g key={`${l.y}-${i}`}>
            {c ? <rect data-color={c} x={x - 4} y={l.y - 13} width={w + 8} height={22} rx={4} fill={`#${c}`} opacity=".9" /> : null}
            <rect x={x} y={l.y - 6} width={w} height={8} rx={2} fill={c ? '#111519' : '#fff'} opacity={c ? 0.7 : 0.35} />
          </g>
        )),
      )}
    </svg>
  )
}

function AudioPanel() {
  const [ran, setRan] = useState(false)
  return (
    <div
      className={`${s.panelMedia} flex aspect-[649/402] w-full flex-col gap-3 overflow-hidden rounded-lg bg-[#111519] p-6 font-mono text-white`}
    >
      {/* TODO: Vahue copy */}
      <div className="w-fit rounded-md bg-white/10 px-3 py-1.5 text-[12px]">Please transcribe this clip.</div>
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[10px]">♪</span>
        <div>
          <p className="text-[10px] lg:text-xs">sample-clip.mp3</p>
          <p className="text-[8px] text-stone-400 lg:text-[10px]">0:00</p>
        </div>
        <div className="ml-auto h-1 w-1/2 overflow-hidden rounded bg-white/15">
          <div className="h-full bg-white/60 transition-[width] duration-[2000ms]" style={{ width: ran ? '100%' : '0%' }} />
        </div>
      </div>
      <pre className="relative flex-1 overflow-hidden rounded-lg bg-white/5 p-3 text-[10px] leading-[1.6] text-[#c8d3f5]">
        {`1  client.createTask({
2    "attachment_type": "audio",
3    "attachment": "FILE_URL",
4    "verbatim": true,
5  })`}
        {!ran ? (
          <button
            type="button"
            onClick={() => setRan(true)}
            className="absolute bottom-3 right-3 rounded-md bg-white px-3 py-1.5 text-[11px] text-black"
          >
            Run Code
          </button>
        ) : (
          <span className="absolute bottom-3 right-3 text-[10px] text-[#B2FCD2]">{'{ "transcript": "…" }'}</span>
        )}
      </pre>
    </div>
  )
}

const TABS = [
  { title: '3D', panel: <LidarPanel /> },
  { title: 'Image', panel: <ImagePanel src={`${ASSET}/living-room.webp`} /> },
  { title: 'Mapping', panel: <ImagePanel src={`${ASSET}/map.webp`} /> },
  { title: 'Text', panel: <TextPanel /> },
  { title: 'Audio', panel: <AudioPanel /> },
]

function Tabs() {
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
        {/* TODO: Vahue copy */}
        <p className="mb-8 text-[16px] leading-6 tracking-[-0.01em] text-gray-500">
          Placeholder paragraph about pairing assisted techniques with people in the loop to deliver labelled inputs with high quality,
          range and speed.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 font-display xs:gap-x-6">
          <div data-qa="glass" className={s.glass}>
            <a href="#" className={s.glassInner}>
              <span className="relative z-[1] flex items-center whitespace-nowrap px-[17px] py-2 text-[14px] font-medium leading-5 text-white">
                Label My Inputs
                <span className={`${s.glassArrow} font-normal`}>→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full xl:absolute xl:-left-24 xl:top-1/2">
        {TABS.map((t, i) => (
          <div key={t.title} role="tabpanel" hidden={active !== i}>
            {active === i ? t.panel : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SupportedData() {
  return (
    <div className="mt-10 bg-[#cc76ff]/[0.02]">
      <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse lg:gap-16" style={{ justifyContent: 'flex-start' }}>
        <div className="w-full flex-col justify-center lg:items-start xl:flex xl:w-auto xl:min-w-[466px] xl:max-w-[466px]">
          {/* TODO: Vahue copy */}
          <p className="mb-2 font-display text-[32px] leading-[1.5] tracking-[-0.01em] text-[#010101] xl:text-[36px] xl:leading-[1.25]">
            Supported Inputs
          </p>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-[#a1a1aa]">First-rate inputs for self-driving work</p>
          <div className={`${s.pinkGlow} pointer-events-none absolute inset-0 select-none opacity-50`} />
          <div className="mt-8 lg:mt-10">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  )
}
