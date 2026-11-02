'use client'

// Scale's OneTrust banner, measured on scale.com: same box, colours, overlay and timing. It appears without moving, because Scale's
// `bottom: 0 !important` cancels OneTrust's slide; the overlay fades in over 400ms; on a choice the banner goes at once and the overlay fades out.
// Vahue has no trackers, so both choices only record the answer. Scale's "Cookies Settings" is left out: there is nothing to configure.
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import s from './CookieBanner.module.css'

export const COOKIE_CHOICE_KEY = 'vahue-cookie-consent'
const OPEN_EVENT = 'vahue:cookie-preferences'
/** When OneTrust's banner reached the page on scale.com: 1.7s to 2.1s after navigation on a normal load. */
const APPEAR_DELAY_MS = 1700
const OVERLAY_FADE_MS = 400

/** The footer's "cookie preferences" button. */
export const openCookiePreferences = () => window.dispatchEvent(new Event(OPEN_EVENT))

function readChoice() {
  try {
    return window.localStorage.getItem(COOKIE_CHOICE_KEY)
  } catch {
    return null
  }
}

function saveChoice(choice: 'accepted' | 'rejected') {
  try {
    window.localStorage.setItem(COOKIE_CHOICE_KEY, choice)
  } catch {
    // Blocked storage: the banner still closes, and comes back on the next full page load.
  }
}

export function CookieBanner() {
  const [phase, setPhase] = useState<'hidden' | 'open' | 'closing'>('hidden')
  const banner = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const appear = readChoice() ? undefined : window.setTimeout(() => setPhase('open'), APPEAR_DELAY_MS)
    const reopen = () => {
      window.clearTimeout(appear)
      window.clearTimeout(closeTimer.current)
      opener.current = document.activeElement as HTMLElement | null
      setPhase('open')
    }
    window.addEventListener(OPEN_EVENT, reopen)
    return () => {
      window.clearTimeout(appear)
      window.clearTimeout(closeTimer.current)
      window.removeEventListener(OPEN_EVENT, reopen)
    }
  }, [])

  // OneTrust moves focus to the banner, so the next Tab reaches its links and buttons.
  useEffect(() => {
    if (phase === 'open') banner.current?.focus({ preventScroll: true })
  }, [phase])

  const choose = useCallback((choice: 'accepted' | 'rejected') => {
    saveChoice(choice)
    setPhase('closing')
    closeTimer.current = window.setTimeout(() => setPhase('hidden'), OVERLAY_FADE_MS)
    opener.current?.focus({ preventScroll: true })
    opener.current = null
  }, [])

  if (phase === 'hidden') return null
  return (
    <>
      <div className={phase === 'closing' ? s.overlayOut : s.overlay} />
      {phase === 'open' ? (
        <div ref={banner} className={s.banner} tabIndex={0} data-cookie-banner="">
          <div role="alertdialog" aria-label="Privacy" aria-describedby="cookie-banner-text" className={s.row}>
            <p id="cookie-banner-text" className={s.text}>
              This website doesn&rsquo;t use tracking or advertising cookies. It only saves your choice in your browser, and if we add optional cookies, we&rsquo;ll ask first. Visit our{' '}
              <Link href="/legal/cookie">Cookie Policy</Link> and <Link href="/legal/privacy">Privacy Policy</Link> for more information.
            </p>
            <div className={s.buttons}>
              <button type="button" className={s.reject} onClick={() => choose('rejected')}>
                Reject Cookies
              </button>
              <button type="button" className={s.accept} onClick={() => choose('accepted')}>
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
