// Scale module 799808. Scale also renders the class with no variant, which draws the purple default: pass variant={null}.
import { cn } from '../lib/cn'
import styles from './GlowBackground.module.css'

export function GlowBackground({ className, variant = 'white' }: { className?: string; variant?: 'white' | 'blue' | 'red' | null }) {
  return <div className={cn('select-none pointer-events-none', className, styles.background, variant && styles[variant])} />
}
