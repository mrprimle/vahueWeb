import s from './book-index.module.css'

/*
 * Centred index hero (template: components/templates/guides/GuidesPage.tsx, CMS SectionHeader), Scale's colours.
 * Scale: section py-16 md:py-24 with the column at md:mt-12. Vahue's navbar sits in the flow (88px), so the top
 * padding is set to put the h1 where the clone's is (y 227 at 1440, 210 at 390): pt-[77px] / md:pt-12.
 */

type Props = {
  overtitle: string
  title: string
  sub: string
}

export default function BookIndexHero({ overtitle, title, sub }: Props) {
  return (
    <section className="pb-16 pt-[77px] md:pb-24 md:pt-12">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mb-20 md:mt-12">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className={`${s.overtitle} font-mono text-[#525252]`}>
                <span>{overtitle}</span>
              </div>
              <h1 className={`${s.sectionTitle} font-display font-normal text-black`}>{title}</h1>
            </div>
            <p className={`${s.sectionSub} block w-full font-display font-normal text-black/70`}>{sub}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
