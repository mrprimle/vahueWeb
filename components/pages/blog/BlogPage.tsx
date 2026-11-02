// The route body as Scale renders it (RSC payload of /blog and /blog/category/<slug>): 243385 (theme light), hero,
// 507457 in Suspense, 808358 (only on /blog: captionFullBleed, fullWidth, light), 813045 in Suspense, 995634.
import { Suspense } from 'react'
import { BlogPreview, type BlogPreviewPost } from '@/components/site/shared/BlogPreview'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { BlogFilterBar } from './BlogFilterBar'
import { BlogPostList } from './BlogPostList'
import type { BlogContent } from './types'

export function BlogPage({ content: c, activeCategory = '' }: { content: BlogContent; activeCategory?: string }) {
  const posts = activeCategory ? c.posts.filter((p) => p.categories.includes(activeCategory)) : c.posts
  const bento = activeCategory ? [] : c.bento
  const tiles: BlogPreviewPost[] = bento.flatMap((tile) => {
    const post = c.posts.find((p) => p.slug === tile.slug)
    if (!post) return []
    return [
      {
        _key: post.slug,
        title: post.title,
        url: `/blog/${post.slug}`,
        image: tile.image,
        alt: tile.alt,
        category: post.category ?? undefined,
        imageGradientOverlay: tile.imageGradientOverlay,
        variantOverride: tile.variantOverride,
      },
    ]
  })
  return (
    <div className="min-h-screen bg-white">
      <PageThemeSetter theme="light" />
      <section className="bg-white pt-20 md:pt-36 pb-6">
        <div className="grid-layout-mobile md:grid-layout-desktop">
          <div className="col-span-full">
            <div className="flex flex-col gap-5 max-w-[860px]">
              <p className="detail-mono text-scale-gray-60">{c.hero.overtitle}</p>
              <h1 className="header2 text-black text-balance">{c.hero.title}</h1>
              <p className="body1 text-scale-gray-30 max-w-[520px] text-balance">{c.hero.description}</p>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="pb-6 md:pb-8 h-10" />}>
        <BlogFilterBar tags={c.tags} posts={posts} index={c.posts} activeCategory={activeCategory} ui={c.ui} />
      </Suspense>
      {tiles.length > 0 ? <BlogPreview posts={tiles} pageThemeOverride="light" captionFullBleed fullWidth /> : null}
      <Suspense fallback={<div className="py-16" />}>
        <BlogPostList posts={posts} activeCategory={activeCategory} bentoCount={tiles.length} ui={c.ui} />
      </Suspense>
      <SectionThemeWatcher />
    </div>
  )
}
