/*
 * Colours for the Vahue pages on the scale.com/enterprise layout (/operations and the banking / retail /
 * distribution industry pages). Mike, 2026-10-31: these pages use Scale's own colour design, so the layout's
 * --ent-* tokens are left at the clone's defaults (no override) and the per-item colours below are Scale's values
 * from the clone data (components/templates/enterprise/content.ts). Fonts and logo stay Vahue's.
 */

/** Hero graph node colours, in Scale's node order (used under the dot texture where Scale had photos). */
export const NODE_COLORS = [
  'rgb(167, 137, 85)',
  'rgb(163, 119, 87)',
  'rgb(84, 140, 164)',
  'rgb(84, 132, 153)',
  'rgb(159, 111, 85)',
  'rgb(158, 107, 95)',
  'rgb(145, 127, 111)',
]

/** Pillar icon tiles: Scale's sand, cloud slate and evergreen. */
export const PILLAR_COLORS = ['rgb(168, 146, 124)', 'rgb(131, 156, 178)', 'rgb(25, 58, 41)']

/** Built-to-be-trusted card hover fills (and icon glyph colours): slate, sand, plum. */
export const TRUSTED_FILLS = ['rgb(131, 156, 178)', 'rgb(168, 146, 124)', 'rgb(121, 100, 140)']

/** Blog carousel category swatches: Scale's first card is navy, the rest charcoal. */
export const BLOG_SWATCHES = ['rgb(39, 50, 82)', 'rgb(82, 82, 82)', 'rgb(82, 82, 82)', 'rgb(82, 82, 82)']

/** Blog card image areas (no Scale photos): Scale palette tones under the dot texture and own line art. */
export const BLOG_TONES = ['#273252', '#193A29', '#3D3D3D', '#5C4F42']

/** PoweredBy card icon tile colour (Scale's plum). */
export const POWERED_ICON_COLOR = '#79648C'
