// Scale module 29713: horizontal wheel drives a Keen Slider through its own drag events.
import type { KeenSliderInstance } from 'keen-slider/react'

export function WheelControls(slider: KeenSliderInstance) {
  let timer: ReturnType<typeof setTimeout>
  let origin: { x: number; y: number }
  let active = false
  const emit = (e: WheelEvent, name: string) => {
    origin.x -= e.deltaX
    origin.y -= e.deltaY
    slider.container.dispatchEvent(new CustomEvent(name, { detail: { x: origin.x, y: origin.y } }))
  }
  const onWheel = (e: WheelEvent) => {
    if (Math.sign(e.deltaX) !== -0) e.preventDefault()
    if (!active) {
      origin = { x: e.pageX, y: e.pageY }
      emit(e, 'ksDragStart')
      active = true
    }
    emit(e, 'ksDrag')
    clearTimeout(timer)
    timer = setTimeout(() => {
      active = false
      emit(e, 'ksDragEnd')
    }, 50)
  }
  slider.on('created', () => {
    slider.container.addEventListener('wheel', onWheel, { passive: false })
  })
}
