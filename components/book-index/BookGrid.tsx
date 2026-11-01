import Link from 'next/link'
import s from './book-index.module.css'

/*
 * Book grid (template: components/templates/guides/GuidesPage.tsx). 1 / sm 2 / lg 3 / xl 4 columns,
 * gap 32px, 280x376 "book" cards with the pure-CSS page-turn hover (rotateY(-30deg) at perspective
 * 2000px, 0.3s ease-out). Scale's cover colours in Scale's order; each cover carries what Scale's does:
 * the 80x20 brand mark (the Vahue logo here), the index number and the title.
 */

// Scale's cover cycle: book n uses COVERS[n % 5] (scale-gray-10, evergreen, atlas-blue, violet, sand).
export const COVERS = ['#212121', '#193A29', '#273252', '#79648C', '#A8927C']

export type Book = {
  href: string
  title: string
}

// Vahue logo (circle + wordmark, as in the site navbar) in the 80x20 slot of Scale's cover mark.
function CoverMark() {
  return (
    <span aria-hidden="true" className="flex h-5 w-20 items-center gap-1.5 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/white-circle.svg" alt="" width={12} height={12} className="h-3 w-3" />
      <span className="font-display text-[15px] font-bold leading-none tracking-tight">vahue.ai</span>
    </span>
  )
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
                      <CoverMark />
                      <span className={`${s.detailMono} font-mono text-white/50`}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={`${s.header5} font-display font-normal text-white`}>{book.title}</h3>
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
