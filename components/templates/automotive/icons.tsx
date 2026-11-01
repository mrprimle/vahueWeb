// Icons used on scale.com/automotive (react-icons Material set, as shipped by Scale) and the play glyph.

const Md = ({ d, size = 22, className = '' }: { d: string | string[]; size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
    {(Array.isArray(d) ? d : [d]).map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
)

export const Check = ({ className = '' }: { className?: string }) => (
  <Md className={className} size={12} d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
)

// MdOutlineWhatshot
export const Flame = () => (
  <Md d="M11.57 13.16c-1.36.28-2.17 1.16-2.17 2.41 0 1.34 1.11 2.42 2.49 2.42 2.05 0 3.71-1.66 3.71-3.71 0-1.07-.15-2.12-.46-3.12-.79 1.07-2.2 1.72-3.57 2zM13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.3-3.04.86-4.43a5.582 5.582 0 0 0 3.97 1.63c2.66 0 4.75-1.83 5.28-4.43A14.77 14.77 0 0 1 18 14c0 3.31-2.69 6-6 6z" />
)

// MdSpeed
export const Gauge = () => (
  <Md
    d={[
      'm20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z',
      'M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z',
    ]}
  />
)

// MdOfflineBolt-like bolt
export const Bolt = () => (
  <Md d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z" />
)

export const Play = () => (
  <svg width="24" height="24" viewBox="0 0 60 60" aria-hidden="true">
    <path
      fill="#FFF"
      d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742z"
    />
  </svg>
)
