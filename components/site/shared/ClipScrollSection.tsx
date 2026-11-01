'use client'

// Scale module 656598. Each page passes its own startPercentage/startScale: read them from its chunk.
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { clamp, mapRange } from '../lib/math'
import { useScrubTrigger } from '../lib/useScrubTrigger'

export type ClipScrollHandle = { getClipValue: () => number | null; getScaleValue: () => number | null }

export const ClipScrollSection = forwardRef<
  ClipScrollHandle,
  {
    children?: ReactNode
    className?: string
    clipContainerClassName?: string
    backdropColor?: string
    borderRadius?: number
    startPercentage?: number
    startScale?: number
    scrollStart?: string
    scrollEnd?: string
    progressOffset?: number
    noClip?: boolean
  }
>(function ClipScrollSection(
  {
    children,
    className = '',
    clipContainerClassName = '',
    backdropColor = 'white',
    borderRadius = 1,
    startPercentage = 75,
    startScale = 1.25,
    scrollStart = 'top bottom',
    scrollEnd = 'center center',
    progressOffset = 1,
    noClip = false,
  },
  ref,
) {
  const root = useRef<HTMLDivElement>(null)
  const clipEl = useRef<HTMLDivElement>(null)
  const scaleEl = useRef<HTMLDivElement>(null)
  const clipValue = useRef<number | null>(null)
  const scaleValue = useRef<number | null>(null)
  const apply = useCallback(
    (p: number) => {
      clipValue.current = mapRange(p, 0, progressOffset, 0.5 * startPercentage, 0, true)
      scaleValue.current = mapRange(p, 0, progressOffset, startScale, 1, true)
      if (!noClip && clipEl.current) {
        clipEl.current.style.clipPath = `inset(${clamp(clipValue.current, 0, 0.5 * startPercentage)}% round ${borderRadius}rem)`
      }
      if (scaleEl.current) scaleEl.current.style.transform = `scale(${scaleValue.current})`
    },
    [progressOffset, startPercentage, startScale, borderRadius, noClip],
  )
  useEffect(() => {
    apply(0)
  }, [apply])
  useScrubTrigger(root, {
    start: scrollStart,
    end: scrollEnd,
    onUpdate: (self) => {
      apply(self.progress)
    },
  })
  useImperativeHandle(ref, () => ({ getClipValue: () => clipValue.current, getScaleValue: () => scaleValue.current }))
  return (
    <div ref={root} className={cn('ClipScrollSection isolate relative w-full', backdropColor && !noClip ? `bg-${backdropColor}` : '', className)}>
      <div ref={clipEl} className={cn('w-full h-full overflow-hidden', clipContainerClassName)} style={{ clipPath: `inset(0 round ${borderRadius}rem)` }}>
        <div ref={scaleEl} className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
})
ClipScrollSection.displayName = 'ClipScrollSection'
