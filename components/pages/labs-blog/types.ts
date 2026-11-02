export type LabsBlogPost = {
  id: string
  /** Scale links to `/blog/${slug}`. Detail routes don't exist here yet, see `postHref` in BlogList. */
  slug: string
  title: string
  /** yyyy-mm-dd, as in Scale's payload. */
  date: string
  categories: string[]
  authors: string[]
  intro: string
}

export type LabsBlogContent = {
  meta: { title: string; description: string }
  heading: string
  blurb: string
  allLabel: string
  columns: { date: string; title: string; category: string; authors: string }
  count: { one: string; many: string; foundSuffix: string }
  empty: string
  readPost: string
  posts: LabsBlogPost[]
}
