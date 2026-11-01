import ChatWindow from './ChatWindow'
import FlatCta from './FlatCta'
import { SectionHeader } from './StaticSections'

// "Build AI" block: centered header, then (row-reverse on lg) a 466px text column and the 649x402 chat demo.
export default function BuildAi() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <section id="build-ai" className="relative">
          <div className="relative mx-auto max-w-[1280px] lg:px-8">
            <SectionHeader
              className="relative z-10 mb-16"
              over="Build With Us"
              title="Engines For Frontier Work"
              sub="Next wave systems backed by first-class inputs."
            />
            <div className="relative z-10 flex flex-col-reverse lg:flex-row-reverse lg:gap-16" style={{ justifyContent: 'flex-start' }}>
              <div className="w-full flex-1 flex-col justify-center lg:items-start xl:flex xl:w-auto xl:min-w-[466px] xl:max-w-[466px]">
                {/* TODO: Vahue copy */}
                <p className="mb-2 font-display text-[32px] leading-[1.5] tracking-[-0.01em] text-[#010101] xl:text-[36px] xl:leading-[1.25]">
                  Generative Systems
                </p>
                <p className="text-[16px] leading-[1.5] tracking-[-0.01em] text-[#a1a1aa]">Fuelling the next wave of generative tools</p>
                <p className="my-8 text-pretty text-[16px] leading-[1.5] tracking-[-0.01em] text-[#010101]">
                  Placeholder paragraph describing how the engine supports advanced language and media systems through preference
                  feedback, data creation, model checks, safety and alignment work.
                </p>
                <div className="flex items-center gap-x-3 font-display sm:gap-x-6">
                  <FlatCta href="#" variant="fill" theme="black">
                    Book a Call
                  </FlatCta>
                  <FlatCta href="#" variant="border" theme="black">
                    Start Now
                  </FlatCta>
                </div>
              </div>
              <div className="relative mb-9 aspect-[649/402] min-w-full max-w-[calc(100%+24px)] select-none overflow-hidden rounded-[10px] bg-white lg:mb-0 lg:flex lg:w-1/2 lg:min-w-[50%] xl:h-[402px] xl:w-[649px] xl:min-w-[unset]">
                <ChatWindow />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
