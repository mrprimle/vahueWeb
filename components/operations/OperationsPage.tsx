import type { CSSProperties } from 'react'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'
import { operationsContent } from './content'
import { AuditLog, MonthlyReport, OperateLoop, PhaseTrack, ReviewQueue, Rings } from './Media'

/*
 * /operations ("How we operate") on the scale.com/enterprise layout (template clone: components/scale-clone/enterprise,
 * spec reference-snapshots/scale-clone/enterprise.md). Composed, not forked: Vahue content + own visuals go in
 * through EnterprisePage's `content` and `media`, and the layout's colour tokens are set to the Vahue dark palette.
 *
 * Section mapping (clone -> page): hero graph -> systems the agents work in; pull-apart -> why we stay after launch;
 * bridge -> positioning + what Operate covers; blog carousel -> workflows; logo cloud -> integrations sphere;
 * stats -> verified Vahue case results; race -> monthly report; pillars -> Audit, Pilot, Operate;
 * powered by -> review queues and approvals; built to be trusted -> access, audit log, deployment; pre-footer CTA.
 * Dropped: testimonials (no verified quotes to show).
 */

// Vahue dark palette for the layout's tokens (Scale's light values are the fallbacks inside the clone).
const THEME = {
  '--ent-bg': '#020202',
  '--ent-fg': '#ffffff',
  '--ent-fg-2': 'rgba(255,255,255,0.7)',
  '--ent-band': '#0b0b0b',
  '--ent-band-2': '#111111',
  '--ent-card': '#161616',
  '--ent-card-2': '#0e0e0e',
  '--ent-accent': '#141414',
  '--ent-line': 'rgba(255,255,255,0.12)',
  '--ent-edge': 'rgba(255,255,255,0.22)',
  '--ent-icon': '#ffffff',
  '--ent-cta-gray': 'rgba(255,255,255,0.1)',
  '--ent-mark': 'rgba(255,255,255,0.6)',
  '--ent-dot-on': '#ffffff',
  '--ent-dot-off': 'rgba(255,255,255,0.3)',
  '--ent-cloud-tile': '#1e1e1e',
  '--ent-cloud-ink': '#ffffff',
  '--ent-cloud-line': '#5c5c5c',
  '--ent-cloud-band': '#ffffff',
} as CSSProperties

export default function OperationsPage() {
  return (
    // The site navbar is sticky (88px) and transparent at the top: pull the full-viewport hero up under it,
    // as Scale's overlay header sits over its hero.
    <div className="-mt-[88px] bg-bg text-white" style={THEME}>
      <SmoothScroll />
      <EnterprisePage
        content={operationsContent}
        media={{
          bridge: <OperateLoop />,
          race: <MonthlyReport />,
          pillars: <PhaseTrack />,
          poweredBy: <ReviewQueue />,
          trusted: <AuditLog />,
          prefooter: <Rings />,
        }}
      />
    </div>
  )
}
