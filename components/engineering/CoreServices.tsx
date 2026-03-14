'use client'

// Heart Handshake icon with gradient
function HeartHandshakeIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heartGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path 
        d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762" 
        stroke="url(#heartGrad1)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Laptop Minimal Check icon with gradient
function LaptopCheckIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="laptopGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="url(#laptopGrad2)" strokeWidth="1.5" fill="none" />
      <path d="M9 10l2 2 4-4" stroke="url(#laptopGrad2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 20h20" stroke="url(#laptopGrad2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Graduation Cap icon with gradient
function GraduationCapIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path 
        d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" 
        stroke="url(#gradGrad3)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M22 10v6" stroke="url(#gradGrad3)" strokeWidth="1.5" strokeLinecap="round" />
      <path 
        d="M6 12.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" 
        stroke="url(#gradGrad3)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  )
}

const services = [
  {
    id: 'dedicated-teams',
    Icon: HeartHandshakeIcon,
    label: 'Ideal for strategic goals',
    title: 'Dedicated Development Teams',
    description: 'We build sustainable nearshore teams of software engineers and other tech experts to increase your capacity. You manage your dedicated developers directly, while Vahue takes care of infrastructure and supports you in maintaining a tight-knit, cohesive, and effective team.',
    cta: 'Build your dream team',
    href: 'https://calendly.com/mike_at_pletava/vahue-ai-discovery',
  },
  {
    id: 'project-based',
    Icon: LaptopCheckIcon,
    label: 'Ideal for short-to-midterm goals',
    title: 'Project-Based Solutions',
    description: 'We provide you with extra capacity to solve a specific task or fix an unexpected problem. Tap into our cross-domain expertise and fast team sourcing to clear your backlog, accelerate time-to-market for your custom software solution, or test out the waters before committing to long-term team extension.',
    cta: 'Submit your project',
    href: 'https://calendly.com/mike_at_pletava/vahue-ai-discovery',
  },
  {
    id: 'workshops',
    Icon: GraduationCapIcon,
    label: 'Ideal for agile teams',
    title: 'Tech Upskilling Workshops',
    description: 'Backed by a network of 400+ industry pros, our custom 1–2 day workshops support both technical and non-technical teams. Covering topics from cybersecurity and genAI to green coding and web accessibility, these hands-on sessions build confidence and equip your employees to tackle challenges in the digital economy.',
    cta: 'Upskill your team',
    href: 'https://calendly.com/mike_at_pletava/vahue-ai-discovery',
  },
]

export default function CoreServices() {
  return (
    <section className="bg-[#141414]">
      <div className="py-16 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 md:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Core services for sustainable software development
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed lg:pt-2">
              Whether you need to extend your tech team, bring in niche expertise to develop a project milestone, or upskill your employees in the latest tech — we&apos;re here to help.
            </p>
          </div>

          {/* Service Cards - equal height grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative pt-16 h-full"
              >
                {/* Icon Circle - positioned above card with negative margin */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-32 h-32 rounded-full bg-[#334155] border border-[#475569] flex items-center justify-center shadow-xl">
                    <service.Icon />
                  </div>
                </div>

                {/* Card - matching problem cards passive state */}
                <div className="bg-[#1e2530] rounded-3xl px-6 md:px-8 py-10 pt-24 flex flex-col border border-[#2a3340] h-full">
                  {/* Top group: Label + Title */}
                  <div className="mb-8">
                    {/* Label - pill badge style */}
                    <div className="flex justify-center mb-5">
                      <span className="px-4 py-1.5 bg-[#2a3340] text-white text-xs font-medium rounded-full border border-[#3a4451]">
                        {service.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-center text-xl md:text-2xl font-bold text-white leading-tight px-4 md:px-8">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description - flex-grow to push CTA to bottom */}
                  <p className="text-white/75 text-sm leading-relaxed mb-10 flex-grow">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 bg-[#2a3340] hover:bg-[#334155] text-white text-center rounded-full font-medium transition-all border border-[#3a4451] hover:border-[#475569]"
                  >
                    {service.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
