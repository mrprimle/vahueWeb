export type LabsPaperRow = {
  id: string
  title: string
  /** Scale: `/papers/${slug}` when a slug exists, else `link || '#'`, opened in a new tab unless `#`. */
  slug?: string
  href: string
  date: string
  dateSort: string
  categories: string[]
  authors: string[]
  image?: string
}

export type LabsPapersContent = {
  meta: { title: string; description: string }
  heading: string
  blurb: string
  allLabel: string
  columns: { date: string; title: string; category: string }
  noImage: string
  found: { one: string; many: string; suffix: string }
  empty: string
  papers: LabsPaperRow[]
}
