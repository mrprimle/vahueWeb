import type { SVGProps } from 'react'

// lucide-react icons as labs.scale.com renders them (24 viewBox, stroke 2, round caps/joins).
type P = SVGProps<SVGSVGElement> & { className?: string }

function Lucide({ name, className, children, ...rest }: P & { name: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`lucide lucide-${name} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const SearchIcon = (p: P) => (
  <Lucide name="search" {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Lucide>
)
export const MenuIcon = (p: P) => (
  <Lucide name="menu" {...p}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </Lucide>
)
export const XIcon = (p: P) => (
  <Lucide name="x" {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Lucide>
)
export const ArrowRight = (p: P) => (
  <Lucide name="arrow-right" {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Lucide>
)
export const ArrowDown = (p: P) => (
  <Lucide name="arrow-down" {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Lucide>
)
export const ChevronLeft = (p: P) => (
  <Lucide name="chevron-left" {...p}>
    <path d="m15 18-6-6 6-6" />
  </Lucide>
)
export const ChevronRight = (p: P) => (
  <Lucide name="chevron-right" {...p}>
    <path d="m9 18 6-6-6-6" />
  </Lucide>
)
export const Sparkles = (p: P) => (
  <Lucide name="sparkles" {...p}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Lucide>
)
export const CornerDownLeft = (p: P) => (
  <Lucide name="corner-down-left" {...p}>
    <polyline points="9 10 4 15 9 20" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </Lucide>
)
