// Customer logos from the old site's public/img, trimmed to their ink so they sit in Scale's logo boxes.
// FROM OLD SITE: confirm. The old site only ever rendered Qonto; the rest were files in public/img that no page used.
const RATIOS = {
  zwapgrid: 4.569,
  ica: 2,
  verbit: 2.375,
  'svea-solar': 1.974,
  wisestamp: 3.99,
  winningtemp: 4.048,
  inspera: 1.966,
  monocl: 4,
  qonto: 3.719,
  etoro: 3.25,
  captriz: 5.905,
  'circle-economy': 3.301,
} as const

const NAMES: Record<ProofLogo, string> = {
  zwapgrid: 'Zwapgrid',
  ica: 'ICA',
  verbit: 'Verbit',
  'svea-solar': 'Svea Solar',
  wisestamp: 'WiseStamp',
  winningtemp: 'Winningtemp',
  inspera: 'Inspera',
  monocl: 'Monocl',
  qonto: 'Qonto',
  etoro: 'eToro',
  captriz: 'Captriz',
  'circle-economy': 'Circle Economy',
}

export type ProofLogo = keyof typeof RATIOS

export const proofLogoAlt = (name: ProofLogo) => NAMES[name]
export const proofLogoSrc = (name: ProofLogo) => `/logos/${name}.svg`

/** The logo fitted inside a box, keeping its proportions. */
export function fitProofLogo(name: ProofLogo, boxWidth: number, boxHeight: number) {
  const ratio = RATIOS[name]
  const width = Math.min(boxWidth, boxHeight * ratio)
  return { alt: NAMES[name], src: proofLogoSrc(name), width: Math.round(width), height: Math.round(width / ratio) }
}
