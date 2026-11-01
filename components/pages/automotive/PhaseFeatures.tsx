'use client'

// Scale module 450359 (Features, `numbers`, three items) with its video thumb, modal 582844 and player 832862.
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/components/site/lib/cn'
import styles from './automotive.module.css'
import type { Phase } from './types'

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full overflow-hidden rounded-2xl bg-scale-gray-95" />,
})

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
              <button className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center" type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                    <path fill="white" fillRule="evenodd" d="M9.817 9.823a.625.625 0 0 1-.885 0L4.995 5.886 1.061 9.82a.626.626 0 0 1-.884-.884L4.11 5.002.177 1.069a.625.625 0 1 1 .885-.885l3.933 3.933L8.931.18a.625.625 0 0 1 .885.885L5.88 5.002l3.937 3.937a.625.625 0 0 1 0 .885Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="h-auto px-4 pb-4 overflow-hidden text-white/70">{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}

function VideoThumb({ image, video }: { image: Phase['image']; video: string }) {
  const [open, setOpen] = useState(false)
  const hide = useCallback(() => setOpen(false), [])
  return (
    <div className="overflow-hidden relative w-full rounded-lg aspect-[3/2]">
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 80vw, 480px" className="object-cover absolute inset-0 w-full h-full" />
      <Modal isShowing={open} hide={hide} contentClassName="w-[95vw] max-w-7xl rounded-2xl bg-white/[15%] backdrop-blur-xl md:w-[80vw] lg:w-[70vw]">
        <div className="aspect-video w-full">{open ? <div className="relative w-full h-full w-full"><VideoPlayer src={video} poster={image.src} title={image.alt} autoPlay /></div> : null}</div>
      </Modal>
      <div className="flex absolute inset-0 justify-center items-center pointer-events-none">
        <button onClick={() => setOpen(true)} className="pointer-events-auto w-16 h-16 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors" aria-label="Play video">
          <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <path fill="#FFF" d="M48.79 26.129l-33-19.508C13.104 5.035 9 6.574 9 10.492V49.5c0 3.516 3.816 5.637 6.79 3.871l33-19.5c2.94-1.734 2.952-6.008 0-7.742z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function PhaseFeatures({ items }: { items: Phase[] }) {
  return (
    <div className="grid relative items-start grid-cols-1 md:grid-cols-2 gap-14 md:gap-6 lg:grid-cols-3 xl:gap-x-10 xl:gap-y-14">
      {items.map((item, i) => (
        <div key={item.title}>
          <div className={styles.feature}>
            <VideoThumb image={item.image} video={item.video} />
          </div>
          <p className="relative mt-8 text-2xl lg:mt-12 font-aeonik text-black ml-11">
            <span className={cn(styles.number, 'absolute text-xs min-w-[22px] flex items-center justify-center min-h-[22px] rounded-full -translate-y-1/2 top-1/2 -left-10 bg-white/[0.09]')}>{i + 1}</span>
            {item.title}
          </p>
          <p className="relative mt-3 text-black/70 text-base ml-11">{item.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
