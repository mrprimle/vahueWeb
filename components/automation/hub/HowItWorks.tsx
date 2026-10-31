import { WORKFLOWS } from '@/lib/automation-content'
import AgentWindow from './AgentWindow'
import FlatCta from './FlatCta'
import { SectionHeader } from './StaticSections'

// Clone "Build AI" block: centered header, then (row-reverse on lg) a 466px text column and the 649x402 agent demo.
const intake = WORKFLOWS.find((w) => w.slug === 'document-intake')!

export default function HowItWorks() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <section id="how-it-works" className="relative">
          <div className="relative mx-auto max-w-[1280px] lg:px-8">
            <SectionHeader
              className="relative z-10 mb-16"
              over="How it works"
              title="An agent does the work. A person checks what it is unsure of."
              sub="Each agent reads the item, checks it against your rules and writes the result to your systems. Anything below the confidence threshold waits for your team."
            />
            <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse lg:gap-16" style={{ justifyContent: 'flex-start' }}>
              <div className="w-full flex-1 flex-col justify-center lg:items-start xl:flex xl:w-auto xl:min-w-[466px] xl:max-w-[466px]">
                <p className="mb-2 font-display text-[32px] leading-[1.5] tracking-[-0.01em] text-white xl:text-[36px] xl:leading-[1.25]">
                  {intake.label}
                </p>
                <p className="text-[16px] leading-[1.5] tracking-[-0.01em] text-white/55">{intake.headline}</p>
                <p className="my-8 text-pretty text-[16px] leading-[1.5] tracking-[-0.01em] text-white/85">{intake.summary}</p>
                <div className="flex items-center gap-x-3 font-display sm:gap-x-6">
                  <FlatCta href={`/automations/${intake.slug}/`} variant="fill" theme="white">
                    See the workflow
                  </FlatCta>
                  <FlatCta href="/contact/" variant="border" theme="white">
                    Book an audit
                  </FlatCta>
                </div>
              </div>
              <div className="relative mb-9 aspect-[649/402] min-w-full max-w-[calc(100%+24px)] select-none overflow-hidden rounded-[10px] border border-border-mid bg-[#0b0b0c] lg:mb-0 lg:flex lg:w-1/2 lg:min-w-[50%] xl:h-[402px] xl:w-[649px] xl:min-w-[unset]">
                <AgentWindow />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
