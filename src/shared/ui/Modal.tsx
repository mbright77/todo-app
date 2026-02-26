import { Dialog, DialogContent } from '@mui/material'
import type { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  titleId?: string
  ariaLabel?: string
}

export function Modal({ children, onClose, titleId, ariaLabel }: ModalProps) {
  return (
    <Dialog open={true} onClose={onClose} aria-labelledby={titleId} aria-label={ariaLabel}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
