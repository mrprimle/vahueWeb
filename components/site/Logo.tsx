import { cn } from './lib/cn'

/** The "vahue" wordmark, sitting in Scale's logo box (80 wide, 18 tall, 20 from xl). */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn('flex h-[18px] w-[80px] shrink-0 items-center text-[24px] leading-none tracking-[-0.02em] xl:h-5 xl:text-[27px]', className)}
      style={{ fontFamily: 'var(--font-aeonik), -apple-system, Arial, sans-serif' }}
    >
      vahue
    </span>
  )
}

/** Square mark for the small slots where Scale shows its own mark (footer, announcement bar). */
export function LogoMark({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={cn('flex items-center justify-center rounded-[22%] bg-current', className)}
      style={{ width: size, height: size }}
    >
      <span className="leading-none text-[#808080] mix-blend-difference" style={{ fontSize: size * 0.82, fontFamily: 'var(--font-aeonik), -apple-system, Arial, sans-serif' }}>
        v
      </span>
    </span>
  )
}
