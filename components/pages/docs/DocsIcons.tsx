// Mintlify's mint icon set, read from the <symbol> sheet in /docs's server-rendered HTML (`mi-mint-1-*`).
// Inlined so the page has no request to Mintlify's CDN. Mask-based FontAwesome magnifier below 1024 is `SearchSolid`.
import type { SVGProps } from 'react'

const base = { viewBox: '0 0 18 18', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

type P = SVGProps<SVGSVGElement>

export const SparkleIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M5.65799 2.99L4.39499 2.569L3.97399 1.306C3.83699 0.898 3.16199 0.898 3.02499 1.306L2.60399 2.569L1.34099 2.99C1.13699 3.058 0.998993 3.249 0.998993 3.464C0.998993 3.679 1.13699 3.87 1.34099 3.938L2.60399 4.359L3.02499 5.622C3.09299 5.826 3.28499 5.964 3.49999 5.964C3.71499 5.964 3.90599 5.826 3.97499 5.622L4.39599 4.359L5.65899 3.938C5.86299 3.87 6.00099 3.679 6.00099 3.464C6.00099 3.249 5.86199 3.058 5.65799 2.99Z" fill="currentColor" stroke="none" />
    <path d="M9.5 2.75L11.412 7.587L16.25 9.5L11.412 11.413L9.5 16.25L7.587 11.413L2.75 9.5L7.587 7.587L9.5 2.75Z" />
  </svg>
)

export const ExpandIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M10.75 2.75H15.25V7.25" />
    <path d="M15.25 2.75L10.75 7.25" />
    <path d="M2.75 10.75V15.25H7.25" />
    <path d="M2.75 15.25L7.25 10.75" />
  </svg>
)

export const CloseIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M14 4L4 14" />
    <path d="M4 4L14 14" />
  </svg>
)

export const AttachIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M7.75 5V11.75C7.75 12.578 8.422 13.25 9.25 13.25C10.078 13.25 10.75 12.578 10.75 11.75V4.75C10.75 3.093 9.407 1.75 7.75 1.75C6.093 1.75 4.75 3.093 4.75 4.75V11.75C4.75 14.235 6.765 16.25 9.25 16.25C11.735 16.25 13.75 14.235 13.75 11.75V5" />
  </svg>
)

export const SendIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M9.0 1.5754L8.9999 16.4171" />
    <path d="M2.2563 8.319L8.9999 1.5754L15.7435 8.3191" />
  </svg>
)

export const SearchIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M15.25 15.25L11.285 11.285" />
    <path d="M7.75 12.75C10.5114 12.75 12.75 10.5114 12.75 7.75C12.75 4.98858 10.5114 2.75 7.75 2.75C4.98858 2.75 2.75 4.98858 2.75 7.75C2.75 10.5114 4.98858 12.75 7.75 12.75Z" />
  </svg>
)

export const ThemeSystemIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M4.5 15.5L9 14.5L13.5 15.5" />
    <path d="M9 11.75V14.5" />
    <path d="M14.25 2.75H3.75C2.64543 2.75 1.75 3.64543 1.75 4.75V9.75C1.75 10.8546 2.64543 11.75 3.75 11.75H14.25C15.3546 11.75 16.25 10.8546 16.25 9.75V4.75C16.25 3.64543 15.3546 2.75 14.25 2.75Z" />
  </svg>
)

export const ThemeLightIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M9 1.25V2.25" />
    <path d="M14.48 3.52002L13.773 4.22702" />
    <path d="M16.75 9H15.75" />
    <path d="M14.48 14.4799L13.773 13.7729" />
    <path d="M9 16.75V15.75" />
    <path d="M3.52 14.4799L4.227 13.7729" />
    <path d="M1.25 9H2.25" />
    <path d="M3.52 3.52002L4.227 4.22702" />
    <path d="M9 13.25C11.3472 13.25 13.25 11.3472 13.25 9C13.25 6.65279 11.3472 4.75 9 4.75C6.65279 4.75 4.75 6.65279 4.75 9C4.75 11.3472 6.65279 13.25 9 13.25Z" />
  </svg>
)

export const ThemeDarkIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M13 11.75C9.548 11.75 6.75 8.95201 6.75 5.50001C6.75 4.14801 7.183 2.90101 7.912 1.87801C4.548 2.50601 2 5.45301 2 9.00001C2 13.004 5.246 16.25 9.25 16.25C12.622 16.25 15.448 13.944 16.259 10.826C15.309 11.409 14.196 11.75 13 11.75Z" />
  </svg>
)

export const MenuIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M2.25 9H15.75" />
    <path d="M2.25 3.75H15.75" />
    <path d="M2.25 14.25H15.75" />
  </svg>
)

export const ChevronRightIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M6.5 2.75L12.75 9L6.5 15.25" />
  </svg>
)

export const TableOfContentsIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M2.75 14.25H15.25" />
    <path d="M2.75 3.75H15.25" />
    <path d="M2.75 9H8.25" />
  </svg>
)

export const LinkIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M8.50001 6.827C8.14801 6.995 7.81801 7.225 7.52701 7.517L7.51701 7.527C6.13601 8.908 6.13601 11.146 7.51701 12.527L9.69201 14.702C11.073 16.083 13.311 16.083 14.692 14.702L14.702 14.692C16.083 13.311 16.083 11.073 14.702 9.692L13.771 8.761" />
    <path d="M9.50002 11.173C9.85202 11.005 10.182 10.775 10.473 10.483L10.483 10.473C11.864 9.092 11.864 6.854 10.483 5.473L8.30802 3.298C6.92702 1.917 4.68902 1.917 3.30802 3.298L3.29802 3.308C1.91702 4.689 1.91702 6.927 3.29802 8.308L4.22902 9.239" />
  </svg>
)

export const ExternalLinkIcon = ({ strokeWidth = 1.5, ...p }: P) => (
  <svg {...base} strokeWidth={strokeWidth} {...p}>
    <path d="M14.25 3.75L3.75525 14.2446" />
    <path d="M4.71301 3.75H14.2499V13.2869" />
  </svg>
)

export const SearchSolid = (p: P) => (
  <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden {...p}>
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
)
