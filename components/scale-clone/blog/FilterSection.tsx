'use client'

import { useEffect, useState } from 'react'
import FilterBar from './FilterBar'
import SearchModal from './SearchModal'
import type { BlogContent, BlogPost } from './content'

/*
 * scale.com BlogIndexHeader (module 507457 default export): the tag bar section (bg-white pb-6 md:pb-8) plus the
 * search modal. ⌘K / Ctrl+K toggles the modal (window keydown, preventDefault).
 */
export default function FilterSection({
  content,
  posts,
  activeCategory,
}: {
  content: BlogContent
  posts: BlogPost[]
  activeCategory: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="bg-white pb-6 md:pb-8">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <FilterBar content={content} activeCategory={activeCategory} onSearchOpen={() => setOpen(true)} />
        </div>
      </section>
      <SearchModal content={content} posts={posts} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
