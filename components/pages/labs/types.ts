export type LabsPaper = { title: string; href: string; date: string; categories: string[]; authors: string; image: string }
export type LabsPost = { title: string; href: string; date: string; category?: string; intro: string }
export type LabsJob = { title: string; location: string; date: string; href: string }

export type LabsHomeContent = {
  meta: { title: string; description: string }
  hero: { title: string; body: string }
  leaderboards: { heading: string; blurb: string; items: { name: string; href: string }[]; more: { label: string; href: string } }
  papers: {
    heading: string
    blurb: string
    columns: { date: string; title: string; category: string; authors: string }
    items: LabsPaper[]
    noImage: string
    more: { label: string; href: string }
  }
  blog: {
    heading: string
    blurb: string
    previous: string
    next: string
    items: LabsPost[]
    viewAll: string
    allPosts: string
    allHref: string
  }
  jobs: { heading: string; columns: { date: string; position: string; location: string }; items: LabsJob[]; more: { label: string; href: string } }
}
