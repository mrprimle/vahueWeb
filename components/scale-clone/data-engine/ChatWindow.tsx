'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { prefersReducedMotion } from './animatedText'
import s from './dataEngine.module.css'

/*
 * "AI Text Generator" demo from scale.com's Build AI block (chunk 386218: headless-ui Transition
 * + react-type-animation). Looping state machine:
 *   0  --1s-->  3   question pill slides in (300ms, from -100% x) and types (40ms/key +-50%), +300ms -> 4
 *   4           thinking bubble scales in (200ms, .95 -> 1); dots sequence (500ms holds)        -> 5
 *   5           ranking panel rises (300ms, translateY 100% + scale .95);  +1s -> 6 (pills swap, 300ms)
 *   6   --2s--> 7 -> 8   panel leaves (200ms), bubble leaves (150ms)                            -> 9
 *   9           answer pill scales in (150ms); +2s -> 2 -> 3 (question remounts and retypes)
 */

const ASSET = '/scale-clone/data-engine'
// TODO: Vahue copy (demo strings)
const QUESTION = 'Why do reviewers matter for reliable model answers?'
const ANSWER = 'Models do not always match what people actually prefer.'
const RANKS = [
  'Models learn from friendly owls, who never fib',
  'Models do not always match what people actually prefer',
  'People like sharing views. It makes them feel heard',
]
const DOTS = ['.', '..', '...', '..', '.', '..', '...']

type TransitionProps = {
  show: boolean
  duration: number
  leaveDuration: number
  from: CSSProperties
  leaveTo?: CSSProperties
  afterEnter?: () => void
  afterLeave?: () => void
  className?: string
  children: ReactNode
}

// Minimal mount/unmount transition with headless-ui semantics (enterFrom -> enterTo, leaveTo).
function Transition({ show, duration, leaveDuration, from, leaveTo, afterEnter, afterLeave, className, children }: TransitionProps) {
  const [mounted, setMounted] = useState(show)
  const [state, setState] = useState<'from' | 'to' | 'leave'>(show ? 'from' : 'leave')
  const cbs = useRef({ afterEnter, afterLeave })
  cbs.current = { afterEnter, afterLeave }

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    let r1 = 0
    let r2 = 0
    if (show) {
      setMounted(true)
      setState('from')
      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setState('to'))
      })
      t = setTimeout(() => cbs.current.afterEnter?.(), duration + 32)
    } else if (mounted) {
      setState('leave')
      t = setTimeout(() => {
        setMounted(false)
        cbs.current.afterLeave?.()
      }, leaveDuration)
    }
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  if (!mounted) return null
  const style: CSSProperties =
    state === 'from'
      ? { ...from, transition: 'none' }
      : state === 'leave'
        ? { ...(leaveTo ?? { opacity: 0 }), transition: `opacity ${leaveDuration}ms ease-out, transform ${leaveDuration}ms ease-out` }
        : { opacity: 1, transform: 'none', transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out` }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

// Types `text` one character at a time, then calls onDone after `hold` ms.
function useTyping(text: string, active: boolean, onDone?: () => void, hold = 300) {
  const [out, setOut] = useState('')
  const done = useRef(onDone)
  done.current = onDone
  useEffect(() => {
    if (!active) return
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const step = () => {
      i += 1
      setOut(text.slice(0, i))
      if (i < text.length) t = setTimeout(step, 40 + 40 * (Math.random() - 0.5))
      else t = setTimeout(() => done.current?.(), hold)
    }
    t = setTimeout(step, 40)
    return () => clearTimeout(t)
  }, [text, active, hold])
  return out
}

function Question({ onDone, still }: { onDone: () => void; still: boolean }) {
  const typed = useTyping(QUESTION, !still, onDone)
  return (
    <div className={`${s.pill} flex w-fit items-center gap-1 rounded-[18px] px-1.5 py-[3px] sm:gap-2 md:py-[4.5px] md:pl-[7px] md:pr-3`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="inline-block h-2 w-2 rounded-full sm:h-[18px] sm:w-[18px]" src={`${ASSET}/avatar.jpg`} alt="" />
      <div className="text-[7px] sm:text-sm">{still ? QUESTION : typed || ' '}</div>
    </div>
  )
}

function Dots({ active, onDone }: { active: boolean; onDone: () => void }) {
  const [i, setI] = useState(0)
  const done = useRef(onDone)
  done.current = onDone
  useEffect(() => {
    if (!active) return
    setI(0)
    let k = 0
    let t: ReturnType<typeof setTimeout>
    const next = () => {
      k += 1
      if (k >= DOTS.length) return done.current()
      setI(k)
      t = setTimeout(next, 540)
    }
    t = setTimeout(next, 540)
    return () => clearTimeout(t)
  }, [active])
  return <div className="w-fit px-1.5 py-[3px] md:py-[3px] md:pl-3 md:pr-[7px]">{DOTS[i]}</div>
}

export default function ChatWindow() {
  const [step, setStep] = useState(0)
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStill(true)
      setStep(6)
      return
    }
    const t = setTimeout(() => setStep(3), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (step === 2) setStep(3)
  }, [step])

  const swapped = step === 6
  const panelTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => panelTimers.current.forEach(clearTimeout), [])

  return (
    <div className={`${s.chat} font-display`}>
      <div className="grid grid-cols-3 p-2 sm:p-3">
        <div className="flex gap-[3px] sm:gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#f87171] sm:h-3 sm:w-3" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#FFD600] sm:h-3 sm:w-3" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#72CE7B] sm:h-3 sm:w-3" />
        </div>
        {/* TODO: Vahue copy */}
        <div className={`${s.chatMuted} flex justify-center pt-2 text-[7px] font-medium leading-[1.65] sm:text-base`}>Text Model Studio</div>
        <div />
      </div>

      <div className={`${s.chatMuted} relative h-full space-y-1 px-6 py-3 text-xs sm:space-y-2`}>
        {step > 2 && (
          <Transition show duration={300} leaveDuration={150} from={{ opacity: 0, transform: 'translateX(-100%)' }}>
            <Question still={still} onDone={() => setStep(4)} />
          </Transition>
        )}
        <div className="flex flex-col items-end space-y-2">
          <Transition
            show={step > 3 && step < 8}
            duration={200}
            leaveDuration={150}
            from={{ opacity: 0, transform: 'scale(0.95)' }}
            leaveTo={{ opacity: 0, transform: 'scale(0.95)' }}
          >
            <div className={`${s.gradientRing} rounded-[18px] p-[0.5px] sm:p-px`}>
              <div className="flex h-[19px] w-full items-center gap-1 rounded-[18px] bg-black p-[3px] sm:gap-2 md:h-auto">
                <Dots active={step === 4 && !still} onDone={() => setStep(5)} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-block h-2 w-2 rounded-full sm:h-[18px] sm:w-[18px]" src={`${ASSET}/llm-1.png`} alt="" />
              </div>
            </div>
          </Transition>
        </div>
        <Transition
          show={step === 9}
          duration={150}
          leaveDuration={150}
          from={{ opacity: 0, transform: 'scale(0.95)' }}
          leaveTo={{ opacity: 0, transform: 'scale(0.95)' }}
          afterEnter={() => panelTimers.current.push(setTimeout(() => setStep(2), 2000))}
        >
          <div className="flex justify-end">
            <div className={`${s.pill} flex w-fit items-center gap-1.5 rounded-[18px] px-1.5 py-[3px] sm:gap-2 md:py-[5px] md:pl-3 md:pr-[5px]`}>
              {/* TODO: Vahue copy */}
              <div className="w-fit rounded-xl text-right text-[7px] sm:text-sm">{ANSWER}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="inline-block h-2 w-2 rounded-full sm:h-6 sm:w-6" src={`${ASSET}/llm-1.png`} alt="" />
            </div>
          </div>
        </Transition>
      </div>

      <div className="absolute bottom-0 z-10 w-full">
        <Transition
          show={step === 5 || step === 6}
          duration={300}
          leaveDuration={200}
          from={{ opacity: 0, transform: 'translateY(100%) scale(0.95)' }}
          leaveTo={{ opacity: 0, transform: 'translateY(100%) scale(0.95)' }}
          afterEnter={() => {
            if (still) return
            panelTimers.current.push(
              setTimeout(() => {
                setStep(6)
                panelTimers.current.push(setTimeout(() => setStep(8), 2000))
              }, 1000),
            )
          }}
          afterLeave={() => setStep(9)}
        >
          <div className="relative m-1 flex flex-col space-y-2.5 rounded-sm p-2 pb-[14px] text-sm text-[#404040] sm:m-2 sm:space-y-6 sm:rounded-md sm:pb-6 md:pb-9">
            {/* TODO: Vahue copy */}
            <p className="text-center text-[6px] text-[#C88BC4] sm:text-[13px] sm:leading-6 md:pt-6">Reviewer Preference Ranking</p>
            <div className="flex justify-center">
              <div className="flex flex-col items-center space-y-1 sm:space-y-[7px]">
                <div
                  className={`${s.rankPill} w-fit transform rounded-full px-1 py-0.5 text-right text-[7px] transition-transform duration-300 ease-out md:px-3 md:py-1 md:text-sm ${swapped ? 'sm:translate-y-20' : ''}`}
                >
                  {RANKS[0]}
                </div>
                <div
                  className={`${s.rankPill} ${swapped ? s.rankPillActive : ''} w-fit transform rounded-full px-1 py-0.5 text-right text-[7px] transition-[transform,background-color,border-color,color] duration-300 ease-out md:px-3 md:py-1 md:text-sm ${swapped ? 'sm:-translate-y-[34px]' : ''}`}
                >
                  {RANKS[1]}
                </div>
                <div
                  className={`${s.rankPill} w-fit transform rounded-full px-1 py-0.5 text-center text-[7px] transition-transform duration-300 ease-out md:px-3 md:py-1 md:text-sm ${swapped ? 'sm:-translate-y-[33px]' : ''}`}
                >
                  {RANKS[2]}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
