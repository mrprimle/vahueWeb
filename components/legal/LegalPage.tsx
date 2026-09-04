import Link from 'next/link'
import type { ReactNode } from 'react'

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <main className="bg-bg">
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="absolute inset-0 hero-texture opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-wide px-6 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32">
          <nav className="mb-10 flex items-center gap-2 text-sm text-white/45">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/85">{title}</span>
          </nav>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="max-w-4xl text-balance font-display text-4xl font-medium leading-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/65">{intro}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-white/35">
            Last updated 4 September 2026
          </p>
        </div>
      </section>

      <article className="mx-auto w-full max-w-4xl px-6 py-14 md:px-8 md:py-20 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white [&_h2]:md:text-3xl [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_li]:leading-relaxed [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-white/65 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-white/65">
        {children}
      </article>
    </main>
  )
}
