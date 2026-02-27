import { create } from 'zustand'

type SwUpdateState = {
  updateAvailable: boolean
  applyUpdate: (() => void) | null
  setUpdateAvailable: (applyFn: () => void) => void
  dismiss: () => void
}

export const useSwUpdateStore = create<SwUpdateState>((set) => ({
  updateAvailable: false,
  applyUpdate: null,
  setUpdateAvailable: (applyFn) => set({ updateAvailable: true, applyUpdate: applyFn }),
  dismiss: () => set({ updateAvailable: false, applyUpdate: null }),
}))
