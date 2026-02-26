import type { ReactNode } from 'react'
import { Box, Typography, Stack, CircularProgress } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

type TaskListProps = {
  items: ReactNode[]
  emptyMessage?: string
  isLoading?: boolean
  useTransitions?: boolean
}

export function TaskList({ items, emptyMessage, isLoading = false, useTransitions = true }: TaskListProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={32} aria-label="Loading tasks" />
      </Box>
    )
  }

  if (items.length === 0) {
    return (
      <Box sx={{ py: 6, px: 2, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage ?? 'No tasks yet. Add one above.'}
        </Typography>
      </Box>
    )
  }

  if (!useTransitions) {
    return <Stack spacing={0}>{items}</Stack>
  }

  return (
    <Stack spacing={0}>
      <TransitionGroup component={null}>{items}</TransitionGroup>
    </Stack>
  )
}
