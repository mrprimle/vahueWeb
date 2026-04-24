import WaitlistButton from './WaitlistButton'

const pillars = [
  {
    label: 'Vahue Pilot',
    description: 'Solve product challenges with our AI CPO',
  },
  {
    label: 'Training',
    description: 'Watch events with experts and explore guides',
  },
  {
    label: 'Community',
    description: 'Get support in a like-minded chat',
  },
]

export default function IncubatorHero() {
  return (
    <section className="relative flex flex-col bg-bg overflow-hidden">
      <div className="absolute inset-0 hero-texture opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <div className="relative z-10">
        <div className="w-full max-w-wide mx-auto px-6 md:px-8 pt-10 md:pt-24 pb-20 md:pb-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Founders Community · AI Incubator</p>

            <h1 className="font-display text-[2.7rem] font-light leading-[1.05] md:leading-tight lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-white">
              Create products{' '}
              <span
                style={{
                  background:
                    'linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                10 times faster
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-6 mb-8 max-w-2xl">
              in a community of like-minded people with a constant stream
              of cool content about neural networks and tools for product
              tasks.
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              {pillars.map((p) => (
                <p key={p.label} className="text-white/85 text-sm md:text-base">
                  <span className="font-semibold text-white">{p.label}</span>
                  <span className="text-white/55"> — </span>
                  <span className="text-white/75">{p.description}</span>
                </p>
              ))}
            </div>

            <p className="eyebrow mb-7 text-white/70">
            Everything to avoid being left alone in the AI transition
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <WaitlistButton context="Hero CTA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
