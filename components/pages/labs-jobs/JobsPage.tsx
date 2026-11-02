// labs.scale.com/jobs, server-rendered in the page's flight payload. Class strings verbatim. No reveal and no Lenis on this route.
// Desktop and mobile rows are separate links, each hidden at the other's width; the mobile arrow has no hover nudge.
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import type { LabsJobsContent } from './types'

const COL = 'text-xs font-sans text-ink font-semibold flex items-center gap-1.5 uppercase'

function Dot() {
  return <span className="w-1 h-1 bg-ink rounded-full inline-block shrink-0" />
}

export function JobsPage({ content }: { content: LabsJobsContent }) {
  const c = content.columns
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">
      <div>
        <h1 className="text-xs font-sans font-medium text-ink mb-2 tracking-wide uppercase">{content.heading}</h1>
        <p className="text-xs font-sans text-neutral-500 mb-10 max-w-xl">{content.blurb}</p>
        <div className="hidden md:grid grid-cols-[100px_1fr_1fr_24px] gap-x-4 pb-3 border-b border-ink">
          <span className={COL}>
            <Dot /> {c.date}
          </span>
          <span className={COL}>
            <Dot /> {c.position}
          </span>
          <span className={COL}>
            <Dot /> {c.location}
          </span>
          <span />
        </div>
        <div className="grid grid-cols-[1fr_24px] gap-x-3 pb-3 border-b border-ink md:hidden">
          <span className="text-xs font-sans text-ink font-semibold flex items-center gap-1 uppercase">
            <Dot /> {c.position}
          </span>
          <span />
        </div>
        {content.items.map((job) => (
          <Link key={job.title} href={job.href} target="_blank" rel="noopener noreferrer" className="hidden md:grid grid-cols-[100px_1fr_1fr_24px] gap-x-4 py-3 border-b border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer group">
            <span className="text-xs font-mono text-neutral-500">{job.date}</span>
            <span className="text-xs font-sans text-ink font-medium uppercase">{job.title}</span>
            <span className="text-xs font-sans text-neutral-500 uppercase">{job.location}</span>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </Link>
        ))}
        {content.items.map((job) => (
          <Link key={`m-${job.title}`} href={job.href} target="_blank" rel="noopener noreferrer" className="grid grid-cols-[1fr_24px] gap-x-3 py-3 border-b border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer group md:hidden">
            <div>
              <span className="text-xs font-sans text-ink font-medium uppercase block">{job.title}</span>
              <span className="text-xs font-sans text-neutral-500 mt-0.5 block">
                {job.location} · <span className="font-mono">{job.date}</span>
              </span>
            </div>
            <span className="flex items-center justify-end">
              <ArrowDown className="w-3.5 h-3.5 text-neutral-500" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
