import { ArrowDown } from '@/components/scale-clone/labs-shared/icons'
import s from '@/components/scale-clone/labs-shared/labs.module.css'
import type { LabsJobsContent } from './content'

/*
 * 1:1 clone of https://labs.scale.com/jobs: labs' `JobsList` (chunk 0yqh0pl17sga4.js, module 163195), rendered as
 * the only child of <main class="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">. No state, no ScrollReveal, no Lenis.
 *   jobs = greenhouseJobs.length ? greenhouseJobs : fallback list `n`
 *   date = `${MM}.${DD}.${YYYY}` of updated_at in UTC (labs' `r()`)
 *   two lists: md+ grid rows (100px / 1fr / 1fr / 24px) and <md stacked rows (1fr / 24px), each an
 *   <a target="_blank" rel="noopener noreferrer"> to the Greenhouse posting (Next Link to an external URL: the
 *   browser handles it, no prefetch). Hover: bg neutral-50 (200 ms via the html.loaded override) and, md+ only, the
 *   ArrowDown nudges 2 px down (labs v4 group-hover:translate-y-0.5 = `translate: 0 2px`, instant because the override drops transform).
 * Labs' Tailwind v4 text-xs is 12px / 1.5, so line heights are explicit here (repo is Tailwind 3).
 * Spec: reference-snapshots/scale-clone/labs-jobs.md
 */

function fmt(iso: string) {
  const d = new Date(iso)
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${mm}.${dd}.${d.getUTCFullYear()}`
}

function Dot() {
  return <span className="w-1 h-1 bg-[color:var(--color-ink)] rounded-full inline-block shrink-0" />
}

const XS = 'text-[12px] leading-[1.5]'
const HEAD = `${XS} ${s.sans} text-[color:var(--color-ink)] font-semibold flex items-center uppercase`
// The Vahue globals set `a { outline: 2px solid transparent }`; labs keeps the UA focus ring (auto 1px, offset 1px).
const ROW =
  'border-b border-[#e5e5e5] hover:bg-[#fafafa] transition-colors cursor-pointer group focus-visible:[outline:auto_1px_-webkit-focus-ring-color] focus-visible:[outline-offset:1px]'

export default function LabsJobs({ content }: { content: LabsJobsContent }) {
  const jobs = content.greenhouseJobs.length > 0 ? content.greenhouseJobs : content.fallbackJobs
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
      <div>
        <h1 className={`${XS} ${s.sans} font-medium text-[color:var(--color-ink)] mb-2 tracking-[0.025em] uppercase`}>{content.title}</h1>
        <p className={`${XS} ${s.sans} text-[#737373] mb-10 max-w-xl`}>{content.intro}</p>

        <div className="hidden md:grid grid-cols-[100px_1fr_1fr_24px] gap-x-4 pb-3 border-b border-[color:var(--color-ink)]">
          <span className={`${HEAD} gap-1.5`}>
            <Dot /> Date
          </span>
          <span className={`${HEAD} gap-1.5`}>
            <Dot /> Position
          </span>
          <span className={`${HEAD} gap-1.5`}>
            <Dot /> Location
          </span>
          <span />
        </div>
        <div className="grid grid-cols-[1fr_24px] gap-x-3 pb-3 border-b border-[color:var(--color-ink)] md:hidden">
          <span className={`${HEAD} gap-1`}>
            <Dot /> Position
          </span>
          <span />
        </div>

        {jobs.map((j) => (
          <a
            key={j.id}
            href={j.absolute_url}
            target="_blank"
            rel="noopener noreferrer"
            data-job-row="md"
            className={`hidden md:grid grid-cols-[100px_1fr_1fr_24px] gap-x-4 py-3 ${ROW}`}
          >
            <span className={`${XS} ${s.mono} text-[#737373]`}>{fmt(j.updated_at)}</span>
            <span className={`${XS} ${s.sans} text-[color:var(--color-ink)] font-medium uppercase`}>{j.title}</span>
            <span className={`${XS} ${s.sans} text-[#737373] uppercase`}>{j.location.name}</span>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-[#737373] group-hover:[translate:0_2px] transition-transform" />
            </span>
          </a>
        ))}
        {jobs.map((j) => (
          <a
            key={`m-${j.id}`}
            href={j.absolute_url}
            target="_blank"
            rel="noopener noreferrer"
            data-job-row="sm"
            className={`grid grid-cols-[1fr_24px] gap-x-3 py-3 ${ROW} md:hidden`}
          >
            <div>
              <span className={`${XS} ${s.sans} text-[color:var(--color-ink)] font-medium uppercase block`}>{j.title}</span>
              <span className={`${XS} ${s.sans} text-[#737373] mt-0.5 block`}>
                {j.location.name} · <span className={s.mono}>{fmt(j.updated_at)}</span>
              </span>
            </div>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-[#737373]" />
            </span>
          </a>
        ))}
        {jobs.length === 0 && <p className={`${XS} ${s.sans} text-[#737373] py-10 text-center`}>{content.empty}</p>}
      </div>
    </div>
  )
}
