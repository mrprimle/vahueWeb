'use client'

import { useState, type ReactNode } from 'react'
import WaitlistModal from './WaitlistModal'

type WaitlistButtonProps = {
  children?: ReactNode
  context?: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  className?: string
}

export default function WaitlistButton({
  children = 'Join the waiting list',
  context,
  variant = 'primary',
  size = 'md',
  className = '',
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false)

  const sizeClasses =
    size === 'lg' ? 'px-7 py-4 text-sm' : 'px-6 py-3.5 text-sm'

  const variantClasses =
    variant === 'primary'
      ? 'bg-white text-bg hover:bg-white/90'
      : 'bg-white/10 text-white border border-border-mid hover:bg-white/15'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center gap-3 font-medium uppercase tracking-wider rounded-full transition-colors ${sizeClasses} ${variantClasses} ${className}`}
      >
        {children}
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      </button>
      <WaitlistModal
        open={open}
        onClose={() => setOpen(false)}
        context={context}
      />
    </>
  )
}
