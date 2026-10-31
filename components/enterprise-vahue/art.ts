// Own decorative art for the Vahue pages on the enterprise layout: the dot texture, workflow line art for the
// carousel cards and small line icons for the control cards. White on dark, no Scale imagery.

// Dot texture (the site's hero-texture pattern) over a flat tone: used for node and card fills.
export const dots = (tone: string, alpha = 0.14, size = 6) =>
  `radial-gradient(circle at 1px 1px, rgba(255,255,255,${alpha}) 1px, transparent 0) 0 0 / ${size}px ${size}px, ${tone}`

// Line art per workflow for the carousel cards (own SVG, white strokes).
const svg = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke='white' stroke-opacity='0.42' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>${body}</svg>`,
  )}")`
export const WORKFLOW_ART: Record<string, string> = {
  'back-office-sync': svg(
    "<rect x='34' y='52' width='56' height='40' rx='6'/><rect x='110' y='108' width='56' height='40' rx='6'/><path d='M90 72h28a10 10 0 0 1 10 10v20'/><path d='m122 98 6 6 6-6'/><path d='M110 128H82a10 10 0 0 1-10-10V98'/><path d='m78 102-6-6-6 6'/>",
  ),
  'document-intake': svg(
    "<path d='M62 36h52l24 24v104H62z'/><path d='M114 36v24h24'/><path d='M78 84h44M78 100h44M78 116h28'/><circle cx='138' cy='146' r='16'/><path d='m131 146 5 5 9-10'/>",
  ),
  'knowledge-agents': svg(
    "<circle cx='92' cy='92' r='38'/><path d='m120 120 30 30'/><path d='M76 84h32M76 100h22'/>",
  ),
  'support-agents': svg(
    "<path d='M40 56h80a10 10 0 0 1 10 10v36a10 10 0 0 1-10 10H72l-18 14v-14H40a10 10 0 0 1-10-10V66a10 10 0 0 1 10-10z'/><path d='M150 96h10a10 10 0 0 1 10 10v30a10 10 0 0 1-10 10h-6v12l-14-12h-30a10 10 0 0 1-10-10v-8'/>",
  ),
  'scoring-decisions': svg(
    "<path d='M40 150h120'/><rect x='52' y='110' width='18' height='40' rx='3'/><rect x='82' y='84' width='18' height='66' rx='3'/><rect x='112' y='60' width='18' height='90' rx='3'/><path d='M44 70 70 52l26 14 40-30'/>",
  ),
  'engineering-enablement': svg("<path d='m72 70-30 30 30 30M128 70l30 30-30 30M110 56 90 144'/>"),
}

// Small line icons for the control cards (own SVG as data URIs; the clone renders them with <img>).
const icon = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='0.5' y='0.5' width='63' height='63' rx='12' fill='white' fill-opacity='0.06' stroke='white' stroke-opacity='0.14' stroke-width='1'/>${body}</svg>`,
  )}`
export const CONTROL_ICONS = {
  review: icon("<path d='M20 24h24M20 32h24M20 40h14'/><path d='m38 42 4 4 8-9'/>"),
  lock: icon("<rect x='21' y='29' width='22' height='16' rx='3'/><path d='M26 29v-4a6 6 0 0 1 12 0v4'/>"),
  log: icon("<path d='M22 22h20v20H22z'/><path d='M27 28h10M27 32h10M27 36h6'/>"),
  cloud: icon("<path d='M24 42h18a7 7 0 0 0 0-14 10 10 0 0 0-19 3 6 6 0 0 0 1 11z'/>"),
}
