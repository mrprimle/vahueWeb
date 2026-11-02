export type PartnerLogo = {
  /** Local path. No path means a neutral tile at Scale's logo box. */
  path?: string
  alt: string
  /** Scale's `[filter:brightness(0)_invert(1)]` on the logo box, for dark marks. */
  invert?: boolean
}

export type PartnerCard = {
  key: string
  url: string
  color: string
  logo: PartnerLogo
  title: string
  body: string
  cta: string
}

export type PartnershipContent = {
  meta: { title: string; description: string }
  hero: { title: string; body: string }
  cards: PartnerCard[]
}
