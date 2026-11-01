'use client'

import { create } from 'zustand'

// Scale module 579114: page sections register work that must finish before hash scrolling runs.
type ReadyState = {
  pending: Set<string>
  resolved: boolean
  register: (id: string) => void
  signal: (id: string) => void
  resolve: () => void
  reset: () => void
}

export const useReadyStore = create<ReadyState>((set, get) => ({
  pending: new Set(),
  resolved: false,
  register: (id) => {
    if (!get().resolved) set((s) => ({ pending: new Set(s.pending).add(id) }))
  },
  signal: (id) => {
    const pending = new Set(get().pending)
    pending.delete(id)
    if (pending.size === 0) set({ pending, resolved: true })
    else set({ pending })
  },
  resolve: () => set({ resolved: true }),
  reset: () => set({ pending: new Set(), resolved: false }),
}))
