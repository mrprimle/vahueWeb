'use client'

import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/lib/case-studies'
import { blogPosts } from '@/components/engineering/BlogSection'
import Reveal, { Eyebrow } from './Reveal'

/* ---------- Delivery outcomes (light, ruled list of every case study) ---------- */

export function Outcomes() {
  return (
    <section data-nav-theme="light" className="home-light bg-white py-24 text-[#17191c] md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Delivery outcomes</Eyebrow>
            <h2 className="max-w-3xl font-display text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em] md:text-6xl">
              Shipped, measured and still running.
            </h2>
          </div>
          <Link
            href="/case-studies/"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-[10px] border border-[#c3c8cf] px-5 py-3 text-[14px] transition-colors hover:border-[#17191c] md:self-auto"
          >
            All case studies <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>

        <ul className="mt-14 border-t border-[#e3e6ea]">
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={Math.min(i, 5) * 60} className="border-b border-[#e3e6ea]">
              <Link
                href={`/case-studies/${c.slug}/`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 transition-colors hover:bg-[#f5f6f7] md:grid-cols-[220px_1fr_200px_32px] md:px-3"
              >
                <span className="font-display text-2xl font-light tracking-[-0.01em] md:text-[1.75rem]">{c.metric}</span>
                <span className="col-span-2 row-start-2 text-[15px] leading-relaxed text-[#4a505a] md:col-span-1 md:row-start-auto">
                  <span className="font-medium text-[#17191c]">{c.client}.</span> {c.title}
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-[#6a707a] md:block">{c.service}</span>
                <span aria-hidden className="col-start-2 row-start-1 text-right text-[#9aa1ab] transition-transform group-hover:translate-x-1 group-hover:text-[#17191c] md:col-start-auto md:row-start-auto">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Journal (dark, latest three posts) ---------- */

export function Journal() {
  const posts = blogPosts.slice(0, 3)
  return (
    <section className="bg-[#101112] py-24 text-white md:py-32">
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow dark>From the blog</Eyebrow>
            <h2 className="max-w-3xl font-display text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em] md:text-6xl">
              Notes from the work.
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-[10px] border border-white/20 px-5 py-3 text-[14px] transition-colors hover:border-white/50 md:self-auto"
          >
            All articles <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 110}>
              <Link href={`${p.href}/`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.03]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                  {p.category} · {p.date}
                </p>
                <h3 className="mt-3 font-display text-xl font-light leading-snug md:text-2xl">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
