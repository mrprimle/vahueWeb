import Link from 'next/link'
import { WORKFLOWS } from '@/lib/automation-content'
import { Chevron } from './FlatCta'
import { SectionHeader } from './StaticSections'
import { Check, WorkflowIcon } from './icons'
import s from './hub.module.css'

// The six workflows. Clone: "Supported labelling types" cards (AnnotationTypes.tsx); 4-up becomes 3-up at xl for six cards.
export default function WorkflowGrid() {
  return (
    <section id="workflows" className="scroll-mt-24 pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          className="mb-10"
          over="Workflows"
          title="Six workflows we take off your team"
          sub="Pick the one with the most volume. Each page shows the before and after, the steps and the guardrails."
        />
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {WORKFLOWS.map((w) => (
            <li key={w.slug} className="flex">
              <Link
                href={`/automations/${w.slug}/`}
                className="group flex min-h-[320px] w-full flex-col rounded-xl border border-border-soft bg-white/[0.04] p-6 transition-colors duration-300 ease-out hover:border-border-strong hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:p-8"
              >
                <div className="min-h-[136px]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.08] text-white">
                    <span className="flex h-6 w-6 items-center justify-center">
                      <WorkflowIcon slug={w.slug} />
                    </span>
                  </div>
                  <h3 className={`${s.header5} mt-8 font-normal text-white`}>{w.label}</h3>
                  <p className={`${s.body2} mt-3 text-white/60`}>{w.headline}</p>
                </div>
                <ul className="mt-6 space-y-4">
                  {w.after.map((item) => (
                    <li key={item} className={`${s.body2} flex items-start gap-3 text-white/60`}>
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1 pt-8 text-[14px] font-medium tracking-[-0.01em] text-white/85 transition-colors duration-300 ease-out group-hover:text-white">
                  See the workflow
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    <Chevron />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
