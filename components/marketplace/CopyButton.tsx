'use client'

import { useState } from 'react'

type CopyButtonProps = {
  text: string
  label?: string
  copiedLabel?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'solid' | 'outline'
  className?: string
  onCopy?: () => void
}

const sizeClasses = {
  sm: 'gap-1.5 px-2.5 py-1.5 text-[12px] rounded-lg',
  md: 'gap-2 px-3.5 py-2 text-sm rounded-xl',
  lg: 'gap-2 px-5 py-2.5 text-sm rounded-full',
}

const iconSize = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-4 h-4' }

const variantClasses = {
  ghost:
    'bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 text-white/80 hover:text-white',
  outline:
    'bg-transparent border border-white/20 hover:bg-white/[0.05] text-white/85 hover:text-white',
  solid:
    'bg-white text-bg hover:bg-white/90 border border-transparent',
}

export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied',
  size = 'md',
  variant = 'ghost',
  className = '',
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <svg
          className={iconSize[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className={iconSize[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}
