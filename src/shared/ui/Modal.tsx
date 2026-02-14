import { Dialog, DialogContent } from '@mui/material'
import type { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
