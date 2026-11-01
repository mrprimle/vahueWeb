// Scale module 408298 (NewButtonLink), plain branch: black and white buttons. The glass, transparent and hash-link branches are not ported: no page using this needs them yet.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import styles from './NewButtonLink.module.css'

export function NewButtonLink({ href, color = 'black', size = 'medium', className, children }: { href: string; color?: 'black' | 'white'; size?: 'small' | 'medium'; className?: string; children: ReactNode }) {
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
