export type LabsNavItem = { href: string; label: string }

export type LabsLogoContent = { alt: string; src?: string }

export type LabsSearchEntry = {
  /** Bracketed section label above the title, as on Scale: [PAPERS], [BLOG]. Empty for a page. */
  crumb: string
  title: string
  description: string
  href: string
}

export type LabsChromeContent = {
  logo: LabsLogoContent
  nav: { papers: LabsNavItem; blog: LabsNavItem; leaderboard: LabsNavItem }
  homeHref: string
  searchLabel: string
  shortcut: string
  mobileMenuLabel: string
  footer: {
    title: string
    blurb: string
    subscribe: string
    copyrightPrefix: string
    copyrightEntity: { label: string; href: string }
    copyrightSuffix: string
    links: { label: string; href: string }[]
  }
  newsletter: {
    title: string
    emailPlaceholder: string
    countryPlaceholder: string
    countries: string[]
    legalBefore: string
    legalLink: { label: string; href: string }
    submit: string
    required: string
    invalidEmail: string
    thanks: string
    close: string
  }
  search: {
    placeholder: string
    searchTab: string
    askTab: string
    askTrigger: string
    startConversation: string
    allLabel: string
    noResults: string
    poweredBy: string
    poweredByName: string
    close: string
    chatGreeting: string
    chatIntro: string
    chatAskPrefix: string
    chatSubject: string
    chatPlaceholder: string
    chatAnswerIntro: string
    chatNoAnswer: string
  }
}
