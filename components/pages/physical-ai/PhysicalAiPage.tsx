import Image from 'next/image'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { LogoTile } from '@/components/site/shared/LogoMarquee'
import { PageThemeSetter } from '@/components/site/shared/SectionTheme'
import { cn } from '@/components/site/lib/cn'
import { ICONS } from './icons'
import { ModelChart } from './ModelChart'
import styles from './physical-ai.module.css'
import type { Feature, FeatureCard, MarqueeLogoItem, PhysicalAiContent, SizedImage } from './types'

const SECTION = 'py-18 lg:py-20 bg-transparent !pt-16 !pb-16 md:!pt-20'
const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

/** Scale module 1900. `tone` adds the light-theme colours Scale passes on some sections. */
function SectionTitle({ overtitle, title, subtitle, tone = true }: { overtitle: string; title: string; subtitle?: string; tone?: boolean }) {
  return (
    <div className="flex flex-col justify-center mb-10 md:mb-20 md:mt-12 items-center mx-auto max-w-3xl text-center !mb-10">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className={cn('text-xs leading-6 tracking-[1px] mb-5 uppercase font-geist-mono', tone && 'text-[#525252]')}>
            <span>{overtitle}</span>
          </div>
          <h2 className={cn('font-aeonik leading-snug lg:leading-[1.25] text-3xl md:text-4.5xl lg:text-5xl [text-wrap:balance]', tone && 'text-black')}>{title}</h2>
        </div>
        {subtitle ? <p className="mt-4 lg:mt-2 leading-[1.60] lg:text-xl [text-wrap:balance] [white-space:inherit] block font-normal w-full text-black/70">{subtitle}</p> : null}
      </div>
    </div>
  )
}

/** Icon tile from Scale module 460138. */
function FeatureIcon({ icon }: { icon: Feature['icon'] }) {
  const { base, d } = ICONS[icon]
  return (
    <figure className="relative flex items-center justify-center rounded-lg select-none w-11 h-11 bg-black/[0.09] border border-black/10 text-black">
      <span className="w-6 h-6 flex items-center justify-center">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d={base} />
          <path d={d} />
        </svg>
      </span>
    </figure>
  )
}

/** The media slot of Scale's side-by-side block. */
function SideMedia({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-white/10 p-0 z-10 relative lg:items-center rounded-2xl overflow-hidden md:overflow-visible">{children}</div>
    </div>
  )
}

function SideImage({ image, sizes }: { image: SizedImage; sizes?: string }) {
  return <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="w-full" />
}

function CardsGrid({ cards }: { cards: FeatureCard[] }) {
  return (
    <div className="grid relative items-start grid-cols-1 md:grid-cols-2 gap-14 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
      {cards.map((card) => (
        <div key={card.title}>
          <div className={cn(styles.feature, 'aspect-[4/3]')}>
            <Image src={card.image.src} alt={card.image.alt} width={card.image.width} height={card.image.height} sizes="(max-width: 767px) 80vw,  480px" className="object-cover w-full h-full rounded-lg" />
          </div>
          <p className="relative mt-8 text-2xl lg:mt-12 font-aeonik text-black">{card.title}</p>
          <p className="relative mt-3 text-black/70 text-base">{card.body}</p>
        </div>
      ))}
    </div>
  )
}

function MarqueeLogoNode({ logo }: { logo: MarqueeLogoItem }) {
  if (!logo.src) return <LogoTile />
  const url = `url("${logo.src}")`
  return (
    <div
      className="inline-block h-full"
      style={{ backgroundColor: 'currentColor', WebkitMaskImage: url, maskImage: url, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.alt} className="opacity-0 pointer-events-none" width="auto" height="auto" style={{ width: 'auto', height: 'auto', maxWidth: 70, maxHeight: 28 }} />
    </div>
  )
}

export function PhysicalAiPage({ content: c }: { content: PhysicalAiContent }) {
  return (
    <div className="overflow-x-hidden">
      <PageThemeSetter theme="light" />
      {/* Scale module 478135, non-globe branch. */}
      <div className="pb-10! pt-24!">
        <FullBleedMediaSection
          headline={c.hero.headline}
          body={c.hero.body}
          cta={c.hero.cta}
          backdropColor={c.hero.backdrop}
          image={c.hero.image}
          startPercentage={0}
          sectionClassName={MEDIA}
          logos={{ label: c.hero.logos.label, logos: c.hero.logos.items.map((logo) => ({ id: logo.key, node: <MarqueeLogoNode logo={logo} /> })) }}
        />
      </div>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.overview.overtitle} title={c.overview.title} tone={false} />
          {/* Scale module 460138, columns "2", iconSide. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-12">
            {c.overview.features.map((feature) => (
              <div key={feature.title} className="flex flex-row items-start gap-4 text-black">
                <div className="shrink-0">
                  <FeatureIcon icon={feature.icon} />
                </div>
                <div>
                  <h4 className="relative text-2xl font-aeonik whitespace-pre-line mt-0">{feature.title}</h4>
                  <p className="relative mt-4 text-[#525252]">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <ClientTestimonials heading={c.testimonials.heading} testimonials={c.testimonials.items.map((item) => ({ ...item, nameTile: true }))} colorTheme={c.testimonials.colorTheme} backdropColor={c.testimonials.backdrop} />
      </div>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.useCase.overtitle} title={c.useCase.title} />
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="mb-4 text-2xl font-medium text-black">{c.useCase.heading}</h3>
              <p className="mb-4 text-gray-700">{c.useCase.paragraphs[0]}</p>
              <p className="text-gray-700">{c.useCase.paragraphs[1]}</p>
            </div>
            <SideMedia>
              <SideImage image={c.useCase.image} sizes="(max-width: 1024px) 100vw, 50vw" />
            </SideMedia>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.embodiments.overtitle} title={c.embodiments.title} subtitle={c.embodiments.subtitle} />
          <CardsGrid cards={c.embodiments.cards} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.environments.overtitle} title={c.environments.title} subtitle={c.environments.subtitle} />
          <CardsGrid cards={c.environments.cards} />
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <SideMedia>
              <SideImage image={c.annotations.image} />
            </SideMedia>
            <div>
              <h3 className="mb-4 text-2xl font-medium text-black">{c.annotations.title}</h3>
              <p className="text-gray-700">{c.annotations.body}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-1 gap-12 mt-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-medium text-black">{c.improvements.title}</h3>
              <p className="mb-4 text-gray-700">{c.improvements.paragraphs[0]}</p>
              <p className="text-gray-700">{c.improvements.paragraphs[1]}</p>
            </div>
            <SideMedia>
              <ModelChart {...c.improvements.chart} />
            </SideMedia>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="container relative">
          <SectionTitle overtitle={c.difference.overtitle} title={c.difference.title} tone={false} />
          {/* Scale module 460138, default columns. */}
          <div className="!flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14">
            {c.difference.features.map((feature) => (
              <div key={feature.title} className="flex-grow flex-shrink-0 basis-full md:max-w-[368px] lg:basis-1/4 text-black">
                <div>
                  <FeatureIcon icon={feature.icon} />
                </div>
                <div>
                  <h4 className="relative text-2xl font-aeonik whitespace-pre-line mt-6">{feature.title}</h4>
                  <p className="relative mt-4 text-[#525252]">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16! pb-8">
        <FullBleedMediaSection
          headline={c.prefooter.headline}
          cta={c.prefooter.cta}
          secondaryCta={c.prefooter.secondaryCta}
          backdropColor={c.prefooter.backdrop}
          image={c.prefooter.image}
          sectionClassName={MEDIA}
        />
      </div>
    </div>
  )
}
