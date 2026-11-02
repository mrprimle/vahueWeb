// The same markup FeaturesWithIcons renders on this light page with columns="3", with each title linking to the service that solves the job.
import Link from 'next/link'
import { Icon } from './icons'
import type { IconFeature } from './types'

export function ServiceFeatures({ items }: { items: IconFeature[] }) {
  return (
    <div className="!flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14">
      {items.map((f) => (
        <div key={f.title} className="flex-grow flex-shrink-0 basis-full md:max-w-[368px] lg:basis-1/4 text-black">
          <div>
            <figure className="relative flex items-center justify-center rounded-lg select-none w-11 h-11 bg-black/[0.09] border border-black/10 text-black">
              <span className="w-6 h-6 flex items-center justify-center">
                <Icon name={f.icon} />
              </span>
            </figure>
          </div>
          <div>
            <h4 className="relative text-2xl font-aeonik whitespace-pre-line mt-6">{f.href ? <Link href={f.href}>{f.title}</Link> : f.title}</h4>
            <p className="relative mt-4 text-[#525252]">{f.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
