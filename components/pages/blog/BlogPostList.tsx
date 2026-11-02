'use client'

// Scale modules 813045 (filter by ?q=, load more) and 603626 (PostList), chunk 126gr-esjog6p.js.
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { BlogPost, BlogUi } from './types'

const META = 'font-aeonik text-[13px] font-normal uppercase tracking-wider text-scale-gray-60'

function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="divide-y divide-scale-gray-90">
      {posts.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-10 py-6 md:py-9 px-4 -mx-4 hover:bg-scale-gray-95 transition-colors">
          {p.date && <span className={`${META} md:w-20 md:shrink-0 whitespace-nowrap`}>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'America/Los_Angeles' })}</span>}
          <h3 className="font-aeonik text-[28px] leading-snug font-normal text-black text-balance flex-1 group-hover:text-scale-gray-30 transition-colors">{p.title}</h3>
          {p.category && <span className={`md:hidden ${META}`}>{p.category.name}</span>}
          <div className="hidden md:flex items-center gap-8 shrink-0">{p.category && <span className={META}>{p.category.name}</span>}</div>
        </Link>
      ))}
    </div>
  )
}

export function BlogPostList({ posts, activeCategory = '', bentoCount = 0, ui }: { posts: BlogPost[]; activeCategory?: string; bentoCount?: number; ui: BlogUi }) {
  const q = useSearchParams().get('q') || ''
  const searching = !!q
  const filtered = !!(searching || activeCategory)
  const matched = useMemo(() => {
    if (!searching) return posts
    const needle = q.toLowerCase()
    return posts.filter((p) => p.title.toLowerCase().includes(needle) || p.category?.name?.toLowerCase().includes(needle))
  }, [posts, q, searching])
  const rest = !searching && bentoCount > 0 ? matched.slice(bentoCount) : matched
  const [limit, setLimit] = useState(10)
  useEffect(() => {
    setLimit(10)
  }, [q, activeCategory])
  const page = rest.slice(0, limit)
  const hasMore = limit < rest.length
  if (rest.length === 0) {
    if (!searching) return null
    return (
      <section className="bg-white pb-12 md:pb-16">
        <div className="grid-layout-mobile md:grid-layout-desktop">
          <div className="col-span-full">
            <p className="detail-mono text-scale-gray-60">{ui.noResultsFound}</p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="bg-white pb-12 md:pb-16">
      <div className="grid-layout-mobile md:grid-layout-desktop">
        <div className="col-span-full">
          {!filtered && bentoCount > 0 && <p className="text-[13px] font-medium tracking-widest text-scale-gray-30 mb-10 uppercase">{ui.morePosts}</p>}
          {searching && (
            <p className="detail-mono text-scale-gray-60 mb-8 uppercase">
              {matched.length} {matched.length !== 1 ? ui.resultMany : ui.resultOne}
            </p>
          )}
          <PostList posts={page} />
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={() => setLimit((n) => n + 10)} className="px-6 py-3 rounded-xl border border-scale-gray-80 detail-mono text-scale-gray-30 hover:border-scale-gray-30 hover:text-black transition-colors">
                {ui.loadMore}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
