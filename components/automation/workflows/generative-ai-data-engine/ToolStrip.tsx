import Link from 'next/link'
import styles from './styles.module.css'

// Template LogoStrip. Vahue ships no customer logos, so the row lists the systems this workflow runs
// inside as plain wordmarks (static row on desktop, marquee on phones).
const Name = ({ name }: { name: string }) => (
  <span className="block whitespace-nowrap font-display text-[20px] font-normal leading-[1.4] tracking-[-0.01em] text-white/55">{name}</span>
)

export default function ToolStrip({ tools }: { tools: string[] }) {
  return (
    <section className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">
        <p className="mx-auto mb-12 w-full max-w-[698px] text-balance px-4 text-center text-[16px] leading-[1.65] tracking-[-0.01em] text-white/70">
          <span className="mr-2">Runs inside the systems your team already uses.</span>
          <span className="inline">
            <Link href="/case-studies/" className="group inline-flex items-center gap-1 text-white transition-colors duration-300 hover:text-white/70">
              <span className="font-medium">See verified results</span>
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </Link>
          </span>
        </p>

        <div className="hidden md:block">
          <ul aria-label="Integrations" className="mx-auto flex min-h-[52px] max-w-[1280px] items-center justify-around gap-8 px-8 md:gap-y-16">
            {tools.map((t) => (
              <li key={t} className="flex flex-col items-center justify-center gap-3">
                <Name name={t} />
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden md:hidden">
          <ul aria-label="Integrations" className={styles.marquee}>
            {[0, 1].map((copy) =>
              tools.map((t) => (
                <li key={`${copy}-${t}`} aria-hidden={copy === 1} className="ml-12 flex min-h-[28px] flex-col items-center justify-center gap-3">
                  <Name name={t} />
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
