'use client'

// Scale module 753553 (TabsWithImages) with its video thumb 11972, player 647980 and modal 582844.
// `content` is Scale's markdown list: one `- ` line per bullet. The `ctas` slot is not ported: no page using this sets it yet.
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode, type TouchEvent } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from '../lib/gsap'
import { cn } from '../lib/cn'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useThemeStore } from '../lib/themeStore'
import { GlowBackground } from './GlowBackground'
import styles from './TabsWithImages.module.css'

export type TabImage = { src: string; alt: string; width: number; height: number; cover?: boolean; showBackground?: boolean; showBorder?: boolean }
export type TabVideo = { src: string; poster?: string }
export type TabItem = { label: string; content: string; image?: TabImage; video?: TabVideo }

const WISTIA = /(?:https?:\/\/)?(?:[\w-]+\.)?wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/([^/?#&]+)/i

const LIGHT = {
  pill: 'bg-black/10 border-black/10',
  divider: 'after:bg-black/20',
  on: 'text-black',
  off: 'text-black/50',
  chip: 'bg-black/[0.09] border border-black/10',
  prose: 'prose text-black prose-li:list-none prose-ul:pl-0 prose-headings:text-black prose-headings:text-balance prose-headings:font-aeonik prose-headings:font-normal prose-headings:text-3xl prose-headings:leading-[38px] prose-base prose-strong:text-black',
  dotOn: 'bg-black w-4 sm:w-5 md:w-6',
  dotOff: 'bg-black/40 w-1 sm:w-1.5 md:w-2',
}
const DARK = {
  pill: 'bg-white/10 border-white/10',
  divider: 'after:bg-white/20',
  on: 'text-white',
  off: 'text-white/50',
  chip: 'bg-white/[0.09] border border-white/10',
  prose: 'prose text-white prose-li:list-none prose-ul:pl-0 prose-headings:text-white prose-headings:text-balance prose-headings:font-aeonik prose-headings:font-normal prose-headings:text-3xl prose-headings:leading-[38px] prose-base prose-strong:text-white',
  dotOn: 'bg-white w-4 sm:w-5 md:w-6',
  dotOff: 'bg-white/40 w-1 sm:w-1.5 md:w-2',
}

function Modal({ isShowing, hide, children, contentClassName }: { isShowing: boolean; hide: () => void; children: ReactNode; contentClassName: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide()
    }
    document.body.style.overflow = isShowing ? 'hidden' : ''
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [hide, isShowing])
  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!(e.target as Element).closest('[data-modal]')) hide()
    },
    [hide],
  )
  if (!isShowing) return null
  return createPortal(
    <>
      <div className={`${styles.modalOverlay} bg-[#060606]/70 fixed w-screen h-screen inset-0`} style={{ zIndex: 60 }} />
      <div className={`${styles.modal} fixed inset-0 h-screen w-full overflow-y-scroll outline-hidden sm:p-y-10`} style={{ zIndex: 60 }} aria-modal aria-hidden tabIndex={-1} role="dialog" onClick={onClick}>
        <div className="relative z-40 flex items-center justify-center min-h-screen sm:py-6">
          <div className={cn('relative flex flex-col md:text-center bg-neutral-950 sm:min-h-[auto] rounded-2xl pb-8 sm:pb-0 ', styles.modalWidth, contentClassName)} data-modal>
            <div>
              <button className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center hidden" type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                    <path fill="white" fillRule="evenodd" d="M9.817 9.823a.625.625 0 0 1-.885 0L4.995 5.886 1.061 9.82a.626.626 0 0 1-.884-.884L4.11 5.002.177 1.069a.625.625 0 1 1 .885-.885l3.933 3.933L8.931.18a.625.625 0 0 1 .885.885L5.88 5.002l3.937 3.937a.625.625 0 0 1 0 .885Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="h-auto px-4 pb-4 overflow-hidden text-white/70 pt-4">{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

/** Module 647980. A Wistia URL is an iframe, as on Scale. A local file is a `video` in the same box. */
function Video({ video, className, onModalClick }: { video: TabVideo; className?: string; onModalClick?: () => void }) {
  const [state, setState] = useState({ playing: false, animate: false })
  const wistia = video.src.match(WISTIA)?.[1]
  const toggle = useCallback(() => {
    setState((s) => (s.animate ? { ...s, playing: !s.playing } : { animate: true, playing: true }))
  }, [])
  return (
    <div className={className}>
      <div className={cn(styles.wrapper, 'aspect-video')}>
        {onModalClick ? <div onClick={onModalClick} className="absolute inset-0 z-10 hidden cursor-pointer lg:block" /> : null}
        <div className={styles.videoContainer}>
          <div className="relative w-full h-full">
            {wistia ? (
              <iframe className="absolute inset-0 w-full h-full" src={`https://fast.wistia.net/embed/iframe/${wistia}?seo=true`} loading="lazy" allow="autoplay; fullscreen" allowFullScreen title="Wistia video" />
            ) : (
              <video className="absolute inset-0 w-full h-full object-cover" src={video.src} poster={video.poster} controls playsInline preload="metadata" />
            )}
          </div>
        </div>
        {/* Below `lg` the first tap lands here, then the class lets taps through to the player. */}
        {onModalClick ? <div className={cn('group absolute -inset-4', styles.playTrap, state.animate && styles.animate)} onClick={toggle} /> : null}
      </div>
    </div>
  )
}

/** Module 11972. */
function VideoThumb({ video }: { video: TabVideo }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])
  return (
    <div className="relative w-full text-center transition-transform duration-200 ease-in-out group">
      <Modal isShowing={open} hide={close} contentClassName="w-[95vw] max-w-7xl rounded-2xl bg-white/[15%] backdrop-blur-xl md:w-[80vw] lg:w-[70vw]">
        <Video video={video} className="w-full h-full" />
      </Modal>
      <div className="relative w-full rounded-2xl">
        <Video video={video} onModalClick={toggle} />
      </div>
    </div>
  )
}

function TabMedia({ image, video, priority }: { image?: TabImage; video?: TabVideo; priority: boolean }) {
  if (video) return <VideoThumb video={video} />
  if (!image) return null
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes="80vw, (min-width: 1024px) 800px"
      priority={priority}
      className={cn(image.cover ? 'object-cover' : 'object-contain', 'backdrop-blur-xl select-none rounded-2xl block')}
      style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }}
    />
  )
}

export function TabsWithImages({ className, tabs }: { className?: string; tabs: TabItem[] }) {
  const [selected, setSelected] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const pill = useRef<HTMLDivElement>(null)
  const narrow = useMediaQuery('(max-width: 1023px)')
  const theme = useThemeStore((s) => s.pageTheme)
  const tone = theme === 'dark' ? DARK : LIGHT
  useLayoutEffect(() => {
    root.current?.style.setProperty('--marker-color', theme === 'dark' ? '255, 255, 255' : '0, 0, 0')
  })
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [minHeight, setMinHeight] = useState<number | null>(null)
  const panels = useRef<(HTMLElement | null)[]>([])
  const measure = (i: number) => {
    if (!narrow || !panels.current[i]) return
    setMinHeight(panels.current[i]!.scrollHeight)
  }
  useEffect(() => {
    if (!narrow || !panels.current[selected]) return
    setMinHeight(panels.current[selected]!.scrollHeight)
  }, [selected, narrow])
  useEffect(() => {
    const target = tabRefs.current[selected]
    if (!tabRefs.current.length || !pill.current || narrow || !target) return
    gsap.timeline({ autoRemoveChildren: true, smoothChildTiming: true }).to(pill.current, { left: target.offsetLeft, width: target.offsetWidth, height: target.offsetHeight, duration: 0.2, ease: 'Power2.inOut' })
  }, [selected, narrow])
  // Scale passes an inline component to ReactMarkdown, so every state change remounts each bullet. A swipe that starts on bullet text
  // loses its touch target and never reaches `onTouchEnd`. Kept: the same swipes work and fail as on Scale.
  const Bullet = ({ children, ...rest }: HTMLAttributes<HTMLLIElement>) => (
    <li className={styles.bullet} {...rest}>
      <picture className={cn('w-[18px] h-[18px] rounded-full justify-center flex items-center', tone.chip)}>
        <Image src="/donovan/check.svg" alt="" width={10} height={8} sizes="10px" />
      </picture>
      {children}
    </li>
  )
  return (
    <div ref={root}>
      <Tab.Group selectedIndex={selected} onChange={setSelected} className={className} as="div">
        <div className="hidden px-8 mx-auto mb-8 overflow-x-auto lg:block w-fit lg:overflow-x-visible lg:overflow-y-visible no-scrollbar">
          <Tab.List className={styles.tabs}>
            <div ref={pill} className={cn('absolute border rounded-full', tone.pill)} />
            {tabs.map(({ label }, i) => (
              <Tab key={label} as={Fragment}>
                {({ selected: on }) => (
                  <div
                    ref={(el) => {
                      if (el) tabRefs.current[i] = el
                    }}
                    className={cn(
                      'relative cursor-pointer rounded-full px-4 py-2 transition-colors duration-200 focus:outline-hidden',
                      i !== tabs.length - 1 && cn('after:absolute after:right-0 after:top-1/2 after:inline-block after:h-1/2 after:w-px after:-translate-y-1/2 after:transition-transform after:duration-100', tone.divider),
                      (selected - 1 === i || selected === i) && 'after:scale-y-0',
                      on ? tone.on : tone.off,
                    )}
                  >
                    {label}
                  </div>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div className={cn(styles.box, 'px-6 md:px-10 py-8 lg:py-12 xl:py-20 lg:pl-[58px] lg:pr-0')}>
          <GlowBackground className="absolute inset-0 z-0 transform -translate-y-1/2 opacity-50" />
          <Tab.Panels
            className={cn('w-full relative z-10', narrow && styles.swipeContainer)}
            style={narrow && minHeight ? { minHeight: `${minHeight}px` } : undefined}
            onTouchStart={
              narrow
                ? (e: TouchEvent) => {
                    setTouchEnd(null)
                    setTouchStart(e.targetTouches[0].clientX)
                  }
                : undefined
            }
            onTouchMove={narrow ? (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX) : undefined}
            onTouchEnd={
              narrow
                ? () => {
                    if (!touchStart || !touchEnd) return
                    const d = touchStart - touchEnd
                    if (d > 50 && selected < tabs.length - 1) {
                      measure(selected + 1)
                      setSelected(selected + 1)
                    }
                    if (d < -50 && selected > 0) {
                      measure(selected - 1)
                      setSelected(selected - 1)
                    }
                  }
                : undefined
            }
          >
            {tabs.map(({ image, video, content, label }, i) => (
              <Tab.Panel
                key={`panel-${label}`}
                ref={(el: HTMLElement | null) => {
                  panels.current[i] = el
                }}
                className="lg:items-center grid lg:grid-cols-[1.5fr_2fr] xl:grid-cols-[1.2fr_2fr] gap-6 md:gap-8 lg:gap-8 xl:gap-x-[114px] [&>_:first-child]:order-1 lg:[&>_:first-child]:order-none"
              >
                <div className={tone.prose}>
                  <ul>
                    {content
                      .split('\n')
                      .map((line) => line.replace(/^\s*-\s+/, '').trim())
                      .filter(Boolean)
                      .map((line) => (
                        <Bullet key={line}>{line}</Bullet>
                      ))}
                  </ul>
                </div>
                <div className="z-10 flex items-center justify-center w-full lg:ml-6">
                  <figure
                    className={cn(
                      'relative rounded-2xl',
                      !video && (image?.showBackground ?? true) && 'bg-black p-4',
                      video && 'aspect-video w-full max-w-2xl',
                      styles.image,
                      !video && (image?.showBorder ?? true) && styles.imageBorder,
                    )}
                  >
                    <TabMedia image={image} video={video} priority={i === 0} />
                  </figure>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
        {tabs.length > 1 ? (
          <div className="relative mx-auto mt-2 max-w-max lg:hidden">
            {tabs.map((tab, i) => (
              <button
                key={`dot-${tab.label}`}
                onClick={() => {
                  measure(i)
                  setSelected(i)
                }}
                className="px-1 py-2 sm:px-2"
                type="button"
                aria-label={`Select tab ${i + 1}: ${tab.label}`}
                role="tab"
                aria-selected={selected === i}
              >
                <div className={cn('h-1 sm:h-1.5 md:h-2 rounded-full transition-width duration-300', selected === i ? tone.dotOn : tone.dotOff)} />
              </button>
            ))}
          </div>
        ) : null}
      </Tab.Group>
    </div>
  )
}
