// Vahue mark (circle + "vahue.ai" wordmark, as in components/Navbar.tsx) drawn in currentColor so it
// reads dark-on-light and flips with the nav theme. Sized to Scale's logo box: 80×18, 80×20 from xl.
export default function VahueLogo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-[18px] w-[80px] shrink-0 items-center gap-[5px] xl:gap-1 overflow-hidden xl:h-5 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1024 1024" className="size-[12px] shrink-0 xl:size-[13px]" fill="currentColor">
        <circle cx="512" cy="512" r="512" />
      </svg>
      <span className="whitespace-nowrap font-sans text-[14.5px] font-bold leading-none tracking-[-0.03em] xl:text-[15px]">
        vahue.ai
      </span>
    </span>
  )
}
