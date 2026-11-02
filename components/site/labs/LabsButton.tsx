'use client'

// labs.scale.com module 979543 (Button). cva class strings verbatim; `ring` is hsl(0 0% 7%) and `ring-offset` white there.
import { Slot } from './Slot'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/components/site/lib/cn'

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[hsl(0_0%_7%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
const VARIANTS = {
  outline: 'border border-ink bg-transparent text-ink hover:bg-ink hover:text-white font-sans text-xs uppercase tracking-wider rounded-none',
  ghost: 'rounded-md font-sans text-xs uppercase tracking-wider text-ink hover:bg-transparent hover:text-neutral-500',
  black: 'bg-ink text-white font-sans text-xs uppercase tracking-wider rounded-none hover:opacity-75 transition-opacity',
}
const SIZES = { default: 'h-10 px-4 py-2', sm: 'h-8 px-3 text-xs', lg: 'h-12 px-6 text-sm', icon: 'h-10 w-10' }

export type LabsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  asChild?: boolean
}

export const LabsButton = forwardRef<HTMLButtonElement, LabsButtonProps>(function LabsButton({ className, variant = 'black', size = 'default', asChild = false, ...rest }, ref) {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref as never} className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...rest} />
})
