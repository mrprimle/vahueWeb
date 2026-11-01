// Material Design icons exactly as rendered on scale.com/evaluation/public-sector (react-icons "md" set,
// 24×24 viewBox, fill currentColor; read from the live DOM 2026-11-01), plus the BrowserMockup traffic lights.
// No Scale brand marks.

type Glyph = { box: string; paths: string[] }

const G = (paths: string[], box = 'M0 0h24v24H0z'): Glyph => ({ box, paths })

export const GLYPHS = {
  // FeaturesWithIcons ("Why Test & Evaluate SI"), 22px inside a 24px span
  verifiedUser: G(
    ['M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78zm-9.18-.5L7.4 12l3.54 3.54 5.66-5.66-1.41-1.41-4.24 4.24-2.13-2.12z'],
    'M0 0h24v24H0V0z',
  ),
  autorenew: G(
    ['M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z'],
    'M.01 0h24v24h-24V0z',
  ),
  searchOff: G([
    'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 0 0 9.5 3C6.08 3 3.28 5.64 3.03 9h2.02C5.3 6.75 7.18 5 9.5 5 11.99 5 14 7.01 14 9.5S11.99 14 9.5 14c-.17 0-.33-.03-.5-.05v2.02c.17.02.33.03.5.03 1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z',
    'M6.47 10.82 4 13.29l-2.47-2.47-.71.71L3.29 14 .82 16.47l.71.71L4 14.71l2.47 2.47.71-.71L4.71 14l2.47-2.47z',
  ]),
  // "Why Scale" cards, 72px
  tune: G(['M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z'], 'M0 0h24v24H0V0z'),
  personSearch: G([
    'M10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM4 18c.22-.72 3.31-2 6-2 0-.7.13-1.37.35-1.99C7.62 13.91 2 15.27 2 18v2h9.54c-.52-.58-.93-1.25-1.19-2H4zM19.43 18.02c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59c-1.5-1.5-.79-.8-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
  ]),
  barChart: G(['M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z']),
  gpsFixed: G(
    ['M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z'],
    'M0 0h24v24H0V0z',
  ),
  gridView: G(['M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z']),
  shield: G(['M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z']),
  // ChecklistWithMedia tick (MdCheck, 12px)
  check: G(['M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z']),
}

export type GlyphName = keyof typeof GLYPHS

export function Glyph({ name, size, className }: { name: GlyphName; size: number; className?: string }) {
  const g = GLYPHS[name]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={0} className={className} aria-hidden>
      <path fill="none" d={g.box} />
      {g.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function TrafficLights() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 10" className="h-auto w-10" aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="20" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="35" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}
