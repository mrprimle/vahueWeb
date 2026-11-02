import type { LabsLogoContent } from './types'

/**
 * The labs lockup. With `src` it is Scale's image (clone); without it, the vahue wordmark in the same 834 x 115 box:
 * mark, ink wordmark, grey "labs", so the header and hero slots keep Scale's proportions.
 */
export function LabsLogo({ logo, width, height, className }: { logo: LabsLogoContent; width: number; height: number; className?: string }) {
  if (logo.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.src} alt={logo.alt} width={width} height={height} className={className} />
  }
  const font = { fontFamily: 'var(--font-aeonik), -apple-system, Arial, sans-serif' }
  return (
    <svg role="img" aria-label={logo.alt} width={width} height={height} viewBox="0 0 834 115" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="12" width="92" height="92" rx="20" fill="#111" />
      <text x="46" y="84" textAnchor="middle" fontSize="88" fill="#fff" style={font}>
        v
      </text>
      <text x="124" y="95" fontSize="132" letterSpacing="-3" fill="#111" style={font}>
        vahue
      </text>
      <text x="566" y="95" fontSize="132" letterSpacing="-3" fill="#808080" style={font}>
        labs
      </text>
    </svg>
  )
}
