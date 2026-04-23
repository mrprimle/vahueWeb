'use client'

import Link from 'next/link'
import type { ReactElement, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const FinanceIcon = (p: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <rect
      x="2.535"
      y="2.036"
      width="14.929"
      height="14.929"
      rx="3.393"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.555 7.204v5.742M10 6.056v6.89M13.445 9.5v3.445"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InsuranceIcon = (p: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.0834 1.5L7.54999 1.5C5.86984 1.5 5.02976 1.5 4.38802 1.82698C3.82354 2.1146 3.36459 2.57355 3.07697 3.13804C2.74999 3.77978 2.75 4.61987 2.75001 6.30006C2.75002 8.28149 2.75003 9.71849 2.75004 11.6999C2.75005 13.3801 2.75005 14.2202 3.07703 14.862C3.36466 15.4265 3.82359 15.8854 4.38808 16.173C5.02982 16.5 5.8699 16.5 7.55006 16.5H10.45C12.1301 16.5 12.9702 16.5 13.612 16.173C14.1764 15.8854 14.6354 15.4265 14.923 14.862C15.25 14.2202 15.25 13.3802 15.25 11.7L15.25 5.78571M11.0834 1.5L11.0834 4.45238C11.0834 4.91909 11.0834 5.15245 11.1742 5.33071C11.2541 5.48751 11.3816 5.61499 11.5384 5.69489C11.7166 5.78571 11.95 5.78571 12.4167 5.78571L15.25 5.78571M11.0834 1.5L13.1667 3.64286L15.25 5.78571" />
      <path d="M6.25 9.875H11.75" />
      <path d="M6.25 12.7502H11.75" />
    </g>
  </svg>
)

const HeartPulseIcon = (p: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
    <path d="M15 15h6" />
    <path d="M18 12v6" />
  </svg>
)

const ShoppingBagIcon = (p: IconProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...p}
  >
    <path
      d="M10 2.035H7.966c-1.9 0-2.85 0-3.576.37a3.393 3.393 0 0 0-1.483 1.483c-.37.726-.37 1.676-.37 3.576v4.071c0 1.9 0 2.85.37 3.576a3.393 3.393 0 0 0 1.483 1.483c.726.37 1.676.37 3.576.37H10m0-14.929h2.035c1.9 0 2.85 0 3.576.37a3.392 3.392 0 0 1 1.483 1.483c.37.726.37 1.676.37 3.576v4.071c0 1.9 0 2.85-.37 3.576a3.393 3.393 0 0 1-1.483 1.483c-.726.37-1.675.37-3.576.37h-2.035m0-14.929v14.929M10 11.365H2.536M17.465 7.634H10"
      stroke="currentColor"
      strokeWidth="1.493"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type Industry = {
  code: string
  label: string
  href: string
  headline: string
  microJobs: string[]
  accent: string
  Icon: (p: IconProps) => ReactElement
}

const industries: Industry[] = [
  {
    code: 'I-01',
    label: 'Banking & Financial Services',
    href: '/industries/banking-financial-services',
    headline:
      'Accelerate onboarding, prevent fraud in real time, and modernize core systems with AI-driven automation, cloud migration, and hyper-personalized digital banking. Translate messy M&A data into actionable intelligence, streamline lending with predictive analytics, and enable real-time, cross-border, and embedded finance — all with compliance, explainability, and zero-trust security at the core.',
    microJobs: [
      'Fraud prevention & compliance',
      'AI-driven core modernization',
      'Customer onboarding & KYC',
      'Open banking & embedded finance',
    ],
    accent:
      'radial-gradient(80% 80% at 100% 0%, rgba(3,137,244,0.18) 0%, transparent 70%)',
    Icon: FinanceIcon,
  },
  {
    code: 'I-02',
    label: 'Insurance',
    href: '/industries/insurance',
    headline:
      'Translate insurance documents into actionable intelligence with reliable AI agents that learn your unique claims processing context and skills. Accelerate underwriting, automate policy workflows, and improve claims accuracy — with strict access controls and human-in-the-loop review.',
    microJobs: ['Claims intelligence', 'Document AI', 'Underwriting ops', 'Policy automation'],
    accent:
      'radial-gradient(80% 80% at 0% 0%, rgba(132,52,233,0.18) 0%, transparent 70%)',
    Icon: InsuranceIcon,
  },
  {
    code: 'I-03',
    label: 'Healthcare & Life Sciences',
    href: '/industries/healthcare-life-sciences',
    headline:
      'Translate patient data into actionable intelligence with AI agents that learn from your physicians — improving efficiency while preserving the standard of care. Automate scheduling, prior authorizations, and follow-ups, surface clinical guidelines, and accelerate drug discovery — with consent, minimization, and strict access controls built in.',
    microJobs: ['Clinical AI & EHR insights', 'Patient engagement', 'Risk stratification', 'Drug discovery'],
    accent:
      'radial-gradient(80% 80% at 100% 100%, rgba(3,137,244,0.18) 0%, transparent 70%)',
    Icon: HeartPulseIcon,
  },
  {
    code: 'I-04',
    label: 'Retail & eCommerce',
    href: '/industries/retail-ecommerce',
    headline:
      'Modernize legacy stacks so inventory, logistics, and catalog data are instantly, securely retrievable by external AI agents. Engineer agent-ready digital shelves and APIs, unlock edge intelligence for real-time in-store experiences, and build scalable foundations that turn autonomous commerce into a reliable revenue engine.',
    microJobs: ['Engineering for agents', 'Intelligence at the edge', 'Personalization', 'Supply chain visibility'],
    accent:
      'radial-gradient(80% 80% at 0% 100%, rgba(132,52,233,0.18) 0%, transparent 70%)',
    Icon: ShoppingBagIcon,
  },
]

export default function SegmentsGrid() {
  return (
    <section id="segments" className="relative py-20 md:py-28 scroll-mt-20">
      <div className="max-w-wide mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Industries</p>
            <h2 className="text-display font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              We Know Your Industry. We Build for It.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/55 max-w-md">
            Technology alone doesn&apos;t solve industry challenges. That&apos;s
            why we lead with domain expertise. Our teams are built to combine
            sector expertise with engineering precision to deliver
            industry-native solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {industries.map((ind) => {
            const { Icon } = ind
            return (
              <Link
                key={ind.href}
                href={ind.href}
                className="group relative rounded-3xl border border-border-soft bg-surface p-7 md:p-9 overflow-hidden transition-colors hover:border-border-strong"
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: ind.accent }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                      {ind.code} · Industry
                    </span>
                    <span className="w-9 h-9 rounded-full border border-border-mid flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-bg group-hover:border-white transition-all">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="shrink-0 w-12 h-12 rounded-2xl border border-border-mid bg-white/[0.04] flex items-center justify-center text-white/85 group-hover:bg-white group-hover:text-bg group-hover:border-white transition-all">
                      <Icon />
                    </span>
                    <h3 className="text-display font-display text-2xl md:text-3xl font-semibold">
                      {ind.label}
                    </h3>
                  </div>

                  <p className="text-[15px] md:text-base text-white/70 leading-relaxed mb-7 max-w-xl">
                    {ind.headline}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {ind.microJobs.map((job) => (
                      <span
                        key={job}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-border-soft bg-white/[0.03] text-xs text-white/75"
                      >
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
