import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'
import { operationsContent } from './content'
import { AuditLog, MonthlyReport, PhaseTrack, ReviewQueue, Rings } from '@/components/enterprise-vahue/Media'
import { VAHUE_ENTERPRISE_THEME } from '@/components/enterprise-vahue/theme'
import { OperateLoop } from './Media'

/*
 * /operations ("How we operate") on the scale.com/enterprise layout (template clone: components/scale-clone/enterprise,
 * spec reference-snapshots/scale-clone/enterprise.md). Composed, not forked: Vahue content + own visuals go in
 * through EnterprisePage's `content` and `media`, and the layout's colour tokens are set to the Vahue dark palette.
 *
 * Section mapping (clone -> page): hero graph -> systems the agents work in; pull-apart -> why we stay after launch;
 * bridge -> positioning + what Operate covers; blog carousel -> workflows; logo cloud -> integrations sphere;
 * stats -> verified Vahue case results; race -> monthly report; pillars -> Audit, Pilot, Operate;
 * powered by -> review queues and approvals; built to be trusted -> access, audit log, deployment; pre-footer CTA.
 * Dropped: testimonials (no verified quotes to show). Theme and shared visuals: components/enterprise-vahue/.
 */

export default function OperationsPage() {
  return (
    // The site navbar is sticky (88px) and transparent at the top: pull the full-viewport hero up under it,
    // as Scale's overlay header sits over its hero.
    <div className="-mt-[88px] bg-bg text-white" style={VAHUE_ENTERPRISE_THEME}>
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
