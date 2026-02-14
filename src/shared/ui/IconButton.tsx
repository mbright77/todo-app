import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material'

export function IconButton({ children, ...props }: IconButtonProps) {
  return <MuiIconButton {...props}>{children}</MuiIconButton>
}
