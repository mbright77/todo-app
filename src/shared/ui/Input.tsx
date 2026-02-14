import { TextField, type TextFieldProps } from '@mui/material'

export function Input(props: TextFieldProps) {
  return <TextField variant="outlined" fullWidth {...props} />
}
