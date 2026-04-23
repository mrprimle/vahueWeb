import type { Metadata } from 'next'
import Link from 'next/link'
import GuidesIndex from '@/components/guides/GuidesIndex'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guides | Vahue',
  description:
    'Practical, hands-on guides for AI-native engineering — Claude Code, Cursor, MCP, deploy, and more.',
  openGraph: {
    title: 'Guides | Vahue',
    description:
      'Practical, hands-on guides for AI-native engineering — Claude Code, Cursor, MCP, deploy, and more.',
    url: 'https://vahue.ai/guides',
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

export default function GuidesPage() {
  return (
    <main className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

        <div className="relative z-10 w-full max-w-wide mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Guides' },
            ]}
          />

          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Knowledge library</p>
            <h1 className="font-display text-[2.7rem] font-light leading-[0.95] md:leading-[0.95] lg:text-6xl xl:text-7xl -tracking-[0.02em] max-w-2xl xl:max-w-4xl text-balance">
              <span className="block text-white">Guides</span>
              <span className="block text-white/30">Vahue</span>
            </h1>
            <p className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              Practical guides on Vahue AI CPO, product analytics, and research.
              Every guide is a proven method for moving the product forward.
            </p>
          </div>
        </div>
      </section>

      <GuidesIndex guides={guides} />
    </main>
  )
}
