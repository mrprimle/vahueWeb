import Link from 'next/link'
import { SectionHeader } from './StaticSections'
import { Check, WorkflowIcon } from './icons'
import s from './hub.module.css'

/*
 * Clone: "Supported labelling types" (AnnotationTypes.tsx): 4 cards (xl 4-up), icon tile, title, check list of
 * 4 / 3 / 2 / 1 items. Vahue: the four kinds of input our workflows take, items from lib/automation-content.ts
 * WORKFLOWS summaries. Each title links to the workflow page that covers it.
 */
const TYPES: { title: string; slug: string; items: string[] }[] = [
  { title: 'Documents', slug: 'document-intake', items: ['Invoices and Purchase Orders', 'Claims and Lab Reports', 'Supplier Sheets', 'Contracts'] },
  { title: 'System Records', slug: 'back-office-sync', items: ['Orders and Onboarding', 'Approvals', 'Reconciliations'] },
  { title: 'Conversations', slug: 'support-agents', items: ['Customer Chat and Voice', 'Staff Questions'] },
  { title: 'Decisions', slug: 'scoring-decisions', items: ['Scoring and Routing'] },
]

export default function WorkflowGrid() {
  return (
    <section id="workflows" className="scroll-mt-24 pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader className="mb-10" over="Workflows" title="Supported Workflow Types" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TYPES.map((t) => (
            <article key={t.title} className="flex min-h-[320px] flex-col rounded-xl bg-white p-6 md:p-8">
              <div className="min-h-[136px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#212121]">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <WorkflowIcon slug={t.slug} />
                  </span>
                </div>
                <h3 className={`${s.header5} mt-8 font-normal text-[#212121]`}>
                  <Link href={`/automations/${t.slug}/`} className="hover:underline focus-visible:underline">
                    {t.title}
                  </Link>
                </h3>
              </div>
              <ul className="space-y-4">
                {t.items.map((item) => (
                  <li key={item} className={`${s.body2} flex items-start gap-3 text-[#575757]`}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#212121]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
