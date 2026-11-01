// Icons from components/templates/evaluation-enterprise/icons.tsx: Material Design paths
// (react-icons "md" set, 24×24 viewBox, fill currentColor), the FlatCta chevron and the
// BrowserMockup traffic lights. `flag` (MdOutlinedFlag) replaces the clone's shield-x.

export function Chevron() {
  return (
    <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
        fill="currentColor"
      />
    </svg>
  )
}

const PATHS = {
  help: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z',
  flag: 'M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z',
  receipt:
    'M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
}

export type GlyphName = keyof typeof PATHS

export function Glyph({ name, size, className }: { name: GlyphName; size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d={PATHS[name]} />
    </svg>
  )
}

export function TrafficLights() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 10" className="h-auto w-10 shrink-0" aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="20" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
      <circle cx="35" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}
