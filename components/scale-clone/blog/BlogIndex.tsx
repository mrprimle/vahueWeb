'use client'

import { useEffect, useMemo, useState } from 'react'
import BentoTile from './BentoTile'
import FilterBar from './FilterBar'
import SearchModal from './SearchModal'
import { POSTS, SLOTS, THUMBS } from './posts'
import s from './blog.module.css'

/*
 * Client part of the scale.com/blog index: tag filters + search (module 507457), bento (808358),
 * "More Posts" list with Load more (813045 / 603626).
 *
 * Scale's tag pills are links to /blog/category/<slug>; here they filter in place (same visual states).
 * Search on Scale queries Algolia (index scale_com_lx5v19e6hj_pages, facet type:blog, 8 hits, 200ms debounce);
 * here it filters the local placeholder list with the same UI and keyboard handling.
 * List: 10 rows, "Load more" adds 10 (useState(10) -> +10), reset when the filter changes.
 */

const MOBILE = '(max-width: 1023px)'

export default function BlogIndex() {
  const [active, setActive] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [count, setCount] = useState(10)

  useEffect(() => {
    const mq = matchMedia(MOBILE)
    const on = () => setIsMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // ⌘K / Ctrl+K toggles the search modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => setCount(10), [active])

  const bentoCount = isMobile ? 4 : 5
  const listSource = useMemo(
    () => (active ? POSTS.filter((p) => p.category?.slug === active) : POSTS.slice(bentoCount)),
    [active, bentoCount],
  )
  const rows = listSource.slice(0, count)

  return (
    <>
      <section className="bg-white pb-6 md:pb-8">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <FilterBar active={active} onSelect={setActive} onSearchOpen={() => setSearchOpen(true)} />
        </div>
      </section>
      <SearchModal posts={POSTS} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="isolate w-full scroll-mt-28 overflow-hidden bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className={`${s.grid} ${s.gridProportional}`}>
            {SLOTS.map((slot, i) => (
              <BentoTile
                key={`${i}-${isMobile ? 'm' : 'd'}`}
                post={POSTS[i]}
                slot={slot}
                index={i}
                isMobile={isMobile}
                thumb={THUMBS[i]}
                className={i === 4 ? s.desktopOnly : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          {rows.length === 0 ? null : (
            <>
              {!active && (
                // TODO: Vahue copy
                <p className="mb-10 font-display text-[13px] font-medium uppercase leading-[1.5] tracking-[0.1em] text-[#575757]">
                  More Posts
                </p>
              )}
              <div className="divide-y divide-[#eaeaea]">
                {rows.map((post) => (
                  <a
                    key={post.slug}
                    href="#"
                    className="group -mx-4 flex flex-col gap-2 px-4 py-6 transition-colors hover:bg-[#f2f2f2] md:flex-row md:items-center md:gap-10 md:py-9"
                  >
                    <span className="whitespace-nowrap font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292] md:w-20 md:shrink-0">
                      {post.date}
                    </span>
                    {/* TODO: Vahue copy */}
                    <h3 className="flex-1 text-balance font-display text-[28px] font-normal leading-[1.375] tracking-[-0.01em] text-black transition-colors group-hover:text-[#575757]">
                      {post.title}
                    </h3>
                    {post.category && (
                      <span className="font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292] md:hidden">
                        {post.category.name}
                      </span>
                    )}
                    <div className="hidden shrink-0 items-center gap-8 md:flex">
                      {post.category && (
                        <span className="font-display text-[13px] font-normal uppercase leading-[1.5] tracking-[0.05em] text-[#929292]">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
              {count < listSource.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setCount((c) => c + 10)}
                    className={`${s.detailMono} rounded-xl border border-[#c7c7c7] px-6 py-3 font-mono text-[#575757] transition-colors hover:border-[#575757] hover:text-black`}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
