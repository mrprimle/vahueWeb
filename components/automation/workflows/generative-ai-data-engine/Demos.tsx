'use client'

import { useCallback, useRef, useState, type ReactNode } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { WheelControls } from './keenWheel'
import 'keen-slider/keen-slider.min.css'
import styles from './styles.module.css'

/*
 * Clone Demos (components/scale-clone/generative-ai-data-engine/Demos.tsx): big player + Keen carousel of 3,
 * same options and colours. Scale's posters are Wistia stills of its product; ours are SVG mocks of the
 * workflow (illustrative strings, not a client record). There is no video, so no play disc: the slide click
 * swaps the big panel exactly as on Scale.
 */

const W = 960
const H = 536

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-full w-full font-display" aria-hidden>
      <rect width={W} height={H} fill="#f2f2f2" />
      <rect x="60" y="50" width="840" height="436" rx="16" fill="#fff" />
      <circle cx="90" cy="80" r="6" fill="#e2e2e2" />
      <circle cx="110" cy="80" r="6" fill="#e2e2e2" />
      <circle cx="130" cy="80" r="6" fill="#e2e2e2" />
      <text x="480" y="86" textAnchor="middle" fontSize="16" fill="#525252">
        {title}
      </text>
      <line x1="60" y1="110" x2="900" y2="110" stroke="#ededed" />
      {children}
    </svg>
  )
}

const Tick = ({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="11" fill={ok ? '#193A29' : '#E7131A'} />
    <path d={ok ? 'M-5 0 L-1.5 3.5 L5 -3' : 'M-4 -4 L4 4 M4 -4 L-4 4'} stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
  </g>
)

function OrderSync() {
  const rows = ['SO-2291  Northwind Ltd', 'SO-2292  Acme Supply', 'SO-2293  Halden & Co', 'SO-2294  Brightline']
  return (
    <Frame title="CRM → ERP order sync">
      <text x="110" y="160" fontSize="14" letterSpacing="1.5" fill="#8a8a8a">CRM</text>
      <text x="560" y="160" fontSize="14" letterSpacing="1.5" fill="#8a8a8a">ERP</text>
      {rows.map((r, i) => (
        <g key={r}>
          <rect x="110" y={180 + i * 66} width="300" height="48" rx="10" fill="#f6f6f6" />
          <text x="130" y={210 + i * 66} fontSize="17" fill="#212121">{r}</text>
          <path d={`M420 ${204 + i * 66} H540`} stroke="#8a8a8a" strokeWidth="2" strokeDasharray={i === 3 ? '6 6' : undefined} />
          <rect x="560" y={180 + i * 66} width="300" height="48" rx="10" fill={i === 3 ? '#fff' : '#f6f6f6'} stroke={i === 3 ? '#cfcfcf' : 'none'} strokeDasharray="6 5" />
          <text x="580" y={210 + i * 66} fontSize="17" fill={i === 3 ? '#8a8a8a' : '#212121'}>{i === 3 ? 'Syncing…' : r}</text>
          {i < 3 ? <Tick x={836} y={204 + i * 66} /> : null}
        </g>
      ))}
    </Frame>
  )
}

function Reconciliation() {
  const rows: [string, string, boolean][] = [
    ['Bank 4471', '12,480.00', true],
    ['Bank 4472', '3,915.20', true],
    ['Bank 4473', '880.00', false],
    ['Bank 4474', '7,104.65', true],
    ['Bank 4475', '1,250.00', true],
  ]
  return (
    <Frame title="Overnight reconciliation">
      <text x="110" y="156" fontSize="14" letterSpacing="1.5" fill="#8a8a8a">ENTRY</text>
      <text x="420" y="156" fontSize="14" letterSpacing="1.5" fill="#8a8a8a">AMOUNT</text>
      <text x="640" y="156" fontSize="14" letterSpacing="1.5" fill="#8a8a8a">LEDGER MATCH</text>
      {rows.map(([a, b, ok], i) => (
        <g key={a}>
          <line x1="110" y1={176 + i * 58} x2="850" y2={176 + i * 58} stroke="#efefef" />
          <text x="110" y={212 + i * 58} fontSize="17" fill="#212121">{a}</text>
          <text x="420" y={212 + i * 58} fontSize="17" fill="#212121">{b}</text>
          <Tick x={652} y={206 + i * 58} ok={ok} />
          <text x="676" y={212 + i * 58} fontSize="16" fill={ok ? '#525252' : '#E7131A'}>{ok ? 'Matched' : 'Sent to review'}</text>
        </g>
      ))}
    </Frame>
  )
}

function ExceptionQueue() {
  const items = ['Invoice total differs from the PO by 4%', 'Customer exists twice in the CRM', 'Credit note needs approval']
  return (
    <Frame title="Exception review queue">
      {items.map((t, i) => (
        <g key={t}>
          <rect x="110" y={146 + i * 106} width="740" height="88" rx="12" fill="#f6f6f6" />
          <text x="136" y={182 + i * 106} fontSize="18" fill="#212121">{t}</text>
          <text x="136" y={210 + i * 106} fontSize="14" fill="#8a8a8a">Proposed by the agent · waiting for a person</text>
          <rect x="628" y={168 + i * 106} width="96" height="40" rx="8" fill="#000" />
          <text x="676" y={194 + i * 106} textAnchor="middle" fontSize="15" fill="#fff">Approve</text>
          <rect x="734" y={168 + i * 106} width="96" height="40" rx="8" fill="#fff" stroke="#cfcfcf" />
          <text x="782" y={194 + i * 106} textAnchor="middle" fontSize="15" fill="#212121">Reject</text>
        </g>
      ))}
    </Frame>
  )
}

const MOCKS = [OrderSync, Reconciliation, ExceptionQueue]

// Scale's VideoGallery (chunk 30w17vppvfdah.js, module 482270), Keen Slider options copied verbatim:
//  - slide click: becomes active; on >= 640px the gallery smooth-scrolls to 16px below the viewport top
//    (Scale also autoplays its Wistia video there; these panels are static mocks)
//  - slideChanged: active = track abs; cursor starts 'default' (<= 3 slides), 'grabbing' while dragging, 'grab'
//  - dots render once the slider is created
export default function Demos({ titles }: { titles: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [created, setCreated] = useState(false)
  const [cursor, setCursor] = useState<'default' | 'grab' | 'grabbing'>(() => (titles.length > 3 ? 'grab' : 'default'))
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    rubberband: false,
    created: () => setCreated(true),
    dragStarted: () => setCursor('grabbing'),
    dragEnded: () => setCursor('grab'),
    slideChanged: (s) => setActive(s.track.details.abs),
    breakpoints: {
      '(min-width: 0px) and (max-width: 639px)': { slides: { perView: 1, spacing: 32 }, mode: 'snap' },
      '(min-width: 640px) and (max-width: 767px)': { slides: { perView: 2, spacing: 32 }, mode: 'free' },
      '(min-width: 768px) and (max-width: 1040px)': { slides: { perView: 3.1, spacing: 32 }, mode: 'snap' },
      '(min-width: 1041px)': { slides: { perView: 3, spacing: 32 }, mode: 'snap' },
    },
  }, [WheelControls])
  const scrollToGallery = useCallback(() => {
    const el = rootRef.current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' })
  }, [])
  const onSlideClick = (i: number) => {
    setActive(i)
    if (!matchMedia('(max-width: 639px)').matches) scrollToGallery()
  }
  const Active = MOCKS[active % MOCKS.length]

  return (
    <div ref={rootRef} className="relative scroll-mt-[-15px]">
      <div className="relative mb-12 flex flex-col gap-y-10 sm:mb-0">
        <div key={active} role="img" aria-label={titles[active]} className={`${styles.fadeIn} relative hidden aspect-video w-full overflow-hidden rounded-2xl bg-[#f2f2f2] sm:block`}>
          <Active />
        </div>

        <div ref={ref} className="keen-slider !overflow-visible" style={{ cursor }}>
          {titles.map((t, i) => {
            const Mock = MOCKS[i % MOCKS.length]
            return (
              <div
                key={t}
                onClick={() => onSlideClick(i)}
                className={`keen-slider__slide !overflow-visible grid h-fit cursor-pointer transition-opacity duration-300 ${
                  i === active ? 'opacity-100' : 'opacity-100 hover:opacity-70 sm:opacity-50 sm:hover:opacity-70'
                }`}
              >
                <button type="button" aria-label={`Show ${t}`} className="relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f2f2f2] sm:hidden">
                  <Mock />
                </button>
                <button type="button" aria-label={`Show ${t}`} aria-pressed={i === active} className={`${styles.videoThumb} hidden cursor-pointer text-left sm:block`}>
                  <span className="block aspect-[384/214] w-[384px] max-w-full overflow-hidden rounded-[11px]">
                    <Mock />
                  </span>
                </button>
                <div className="relative">
                  <h4 className="mb-3 mt-2 font-display text-[24px] font-normal leading-[1.33] tracking-[-0.01em] text-black">{t}</h4>
                </div>
              </div>
            )
          })}
        </div>

        {created && slider.current ? (
          <div className="relative z-50 mx-auto flex justify-center gap-x-1 sm:hidden">
            {titles.map((t, i) => (
              <button key={t} type="button" aria-label={`Go to ${t}`} className="cursor-pointer px-0.5 py-2" onClick={() => slider.current?.moveToIdx(i)}>
                <span className={`block min-h-[10px] min-w-[10px] rounded-full transition-colors ${i === active ? 'bg-white' : 'bg-[#37383B]'}`} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
