import { ASSET, capabilities, overview } from './content'
import { SectionHeader } from './SectionHeader'
import styles from './styles.module.css'

// Overview: bg scale-gray-95 (#f2f2f2) py-16 md:py-24, 1472 container, 3-col grid gap 24.
// Card: white, r16, 1px #eaeaea; image aspect 4/3 (bg #eaeaea, cover); p-6; h3 header5 mb-3; p body3 14 / 1.625 #575757.
export function Overview() {
  return (
    <section className="bg-[#f2f2f2] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader eyebrow={overview.eyebrow} title={overview.title} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {overview.cards.map((card) => (
            <div key={card.title} className="flex flex-col overflow-hidden rounded-2xl border border-[#eaeaea] bg-white">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eaeaea]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ASSET}/${card.image}`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {/* TODO: Vahue copy */}
                <h3 className={`${styles.header5} mb-3 !font-normal tracking-[-0.01em] !text-black`}>{card.title}</h3>
                {/* TODO: Vahue copy */}
                <p className="text-[14px] leading-[1.625] tracking-[-0.01em] text-[#575757]">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Capabilities (side-by-side, module 497052): py-16 md:py-24; items space-y-14 md:space-y-24;
// article grid gap-8 lg:2 cols centred gap-16; text max-w-440 space-y-5, h3 24/1.25 -> md 30, 600;
// p 16 / 1.625 black/70; image frame r16, 1px black/10, white, p-2, shadow 0 18 60 rgba(0,0,0,.08), img r12.
export function Capabilities() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader eyebrow={capabilities.eyebrow} title={capabilities.title} />
        <div className="space-y-14 md:space-y-24">
          {capabilities.items.map((item) => {
            const text = (
              <div className="max-w-[440px] space-y-5">
                {/* TODO: Vahue copy */}
                <h3 className="text-[24px] !font-semibold leading-[1.25] tracking-[-0.01em] !text-black md:text-[30px]">
                  {item.title}
                </h3>
                {/* TODO: Vahue copy */}
                <p className="text-[16px] leading-[1.625] tracking-[-0.01em] text-black/70">{item.body}</p>
              </div>
            )
            const media = (
              <div className="w-full overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${ASSET}/${item.image}`}
                  alt=""
                  loading="lazy"
                  width={598}
                  height={371}
                  className="h-auto w-full rounded-xl object-cover"
                />
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
      </div>
    </section>
  )
}
