'use client'

// Scale module 583338: `aM` (panel), `aB` (tab group, Headless UI), `aL` (the five panels), LoadOnHoverIframe, and CTAs 51051 / NewButtonLink 408298, glass branch.
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Highlight, themes } from 'prism-react-renderer'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/components/site/lib/cn'
import { gsap } from '@/components/site/lib/gsap'
import { GlowBackground } from '@/components/site/shared/GlowBackground'
import styles from './automotive.module.css'
import type { DataTabsContent, SizedImage } from './types'

const SLIDE = 'lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-10 3xl:translate-x-14 transition-transform duration-1000 ease-out shadow-xl xl:shadow-super'

function HoverFrame({ frame }: { frame: DataTabsContent['frame'] }) {
  const [hovered, setHovered] = useState(false)
  const { placeholder } = frame
  return (
    <div className={cn('bg-black relative w-full border border-[#D1AAD7]/[0.16] rounded-[10px] overflow-hidden lg:mb-0 mb-9 lg:w-1/2 xl:w-[649px] xl:h-[402px] select-none aspect-[649/402] min-w-full lg:min-w-[50%] xl:min-w-[unset] max-w-max', SLIDE)}>
      {hovered ? (
        <iframe src={frame.src} className="absolute inset-0 w-full h-full bg-black" />
      ) : (
        <div onMouseOver={() => setHovered(true)} className="w-full h-full">
          <Image src={placeholder.src} alt={placeholder.alt} width={placeholder.width} height={placeholder.height} sizes="(min-width: 1024px) 47vw, 98vw" className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  )
}

function StillPanel({ image }: { image: SizedImage }) {
  return (
    <Image
      className={cn('bg-black rounded-lg lg:max-w-[50%] xl:max-w-none lg:mb-0 mb-9 select-none', SLIDE)}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      {...(image.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL } : {})}
    />
  )
}

function TextPanel({ markup }: { markup: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const pick = (hex: string) => svg.querySelectorAll(`[id="color-${hex}"]`)
    const tween = { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'Power2.inOut' }
    const from = { autoAlpha: 0, y: 10 }
    const tl = gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true })
    tl.fromTo(pick('ECA6FA'), from, { ...tween, delay: 0.5 })
    tl.fromTo(pick('E7FE53'), from, tween, '>')
    tl.fromTo(pick('DBC6FC'), from, tween, '>')
    tl.fromTo(pick('B2FCD2'), from, tween, '>')
  }, [])
  return (
    <svg
      ref={ref}
      className={cn('bg-black rounded-lg aspect-[649/402] lg:max-w-[50%] xl:max-w-[649px] lg:mb-0 mb-9 select-none', SLIDE)}
      viewBox="0 0 649 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

function Code({ code, pre, gutter = true }: { code: string; pre: { padding: number; fontSize?: number }; gutter?: boolean }) {
  return (
    <Highlight theme={themes.vsDark} language="javascript" code={code}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, fontFamily: 'DM Mono', height: '100%', margin: 0, background: 'transparent', ...pre }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {gutter ? <span className="mr-2">{i + 1}</span> : null}
              {line.map((token, k) => (
                <span key={k} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const NoteIcon = () => (
  <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15.556" fill="#585858" stroke="url(#paint0_linear_8067_20264)" strokeWidth=".889" />
    <path d="M13.361 19.5v-7.583l7-1.167v7.583" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.61 21.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM18.611 20.084a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_8067_20264" x1="82.5" y1="-28.5" x2="-33.825" y2="7.807" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)
const PlayIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m1.515.91 4.242 2.726-4.242 2.727V.91Z" fill="#CFCFCF" stroke="#CFCFCF" strokeWidth=".606" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PauseIcon = () => (
  <svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.758 2.076H2.546v4.848h1.212V2.076ZM6.18 2.076H4.968v4.848H6.18V2.076Z" fill="#CFCFCF" stroke="#CFCFCF" strokeWidth=".606" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function AudioPanel({ audio }: { audio: DataTabsContent['audio'] }) {
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const duration = useRef(0)
  const el = useRef<HTMLAudioElement>(null)
  // react-audio-player (78177): onListen fires every listenInterval (500ms here) from play until pause or end.
  const timer = useRef<number | undefined>(undefined)
  const stopTrack = () => {
    window.clearInterval(timer.current)
    timer.current = undefined
  }
  useEffect(() => stopTrack, [])
  const startTrack = () => {
    if (timer.current !== undefined) return
    timer.current = window.setInterval(() => {
      if (el.current && bar.current) bar.current.style.width = `${100 - (el.current.currentTime / duration.current) * 100}%`
    }, 500)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.transcribe}>{audio.prompt}</div>
      <button
        type="button"
        className={styles.contentBox}
        onClick={() => {
          if (!started) setStarted(true)
          else if (el.current) {
            if (playing) el.current.pause()
            else void el.current.play()
          }
        }}
      >
        <div className="flex items-center mb-2 space-x-2 lg:space-x-3 lg:mb-3 xl:mb-5">
          <NoteIcon />
          <div>
            <p className="text-[10px] lg:text-xs w-fit">{audio.fileName}</p>
            <p className="text-[8px] lg:text-[10px] text-stone-400 w-fit">{audio.time}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {playing ? <PauseIcon /> : <PlayIcon />}
          <div className={styles.progressBar}>
            <div ref={bar} className={styles.progress} />
          </div>
        </div>
      </button>
      <div className={styles.contentBoxCode}>
        <Code code={audio.code} pre={{ padding: 0 }} />
        {!started ? (
          <button
            type="button"
            onClick={() => {
              setStarted(true)
              setPlaying(true)
            }}
          >
            {audio.run}
          </button>
        ) : null}
        {started ? (
          <audio
            ref={el}
            autoPlay
            preload="metadata"
            src={audio.src}
            title={audio.src}
            className="react-audio-player "
            onLoadedMetadata={(e) => {
              duration.current = e.currentTarget.duration
            }}
            onPlay={() => {
              startTrack()
              setPlaying(true)
            }}
            onPause={() => {
              stopTrack()
              setPlaying(false)
            }}
            onAbort={stopTrack}
            onEnded={() => {
              stopTrack()
              if (bar.current) bar.current.style.width = '0'
            }}
          >
            <p>
              Your browser does not support the <code>audio</code> element.
            </p>
          </audio>
        ) : null}
      </div>
      {started ? (
        <div className={styles.result}>
          <Code code={audio.result} pre={{ padding: 10, fontSize: 8 }} />
        </div>
      ) : null}
    </div>
  )
}

function GlassLink({ href, children }: { href: string; children: string }) {
  return (
    <div className="h-8 relative p-[1px] flex rounded-full group/glass transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] bg-gradient-to-br from-[#9a9a9a] via-[#1a1a1a] to-[#6a6a6a] text-white">
      <Link
        href={href}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className="w-full h-full flex items-center justify-center rounded-full relative overflow-hidden bg-custom-gradient backdrop-blur-xs transition-all duration-500 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] hover:brightness-[1.15] active:scale-[0.97] active:brightness-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100 hover:before:translate-x-2 hover:before:-translate-y-2"
      >
        <div className={cn(styles.buttonPrimary, 'font-medium justify-center flex flex-nowrap whitespace-nowrap transition-translate duration-300 cursor-pointer group items-center h-full group leading-[150%]', styles.buttonGlass, 'text-sm px-[17px] py-[8px]')}>
          {children}
          <span className="inline-block ml-1 font-normal duration-300 w-fit transition-translate group-hover:translate-x-1 font-unicode">→</span>
        </div>
      </Link>
    </div>
  )
}

function TabGroup({ tabs }: { tabs: DataTabsContent }) {
  const [selected, setSelected] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const pill = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const target = buttons.current[selected]
    if (!target || !pill.current) return
    gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true }).to(pill.current, { left: target.offsetLeft, width: target.offsetWidth, height: target.offsetHeight, duration: 0.2, ease: 'Power2.inOut' })
  }, [selected])
  const panels = [<HoverFrame key="f" frame={tabs.frame} />, <StillPanel key="i" image={tabs.image} />, <StillPanel key="m" image={tabs.map} />, <TextPanel key="t" markup={tabs.textArtwork} />, <AudioPanel key="a" audio={tabs.audio} />]
  return (
    <Tab.Group defaultIndex={0} onChange={setSelected}>
      <div className="flex flex-col-reverse items-start lg:flex-row">
        <div className="relative no-scrollbar sm:mx-0 lg:w-[47%] overflow-visible xl:w-auto max-w-full">
          <div className="px-8 mb-8 -mx-8 overflow-x-auto lg:overflow-x-visible lg:overflow-y-visible no-scrollbar">
            <Tab.List className={styles.tabs}>
              <div ref={pill} className="absolute border rounded-full bg-black/10 border-black/10" />
              {tabs.titles.map((title, i) => (
                <Tab
                  key={title}
                  ref={(el: HTMLButtonElement | null) => {
                    buttons.current[i] = el
                  }}
                  className={({ selected: on }) =>
                    cn(
                      'relative rounded-full px-4 py-2 transition-colors duration-200 focus:outline-hidden',
                      i !== tabs.titles.length - 1 && 'after:w-px after:transition-transform after:duration-100 after:absolute after:bg-black/[0.15] after:right-0 after:h-1/2 after:inline-block after:top-1/2 after:-translate-y-1/2',
                      (selected - 1 === i || selected === i) && 'after:scale-y-0',
                      on ? 'text-black' : 'text-black/50',
                    )
                  }
                >
                  {title}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <p className="mb-8 text-gray-500">{tabs.description}</p>
          <div className="!gap-x-3 xs:!gap-x-6 flex items-center flex-wrap">
            <GlassLink href={tabs.cta.href}>{tabs.cta.text}</GlassLink>
          </div>
        </div>
        <Tab.Panels className="w-full xl:absolute xl:-left-24 xl:top-1/2">
          {panels.map((panel, i) => (
            <Tab.Panel key={i}>{panel}</Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  )
}

/** Module 269185 (inverted, no image) with the tab group inside. */
export function DataTabs({ tabs, className }: { tabs: DataTabsContent; className?: string }) {
  return (
    <div className={cn('bg-[#cc76ff]/[0.02]', className)}>
      <div className="flex z-10 relative flex-col-reverse lg:gap-16 lg:flex-row-reverse" style={{ justifyContent: 'flex-start' }}>
        <div className="xl:flex xl:w-auto w-full flex-col justify-center lg:items-start xl:min-w-[466px] xl:max-w-[466px] flex-1">
          <p className="font-aeonik text-3.5xl xl:text-4xl mb-2 text-[#010101]">{tabs.panelTitle}</p>
          <p className="text-zinc-400 text-[#010101]">{tabs.panelSubtitle}</p>
          <GlowBackground variant={null} className="absolute inset-0 opacity-50" />
          <div className="mt-8 lg:mt-10">
            <TabGroup tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  )
}
