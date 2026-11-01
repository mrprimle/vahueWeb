'use client'

// Scale module 386218: Headless UI Transition and react-type-animation, one looping state machine.
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { cn } from '@/components/site/lib/cn'
import type { DataEngineContent } from './types'
import styles from './data-engine.module.css'

type Chat = DataEngineContent['buildAi']['chat']
type SetStep = (step: number) => void

function Question({ show, chat, setStep }: { show: boolean; chat: Chat; setStep: SetStep }) {
  return (
    <Transition
      show={show}
      enter="transition-[opacity,transform] transform ease-out duration-300"
      enterFrom="opacity-0 -translate-x-full"
      enterTo="opacity-100 translate-x-0"
      leave="transition-[opacity,transform] transform ease-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex w-fit items-center space-x-1 rounded-[18px] border border-white/[0.16] bg-white/5 px-1.5 py-[3px] sm:space-x-2 md:pl-[7px] md:pr-3 md:py-[4.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="inline-block h-2 sm:w-[18px] w-2 sm:h-[18px] rounded-full" src={chat.userAvatar} alt="" />
        <TypeAnimation sequence={[chat.question, 300, () => setStep(4)]} speed={60} wrapper="div" cursor={false} className="transition-opacity text-[7px] sm:text-sm" />
      </div>
    </Transition>
  )
}

function Thinking({ step, chat, setStep }: { step: number; chat: Chat; setStep: SetStep }) {
  return (
    <div className="flex flex-col items-end space-y-2">
      <Transition
        show={step > 3 && step < 8}
        enter="transition-[opacity,transform] ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-[opacity,transform] ease-out duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 scale-95"
      >
        <div style={{ background: 'linear-gradient(97deg, #FFFFFF, #9A77FF, #4D7DF7, #E151FF, #FFF759) ' }} className="rounded-[18px] p-[0.5px] sm:p-px">
          <div className="rounded-[18px] w-full flex items-center space-x-1 sm:space-x-2 bg-black p-[3px] h-[19px] md:h-auto">
            <TypeAnimation
              sequence={['.', 500, '..', 500, '...', 500, '..', 500, '.', 500, '..', 500, '...', () => setStep(5)]}
              wrapper="div"
              cursor={false}
              className="px-1.5 md:pl-3 md:pr-[7px] md:py-[3px] w-fit py-[3px] transition-opacity"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="inline-block w-2 h-2 rounded-full sm:w-[18px] sm:h-[18px]" src={chat.agentAvatar} alt="" />
          </div>
        </div>
      </Transition>
    </div>
  )
}

function Answer({ show, chat, setStep }: { show: boolean; chat: Chat; setStep: SetStep }) {
  return (
    <Transition
      show={show}
      enter="transition-[opacity,transform] ease-out duration-150"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition-[opacity,transform] ease-out duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      afterEnter={() => {
        setTimeout(() => setStep(2), 2000)
      }}
    >
      <div className="flex justify-end">
        <div className="flex w-fit items-center space-x-1.5 rounded-[18px] border border-white/[0.16] bg-white/5 px-1.5 py-[3px] sm:space-x-2 md:pl-3 md:pr-[5px] md:py-[5px]">
          <div className="rounded-xl w-fit text-[7px] sm:text-sm transition-opacity text-right">{chat.answer}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="inline-block w-2 sm:w-6 h-2 sm:h-6 rounded-full" src={chat.agentAvatar} alt="" />
        </div>
      </div>
    </Transition>
  )
}

const PILL = 'text-[7px] w-fit rounded-full border border-white/[0.16] bg-black/25 px-1 py-0.5 text-neutral-200 transform duration-300 ease-out md:px-3 md:py-1 md:text-sm'

function Ranking({ show, swapped, chat, setStep }: { show: boolean; swapped: boolean; chat: Chat; setStep: SetStep }) {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-300 transform"
      enterFrom="opacity-0 translate-y-full scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition ease-out duration-200 transform"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-full scale-95"
      afterEnter={() => {
        setTimeout(() => {
          setStep(6)
          setTimeout(() => {
            setStep(7)
            setTimeout(() => setStep(8))
          }, 2000)
        }, 1000)
      }}
      afterLeave={() => setStep(9)}
    >
      <div className="after:bg-[linear-gradient(180deg,_rgba(243,_238,_255,_0)_0%,_rgba(243,_238,_255,_0.04)_100%)] after:absolute after:inset-0 after:content-[''] before:border before:border-white/5 before:inset-0 before:absolute relative flex flex-col p-2 pb-[14px] sm:pb-6 md:pb-9 m-1 sm:m-2 space-y-2.5 sm:space-y-6 text-sm before:rounded-sm before:sm:rounded-md rounded-sm sm:rounded-md text-neutral-700">
        <p className="text-[6px] sm:text-[13px] sm:leading-6 text-center text-scale-mauve md:pt-6">{chat.rankingTitle}</p>
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-1 sm:space-y-[7px]">
            <div className={cn(PILL, 'text-right transition-transform', swapped && 'sm:translate-y-20')}>{chat.ranking[0]}</div>
            <div className={cn(PILL, 'text-right transition-[transform,background-color,border-color,color]', swapped && 'sm:-translate-y-[34px] bg-white/10 text-indigo-200 border-white/15')}>{chat.ranking[1]}</div>
            <div className={cn(PILL, 'text-center transition-transform', swapped && 'sm:-translate-y-[33px]')}>{chat.ranking[2]}</div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export function ChatWindow({ chat, className }: { chat: Chat; className?: string }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    setTimeout(() => setStep(3), 1000)
  }, [])
  useEffect(() => {
    if (step === 2) setStep(3)
  })
  return (
    <div className={cn('overflow-hidden rounded-[10px] w-full relative aspect-[649/402]', styles.chatBox, className)}>
      <div className="grid grid-cols-3 p-2 sm:p-3 md:grid-cols-3">
        <div className="flex space-x-[3px] sm:space-x-1.5">
          <div className="w-1.5 sm:w-3 h-1.5 sm:h-3 bg-red-400 rounded-full" />
          <div className="w-1.5 sm:w-3 h-1.5 sm:h-3 rounded-full bg-utility-yellow" />
          <div className="w-1.5 sm:w-3 h-1.5 sm:h-3 rounded-full bg-utility-green" />
        </div>
        <div className="flex text-[7px] sm:text-base font-medium pt-2 justify-center text-neutral-200">{chat.windowTitle}</div>
        <div />
      </div>
      <div className="relative h-full px-6 py-3 space-y-1 text-xs sm:space-y-2 text-neutral-200">
        {step > 2 && <Question show={step > 2} chat={chat} setStep={setStep} />}
        <Thinking step={step} chat={chat} setStep={setStep} />
        <Answer show={step === 9} chat={chat} setStep={setStep} />
      </div>
      <div className="absolute bottom-0 z-10 w-full">
        <Ranking show={step === 5 || step === 6} swapped={step === 6} chat={chat} setStep={setStep} />
      </div>
    </div>
  )
}
