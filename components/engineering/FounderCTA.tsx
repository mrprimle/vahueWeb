import Image from 'next/image'

export default function FounderCTA() {
  return (
    <section className="bg-white">
      <div className="bg-[#141414] rounded-t-[2.5rem] md:rounded-t-[3rem]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col">
            {/* Title and Button */}
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-black text-[#E8F751] uppercase tracking-tight leading-tight mb-6">
                Talk to our<br />Founder
              </h2>
              
              <a
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 gradient-border-animated text-white font-medium text-sm uppercase tracking-wider px-5 py-3 rounded-full hover:bg-[#7c3aed]/20 transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              >
                It&apos;s Really Time To Press Me
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            </div>

            {/* Image with gradient overlay */}
            <div className="relative">
              {/* Decorative rectangles - more transparent */}
              <div className="absolute -top-4 left-1/4 w-32 h-20 bg-[#1e2530]/50 rounded-2xl -z-0" />
              <div className="absolute top-1/3 -left-4 w-24 h-16 bg-[#1e2530]/50 rounded-xl -z-0" />
              
              <div className="relative">
                <Image
                  src="/img/mikecut.avif"
                  alt="Mike - Founder of Vahue"
                  width={500}
                  height={600}
                  className="relative z-10 w-full max-w-md mx-auto h-auto object-contain"
                />
                {/* Bottom gradient overlay on image - only bottom half */}
                <div 
                  className="absolute inset-0 z-20" 
                  style={{
                    background: 'linear-gradient(to top, #141414 0%, #141414 10%, transparent 50%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* Founder Info - overlapping the image but lower */}
            <div className="relative z-30 -mt-16 px-4 pt-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-2">
                Mike Doroshenko
              </h3>
              <p className="text-white/60 text-lg">
                Founder, Vahue
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left: Image with gradient overlay */}
            <div className="relative">
              {/* Decorative rectangles - more transparent */}
              <div className="absolute -top-8 left-1/4 w-40 h-24 bg-[#1e2530]/50 rounded-2xl -z-0" />
              <div className="absolute top-1/4 -left-8 w-32 h-20 bg-[#1e2530]/50 rounded-xl -z-0" />
              
              <div className="relative">
                <Image
                  src="/img/mikecut.avif"
                  alt="Mike - Founder of Vahue"
                  width={500}
                  height={600}
                  className="relative z-10 w-full max-w-lg h-auto object-contain"
                />
                {/* Bottom gradient overlay on image - only bottom half */}
                <div 
                  className="absolute inset-0 z-20" 
                  style={{
                    background: 'linear-gradient(to top, #141414 0%, #141414 10%, transparent 50%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col -mt-8">
              {/* Title - pushed up */}
              <h2 className="text-5xl xl:text-6xl font-black text-[#E8F751] uppercase tracking-tight leading-tight mb-5">
                Talk to our<br />Founder
              </h2>
              
              {/* Button - glassy dark purple with glow, white text */}
              <a
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 gradient-border-animated text-white font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#7c3aed]/20 transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] mb-32 w-fit"
              >
                It&apos;s Really Time To Press Me
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>

              {/* Decorative card behind name - more transparent, pushed down */}
              <div className="relative mt-auto">
                <div className="absolute -top-4 -left-4 w-40 h-24 bg-[#1e2530]/50 rounded-2xl -z-0" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl xl:text-3xl font-bold text-white uppercase tracking-wide mb-2">
                    Mike Doroshenko
                  </h3>
                  <p className="text-white/60 text-lg">
                    Founder, Vahue
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
