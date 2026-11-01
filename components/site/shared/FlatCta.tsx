'use client'

// Scale module 892855 (FlatCta): the hover wash enters from the edge on enter, leaves through the
// opposite edge, and only resets on the transform transitionend or the 680ms fallback.
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import { cn } from '../lib/cn'
import { CMSLink } from './CMSLink'

export type FlatCtaVariant = 'fill' | 'border' | 'arrow' | 'arrowOutline'
export type FlatCtaTheme = 'black' | 'white' | 'evergreen' | 'gray' | 'mutedLight' | 'mutedDark' | 'none'
export type FlatCtaThemeHandle = { updateTheme: (t: FlatCtaTheme | null | undefined) => void }

export type FlatCtaProps = {
  href?: string | null
  variant?: FlatCtaVariant
  theme?: FlatCtaTheme
  themeControlRef?: Ref<FlatCtaThemeHandle>
  text?: string
  className?: string
  iconOnly?: boolean
  direction?: 'left' | 'right'
  smoothScrollTargetId?: string
  as?: 'link' | 'button'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  disabled?: boolean
  animationLayout?: boolean
  animationRefs?: {
    root?: React.Ref<HTMLElement>
    counterScale?: React.Ref<HTMLDivElement>
    textEl?: React.Ref<HTMLSpanElement>
    arrowEl?: React.Ref<HTMLDivElement>
  }
  startHidden?: boolean
  contentInsetClassName?: string
  contentGapClassName?: string
  contentRowClassName?: string
  arrowBoxClassName?: string
}

function assign<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return
  if (typeof ref === 'function') ref(value)
  else (ref as React.RefObject<T | null>).current = value
}

function darkWash(theme: FlatCtaTheme, variant: FlatCtaVariant) {
  if (theme === 'none' || theme == null) return false
  const outline = variant === 'border' || variant === 'arrowOutline'
  switch (theme) {
    case 'black':
    case 'evergreen':
      return !outline
    case 'white':
      return outline
    case 'mutedDark':
      return true
    default:
      return false
  }
}

export const FlatCta = forwardRef<HTMLElement, FlatCtaProps>(function FlatCta(
  {
    href,
    variant,
    theme,
    themeControlRef,
    text,
    className,
    iconOnly = false,
    direction = 'right',
    smoothScrollTargetId,
    as = 'link',
    onClick,
    type = 'button',
    'aria-label': ariaLabel,
    disabled,
    animationLayout = false,
    animationRefs,
    startHidden = false,
    contentInsetClassName,
    contentGapClassName,
    contentRowClassName,
    arrowBoxClassName,
  },
  ref,
) {
  const [themeOverride, setThemeOverride] = useState<FlatCtaTheme | null>(null)
  const t: FlatCtaTheme = themeOverride ?? theme ?? 'black'
  const v: FlatCtaVariant = variant || 'fill'
  const hasWash = t !== 'evergreen'
  const multiplyLayer = t === 'evergreen' && v !== 'border' && v !== 'arrowOutline'
  useImperativeHandle(themeControlRef, () => ({
    updateTheme(next) {
      setThemeOverride(next == null ? null : next)
    },
  }), [])
  const isArrow = variant === 'arrow' || variant === 'arrowOutline'
  const washMs = isArrow ? 600 : 300
  const [hovered, setHovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const leavingRef = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [arrowOver, setArrowOver] = useState(false)
  const [arrowReset, setArrowReset] = useState(false)

  const finishLeave = useCallback(() => {
    if (!leavingRef.current) return
    if (timer.current != null) {
      clearTimeout(timer.current)
      timer.current = null
    }
    leavingRef.current = false
    setLeaving(false)
    setResetting(true)
  }, [])
  useEffect(
    () => () => {
      if (timer.current != null) {
        clearTimeout(timer.current)
        timer.current = null
      }
    },
    [],
  )
  const onEnter = useCallback(() => {
    if (disabled) return
    if (hasWash) {
      if (timer.current != null) {
        clearTimeout(timer.current)
        timer.current = null
      }
      setResetting(leavingRef.current)
      leavingRef.current = false
      setLeaving(false)
      setHovered(true)
    }
    if (isArrow) {
      setArrowReset(false)
      setArrowOver(true)
    }
  }, [disabled, isArrow, hasWash])
  const onLeave = useCallback(() => {
    if (isArrow) {
      setArrowOver(false)
      setArrowReset(true)
    }
    if (!hasWash) return
    setHovered(false)
    if (!resetting) {
      setLeaving(true)
      leavingRef.current = true
      if (timer.current != null) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        timer.current = null
        finishLeave()
      }, 680)
    }
  }, [finishLeave, isArrow, hasWash, resetting])
  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      const p = e.propertyName
      if (p === 'transform' || p === '-webkit-transform') finishLeave()
    },
    [finishLeave],
  )
  useEffect(() => {
    if (!resetting) return
    let b: number | undefined
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setResetting(false))
    })
    return () => {
      cancelAnimationFrame(a)
      if (b != null) cancelAnimationFrame(b)
    }
  }, [resetting])
  useEffect(() => {
    if (!arrowReset) return
    let b: number | undefined
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setArrowReset(false))
    })
    return () => {
      cancelAnimationFrame(a)
      if (b != null) cancelAnimationFrame(b)
    }
  }, [arrowReset])

  const washPosition = resetting
    ? isArrow
      ? '-translate-x-full translate-y-0'
      : 'translate-y-full translate-x-0'
    : hovered
      ? 'translate-x-0 translate-y-0'
      : leaving
        ? isArrow
          ? 'translate-x-full translate-y-0'
          : '-translate-y-full translate-x-0'
        : isArrow
          ? '-translate-x-full translate-y-0'
          : 'translate-y-full translate-x-0'
  const washOpacity = !darkWash(t, v) ? 'opacity-35' : 'opacity-30'
  const arrowish = v === 'arrow' || v === 'arrowOutline'
  const gap = contentGapClassName ?? (arrowish && (t === 'evergreen' ? 'gap-0!' : 'gap-4')) ?? ''
  const row = contentRowClassName ?? 'justify-center'
  const outlined = variant === 'border' || variant === 'arrowOutline'
  const rootClass = cn(
    'FlatCta group/cta relative overflow-hidden inline-flex items-center justify-center rounded-md w-fit h-max cursor-pointer',
    { fill: '', border: 'border', arrow: '', arrowOutline: 'border' }[v],
    {
      black: outlined ? 'border-black text-black' : 'bg-black text-white',
      white: outlined ? 'border-white text-white' : 'bg-white text-black',
      evergreen: outlined ? 'border-green text-green' : 'bg-evergreen text-white',
      gray: outlined ? 'border-scale-gray-90 text-black' : 'bg-scale-gray-90 text-black',
      mutedLight: outlined
        ? 'border-neutral-400/50 bg-transparent text-neutral-600 hover:border-neutral-500/70 hover:text-black'
        : 'bg-neutral-100 text-neutral-900',
      mutedDark: outlined ? 'border-white/20 bg-transparent text-neutral-300 hover:border-white/40 hover:text-white' : 'bg-scale-gray-10 text-white',
      none: '',
    }[t],
    multiplyLayer && 'isolate',
    animationLayout && 'origin-center transform-gpu will-change-transform',
    className,
  )
  const setRoot = (el: HTMLElement | null) => {
    assign(animationRefs?.root, el)
    assign(ref, el)
  }
  const label = (
    <span
      ref={animationLayout ? animationRefs?.textEl : undefined}
      className={cn(
        iconOnly ? 'hidden' : 'self-center cta h-fit block text-nowrap font-medium',
        !isArrow &&
          !iconOnly &&
          'relative z-[1] inline-block origin-center transform-gpu transition-transform duration-300 ease-out group-hover/cta:scale-90 motion-reduce:transition-none motion-reduce:group-hover/cta:scale-100',
      )}
    >
      {text}
    </span>
  )
  const chevron = (
    <svg className={cn('block shrink-0', direction === 'left' && 'scale-x-[-1]')} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.12994 12.7576C5.99604 12.8915 5.77896 12.8915 5.64506 12.7576L5.24244 12.3549C5.10854 12.221 5.10854 12.004 5.24244 11.8701L8.58217 8.53033C8.87506 8.23744 8.87506 7.76256 8.58217 7.46967L5.24244 4.12994C5.10854 3.99604 5.10854 3.77896 5.24244 3.64506L5.64506 3.24244C5.77896 3.10854 5.99604 3.10854 6.12994 3.24244L10.3572 7.46967C10.6501 7.76256 10.6501 8.23744 10.3572 8.53033L6.12994 12.7576Z"
        fill="currentColor"
      />
    </svg>
  )
  const arrowSlide = !disabled && arrowOver && !arrowReset
  const arrow = isArrow ? (
    <div
      ref={animationLayout ? animationRefs?.arrowEl : undefined}
      className={cn(
        'icon relative z-[1] box-border flex shrink-0 items-center justify-center overflow-hidden rounded-md',
        arrowBoxClassName ?? (iconOnly ? 'h-7 w-7 p-0' : 'h-8 w-8 p-2'),
        {
          black: variant === 'arrowOutline' ? 'bg-transparent text-black' : 'bg-white text-black',
          white: variant === 'arrowOutline' ? 'bg-transparent text-white' : 'bg-black text-white',
          evergreen: variant === 'arrowOutline' ? 'bg-transparent text-green' : 'bg-transparent text-white',
          gray: variant === 'arrowOutline' ? 'bg-transparent text-black' : 'bg-scale-gray-90 text-black',
          mutedLight: variant === 'arrowOutline' ? 'bg-transparent text-neutral-700' : 'bg-neutral-200 text-neutral-900',
          mutedDark: variant === 'arrowOutline' ? 'bg-transparent text-neutral-300' : 'bg-white/15 text-white',
          none: '',
        }[t],
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 flex h-full w-[200%] transform-gpu',
          arrowSlide ? (direction === 'left' ? '-translate-x-1/2' : 'translate-x-0') : direction === 'left' ? 'translate-x-0' : '-translate-x-1/2',
          arrowReset && '!transition-none',
          !arrowReset && !disabled && 'transition-transform ease-out will-change-transform',
          'motion-reduce:!translate-x-0 motion-reduce:!transition-none',
        )}
        style={disabled || arrowReset ? undefined : { transitionDuration: '600ms' }}
      >
        <span className="flex h-full w-1/2 shrink-0 items-center justify-center">{chevron}</span>
        <span className="flex h-full w-1/2 shrink-0 items-center justify-center">{chevron}</span>
      </div>
    </div>
  ) : null
  const wash = hasWash ? (
    <div
      aria-hidden
      onTransitionEnd={onTransitionEnd}
      className={cn(
        'pointer-events-none absolute inset-0 z-0 size-full min-h-0 min-w-0 rounded-[inherit] bg-current',
        washOpacity,
        !resetting && 'transition-transform ease-out motion-reduce:transition-none',
        washPosition,
      )}
      style={resetting ? undefined : { transitionDuration: `${washMs}ms` }}
    />
  ) : null
  const inner = animationLayout ? (
    <div
      ref={animationRefs?.counterScale}
      className={cn('relative z-[1] flex min-w-0 w-full max-w-full flex-1 flex-wrap items-center transform-gpu will-change-transform', row, gap)}
    >
      {label}
      {arrow}
    </div>
  ) : (
    <>
      {label}
      {arrow}
    </>
  )
  const contentClass = cn(
    'relative inline-flex min-h-0 min-w-0 max-w-full flex-wrap items-center',
    row,
    multiplyLayer ? 'z-[2]' : 'z-[1]',
    contentInsetClassName ??
      { fill: 'px-4 py-2', border: 'px-4 py-2', arrow: 'pl-4 py-1 pr-1', arrowOutline: iconOnly ? 'px-3 py-2' : 'px-4 py-2 pl-4 py-1 pr-1' }[v],
    !animationLayout && gap,
  )
  const multiply = multiplyLayer ? (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-black opacity-0 mix-blend-multiply transition-opacity duration-300 ease-out motion-reduce:transition-none',
        !disabled && 'group-hover/cta:opacity-[0.18] motion-reduce:group-hover/cta:opacity-0',
      )}
    />
  ) : null
  const body = (
    <>
      {wash}
      {multiply}
      <div className={contentClass}>{inner}</div>
    </>
  )
  if (as === 'button') {
    return (
      <button
        ref={setRoot as React.Ref<HTMLButtonElement>}
        type={type}
        className={rootClass}
        onClick={onClick}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        aria-label={ariaLabel}
        disabled={disabled}
        style={{ visibility: startHidden ? 'hidden' : 'visible' }}
      >
        {body}
      </button>
    )
  }
  return (
    <CMSLink
      ref={setRoot}
      href={href}
      smoothScrollTargetId={smoothScrollTargetId}
      className={rootClass}
      style={{ visibility: startHidden ? 'hidden' : 'visible' }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {body}
    </CMSLink>
  )
})
FlatCta.displayName = 'FlatCta'
