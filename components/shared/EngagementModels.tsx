import Image from 'next/image'

export default function EngagementModels() {
  return (
    <section id="engagement" className="bg-white py-16 md:py-24 lg:py-28">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-dark leading-tight mb-4">
            One Scalable Approach — Multiple Ways to Grow
          </h2>
          <p className="text-[#86868b] text-base md:text-lg">
            Extend your tech team. Bring in niche expertise for a critical project. Upskill your employees in the latest AI tools and emerging technologies. With Vahue as your tech partner, you don&apos;t have to choose — our holistic method delivers it all, tailored to your organization.
          </p>
        </div>

        {/* Broken grid - outer wrapper */}
        <div className="bg-bg-gray/50 backdrop-blur-sm border border-dark/[0.04] rounded-2xl md:rounded-3xl p-3 md:p-4">
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-5 overflow-visible">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* Consulting - top left */}
              <div className="card-neu flex-1">
                <div className="card-neu-inner h-full">
                  <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                    Consulting
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed">
                    From concept to launch, our advisory capability plugs in wherever you need it most. Count on a team that takes real ownership by challenging assumptions, engaging niche domain experts, and bringing clarity to ensure the outcomes are both reality-ready and future-proof.
                  </p>
                </div>
              </div>

              {/* Project-Based Development - bottom left */}
              <div className="card-neu flex-1">
                <div className="card-neu-inner h-full">
                  <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                    Project-Based Development
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed">
                    Get extra capacity to solve a task, fix a blocker, or test an idea. Tap into our cross-domain expertise and fast team sourcing to clear your backlog, accelerate time-to-market for your custom software solution, or test out the waters before committing to long-term team extension.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* Top right row: 2 equal grid cells, quote card shifted left via negative margin */}
              <div className="grid grid-cols-2 gap-5 flex-1">
                {/* Quote card - equal grid cell, shifted left and up to break grid */}
                <div className="z-10" style={{ transform: 'translateX(-60px) translateY(-3.5rem)' }}>
                  <div className="bg-[#141414] rounded-2xl p-6 flex flex-col h-full shadow-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <Image
                        src="/img/delivery-modes-portrait.png"
                        alt="Delivery Manager"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-white">Nata Mylostna</p>
                        <p className="text-xs text-white">Delivery Manager</p>
                      </div>
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      We don&apos;t just deliver code, we guide your project toward real impact. That might mean adding niche expertise, developing key milestones, or growing your team&apos;s skills. Whatever helps your tech run smoothly and stay resilient over time.
                    </p>
                  </div>
                </div>

                {/* Tech Training - equal grid cell */}
                <div className="card-neu">
                  <div className="card-neu-inner h-full">
                    <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                      Tech Training
                    </h3>
                    <p className="text-[#86868b] text-sm leading-relaxed">
                      Role-specific, hands-on AI training for your entire organization. From C-suite strategy workshops to developer tool mastery. We build confidence and equip your employees to tackle challenges in the digital economy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Extensions - bottom right, full width */}
              <div className="card-neu flex-1">
                <div className="card-neu-inner h-full">
                  <h3 className="text-lg md:text-xl font-bold text-dark mb-2">
                    Team Extensions
                  </h3>
                  <p className="text-[#86868b] text-sm leading-relaxed">
                    We build sustainable nearshore teams of software engineers and other tech experts to increase your capacity. You manage your dedicated developers directly, while Vahue takes care of infrastructure and supports you in maintaining a tight-knit, cohesive, and effective team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout - stacked */}
          <div className="md:hidden flex flex-col gap-3">
            <div className="card-neu">
              <div className="card-neu-inner">
                <h3 className="text-lg font-bold text-dark mb-2">Consulting</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  From concept to launch, our advisory capability plugs in wherever you need it most. Count on a team that takes real ownership by challenging assumptions, engaging niche domain experts, and bringing clarity.
                </p>
              </div>
            </div>

            <div className="bg-[#141414] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/img/delivery-modes-portrait.png" alt="Delivery Manager" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-white">Nata Mylostna</p>
                  <p className="text-xs text-white">Delivery Manager</p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed">
                We don&apos;t just deliver code, we guide your project toward real impact. Whatever helps your tech run smoothly and stay resilient over time.
              </p>
            </div>

            <div className="card-neu">
              <div className="card-neu-inner">
                <h3 className="text-lg font-bold text-dark mb-2">Tech Training</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  Role-specific, hands-on AI training for your entire organization. From C-suite strategy workshops to developer tool mastery.
                </p>
              </div>
            </div>

            <div className="card-neu">
              <div className="card-neu-inner">
                <h3 className="text-lg font-bold text-dark mb-2">Project-Based Development</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  Get extra capacity to solve a task, fix a blocker, or test an idea. Tap into our cross-domain expertise and fast team sourcing.
                </p>
              </div>
            </div>

            <div className="card-neu">
              <div className="card-neu-inner">
                <h3 className="text-lg font-bold text-dark mb-2">Team Extensions</h3>
                <p className="text-[#86868b] text-sm leading-relaxed">
                  We build sustainable nearshore teams of software engineers and other tech experts to increase your capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
