'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { formatPostDate, postHref, type BlogContent, type BlogPost } from './content'
import s from './blog.module.css'

/*
 * scale.com BlogPostList (module 813045) + PostList (603626).
 * `?q=` filters by title / category name (then the bento offset is not applied and "N results" shows); otherwise the
 * first `bentoCount` posts are dropped (they are in the bento). 10 rows, "Load more" adds 10; the count resets when
 * q or the category changes. "More Posts" label only on /blog without q. Nothing renders when the list is empty,
 * except "No results found" for a query.
 * Row: Link, flex col md:row md:items-center gap-2 md:gap-10 py-6 md:py-9 px-4 -mx-4, hover bg gray-95, 150ms;
 *   date 13px uppercase tracking-wider gray-60 md:w-20; h3 28/1.375 black text-balance flex-1, group-hover gray-30;
 *   category 13px uppercase gray-60 (below the title < 768px, right column >= 768px). Rows divided by gray-90.
 */
export default function PostListSection({
  content,
  posts,
  activeCategory = '',
  bentoCount = 0,
}: {
  content: BlogContent
  posts: BlogPost[]
  activeCategory?: string
  bentoCount?: number
}) {
  const { labels } = content
  const q = useSearchParams().get('q') || ''
  const searching = !!q
  const filtered = !!q || !!activeCategory
  const matched = useMemo(() => {
    if (!searching) return posts
    const n = q.toLowerCase()
    return posts.filter((p) => p.title.toLowerCase().includes(n) || p.category?.name?.toLowerCase().includes(n))
  }, [posts, q, searching])
  const source = !searching && bentoCount > 0 ? matched.slice(bentoCount) : matched
  const [count, setCount] = useState(10)
  useEffect(() => setCount(10), [q, activeCategory])
  const rows = source.slice(0, count)

  if (source.length === 0)
    return searching ? (
      <section className="bg-white pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <p className={`${s.detailMono} font-mono text-[#929292]`}>{labels.noResults}</p>
        </div>
      </section>
    ) : null

  return (
    <section className="bg-white pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        {!filtered && bentoCount > 0 && (
          <p className="mb-10 font-display text-[13px] font-medium uppercase leading-[1.5] tracking-[0.1em] text-[#575757]">{labels.morePosts}</p>
        )}
        {searching && (
          <p className={`${s.detailMono} mb-8 font-mono uppercase text-[#929292]`}>
            {matched.length} {matched.length !== 1 ? labels.results : labels.result}
          </p>
        )}
        <div className="divide-y divide-[#eaeaea]">
          {rows.map((post) => (
            <Link
              key={post.slug}
              href={postHref(content, post)}
              className={`${s.row} ${s.ease} group -mx-4 flex flex-col gap-2 px-4 py-6 transition-colors md:flex-row md:items-center md:gap-10 md:py-9`}
            >
              {post.date && (
                <span className="whitespace-nowrap font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292] md:w-20 md:shrink-0">
                  {formatPostDate(post.date)}
                </span>
              )}
              <h3 className={`${s.rowTitle} ${s.ease} flex-1 text-balance font-display text-[28px] font-normal leading-[1.375] tracking-[-0.01em] text-black transition-colors`}>
                {post.title}
              </h3>
              {post.category && (
                <span className="font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292] md:hidden">
                  {post.category.name}
                </span>
              )}
              <div className="hidden shrink-0 items-center gap-8 md:flex">
                {post.category && (
                  <span className="font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292]">{post.category.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
        {count < source.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setCount((c) => c + 10)}
              className={`${s.detailMono} ${s.ease} ${s.hoverLoad} rounded-xl border border-[#c7c7c7] px-6 py-3 font-mono text-[#575757] transition-colors`}
            >
              {labels.loadMore}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
