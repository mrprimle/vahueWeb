'use client'

// Scale module 246339: the hero canvas, capped at pixel ratio 1.5.
import { useMemo } from 'react'
import { ThreeCanvas } from '@/components/site/shared/ThreeCanvas'
import { createHomeHeroScene } from './homeHeroScene'

export default function HomeHeroCanvas({ assets }: { assets: { video: string; perlin: string; numbers: string; fallback: string } }) {
  const scene = useMemo(() => createHomeHeroScene(assets), [assets.video, assets.perlin, assets.numbers, assets.fallback])
  return <ThreeCanvas scene={scene} className="absolute inset-0 w-full h-dvh" maxPixelRatio={1.5} />
}
