const beliefs = [
  {
    text: "We believe AI isn't here to replace humans — it's a partner that gives you access to the skills of an entire team at almost no cost",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs><linearGradient id="philGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5EEAD4" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient></defs>
        <path stroke="url(#philGrad1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    text: 'For businesses, AI unlocks automation and drives higher margins',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs><linearGradient id="philGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5EEAD4" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient></defs>
        <path stroke="url(#philGrad2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    text: 'Today, you can create products in hours instead of weeks or months',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <defs><linearGradient id="philGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5EEAD4" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient></defs>
        <path stroke="url(#philGrad3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
]

export default function Philosophy() {
  return (
    <section id="approach" className="bg-[#141414] scroll-mt-20">
      {/* White section with rounded top (from dark CaseStudies above) */}
      <div className="section-light-top py-16 md:py-24 lg:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-12 md:mb-16">
            The vahue.ai <span className="gradient-text-animated">philosophy</span>
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Left: Mission block — dark glassmorphism */}
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px] bg-[#141414] flex flex-col justify-between p-8 md:p-10">
              {/* Dot texture background */}
              <div className="absolute inset-0 hero-texture opacity-30" />

              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 80%, rgba(59, 94, 255, 0.15) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10">
                <p className="text-white/60 text-sm mb-2">Our Mission</p>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight gradient-text-animated-teal" style={{ lineHeight: '1.3' }}>
                  To help people and companies become AI‑native
                </h3>
              </div>
            </div>

            {/* Right: Belief cards — neumorphism */}
            <div className="flex flex-col gap-4">
              {beliefs.map((belief, index) => (
                <div key={index} className="card-neu flex-1">
                  <div className="card-neu-inner flex flex-col justify-between">
                    <div className="mb-4">{belief.icon}</div>
                    <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
                      {belief.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
