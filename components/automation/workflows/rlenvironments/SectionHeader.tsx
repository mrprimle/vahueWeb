import type { ReactNode } from 'react'

// scale.com SectionHeader (module 1900), align "center", on Vahue dark. Static: no scroll motion.
// eyebrow: mono 12 / 24, +1px, uppercase, mb-5
// h2: 30 / 1.375 -> md 40 -> lg 48 / 1.25, balance
// lead (Vahue addition, same style as the other workflow pages): 16 -> 20, lh 1.6, white/70
export function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mb-20 md:mt-12">
      <div className="flex flex-col">
        <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-white/55">
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-balance text-[30px] !font-normal leading-[1.375] tracking-[-0.01em] text-white md:text-[40px] lg:text-[48px] lg:leading-[1.25]">
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-white/70 lg:mt-2 lg:text-[20px]">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
