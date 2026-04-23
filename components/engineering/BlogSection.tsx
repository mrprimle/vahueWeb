'use client'

import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 'secure-llm-deployment-enterprise',
    title: 'Deploying LLMs Securely in Enterprise Environments',
    excerpt:
      'A practical guide to integrating large language models with sensitive business data while staying compliant and secure.',
    image: '/img/blog/blog1.jpg',
    date: 'January 15, 2026',
    category: 'AI & Machine Learning',
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
    href: '/blog/human-written-code-llm-training',
  },
]

export default function BlogSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="w-full max-w-wide mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Blog</p>
            <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Perspectives that matter.
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn-outline text-xs uppercase tracking-widest font-mono self-start md:self-end"
          >
            View all
            <svg
              className="ml-2 w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group rounded-3xl border border-border-soft bg-surface overflow-hidden transition-colors hover:border-border-mid flex flex-col"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3 font-mono text-[11px] uppercase tracking-widest text-white/50">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white leading-snug group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
