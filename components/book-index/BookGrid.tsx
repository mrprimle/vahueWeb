import Link from 'next/link'
import s from './book-index.module.css'

/*
 * Book grid (template: components/scale-clone/guides/GuidesPage.tsx). 1 / sm 2 / lg 3 / xl 4 columns,
 * gap 32px, 280x376 "book" cards with the pure-CSS page-turn hover (rotateY(-30deg) at perspective
 * 2000px, 0.3s ease-out). Scale's five cover colours are replaced by a Vahue cycle of dark surfaces
 * and primary-blue tints; the brand tile on each cover is the Vahue circle.
 */

// Vahue cover cycle: book n uses COVERS[n % 5]. Graphite, deep primary tint, dark-surface navy,
// mid primary tint, charcoal. Single-hue blues only (no blue + purple pairing, per DESIGN.md).
export const COVERS = ['#141416', '#0A2540', '#16162A', '#0D3A66', '#1E2128']

export type Book = {
  href: string
  title: string
  /** Short mono label printed at the foot of the cover (category, service, disclosure). */
  label: string
  /** Optional verified metric shown above the title (case studies). */
  metric?: string
}

export default function BookGrid({ books, ariaLabel }: { books: Book[]; ariaLabel: string }) {
  return (
    <section className="pb-20" aria-label={ariaLabel}>
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book, i) => (
            <li key={book.href}>
              <Link href={book.href} className={s.book}>
                <div className={s.bookCover} style={{ backgroundColor: COVERS[i % COVERS.length] }}>
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-left">
                    <div className="flex items-start justify-between">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/img/white-circle.svg" alt="" aria-hidden="true" width={20} height={20} className="h-5 w-5" />
                      <span className={`${s.detailMono} font-mono text-white/50`}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {book.metric ? (
                        <p className="font-display text-[28px] font-light leading-none text-white">{book.metric}</p>
                      ) : null}
                      <h3 className={`${s.header5} font-display font-normal text-white`}>{book.title}</h3>
                      <p className={`${s.detailMono} font-mono text-white/50`}>{book.label}</p>
                    </div>
                  </div>
                  <div className={s.effect} />
                  <div className={s.light} />
                </div>
                <div className={s.bookInside} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
