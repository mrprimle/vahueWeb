'use client'

import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 'secure-llm-deployment-enterprise',
    title: 'Deploying LLMs Securely in Enterprise Environments',
    excerpt: 'A practical guide to integrating large language models with sensitive business data while staying compliant and secure.',
    image: '/img/blog/blog1.jpg',
    date: 'January 15, 2026',
    category: 'AI & Machine Learning',
    href: '/blog/secure-llm-deployment-enterprise',
  },
  {
    id: 'code-data-sources-for-llm-training',
    title: 'Evaluating Code Data Sources for Training Large Language Models',
    excerpt: 'A practical comparison of the major code dataset sources — from open-source repos to dedicated coding teams — and how to choose the right one.',
    image: '/img/blog/blog2.jpg',
    date: 'January 10, 2026',
    category: 'AI & Machine Learning',
    href: '/blog/code-data-sources-for-llm-training',
  },
  {
    id: 'human-written-code-llm-training',
    title: 'The Case for Human-Written Code in LLM Training',
    excerpt: 'Why human-authored code remains essential for building reliable coding assistants — and where synthetic data falls short.',
    image: '/img/blog/blog3.png',
    date: 'January 5, 2026',
    category: 'AI & Machine Learning',
    href: '/blog/human-written-code-llm-training',
  },
]

export default function BlogSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-1.5">
            BLOG
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-[#86868b] text-sm md:text-base">
              Lessons we learned the hard way. So you don&apos;t have to.
            </p>
            <Link
              href="/blog"
              className="group hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3B82F6] transition-colors"
            >
              View More
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group block"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium text-[#3b82f6]">
                  {post.category}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {post.date}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-[#1d1d1f] leading-snug group-hover:text-[#3b82f6] transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Mobile: View More Link */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3B82F6] transition-colors"
          >
            View More
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
