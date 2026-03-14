import Image from 'next/image'
import Link from 'next/link'
import ContactCards from '@/components/ContactCards'

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#3b82f6] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1d1d1f]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

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

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]} />
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-4">Blog</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Insights, guides, and thought leadership on AI, software development, and technology trends.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={post.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3]">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-[#3b82f6]">{post.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#1d1d1f] mb-3 leading-snug group-hover:text-[#3b82f6] transition-colors">{post.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <ContactCards />
    </>
  )
}
