import { Container } from '@mui/material'
import type { PropsWithChildren } from 'react'

export function Layout({ children }: PropsWithChildren) {
  return <Container maxWidth="md" sx={{ py: 2 }}>{children}</Container>
}
