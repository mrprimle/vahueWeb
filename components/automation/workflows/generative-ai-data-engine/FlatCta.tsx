'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

/** Two-rAF release, as Scale's FlatCta does before it re-enables a transition. */
function useRelease(flag: boolean, release: () => void) {
  useEffect(() => {
    if (!flag) return
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(release)
    })
    return () => {
      cancelAnimationFrame(a)
      cancelAnimationFrame(b)
    }
  }, [flag, release])
}

/*
 * White FlatCta, "arrow" variant (scale.com chunk 1h0nvyhf5gbrf.js, module 892855), same state machine:
 *  pointerenter  wash (35% black) slides translateX(-100%) -> 0, chevron strip -50% -> 0, 600ms ease-out
 *  pointerleave  wash keeps going to +100% (exits right); after 680ms it snaps back to -100% with the
 *                transition off, released after two rAFs. (Scale also listens for a `transform` transitionend,
 *                but its Tailwind 4 classes animate `translate`, so that never matches and the 680ms timer is
 *                what resets it; measured: the wash sits at +100% until ~700ms. The clone skips the handler.)
 *                The strip snaps straight back to -50% (transition none), released after two rAFs.
 *  re-enter while the wash is still leaving: it snaps to -100% first, so it always enters from the left.
 * Intro parts are tagged with data-cta-* hooks (FullBleedMedia runs the "filledWhiteArrow" intro).
 */
export default function FlatCta({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false) // U
  const [leaving, setLeaving] = useState(false) // D
  const [resetting, setResetting] = useState(false) // j
  const [stripIn, setStripIn] = useState(false) // Y
  const [stripSnap, setStripSnap] = useState(false) // H
  const pending = useRef(false) // B
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timer.current != null) clearTimeout(timer.current)
    timer.current = null
  }
  useEffect(() => clear, [])

  const finishLeave = useCallback(() => {
    if (!pending.current) return
    clear()
    pending.current = false
    setLeaving(false)
    setResetting(true)
  }, [])
  useRelease(resetting, useCallback(() => setResetting(false), []))
  useRelease(stripSnap, useCallback(() => setStripSnap(false), []))

  const enter = useCallback(() => {
    clear()
    setResetting(pending.current)
    pending.current = false
    setLeaving(false)
    setHovered(true)
    setStripSnap(false)
    setStripIn(true)
  }, [])

  const leave = useCallback(() => {
    setStripIn(false)
    setStripSnap(true)
    setHovered(false)
    if (resetting) return
    setLeaving(true)
    pending.current = true
    clear()
    timer.current = setTimeout(() => {
      timer.current = null
      finishLeave()
    }, 680)
  }, [resetting, finishLeave])

  const wash = resetting ? 'rest' : hovered ? 'in' : leaving ? 'out' : 'rest'

  return (
    <Link
      href={href}
      data-cta-root
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="relative flex w-max items-center justify-center overflow-hidden rounded-lg bg-white"
    >
      <span
        aria-hidden
        data-state={wash}
        className={`${styles.ctaWash} ${resetting ? styles.snap : ''} pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-black opacity-35`}
      />
      <span className="relative z-[1] inline-flex items-center justify-center py-1 pl-4 pr-1">
        <span data-cta-counter className="relative z-[1] flex items-center justify-center gap-4">
          <span data-cta-text className="block self-center text-nowrap text-[14px] font-medium capitalize leading-[1.5] tracking-normal text-black">
            {children}
          </span>
          <span data-cta-arrow className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2 text-white">
            <span data-state={stripIn && !stripSnap ? 'in' : 'rest'} className={`${styles.ctaStrip} ${stripSnap ? styles.snap : ''} absolute inset-0 flex h-full w-[200%]`}>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron /></span>
              <span className="flex h-full w-1/2 shrink-0 items-center justify-center"><Chevron /></span>
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
