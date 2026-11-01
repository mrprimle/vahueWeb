import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import ScaleHeader from '@/components/scale-clone/shared/ScaleHeader'
import ScaleFooter from '@/components/scale-clone/shared/ScaleFooter'
import CloneChrome from '@/components/scale-clone/shared/CloneChrome'

export const metadata: Metadata = {
  title: 'Scale clone',
  robots: { index: false, follow: false },
}

// Structural clones of scale.com pages. Placeholder copy until Vahue research fills them in.
export default function ScaleCloneLayout({ children }: { children: ReactNode }) {
  return (
    <div className="scale-clone min-h-screen bg-white text-[#0a0a0a] font-display">
      <CloneChrome>
        <SmoothScroll />
        <ScaleHeader />
      </CloneChrome>
      {children}
      <CloneChrome>
        <ScaleFooter />
      </CloneChrome>
    </div>
  )
}
