import type { SxProps, Theme } from '@mui/material'

/** Visually hides an element while keeping it accessible to screen readers. */
export const VISUALLY_HIDDEN_SX: SxProps<Theme> = {
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
}
