import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/components/site/lib/cn'

/** Minimal Radix `Slot`: the single child element takes the parent's props. */
export function Slot({ children, className, ...rest }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  const child = Children.only(children)
  if (!isValidElement(child)) return null
  const el = child as ReactElement<{ className?: string }>
  return cloneElement(el, { ...rest, ...el.props, className: cn(className, el.props.className) })
}
