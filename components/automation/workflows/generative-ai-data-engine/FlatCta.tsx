import Link from 'next/link'
import styles from './styles.module.css'

const Chevron = () => (
  <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
      fill="currentColor"
    />
  </svg>
)

// White "flat" CTA with a black arrow chip. Hover: a 35% black wash slides in from the left and the
// chevron strip slides one chip-width (0.6s ease-out). Intro parts are tagged with data-cta-* hooks.
export default function FlatCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} data-cta-root className={`${styles.cta} relative flex w-max items-center justify-center overflow-hidden rounded-lg bg-white`}>
      <span aria-hidden className={`${styles.ctaWash} pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-black opacity-35`} />
      <span className="relative z-[1] inline-flex items-center justify-center py-1 pl-4 pr-1">
        <span data-cta-counter className="relative z-[1] flex items-center justify-center gap-4">
          <span data-cta-text className="block self-center text-nowrap text-[14px] font-medium leading-[1.5] tracking-normal text-black">
            {children}
          </span>
          <span data-cta-arrow className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2 text-white">
            <span className={`${styles.ctaStrip} absolute inset-0 flex h-full w-[200%]`}>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron /></span>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron /></span>
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
