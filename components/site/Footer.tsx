'use client'

// Port of Scale's footer (module 260646, chunk 2psemgdyngpil.js).
import { Fragment } from 'react'
import { cn } from './lib/cn'
import { LogoMark } from './Logo'
import { CMSLink } from './shared/CMSLink'
import type { FooterContent } from './content.types'

const PORTRAIT_STARTS = ['portrait:md:max-lg:col-start-2', 'portrait:md:max-lg:col-start-5', 'portrait:md:max-lg:col-start-8']
const LG_START: Record<number, string> = { 1: 'lg:col-start-10', 2: 'lg:col-start-8', 3: 'lg:col-start-6', 4: 'lg:col-start-4', 5: 'lg:col-start-2', 6: 'lg:col-start-1' }
const LANDSCAPE_START: Record<number, string> = {
  1: 'landscape:md:max-lg:col-start-10',
  2: 'landscape:md:max-lg:col-start-8',
  3: 'landscape:md:max-lg:col-start-6',
  4: 'landscape:md:max-lg:col-start-4',
  5: 'landscape:md:max-lg:col-start-2',
  6: 'landscape:md:max-lg:col-start-1',
}

function LinkList({ index, total, title, links }: { index: number; total: number; title: string; links: FooterContent['linkLists'][number]['links'] }) {
  return (
    <div
      className={cn(
        'col-span-full flex min-w-0 flex-col gap-4',
        'portrait:md:max-lg:col-span-3 landscape:md:max-lg:col-span-2 lg:col-span-2 oml:col-span-3',
        PORTRAIT_STARTS[index % 3],
        index === 0 && (LG_START[total] ?? 'lg:col-start-1'),
        index === 0 && (LANDSCAPE_START[total] ?? 'landscape:md:max-lg:col-start-1'),
        index !== 0 && 'lg:col-start-auto landscape:md:max-lg:col-start-auto',
      )}
    >
      <p className="detail-mono text-scale-gray-30">{title}</p>
      <div className="min-w-0 list">
        {links.map((l, i) => (
          <CMSLink href={l.href} className="block max-w-full cta w-fit" key={i}>
            {l.text}
          </CMSLink>
        ))}
      </div>
    </div>
  )
}

function SocialIcon({ icon }: { icon: 'linkedin' | 'x' }) {
  if (icon === 'x') {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="flex flex-col gap-12 pt-8 pb-6 text-white bg-black md:gap-32 md:pt-40 Footer oml:gap-8 oml:pt-24">
      <div className="relative mb-8 top gap-y-10 grid-layout-mobile md:mb-0 md:grid-layout-desktop portrait:md:max-lg:gap-y-[40px] landscape:md:max-lg:gap-y-0 lg:gap-y-0 oml:grid-layout-desktop">
        <div className="absolute logo right-8 md:right-auto md:block md:col-start-1 md:col-span-1">
          <LogoMark size={24} className="text-white" />
        </div>
        {content.linkLists.map((list, i) => (
          <LinkList index={i} total={content.linkLists.length} title={list.title} links={list.links} key={i} />
        ))}
      </div>
      <div className="center grid-layout-mobile md:grid-layout-desktop">
        <p className="col-span-full header1 md:text-[7.25rem] leading-none oml:text-[4rem]">{content.title}</p>
      </div>
      <div className="flex flex-col justify-between gap-12 md:items-center md:flex-row bottom grid-padding">
        <div className="flex gap-2 socials">
          {content.socials.map((s) => (
            <CMSLink className="relative w-12 h-12 p-4 rounded-md bg-scale-gray-10" href={s.href} label={s.name} key={s.name} aria-label={s.name}>
              <div className="relative w-full h-full origin-center" style={{ aspectRatio: '1' }}>
                <SocialIcon icon={s.icon} />
              </div>
            </CMSLink>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-right">
          <p className="detail-mono text-scale-gray-30">
            {content.cookiesPrefix} <button type="button" className="underline uppercase cursor-pointer">{content.cookiesLink}</button>
          </p>
          <div className="flex flex-col-reverse gap-2 small-print text-scale-gray-30 md:flex-row">
            <p className="detail-mono">{content.smallPrint}</p>
            <div className="detail-mono">
              {content.tos.map((t, i) => (
                <Fragment key={t.href}>
                  {i > 0 ? content.tosJoiner : null}
                  <CMSLink href={t.href} className="underline">
                    {t.label}
                  </CMSLink>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
