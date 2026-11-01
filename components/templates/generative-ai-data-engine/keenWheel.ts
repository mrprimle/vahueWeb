import type { KeenSliderPlugin } from 'keen-slider/react'

/*
 * scale.com's Keen Slider "WheelControls" plugin (module 29713, passed as the plugin list of every
 * useKeenSlider call on this page; REA listener map shows a non-passive `wheel` listener on .keen-slider).
 * Trackpad horizontal wheel deltas are replayed as ksDragStart / ksDrag / ksDragEnd custom events,
 * so a two-finger swipe drags the track like a pointer drag. preventDefault only when deltaX != 0,
 * drag ends 50ms after the last wheel event.
 */
export const WheelControls: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout> | undefined
  let position = { x: 0, y: 0 }
  let active = false

  const dispatch = (e: WheelEvent, name: string) => {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(new CustomEvent(name, { detail: { x: position.x, y: position.y } }))
  }

  const onWheel = (e: WheelEvent) => {
    if (Math.sign(e.deltaX) !== 0) e.preventDefault()
    if (!active) {
      position = { x: e.pageX, y: e.pageY }
      dispatch(e, 'ksDragStart')
      active = true
    }
    dispatch(e, 'ksDrag')
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      active = false
      dispatch(e, 'ksDragEnd')
    }, 50)
  }

  slider.on('created', () => slider.container.addEventListener('wheel', onWheel, { passive: false }))
  slider.on('destroyed', () => {
    clearTimeout(timeout)
    slider.container.removeEventListener('wheel', onWheel)
  })
}
