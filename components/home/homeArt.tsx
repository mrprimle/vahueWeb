import type { ReactNode } from 'react'

/*
 * Vahue's own visuals in the media slots of the scale.com homepage layout (no Scale footage or photos). Colours are Scale's palette
 * tones: evergreen #193A29, atlas blue #273252, foundry tan #A8927C, archive purple #79648C, cloud slate #839CB2.
 */

const tile = (bg: string, glyph: ReactNode) => (
  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
    <rect width="100" height="100" fill={bg} />
    <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {glyph}
    </g>
  </svg>
)

export const orbitArt = {
  backOffice: tile('#193A29', <><path d="M28 42a24 24 0 0 1 40-9l6 7M72 58a24 24 0 0 1-40 9l-6-7" /><path d="M74 28v12H62M26 72V60h12" /></>),
  documents: tile('#273252', <><path d="M34 22h24l14 14v42H34z" /><path d="M58 22v14h14M42 50h22M42 60h22M42 70h12" /></>),
  knowledge: tile('#79648C', <><path d="M24 28h52v36H46L32 76V64h-8z" /><path d="M36 40h28M36 50h18" /></>),
  support: tile('#A8927C', <><path d="M26 56v-8a24 24 0 0 1 48 0v8" /><rect x="20" y="54" width="12" height="18" rx="4" /><rect x="68" y="54" width="12" height="18" rx="4" /><path d="M74 72v4a6 6 0 0 1-6 6H54" /></>),
  scoring: tile('#839CB2', <><path d="M24 76h52" /><path d="M32 76V58M46 76V44M60 76V52M72 76V28" /></>),
  engineering: tile('#212121', <><path d="m40 34-18 16 18 16M60 34l18 16-18 16M54 28 46 72" /></>),
  insurance: tile('#273252', <><path d="M50 20 76 30v20c0 16-11 26-26 30-15-4-26-14-26-30V30z" /><path d="m38 50 9 9 16-18" /></>),
  healthcare: tile('#193A29', <><path d="M42 24h16v18h18v16H58v18H42V58H24V42h18z" /></>),
  banking: tile('#79648C', <><path d="M22 40 50 24l28 16zM26 76h48M32 46v24M50 46v24M68 46v24" /></>),
  retail: tile('#A8927C', <><path d="M28 36h44l5 42H23z" /><path d="M38 44v-12a12 12 0 0 1 24 0v12" /></>),
  manufacturing: tile('#212121', <><path d="M22 76V46l18 10V46l18 10V26h20v50z" /><path d="M36 66h6M52 66h6M66 66h6" /></>),
  operations: tile('#839CB2', <><circle cx="50" cy="28" r="8" /><circle cx="26" cy="70" r="8" /><circle cx="74" cy="70" r="8" /><path d="m46 35-16 28M54 35l16 28M34 70h32" /></>),
}

export const Monogram = ({ name }: { name: string }) => (
  <span className="absolute inset-0 flex items-center justify-center bg-[#193A29] font-mono text-[13px] font-medium uppercase text-white">
    {name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')}
  </span>
)

/** 32px glyphs in the three link cards (Material icons, as on Scale's cards) */
export const cardIcons = {
  leaderboard: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="max-md:size-5">
      <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" />
    </svg>
  ),
  trending: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="max-md:size-5">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </svg>
  ),
  join: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="max-md:size-5">
      <circle cx="9" cy="12" r="6.5" opacity=".55" />
      <circle cx="15" cy="12" r="6.5" />
    </svg>
  ),
}

/** Left panel of the scrolling quote: a document being read, field by field. */
export const QuoteArt = () => (
  <svg viewBox="0 0 362 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
    <rect width="362" height="400" fill="#000" />
    <g fill="none" stroke="#839CB2" strokeOpacity=".55" strokeWidth="1.2">
      <path d="M86 56h146l44 44v244H86z" />
      <path d="M232 56v44h44" />
    </g>
    <g fill="#839CB2" fillOpacity=".3">
      {[120, 150, 180, 210, 240, 270, 300].map((y, i) => (
        <rect key={y} x="108" y={y} width={[120, 146, 96, 146, 70, 130, 90][i]} height="10" rx="2" />
      ))}
    </g>
    <g fill="none" stroke="#fff" strokeWidth="1">
      {[[100, 112], [214, 142], [190, 232], [100, 262]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="26" height="26" rx="5">
          <animate attributeName="stroke-opacity" values="1;.25;1" dur={`${2.4 + i * 0.7}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </g>
    <g fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1">
      {[[60, 90], [300, 120], [50, 210], [316, 240], [70, 330], [300, 360], [180, 30], [130, 372]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}l8 0 0 8z`} />
      ))}
    </g>
  </svg>
)

/** Line art on the pre-footer colour, multiplied: three stacked workflow frames and their links, turning slowly in place. */
export const PrefooterArt = () => (
  <svg viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden>
    <g fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="7s" repeatCount="indefinite" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${230 + i * 46} ${320 - i * 92}l${200} ${-70}l${150} ${60}l${-200} ${70}z`} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={`a${i}`} d={`M${270 + i * 34} ${312 - i * 12}l${150} ${60}`} opacity=".7" />
      ))}
      <path d="M430 250v-92M580 310v-92M380 390v-92" strokeDasharray="3 6" />
    </g>
    <g fill="#000">
      {[[430, 250], [580, 310], [380, 390], [476, 158], [626, 218], [426, 298]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}l10 0 0 10z`} />
      ))}
    </g>
  </svg>
)

/*
 * Hero frame, laid out like Scale's packed video: picture bottom-left 80%, id map (same objects, white on black) top-left 20%.
 * Work items flow past on three lanes; some carry a label box, the way Scale's footage carries its annotation boxes.
 */
type Item = { lane: number; x: number; w: number; h: number; speed: number; tag?: string; selected?: boolean }
const LANES = [0.2, 0.52, 0.84]
const ITEMS: Item[] = [
  { lane: 0, x: 0.05, w: 0.14, h: 0.24, speed: 0.012, tag: 'Invoice' },
  { lane: 0, x: 0.3, w: 0.12, h: 0.2, speed: 0.012 },
  { lane: 0, x: 0.52, w: 0.15, h: 0.26, speed: 0.012, tag: 'Claim' },
  { lane: 0, x: 0.78, w: 0.13, h: 0.22, speed: 0.012 },
  { lane: 1, x: 0.12, w: 0.2, h: 0.3, speed: 0.02, tag: 'Supplier sheet' },
  { lane: 1, x: 0.42, w: 0.17, h: 0.27, speed: 0.02 },
  { lane: 1, x: 0.68, w: 0.2, h: 0.3, speed: 0.02, tag: 'Order' },
  { lane: 2, x: 0, w: 0.3, h: 0.36, speed: 0.032, selected: true, tag: 'Needs review' },
  { lane: 2, x: 0.42, w: 0.26, h: 0.34, speed: 0.032, tag: 'Contract' },
  { lane: 2, x: 0.76, w: 0.24, h: 0.32, speed: 0.032 },
]

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

export function drawHeroFrame(ctx: CanvasRenderingContext2D, width: number, height: number, seconds: number) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  const W = width * 0.8
  const H = height * 0.8
  const top = height - H
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, top, W, H)
  ctx.clip()
  const g = ctx.createLinearGradient(0, top, 0, height)
  g.addColorStop(0, '#31465a')
  g.addColorStop(0.55, '#20323c')
  g.addColorStop(1, '#141c1f')
  ctx.fillStyle = g
  ctx.fillRect(0, top, W, H)
  ctx.strokeStyle = 'rgba(255,255,255,.06)'
  ctx.lineWidth = 1
  for (let i = 1; i < 16; i++) {
    ctx.beginPath()
    ctx.moveTo((W * i) / 16, top)
    ctx.lineTo((W * i) / 16, height)
    ctx.stroke()
  }
  const place = (it: Item) => {
    const span = 1 + it.w
    const px = ((it.x + seconds * it.speed) % span) - it.w
    return { x: px * W, y: top + (LANES[it.lane] - it.h / 2) * H, w: it.w * W, h: it.h * H }
  }
  ITEMS.forEach((it) => {
    const b = place(it)
    rounded(ctx, b.x, b.y, b.w, b.h, Math.min(b.w, b.h) * 0.06)
    ctx.fillStyle = it.lane === 2 ? '#c9d2d6' : it.lane === 1 ? '#aab6bc' : '#8a979e'
    ctx.fill()
    ctx.fillStyle = 'rgba(20,28,31,.45)'
    const rows = 5
    for (let r = 0; r < rows; r++) {
      const rw = b.w * (0.8 - ((r * 37) % 30) / 100)
      ctx.fillRect(b.x + b.w * 0.1, b.y + b.h * (0.18 + r * 0.14), rw, Math.max(2, b.h * 0.035))
    }
    if (it.selected) {
      ctx.fillStyle = 'rgba(38,84,190,.55)'
      ctx.fillRect(b.x, b.y, b.w, b.h)
      ctx.strokeStyle = '#2a6bff'
      ctx.lineWidth = 2
      ctx.strokeRect(b.x, b.y, b.w, b.h)
    } else if (it.tag) {
      ctx.strokeStyle = '#e8922e'
      ctx.lineWidth = 2
      ctx.strokeRect(b.x, b.y, b.w, b.h)
    }
    if (it.tag) {
      const fs = Math.round(H * 0.024)
      ctx.font = `500 ${fs}px ui-sans-serif, system-ui, sans-serif`
      const tw = ctx.measureText(it.tag).width + fs
      ctx.fillStyle = it.selected ? '#2a6bff' : '#e8922e'
      ctx.fillRect(b.x, b.y - fs * 1.5, tw, fs * 1.5)
      ctx.fillStyle = it.selected ? '#fff' : '#201405'
      ctx.textBaseline = 'middle'
      ctx.fillText(it.tag, b.x + fs * 0.5, b.y - fs * 0.72)
    }
  })
  ctx.restore()
  // id map: same layout at 1/4 scale, top-left 20%
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, width * 0.2, height * 0.2)
  ctx.clip()
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width * 0.2, height * 0.2)
  ctx.fillStyle = '#fff'
  ITEMS.forEach((it) => {
    const b = place(it)
    const s = 0.25
    const bx = b.x * s
    const by = (b.y - top) * s
    rounded(ctx, bx, by, b.w * s, b.h * s, 2)
    ctx.fill()
    ctx.fillStyle = '#000'
    for (let r = 0; r < 3; r++) ctx.fillRect(bx + b.w * s * 0.12, by + b.h * s * (0.25 + r * 0.22), b.w * s * (0.7 - r * 0.15), Math.max(1, b.h * s * 0.06))
    ctx.fillStyle = '#fff'
  })
  ctx.restore()
}
