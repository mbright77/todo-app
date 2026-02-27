import { registerSW } from 'virtual:pwa-register'
import { useSwUpdateStore } from '../model/swUpdate'

/**
 * Registers the service worker and wires up the update notification.
 * When a new SW is available, `useSwUpdateStore.setUpdateAvailable` is called
 * so the UI can present a non-blocking snackbar before reloading.
 */
export function initSW(): void {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      useSwUpdateStore.getState().setUpdateAvailable(() => {
        updateSW(true)
      })
    },
  })

  updateSW()
}
