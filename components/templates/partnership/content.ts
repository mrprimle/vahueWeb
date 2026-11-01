// Content contract for the scale.com/partnership clone (PartnershipList CMS slice, module in 0sni47mcvnqwg.js).
// Scale's own copy, captured 2026-11-01 from the server-rendered page. Static snapshot, no CMS calls at runtime.

export type PartnerLogo = {
  /** Mark shown in the 55x36 box inside the black 86px tile. Omit to render a neutral placeholder tile. */
  src?: string
  alt?: string
  /** `logo.mono` on Scale: renders the mark with `filter: brightness(0) invert(1)`. */
  mono?: boolean
}

export type PartnerItem = {
  slug: string
  title: string
  description: string
  logo?: PartnerLogo
  /** Card target, instead of hrefBase + slug + hrefSuffix (for a page without partner detail routes). */
  href?: string
}

export type PartnershipContent = {
  title: string
  description: string
  /** Scale: hrefBase "/partnership" + `/${slug}` + hrefSuffix. */
  hrefBase: string
  hrefSuffix?: string
  /** Shown when `items` is empty (Scale's literal fallback). */
  emptyLabel: string
  /** Cycled card colours (Scale `eu`). */
  cardColors: string[]
  linkLabel: string
  items: PartnerItem[]
}

export const scalePartnershipContent: PartnershipContent = {
  title: 'Scale Partners',
  description:
    'Scale enables enterprises to accelerate AI development with high-quality data, rigorous model evaluation, and secure solutions designed to deliver reliable outcomes at scale.',
  // Scale: '/partnership' (detail pages). The clone has no detail routes, so cards open Scale's own pages.
  hrefBase: 'https://scale.com/partnership',
  emptyLabel: 'No partnerships found.',
  cardColors: ['#839CB2', '#A8927C'],
  linkLabel: 'Learn more',
  items: [
    {
      slug: 'google-cloud',
      title: 'Google Cloud',
      description: 'Scale Generative AI Portfolio optimized for Google Cloud Platform',
      // Scale ships the Google Cloud mark (110x72 PNG, alt ""); not copied into the clone.
      logo: { alt: '' },
    },
    {
      slug: 'nvidia',
      title: 'NVIDIA x Scale',
      description: 'Accelerating open-weight model adoption and performance with Scale GenAI Portfolio.',
      // Scale ships the NVIDIA SVG with logo.mono = true; not copied into the clone.
      logo: { alt: 'NVIDIA', mono: true },
    },
  ],
}
