'use client'

import { useEffect, useState } from 'react'

type GuideActionsProps = {
  slug: string
  initialLikes?: number
}

export default function GuideActions({ slug, initialLikes = 1 }: GuideActionsProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const storageKey = `vahue-guide-liked:${slug}`

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const stored = window.localStorage.getItem(storageKey)
      if (stored === '1') {
        setLiked(true)
        setLikes(initialLikes + 1)
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, initialLikes])

  const handleCopy = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : ''
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const handleLike = () => {
    const next = !liked
    setLiked(next)
    setLikes((current) => (next ? current + 1 : Math.max(0, current - 1)))
    try {
      if (typeof window !== 'undefined') {
        if (next) {
          window.localStorage.setItem(storageKey, '1')
        } else {
          window.localStorage.removeItem(storageKey)
        }
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 px-3.5 py-2 text-sm text-white/80 hover:text-white transition-colors"
        aria-label="Copy link to this guide"
      >
        <svg
          className="w-3.5 h-3.5"
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
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>

      <button
        type="button"
        onClick={handleLike}
        aria-pressed={liked}
        aria-label={liked ? 'Remove like' : 'Like this guide'}
        className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition-colors ${
          liked
            ? 'bg-white/[0.08] border-white/25 text-white'
            : 'bg-white/[0.04] border-white/10 text-white/80 hover:bg-white/[0.07] hover:border-white/20 hover:text-white'
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform ${liked ? 'scale-110' : ''}`}
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="font-mono text-xs tabular-nums">{likes}</span>
      </button>
    </div>
  )
}
