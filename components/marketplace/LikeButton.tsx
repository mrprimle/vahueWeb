'use client'

import { useEffect, useState } from 'react'

type LikeButtonProps = {
  slug: string
  initialLikes?: number
  size?: 'sm' | 'md'
  /** Stop list-item navigation when clicked inside a wrapping Link. */
  stopPropagation?: boolean
  className?: string
}

export default function LikeButton({
  slug,
  initialLikes = 0,
  size = 'sm',
  stopPropagation = false,
  className = '',
}: LikeButtonProps) {
  const storageKey = `vahue-marketplace-liked:${slug}`
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (window.localStorage.getItem(storageKey) === '1') {
        setLiked(true)
        setLikes(initialLikes + 1)
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, initialLikes])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.preventDefault()
      event.stopPropagation()
    }
    const next = !liked
    setLiked(next)
    setLikes((current) => (next ? current + 1 : Math.max(0, current - 1)))
    try {
      if (typeof window !== 'undefined') {
        if (next) window.localStorage.setItem(storageKey, '1')
        else window.localStorage.removeItem(storageKey)
      }
    } catch {
      /* ignore */
    }
  }

  const padding = size === 'sm' ? 'gap-1.5 px-2.5 py-1 rounded-full text-[12px]' : 'gap-2 px-3 py-1.5 rounded-full text-sm'
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'Remove like' : 'Like'}
      className={`inline-flex items-center border transition-colors ${padding} ${
        liked
          ? 'bg-white/10 border-white/25 text-white'
          : 'bg-transparent border-white/10 text-white/60 hover:text-white hover:border-white/20'
      } ${className}`}
    >
      <svg
        className={`${iconSize} transition-transform ${liked ? 'scale-110' : ''}`}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="font-mono tabular-nums">{likes}</span>
    </button>
  )
}
