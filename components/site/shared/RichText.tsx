'use client'

// Scale module 141280: portable-text blocks. Multi-block values fade as one instead of splitting.
import { useMemo, type ReactNode, type Ref } from 'react'
import { cn } from '../lib/cn'
import { AnimatedText, type AnimatedTextHandle, type TextAnimation } from './AnimatedText'
import { CMSLink } from './CMSLink'

export type RichSpan = { text: string; highlightGray?: boolean; href?: string }
export type RichBlock = {
  style?: 'normal' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subheader1' | 'body1' | 'body2' | 'body3' | 'detailRegular' | 'detailMono'
  text?: string
  children?: RichSpan[]
}

const CLASS: Record<string, [keyof React.JSX.IntrinsicElements, string]> = {
  p: ['p', 'body-1'],
  h1: ['h1', 'header1'],
  h2: ['h2', 'header2'],
  h3: ['h3', 'header3-regular'],
  h4: ['h4', 'header4-regular'],
  h5: ['h5', 'header5-regular'],
  h6: ['h6', 'header6'],
  subheader1: ['h5', 'subheader1'],
  body1: ['p', 'body1'],
  body2: ['p', 'body2-regular'],
  body3: ['p', 'body3'],
  detailRegular: ['p', 'detail-regular'],
  detailMono: ['p', 'detail-mono'],
}

function renderSpans(block: RichBlock): ReactNode {
  if (!block.children) return block.text
  return block.children.map((s, i) => {
    const inner = s.highlightGray ? <span className="highlight gray text-scale-gray-60" key={i}>{s.text}</span> : s.text
    return s.href ? (
      <CMSLink href={s.href} className="underline" key={i}>
        {inner}
      </CMSLink>
    ) : (
      <span key={i}>{inner}</span>
    )
  })
}

export function RichText({
  value,
  animatedTextRef,
  animatedTextClassName,
  customAnimation,
  animatedTagName = 'div',
  contentKey,
  blockClassNames,
  className,
  noSplit = false,
}: {
  value: RichBlock[]
  animatedTextRef?: Ref<AnimatedTextHandle>
  animatedTextClassName?: string
  customAnimation?: TextAnimation
  animatedTagName?: React.ElementType
  contentKey?: unknown
  blockClassNames?: Record<string, string>
  className?: string
  noSplit?: boolean
}) {
  const blocks = useMemo(
    () =>
      value.map((b, i) => {
        const style = b.style ?? 'normal'
        const [Tag, cls] = CLASS[style] ?? ['p', '']
        return (
          <Tag className={cn(cls, blockClassNames?.[style]) || undefined} key={i}>
            {renderSpans(b)}
          </Tag>
        )
      }),
    [value, blockClassNames],
  )
  if (!animatedTextRef) return <>{blocks}</>
  return (
    <AnimatedText
      ref={animatedTextRef}
      tagName={animatedTagName}
      className={cn('RichText', animatedTextClassName, className)}
      contentKey={contentKey}
      preserveLinesMatchingSelector="figure"
      customAnimation={customAnimation}
      noSplit={noSplit}
    >
      {blocks}
    </AnimatedText>
  )
}
