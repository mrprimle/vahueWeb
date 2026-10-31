import { Bolt, Check, Flame, Gauge } from './icons'
import LogoMarquee from './LogoMarquee'
import s from './automotive.module.css'

export const ASSET = '/scale-clone/automotive'

// Scale's `container`: max-w 1280, px 24 -> 32 (lg), centred.
export const CONTAINER = 'mx-auto w-full max-w-[1280px] px-6 lg:px-8'

/* ---------- CMS SectionHeader (theme light, centred) ---------- */
export function SectionHeader({ over = '', title, sub }: { over?: string; title: string; sub?: string }) {
  return (
    <div className={`${s.sectionHeader} flex max-w-3xl flex-col items-center justify-center text-center`}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* TODO: Vahue copy */}
          {/* The overtitle block keeps its 20px margin even when empty (as on Scale). */}
          <div className={`${s.overtitle} font-mono`}>{over ? <span>{over}</span> : null}</div>
          <h2 className={`${s.sectionTitle} font-display font-normal`}>{title}</h2>
        </div>
        {sub ? <p className={`${s.sectionSub} block w-full font-display font-normal`}>{sub}</p> : null}
      </div>
    </div>
  )
}

/* ---------- Logo cloud: 2 customer logos, md+ only ---------- */
// TODO: Vahue customer logos. Scale shows 2 marks (92x40, 96x32) with brightness-0; neutral tiles here.
const LOGOS: [number, number][] = [
  [92, 40],
  [96, 32],
]

export function LogoStrip() {
  return (
    <section className="py-10 md:py-14">
      <div className="w-full">
        <div className="hidden md:block">
          <ul className={`${CONTAINER} flex items-center justify-around gap-8 sm:min-h-[52px] md:gap-y-16`}>
            {LOGOS.map(([w, h], i) => (
              <li key={i} className="flex flex-col items-center justify-center gap-3">
                <span className="block rounded-[4px] bg-black/10" style={{ width: w, height: h }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <LogoMarquee logos={LOGOS} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Overview: ChecklistWithMedia ---------- */
// TODO: Vahue copy
const CHECKLIST = [
  {
    title: 'Signal Labelling',
    body: 'Placeholder copy about annotating flat and spatial inputs gathered from many vehicle sensors, with assisted workflows, steady operations and detailed tooling that keep quality high and cost low.',
  },
  {
    title: 'Signal Sorting',
    body: 'Placeholder copy about browsing both labelled and raw inputs, seeing how a set is spread, picking the slices that match the target cases and sending them straight on for labelling by the team.',
  },
  {
    title: 'System Review',
    body: 'Placeholder copy about checking how trained systems perform, reading their scores, spotting the weak areas and testing every new version of the system against the scenario suites that matter.',
  },
]

export function Overview() {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title="The Road Vehicle Signal Hub" sub="Placeholder line about everything a team needs to move its systems forward with better inputs." />
      <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-5/12">
          {CHECKLIST.map((c, i) => (
            <div key={c.title}>
              <div className="flex flex-row items-start gap-4">
                <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.09]">
                  <Check className="h-3 w-3 text-black/70" />
                </div>
                <div className="flex flex-col gap-2">
                  {/* TODO: Vahue copy */}
                  <p className="text-[16px] font-medium leading-6 tracking-[-0.01em] text-black">{c.title}</p>
                  <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-black/70">{c.body}</p>
                </div>
              </div>
              {i < CHECKLIST.length - 1 ? <hr className="mt-6 border-white/10" /> : null}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center p-2 md:w-7/12">
          <OverviewDiagram />
        </div>
      </div>
    </section>
  )
}

/*
 * Scale ships this loop diagram as a 2085x1740 PNG with its own labels and font baked in.
 * Redrawn as SVG with placeholder labels in Vahue's display face; geometry traced from the PNG.
 */
function OverviewDiagram() {
  const box = (x: number, y: number) => <rect x={x} y={y} width={580} height={575} rx={72} fill="#fff" />
  const label = (x: number, y: number, t: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize={46} fill="#0a0a0a" className="font-display" letterSpacing="-0.5">
      {t}
    </text>
  )
  return (
    <svg viewBox="0 0 2000 1669" className="h-auto w-full" role="img" aria-label="Loop diagram">
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
      {/* TODO: Vahue copy */}
      {label(1001, 352, 'Labelling')}
      {label(495, 1117, 'Review')}
      {label(1508, 1117, 'Sorting')}
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
// TODO: Vahue copy
const WHY = [
  {
    icon: <Flame />,
    title: 'Dependable Gains',
    body: 'Placeholder copy about inputs being the surest lever for better systems. With every bigger, cleaner and broader set, results keep climbing for your models.',
  },
  { icon: <Gauge />, title: 'Peak Output', body: 'Placeholder copy about every part of the engine getting the most value from each label it produces to lift results.' },
  {
    icon: <Bolt />,
    title: 'Quicker Cycles',
    body: 'Placeholder copy about speeding up the whole loop: faster labelling, sharper curated sets and a larger workforce so teams ship applied systems sooner.',
  },
]

export function WhyUs() {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader over="Why Vahue" title="Picked by Leading Self-Driving Vehicle Teams" sub="Placeholder line about why road-system leaders build with us, for these reasons:" />
      <div className="mt-10">
        <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
          {WHY.map((w) => (
            <div key={w.title} className="flex-shrink-0 flex-grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
              <div>
                <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09]">
                  <span className="flex h-6 w-6 items-center justify-center">{w.icon}</span>
                </figure>
              </div>
              <div>
                {/* TODO: Vahue copy */}
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

/* ---------- Foundation model: text + image split ---------- */
export function Foundation() {
  return (
    <section className={`${CONTAINER} py-16`}>
      <SectionHeader title="The Road Foundation System" />
      <div className="mt-12 flex flex-col items-center gap-16 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {/* TODO: Vahue copy */}
          <p className="font-mono text-[12px] uppercase leading-6 tracking-[1px] text-black">Live Preview</p>
          <h2 className="font-display text-[30px] font-normal leading-[1.5] tracking-[-0.01em] text-black lg:text-[36px] lg:leading-[1.25]">
            Introducing the Vahue Road Foundation Vision Model
          </h2>
          <p className="text-[16px] leading-6 tracking-[-0.01em] text-[#a1a1aa]">
            Placeholder line about a modern, language-led perception system built to speed up self-driving work.
          </p>
          <a href="#" className="mt-2 text-[16px] leading-6 text-black transition-colors duration-150 hover:text-gray-600">
            Try the System →
          </a>
        </div>
        <div className="w-full md:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET}/foundation-model.webp`} alt="" width={1920} height={1079} loading="lazy" className="h-auto w-full rounded-lg" />
        </div>
      </div>
    </section>
  )
}
