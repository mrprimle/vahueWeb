export type LeaderboardScore = {
  model: string
  rank: number
  score: number
  /** `confidenceInterval_upper` on Scale. 0 hides the ± value and the whisker. */
  ci: number
  /** `contaminationMessage` on Scale. Puts the name behind a click tooltip. */
  message?: string
  isNew: boolean
  deprecated: boolean
  maxScore: number
  /** Bar colour. Scale derives it from the provider (module 371198); stored resolved here. */
  color: string
}

export type LeaderboardCategory = 'agentic' | 'safety' | 'frontier' | ''

export type LeaderboardItem = {
  key: string
  href: string
  name: string
  description: string
  category: LeaderboardCategory
  deprecated: boolean
  /** Country flag beside the name. Only the language boards have one. */
  flag?: string
  scores: LeaderboardScore[]
}

export type LeaderboardContent = {
  meta: { title: string; description: string; keywords: string; siteName: string }
  /** Where the tabs write `?category=`. */
  baseHref: string
  hero: {
    heading: string
    title: string
    body: string
    cta: string
    stats: { label: string; value: string; body: string }[]
  }
  tabs: { all: string; agentic: string; safety: string; frontier: string }
  card: { viewFull: string; arrow: string; newBadge: string; score: string; range: string; to: string; deprecated: string }
  features: { title: string; body: string }[]
  deprecated: { label: string; infoLabel: string; info: string }
  evaluate: {
    heading: string
    bodyBefore: string
    email: string
    bodyAfter: string
    cta: string
    form: {
      title: string
      firstName: string
      lastName: string
      company: string
      jobTitle: string
      message: string
      legalBefore: string
      legalLink: { label: string; href: string }
      legalAfter: string
    }
  }
  items: LeaderboardItem[]
}
