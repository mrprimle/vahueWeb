'use client'

// Holds the chrome for the 39 sub-pages left out of this clone, see docs/specs/docs.md. Not a clone of those pages.
import { usePathname } from 'next/navigation'
import { DocsPagination } from './DocsPagination'
import { resolvePage } from './DocsNav'
import type { DocsContent } from './content.types'

export function DocsStub({ content }: { content: DocsContent }) {
  const pathname = usePathname()
  const page = resolvePage(content, pathname)
  return (
    <>
      <header id="header" className="docs-page-header">
        {page.eyebrow ? <span className="docs-eyebrow">{page.eyebrow}</span> : null}
        <div className="docs-page-title-wrap">
          <h1 id="page-title" className="docs-page-title">
            {page.title}
          </h1>
        </div>
      </header>
      <div className="docs-mdx" id="content">
        <div className="docs-stub-note" id={page.anchor}>
          <span className="docs-tag">{content.ui.placeholderTag}</span>
          {page.isApi ? content.stub.apiNote : content.stub.docsNote}
        </div>
      </div>
      <DocsPagination prev={page.prev} next={page.next} />
    </>
  )
}
