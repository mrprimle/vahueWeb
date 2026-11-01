import searchIndex from './searchIndex.json'

/*
 * Content contract for the scale.com/docs landing (a Mintlify "mint" theme site served at scale.com/docs,
 * canonical https://api-reference.scale.com/docs). DocsPage renders every region from this object, so a Vahue
 * docs landing can reuse the same chrome + interactions by passing its own content.
 * `scaleDocsContent` is Scale's own copy, snapshotted 2026-11-01 (static; no live API calls).
 */

export type NavPage = { kind: 'page'; title: string; href: string }
export type NavGroup = { kind: 'group'; title: string; pages: NavEntry[]; expanded?: boolean }
export type NavEntry = NavPage | NavGroup
/** A top-level sidebar section: an optional h3 header (`title`) over a list of entries. */
export type NavSection = { title?: string; pages: NavEntry[] }

export type DocsTab = { label: string; href: string; active?: boolean }

export type DocsCard = { title: string; body: string; href: string }

/** An MDX section below the card group: an anchored h2/h3 with paragraphs, a bullet list and an optional link. */
export type DocsSection = {
  id: string
  level: 2 | 3
  title: string
  body?: string[]
  items?: { label?: string; text: string }[]
  link?: { label: string; href: string }
}

/** One search record: `k` p = page, s = section; `b` = breadcrumbs; `h` = href (site-relative to `linkBase`). */
export type SearchRecord = { t: string; h: string; b: string[]; k: 'p' | 's' }

export type DocsContent = {
  siteName: string
  logo: { light: string; dark: string; alt: string }
  /** When set, the chrome draws this name next to a round mark in text colour instead of the logo images. */
  wordmark?: string
  /** Where the logo goes (defaults to the docs landing). */
  homeHref?: string
  /** Overrides the root font stack. */
  fontFamily?: string
  /** Hrefs in content are written as on the live site (`/docs/...`). `localPrefix` maps to this clone, everything else is sent to `linkBase`. */
  linkBase: string
  localPrefix: { from: string; to: string }
  tabs: DocsTab[]
  sidebar: NavSection[]
  /** Current page href (matches the active sidebar entry). */
  activeHref: string
  /** Breadcrumb shown in the mobile navbar row. */
  mobileTitle: string
  page: {
    title: string
    description: string
    /** The MDX body: an h1 Heading with an anchor, a paragraph and a 2-column CardGroup. */
    heading: { id: string; text: string }
    body: string
    cards: DocsCard[]
    sections?: DocsSection[]
  }
  toc: { id: string; title: string; depth: number }[]
  next?: { title: string; href: string }
  search: {
    placeholder: string
    records: SearchRecord[]
    /** Results shown per query (Scale shows 6). */
    limit: number
    askLabel: string
    /** The Ask Assistant row reads `${askPrefix}<query>${askSuffix}` (strings, so the content stays serialisable for the client). */
    askPrefix: string
    askSuffix: string
  }
  assistant: {
    title: string
    disclaimer: string
    placeholder: string
    /** Reply shown in the static snapshot, where the live assistant can't run. */
    offlineReply: string
  }
}

const DESCRIPTION =
  'Scale AI’s mission is to accelerate the development of AI applications. To enable teams to make faster progress, we began with data - the foundation of all AI applications. Scale AI turns raw data into high-quality training data by combining machine learning powered pre-labeling and active tooling with varying levels and types of human review.'

const p = (title: string, href: string): NavPage => ({ kind: 'page', title, href })

export const scaleDocsContent: DocsContent = {
  siteName: 'Scale Documentation',
  logo: { light: '/templates/docs/scale-wordmark.svg', dark: '/templates/docs/scale-wordmark-dark.svg', alt: 'logo' },
  linkBase: 'https://scale.com',
  localPrefix: { from: '/docs', to: '/docs' },
  tabs: [
    { label: 'Documentation', href: '/docs', active: true },
    { label: 'API Reference', href: '/docs/api-reference/introduction-to-scale-api' },
  ],
  activeHref: '/docs',
  mobileTitle: 'Getting Started with Scale',
  sidebar: [
    { pages: [p('Getting Started with Scale', '/docs')] },
    {
      title: 'Getting Started with Scale',
      pages: [
        p('Overview', '/docs/overview'),
        p('Key Concepts', '/docs/key-concepts-and-definitions'),
        p('Team', '/docs/team-getting-started'),
        p('Technical Limits & Recommendations', '/docs/technical-limits-and-recommendations'),
        p('API Compatibility Policy', '/docs/api-compatibility-policy'),
        p('Customer Support', '/docs/customer-support'),
      ],
    },
    { title: 'GenAI Platform', pages: [p('Getting Started', '/docs/genai-platform')] },
    { title: 'GenAI Data Engine', pages: [p('Getting Started', '/docs/genai-data-engine')] },
    {
      title: 'Automotive Data Engine',
      pages: [
        {
          kind: 'group',
          title: 'Customer Dashboard',
          expanded: true,
          pages: [
            p('Manage Your Account', '/docs/pro-or-manage-account'),
            p('Tasks Tab', '/docs/pro-or-tasks-tab'),
            p('Manage Your Projects', '/docs/pro-or-manage-projects'),
            p('Quality Tab', '/docs/pro-or-quality'),
            p('Downloading Data', '/docs/downloading-data'),
            p('Overview', '/docs/pro-or-overview-tab'),
          ],
        },
        {
          kind: 'group',
          title: 'Data Hosting',
          expanded: true,
          pages: [
            p('AWS S3', '/docs/aws-s3'),
            p('Google Cloud Storage', '/docs/google-cloud-storage'),
            p('Azure Blob Storage', '/docs/azure-blob-storage'),
            p('IP Allowlisting', '/docs/ip-allowlisting'),
          ],
        },
        p('Nucleus', '/docs/nucleus'),
      ],
    },
  ],
  page: {
    title: 'Getting Started with Scale',
    description: DESCRIPTION,
    heading: { id: 'getting-started-with-scale', text: 'Getting Started with Scale' },
    body: DESCRIPTION,
    cards: [
      { title: 'Documentation', body: 'Guides, workflows, and product documentation.', href: '/docs/genai-data-engine' },
      { title: 'API Reference', body: 'API concepts and endpoint reference documentation.', href: '/docs/api-reference/introduction-to-scale-api' },
    ],
  },
  toc: [{ id: 'getting-started-with-scale', title: 'Getting Started with Scale', depth: 1 }],
  next: { title: 'Overview', href: '/docs/overview' },
  search: {
    placeholder: 'Search or ask a question...',
    records: searchIndex as SearchRecord[],
    limit: 6,
    askLabel: 'Ask Assistant',
    askPrefix: 'Can you tell me about ',
    askSuffix: '?',
  },
  assistant: {
    title: 'Assistant',
    disclaimer: 'Responses are generated using AI and may contain mistakes.',
    placeholder: 'Ask a question...',
    offlineReply: 'The assistant is not available in this static snapshot of the docs.',
  },
}
