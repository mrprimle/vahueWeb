'use client'

import { create } from 'zustand'

// Scale module 815448.
type HomeHeroState = {
  homeHeroHeight: number
  showHeading: boolean
  sectionVisibleByIndex: Record<number, boolean>
  fireHomeHeroHeadingIntro: (show: boolean) => void
  setHomeHeroHeight: (h: number) => void
  setSectionVisible: (index: number, visible: boolean) => void
  resetSectionVisibility: () => void
}

export const useHomeHeroStore = create<HomeHeroState>((set) => ({
  homeHeroHeight: 0,
  showHeading: false,
  sectionVisibleByIndex: {},
  fireHomeHeroHeadingIntro: (show) => set((s) => (s.showHeading === show ? s : { showHeading: show })),
  setHomeHeroHeight: (h) => set((s) => (s.homeHeroHeight === h ? s : { homeHeroHeight: h })),
  setSectionVisible: (index, visible) =>
    set((s) => (s.sectionVisibleByIndex[index] === visible ? s : { sectionVisibleByIndex: { ...s.sectionVisibleByIndex, [index]: visible } })),
  resetSectionVisibility: () => set((s) => (Object.keys(s.sectionVisibleByIndex).length === 0 ? s : { sectionVisibleByIndex: {} })),
}))
