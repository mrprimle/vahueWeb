'use client'

// Scale modules 819615 (section), 611557 (Section), 269185 (showcase), light chat window on this page.
import { FlatCta } from '@/components/site/shared/FlatCta'
import { useThemeStore } from '@/components/site/lib/themeStore'
import { ChatWindow } from './ChatWindow'
import { SectionTitle } from './primitives'
import type { DataEngineContent } from './types'
import styles from './data-engine.module.css'

export function BuildAiSection({ content }: { content: DataEngineContent['buildAi'] }) {
  const theme = useThemeStore((s) => s.pageTheme)
  const ctaTheme = theme === 'light' ? 'black' : 'white'
  return (
    <section id="build-ai" className="py-18 lg:py-20 bg-transparent pt-0 lg:pt-0 pb-0 lg:pb-0 relative">
      <div className="container relative">
        <SectionTitle overtitle={content.overtitle} title={content.title} subtitle={content.subtitle} className="relative z-10 !mt-0 !mb-16" />
        <div>
          <div className="">
            <div className="flex z-10 relative flex-col-reverse lg:gap-16 lg:flex-row-reverse" style={{ justifyContent: 'flex-start' }}>
              <div className="xl:flex xl:w-auto w-full flex-col justify-center lg:items-start xl:min-w-[466px] xl:max-w-[466px] flex-1">
                <p className={`font-aeonik text-3.5xl xl:text-4xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#010101]'}`}>{content.showcaseTitle}</p>
                <p className={`text-zinc-400 ${theme === 'dark' ? 'text-zinc-400' : 'text-[#010101]'}`}>{content.showcaseSubtitle}</p>
                <p className={`my-8 ${theme === 'dark' ? 'text-[#F5F5F5]' : 'text-[#010101]'} text-pretty`}>{content.body}</p>
                <div className="flex items-center gap-x-3 xs:gap-x-6">
                  <FlatCta href={content.primaryCta.url} text={content.primaryCta.text} theme={ctaTheme} variant="fill" />
                  <FlatCta href={content.secondaryCta.url} text={content.secondaryCta.text} theme={ctaTheme} variant="border" />
                </div>
              </div>
              <div className="relative lg:flex transition-transform duration-1000 ease-out rounded-[10px] overflow-hidden lg:mb-0 mb-9 lg:w-1/2 xl:w-[649px] xl:h-[402px] select-none aspect-[649/402] min-w-full lg:min-w-[50%] xl:min-w-[unset] max-w-[calc(100%+24px)] bg-white">
                <ChatWindow chat={content.chat} className={`${styles.chatLight} build-ai-chat-window-light`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
