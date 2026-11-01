import { Suspense } from 'react'
import BlogPreview from './BlogPreview'
import FilterSection from './FilterSection'
import PostListSection from './PostListSection'
import { postsInCategory, type BlogContent } from './content'
import s from './blog.module.css'

/*
 * scale.com/blog (and /blog/category/<slug>) body between the shared header and footer, driven entirely by `content`
 * (see content.ts; Scale's copy is `scaleBlogContent`). Spec: reference-snapshots/scale-clone/blog.md
 *
 * Route order (RSC of scale.com/blog, 2026-11-01):
 *   1. hero  section.bg-white.pt-20.md:pt-36.pb-6 > max-w-860 flex col gap-5: detail-mono eyebrow, header2 h1, body1 sub (max-w 520)
 *   2. Suspense(fallback div.pb-6.md:pb-8.h-10) > BlogIndexHeader (module 507457): tag bar + BlogSearchModal
 *   3. BlogPreview (808358) light, captionFullBleed, fullWidth: 5 posts (4 below 1024px). /blog only.
 *   4. Suspense(fallback div.py-16) > BlogPostList (813045): list of posts minus the bento ones, Load more (+10)
 * On a category page (activeCategory set) there is no bento, the list gets the category's posts and no "More Posts" label.
 */
export default function BlogPage({
  content,
  activeCategory = '',
  as: Root = 'div',
}: {
  content: BlogContent
  activeCategory?: string
  as?: 'main' | 'div'
}) {
  const { hero } = content
  const posts = activeCategory ? postsInCategory(content.posts, activeCategory) : content.posts
  const bento = activeCategory ? [] : content.bento
  return (
    <Root className={`${s.root} min-h-screen bg-white`} data-blog-root>
      <section className="bg-white pb-6 pt-20 md:pt-36">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className="flex max-w-[860px] flex-col gap-5">
            <p className={`${s.detailMono} font-mono tracking-[-0.01em] text-[#929292]`}>{hero.eyebrow}</p>
            <h1 className={`${s.header2} font-display font-normal text-black`}>{hero.title}</h1>
            <p className={`${s.body1} max-w-[520px] font-display font-normal text-[#575757]`}>{hero.body}</p>
          </div>
        </div>
      </section>
      <FilterSection content={content} posts={posts} activeCategory={activeCategory} />
      {bento.length > 0 && <BlogPreview content={content} />}
      <Suspense fallback={<div className="py-16" />}>
        <PostListSection content={content} posts={posts} activeCategory={activeCategory} bentoCount={activeCategory ? 0 : content.bentoCount} />
      </Suspense>
    </Root>
  )
}
