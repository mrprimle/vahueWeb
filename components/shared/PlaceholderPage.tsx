import Link from 'next/link'

type PlaceholderPageProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <main className="min-h-[80vh]">
      <section className="w-full max-w-wide mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          {eyebrow ? <div className="eyebrow mb-4">{eyebrow}</div> : null}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              {description}
            </p>
          ) : null}
          <p className="mt-10 text-sm text-white/50">
            This page is coming soon.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              ← Back home
            </Link>
            <Link
              href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full bg-white text-bg hover:bg-white/90 transition-colors"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
