import { Button as MuiButton, type ButtonProps } from '@mui/material'

export function Button({ children, ...props }: ButtonProps) {
  return <MuiButton variant="contained" {...props}>{children}</MuiButton>
}
