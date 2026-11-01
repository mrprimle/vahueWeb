import Link from 'next/link'
import type { CaseStudy } from '@/lib/case-studies'
import { Bolt, Check, Flame, Gauge } from '@/components/templates/automotive/icons'
import LogoMarquee from './LogoMarquee'
import s from './styles.module.css'

/*
 * Static sections of the automotive clone (components/templates/automotive/Sections.tsx), same markup and colours,
 * with Vahue copy passed in. Media slots carry our own SVG visuals (no Scale imagery).
 */

// Scale's `container`: max-w 1280, px 24 -> 32 (lg), centred.
export const CONTAINER = 'mx-auto w-full max-w-[1280px] px-6 lg:px-8'

/* ---------- CMS SectionHeader (theme light, centred) ---------- */
export function SectionHeader({ over = '', title, sub }: { over?: string; title: string; sub?: string }) {
  return (
    <div className={`${s.sectionHeader} flex max-w-3xl flex-col items-center justify-center text-center`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* The overtitle block keeps its 20px margin even when empty (as on Scale). */}
          <div className={`${s.overtitle} font-mono`}>{over ? <span>{over}</span> : null}</div>
          <h2 className={`${s.sectionTitle} font-display font-normal`}>{title}</h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-display font-normal`}>{sub}</p> : null}
      </div>
    </div>
  )
}

/* ---------- Logo cloud: 2 marks -> 2 tool wordmarks in black (Scale: brightness-0 logos), md+ row, marquee below ---------- */
const ToolName = ({ name }: { name: string }) => (
  <span className="block whitespace-nowrap font-display text-[24px] font-medium leading-none tracking-[-0.02em] text-black">{name}</span>
)

export function LogoStrip({ tools }: { tools: string[] }) {
  return (
    <section className="py-10 md:py-14" aria-label="Integrations">
      <div className="w-full">
        <div className="hidden md:block">
          <ul className={`${CONTAINER} flex items-center justify-around gap-8 sm:min-h-[52px] md:gap-y-16`}>
            {tools.map((t) => (
              <li key={t} className="flex h-10 flex-col items-center justify-center gap-3">
                <ToolName name={t} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <LogoMarquee items={tools.map((t) => (
            <span key={t} className="flex h-10 items-center">
              <ToolName name={t} />
            </span>
          ))} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Overview: ChecklistWithMedia ---------- */
export function Overview({
  title,
  sub,
  checklist,
  diagram,
}: {
  title: string
  sub: string
  checklist: { title: string; body: string }[]
  diagram: [string, string, string]
}) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title={title} sub={sub} />
      <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-5/12">
          {checklist.map((c, i) => (
            <div key={c.title}>
              <div className="flex flex-row items-start gap-4">
                <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.09]">
                  <Check className="h-3 w-3 text-black/70" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] font-medium leading-6 tracking-[-0.01em] text-black">{c.title}</h3>
                  <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-black/70">{c.body}</p>
                </div>
              </div>
              {i < checklist.length - 1 ? <hr className="mt-6 border-white/10" /> : null}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center p-2 md:w-7/12">
          <OverviewDiagram labels={diagram} />
        </div>
      </div>
    </section>
  )
}

/*
 * Scale ships this loop diagram as a 2085x1740 PNG with its own labels and font baked in.
 * Redrawn as SVG (the clone's geometry) with the workflow's labels in Vahue's display face.
 */
function OverviewDiagram({ labels }: { labels: [string, string, string] }) {
  const box = (x: number, y: number) => <rect x={x} y={y} width={580} height={575} rx={72} fill="#fff" />
  const label = (x: number, y: number, t: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize={46} fill="#0a0a0a" className="font-display" letterSpacing="-0.5">
      {t}
    </text>
  )
  return (
    <svg viewBox="0 0 2000 1669" className="h-auto w-full" role="img" aria-label={`${labels.join(', then ')}, then repeat`}>
      <rect width="2000" height="1669" fill="#f2f2f2" />
      <defs>
        <marker id="am-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#8a8a8a" />
        </marker>
      </defs>
      <g fill="none" stroke="#8a8a8a" strokeWidth="3">
        <path d="M1293 463H1460Q1527 463 1527 530V890" markerEnd="url(#am-arrow)" />
        <path d="M489 958V540Q489 463 560 463H655" markerEnd="url(#am-arrow)" />
        <path d="M1218 1266H845" markerEnd="url(#am-arrow)" />
      </g>
      {box(712, 193)}
      {box(205, 958)}
      {box(1218, 958)}
      {label(1001, 352, labels[0])}
      {label(495, 1117, labels[1])}
      {label(1508, 1117, labels[2])}
      {/* tag icon */}
      <g fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M937 450Q937 433 954 433H1012Q1022 433 1030 441L1100 511Q1112 523 1100 535L1048 588Q1035 600 1022 588L947 513Q937 503 937 490Z" />
        <path d="M896 488V555Q896 565 903 572L970 639Q985 652 1006 640" />
      </g>
      <circle cx="985" cy="483" r="7" fill="#1a1a1a" />
      {/* gauge icon */}
      <g fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round">
        <path d="M403 1380A106 106 0 1 1 586 1380" />
        <path d="M495 1327L537 1286" />
      </g>
      {/* sorting bars */}
      <g>
        <rect x="1393" y="1189" width="92" height="22" fill="#1a1a1a" />
        <rect x="1393" y="1229" width="92" height="22" fill="#1a1a1a" />
        <rect x="1393" y="1270" width="92" height="22" fill="#d1d1d1" />
        <rect x="1393" y="1310" width="92" height="22" fill="#d1d1d1" />
        <rect x="1531" y="1189" width="92" height="22" fill="#d1d1d1" />
        <rect x="1531" y="1229" width="92" height="22" fill="#1a1a1a" />
        <rect x="1531" y="1270" width="92" height="22" fill="#d1d1d1" />
        <rect x="1531" y="1310" width="92" height="22" fill="#d1d1d1" />
      </g>
      <g fill="none" stroke="#555" strokeWidth="5" strokeLinecap="round">
        <path d="M1384 1192V1182H1394" />
        <path d="M1494 1250V1260H1484" />
        <path d="M1522 1232V1222H1532" />
        <path d="M1632 1250V1260H1622" />
      </g>
    </svg>
  )
}

/* ---------- Why: FeaturesWithIcons, 3 columns ---------- */
const WHY_ICONS = [<Flame key="f" />, <Gauge key="g" />, <Bolt key="b" />]

export function WhyUs({ over, title, sub, items }: { over: string; title: string; sub: string; items: { title: string; body: string }[] }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader over={over} title={title} sub={sub} />
      <div className="mt-10">
        <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
          {items.map((w, i) => (
            <div key={w.title} className="flex-shrink-0 flex-grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
              <div>
                <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09]">
                  <span className="flex h-6 w-6 items-center justify-center">{WHY_ICONS[i % WHY_ICONS.length]}</span>
                </figure>
              </div>
              <div>
                <h4 className="relative mt-6 whitespace-pre-line font-display text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black">
                  {w.title}
                </h4>
                <p className="relative mt-4 text-[16px] leading-6 tracking-[-0.01em] text-[#525252]">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Foundation model: text + image split -> one verified case in detail ---------- */
// Own visual in Scale's 1920x1079 image slot: a dark scoring console under the case's verified headline metric.
// Rows are illustrative (no client data).
function CaseVisual({ c }: { c: CaseStudy }) {
  const rows: [string, number, string][] = [
    ['RO 20931', 0.92, 'Auto-approved'],
    ['RO 20932', 0.81, 'Auto-approved'],
    ['RO 20933', 0.54, 'To reviewer'],
    ['RO 20934', 0.88, 'Auto-approved'],
  ]
  return (
    <svg viewBox="0 0 1920 1079" className="h-auto w-full rounded-lg font-display" role="img" aria-label={`${c.client}: ${c.metric}`}>
      <rect width="1920" height="1079" fill="#111519" />
      <text x="120" y="190" fontSize="44" letterSpacing="4" fill="#8f8f8f">
        {c.client.toUpperCase()}
      </text>
      <text x="120" y="330" fontSize="120" fill="#fff">
        {c.metric}
      </text>
      {rows.map(([id, score, route], i) => (
        <g key={id} transform={`translate(120 ${470 + i * 130})`}>
          <rect width="1680" height="100" rx="18" fill="#1b2026" />
          <text x="40" y="64" fontSize="40" fill="#e6e6e6">
            {id}
          </text>
          <rect x="420" y="40" width="760" height="20" rx="10" fill="#2a3038" />
          <rect x="420" y="40" width={760 * score} height="20" rx="10" fill={score < 0.6 ? '#ECA6FA' : '#B2FCD2'} />
          <text x="1640" y="64" fontSize="36" textAnchor="end" fill={score < 0.6 ? '#ECA6FA' : '#B2FCD2'}>
            {route}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function Foundation({ title, label, link, caseStudy: c }: { title: string; label: string; link: string; caseStudy: CaseStudy }) {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title={title} />
      <div className="mt-12 flex flex-col items-center gap-16 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-black">{label}</p>
          <h2 className="font-display text-[30px] font-normal leading-[1.5] tracking-[-0.01em] text-black lg:text-[36px] lg:leading-[1.25]">{c.title}</h2>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-[#a1a1aa]">{c.summary}</p>
          <Link href={`/case-studies/${c.slug}/`} data-qa="foundation-link" className="mt-2 text-[16px] leading-6 text-black transition-colors duration-150 hover:text-gray-600">
            {link}
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <CaseVisual c={c} />
        </div>
      </div>
    </section>
  )
}
