'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { SVGProps, ReactElement } from 'react'
import { DISCOVERY_CALL_URL } from '@/lib/links'

/* =========================================================
   Inline icons — sourced from /public/img/nav/*.svg
   Fills/strokes normalized to currentColor for theming.
   ========================================================= */
type IconProps = SVGProps<SVGSVGElement>

const Svg24 = (props: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  />
)

// talent.svg — AI-Native Talent
const UsersIcon = (p: IconProps) => (
  <Svg24
    {...p}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
    <path d="M8 15H7a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
  </Svg24>
)

// graduation-cap.svg
const GraduationCapIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </g>
  </Svg24>
)

// enterprise.svg
const EnterpriseIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12h4" />
      <path d="M10 8h4" />
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    </g>
  </Svg24>
)

// community.svg  (used for Vahue Incubator)
const CommunityIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g fill="currentColor">
      <path d="M18.3059 22.2455C18.5323 22.3644 18.7967 22.3644 19.0231 22.2455C20.2193 21.6168 23.9977 19.3375 23.9977 15.6312C24.0036 14.0035 22.6995 12.6778 21.0823 12.668C20.1093 12.6805 19.2049 13.1746 18.6644 13.9889C18.1239 13.1746 17.2195 12.6805 16.2465 12.668C14.6293 12.6778 13.3252 14.0035 13.3311 15.6312C13.3311 19.3375 17.1096 21.6167 18.3059 22.2455Z" />
      <path d="M12.5819 12.3243C11.5841 11.9006 10.4861 11.666 9.33248 11.666C6.08038 11.666 3.27009 13.5291 1.89876 16.2413C1.07298 17.8745 1.96984 19.7957 3.61778 20.368C5.0753 20.8741 7.02314 21.334 9.33248 21.334C10.8433 21.334 12.1996 21.1371 13.3651 20.8592C12.3491 19.6524 11.4444 18.0284 11.3408 16.0112C11.3303 15.8064 11.3239 15.5497 11.3429 15.2745C11.4207 14.1475 11.8745 13.1209 12.5819 12.3243Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66699 6.33396C5.66699 4.30838 7.30877 2.6673 9.33366 2.6673C11.3586 2.6673 13.0003 4.30838 13.0003 6.33396C13.0003 8.35955 11.3586 10.0006 9.33366 10.0006C7.30877 10.0006 5.66699 8.35955 5.66699 6.33396Z"
      />
      <path d="M14.0664 9.4504C14.6276 9.79922 15.29 10.0006 15.9993 10.0006C18.0243 10.0006 19.666 8.35955 19.666 6.33396C19.666 4.30838 18.0243 2.6673 15.9993 2.6673C15.29 2.6673 14.6276 2.86871 14.0664 3.21751C14.6561 4.11152 14.9993 5.18254 14.9993 6.33396C14.9993 7.48538 14.6561 8.5564 14.0664 9.4504Z" />
    </g>
  </Svg24>
)

// Finance.svg
const FinanceIcon = (p: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <rect
      x="2.535"
      y="2.036"
      width="14.929"
      height="14.929"
      rx="3.393"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.555 7.204v5.742M10 6.056v6.89M13.445 9.5v3.445"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Insurance.svg
const InsuranceIcon = (p: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.0834 1.5L7.54999 1.5C5.86984 1.5 5.02976 1.5 4.38802 1.82698C3.82354 2.1146 3.36459 2.57355 3.07697 3.13804C2.74999 3.77978 2.75 4.61987 2.75001 6.30006C2.75002 8.28149 2.75003 9.71849 2.75004 11.6999C2.75005 13.3801 2.75005 14.2202 3.07703 14.862C3.36466 15.4265 3.82359 15.8854 4.38808 16.173C5.02982 16.5 5.8699 16.5 7.55006 16.5H10.45C12.1301 16.5 12.9702 16.5 13.612 16.173C14.1764 15.8854 14.6354 15.4265 14.923 14.862C15.25 14.2202 15.25 13.3802 15.25 11.7L15.25 5.78571M11.0834 1.5L11.0834 4.45238C11.0834 4.91909 11.0834 5.15245 11.1742 5.33071C11.2541 5.48751 11.3816 5.61499 11.5384 5.69489C11.7166 5.78571 11.95 5.78571 12.4167 5.78571L15.25 5.78571M11.0834 1.5L13.1667 3.64286L15.25 5.78571" />
      <path d="M6.25 9.875H11.75" />
      <path d="M6.25 12.7502H11.75" />
    </g>
  </svg>
)

// healthcare.svg — Healthcare & Life Sciences
const HeartPulseIcon = (p: IconProps) => (
  <Svg24
    {...p}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
    <path d="M15 15h6" />
    <path d="M18 12v6" />
  </Svg24>
)

// retail.svg — Retail & eCommerce
const ShoppingBagIcon = (p: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <path
      d="M10 2.035H7.966c-1.9 0-2.85 0-3.576.37a3.393 3.393 0 0 0-1.483 1.483c-.37.726-.37 1.676-.37 3.576v4.071c0 1.9 0 2.85.37 3.576a3.393 3.393 0 0 0 1.483 1.483c.726.37 1.676.37 3.576.37H10m0-14.929h2.035c1.9 0 2.85 0 3.576.37a3.392 3.392 0 0 1 1.483 1.483c.37.726.37 1.676.37 3.576v4.071c0 1.9 0 2.85-.37 3.576a3.393 3.393 0 0 1-1.483 1.483c-.726.37-1.675.37-3.576.37h-2.035m0-14.929v14.929M10 11.365H2.536M17.465 7.634H10"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Marketplace.svg
const MarketplaceIcon = (p: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <path d="M2.825 5.581A2.32 2.32 0 112.832.939a2.32 2.32 0 01-.007 4.642zm10.343 0A2.32 2.32 0 1113.175.94a2.32 2.32 0 01-.007 4.641zM2.825 4.331c.609 0 1.073-.473 1.073-1.074 0-.602-.464-1.067-1.073-1.067a1.05 1.05 0 00-1.06 1.067c0 .601.465 1.073 1.06 1.073zm10.343 0c.608 0 1.066-.473 1.066-1.074 0-.602-.458-1.067-1.066-1.067-.595 0-1.066.465-1.066 1.067a1.06 1.06 0 001.066 1.073zm-6.89-.466a.595.595 0 110-1.19.595.595 0 010 1.19zm1.722 0a.595.595 0 110-1.19.595.595 0 010 1.19zm1.723 0a.595.595 0 010-1.19.6.6 0 01.594.596.6.6 0 01-.594.594zm1.675 3.131a.594.594 0 01-.595-.588c0-.328.266-.595.595-.595a.592.592 0 010 1.183zm-6.795 0a.594.594 0 01-.595-.588.595.595 0 011.19 0 .594.594 0 01-.595.588zm5.502 1.429a.595.595 0 010-1.19.6.6 0 01.595.595.6.6 0 01-.595.595zm-4.21 0a.595.595 0 010-1.19.6.6 0 01.594.595.6.6 0 01-.594.595zM8 13.196a2.327 2.327 0 01-2.317-2.33 2.32 2.32 0 014.642 0A2.328 2.328 0 018 13.195zm0-1.258c.608 0 1.066-.471 1.066-1.073 0-.595-.458-1.06-1.066-1.06a1.05 1.05 0 00-1.066 1.06A1.06 1.06 0 008 11.938z" />
  </svg>
)

// guides.svg — inline from /public/img/nav/guides.svg
const GuidesIcon = (p: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round" />
      <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round" />
      <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8" />
    </g>
  </svg>
)

// blogIcon.svg
const BlogIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g fill="currentColor">
      <path d="M11.0003 5.01997L4.28829 3.16797C3.58029 2.97197 2.83896 3.11597 2.25496 3.5613C1.67096 4.00663 1.33496 4.68263 1.33496 5.4173V16.6506C1.33496 17.6973 2.03896 18.6226 3.04829 18.9013L11.0016 21.096V5.01997H11.0003Z" />
      <path d="M21.7467 3.5613C21.1627 3.1173 20.42 2.97197 19.712 3.16797L13 5.01997V21.0946L20.9547 18.9C21.9627 18.6213 22.6667 17.696 22.6667 16.6493V5.4173C22.6667 4.68263 22.332 4.00663 21.7467 3.5613Z" />
    </g>
  </Svg24>
)

// events.svg
const EventsIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.7505 20.2444H5.25049C4.42206 20.2444 3.75049 19.5728 3.75049 18.7444V5.99438C3.75049 5.16596 4.42206 4.49439 5.25049 4.49439H6.37549C6.5826 4.49438 6.75049 4.66228 6.75049 4.86939V5.17992C6.73733 5.96839 7.32064 6.63998 8.10319 6.73734C8.92777 6.81854 9.66206 6.21592 9.74327 5.39133C9.74808 5.34249 9.75049 5.29343 9.75049 5.24435V4.86935C9.75049 4.66224 9.91838 4.49435 10.1255 4.49435H13.8755C14.0826 4.49435 14.2505 4.66224 14.2505 4.86935V5.17989C14.2373 5.96833 14.8206 6.6399 15.6031 6.7373C16.4277 6.81853 17.162 6.2159 17.2433 5.3913C17.2481 5.34245 17.2505 5.2934 17.2505 5.24431V4.86931C17.2505 4.66221 17.4184 4.49431 17.6255 4.49431H18.7505C19.5789 4.49431 20.2505 5.16588 20.2505 5.99431V18.7444C20.2505 19.5728 19.5789 20.2444 18.7505 20.2444ZM7.50049 9.36938C7.50049 9.16228 7.3326 8.99438 7.12549 8.99438H5.62549C5.41838 8.99438 5.25049 9.16228 5.25049 9.36938V10.8694C5.25049 11.0765 5.41838 11.2444 5.62549 11.2444H7.12549C7.3326 11.2444 7.50049 11.0765 7.50049 10.8694V9.36938ZM7.50049 13.1194C7.50049 12.9123 7.3326 12.7444 7.12549 12.7444H5.62549C5.41838 12.7444 5.25049 12.9123 5.25049 13.1194V14.6194C5.25049 14.8265 5.41838 14.9944 5.62549 14.9944H7.12549C7.3326 14.9944 7.50049 14.8265 7.50049 14.6194V13.1194ZM7.50049 16.8694C7.50049 16.6623 7.3326 16.4944 7.12549 16.4944H5.62549C5.41838 16.4944 5.25049 16.6623 5.25049 16.8694V18.3694C5.25049 18.5765 5.41838 18.7444 5.62549 18.7444H7.12549C7.3326 18.7444 7.50049 18.5765 7.50049 18.3694V16.8694ZM11.2505 9.36938C11.2505 9.16228 11.0826 8.99438 10.8755 8.99438H9.37549C9.16838 8.99438 9.00049 9.16228 9.00049 9.36938V10.8694C9.00049 11.0765 9.16838 11.2444 9.37549 11.2444H10.8755C11.0826 11.2444 11.2505 11.0765 11.2505 10.8694V9.36938ZM11.2505 13.1194C11.2505 12.9123 11.0826 12.7444 10.8755 12.7444H9.37549C9.16838 12.7444 9.00049 12.9123 9.00049 13.1194V14.6194C9.00049 14.8265 9.16838 14.9944 9.37549 14.9944H10.8755C11.0826 14.9944 11.2505 14.8265 11.2505 14.6194V13.1194ZM11.2505 16.8694C11.2505 16.6623 11.0826 16.4944 10.8755 16.4944H9.37549C9.16838 16.4944 9.00049 16.6623 9.00049 16.8694V18.3694C9.00049 18.5765 9.16838 18.7444 9.37549 18.7444H10.8755C11.0826 18.7444 11.2505 18.5765 11.2505 18.3694V16.8694ZM15.0005 9.36938C15.0005 9.16228 14.8326 8.99438 14.6255 8.99438H13.1255C12.9184 8.99438 12.7505 9.16228 12.7505 9.36938V10.8694C12.7505 11.0765 12.9184 11.2444 13.1255 11.2444H14.6255C14.8326 11.2444 15.0005 11.0765 15.0005 10.8694L15.0005 9.36938ZM15.0005 13.1194C15.0005 12.9123 14.8326 12.7444 14.6255 12.7444H13.1255C12.9184 12.7444 12.7505 12.9123 12.7505 13.1194V14.6194C12.7505 14.8265 12.9184 14.9944 13.1255 14.9944H14.6255C14.8326 14.9944 15.0005 14.8265 15.0005 14.6194L15.0005 13.1194ZM15.0005 16.8694C15.0005 16.6623 14.8326 16.4944 14.6255 16.4944H13.1255C12.9184 16.4944 12.7505 16.6623 12.7505 16.8694V18.3694C12.7505 18.5765 12.9184 18.7444 13.1255 18.7444H14.6255C14.8326 18.7444 15.0005 18.5765 15.0005 18.3694L15.0005 16.8694ZM18.7505 9.36938C18.7505 9.16228 18.5826 8.99438 18.3755 8.99438H16.8755C16.6684 8.99438 16.5005 9.16228 16.5005 9.36938V10.8694C16.5005 11.0765 16.6684 11.2444 16.8755 11.2444H18.3755C18.5826 11.2444 18.7505 11.0765 18.7505 10.8694L18.7505 9.36938ZM18.7505 13.1194C18.7505 12.9123 18.5826 12.7444 18.3755 12.7444H16.8755C16.6684 12.7444 16.5005 12.9123 16.5005 13.1194V14.6194C16.5005 14.8265 16.6684 14.9944 16.8755 14.9944H18.3755C18.5826 14.9944 18.7505 14.8265 18.7505 14.6194L18.7505 13.1194ZM18.7505 16.8694C18.7505 16.6623 18.5826 16.4944 18.3755 16.4944H16.8755C16.6684 16.4944 16.5005 16.6623 16.5005 16.8694V18.3694C16.5005 18.5765 16.6684 18.7444 16.8755 18.7444H18.3755C18.5826 18.7444 18.7505 18.5765 18.7505 18.3694L18.7505 16.8694ZM15.7505 5.99438C15.3363 5.99438 15.0005 5.6586 15.0005 5.24438V3.74438C15.0005 3.33017 15.3363 2.99438 15.7505 2.99438C16.1647 2.99438 16.5005 3.33017 16.5005 3.74438V5.24438C16.5005 5.65857 16.1647 5.99434 15.7506 5.99439L15.7505 5.99438ZM8.25049 5.99438C7.83627 5.99438 7.50049 5.6586 7.50049 5.24438V3.74438C7.50049 3.33017 7.83627 2.99438 8.25049 2.99438C8.6647 2.99438 9.00049 3.33017 9.00049 3.74438V5.24438C9.00049 5.6586 8.6647 5.99439 8.25049 5.99439V5.99438Z"
      fill="currentColor"
    />
  </Svg24>
)

// ai-leaderboard.svg
const LeaderboardIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <g fill="currentColor">
      <path d="M19.6667 12.6666H16V11.6666C16 10.38 14.9533 9.33331 13.6667 9.33331H10.3333C9.04667 9.33331 8 10.38 8 11.6666V14.6666H4.33333C3.04667 14.6666 2 15.7133 2 17V19C2 20.2866 3.04667 21.3333 4.33333 21.3333H19.6667C20.9533 21.3333 22 20.2866 22 19V15C22 13.7133 20.9533 12.6666 19.6667 12.6666ZM4 19V17C4 16.816 4.14933 16.6666 4.33333 16.6666H8V19.3333H4.33333C4.14933 19.3333 4 19.184 4 19ZM20 19C20 19.184 19.8507 19.3333 19.6667 19.3333H16V14.6666H19.6667C19.8507 14.6666 20 14.816 20 15V19Z" />
      <path d="M9.75016 4.592L9.44616 6.35734C9.40349 6.608 9.50616 6.86 9.71149 7.00934C9.82749 7.09334 9.96483 7.13734 10.1035 7.13734C10.2102 7.13734 10.3155 7.112 10.4128 7.06L11.9982 6.22667L13.5822 7.06C13.8062 7.17867 14.0782 7.15867 14.2835 7.00934C14.4888 6.86 14.5915 6.60667 14.5488 6.35734L14.2448 4.592L15.5275 3.34134C15.7102 3.164 15.7755 2.89867 15.6968 2.65867C15.6182 2.41734 15.4102 2.24134 15.1595 2.20534L13.3875 1.948L12.5942 0.342671C12.3702 -0.113329 11.6222 -0.113329 11.3995 0.342671L10.6062 1.948L8.83283 2.20534C8.58216 2.24134 8.37283 2.41734 8.29549 2.65867C8.21683 2.9 8.28216 3.164 8.46483 3.34134L9.74749 4.592H9.75016Z" />
    </g>
  </Svg24>
)

// caseStudies.svg
const CaseStudiesIcon = (p: IconProps) => (
  <Svg24 {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 19.5H4.5C3.67158 19.5 3 18.8284 3 18V12.5765C2.99895 12.26 3.25468 12.0026 3.5712 12.0015C3.68633 12.0011 3.79891 12.0354 3.89427 12.0999C4.51435 12.5245 5.24853 12.7511 6 12.75H10.5V13.5315C10.5 13.8552 11.0989 14.25 12 14.25C12.9011 14.25 13.5 13.8552 13.5 13.5315V12.75H18C18.7515 12.7511 19.4856 12.5244 20.1057 12.0999C20.3679 11.9226 20.7242 11.9913 20.9016 12.2536C20.9661 12.3489 21.0004 12.4614 21 12.5765V18C21 18.8284 20.3284 19.5 19.5 19.5L19.5 19.5ZM18 12H13.5V11.25C13.5 11.0429 13.3321 10.875 13.125 10.875H10.875C10.6679 10.875 10.5 11.0429 10.5 11.25V12H6C4.34315 12 3 10.6569 3 9V7.5C3 6.67157 3.67158 6 4.5 6H7.875V4.875C7.875 3.83947 8.71447 3 9.75 3H14.25C15.2855 3 16.125 3.83947 16.125 4.875V6H19.5C20.3284 6 21 6.67157 21 7.5V9C21 10.6569 19.6569 12 18 12ZM14.625 4.875C14.625 4.66789 14.4571 4.5 14.25 4.5H9.75C9.5429 4.5 9.375 4.66789 9.375 4.875V6H14.625V4.875Z"
      fill="currentColor"
    />
  </Svg24>
)

/* =========================================================
   Nav data
   ========================================================= */
type NavLink = {
  href: string
  label: string
  Icon: (p: IconProps) => ReactElement
  badge?: string
}

type NavGroup = {
  id: 'services' | 'industries' | 'resources'
  label: string
  columns: NavLink[][]
}

const navGroups: NavGroup[] = [
  {
    id: 'services',
    label: 'Services',
    columns: [
      [
        {
          href: '/services/vahue-incubator',
          label: 'AI Incubator',
          Icon: CommunityIcon,
          badge: 'NEW',
        },
        {
          href: '/services/ai-native-talent',
          label: 'AI-Native Talent',
          Icon: UsersIcon,
        },
        {
          href: '/services/team-training',
          label: 'Team Training',
          Icon: GraduationCapIcon,
        },
        {
          href: '/services/enterprise-ai',
          label: 'Enterprise AI',
          Icon: EnterpriseIcon,
        },
      ],
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    columns: [
      [
        {
          href: '/industries/banking-financial-services',
          label: 'Banking & Financial Services',
          Icon: FinanceIcon,
        },
        {
          href: '/industries/insurance',
          label: 'Insurance',
          Icon: InsuranceIcon,
        },
        {
          href: '/industries/healthcare-life-sciences',
          label: 'Healthcare & Life Sciences',
          Icon: HeartPulseIcon,
        },
        {
          href: '/industries/retail-ecommerce',
          label: 'Retail & eCommerce',
          Icon: ShoppingBagIcon,
        },
      ],
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      [
        {
          href: '/resources/marketplace',
          label: 'Marketplace',
          Icon: MarketplaceIcon,
        },
        { href: '/resources/guides', label: 'Guides', Icon: GuidesIcon },
        { href: '/blog', label: 'Blog', Icon: BlogIcon },
      ],
      [
        { href: '/resources/events', label: 'Events', Icon: EventsIcon },
        {
          href: '/resources/leader-board',
          label: 'Frontier AI Leaderboards',
          Icon: LeaderboardIcon,
        },
        {
          href: '/case-studies',
          label: 'Case Studies',
          Icon: CaseStudiesIcon,
        },
      ],
    ],
  },
]

/* =========================================================
   Navbar
   ========================================================= */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<NavGroup['id'] | null>(null)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<NavGroup['id'] | null>(
    null
  )
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHomePage = pathname === '/' || pathname === ''
  const liRefs = useRef<Record<string, HTMLLIElement | null>>({})
  const [portalReady, setPortalReady] = useState(false)
  const [menuRect, setMenuRect] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (!openGroup) {
      setMenuRect(null)
      return
    }
    const el = liRefs.current[openGroup]
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      setMenuRect({ top: r.bottom, left: r.left, width: r.width })
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [openGroup])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    setOpenGroup(null)
    setMobileOpenGroup(null)
    setIsMenuOpen(false)
  }, [pathname])

  const handleOpen = useCallback((id: NavGroup['id']) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenGroup(id)
  }, [])

  const handleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120)
  }, [])

  const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), [])
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setOpenGroup(null)
    setMobileOpenGroup(null)
  }, [])

  return (
    <>
      {/* Announcement bar — homepage only, in normal flow so it scrolls away */}
      {isHomePage && (
        <div className="relative z-40 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 text-white text-xs md:text-sm">
          <Link
            href="/resources/events"
            className="group/anno flex items-center justify-center px-6 py-4 text-center text-white"
          >
            <span className="font-medium">
              Vahue Momentum AI <span className="text-white/40 mx-1">|</span>{' '}
              San-Francisco 2026
            </span>
            <span className="inline-flex items-center ml-4 font-bold">
              Join Live
              <svg
                className="w-5 h-5 ml-1.5 transition-transform duration-200 group-hover/anno:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      )}

      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'bg-bg/80 backdrop-blur-xl border-b border-border-soft'
            : openGroup
            ? 'bg-bg/80 border-b border-border-soft'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-wide mx-auto px-6 md:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center min-h-[88px] gap-6">
            {/* Logo — left */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 z-50 text-white"
            >
              <Image
                src="/img/white-circle.svg"
                alt="Vahue logo"
                width={14}
                height={14}
              />
              <span className="text-xl font-bold tracking-tight">vahue.ai</span>
            </Link>

            {/* Desktop Nav — centered */}
            <div className="hidden md:flex items-center justify-center">
              <ul className="flex items-center gap-8">
                {navGroups.map((group) => {
                  const isOpen = openGroup === group.id
                  return (
                    <li
                      key={group.id}
                      ref={(el) => {
                        liRefs.current[group.id] = el
                      }}
                      className="relative"
                      onMouseEnter={() => handleOpen(group.id)}
                      onMouseLeave={handleClose}
                    >
                      <button
                        type="button"
                        className="text-sm font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                      >
                        {group.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right — CTA */}
            <div className="hidden md:flex items-center justify-end">
              <Link
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full bg-white text-bg hover:bg-white/90 transition-colors"
              >
                Book a call
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden col-start-3 flex flex-col items-center justify-center w-10 h-10 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded mt-1.5 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop dropdown — rendered in a portal so no ancestor
          creates a compositing layer that would break backdrop-filter. */}
      {portalReady &&
        createPortal(
          <div
            aria-hidden={openGroup === null}
            className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
          >
            {navGroups.map((group) => {
              const isOpen = openGroup === group.id
              const isMega = group.columns.length > 1
              const rect = isOpen ? menuRect : null
              const cardWidth = isMega ? 580 : 320
              return (
                <div
                  key={group.id}
                  onMouseEnter={() => handleOpen(group.id)}
                  onMouseLeave={handleClose}
                  className={`absolute ${
                    isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    top: rect ? rect.top : -9999,
                    left: rect
                      ? rect.left + rect.width / 2 - cardWidth / 2
                      : 0,
                    paddingTop: 16,
                    visibility: isOpen ? 'visible' : 'hidden',
                  }}
                >
                  <div
                    className={`rounded-2xl bg-[#0a0a0a]/50 backdrop-blur-xl border border-border-soft shadow-2xl shadow-black/60 p-4 ${
                      isMega ? 'min-w-[580px]' : 'min-w-[320px]'
                    }`}
                  >
                    <div className="eyebrow mb-3 px-3 text-white/50">
                      {group.label}
                    </div>
                    <div
                      className={`grid gap-x-4 gap-y-0.5 ${
                        isMega ? 'grid-cols-2' : 'grid-cols-1'
                      }`}
                    >
                      {group.columns.flat().map((link) => {
                        const Icon = link.Icon
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="group/item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/[0.06] transition-colors"
                          >
                            <span className="flex items-center justify-center w-6 h-6 text-white/75 group-hover/item:text-white shrink-0 transition-colors">
                              <Icon width={24} height={24} />
                            </span>
                            <span className="whitespace-nowrap text-white/90 group-hover/item:text-white transition-colors">
                              {link.label}
                            </span>
                            {link.badge && (
                              <span className="ml-auto inline-flex items-center rounded-full bg-[#BBDEF2]/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#BBDEF2]">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>,
          document.body
        )}

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          isMenuOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        <div
          className={`relative h-full overflow-y-auto px-6 pt-24 pb-10 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-2 max-w-md mx-auto">
            {navGroups.map((group) => {
              const isOpen = mobileOpenGroup === group.id
              return (
                <li key={group.id} className="pb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenGroup((prev) =>
                        prev === group.id ? null : group.id
                      )
                    }
                    className="flex items-center justify-between w-full py-3 text-lg font-semibold text-white/90 hover:text-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    {group.label}
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col gap-1 pb-3">
                        {group.columns.flat().map((link) => {
                          const Icon = link.Icon
                          return (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={closeMenu}
                                className="group/mitem flex items-center gap-3 py-2 pl-2 text-base"
                              >
                                <span className="flex items-center justify-center w-5 h-5 text-white/75 group-hover/mitem:text-white shrink-0 transition-colors">
                                  <Icon width={18} height={18} />
                                </span>
                                <span className="text-white/90 group-hover/mitem:text-white transition-colors">
                                  {link.label}
                                </span>
                                {link.badge && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-[#BBDEF2]/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#BBDEF2]">
                                    {link.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="max-w-md mx-auto mt-8">
            <Link
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="block text-center font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-full bg-white text-bg hover:bg-white/90 transition-colors"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
