import type { Metadata } from 'next'
import Link from 'next/link'
import MarketplaceIndex from '@/components/marketplace/MarketplaceIndex'
import { marketplaceItems } from '@/lib/marketplace'

export const metadata: Metadata = {
  title: 'Marketplace | Vahue',
  description:
    'Rules, skills, plugins, MCP servers, tools, and prompts — shared by the Vahue community for teams shipping AI-native software.',
  openGraph: {
    title: 'Marketplace | Vahue',
    description:
      'Rules, skills, plugins, MCP servers, tools, and prompts — shared by the Vahue community for teams shipping AI-native software.',
    url: 'https://vahue.ai/marketplace',
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

export default function MarketplacePage() {
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
              { label: 'Marketplace' },
            ]}
          />

          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Community library</p>
            <h1 className="font-display text-[2.7rem] font-light leading-[0.95] md:leading-[0.95] lg:text-6xl xl:text-7xl -tracking-[0.02em] max-w-2xl xl:max-w-4xl text-balance">
              <span className="block text-white">Marketplace</span>
              <span className="block text-white/30">Vahue</span>
            </h1>
            <p className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              Rules, skills, plugins, and prompts shared by the Vahue community.
              Every item is something we — or a builder in our network — use in
              production.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-wide mx-auto px-6 md:px-8 pb-6">
        <div className="hairline" />
      </div>

      <MarketplaceIndex items={marketplaceItems} />
    </main>
  )
}
