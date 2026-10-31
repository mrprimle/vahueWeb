import { CLONE_PAGES, clonePath, type CloneGroup } from '../pages'

// Menu model mirroring scale.com's nav CMS shape: each category has a left and a right column made of
// sub-headers and page links; Resources also shows two featured cards instead of the link image.
export type NavLink = { kind: 'link'; href: string; name: string; image: string }
export type NavText = { kind: 'text'; text: string }
export type NavBlock = NavLink | NavText
export type NavCard = { href: string; title: string; image: string }
export type NavCategory = {
  key: string
  name: CloneGroup
  leftColumn: NavBlock[]
  rightColumn: NavBlock[]
  featuredPosts?: NavCard[]
}

const placeholder = (i: number) => `/scale-clone/shared/menu-placeholder-${((i % 8) + 8) % 8 + 1}.svg`

let imageIndex = 0
const link = (slug: string): NavLink => {
  const page = CLONE_PAGES.find((p) => p.slug === slug)
  if (!page) throw new Error(`Unknown clone page: ${slug}`)
  return { kind: 'link', href: clonePath(slug), name: page.label, image: placeholder(imageIndex++) }
}
const text = (t: string): NavText => ({ kind: 'text', text: t })
const section = (group: CloneGroup, name: string) =>
  CLONE_PAGES.filter((p) => p.group === group && p.section === name).map((p) => link(p.slug))

export const NAV_CATEGORIES: NavCategory[] = [
  {
    key: 'products',
    name: 'Products',
    leftColumn: [text('Data'), ...section('Products', 'Data')],
    rightColumn: [
      text('Applications'),
      ...section('Products', 'Applications'),
      text('Evaluation'),
      ...section('Products', 'Evaluation'),
    ],
  },
  {
    key: 'solutions',
    name: 'Solutions',
    leftColumn: [link('enterprise'), link('public-sector'), link('global-public-sector')],
    rightColumn: [
      text('By Industry'),
      link('enterprise-insurance'),
      link('enterprise-healthcare'),
      link('public-sector-national-security'),
    ],
  },
  {
    key: 'research',
    name: 'Research',
    leftColumn: [
      text('Research'),
      link('labs-papers'),
      link('labs-leaderboard'),
      link('labs'),
      link('labs-blog'),
      link('labs-jobs'),
    ],
    rightColumn: [],
  },
  {
    key: 'resources',
    name: 'Resources',
    leftColumn: [text('Company'), link('about'), link('security'), link('guides'), link('careers')],
    rightColumn: [link('demo'), link('blog'), link('events'), link('docs'), link('partnership')],
    // TODO: Vahue copy — featured promo cards (Scale pulls two recent posts here).
    featuredPosts: [
      { href: '#', title: 'Read the placeholder planning handbook', image: placeholder(5) },
      { href: '#', title: 'Placeholder story: building it from the ground up', image: placeholder(2) },
    ],
  },
]

export const LOGIN_HREF = '#'
export const GET_STARTED_HREF = clonePath('demo')

export const firstLinkWithImage = (cat: NavCategory): NavLink | null => {
  for (const b of [...cat.leftColumn, ...cat.rightColumn]) if (b.kind === 'link') return b
  return null
}

export const countRenderable = (blocks: NavBlock[]) => blocks.length
