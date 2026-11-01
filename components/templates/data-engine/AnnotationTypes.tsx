import type { ReactNode } from 'react'
import { SectionHeader } from './StaticSections'
import { Check, CubeIcon, ImageIcon, TextIcon, VideoIcon } from './icons'
import s from './dataEngine.module.css'

// TODO: Vahue copy
const TYPES: { title: string; icon: ReactNode; items: string[] }[] = [
  { title: 'Text Inputs', icon: <TextIcon />, items: ['Document Handling', 'Language Understanding', 'Speech To Text', 'Content & Tone'] },
  { title: 'Image Inputs', icon: <ImageIcon />, items: ['Visible Spectrum', 'Thermal', 'Speech To Text'] },
  { title: 'Video Inputs', icon: <VideoIcon />, items: ['Moving Footage', 'Language Understanding'] },
  { title: '3D Sensor Inputs', icon: <CubeIcon />, items: ['Point Clouds'] },
]

export default function AnnotationTypes() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader className="mb-10" over="Input Formats" title="Supported Labelling Types" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TYPES.map((t) => (
            <article key={t.title} className="flex min-h-[320px] flex-col rounded-xl bg-white p-6 md:p-8">
              <div className="min-h-[136px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#212121]">
                  <span className="flex h-6 w-6 items-center justify-center">{t.icon}</span>
                </div>
                <h3 className={`${s.header5} mt-8 font-normal text-[#212121]`}>{t.title}</h3>
              </div>
              <ul className="space-y-4">
                {t.items.map((item, i) => (
                  <li key={i} className={`${s.body2} flex items-start gap-3 text-[#575757]`}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#212121]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
