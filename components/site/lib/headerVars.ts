// Scale module 977379: header CSS vars are pushed to elements that register, not to <html>.
const values: Record<string, number | undefined> = {}
const elements = new Set<HTMLElement>()

function apply(el: HTMLElement, name: string, value: number | undefined) {
  if (value === undefined) el.style.removeProperty(name)
  else el.style.setProperty(name, `${value}px`)
}

export function setHeaderVar(name: string, value: number | undefined) {
  if (values[name] === value) return
  values[name] = value
  elements.forEach((el) => apply(el, name, value))
}

/** Sticky elements call this to receive --header-height and --header-y. Returns the cleanup. */
export function registerHeaderVars(el: HTMLElement) {
  elements.add(el)
  Object.entries(values).forEach(([name, value]) => apply(el, name, value))
  return () => {
    elements.delete(el)
    Object.keys(values).forEach((name) => el.style.removeProperty(name))
  }
}
