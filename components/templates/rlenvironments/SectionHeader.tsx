// scale.com SectionHeader (module 1900), align "center", theme "light". Static: no scroll motion.
// eyebrow: mono 12 / 24, +1px, uppercase, #525252, mb-5
// h2: 30 / 1.375 -> md 40 -> lg 48 / 1.25, balance
export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mb-20 md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          {/* TODO: Vahue copy */}
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[#525252]">
            <span>{eyebrow}</span>
          </div>
          {/* TODO: Vahue copy */}
          <h2 className="text-balance text-[30px] !font-normal leading-[1.375] tracking-[-0.01em] !text-black md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  )
}
