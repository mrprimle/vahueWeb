import type { Metadata } from 'next'
import Link from 'next/link'

// Placeholder: linked from the homepage hero and the Enterprise AI hero. Content to follow.
export const metadata: Metadata = {
  title: 'How we work | Vahue',
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <section className="bg-bg">
      <div className="mx-auto flex min-h-[70dvh] max-w-shell flex-col justify-center px-6 py-24 max-md:py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/55">In progress</p>
        <h1 className="mt-6 max-w-4xl font-display text-section font-light text-balance text-white">
          This page is being written.
        </h1>
        <Link href="/" className="mt-10 w-fit text-sm text-white/70 transition-colors duration-300 ease-out hover:text-white">
          ← Back to home
        </Link>
      </div>
    </section>
  )
}
