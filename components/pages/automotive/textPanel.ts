// The Text tab artwork for the filled page: same layout, bars and reveal groups as Scale's (textPanel.scale.ts), set as live text. Sample data.
const MONO = 'font-family="var(--font-aeonik-mono),monospace"'
const SANS = 'font-family="var(--font-aeonik),sans-serif"'
const receipt = (x: number, y: number, text: string, anchor = 'start') => `<text x="${x}" y="${y}" font-size="7.5" fill="#000" fill-opacity=".9" text-anchor="${anchor}" ${MONO}>${text}</text>`
const field = (hex: string, x: number, y: number, label: string, value: string) =>
  `<path id="color-${hex}" stroke="#${hex}" stroke-width="2" stroke-linecap="round" d="M${x} ${y}v37"/><text id="color-${hex}" x="${x + 9}" y="${y + 14}" font-size="12" fill="#fff" ${MONO}><tspan font-weight="700">${label}</tspan><tspan x="${x + 9}" dy="21">${value}</tspan></text>`

export const TEXT_PANEL = [
  '<path fill="#111519" d="M0 0h649v402H0z"/>',
  '<path d="M42.19 53.99h7.64M46.01 39.98a1.8 1.8 0 012.55 2.55L37.95 53.14l-3.4.85.85-3.4L46.01 39.98Z" stroke="#fff" stroke-width="1.698" stroke-linecap="round" stroke-linejoin="round"/>',
  `<text x="59" y="54.7" font-size="20" fill="#fff" ${SANS}>ML Scoring</text>`,
  '<rect x="32.25" y="81.25" width="583.5" height="40.5" rx="7.75" fill="url(#x)" fill-opacity=".7" stroke="url(#z)" stroke-width=".5"/>',
  `<text x="45" y="105.5" font-size="13.5" fill="#fff" ${SANS}>Please score this repair order.</text>`,
  '<path fill="#fff" d="M32 163h256v239H32z"/>',
  '<path id="color-E7FE53" fill="#E7FE53" d="M90 300h69v12H90zM90 316h76v12H90z"/>',
  '<path id="color-ECA6FA" fill="#ECA6FA" d="M200 233h71v12h-71z"/>',
  '<path id="color-DBC6FC" fill="#DBC6FC" d="M219 300h32v12h-32zM219 316h32v12h-32z"/>',
  '<path id="color-B2FCD2" fill="#B2FCD2" d="M219 372h35v12h-35z"/>',
  receipt(160, 182, 'FLEET SERVICE CENTER', 'middle'),
  receipt(160, 193, '12 DEPOT ROAD', 'middle'),
  receipt(160, 204, 'BAY 4, EAST YARD', 'middle'),
  receipt(52, 234, 'TECH: MICHAEL'),
  receipt(203, 242, 'MAY 22, 2026'),
  receipt(268, 256, '6:46 AM', 'end'),
  receipt(52, 276, 'QTY'),
  receipt(90, 276, 'DESC'),
  receipt(219, 276, 'AMT'),
  '<path stroke="#000" stroke-opacity=".9" stroke-dasharray="2 2" d="M52 289.5h216"/>',
  receipt(52, 309, '1'),
  receipt(93, 309, 'BRAKE PADS'),
  receipt(222, 309, '$189'),
  receipt(52, 325, '1'),
  receipt(93, 325, 'LABOR 2H'),
  receipt(222, 325, '$240'),
  receipt(90, 349, 'SUBTOTAL'),
  receipt(219, 349, '$429'),
  receipt(90, 365, 'FLAGS'),
  receipt(219, 365, '0'),
  receipt(90, 381, 'SCORE'),
  receipt(222, 381, '0.91'),
  field('E7FE53', 341, 240, 'Item_1', 'Brake Pads'),
  field('E7FE53', 341, 310, 'Item_2', 'Labor 2h'),
  field('DBC6FC', 485, 171, 'Amount_1', '$189.00'),
  field('DBC6FC', 485, 240, 'Amount_2', '$240.00'),
  field('B2FCD2', 485, 310, 'Score', '0.91'),
  field('ECA6FA', 341, 170, 'Date', 'May 22, 2026'),
  '<defs><linearGradient id="x" x1="32" y1="89.5" x2="986.361" y2="148.063" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity=".01"/></linearGradient><linearGradient id="z" x1="930" y1="149" x2="864.172" y2="349.634" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".745" stop-color="#fff" stop-opacity=".94"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>',
].join('')
