// https://scale.com/guides. Server-rendered on Scale as well: only the pre-footer is a client component.
import Link from 'next/link'
import { Logo } from '@/components/site/Logo'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import styles from './Book.module.css'
import type { GuidesContent } from './types'

export function GuidesPage({ content: c }: { content: GuidesContent }) {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono text-[#525252]">
                  <span>{c.intro.overtitle}</span>
                </div>
                <h1 className="font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance] text-black">{c.intro.title}</h1>
              </div>
              <p className="mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal w-full text-black/70">{c.intro.body}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {c.books.map((book) => (
              <Link key={book.key} href={book.href} className={styles.book}>
                <div className={styles.bookCover} style={{ background: book.background }}>
                  <div className="absolute inset-0 text-left flex flex-col justify-between p-8">
                    <div className="flex items-start justify-between">
                      <Logo className="text-white" />
                      <span className="detail-mono text-white/50">{book.number}</span>
                    </div>
                    <h3 className="header5-regular text-white text-balance">{book.title}</h3>
                  </div>
                  <div className={styles.effect} />
                  <div className={styles.light} />
                </div>
                <div className={styles.bookInside} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="pb-8">
        <FullBleedMediaSection headline={c.prefooter.headline} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={c.prefooter.image} />
      </div>
    </div>
  )
}
