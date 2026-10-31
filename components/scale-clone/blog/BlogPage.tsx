import BlogIndex from './BlogIndex'
import s from './blog.module.css'

/*
 * scale.com/blog body (between the shared header and footer). Spec: reference-snapshots/scale-clone/blog.md
 *
 * 1. Hero: pt-20 md:pt-36 pb-6, flex col gap-5 max-w-860: detail-mono eyebrow, header2 h1, body1 sub (max-w 520). Static.
 * 2. Tag bar + search (client): pb-6 md:pb-8.
 * 3. Bento "BlogPreview": py-12 md:py-16, 4-col proportional grid (5 tiles desktop / 4 stacked < 1024px).
 * 4. "More Posts" list: pb-12 md:pb-16, 10 rows + Load more.
 */
export default function BlogPage() {
  return (
    <>
      <section className="bg-white pb-6 pt-20 md:pt-36">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className="flex max-w-[860px] flex-col gap-5">
            {/* TODO: Vahue copy */}
            <p className={`${s.detailMono} font-mono tracking-[-0.01em] text-[#929292]`}>Vahue</p>
            {/* TODO: Vahue copy */}
            <h1 className={`${s.header2} font-display font-normal text-black`}>Journal</h1>
            {/* TODO: Vahue copy */}
            <p className={`${s.body1} max-w-[520px] font-display font-normal text-[#575757]`}>
              Company news and working notes from the placeholder team.
            </p>
          </div>
        </div>
      </section>
      <BlogIndex />
    </>
  )
}
