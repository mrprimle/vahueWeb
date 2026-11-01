import localFont from 'next/font/local'

// labs.scale.com self-hosts Inter Variable (as `inter`, the --font-brand) and Geist Mono Variable (--font-geist-mono).
// Both are OFL; the woff2 files are the exact ones labs serves (InterVariable-s.p.2v4uvb3i5caxn.woff2,
// GeistMono_Variable.p.0b02cdm7g7y6h.woff2).
export const labsInter = localFont({
  src: './fonts/InterVariable.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--labs-font-brand',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const labsGeistMono = localFont({
  src: './fonts/GeistMono-Variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--labs-font-mono',
  fallback: ['monospace'],
})
