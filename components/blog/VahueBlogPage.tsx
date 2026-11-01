import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import BlogPage from '@/components/templates/blog/BlogPage'
import { vahueBlogContent } from './vahue-blog-content'

/*
 * Vahue /blog and /blog/category/<slug> on the scale.com/blog clone, in Scale's own colours and the Vahue fonts and
 * navbar (light on these routes, see isLightCloneParityPage in Navbar.tsx). Content: ./vahue-blog-content.ts.
 */
export default function VahueBlogPage({ activeCategory = '' }: { activeCategory?: string }) {
  return (
    // The site navbar is sticky and in the flow (89px), while the clone's header overlays the page: shift the page so
    // the hero sits where it does on /blog (padding below md, so no dark gap shows under the bar).
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <BlogPage content={vahueBlogContent} activeCategory={activeCategory} as="div" />
    </div>
  )
}
