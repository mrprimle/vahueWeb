import { SCALE_BLOG_POSTS } from './snapshot'

/*
 * Content contract for the scale.com/blog layout (BlogPage). Plain data only (no functions), so a server page can
 * pass it to the client parts. `scaleBlogContent` is Scale's own copy, used by /scale-clone/blog; Vahue's /blog
 * passes its own object with the same shape.
 */

export type BlogCategory = { slug: string; name: string }

/** A filter pill. `id` keys the pill (Scale's tag list repeats Company and Research under two CMS ids). */
export type BlogTag = BlogCategory & { id: string }

export type BlogPost = {
  slug: string
  title: string
  /** ISO timestamp; shown as "Oct 2026" (en-US, month short + year, America/Los_Angeles). */
  date: string | null
  category: BlogCategory | null
  /** Extra category slugs the category pages filter on. */
  categories?: string[]
  /** Overrides `hrefs.postBase + slug`. */
  href?: string
}

export type BentoVariant = 'overlay' | 'caption' | 'titleOnly'

/** One BlogPreview tile (Scale's bento "posts" entries). */
export type BentoEntry = {
  slug: string
  /** Local cover image. */
  image: string
  imageAlt?: string
  /** Scale's `variantOverride`; else the slot's variant (module 189756). */
  variantOverride?: BentoVariant
  /** Scale's `imageGradientOverlay` (top/bottom shade on overlay tiles). */
  imageGradientOverlay?: boolean
  /** Category swatch colour; else the slot swatch. */
  swatch?: string
}

export type BlogLabels = {
  all: string
  more: string
  morePosts: string
  loadMore: string
  noResults: string
  /** `{n}` result / results line in the list when `?q=` is set. */
  result: string
  results: string
  searchButton: string
  searchShortcut: string
  searchAria: string
  searchPlaceholder: string
  searchRecent: string
  searchNoResults: string
  searchCancel: string
  searchEsc: string
  searchNavigate: string
  searchOpen: string
  searchHint: string
}

export type BlogContent = {
  hero: { eyebrow: string; title: string; body: string }
  tags: BlogTag[]
  posts: BlogPost[]
  bento: BentoEntry[]
  /** Posts the bento takes off the top of the list on /blog (Scale passes bentoCount 5). */
  bentoCount: number
  hrefs: {
    /** "All" pill. */
    all: string
    /** Category pill = categoryBase + slug (+ trailing slash when set). */
    categoryBase: string
    /** Post link = postBase + slug. */
    postBase: string
    trailingSlash?: boolean
    /** Open post links in a new tab (clone links out to scale.com). */
    postsExternal?: boolean
  }
  labels: BlogLabels
}

export const scaleBlogLabels: BlogLabels = {
  all: 'All',
  more: 'More',
  morePosts: 'More Posts',
  loadMore: 'Load more',
  noResults: 'No results found',
  result: 'result',
  results: 'results',
  searchButton: 'Search...',
  searchShortcut: '⌘K',
  searchAria: 'Search',
  searchPlaceholder: 'Search posts...',
  searchRecent: 'Recent posts',
  searchNoResults: 'No results for',
  searchCancel: 'Cancel',
  searchEsc: 'Esc',
  searchNavigate: '↑↓ Navigate',
  searchOpen: '↵ Open',
  searchHint: '⌘K to search',
}

// Scale's tag list, in CMS order (first 5 inline on desktop, the rest under "More").
export const SCALE_BLOG_TAGS: BlogTag[] = [
  { id: '5k7gs459lwdbH0j4AyeW8w', name: 'Testing & Evals', slug: 'testing-evals' },
  { id: '5k7gs459lwdbH0j4AyeWE0', name: 'Robotics', slug: 'robotics' },
  { id: '5k7gs459lwdbH0j4AyeWJ4', name: 'Global', slug: 'global' },
  { id: '5k7gs459lwdbH0j4AyeWO8', name: 'Defense', slug: 'defense' },
  { id: '5k7gs459lwdbH0j4AyeWTC', name: 'Autonomous Vehicle', slug: 'autonomous-vehicle' },
  { id: '7C11lhdHH1sdLwfCVL2wSS', name: 'Experts', slug: 'experts' },
  { id: 'c3959b44-8ace-404d-83a0-30bdfbe74162', name: 'Policy', slug: 'policy' },
  { id: 'category.company', name: 'Company', slug: 'company' },
  { id: 'category.customers', name: 'Customers', slug: 'customers' },
  { id: 'category.partnerships', name: 'Partnerships', slug: 'partnerships' },
  { id: 'category.product', name: 'Product', slug: 'product' },
  { id: 'category.research', name: 'Research', slug: 'research' },
  { id: 'z5xsJl35cVFkXOiyqJ9e3h', name: 'Healthcare', slug: 'healthcare' },
  { id: 'z5xsJl35cVFkXOiyqJ9e5X', name: 'Enterprise', slug: 'enterprise' },
  { id: 'z5xsJl35cVFkXOiyqJ9e7N', name: 'Public Sector', slug: 'public-sector' },
  { id: 'ebb49f19-f5a1-4749-996f-a0868b73621b', name: 'Podcast', slug: 'podcast' },
  { id: 'd5035e24-2b55-4622-aea7-2ab7ff048b81', name: 'Data', slug: 'data' },
  { id: '366d4c1c-0ee2-4a22-aa36-45f62f2e8725', name: 'Company', slug: 'company' },
  { id: 'df35d7fa-13b3-475a-98d6-3d4883f97f48', name: 'Research', slug: 'research' },
]

export const scaleBlogContent: BlogContent = {
  hero: {
    eyebrow: 'Scale AI',
    title: 'Blog',
    body: 'Company updates and technology articles from Scale AI.',
  },
  tags: SCALE_BLOG_TAGS,
  posts: SCALE_BLOG_POSTS,
  // The 5 bento entries on /blog (tile 0 carries variantOverride "overlay"; all have imageGradientOverlay true).
  bento: [
    { slug: 'ai-literacy-microcredential-launch', image: '/scale-clone/blog/ai-literacy-microcredential-launch.webp', variantOverride: 'overlay', imageGradientOverlay: true },
    { slug: 'dualchem-evaluating-ai-models-dual-use-chemistry-risks', image: '/scale-clone/blog/dualchem-evaluating-ai-models-dual-use-chemistry-risks.webp', imageGradientOverlay: true },
    { slug: 'scales-long-term-investment-in-qatar', image: '/scale-clone/blog/scales-long-term-investment-in-qatar.webp', imageGradientOverlay: true },
    { slug: 'scale-in-uae', image: '/scale-clone/blog/scale-in-uae.webp', imageGradientOverlay: true },
    { slug: 'personalised-learning-at-national-scale', image: '/scale-clone/blog/personalised-learning-at-national-scale.webp', imageGradientOverlay: true },
  ],
  bentoCount: 5,
  hrefs: {
    all: '/scale-clone/blog/',
    categoryBase: '/scale-clone/blog/category/',
    trailingSlash: true,
    // No post pages in the clone: posts link to scale.com, as the careers clone does for job pages.
    postBase: 'https://scale.com/blog/',
  },
  labels: scaleBlogLabels,
}

/** Posts of one category, in index order (primary category or any of `categories`). */
export function postsInCategory(posts: BlogPost[], slug: string) {
  return posts.filter((p) => p.category?.slug === slug || p.categories?.includes(slug))
}

export const postHref = (c: BlogContent, p: BlogPost) => p.href ?? c.hrefs.postBase + p.slug
export const categoryHref = (c: BlogContent, slug: string) => c.hrefs.categoryBase + slug + (c.hrefs.trailingSlash ? '/' : '')

/** Scale's list/search date: toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "America/Los_Angeles" }). */
export const formatPostDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'America/Los_Angeles' }) : null
