'use client'

// https://scale.com/careers. The page body as Scale's RSC payload renders it: 540431 hero, 756380 news cards, inline mission and credos,
// 15518 benefits (borderless), 442707 job board, 540431 university CTA, 243385 and 995634 for the theme.
import Image from 'next/image'
import Link from 'next/link'
import { FeatureCards } from '@/components/site/shared/FeatureCards'
import { FlatCta } from '@/components/site/shared/FlatCta'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { SectionTitle } from '@/components/site/shared/SectionTitle'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { FilterPosition } from './FilterPosition'
import type { CareersContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }
const LINK = 'underline transition-colors hover:text-scale-gray-10'

export function CareersPage({ content: c }: { content: CareersContent }) {
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <div className="pt-24!">
        <FullBleedMediaSection headline={c.hero.headline} body={c.hero.body} cta={c.hero.cta} animateCta={false} backdropColor={WHITE} image={{ path: c.hero.image }} />
      </div>

      <section className="py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <SectionTitle overtitle={c.news.overtitle} title={c.news.title} className="!mt-0 !mb-10" />
          {/* Scale module 756380 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.news.items.map((item) => (
              <div key={item.key} className={`flex flex-col justify-between gap-8 p-8 md:p-10 rounded-2xl ${item.bgClass} min-h-[220px]`}>
                <p className="detail-mono text-white/60">{item.label}</p>
                <h3 className="header5-regular text-white text-pretty">{item.title}</h3>
                <div>
                  <FlatCta text={c.news.cta} href={item.href} variant="arrowOutline" theme="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="flex flex-col gap-16">
            <SectionTitle overtitle={c.mission.overtitle} title={c.mission.title} className="!mb-0" />
            <div className="flex flex-col sm:flex-row gap-[72px]">
              <div className="flex flex-col w-full gap-6 sm:w-1/2">
                <p className="body1 text-scale-gray-10 text-pretty text-balance">{c.mission.lead}</p>
                <p className="body2-regular text-scale-gray-30">{c.mission.body}</p>
              </div>
              <div className="flex flex-col w-full gap-6 sm:w-1/2">
                <p className="body2-regular text-scale-gray-30">{c.mission.products}</p>
                <p className="body2-regular text-scale-gray-30">
                  {c.mission.engine.before}
                  <Link href={c.mission.engine.firstLink.href} className={LINK}>
                    {c.mission.engine.firstLink.text}
                  </Link>
                  {c.mission.engine.middle}
                  <Link href={c.mission.engine.secondLink.href} className={LINK}>
                    {c.mission.engine.secondLink.text}
                  </Link>
                  {c.mission.engine.after}
                </p>
                <p className="body2-regular text-scale-gray-30">{c.mission.platform}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-[120px] overflow-hidden">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="flex flex-col items-center">
            <SectionTitle overtitle={c.credos.overtitle} title={c.credos.title} subtitle={c.credos.subtitle} className="!mb-0" />
            <div className="grid w-full grid-cols-1 gap-6 mt-16 sm:grid-cols-2">
              {c.credos.items.map((item) => (
                <div key={item.title} className="relative flex flex-col gap-8 p-8 overflow-hidden sm:p-10 rounded-2xl bg-scale-gray-95">
                  <div className="relative w-[88px] h-[88px]">
                    <Image src={item.image} alt="" width={88} height={88} className="w-full h-full invert" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="header6 text-scale-gray-10">{item.title}</h3>
                    <p className="body2-regular text-scale-gray-30">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
          <div className="flex flex-col items-center gap-16">
            <SectionTitle overtitle={c.benefits.overtitle} title={c.benefits.title} subtitle={c.benefits.subtitle} className="!mb-0" />
            <FeatureCards items={c.benefits.items} columns="2" variant="borderless" />
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6" id="jobs">
          <SectionTitle overtitle={c.openRoles.overtitle} title={c.openRoles.title} className="!mb-10" />
          <div className="w-full">
            <FilterPosition jobs={c.openRoles.jobs} s={c.openRoles.board} />
          </div>
        </div>
      </section>

      <div className="mt-16! pb-8">
        <FullBleedMediaSection headline={c.university.headline} cta={c.university.cta} backdropColor={WHITE} image={{ path: c.university.image }} />
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
