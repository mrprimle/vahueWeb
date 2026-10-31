// Icons copied from the source page markup (Material Design icon paths, chevron,
// play glyph, testimonial label triangle). No Scale brand marks.

export function Chevron() {
  return (
    <svg className="block shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
        fill="currentColor"
      />
    </svg>
  )
}

const FEATURE_PATHS = {
  laptop: 'M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
  sparkles:
    'm19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25zM11.5 9.5 9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zm-1.51 3.49L9 15.17l-.99-2.18L5.83 12l2.18-.99L9 8.83l.99 2.18 2.18.99-2.18.99z',
  trend: 'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
}

export type FeatureIcon = keyof typeof FEATURE_PATHS

export function FeatureGlyph({ name }: { name: FeatureIcon }) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path d={FEATURE_PATHS[name]} />
    </svg>
  )
}

export function Check({ className }: { className?: string }) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

export function Play({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <path
        fill="#FFF"
        d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742zm0 0"
      />
    </svg>
  )
}

export function Triangle() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="mr-1 inline-block" aria-hidden>
      <path
        d="M5.0957 0H0.376033C0.041944 0 -0.125369 0.403928 0.110868 0.640165L4.83054 5.35983C5.06677 5.59607 5.4707 5.42876 5.4707 5.09467V0.375C5.4707 0.167893 5.30281 0 5.0957 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
