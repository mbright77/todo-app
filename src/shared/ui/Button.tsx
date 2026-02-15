import { Button as MuiButton, type ButtonProps } from '@mui/material'

export function Button({ children, variant = 'contained', ...props }: ButtonProps) {
  return <MuiButton variant={variant} {...props}>{children}</MuiButton>
}

