/* eslint-disable @next/next/no-img-element */

// Renders a looping muted video for .mp4/.webm sources, otherwise an image.
// Keeps placeholder SVGs and final assets interchangeable via content.ts.
export default function Media({ src, className = '' }: { src: string; className?: string }) {
  const cls = `block h-full w-full object-cover ${className}`
  if (/\.(mp4|webm)$/i.test(src)) {
    return <video src={src} className={cls} autoPlay muted loop playsInline preload="metadata" />
  }
  return <img src={src} alt="" className={cls} draggable={false} />
}
