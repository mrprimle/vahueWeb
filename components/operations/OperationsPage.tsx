import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'
import { operationsContent } from './content'
import { AuditLog, MonthlyReport, PhaseTrack, ReviewQueue, Rings } from '@/components/enterprise-vahue/Media'
import { OperateLoop } from './Media'

/*
 * /operations ("How we operate") on the scale.com/enterprise layout (template clone: components/scale-clone/enterprise,
 * spec reference-snapshots/scale-clone/enterprise.md). Composed, not forked: Vahue content and own visuals go in
 * through EnterprisePage's `content` and `media`. Strict parity with the clone: all 12 sections in Scale's order and
 * Scale's own colours (the --ent-* tokens stay at the clone defaults); Vahue fonts and logo.
 *
 * Section mapping (clone -> page): hero graph -> systems the agents work in; pull-apart -> why we stay after launch;
 * bridge -> positioning + named clients; blog carousel -> workflows; logo cloud -> named clients; stats -> verified
 * case results; testimonials -> verified case summaries; race -> measured from day one; pillars -> Audit, Pilot,
 * Operate; powered by -> review queues and approvals; built to be trusted -> access, audit log, deployment; pre-footer.
 */

export default function OperationsPage() {
  return (
    // The site navbar is sticky (88px; light on this route, see Navbar.tsx): pull the full-viewport hero up under it,
    // as Scale's overlay header sits over its hero.
    <div className="-mt-[88px] bg-white text-black">
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
