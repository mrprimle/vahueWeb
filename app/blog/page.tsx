import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Vahue',
  description:
    'Insights, guides, and field notes on AI-native engineering, LLM deployment, and enterprise AI transformation.',
  openGraph: {
    title: 'Blog | Vahue',
    description:
      'Insights, guides, and field notes on AI-native engineering, LLM deployment, and enterprise AI transformation.',
    url: 'https://vahue.ai/blog',
  },
}

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/45 mb-10">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-white/20">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/85">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

type BlogPost = {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  href: string
}

const blogPosts: BlogPost[] = [
  {
    id: 'secure-llm-deployment-enterprise',
    title: 'Deploying LLMs Securely in Enterprise Environments',
    excerpt:
      'A practical guide to integrating large language models with sensitive business data while staying compliant and secure.',
    image: '/img/blog/blog1.jpg',
    date: 'January 15, 2026',
    category: 'AI & Machine Learning',
    readTime: '12 min read',
    href: '/blog/secure-llm-deployment-enterprise',
  },
  {
    id: 'code-data-sources-for-llm-training',
    title: 'Evaluating Code Data Sources for Training Large Language Models',
    excerpt:
      'A practical comparison of the major code dataset sources — from open-source repos to dedicated coding teams — and how to choose the right one.',
    image: '/img/blog/blog2.jpg',
    date: 'January 10, 2026',
    category: 'AI & Machine Learning',
    readTime: '10 min read',
    href: '/blog/code-data-sources-for-llm-training',
  },
  {
    id: 'human-written-code-llm-training',
    title: 'The Case for Human-Written Code in LLM Training',
    excerpt:
      'Why human-authored code remains essential for building reliable coding assistants — and where synthetic data falls short.',
    image: '/img/blog/blog3.png',
    date: 'January 5, 2026',
    category: 'AI & Machine Learning',
    readTime: '9 min read',
    href: '/blog/human-written-code-llm-training',
  },
]

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <main className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
          />

          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Field notes · Vahue research</p>
            <h1 className="font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-white">
              Insights from the{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AI-Native
              </span>{' '}
              frontier
            </h1>
            <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              Engineering playbooks, enterprise AI patterns, and lessons from
              shipping production LLM systems — written by the Vahue team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-14 md:pb-20">
          <Link
            href={featured.href}
            className="group block rounded-3xl border border-border-soft bg-white/[0.02] overflow-hidden hover:border-border-mid hover:bg-white/[0.035] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-bg/40" />
              </div>

              <div className="p-8 md:p-10 lg:p-12 flex flex-col">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80">
                    Featured
                  </span>
                  <span className="text-white/30 text-sm">·</span>
                  <span className="text-white/60 text-sm">{featured.category}</span>
                </div>

                <h2 className="mt-6 font-display text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-white group-hover:text-white transition-colors text-balance">
                  {featured.title}
                </h2>

                <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 text-sm text-white/55">
                    <span>{featured.date}</span>
                    <span className="text-white/25">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-white/85 group-hover:text-white transition-colors">
                    Read article
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles grid */}
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-light text-white">
            Latest articles
          </h2>
          <p className="text-white/45 text-sm hidden md:block">
            {blogPosts.length} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group flex flex-col rounded-2xl border border-border-soft bg-white/[0.02] overflow-hidden hover:border-border-mid hover:bg-white/[0.035] transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-white/55">
                  <span className="font-mono uppercase tracking-widest text-white/70">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg md:text-xl font-light leading-snug text-white text-balance">
                  {post.title}
                </h3>

                <p className="mt-3 text-white/60 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between gap-3 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <span>{post.date}</span>
                    <span className="text-white/25">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-white/70 group-hover:text-white transition-colors">
                    Read
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
