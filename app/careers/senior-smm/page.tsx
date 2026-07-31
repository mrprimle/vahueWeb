import type { Metadata } from 'next'
import Link from 'next/link'
import SeniorSMMApplication from '@/components/careers/SeniorSMMApplication'

export const metadata: Metadata = {
  title: 'Senior SMM',
  description: 'Senior SMM vacancy at Vahue.',
}

export default function SeniorSMMPage() {
  const responsibilities = [
    'Support the development and delivery of monthly marketing plans, campaigns, offers, and new service launches.',
    'Plan, film, edit, and publish content for Instagram and TikTok, including Reels, carousels, Stories, and practitioner-led content.',
    'Manage day-to-day website and landing-page updates, including new treatments, practitioner pages, copy, imagery, prices, and booking links.',
    'Manage Google Ads activity and use performance data to improve campaigns, landing pages, and lead quality.',
    'Monitor website and search performance using GA4, Google Tag Manager, Search Console, and Google Business Profile.',
    'Produce weekly marketing and lead-performance reports and support monthly revenue and campaign reporting.',
    'Maintain marketing-related information in Pabau, including services, packages, products, forms, and client notifications.',
    'Coordinate campaign activity with the CRM and email specialist, PR contacts, and other partners.',
    'Create marketing materials and support partnership and clinic marketing requests.',
  ]

  const requirements = [
    'At least 1-2 years of hands-on digital marketing experience.',
    'Experience with social-media management, short-form content creation, and copywriting.',
    'Strong knowledge of Google Ads, GA4, and SEO.',
    'Strong organisation, administration, and prioritisation skills, with excellent attention to detail.',
    'A great communicator who can work effectively with practitioners, managers, and external partners.',
    'An adaptable, proactive, and analytical approach. Relevant sector experience is desirable but not essential.',
  ]

  return (
    <div className="min-h-[80vh] bg-[#f4f5f6] text-[#111]">
      <main className="mx-auto max-w-[1280px] px-6 py-16 md:px-8 md:py-24">
        <Link
          href="/careers/vacancies"
          className="group inline-flex items-center gap-2 text-sm font-medium text-black/55 transition-colors hover:text-black"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1"
          >
            <path
              d="M12.5 4.5 7 10l5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All vacancies
        </Link>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
          <div>
            <h1 className="max-w-3xl text-5xl font-bold uppercase leading-[0.92] tracking-[-0.055em] text-[#111] md:text-7xl">
              Senior SMM
            </h1>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
              <span className="rounded-full border border-black/15 px-4 py-2">
                Fully remote
              </span>
              <span className="rounded-full border border-black/15 px-4 py-2">
                Full-time
              </span>
              <span className="rounded-full border border-black/15 px-4 py-2">
                Marketing
              </span>
            </div>

            <div className="mt-16 max-w-3xl border-t border-black/15 pt-10">
              <h2 className="text-3xl font-semibold text-[#111] md:text-4xl">
                The role
              </h2>
              <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">
                This is a varied, hands-on role where you will plan, film, edit,
                and publish social content; update the website and landing
                pages; support new treatment and practitioner launches; manage
                Google Ads and digital reporting; and maintain selected
                marketing settings in Pabau. The role requires flexibility,
                adaptability, communication, and strong organisational skills.
              </p>
              <p className="mt-5 text-base leading-relaxed text-black/65 md:text-lg">
                You will help lead day-to-day delivery of the monthly marketing
                strategy and approved plan. The role also includes making
                independent marketing decisions and coordinating with internal
                and external specialists.
              </p>
            </div>

            <div className="mt-14 max-w-3xl border-t border-black/15 pt-10">
              <h2 className="text-3xl font-semibold text-[#111] md:text-4xl">
                Key responsibilities
              </h2>
              <ul className="mt-7 grid gap-5">
                {responsibilities.map((responsibility) => (
                  <li
                    key={responsibility}
                    className="grid grid-cols-[20px_1fr] gap-3 text-base leading-relaxed text-black/65 md:text-lg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.65em] size-1.5 rounded-full bg-[#596dff]"
                    />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 max-w-3xl border-t border-black/15 pt-10">
              <h2 className="text-3xl font-semibold text-[#111] md:text-4xl">
                Essential knowledge and experience
              </h2>
              <ul className="mt-7 grid gap-5">
                {requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="grid grid-cols-[20px_1fr] gap-3 text-base leading-relaxed text-black/65 md:text-lg"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.65em] size-1.5 rounded-full bg-[#596dff]"
                    />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-[32px] bg-[#111] p-8 text-white lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              Location
            </p>
            <p className="mt-2 text-lg font-semibold">Fully remote</p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
              Nice to have
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              The option to occasionally visit Knightsbridge, London, for
              filming or team sessions is welcome, but never required.
            </p>
            <a
              href="#apply"
              className="mt-8 inline-flex w-full items-center justify-between rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply now
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>

        <div className="mt-20 md:mt-28">
          <SeniorSMMApplication />
        </div>
      </main>
    </div>
  )
}
