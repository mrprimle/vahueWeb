import type { CSSProperties } from 'react'

/*
 * Vahue dark palette for the scale.com/enterprise layout's colour tokens (components/scale-clone/enterprise; Scale's
 * light values are the fallbacks inside the clone). Set it on an ancestor of <EnterprisePage>.
 * Used by /operations and the industry pages built on the enterprise layout.
 */
export const VAHUE_ENTERPRISE_THEME = {
  '--ent-bg': '#020202',
  '--ent-fg': '#ffffff',
  '--ent-fg-2': 'rgba(255,255,255,0.7)',
  '--ent-band': '#0b0b0b',
  '--ent-band-2': '#111111',
  '--ent-card': '#161616',
  '--ent-card-2': '#0e0e0e',
  '--ent-accent': '#141414',
  '--ent-line': 'rgba(255,255,255,0.12)',
  '--ent-edge': 'rgba(255,255,255,0.22)',
  '--ent-icon': '#ffffff',
  '--ent-cta-gray': 'rgba(255,255,255,0.1)',
  '--ent-mark': 'rgba(255,255,255,0.6)',
  '--ent-dot-on': '#ffffff',
  '--ent-dot-off': 'rgba(255,255,255,0.3)',
  '--ent-cloud-tile': '#1e1e1e',
  '--ent-cloud-ink': '#ffffff',
  '--ent-cloud-line': '#5c5c5c',
  '--ent-cloud-band': '#ffffff',
} as CSSProperties

/** Dark tones for the seven hero graph nodes (each gets the dot texture via `dots`). */
export const NODE_TONES = ['#141414', '#171717', '#121212', '#191919', '#151515', '#131313', '#181818']
