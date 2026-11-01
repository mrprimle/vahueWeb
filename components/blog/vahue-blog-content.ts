import { scaleBlogLabels, type BentoEntry, type BlogContent, type BlogPost, type BlogTag } from '@/components/templates/blog/content'

/*
 * Vahue /blog on the scale.com/blog clone (components/templates/blog, spec reference-snapshots/scale-clone/blog.md).
 *
 * Posts are Vahue's six real articles, the same list the previous /blog index rendered and app/blog/[slug]/page.tsx
 * serves (title, date, category and cover copied verbatim; newest first). Nothing is invented.
 * Tags are the posts' own categories, in order of first appearance. With 4 tags the desktop row has no "More" button
 * (Scale shows 5 inline and the rest under More), and with 6 posts the list holds 1 row under the 5-tile bento, so
 * "Load more" stays hidden (it needs more than 10 rows).
 * Bento covers are the posts' existing cover images. Copy written for this page is marked `// page copy`.
 */

const cat = (name: string) => ({
  name,
  slug: name
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
})

const AI_SEARCH = cat('AI Search')
const AGENTIC_AI = cat('Agentic AI')
const AI_POLICY = cat('AI Policy')
const AI_ML = cat('AI & Machine Learning')

// Dates from the posts ("June 16, 2026" etc.), stored at noon UTC so the Los Angeles month never shifts.
const post = (slug: string, title: string, date: string, category: { name: string; slug: string }, image: string) => ({
  slug,
  title,
  date: `${date}T12:00:00.000Z`,
  category,
  href: `/blog/${slug}/`,
  image,
})

const POSTS = [
  post('aeo-content-system', 'Your Content Is Invisible to AI. Here Is the System That Fixes It.', '2026-06-16', AI_SEARCH, '/img/blog/aeo-system-cover.png'),
  post('claude-fable-5-agentic-ai', 'What it feels like to work with Fable', '2026-06-09', AGENTIC_AI, '/img/blog/agentic-flexibility-assets.webp'),
  post('trumps-ai-order-decoded', "Trump's AI order, decoded", '2026-06-02', AI_POLICY, '/img/blog/blog4.avif'),
  post('secure-llm-deployment-enterprise', 'Deploying LLMs Securely in Enterprise Environments', '2026-01-15', AI_ML, '/img/blog/blog1.jpg'),
  post('code-data-sources-for-llm-training', 'Evaluating Code Data Sources for Training Large Language Models', '2026-01-10', AI_ML, '/img/blog/blog2.jpg'),
  post('human-written-code-llm-training', 'The Case for Human-Written Code in LLM Training', '2026-01-05', AI_ML, '/img/blog/blog3.png'),
]

export const vahueBlogPosts: BlogPost[] = POSTS.map(({ slug, title, date, category, href }) => ({ slug, title, date, category, href }))

export const vahueBlogTags: BlogTag[] = [...new Map(POSTS.map((p) => [p.category.slug, p.category])).values()].map((c) => ({
  id: c.slug,
  ...c,
}))

// The 5 newest posts fill Scale's 5 bento slots; tile 0 carries variantOverride "overlay" and every tile the gradient
// shade, as on scale.com/blog.
const bento: BentoEntry[] = POSTS.slice(0, 5).map((p, i) => ({
  slug: p.slug,
  image: p.image,
  ...(i === 0 ? { variantOverride: 'overlay' as const } : {}),
  imageGradientOverlay: true,
}))

export const vahueBlogContent: BlogContent = {
  hero: {
    eyebrow: 'Vahue', // page copy (Scale: "Scale AI")
    title: 'Blog',
    body: 'Field notes and engineering articles from the Vahue team.', // page copy
  },
  tags: vahueBlogTags,
  posts: vahueBlogPosts,
  bento,
  bentoCount: 5,
  hrefs: {
    all: '/blog/',
    categoryBase: '/blog/category/',
    trailingSlash: true,
    postBase: '/blog/',
  },
  labels: scaleBlogLabels,
}
