import type { Metadata } from 'next'
import { content } from '@/components/pages/labs-leaderboard/content'
import { LeaderboardPage } from '@/components/pages/labs-leaderboard/LeaderboardPage'
import { labsChrome as chrome } from '@/components/site/labs/content'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  openGraph: { title: content.meta.title.split(' | ')[0], description: content.meta.description, siteName: content.meta.siteName },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  return <LeaderboardPage content={content} chrome={chrome} category={category} />
}
