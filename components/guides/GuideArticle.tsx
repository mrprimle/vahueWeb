'use client'

import { useEffect, useRef } from 'react'

type GuideArticleProps = {
  html: string
}

/**
 * Renders the guide HTML and progressively enhances every <pre> block with a
 * "Copy" button that copies the code to the clipboard.
 */
export default function GuideArticle({ html }: GuideArticleProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const preElements = Array.from(root.querySelectorAll('pre'))
    const cleanups: Array<() => void> = []

    preElements.forEach((pre) => {
      if (pre.dataset.copyEnhanced === 'true') return
      pre.dataset.copyEnhanced = 'true'

      pre.style.position = 'relative'
      pre.style.paddingTop = '2.75rem'

      const button = document.createElement('button')
      button.type = 'button'
      button.setAttribute('aria-label', 'Copy code to clipboard')
      button.className = 'guide-pre-copy'
      button.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>Copy</span>
      `

      const onClick = async () => {
        const codeNode = pre.querySelector('code')
        const text = (codeNode?.textContent ?? pre.textContent ?? '').replace(/\n$/, '')
        try {
          await navigator.clipboard.writeText(text)
          button.classList.add('is-copied')
          const label = button.querySelector('span')
          if (label) label.textContent = 'Copied'
          setTimeout(() => {
            button.classList.remove('is-copied')
            const labelAfter = button.querySelector('span')
            if (labelAfter) labelAfter.textContent = 'Copy'
          }, 1800)
        } catch {
          const label = button.querySelector('span')
          if (label) label.textContent = 'Press ⌘C'
        }
      }

      button.addEventListener('click', onClick)
      pre.appendChild(button)
      cleanups.push(() => {
        button.removeEventListener('click', onClick)
        button.remove()
      })
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [html])

  return (
    <div
      ref={containerRef}
      className="blog-content guide-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
