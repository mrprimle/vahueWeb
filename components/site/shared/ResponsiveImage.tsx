'use client'

// Scale module 669677, without the Sanity loader: assets are local paths in public/<slug>/.
import Image from 'next/image'
import { forwardRef } from 'react'
import { cn } from '../lib/cn'

export type ImageAsset = { path: string; alt?: string; width?: number; height?: number }

export type ResponsiveImageProps = {
  asset: ImageAsset
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  objectCover?: boolean
  objectContain?: boolean
  alt?: string
  noBackground?: boolean
  /** Scale's per-image palette colour behind the image while it loads. */
  backgroundColor?: string
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
  { asset, fill, className, sizes, priority, objectCover = false, objectContain = false, alt, noBackground = false, backgroundColor },
  ref,
) {
  if (!asset?.path) return null
  return (
    <div
      className={cn('ResponsiveImage', fill && 'relative h-full w-full', className)}
      style={{ backgroundColor: noBackground ? 'transparent' : (backgroundColor ?? '#193A29') }}
    >
      <Image
        ref={ref}
        src={asset.path}
        alt={alt !== undefined ? alt : asset.alt ? asset.alt : ''}
        fill={!!fill}
        width={fill ? undefined : asset.width}
        height={fill ? undefined : asset.height}
        sizes={sizes || ''}
        priority={!!priority}
        unoptimized
        {...(priority ? {} : { loading: 'lazy' as const })}
        className={cn('opacity-100', objectCover ? 'object-cover' : objectContain ? 'object-contain' : '')}
      />
    </div>
  )
})
