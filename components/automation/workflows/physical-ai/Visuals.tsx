import type { ReactNode } from 'react'

/*
 * Own visuals for the media slots of the physical-ai clone (no Scale imagery). Each SVG uses the aspect of the
 * Scale asset it replaces, so the slot keeps Scale's size: use-case.png 1214x636, card photos 4:3,
 * img-multimodal.webp 627x458. Strings are illustrative, not a client record.
 */

const FONT = { fontFamily: 'inherit' }

/** use-case.png slot: a light isometric slab with three stations wired to a glowing agent node. */
export function IntakeIsometric() {
  const slab = (x: number, y: number, w: number, d: number, h: number, top: string) => {
    // isometric box: top rhombus + two side faces
    const p = (a: number, b: number) => `${x + (a - b) * 0.866},${y + (a + b) * 0.5}`
    return (
      <g>
        <polygon points={`${p(0, 0)} ${p(w, 0)} ${p(w, d)} ${p(0, d)}`} fill={top} />
        <polygon points={`${p(0, d)} ${p(w, d)} ${x + (w - d) * 0.866},${y + (w + d) * 0.5 + h} ${x - d * 0.866},${y + d * 0.5 + h}`} fill="#b9b5b0" />
        <polygon points={`${p(w, 0)} ${p(w, d)} ${x + (w - d) * 0.866},${y + (w + d) * 0.5 + h} ${x + w * 0.866},${y + w * 0.5 + h}`} fill="#cfcbc6" />
      </g>
    )
  }
  return (
    <svg viewBox="0 0 1214 636" className="block h-auto w-full" style={FONT} role="img" aria-label="Documents from three channels flow into one agent, which posts clean records to your systems.">
      {slab(607, 40, 560, 560, 26, '#e4e1dd')}
      {/* wires */}
      <g fill="none" stroke="#a7a39e" strokeWidth="2">
        <path d="M430 270 L560 345 L600 322" />
        <path d="M780 230 L700 276 L640 310" />
        <path d="M800 420 L700 362 L650 334" />
      </g>
      {slab(380, 180, 150, 120, 28, '#f1efec')}
      {slab(760, 140, 160, 120, 28, '#f1efec')}
      {slab(780, 340, 170, 130, 28, '#f1efec')}
      {/* glowing agent node */}
      <g>
        <ellipse cx="620" cy="330" rx="70" ry="38" fill="#dff7ff" opacity="0.7" />
        {slab(620, 300, 50, 50, 14, '#ffffff')}
        <ellipse cx="620" cy="325" rx="16" ry="9" fill="#9fe6ff" />
      </g>
      {/* paper stacks and screens on the stations */}
      {[0, 1, 2].map((i) => (
        <g key={i}>{slab(372 + i * 6, 196 - i * 10, 60, 44, 4, '#ffffff')}</g>
      ))}
      {slab(770, 156, 70, 10, 46, '#d8d4cf')}
      {slab(820, 352, 80, 60, 30, '#fbfaf8')}
      <text x="352" y="330" fontSize="15" fill="#6b6762">
        Email
      </text>
      <text x="818" y="292" fontSize="15" fill="#6b6762">
        Portals and scans
      </text>
      <text x="884" y="520" fontSize="15" fill="#6b6762">
        ERP and CRM
      </text>
    </svg>
  )
}

function Sheet({ x, y, w, h, lines = 6, tone = '#fff' }: { x: number; y: number; w: number; h: number; lines?: number; tone?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={tone} />
      <rect x={x + 18} y={y + 20} width={w * 0.45} height="10" rx="3" fill="#cfcfcf" />
      {Array.from({ length: lines }).map((_, i) => (
        <rect key={i} x={x + 18} y={y + 48 + i * 22} width={(w - 36) * (i % 3 === 2 ? 0.6 : 0.9)} height="7" rx="3" fill="#e2e2e2" />
      ))}
    </g>
  )
}

/** 4:3 card media: a scene on the card's dark photo tone with a document type drawn on it. */
export function CardScene({ kind }: { kind: 'invoice' | 'report' | 'contract' | 'inbox' | 'portal' | 'drive' }) {
  const bg = { invoice: '#2b3a4a', report: '#3d3550', contract: '#4a3b2f', inbox: '#193A29', portal: '#273252', drive: '#3b3b3b' }[kind]
  const scene: Record<string, ReactNode> = {
    invoice: (
      <>
        <Sheet x={150} y={52} w={180} h={226} lines={7} />
        <rect x="168" y="232" width="144" height="26" rx="5" fill="#f2f2f2" />
        <text x="176" y="250" fontSize="13" fill="#212121">Total matched to PO</text>
      </>
    ),
    report: (
      <>
        <Sheet x={110} y={70} w={150} h={196} lines={6} tone="#f5f5f5" />
        <Sheet x={210} y={50} w={160} h={210} lines={7} />
      </>
    ),
    contract: (
      <>
        <Sheet x={130} y={44} w={220} h={236} lines={8} />
        <rect x="148" y="214" width="120" height="10" rx="3" fill="#E7131A" opacity="0.65" />
      </>
    ),
    inbox: (
      <>
        <rect x="80" y="60" width="320" height="200" rx="10" fill="#fff" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="96" y={78 + i * 44} width="288" height="34" rx="6" fill={i === 0 ? '#eef5f0' : '#f6f6f6'} />
            <rect x="108" y={90 + i * 44} width="90" height="8" rx="3" fill="#bdbdbd" />
            <rect x="320" y={86 + i * 44} width="52" height="18" rx="4" fill="#e2e2e2" />
          </g>
        ))}
      </>
    ),
    portal: (
      <>
        <rect x="80" y="56" width="320" height="210" rx="10" fill="#fff" />
        <rect x="80" y="56" width="320" height="30" rx="10" fill="#e9ebf0" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="100" y={104 + i * 50} width="180" height="10" rx="3" fill="#cfd3dc" />
            <rect x="300" y={98 + i * 50} width="80" height="24" rx="6" fill="#273252" />
          </g>
        ))}
      </>
    ),
    drive: (
      <>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${96 + i * 104} 96)`}>
            <path d="M0 14 h34 l10 -12 h42 v104 h-86 z" fill="#f2f2f2" />
            <rect x="12" y="40" width="62" height="8" rx="3" fill="#cfcfcf" />
          </g>
        ))}
      </>
    ),
  }
  return (
    <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full rounded-lg" style={FONT} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="360" fill={bg} />
      {scene[kind]}
    </svg>
  )
}

/** img-multimodal.webp slot (627 x 458): dark app window, source page left, extracted fields right. */
export function SourceTrace({ fields }: { fields: string[] }) {
  return (
    <svg viewBox="0 0 627 458" className="block h-auto w-full" style={FONT} role="img" aria-label={`Source page beside the extracted record: ${fields.join(', ')}`}>
      <rect width="627" height="458" rx="16" fill="#111" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={24 + i * 16} cy="20" r="5" fill="#3a3a3a" />
      ))}
      <rect x="20" y="48" width="380" height="350" rx="6" fill="#f2f2f2" />
      <rect x="44" y="70" width="140" height="12" rx="3" fill="#bdbdbd" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x="44" y={104 + i * 26} width={i % 4 === 3 ? 180 : 320} height="8" rx="3" fill="#d6d6d6" />
      ))}
      <rect x="40" y="148" width="328" height="20" rx="4" fill="none" stroke="#7B6FF0" strokeWidth="2" />
      <rect x="412" y="48" width="196" height="350" rx="6" fill="#1c1c1c" />
      {fields.map((f, i) => (
        <g key={f}>
          <rect x="420" y={58 + i * 54} width="180" height="44" rx="6" fill={i === 0 ? '#3a3449' : '#262626'} />
          <text x="432" y={85 + i * 54} fontSize="12.5" fill="#e6e6e6">
            {`${i + 1}. ${f}`}
          </text>
        </g>
      ))}
    </svg>
  )
}
