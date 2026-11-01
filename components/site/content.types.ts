export type NavLink = { href: string; name: string; image?: { path: string; alt?: string } }
export type NavText = { text: string }
export type NavBlock = NavLink | NavText
export type FeaturedPost = { url: string; title: string; image?: { path: string; alt?: string } }
export type NavCategory = {
  name: string
  featureBlogPosts?: boolean
  leftColumn: NavBlock[]
  rightColumn: NavBlock[]
  featuredPosts?: FeaturedPost[]
}
export type NavContent = {
  logoLink: string
  loginCtaLabel: string
  loginCtaHref: string
  bookDemoCtaLabel: string
  bookDemoCtaHref: string
  categories: NavCategory[]
}
export type AnnouncementContent = { text: string; variant: string; cta: { label: string; href: string } }
export type FooterContent = {
  linkLists: { title: string; links: { text: string; href: string }[] }[]
  title: string
  smallPrint: string
  cookiesPrefix: string
  cookiesLink: string
  tos: { label: string; href: string }[]
  tosJoiner: string
  socials: { name: string; href: string; icon: 'linkedin' | 'x' }[]
}
