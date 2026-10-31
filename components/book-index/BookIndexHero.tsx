import s from './book-index.module.css'

/*
 * Centred index hero (template: components/scale-clone/guides/GuidesPage.tsx, CMS SectionHeader).
 * Scale: section py-16 md:py-24 with the column at md:mt-12 under an overlaid header. Vahue's navbar
 * sits in the flow, so the top padding is reduced to keep the same gap under the nav.
 */

type Props = {
  overtitle: string
  title: string
  sub: string
}

export default function BookIndexHero({ overtitle, title, sub }: Props) {
  return (
    <section className="pb-16 pt-10 md:pb-24 md:pt-12">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mb-20 md:mt-12">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className={`${s.overtitle} font-mono text-white/50`}>
                <span>{overtitle}</span>
              </div>
              <h1 className={`${s.sectionTitle} font-display font-normal text-white`}>{title}</h1>
            </div>
            <p className={`${s.sectionSub} block w-full font-display font-normal text-white/70`}>{sub}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
