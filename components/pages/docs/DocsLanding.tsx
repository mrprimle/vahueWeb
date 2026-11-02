'use client'

import { useRouter } from 'next/navigation'
import { LinkIcon } from './DocsIcons'
import { DocsPagination } from './DocsPagination'
import type { DocsContent } from './content.types'

export function DocsLanding({ content }: { content: DocsContent }) {
  const router = useRouter()
  const { landing } = content

  // Mintlify copies the heading URL and sets the hash when the heading is clicked.
  const onHeading = () => {
    const url = `${window.location.origin}${window.location.pathname}#${landing.headingId}`
    navigator.clipboard?.writeText(url).catch(() => undefined)
    window.history.pushState(null, '', `#${landing.headingId}`)
    document.getElementById(landing.headingId)?.scrollIntoView()
  }

  return (
    <>
      <header id="header" className="docs-page-header">
        <div className="docs-page-title-wrap">
          <h1 id="page-title" className="docs-page-title">
            {landing.title}
          </h1>
        </div>
        <div className="docs-page-lead">
          <p>{landing.lead}</p>
        </div>
      </header>
      <div className="docs-mdx" id="content">
        <h1 className="docs-mdx-h1" id={landing.headingId}>
          <div style={{ position: 'absolute' }} tabIndex={-1}>
            <a href={`#${landing.headingId}`} className="docs-anchor" aria-label="Navigate to header">
              <span className="docs-anchor-box">
                <LinkIcon strokeWidth={2} />
              </span>
            </a>
          </div>
          <span className="txt" onClick={onHeading}>
            {landing.heading}
          </span>
        </h1>
        <span className="docs-mdx-p">{landing.body}</span>
        <div className="docs-cards">
          {landing.cards.map((card) => (
            <div
              key={card.title}
              className="docs-card"
              role="link"
              tabIndex={0}
              aria-label={card.title}
              onClick={() => router.push(card.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') router.push(card.href)
              }}
            >
              <div className="docs-card-box">
                <h2 className="docs-card-title">{card.title}</h2>
                <div className="docs-card-body">
                  <span>{card.body}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DocsPagination next={landing.next} />
    </>
  )
}
