import type { ReactNode } from 'react'
import { challenge, howItWorks, solution } from './content'
import { Glyph, TrafficLights } from './icons'
import { AuditMockup, PhaseTimeline } from './Mockups'

// /strategy (Workflow audit): the evaluation-enterprise clone's sections 1:1
// (components/templates/evaluation-enterprise/Sections.tsx), Scale's colours and type; Vahue copy from ./content.
// Where Scale shows its product screenshots (dark chart panel, dark browser mockups) the same frames hold own SVG
// mock UIs (./Mockups). Headings are h2/h3 as on Scale; the challenge item titles are h3 instead of h4.

// All three body sections are static on scale.com (no GSAP, no listeners: REA
// inspect_web_event_listeners on `figure`, `article .rounded-2xl` returned none).
// Section shell: py-16 (64) at every width, container max-w-[1472px] px-6.

// SectionHeader, align "center", with description (chunk 0a0zz4e1l5m3e.js page slices):
// wrapper mb-10 (forced) md:mt-12, max-w-3xl centred; eyebrow mono 12/24 +1px uppercase #525252 mb-5;
// h2 30/1.375 -> md 40 -> lg 48/1.25, balance; p mt-4 lg:mt-2, 16 -> lg 20 / 1.6, black/70, balance.
function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[#525252]">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance text-[30px] !font-normal leading-[1.375] tracking-[-0.01em] !text-black md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-black/70 lg:mt-2 lg:text-[20px]">
          {body}
        </p>
      </div>
    </div>
  )
}

function Shell({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 bg-transparent py-16">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

// FeaturesWithIcons (module 460138), light theme, default columns:
// !flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14; item grow, basis-full md:max-w-[368px] lg:basis-1/4;
// figure 44×44 r8, bg black/9, 1px black/10, glyph 22 in a 24 span; h4 24/1.5 mt-6; p 16/1.5 #525252 mt-4.
export function Challenge() {
  return (
    <Shell>
      <SectionHeader eyebrow={challenge.eyebrow} title={challenge.title} body={challenge.body} />
      <div className="flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {challenge.items.map((item) => (
          <div key={item.title} className="shrink-0 grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
                <span className="flex h-6 w-6 items-center justify-center">
                  <Glyph name={item.icon} size={22} />
                </span>
              </figure>
            </div>
            <div>
              <h3 className="relative mt-6 whitespace-pre-line text-[24px] !font-normal leading-[1.5] tracking-[-0.01em] !text-black">
                {item.title}
              </h3>
              <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

// ChecklistWithMedia (module 872447), mediaPosition "left", plain image, no dividers:
// row flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px] mx-auto;
// media md:w-7/12 p-2 (img 1920×1160, w-full h-auto); list md:w-5/12 flex-col gap-6;
// tick 22×22 round, black/9 + 1px black/10, MdCheck 12 black/70; title 16/1.5 500; body 14/1.5 black/70; gap-2 / gap-4.
export function Solution() {
  return (
    <Shell>
      <SectionHeader eyebrow={solution.eyebrow} title={solution.title} body={solution.body} />
      <div className="mx-auto mt-12 flex max-w-[1216px] flex-col items-center gap-[54px] md:flex-row">
        <div className="flex w-full justify-center p-2 md:w-7/12">
          {/* Scale: a dark 1920x1160 chart panel; here an own dark SVG of the three phases in the same ratio. */}
          <div className="w-full overflow-hidden rounded-xl">
            <PhaseTimeline />
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 md:w-5/12">
          {solution.items.map((item) => (
            <div key={item.title}>
              <div className="flex flex-row items-start gap-4">
                <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.09]">
                  <Glyph name="check" size={12} className="h-3 w-3 text-black/70" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] font-medium leading-[1.5] tracking-[-0.01em] text-black">{item.title}</p>
                  <p className="text-[14px] leading-[1.5] tracking-[-0.01em] text-black/70">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

// Side-by-side list (module 497052) with BrowserMockup frames (module 720912):
// space-y-14 md:space-y-24; article grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16;
// text max-w-[440px] space-y-5: h3 24 -> md 30 / 1.25, 600; p 16/1.625 black/70.
// Mockup: r16, 1px white/10, bg #0b0b0b; bar px-3 py-2 gap-2, border-b white/10, dots svg w-10, url 12/1.5 white/40; img r12.
export function HowItWorks() {
  return (
    <Shell id={howItWorks.id}>
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.title} body={howItWorks.body} />
      <div className="space-y-14 md:space-y-24">
        {howItWorks.items.map((item) => {
          const text = (
            <div className="max-w-[440px] space-y-5">
              <h3 className="text-[24px] !font-semibold leading-[1.25] tracking-[-0.01em] !text-black md:text-[30px]">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.625] tracking-[-0.01em] text-black/70">{item.body}</p>
            </div>
          )
          const media = (
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <TrafficLights />
                <span className="text-[12px] leading-[1.5] text-white/40">{item.bar}</span>
              </div>
              <AuditMockup kind={item.mockup} />
            </div>
          )
          const right = item.textSide === 'right'
          return (
            <article key={item.title} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              {right ? media : text}
              {right ? text : media}
            </article>
          )
        })}
      </div>
    </Shell>
  )
}
