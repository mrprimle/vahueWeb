import Link from 'next/link'

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 3 6" aria-hidden style={flip ? undefined : { rotate: '180deg' }}>
    <path d="M3 0L0 3L3 6" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function DocsPagination({ prev, next }: { prev?: { title: string; href: string }; next?: { title: string; href: string } }) {
  return (
    <nav id="pagination" aria-label="Pagination" className="docs-pagination">
      {prev ? (
        <Link href={prev.href} rel="prev" aria-label={`Previous: ${prev.title}`}>
          <Chevron flip />
          <span className="t">{prev.title}</span>
        </Link>
      ) : null}
      {next ? (
        <Link href={next.href} rel="next" aria-label={`Next: ${next.title}`} className="next">
          <span className="t">{next.title}</span>
          <Chevron />
        </Link>
      ) : null}
    </nav>
  )
}
