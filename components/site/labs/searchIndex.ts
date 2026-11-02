import type { LabsHomeContent } from '@/components/pages/labs/types'
import type { LabsSearchEntry } from './types'

/** Static snapshot behind the search modal: every labs item the home page lists, plus the section indexes. No live API. */
export function buildLabsSearchIndex(home: LabsHomeContent, siteName: string): LabsSearchEntry[] {
  const suffix = ` | ${siteName}`
  return [
    ...home.papers.items.map((p) => ({ crumb: home.papers.heading, title: `${p.title}${suffix}`, description: `${p.categories.join(' ')} ${p.date} ${p.title}`, href: p.href })),
    ...home.blog.items.map((p) => ({ crumb: home.blog.heading, title: `${p.title}${suffix}`, description: p.intro.replace(/\s+/g, ' '), href: p.href })),
    ...home.leaderboards.items.map((l) => ({ crumb: home.leaderboards.heading, title: `${l.name}${suffix}`, description: home.leaderboards.blurb, href: l.href })),
    ...home.jobs.items.map((j) => ({ crumb: home.jobs.heading, title: j.title, description: `${j.location} ${j.date}`, href: j.href })),
    { crumb: '', title: `${home.meta.title}`, description: home.hero.body, href: '/labs' },
  ]
}
