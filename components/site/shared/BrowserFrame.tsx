// Scale module 720912: the browser window around a screenshot. Scale's `url` defaults to its own product host, so here the page passes it.
import type { ReactNode } from 'react'

export function BrowserFrame({ url, children, className }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] ${className ?? ''}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 10" className="w-10 h-auto" aria-hidden="true">
          <circle cx="5" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
          <circle cx="20" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
          <circle cx="35" cy="5" r="5" fill="rgba(255,255,255,0.2)" />
        </svg>
        {url ? <span className="text-xs text-white/40">{url}</span> : null}
      </div>
      {children}
    </div>
  )
}
