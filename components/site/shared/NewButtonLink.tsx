// Scale module 408298 (NewButtonLink), plain branch: black and white buttons, and `GlassButtonLink` below. The transparent and hash-link branches are not ported: no page using this needs them yet.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import styles from './NewButtonLink.module.css'

export function NewButtonLink({ href, color = 'black', size = 'medium', theme = 'dark', className, children }: { href: string; color?: 'black' | 'white' | 'glass'; size?: 'small' | 'medium'; theme?: 'dark' | 'light'; className?: string; children: ReactNode }) {
  if (color === 'glass') {
    return (
      <div className={cn('h-8 relative p-[1px] flex rounded-full group/glass transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] bg-gradient-to-br from-[#9a9a9a] via-[#1a1a1a] to-[#6a6a6a]', className, theme === 'dark' ? 'text-black' : 'text-white')}>
        <Link
          href={href}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          className="w-full h-full flex items-center justify-center rounded-full relative overflow-hidden bg-custom-gradient backdrop-blur-xs transition-all duration-500 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] hover:brightness-[1.15] active:scale-[0.97] active:brightness-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100 hover:before:translate-x-2 hover:before:-translate-y-2"
        >
          <div className={cn(styles.primary, styles.glass, 'font-medium justify-center flex flex-nowrap whitespace-nowrap transition-translate duration-300 cursor-pointer group items-center h-full group leading-[150%]', size === 'medium' ? 'text-sm px-[17px] py-[8px]' : 'text-xs sm:text-sm px-3 py-1')}>
            {children}
            <span className="inline-block ml-1 font-normal duration-300 w-fit transition-translate group-hover:translate-x-1 font-unicode">→</span>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <Link href={href} style={{ WebkitTapHighlightColor: 'transparent' }} className={cn('relative focus-visible:outline outline-[rgba(255,255,255,0.64)] rounded-xl outline-offset-[3px] inline-block', className)}>
      <div
        className={cn(
          styles.primary,
          'font-medium justify-center flex flex-nowrap whitespace-nowrap transition-translate duration-300 cursor-pointer group items-center h-full group leading-[150%]',
          color === 'black' ? styles.black : styles.white,
          size === 'medium' ? 'text-sm px-[17px] py-[8px]' : 'text-xs sm:text-sm px-3 py-1',
        )}
      >
        {children}
        <span className="inline-block ml-1 font-normal duration-300 w-fit transition-translate group-hover:translate-x-1 font-unicode">→</span>
      </div>
    </Link>
  )
}

/** Glass branch, primary variant, medium size. `theme` picks the wrapper's text colour; the label is always white. CTAs 51051 gives the first button this colour. */
export function GlassButtonLink({ href, theme = 'dark', openInNewTab = false, className, children }: { href: string; theme?: 'dark' | 'light'; openInNewTab?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={cn('h-8 relative p-[1px] flex rounded-full group/glass transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] bg-gradient-to-br from-[#9a9a9a] via-[#1a1a1a] to-[#6a6a6a]', className, theme === 'dark' ? 'text-black' : 'text-white')}>
      <Link
        href={href}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        className="w-full h-full flex items-center justify-center rounded-full relative overflow-hidden bg-custom-gradient backdrop-blur-xs transition-all duration-500 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] hover:brightness-[1.15] active:scale-[0.97] active:brightness-105 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-100 hover:before:translate-x-2 hover:before:-translate-y-2"
      >
        <div className={cn(styles.primary, styles.glass, 'font-medium justify-center flex flex-nowrap whitespace-nowrap transition-translate duration-300 cursor-pointer group items-center h-full group leading-[150%] text-sm px-[17px] py-[8px]')}>
          {children}
          <span className="inline-block ml-1 font-normal duration-300 w-fit transition-translate group-hover:translate-x-1 font-unicode">→</span>
        </div>
      </Link>
    </div>
  )
}
