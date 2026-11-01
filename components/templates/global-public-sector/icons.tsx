// Material icons (react-icons Md*, 24x24) used on scale.com/global-public-sector.
// HowScaleDeliversGrid glyphs: copied from the SSR markup (module 473665 exports, rendered by Card 540409 at 32px).
// Stat card glyphs: CardGrid iconName -> scale.com/api/icons/md/<name> (react-icons IconTree JSON), read 2026-11-01.
const PATHS = {
  MdOutlineShield: ['M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z'],
  MdOutlineVerified: [
    'M23 11.99 20.56 9.2l.34-3.69-3.61-.82L15.4 1.5 12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69 2.44-2.8zm-3.95 1.48-.56.65.08.85.18 1.95-1.9.43-.84.19-.44.74-.99 1.68-1.78-.77-.8-.34-.79.34-1.78.77-.99-1.67-.44-.74-.84-.19-1.9-.43.18-1.96.08-.85-.56-.65L3.67 12l1.29-1.48.56-.65-.09-.86-.18-1.94 1.9-.43.84-.19.44-.74.99-1.68 1.78.77.8.34.79-.34 1.78-.77.99 1.68.44.74.84.19 1.9.43-.18 1.95-.08.85.56.65 1.29 1.47-1.28 1.48z',
    'm10.09 13.75-2.32-2.33-1.48 1.49 3.8 3.81 7.34-7.36-1.48-1.49z',
  ],
  MdOutlinePeople: [
    'M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z',
  ],
  MdOutlineSchool: ['M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'],
  MdOutlineHowToReg: [
    'M11 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 18c.2-.63 2.57-1.68 4.96-1.94l2.04-2a9.34 9.34 0 0 0-1-.06c-2.67 0-8 1.34-8 4v2h9l-2-2H5zm15.6-5.5-5.13 5.17-2.07-2.08L12 17l3.47 3.5L22 13.91z',
  ],
  MdOutlineMergeType: [
    'm9.78 11.16-1.42 1.42a7.282 7.282 0 0 1-1.79-2.94l1.94-.49c.32.89.77 1.5 1.27 2.01zM11 6 7 2 3 6h3.02c.02.81.08 1.54.19 2.17l1.94-.49C8.08 7.2 8.03 6.63 8.02 6H11zm10 0-4-4-4 4h2.99c-.1 3.68-1.28 4.75-2.54 5.88-.5.44-1.01.92-1.45 1.55-.34-.49-.73-.88-1.13-1.24L9.46 13.6c.93.85 1.54 1.54 1.54 3.4v5h2v-5c0-2.02.71-2.66 1.79-3.63 1.38-1.24 3.08-2.78 3.2-7.37H21z',
  ],
  MdEditDocument: [
    'M14 19.88V22h2.12l5.17-5.17-2.12-2.12zM20 8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H12v-2.95l8-8V8zm-7 1V3.5L18.5 9H13zM22.71 14l-.71-.71a.996.996 0 0 0-1.41 0l-.71.71L22 16.12l.71-.71a.996.996 0 0 0 0-1.41z',
  ],
  MdSchool: ['M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z'],
  MdSecurity: ['M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'],
} as const

export type GpsIcon = keyof typeof PATHS

export function MdIcon({ name, size, className }: { name: GpsIcon; size: number; className?: string }) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path fill="none" d="M0 0h24v24H0z" />
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/** UseCaseTabs outcome tick (12x12, stroke 1.5). */
export function Tick() {
  return (
    <svg className="mt-[3px] shrink-0 text-[var(--gps-fg-3)]" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** WistiaPlayer play glyph (60x60 viewBox). */
export function PlayGlyph() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className="h-[27px] w-[27px] sm:h-9 sm:w-9" aria-hidden="true">
      <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742zm0 0" />
    </svg>
  )
}
