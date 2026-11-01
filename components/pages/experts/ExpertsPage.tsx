import Script from 'next/script'
import { BlogPreview } from '@/components/site/shared/BlogPreview'
import { ClientTestimonials } from '@/components/site/shared/ClientTestimonials'
import { FullBleedMediaSection } from '@/components/site/shared/FullBleedMediaSection'
import { PageThemeSetter, SectionThemeWatcher } from '@/components/site/shared/SectionTheme'
import { CardGridSection } from './CardGridSection'
import { DomainExpertise } from './DomainExpertise'
import type { ExpertsContent } from './types'

const MEDIA = '[&_.ResponsiveImage]:absolute [&_.ResponsiveImage]:inset-0 [&_.ResponsiveImage_img]:absolute [&_.ResponsiveImage_img]:inset-0'

// Scale inlines this on /experts: a page restored from history without its canvas reloads.
const WEBGL_RESTORE = `
(() => {
  const restoreWebGLIfNeeded = event => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isHistoryRestore = Boolean(event?.persisted || navEntry?.type === 'back_forward');
    if (!isHistoryRestore || !location.pathname.startsWith('/experts')) return;
    setTimeout(() => {
      const isDesktop = matchMedia('(min-width: 768px)').matches;
      const webglContainer = document.querySelector('#domain-expertise [style*="touch-action"]');
      if (isDesktop && webglContainer && !webglContainer.querySelector('canvas')) {
        location.reload();
      }
    }, 600);
  };
  window.addEventListener('pageshow', restoreWebGLIfNeeded);
})();
`

export function ExpertsPage({ content: c }: { content: ExpertsContent }) {
  return (
    <div className="relative overflow-x-hidden">
      <PageThemeSetter theme="light" />
      <Script id="experts-webgl-bfcache-restore" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: WEBGL_RESTORE }} />
      <div className="CMSSliceRenderer relative rootPageRenderer">
        {/* Scale module 478135, non-globe branch, `compact`. */}
        <div className="pb-10! pt-12! md:pt-24!">
          <FullBleedMediaSection
            headline={c.hero.headline}
            body={c.hero.body}
            cta={c.hero.cta}
            backdropColor={c.hero.backdrop}
            video={c.hero.video}
            image={{ path: c.hero.poster }}
            startPercentage={0}
            sectionClassName={MEDIA}
            stableCtaIntro
          />
        </div>
        <section className="relative z-0">
          <div className="mx-auto w-full max-w-[1472px] ps-6 pe-6">
            <div className="md:sticky md:top-20">
              <CardGridSection heading={c.cardGrid.heading} cards={c.cardGrid.cards} />
            </div>
          </div>
        </section>
        <div className="relative z-10">
          <DomainExpertise content={c.domains} />
        </div>
        <ClientTestimonials
          heading={c.testimonials.heading}
          backdropColor={c.testimonials.backdrop}
          colorTheme={c.testimonials.colorTheme}
          testimonials={c.testimonials.items.map((t) => ({
            _key: t._key,
            clientName: t.clientName,
            title: t.title,
            testimonial: t.testimonial,
            logoNode: t.logo ? (
              <div className="relative block w-full h-full">
                <div
                  className="inline-block h-full relative z-10 w-full"
                  style={{
                    backgroundColor: 'currentColor',
                    WebkitMaskImage: `url("${t.logo}")`,
                    maskImage: `url("${t.logo}")`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt="" className="opacity-0 pointer-events-none" width={100} style={{ width: 100, height: 'auto', maxWidth: 100, maxHeight: 80 }} />
                </div>
              </div>
            ) : undefined,
          }))}
        />
        <BlogPreview
          heading={c.resources.heading}
          pageThemeOverride="light"
          posts={c.resources.posts.map((p) => ({ _key: p._key, title: p.title, url: p.url, image: p.image, category: { name: p.category } }))}
        />
        <div className="pb-8">
          <FullBleedMediaSection headline={c.prefooter.headline} body={c.prefooter.body} cta={c.prefooter.cta} backdropColor={c.prefooter.backdrop} image={{ path: c.prefooter.image }} />
        </div>
      </div>
      <SectionThemeWatcher />
    </div>
  )
}
