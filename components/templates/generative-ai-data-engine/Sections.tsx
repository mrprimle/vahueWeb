import type { ReactNode } from 'react'
import styles from './styles.module.css'

const BASE = '/templates/generative-ai-data-engine'

/** Standard CMS slice: `py-18 lg:py-20 !pt-8 !pb-10 md:!pt-10` around the 1472px shell. */
export function Slice({ children }: { children: ReactNode }) {
  return (
    <section className="bg-transparent pb-10 pt-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1472px] px-6">{children}</div>
    </section>
  )
}

/** Centered eyebrow / H2 / lead block. */
export function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mt-12">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="mb-5 font-mono text-[12px] uppercase leading-6 tracking-[1px] text-[#525252]">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-balance text-[30px] font-normal leading-[1.375] tracking-[-0.01em] text-black md:text-[44px] lg:text-[48px] lg:leading-[1.25]">
            {title}
          </h2>
        </div>
        {lead ? (
          <p className="mt-4 block w-full text-balance text-[16px] font-normal leading-[1.6] tracking-[-0.01em] text-black/70 lg:mt-2 lg:text-[20px]">
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Raster panel: `bg-white/10 rounded-2xl` box with a full-width image (illustrations baked into PNGs). */
export function ImagePanel({ src, width, height, padded = false }: { src: string; width: number; height: number; padded?: boolean }) {
  return (
    <div className={`relative z-10 overflow-hidden rounded-2xl bg-white/10 md:overflow-visible ${padded ? 'p-1' : 'p-0'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={width} height={height} loading="lazy" className="block h-auto w-full" />
    </div>
  )
}

export function ExpertiseImage() {
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        {/* TODO: Vahue copy (text is baked into the illustration) */}
        <ImagePanel src={`${BASE}/expertise.png`} width={1188} height={616} />
      </div>
    </Slice>
  )
}

export function OverviewSplit() {
  return (
    <Slice>
      <div className="flex flex-col gap-24">
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div aria-hidden className={`${styles.glow} pointer-events-none absolute inset-0 select-none`} />
          {/* TODO: Vahue copy */}
          <h3 className="relative text-[20px] font-medium leading-[1.625] tracking-[-0.01em] text-black">
            Our data platform pairs automated pipelines with expert human judgement to produce training data shaped
            around your model goals and your data requirements.
          </h3>
          <div>
            <ImagePanel src={`${BASE}/product-overview.webp`} width={1920} height={1190} padded />
          </div>
        </div>
      </div>
    </Slice>
  )
}

export function Lifecycle() {
  return (
    <Slice>
      {/* TODO: Vahue copy */}
      <SectionHeader
        eyebrow="Build AI"
        title={
          <>
            Sharpen Your Models
            <br />
            By Sharpening Your Data
          </>
        }
        lead="Carefully curated training data, reviewed by domain specialists, is what separates capable, reliable AI models."
      />
      <div>
        <ImagePanel src={`${BASE}/lifecycle.png`} width={1216} height={637} />
      </div>
    </Slice>
  )
}

// react-icons Material Design glyphs used on scale.com (MIT).
const ICONS: string[] = [
  'm20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z|M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z',
  'M21 6.5a2.996 2.996 0 0 0-2.99 3.21l-2.03.68a4.468 4.468 0 0 0-3.22-2.32V5.91A3.018 3.018 0 0 0 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77C6.85 17.09 6.44 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77a4.49 4.49 0 0 0 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5zm-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm1 12a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zm6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
  'm3.5 18.49 6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z',
  'M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z',
  'M7 19c-1.1 0-2 .9-2 2h14c0-1.1-.9-2-2-2h-4v-2h3c1.1 0 2-.9 2-2h-8c-1.66 0-3-1.34-3-3a3 3 0 0 1 1.47-2.57c.41.59 1.06 1 1.83 1.06.7.06 1.36-.19 1.85-.62l.59 1.61.94-.34.34.94 1.88-.68-.34-.94.94-.34-2.74-7.52-.94.34-.34-.94-1.88.68.34.94-.94.35.56 1.55c-1.17-.04-2.19.75-2.48 1.86A5.01 5.01 0 0 0 5 12c0 2.76 2.24 5 5 5v2H7zm5.86-14.48 1.71 4.7-.94.34-1.71-4.7.94-.34zM10.5 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z',
  'M12.22 19.85c-.18.18-.5.21-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.19.2-.51.19-.71 0a.504.504 0 0 1 0-.71l3.39-3.39-1.41-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71l3.39-3.39-1.42-1.41-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71L9.52 8.4l1.87 1.86c.95.95 2.59.94 3.54 0 .98-.98.98-2.56 0-3.54l-1.86-1.86.28-.28c.78-.78 2.05-.78 2.83 0l4.24 4.24c.78.78.78 2.05 0 2.83l-8.2 8.2zm9.61-6.78a4.008 4.008 0 0 0 0-5.66l-4.24-4.24a4.008 4.008 0 0 0-5.66 0l-.28.28-.28-.28a4.008 4.008 0 0 0-5.66 0L2.17 6.71a3.992 3.992 0 0 0-.4 5.19l1.45-1.45a2 2 0 0 1 .37-2.33l3.54-3.54c.78-.78 2.05-.78 2.83 0l3.56 3.56c.18.18.21.5 0 .71-.21.21-.53.18-.71 0L9.52 5.57l-5.8 5.79c-.98.97-.98 2.56 0 3.54.39.39.89.63 1.42.7a2.458 2.458 0 0 0 2.12 2.12 2.458 2.458 0 0 0 2.12 2.12c.07.54.31 1.03.7 1.42.47.47 1.1.73 1.77.73.67 0 1.3-.26 1.77-.73l8.21-8.19z',
]

// TODO: Vahue copy
const FEATURES = [
  { title: 'Live Quality Console', body: 'Instant insight into how data is gathered and refined' },
  { title: 'Specialists, Writers, and Engineers', body: 'Tap a worldwide bench of vetted specialists across many disciplines to produce top-tier datasets' },
  { title: 'Stronger Models', body: 'Train models on rich datasets delivered through infrastructure built for the job' },
  { title: 'Greater Throughput', body: 'Quicker, more economical dataset production' },
  { title: 'Model Assessment', body: 'We actively surface where models fall short, including focused adversarial testing.' },
  { title: 'Careful Development', body: 'Committed to privacy, fairness, openness and ethics' },
]

export function Features() {
  return (
    <Slice>
      {/* TODO: Vahue copy */}
      <SectionHeader
        eyebrow="Key Features"
        title={
          <>
            Powering the Next Wave
            <br />
            of Language Models
          </>
        }
        lead="We have years of practice supplying the data behind leading language models."
      />
      <div className="!flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14">
        {FEATURES.map((f, i) => (
          <div key={f.title} className="flex-shrink-0 flex-grow basis-full text-black md:max-w-[368px] lg:basis-1/4">
            <div>
              <figure className="relative flex h-11 w-11 select-none items-center justify-center rounded-lg border border-black/10 bg-black/[0.09] text-black">
                <span className="flex h-6 w-6 items-center justify-center">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                    {ICONS[i].split('|').map((d) => (
                      <path key={d.slice(0, 12)} d={d} />
                    ))}
                  </svg>
                </span>
              </figure>
            </div>
            <div>
              <h4 className="relative mt-6 whitespace-pre-line text-[24px] font-normal leading-[1.5] tracking-[-0.01em] text-black">{f.title}</h4>
              <p className="relative mt-4 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#525252]">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slice>
  )
}
