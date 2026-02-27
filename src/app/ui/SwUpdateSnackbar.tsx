import { Button, Snackbar } from '@mui/material'
import { useSwUpdateStore } from '../model/swUpdate'

/**
 * Non-blocking update notification. Reads from `useSwUpdateStore` and presents
 * a snackbar with a "Reload" action when a new service worker is waiting.
 */
export function SwUpdateSnackbar() {
  const { updateAvailable, applyUpdate, dismiss } = useSwUpdateStore()

  const handleReload = () => {
    if (applyUpdate) {
      applyUpdate()
    } else {
      window.location.reload()
    }
  }

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    dismiss()
  }

  return (
    <Snackbar
      open={updateAvailable}
      onClose={handleClose}
      message="A new version is available"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button color="secondary" size="small" onClick={handleReload}>
          Reload
        </Button>
      }
    />
  )
}
