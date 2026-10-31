import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'
import { AuditLog, MonthlyReport, PhaseTrack, Pipeline, ReviewQueue, Rings } from '@/components/enterprise-vahue/Media'
import { VAHUE_ENTERPRISE_THEME } from '@/components/enterprise-vahue/theme'
import { buildIndustryContent, type IndustryConfig } from './build'

/*
 * Industry landing on the scale.com/enterprise layout (template clone: components/scale-clone/enterprise, spec
 * reference-snapshots/scale-clone/enterprise.md), the same composition as /operations: EnterprisePage with Vahue
 * content and own visuals, on the Vahue dark tokens. Used by /industries/banking-financial-services,
 * /industries/retail-ecommerce and /industries/distribution-manufacturing (configs in this folder).
 *
 * Section mapping (clone -> page): hero graph -> systems the agents work in; pull-apart -> the industry problem and
 * the answer; bridge -> positioning + controls, with a pipeline visual; blog carousel -> the industry workflows,
 * each linked to its /automations page; logo cloud -> integrations; stats -> three verified Vahue cases;
 * race -> monthly report; pillars -> Audit, Pilot, Operate; powered by -> review queue with industry items;
 * built to be trusted -> audit log with industry lines; pre-footer CTA.
 * Dropped: testimonials (no verified quotes).
 */
export default function EnterpriseIndustryPage({ config }: { config: IndustryConfig }) {
  return (
    // The site navbar is sticky (88px) and transparent at the top: pull the full-viewport hero up under it.
    <div className="-mt-[88px] bg-bg text-white" style={VAHUE_ENTERPRISE_THEME}>
      <SmoothScroll />
      <EnterprisePage
        content={buildIndustryContent(config)}
        media={{
          bridge: <Pipeline inputs={config.pipeline.inputs} target={config.pipeline.target} />,
          race: <MonthlyReport />,
          pillars: <PhaseTrack />,
          poweredBy: <ReviewQueue rows={config.queue} />,
          trusted: <AuditLog lines={config.log} />,
          prefooter: <Rings />,
        }}
      />
    </div>
  )
}
