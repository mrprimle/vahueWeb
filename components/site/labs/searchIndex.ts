import type { LabsHomeContent } from '@/components/pages/labs/types'
import { content as blogPage } from '@/components/pages/labs-blog/content'
import { content as jobsPage } from '@/components/pages/labs-jobs/content'
import { content as papersPage } from '@/components/pages/labs-papers/content'
import { content as leaderboardPage } from '@/components/pages/labs-leaderboard/content'
import type { LabsSearchEntry } from './types'

/** Static snapshot behind the search modal: every labs item the home page lists, plus the section indexes. No live API. */
export function buildLabsSearchIndex(home: LabsHomeContent, siteName: string): LabsSearchEntry[] {
  const suffix = ` | ${siteName}`
  const onHome = new Set(home.papers.items.map((p) => p.title))
  return [
    ...home.papers.items.map((p) => ({ crumb: home.papers.heading, title: `${p.title}${suffix}`, description: `${p.categories.join(' ')} ${p.date} ${p.title}`, href: p.href })),
    ...papersPage.papers.filter((p) => !onHome.has(p.title)).map((p) => ({ crumb: home.papers.heading, title: `${p.title}${suffix}`, description: `${p.categories.join(' ')} ${p.date} ${p.title}`, href: p.href })),
    ...home.blog.items.map((p) => ({ crumb: home.blog.heading, title: `${p.title}${suffix}`, description: p.intro.replace(/\s+/g, ' '), href: p.href })),
    ...blogPage.posts.filter((p) => !home.blog.items.some((h) => h.title === p.title)).map((p) => ({ crumb: home.blog.heading, title: `${p.title}${suffix}`, description: p.intro.replace(/\s+/g, ' '), href: home.blog.allHref })),
    ...home.leaderboards.items.map((l) => ({ crumb: home.leaderboards.heading, title: `${l.name}${suffix}`, description: home.leaderboards.blurb, href: l.href })),
    ...leaderboardPage.items.filter((i) => !i.deprecated && !home.leaderboards.items.some((l) => l.name === i.name)).map((i) => ({ crumb: home.leaderboards.heading, title: `${i.name}${suffix}`, description: i.description, href: i.href })),
    ...home.jobs.items.map((j) => ({ crumb: home.jobs.heading, title: j.title, description: `${j.location} ${j.date}`, href: j.href })),
    ...jobsPage.items.filter((j) => !home.jobs.items.some((h) => h.title === j.title)).map((j) => ({ crumb: home.jobs.heading, title: j.title, description: `${j.location} ${j.date}`, href: j.href })),
    { crumb: '', title: `${home.meta.title}`, description: home.hero.body, href: '/labs' },
  ]
}
