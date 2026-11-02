export type BlogPostCategory = { name: string; slug: string }

export type BlogPost = {
  slug: string
  title: string
  /** The post's primary category, shown on the row. Scale leaves it null on some posts. */
  category: BlogPostCategory | null
  /** Slugs of every category route that lists this post. */
  categories: string[]
  date: string | null
}

export type BlogTag = { id: string; name: string; slug: string }

export type BlogBentoTile = {
  slug: string
  image: string
  alt: string
  imageGradientOverlay: boolean
  variantOverride?: 'overlay'
}

export type BlogUi = {
  all: string
  more: string
  searchAria: string
  search: string
  shortcut: string
  searchPlaceholder: string
  cancel: string
  escape: string
  noResultsBefore: string
  noResultsAfter: string
  recentPosts: string
  resultOne: string
  resultMany: string
  navigate: string
  open: string
  searchHint: string
  morePosts: string
  noResultsFound: string
  loadMore: string
}

export type BlogContent = {
  meta: { title: string; description: string; categoryTitle: string; categoryDescription: string }
  hero: { overtitle: string; title: string; description: string }
  ui: BlogUi
  tags: BlogTag[]
  bento: BlogBentoTile[]
  posts: BlogPost[]
}
