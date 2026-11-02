// Shape shared by content.scale.ts (Scale's strings) and content.ts (rendered strings).

export type DocsPageNode = {
  kind: 'page'
  title: string
  href: string
  /** Title on the page when it differs from the sidebar label. */
  pageTitle?: string
  /** Shows the Placeholder pill in the sidebar: endpoint or product content with nothing behind it. */
  placeholder?: boolean
  /** Placeholder page whose sidebar row has no room for the pill. */
  quietTag?: boolean
}

export type DocsGroupNode = { kind: 'group'; title: string; items: DocsPageNode[] }

export type DocsSection = {
  /** No title: a bare list, like the first row of Scale's sidebar. */
  title?: string
  items: (DocsPageNode | DocsGroupNode)[]
}

export type DocsTab = {
  label: string
  href: string
  sections: DocsSection[]
}

export type DocsCard = { title: string; body: string; href: string }

export type DocsContent = {
  siteName: string
  logo: { kind: 'image'; light: string; dark: string } | { kind: 'wordmark' }
  ui: {
    homeSuffix: string
    skipToContent: string
    navigation: string
    searchTrigger: string
    searchPlaceholder: string
    searchHints: string
    searchNoResults: string
    askAssistant: string
    assistantTitle: string
    assistantDisclaimer: string
    assistantPlaceholder: string
    assistantUnavailable: string
    onThisPage: string
    backToTop: string
    themeSystem: string
    themeLight: string
    themeDark: string
    placeholderTag: string
  }
  tabs: DocsTab[]
  landing: {
    title: string
    lead: string
    heading: string
    headingId: string
    body: string
    cards: DocsCard[]
    next: { title: string; href: string }
  }
  stub: {
    docsNote: string
    apiNote: string
  }
}
