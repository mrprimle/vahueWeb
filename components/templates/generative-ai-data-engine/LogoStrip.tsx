import Link from 'next/link'
import styles from './styles.module.css'

// Customer logos are not shipped: same-size neutral tiles stand in (TODO: Vahue logos).
const LOGOS = [
  { w: 100, h: 20 },
  { w: 108, h: 18 },
  { w: 77, h: 28 },
]

const Tile = ({ w, h }: { w: number; h: number }) => (
  <span aria-hidden className="block rounded-[3px] bg-black/15" style={{ width: w, height: h }} />
)

export default function LogoStrip() {
  return (
    <section className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        {/* TODO: Vahue copy */}
        <p className="mx-auto mb-12 w-full max-w-[698px] text-balance px-4 text-center text-[16px] leading-[1.65] tracking-[-0.01em] text-[#374151]">
          <span className="mr-2">Teams building serious AI products rely on us.</span>
          <span className="inline">
            <Link href="/" className="group inline-flex items-center gap-1 text-[#008EFF] transition-colors duration-300">
              <span className="font-medium">See who we work with</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </Link>
          </span>
        </p>

        <div className="hidden md:block">
          <ul className="mx-auto flex min-h-[52px] max-w-[1280px] items-center justify-around gap-8 px-8 md:gap-y-16">
            {LOGOS.map((l, i) => (
              <li key={i} className="flex flex-col items-center justify-center gap-3">
                <Tile {...l} />
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden md:hidden">
          <ul className={styles.marquee}>
            {[0, 1].map((copy) =>
              LOGOS.map((l, i) => (
                <li key={`${copy}-${i}`} aria-hidden={copy === 1} className="ml-12 flex min-h-[28px] flex-col items-center justify-center gap-3">
                  <Tile {...l} />
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
