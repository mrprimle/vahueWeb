import type { ReactNode } from 'react'
import styles from './styles.module.css'

/*
 * Sections of the generative-ai-data-engine clone (components/scale-clone/generative-ai-data-engine/Sections.tsx),
 * in the clone's own colours. Where Scale ships a raster with baked-in text (expertise.png, product-overview.webp,
 * lifecycle.png) we draw our own SVG on the same viewBox, so the panel scales exactly like Scale's image.
 */

/** Standard CMS slice: `py-18 lg:py-20 !pt-8 !pb-10 md:!pt-10` around the 1472px shell. */
export function Slice({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/** Centered eyebrow / H2 / lead block. */
export function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[#525252]">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance font-display text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-black md:text-[44px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        {lead ? (
          <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-black/70 lg:mt-2 lg:text-[20px]">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Two lines joined with a <br/> (Scale breaks these headings by hand). */
export const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((l, i) => (
      <span key={l}>
        {i > 0 ? <br /> : null}
        {l}
      </span>
    ))}
  </>
)

/** The clone's `bg-white/10 rounded-2xl` panel around a full-width visual. */
export function Panel({ children, padded = false }: { children: ReactNode; padded?: boolean }) {
  return <div className={`relative z-10 overflow-hidden rounded-2xl bg-white/10 md:overflow-visible ${padded ? 'p-1' : 'p-0'}`}>{children}</div>
}

// Material icon paths (Apache 2.0) for the capability cards.
const CARD_ICONS: Record<string, string> = {
  sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  person: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  balance: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
}

type Expertise = {
  cards: { title: string[]; body: string[]; icon: string }[]
  stats: { value: string; label: string }[]
  legend: string[]
}

/** Clone slot: expertise.png (1188 x 616): four capability cards, two stats, a dot map and a legend. */
export function ExpertisePanel({ data }: { data: Expertise }) {
  const CARD = [
    [48, 48],
    [286, 48],
    [48, 324],
    [286, 324],
  ]
  // Dot field in place of Scale's dot world map: 30 x 11 dots, a band of them highlighted as synced.
  const dots: { x: number; y: number; on: boolean; off: boolean }[] = []
  for (let r = 0; r < 11; r++)
    for (let c = 0; c < 30; c++) {
      const edge = (c * 7 + r * 13) % 11
      if (edge === 0 && (r + c) % 3 === 0) continue
      dots.push({ x: 548 + c * 20, y: 214 + r * 26, on: c < 9 + r * 1.1 && c > r * 0.6, off: (c * 3 + r * 5) % 17 === 0 })
    }
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        <Panel>
          <svg viewBox="0 0 1188 616" className="block h-auto w-full font-display" role="img" aria-label={data.cards.map((c) => c.title.join(' ')).join(', ')}>
            <rect width="1188" height="616" rx="22" fill="#f2f2f2" />
            {data.cards.map((c, i) => {
              const [x, y] = CARD[i]
              return (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <rect width="206" height="244" rx="22" fill="#fff" />
                  {c.title.map((t, k) => (
                    <text key={t} x="103" y={52 + k * 24 - (c.title.length - 1) * 0} textAnchor="middle" fontSize="15" fill="#111">
                      {t}
                    </text>
                  ))}
                  <g transform="translate(78 92)">
                    <rect width="50" height="50" rx="14" fill="#fff" stroke="#111" strokeWidth="1.5" />
                    <path d={CARD_ICONS[c.icon]} transform="translate(13 13) scale(1)" fill="#111" />
                  </g>
                  {c.body.map((t, k) => (
                    <text key={t} x="103" y={186 + k * 16} textAnchor="middle" fontSize="11" fill="#333">
                      {t}
                    </text>
                  ))}
                </g>
              )
            })}
            {data.stats.map((s, i) => (
              <g key={s.label} transform={`translate(${750 + i * 160} 0)`}>
                <text x="0" y="128" fontSize="34" fill="#000">
                  {s.value}
                </text>
                <text x="-50" y="170" fontSize="13" letterSpacing="1.5" fill="#000">
                  {s.label.toUpperCase()}
                </text>
              </g>
            ))}
            {dots.map((d, i) => (d.off ? null : <circle key={i} cx={d.x} cy={d.y} r="3.4" fill={d.on ? '#79648C' : '#b9b9b9'} />))}
            <circle cx="602" cy="517" r="7" fill="#79648C" />
            <text x="620" y="522" fontSize="13" fill="#111">
              {data.legend[0]}
            </text>
            <circle cx="836" cy="517" r="7" fill="#b9b9b9" />
            <text x="854" y="522" fontSize="13" fill="#111">
              {data.legend[1]}
            </text>
          </svg>
        </Panel>
      </div>
    </Slice>
  )
}

/** Clone OverviewSplit: H3 on the left, padded panel on the right (Scale: black product-overview.webp, 1920 x 1190). */
export function OverviewSplit({ statement, phases }: { statement: string; phases: { name: string; length: string; body: string }[] }) {
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 select-none`} />
          <h3 className="relative font-display text-[20px] font-medium leading-[1.625] tracking-[-0.01em] text-black">{statement}</h3>
          <div>
            <Panel padded>
              <svg viewBox="0 0 1920 1190" className="block h-auto w-full rounded-xl font-display" role="img" aria-label={phases.map((p) => `${p.name}, ${p.length}`).join('; ')}>
                <rect width="1920" height="1190" rx="24" fill="#000" />
                <text x="160" y="230" fontSize="34" letterSpacing="3" fill="#8f8f8f">
                  HOW WE START
                </text>
                {phases.map((p, i) => (
                  <g key={p.name} transform={`translate(160 ${330 + i * 250})`}>
                    <line x1="0" y1="0" x2="1600" y2="0" stroke="#2c2c2c" strokeWidth="2" />
                    <text x="0" y="110" fontSize="34" fill="#6f6f6f">
                      {String(i + 1).padStart(2, '0')}
                    </text>
                    <text x="140" y="120" fontSize="96" fill="#fff">
                      {p.name}
                    </text>
                    <text x="1600" y="114" fontSize="40" textAnchor="end" fill="#D1AAD7">
                      {p.length}
                    </text>
                  </g>
                ))}
              </svg>
            </Panel>
          </div>
        </div>
      </div>
    </Slice>
  )
}

const BOX = { fill: '#fff' }
const LINE = { stroke: '#8a8a8a', strokeWidth: 2, fill: 'none' }
const TITLE = { fontSize: 30, fill: '#111' }
const SMALL = { fontSize: 20, fill: '#6b6b6b' }

/** Wrap a step body into lines of about `n` characters for the SVG nodes. */
function wrap(text: string, n = 26) {
  const out: string[] = []
  let line = ''
  for (const w of text.split(' ')) {
    if ((line + ' ' + w).trim().length > n) {
      out.push(line.trim())
      line = w
    } else line += ' ' + w
  }
  if (line.trim()) out.push(line.trim())
  return out
}

type Lifecycle = {
  eyebrow: string
  title: string[]
  lead: string
  steps: { title: string; body: string }[]
  sideIn: string
  sideOut: string
  exceptions: string
  footnote: string
}

/** Clone Lifecycle: header + full-width panel. Scale's lifecycle.png (1216 x 637) is redrawn on the same aspect. */
export function Lifecycle({ data }: { data: Lifecycle }) {
  const [watch, match, write, report] = data.steps
  const node = (s: { title: string; body: string }, x: number, y: number) => (
    <g key={s.title}>
      <rect x={x} y={y} width="307" height="225" rx="36" {...BOX} />
      <text x={x + 30} y={y + 56} {...TITLE}>
        {s.title}
      </text>
      {wrap(s.body).map((l, i) => (
        <text key={l} x={x + 30} y={y + 150 + i * 24} {...SMALL}>
          {l}
        </text>
      ))}
    </g>
  )
  return (
    <Slice>
      <SectionHeader eyebrow={data.eyebrow} title={<Lines lines={data.title} />} lead={data.lead} />
      <div>
        <Panel>
          <svg viewBox="0 0 1920 1006" className="block h-auto w-full font-display" role="img" aria-label={data.steps.map((s) => `${s.title}: ${s.body}`).join(' ')}>
            <defs>
              <marker id="bo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M0 1 L9 5 L0 9 z" fill="#8a8a8a" />
              </marker>
            </defs>
            <rect width="1920" height="1006" rx="24" fill="#f3f3f3" />
            <path d="M323 455 H471" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M808 455 H1110" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M1448 455 H1596" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M606 340 C606 255 690 198 803 189" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M1115 189 C1228 196 1310 255 1313 338" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M1313 568 C1310 650 1228 712 1117 720" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M805 720 C692 713 610 652 606 570" {...LINE} markerEnd="url(#bo-arrow)" />
            <path d="M1727 513 V705" {...LINE} strokeDasharray="8 7" markerEnd="url(#bo-arrow)" />
            <path d="M1543 753 H1119" {...LINE} strokeDasharray="8 7" markerEnd="url(#bo-arrow)" />
            <rect x="77" y="399" width="231" height="112" rx="44" {...BOX} />
            <text x="192.5" y="464" textAnchor="middle" {...TITLE} fontSize={26}>
              {data.sideIn}
            </text>
            <rect x="1613" y="399" width="230" height="112" rx="44" {...BOX} />
            <text x="1728" y="464" textAnchor="middle" {...TITLE} fontSize={26}>
              {data.sideOut}
            </text>
            <rect x="1545" y="710" width="300" height="87" rx="43" fill="#fff" stroke="#cfcfcf" strokeWidth="1.5" strokeDasharray="7 6" />
            <text x="1695" y="762" textAnchor="middle" {...TITLE} fontSize={24}>
              {data.exceptions}
            </text>
            {watch ? node(watch, 487, 342) : null}
            {match ? node(match, 806, 77) : null}
            {write ? node(write, 1127, 342) : null}
            {report ? node(report, 806, 607) : null}
            <text x="960" y="917" textAnchor="middle" fontSize={22} fill="#6b6b6b">
              {data.footnote}
            </text>
          </svg>
        </Panel>
      </div>
    </Slice>
  )
}

// react-icons Material Design glyphs (MIT): fact check, call split, shield, history, cloud, insights.
const ICONS: string[] = [
  'M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM10 7H5v2h5V7zm0 4H5v2h5v-2zm0 4H5v2h5v-2zm9.08-5.59L17.66 8l-3.17 3.17-1.41-1.42-1.41 1.41L14.49 14z',
  'M18 3h-5v2h3.59l-3.3 3.29 1.42 1.42L18 6.41V10h2V5c0-1.1-.9-2-2-2zM8 3H3v2h3.59l7.05 7.05c.23.23.36.55.36.88V21h2v-7.07c0-.86-.34-1.67-.95-2.27L8.41 5H12V3H8z',
  'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
  'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z',
  'M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z',
]

/** Clone Features: icon grid of six (here the control layer every workflow runs under). */
export function Features({
  eyebrow,
  title,
  lead,
  items,
}: {
  eyebrow: string
  title: string[]
  lead: string
  items: { title: string; body: string }[]
}) {
  return (
    <Slice>
      <SectionHeader eyebrow={eyebrow} title={<Lines lines={title} />} lead={lead} />
      <div className="!flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {items.map((f, i) => (
          <div key={f.title} className="flex-shrink-0 flex-grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
                <span className="flex h-6 w-6 items-center justify-center">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                    <path d={ICONS[i % ICONS.length]} />
                  </svg>
                </span>
              </figure>
            </div>
            <div>
              <h4 className="relative mt-6 whitespace-pre-line font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black">{f.title}</h4>
              <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slice>
  )
}
