import Link from 'next/link'

export default function DiscoverCTA() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-dark py-12 md:py-16 px-8 md:px-12 lg:px-16">
          {/* Dot texture */}
          <div className="absolute inset-0 hero-texture opacity-40" />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 20% 50%, rgba(59, 94, 255, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Title */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight italic">
              Discover how AI can work for you
            </h2>

            {/* Right: CTA links */}
            <div className="flex flex-col gap-0">
              <Link
                href="/teams"
                className="group flex items-center justify-between py-4 border-b border-white/15 transition-colors hover:border-white/30"
              >
                <span className="text-sm font-mono uppercase tracking-widest text-white">
                  Team Training
                </span>
                <svg
                  className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 7l-10 10M17 7H7m10 0v10"
                  />
                </svg>
              </Link>
              <Link
                href="/automations"
                className="group flex items-center justify-between py-4 border-b border-white/15 transition-colors hover:border-white/30"
              >
                <span className="text-sm font-mono uppercase tracking-widest text-white">
                  Custom AI Automations
                </span>
                <svg
                  className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 7l-10 10M17 7H7m10 0v10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
