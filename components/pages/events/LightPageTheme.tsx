'use client'

// Scale module 889229: resets the page theme when this page unmounts.
import { useEffect } from 'react'
import { useThemeStore } from '@/components/site/lib/themeStore'

export function LightPageTheme() {
  const reset = useThemeStore((s) => s.resetPageTheme)
  useEffect(() => () => reset(), [reset])
  return null
}
