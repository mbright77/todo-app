import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
