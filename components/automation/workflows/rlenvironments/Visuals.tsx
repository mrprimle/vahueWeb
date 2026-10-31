/*
 * Own visuals for the media slots of the rlenvironments clone (no Scale imagery), drawn on the aspect of the Scale
 * asset each replaces: overview cards 4:3 (1536x1024 UI illustrations on #eaeaea), capability frames 598x371,
 * environment-types square loop (1200x1200 line art). Strings are illustrative, not client data.
 */

import type { ReactNode } from 'react'

const font = { fontFamily: 'inherit' }

function Window({ children, title }: { children: ReactNode; title: string }) {
  return (
    <>
      <rect x="48" y="40" width="544" height="400" rx="14" fill="#fff" />
      <circle cx="74" cy="64" r="5" fill="#e2e2e2" />
      <circle cx="90" cy="64" r="5" fill="#e2e2e2" />
      <circle cx="106" cy="64" r="5" fill="#e2e2e2" />
      <text x="320" y="69" textAnchor="middle" fontSize="13" fill="#575757">
        {title}
      </text>
      <line x1="48" y1="86" x2="592" y2="86" stroke="#eeeeee" />
      {children}
    </>
  )
}

/** Overview card 1: an agent's review comment on a pull request. */
export function ReviewMock() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" style={font} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="480" fill="#eaeaea" />
      <Window title="Pull request · review">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect x="72" y={110 + i * 26} width="22" height="10" rx="2" fill="#d9d9d9" />
            <rect x="104" y={110 + i * 26} width={[300, 220, 360, 180, 280, 240][i]} height="10" rx="3" fill={i === 3 ? '#B2FCD2' : '#ececec'} />
          </g>
        ))}
        <rect x="72" y="282" width="496" height="120" rx="10" fill="#f6f6f6" />
        <circle cx="96" cy="306" r="10" fill="#273252" />
        <text x="114" y="311" fontSize="13" fill="#212121">
          Review agent
        </text>
        <rect x="96" y="330" width="420" height="9" rx="3" fill="#d6d6d6" />
        <rect x="96" y="350" width="340" height="9" rx="3" fill="#d6d6d6" />
        <rect x="96" y="370" width="110" height="20" rx="5" fill="#212121" />
        <text x="151" y="384" fontSize="11" textAnchor="middle" fill="#fff">
          Suggest a test
        </text>
      </Window>
    </svg>
  )
}

/** Overview card 2: pilot team vs control team, same metrics (no figures). */
export function ControlMock() {
  const a = [120, 150, 175, 205, 230]
  const b = [118, 124, 121, 128, 126]
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" style={font} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="480" fill="#eaeaea" />
      <Window title="Pilot team vs control team">
        <line x1="96" y1="380" x2="560" y2="380" stroke="#d6d6d6" />
        {a.map((h, i) => (
          <g key={i}>
            <rect x={112 + i * 90} y={380 - h} width="28" height={h} rx="4" fill="#193A29" />
            <rect x={144 + i * 90} y={380 - b[i]} width="28" height={b[i]} rx="4" fill="#cfcfcf" />
          </g>
        ))}
        <circle cx="112" cy="414" r="6" fill="#193A29" />
        <text x="124" y="418" fontSize="12" fill="#575757">
          Pilot team
        </text>
        <circle cx="222" cy="414" r="6" fill="#cfcfcf" />
        <text x="234" y="418" fontSize="12" fill="#575757">
          Control team
        </text>
      </Window>
    </svg>
  )
}

/** Overview card 3: teams adopting the practices wave by wave. */
export function WavesMock() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" style={font} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="480" fill="#eaeaea" />
      <Window title="Rollout waves">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <text x="72" y={138 + r * 72} fontSize="13" fill="#575757">
              {`Wave ${r + 1}`}
            </text>
            {[0, 1, 2, 3, 4, 5].map((c) => (
              <rect key={c} x={160 + c * 66} y={116 + r * 72} width="54" height="34" rx="8" fill={c <= 4 - r ? '#79648C' : '#ececec'} opacity={c <= 4 - r ? 0.85 : 1} />
            ))}
          </g>
        ))}
      </Window>
    </svg>
  )
}

/** Capability frame (598x371): before, tools used unevenly across teams. */
export function BeforeMock() {
  const rows: [string, number][] = [
    ['Team A', 0.82],
    ['Team B', 0.18],
    ['Team C', 0.46],
    ['Team D', 0.07],
    ['Team E', 0.33],
  ]
  return (
    <svg viewBox="0 0 598 371" className="block h-auto w-full" style={font} role="img" aria-label="Before: AI tools adopted unevenly across teams, with no agreed measure of impact">
      <rect width="598" height="371" fill="#fff" />
      <text x="32" y="44" fontSize="14" fill="#212121">
        AI tool usage by team
      </text>
      <text x="566" y="44" fontSize="12" textAnchor="end" fill="#a1a1aa">
        No agreed metric
      </text>
      {rows.map(([t, v], i) => (
        <g key={t}>
          <text x="32" y={98 + i * 52} fontSize="13" fill="#575757">
            {t}
          </text>
          <rect x="120" y={86 + i * 52} width="440" height="16" rx="8" fill="#f2f2f2" />
          <rect x="120" y={86 + i * 52} width={440 * v} height="16" rx="8" fill="#A8927C" />
        </g>
      ))}
    </svg>
  )
}

/** Capability frame (598x371): after, agreed metrics read against a control group. */
export function AfterMock() {
  const pts = (k: number) =>
    Array.from({ length: 9 }, (_, i) => `${40 + i * 65},${300 - (k ? 20 + i * 24 : 20 + i * 4)}`).join(' ')
  return (
    <svg viewBox="0 0 598 371" className="block h-auto w-full" style={font} role="img" aria-label="After: agreed metrics tracked against a control group">
      <rect width="598" height="371" fill="#fff" />
      <text x="32" y="44" fontSize="14" fill="#212121">
        Agreed delivery metric
      </text>
      <line x1="40" y1="300" x2="560" y2="300" stroke="#eaeaea" />
      <polyline points={pts(0)} fill="none" stroke="#cfcfcf" strokeWidth="3" />
      <polyline points={pts(1)} fill="none" stroke="#193A29" strokeWidth="3" />
      <circle cx="44" cy="336" r="6" fill="#193A29" />
      <text x="56" y="340" fontSize="12" fill="#575757">
        Pilot team
      </text>
      <circle cx="154" cy="336" r="6" fill="#cfcfcf" />
      <text x="166" y="340" fontSize="12" fill="#575757">
        Control group
      </text>
    </svg>
  )
}

/** Environment-types square (Scale: 1200x1200 line-art loop): repositories, pipelines and tickets as line art. */
export function PlatformsLineArt() {
  return (
    <svg viewBox="0 0 1200 1200" className="block h-full w-full" aria-hidden>
      <rect width="1200" height="1200" fill="#f5f5f5" />
      <g fill="none" stroke="#212121" strokeWidth="3">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={260 + i * 40} y={260 + i * 40} width={680 - i * 80} height={680 - i * 80} rx={48 - i * 8} />
        ))}
        <path d="M600 160 V380 M600 820 V1040 M160 600 H380 M820 600 H1040" />
        <circle cx="600" cy="600" r="90" />
        <path d="M560 600 l30 30 l60 -70" />
        <circle cx="600" cy="140" r="26" />
        <circle cx="600" cy="1060" r="26" />
        <circle cx="140" cy="600" r="26" />
        <circle cx="1060" cy="600" r="26" />
      </g>
    </svg>
  )
}
