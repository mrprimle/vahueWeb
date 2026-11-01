'use client'

import type { DemoContent } from './content'
import DemoForm from './DemoForm'
import QuoteSidebar from './QuoteSidebar'
import s from './demo.module.css'

/**
 * scale.com/demo ("Contact us") layout, driven entirely by `content` (see content.ts for the contract and Scale's copy).
 * Page tree (RSC payload): PageTheme light -> Navigation -> main > section.pt-24!.py-[72px].md:py-[120px]
 *   > container max-w-[1472px] px-6 > grid lg:[minmax(0,1.1fr)_minmax(360px,0.9fr)] gap-4 items-start
 *     left  : div.flex.flex-col.gap-10.p-2.md:p-4 > (h1 header3-regular + p body2-regular, gap-3) + StaticForm (theme light)
 *     right : DemoQuoteSidebar
 * Colours come from the --demo-* tokens (demo.module.css); pass `className` to override them for another theme.
 * Spec: reference-snapshots/scale-clone/demo.md
 */
export default function DemoPage({
  content,
  className = '',
  onSubmit,
  as: Root = 'main',
}: {
  content: DemoContent
  className?: string
  /** May return a promise; see DemoForm. */
  onSubmit?: (values: Record<string, string | string[]>) => void | Promise<unknown>
  /** Root element; 'div' when the host layout already renders <main>. */
  as?: 'main' | 'div'
}) {
  return (
    <Root className={`${s.root} min-h-screen overflow-x-hidden font-display ${className}`}>
      <section className="pb-[72px] pt-24 md:pb-[120px]">
        <div className="mx-auto w-full max-w-[1472px] pe-6 ps-6">
          <div className={s.grid}>
            <div className="flex flex-col gap-10 p-2 md:p-4">
              <div className="flex flex-col gap-3">
                <h1 className={`${s.heading} m-0`}>{content.heading}</h1>
                <p className={`${s.intro} m-0`}>{content.intro}</p>
              </div>
              <DemoForm form={content.form} onSubmit={onSubmit} />
            </div>
            <QuoteSidebar sidebar={content.sidebar} />
          </div>
        </div>
      </section>
    </Root>
  )
}
