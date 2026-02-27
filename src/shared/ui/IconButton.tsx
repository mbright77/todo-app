import { forwardRef } from 'react'
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, ...props }, ref) {
    return <MuiIconButton ref={ref} {...props}>{children}</MuiIconButton>
  }
)
