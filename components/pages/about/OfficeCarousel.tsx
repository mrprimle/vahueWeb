'use client'

// Scale module 939985 (VideoWithImages), with `showVideo` false as on /about. The video branch is not ported: no page here sets it.
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import styles from './OfficeCarousel.module.css'

export function OfficeCarousel({ className, images = [] }: { className?: string; images?: { src: string; alt?: string }[] }) {
  const [cursor, setCursor] = useState('grab')
  const [ref] = useKeenSlider<HTMLDivElement>({
    dragStarted: () => setCursor('grabbing'),
    dragEnded: () => setCursor('grab'),
    loop: true,
    breakpoints: {
      '(min-width: 1px) and (max-width: 589px)': { loop: false, slides: { perView: 1.4, spacing: 8 } },
      '(min-width: 590px) and (max-width: 1023px)': { loop: true, slides: { perView: 2.5, spacing: 8 } },
      '(min-width: 1024px) and (max-width: 1440px)': { loop: true, slides: { perView: 3.3, spacing: 12 } },
      '(min-width: 1441px)': { loop: true, slides: { perView: 4, spacing: 12 } },
    },
  })
  return (
    <div className={cn(className, 'flex flex-col justify-stretch items-center overflow-hidden')}>
      <div className="relative w-full max-w-[1792px] my-0">
        <div ref={ref} style={{ cursor }} className="keen-slider flex w-full">
          {images.map((image, i) => (
            <figure key={i} className={cn(styles.videoContainer, 'relative aspect-video max-w-[420px] overflow-hidden keen-slider__slide')}>
              <Image
                loading="eager"
                src={image.src}
                fill
                unoptimized
                className="!w-[calc(100%_-_8px)] !h-[calc(100%_-_8px)] !top-1/2 rounded-[12px] object-cover -translate-x-1/2 -translate-y-1/2 !left-1/2"
                sizes="30vw"
                alt={image.alt ?? ''}
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
