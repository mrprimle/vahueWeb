import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * Helpers shared by the national-security sections.
 *
 * retroEnter = Scale's useScrollTrigger hook (module 210104 in 37xz28pjbnlx4.js sha256 b234eef5…): a ScrollTrigger with
 * start "top 80%" / end "bottom 20%" by default; with retroactiveOnEnter, every refresh fires onEnter once the trigger's
 * progress > 0 or the scroll is at/after start - 1 (a deep link or a jump past the section still plays the intro).
 */
export function retroEnter(trigger: Element, start: string, cb: () => void, end = 'bottom 20%') {
  let fired = false
  const fire = () => {
    if (fired) return
    fired = true
    cb()
  }
  const st = ScrollTrigger.create({ trigger, start, end, onEnter: fire })
  const retro = () => {
    if (st.progress > 0 || st.scroll() >= st.start - 1) fire()
  }
  ScrollTrigger.addEventListener('refresh', retro)
  retro()
  return () => {
    ScrollTrigger.removeEventListener('refresh', retro)
    st.kill()
  }
}

/** mapRange with clamp (Scale's 194624 `v`). */
export const mapRange = (v: number, a: number, b: number, c: number, d: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return c + (d - c) * t
}

/**
 * Scale's useDeviceDetect (module 263942, react-device-detect): `isDesktop` is a device-type check, not a viewport
 * width, so a desktop browser at 390px still gets the directional card entrances. Touch Safari on a "desktop" UA
 * (iPadOS) counts as mobile.
 */
export function isDesktopDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/Mobi|Android|iPhone|iPad|iPod|Tablet|Silk|Kindle/i.test(ua)) return false
  const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const safari = /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg/i.test(ua)
  return !(safari && touch)
}

const power2out = gsap.parseEase('power2.out')

/** Scale's BaseCardScroll stagger window (317967 `f`): l = min(.1, .85 / (n - 1)), card i maps [i l, i l + 1 - (n - 1) l]. */
export function staggerWindow(p: number, i: number, n: number) {
  if (n <= 1) return p
  const l = Math.min(0.1, 0.85 / Math.max(1, n - 1))
  const a = i * l
  return mapRange(p, a, a + (1 - (n - 1) * l), 0, 1)
}

/**
 * BaseCardScroll (598042 / 317967): scrubbed "top bottom" -> scrollTriggerEnd on the card itself;
 * q = power2.out(stagger(progress)); scale (down 1.06 / up .96) -> 1, opacity 0 -> 1, x entranceTranslateX -> 0,
 * y (down 48 / up 0) -> 0. The initial state is set on mount.
 */
export function baseCardScroll(
  card: HTMLElement,
  { dir = 'up', x = 0, index = 0, count = 1, end = 'top 50%', start = 'top bottom' }: { dir?: 'up' | 'down'; x?: number; index?: number; count?: number; end?: string; start?: string },
) {
  const s0 = dir === 'down' ? 1.06 : 0.96
  const y0 = dir === 'down' ? 48 : 0
  const apply = (p: number) => {
    const q = power2out(staggerWindow(p, index, count))
    gsap.set(card, { scale: s0 + (1 - s0) * q, opacity: q, x: x * (1 - q), y: y0 * (1 - q) })
  }
  apply(0)
  return ScrollTrigger.create({
    trigger: card,
    start,
    end,
    onUpdate: (self) => apply(self.progress),
    onRefresh: (self) => apply(self.progress),
  })
}
