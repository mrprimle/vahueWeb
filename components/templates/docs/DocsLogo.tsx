import type { DocsContent } from './content'
import s from './docs.module.css'

export default function DocsLogo({ content, drawer }: { content: DocsContent; drawer?: boolean }) {
  if (content.wordmark)
    return (
      <span className={s.wordmark}>
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
          <circle cx="7" cy="7" r="7" fill="currentColor" />
        </svg>
        {content.wordmark}
      </span>
    )
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`${s.logoImg} ${s.logoLight} ${drawer ? s.logoDrawer : ''}`} src={content.logo.light} alt={`light ${content.logo.alt}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`${s.logoImg} ${s.logoDark} ${drawer ? s.logoDrawer : ''}`} src={content.logo.dark} alt={`dark ${content.logo.alt}`} />
    </>
  )
}
